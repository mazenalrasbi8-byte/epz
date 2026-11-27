-- =====================================================================
-- Gate Rush — Supabase setup (free tier). Run ONCE in the Supabase SQL editor:
--   Dashboard > SQL Editor > New query > paste this whole file > Run.
-- It only ADDS new objects whose names start with gr_. It does not touch the
-- existing EPZ tables (board, visits, duels ...). Safe to run again.
--
-- BEFORE YOU RUN: change 'CHANGE-ME-teacher-key' (search for it below) to a
-- private teacher key. You type that key in the Gate Rush teacher tools.
-- =====================================================================

create table if not exists gr_players (
  pid         text primary key,
  secret_hash text not null,
  name        text not null default '',
  grade       text not null default '',
  cls         text not null default '',
  avatar      jsonb,
  banned      boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists gr_config (
  key   text primary key,
  value jsonb not null
);

-- one row per started race; finished + validated rows are the scored ones
create table if not exists gr_runs (
  id          bigserial primary key,
  pid         text not null references gr_players(pid) on delete cascade,
  week        date not null,
  grade       text not null,
  started_at  timestamptz not null default now(),
  finished_at timestamptz,
  correct     int, total int, time_ms int, coins int, hits int,
  score       int,
  scored      boolean not null default false
);
create index if not exists gr_runs_pid_week on gr_runs (pid, week);

-- best result of each player per week (this is what the board ranks)
create table if not exists gr_week_stats (
  week        date not null,
  grade       text not null,
  pid         text not null references gr_players(pid) on delete cascade,
  best_score  int  not null default 0,
  best_time_ms int not null default 0,
  best_acc    int  not null default 0,
  races       int  not null default 0,
  primary key (week, grade, pid)
);
create index if not exists gr_week_stats_rank on gr_week_stats (week, grade, best_score desc, best_time_ms asc);

create table if not exists gr_settled (
  week date not null, grade text not null, settled_at timestamptz not null default now(),
  primary key (week, grade)
);

-- history of weekly results + prizes
create table if not exists gr_rewards (
  week date not null, grade text not null,
  pid text not null references gr_players(pid) on delete cascade,
  rank int not null, pts int not null default 0,
  packs int[] not null default '{}',
  best_score int, best_time_ms int, best_acc int, races int,
  name text, avatar jsonb,
  claimed boolean not null default false,
  primary key (week, grade, pid)
);
create index if not exists gr_rewards_pid on gr_rewards (pid);
create index if not exists gr_rewards_hist on gr_rewards (grade, week desc, rank);

alter table gr_players    enable row level security;
alter table gr_config     enable row level security;
alter table gr_runs       enable row level security;
alter table gr_week_stats enable row level security;
alter table gr_settled    enable row level security;
alter table gr_rewards    enable row level security;
-- no policies on purpose: the app can only use the functions below.
revoke all on gr_players, gr_config, gr_runs, gr_week_stats, gr_settled, gr_rewards from anon, authenticated;

-- ---------------------------------------------------------------- config (editable)
insert into gr_config (key, value) values
 ('score', '{"per_correct":100,"fast_s":90,"time_max":300,"time_per_s":2,"coin":2,"coin_cap":100,"hit_pen":10,"min_time_s":70,"max_scored":10}'),
 ('prizes','{"pts":{"1":300,"2":200,"3":150,"top10":80},"participation":{"base":10,"per_race":2,"acc_bonus":20},"packs":{"1":2,"2":1,"3":1}}'),
 ('admin', jsonb_build_object('hash', encode(sha256(convert_to('CHANGE-ME-teacher-key','utf8')),'hex')))
on conflict (key) do nothing;

-- ---------------------------------------------------------------- helpers
-- Weeks run Sunday 00:00 to Saturday 23:59, Asia/Muscat time. A week is identified by its Sunday.
create or replace function gr_week_start(ts timestamptz default now()) returns date
language sql stable as $$
  select ((ts at time zone 'Asia/Muscat')::date - extract(dow from (ts at time zone 'Asia/Muscat'))::int)
$$;

create or replace function gr_week_end_ms(w date) returns bigint
language sql stable as $$
  select (extract(epoch from (((w + 7)::timestamp) at time zone 'Asia/Muscat')) * 1000)::bigint
$$;

create or replace function gr_hash(s text) returns text
language sql immutable as $$ select encode(sha256(convert_to(coalesce(s,''),'utf8')),'hex') $$;

create or replace function gr_cfg(k text) returns jsonb
language sql stable as $$ select value from gr_config where key = k $$;

-- identify the player (first use claims the id) and refresh name / class / avatar
create or replace function gr_auth(p_pid text, p_secret text, p_name text, p_grade text, p_cls text, p_avatar jsonb)
returns gr_players language plpgsql security definer set search_path = public as $$
declare r gr_players;
begin
  if p_pid is null or length(p_pid) < 8 or p_secret is null or length(p_secret) < 16 then
    raise exception 'bad credentials';
  end if;
  if p_grade not in ('9','10','11','12') then raise exception 'grade required'; end if;
  select * into r from gr_players where pid = p_pid;
  if not found then
    insert into gr_players (pid, secret_hash, name, grade, cls, avatar)
    values (p_pid, gr_hash(p_secret), left(coalesce(p_name,''),40), p_grade, left(coalesce(p_cls,''),20), p_avatar)
    returning * into r;
  else
    if r.secret_hash <> gr_hash(p_secret) then raise exception 'bad credentials'; end if;
    if r.banned then raise exception 'removed'; end if;
    update gr_players set name = left(coalesce(p_name,name),40), grade = p_grade, cls = left(coalesce(p_cls,''),20),
           avatar = coalesce(p_avatar, avatar), updated_at = now()
     where pid = p_pid returning * into r;
  end if;
  return r;
end $$;

-- ---------------------------------------------------------------- lazy weekly settlement (idempotent)
create or replace function gr_settle() returns void language plpgsql security definer set search_path = public as $$
declare w record; ins int; pz jsonb := gr_cfg('prizes'); cur date := gr_week_start();
begin
  for w in
    select distinct s.week, s.grade from gr_week_stats s
     where s.week < cur and not exists (select 1 from gr_settled d where d.week = s.week and d.grade = s.grade)
  loop
    insert into gr_settled (week, grade) values (w.week, w.grade) on conflict do nothing;
    get diagnostics ins = row_count;
    if ins = 0 then continue; end if;   -- someone else settled it first
    insert into gr_rewards (week, grade, pid, rank, pts, packs, best_score, best_time_ms, best_acc, races, name, avatar)
    select r.week, r.grade, r.pid, r.rk,
      case when r.rk = 1 then coalesce((pz->'pts'->>'1')::int,0)
           when r.rk = 2 then coalesce((pz->'pts'->>'2')::int,0)
           when r.rk = 3 then coalesce((pz->'pts'->>'3')::int,0)
           when r.rk <= 10 then coalesce((pz->'pts'->>'top10')::int,0)
           else coalesce((pz->'participation'->>'base')::int,0)
              + r.races * coalesce((pz->'participation'->>'per_race')::int,0)
              + round(r.best_acc * coalesce((pz->'participation'->>'acc_bonus')::int,0) / 100.0)::int end,
      case when r.rk <= 3 then
        coalesce((select array_agg(((((r.week - date '2026-01-04') / 7) + case r.rk when 1 then 0 when 2 then 2 else 3 end + i) % 4) + 1)
                    from generate_series(0, coalesce((pz->'packs'->>(r.rk::text))::int,0) - 1) i), '{}')
      else '{}' end,
      r.best_score, r.best_time_ms, r.best_acc, r.races, p.name, p.avatar
    from (select s.*, row_number() over (order by s.best_score desc, s.best_time_ms asc, s.pid) rk
            from gr_week_stats s join gr_players pl on pl.pid = s.pid and not pl.banned
           where s.week = w.week and s.grade = w.grade) r
    join gr_players p on p.pid = r.pid
    on conflict do nothing;
  end loop;
end $$;

-- ---------------------------------------------------------------- RPCs used by the game
-- sync: settles old weeks, returns my week, my rewards and the owned packs
create or replace function gr_sync(p_pid text, p_secret text, p_name text, p_grade text, p_cls text, p_avatar jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare me gr_players; cur date := gr_week_start(); st gr_week_stats; n int; rk int; used int; pend jsonb; packs int[];
begin
  me := gr_auth(p_pid, p_secret, p_name, p_grade, p_cls, p_avatar);
  perform gr_settle();
  select * into st from gr_week_stats where week = cur and grade = me.grade and pid = me.pid;
  select count(*) into n from gr_week_stats where week = cur and grade = me.grade;
  select count(*) + 1 into rk from gr_week_stats s join gr_players pl on pl.pid = s.pid and not pl.banned
   where s.week = cur and s.grade = me.grade
     and (s.best_score > coalesce(st.best_score,0) or (s.best_score = coalesce(st.best_score,0) and s.best_time_ms < coalesce(nullif(st.best_time_ms,0),2147483647)))
     and s.pid <> me.pid;
  select count(*) into used from gr_runs where pid = me.pid and week = cur and scored;
  select coalesce(jsonb_agg(jsonb_build_object('week',week,'rank',rank,'pts',pts,'packs',to_jsonb(packs)) order by week), '[]')
    into pend from gr_rewards where pid = me.pid and not claimed;
  select coalesce(array_agg(distinct x), '{}') into packs from gr_rewards r, unnest(r.packs) x where r.pid = me.pid;
  return jsonb_build_object(
    'week', cur, 'ends', gr_week_end_ms(cur), 'grade', me.grade,
    'score', gr_cfg('score'), 'prizes', gr_cfg('prizes'),
    'used', used, 'best', coalesce(st.best_score,0), 'best_time', coalesce(st.best_time_ms,0),
    'rank', case when st.pid is null then null else rk end, 'players', n,
    'pending', pend, 'packs', to_jsonb(packs));
end $$;

create or replace function gr_start_run(p_pid text, p_secret text, p_name text, p_grade text, p_cls text, p_avatar jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare me gr_players; rid bigint; cur date := gr_week_start(); used int; mx int := coalesce((gr_cfg('score')->>'max_scored')::int, 10);
begin
  me := gr_auth(p_pid, p_secret, p_name, p_grade, p_cls, p_avatar);
  -- keep the table small: forget races that were started but never finished
  delete from gr_runs where pid = me.pid and finished_at is null and started_at < now() - interval '1 hour';
  select count(*) into used from gr_runs where pid = me.pid and week = cur and scored;
  insert into gr_runs (pid, week, grade) values (me.pid, cur, me.grade) returning gr_runs.id into rid;
  return jsonb_build_object('run', rid, 'week', cur, 'scored', used < mx, 'left', greatest(mx - used, 0));
end $$;

create or replace function gr_finish_run(p_pid text, p_secret text, p_run bigint, p_correct int, p_total int, p_time_ms int, p_coins int, p_hits int)
returns jsonb language plpgsql security definer set search_path = public as $$
declare me gr_players; r gr_runs; c jsonb := gr_cfg('score'); sc int; tb int; used int; cur date := gr_week_start();
        el_ms int; is_scored boolean; acc int; st gr_week_stats; rk int; n int;
begin
  select * into me from gr_players where pid = p_pid;
  if not found or me.secret_hash <> gr_hash(p_secret) or me.banned then raise exception 'bad credentials'; end if;
  select * into r from gr_runs where id = p_run and pid = p_pid for update;
  if not found then raise exception 'unknown run'; end if;
  if r.finished_at is not null then raise exception 'already submitted'; end if;   -- no duplicate submissions
  el_ms := (extract(epoch from (now() - r.started_at)) * 1000)::int;
  p_total := least(greatest(coalesce(p_total,0),0), 20);
  p_correct := least(greatest(coalesce(p_correct,0),0), p_total);
  p_coins := least(greatest(coalesce(p_coins,0),0), 200);
  p_hits := least(greatest(coalesce(p_hits,0),0), 200);
  p_time_ms := greatest(coalesce(p_time_ms,0),0);
  -- a race cannot be faster than the minimum, and the clock must really have run that long since it started
  -- (the reported time may be longer than the clock: it includes time penalties)
  is_scored := (p_time_ms >= (c->>'min_time_s')::int * 1000) and (p_time_ms <= 3600000) and (el_ms >= (c->>'min_time_s')::int * 1000);
  select count(*) into used from gr_runs where pid = p_pid and week = r.week and scored;
  if used >= (c->>'max_scored')::int then is_scored := false; end if;
  if r.week <> cur then is_scored := false; end if;   -- a race started last week does not count this week
  tb := greatest(0, (c->>'time_max')::int - greatest(0, (p_time_ms / 1000) - (c->>'fast_s')::int) * (c->>'time_per_s')::int);
  sc := greatest(0, p_correct * (c->>'per_correct')::int + tb + least(p_coins,(c->>'coin_cap')::int) * (c->>'coin')::int - p_hits * (c->>'hit_pen')::int);
  acc := case when p_total > 0 then round(100.0 * p_correct / p_total) else 0 end;
  update gr_runs set finished_at = now(), correct = p_correct, total = p_total, time_ms = p_time_ms, coins = p_coins, hits = p_hits,
         score = sc, scored = is_scored where id = r.id;
  if is_scored then
    insert into gr_week_stats (week, grade, pid, best_score, best_time_ms, best_acc, races)
    values (r.week, r.grade, p_pid, sc, p_time_ms, acc, 1)
    on conflict (week, grade, pid) do update set
      races = gr_week_stats.races + 1,
      best_acc = greatest(gr_week_stats.best_acc, acc),
      best_time_ms = case when sc > gr_week_stats.best_score or (sc = gr_week_stats.best_score and p_time_ms < gr_week_stats.best_time_ms) then p_time_ms else gr_week_stats.best_time_ms end,
      best_score = greatest(gr_week_stats.best_score, sc);
  end if;
  select * into st from gr_week_stats where week = r.week and grade = r.grade and pid = p_pid;
  select count(*) into n from gr_week_stats where week = r.week and grade = r.grade;
  select count(*) + 1 into rk from gr_week_stats s join gr_players pl on pl.pid = s.pid and not pl.banned
   where s.week = r.week and s.grade = r.grade and s.pid <> p_pid
     and (s.best_score > coalesce(st.best_score,0) or (s.best_score = coalesce(st.best_score,0) and s.best_time_ms < coalesce(nullif(st.best_time_ms,0),2147483647)));
  return jsonb_build_object('score', sc, 'scored', is_scored, 'best', coalesce(st.best_score,0),
    'rank', case when st.pid is null then null else rk end, 'players', n,
    'left', greatest((c->>'max_scored')::int - used - case when is_scored then 1 else 0 end, 0));
end $$;

-- weekly board of one grade (paged)
create or replace function gr_board(p_grade text, p_limit int default 20, p_offset int default 0)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(rw order by rk), '[]') from (
    select (p_offset + row_number() over (order by s.best_score desc, s.best_time_ms asc, s.pid))::int as rk,
           jsonb_build_object('rank', p_offset + row_number() over (order by s.best_score desc, s.best_time_ms asc, s.pid),
             'pid', s.pid, 'name', p.name, 'cls', p.cls, 'avatar', p.avatar, 'score', s.best_score,
             'time', s.best_time_ms, 'acc', s.best_acc, 'races', s.races) as rw
      from gr_week_stats s join gr_players p on p.pid = s.pid and not p.banned
     where s.week = gr_week_start() and s.grade = p_grade
     order by s.best_score desc, s.best_time_ms asc, s.pid
     limit least(greatest(p_limit,1),50) offset greatest(p_offset,0)
  ) t
$$;

-- Weekly Champions: the top 3 of each past week (paged by week), with prizes
create or replace function gr_champions(p_grade text, p_weeks int default 4, p_offset int default 0)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare out jsonb;
begin
  perform gr_settle();
  select coalesce(jsonb_agg(jsonb_build_object('week', w.week, 'top', w.top) order by w.week desc), '[]') into out from (
    select x.week, jsonb_agg(jsonb_build_object('rank', x.rank, 'name', x.name, 'avatar', x.avatar, 'score', x.best_score,
             'time', x.best_time_ms, 'acc', x.best_acc, 'pts', x.pts, 'packs', to_jsonb(x.packs)) order by x.rank) top
      from gr_rewards x
     where x.grade = p_grade and x.rank <= 3
       and x.week in (select week from gr_settled where grade = p_grade order by week desc limit least(greatest(p_weeks,1),12) offset greatest(p_offset,0))
     group by x.week
  ) w;
  return out;
end $$;

-- take my pending prizes (marked as claimed so points are given once)
create or replace function gr_claim(p_pid text, p_secret text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare me gr_players; out jsonb;
begin
  select * into me from gr_players where pid = p_pid;
  if not found or me.secret_hash <> gr_hash(p_secret) or me.banned then raise exception 'bad credentials'; end if;
  with u as (update gr_rewards set claimed = true where pid = p_pid and not claimed returning week, rank, pts, packs)
  select coalesce(jsonb_agg(jsonb_build_object('week',week,'rank',rank,'pts',pts,'packs',to_jsonb(packs)) order by week), '[]') into out from u;
  return out;
end $$;

-- my own recent weeks (paged)
create or replace function gr_my_history(p_pid text, p_secret text, p_limit int default 10, p_offset int default 0)
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare me gr_players;
begin
  select * into me from gr_players where pid = p_pid;
  if not found or me.secret_hash <> gr_hash(p_secret) then raise exception 'bad credentials'; end if;
  return (select coalesce(jsonb_agg(jsonb_build_object('week',week,'rank',rank,'pts',pts,'packs',to_jsonb(packs),'score',best_score,'races',races) order by week desc), '[]')
            from (select * from gr_rewards where pid = p_pid order by week desc limit least(greatest(p_limit,1),30) offset greatest(p_offset,0)) q);
end $$;

-- ---------------------------------------------------------------- teacher tools (need the teacher key)
create or replace function gr_admin_check(p_key text) returns void language plpgsql security definer set search_path = public as $$
begin
  if gr_hash(p_key) <> (gr_cfg('admin')->>'hash') then raise exception 'wrong teacher key'; end if;
end $$;

create or replace function gr_admin_state(p_key text) returns jsonb language plpgsql security definer set search_path = public as $$
begin
  perform gr_admin_check(p_key);
  return jsonb_build_object('score', gr_cfg('score'), 'prizes', gr_cfg('prizes'), 'week', gr_week_start(),
    'board', (select coalesce(jsonb_agg(jsonb_build_object('pid',s.pid,'name',p.name,'grade',s.grade,'cls',p.cls,'score',s.best_score,'time',s.best_time_ms,'races',s.races) order by s.grade, s.best_score desc), '[]')
                from gr_week_stats s join gr_players p on p.pid = s.pid where s.week = gr_week_start() and not p.banned),
    'settled', (select coalesce(jsonb_agg(jsonb_build_object('week',week,'grade',grade,'at',settled_at) order by week desc), '[]')
                from (select * from gr_settled order by week desc, grade limit 40) z));
end $$;

-- remove a student (and their scores) from Gate Rush; a removed student cannot compete again
create or replace function gr_admin_remove(p_key text, p_pid text) returns void language plpgsql security definer set search_path = public as $$
begin
  perform gr_admin_check(p_key);
  update gr_players set banned = true where pid = p_pid;
  delete from gr_week_stats where pid = p_pid and week >= gr_week_start();
end $$;

create or replace function gr_admin_set_config(p_key text, p_score jsonb, p_prizes jsonb) returns void language plpgsql security definer set search_path = public as $$
begin
  perform gr_admin_check(p_key);
  if p_score is not null then update gr_config set value = p_score where key = 'score'; end if;
  if p_prizes is not null then update gr_config set value = p_prizes where key = 'prizes'; end if;
end $$;

grant execute on function gr_sync(text,text,text,text,text,jsonb), gr_start_run(text,text,text,text,text,jsonb),
  gr_finish_run(text,text,bigint,int,int,int,int,int), gr_board(text,int,int), gr_champions(text,int,int),
  gr_claim(text,text), gr_my_history(text,text,int,int),
  gr_admin_state(text), gr_admin_remove(text,text), gr_admin_set_config(text,jsonb,jsonb) to anon;
-- internal helpers are not callable from the app
revoke execute on function gr_auth(text,text,text,text,text,jsonb), gr_settle(), gr_admin_check(text) from anon, public;
