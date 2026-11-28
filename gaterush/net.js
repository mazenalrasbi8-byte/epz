/* Gate Rush — network layer (Supabase RPCs from gate-rush.sql), weekly question pool, scoring preview.
   Everything is optional: if the SQL has not been run, the game still works and keeps results on this phone. */
(function () {
  var GR = (window.GR = window.GR || {});
  var H = function () { return window.GR_HOST; };
  var DEFAULT_CFG = { per_correct: 100, fast_s: 90, time_max: 300, time_per_s: 2, coin: 2, coin_cap: 100, hit_pen: 10, min_time_s: 70, max_scored: 10 };
  var DEFAULT_PRIZES = { pts: { "1": 300, "2": 200, "3": 150, top10: 80 }, participation: { base: 10, per_race: 2, acc_bonus: 20 }, packs: { "1": 2, "2": 1, "3": 1 } };
  var net = (GR.net = { cfg: DEFAULT_CFG, prizes: DEFAULT_PRIZES, state: "idle", info: null, last: null });

  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function rnd(n) { var a = new Uint8Array(n); try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256); } return Array.prototype.map.call(a, function (b) { return b.toString(16).padStart(2, "0"); }).join(""); }
  // Gate Rush has its own id and secret (the site's public ids are visible in the old board, so they are not reused)
  net.pid = function () { var v = ls("gr-pid"); if (!v) { v = rnd(10); ls("gr-pid", v); } return v; };
  net.secret = function () { var v = ls("gr-secret"); if (!v) { v = rnd(24); ls("gr-secret", v); } return v; };

  net.who = function () {
    var h = H(), s = h.me();
    return { p_pid: net.pid(), p_secret: net.secret(), p_name: s.name || "", p_grade: s.grade || "", p_cls: s.cls || "", p_avatar: h.avatarCfg() };
  };
  net.canCompete = function () { var g = H().me().grade; return g === "9" || g === "10" || g === "11" || g === "12"; };

  net.rpc = async function (name, body) {
    var h = H(), ctl = new AbortController(), t = setTimeout(function () { ctl.abort(); }, 10000);
    try {
      var r = await fetch(h.sbUrl + "/rest/v1/rpc/" + name, { method: "POST", headers: { apikey: h.sbKey, Authorization: "Bearer " + h.sbKey, "Content-Type": "application/json" }, body: JSON.stringify(body || {}), signal: ctl.signal });
      if (!r.ok) {
        var txt = ""; try { txt = await r.text(); } catch (e) {}
        var err = new Error("HTTP " + r.status + " " + txt.slice(0, 200)); err.status = r.status;
        if (r.status === 404 || /Could not find the function|PGRST202/.test(txt)) net.state = "missing";
        throw err;
      }
      net.state = net.state === "missing" ? "missing" : "ok";
      return await r.json();
    } finally { clearTimeout(t); }
  };

  /* ---------- week helpers (weeks run Sunday to Saturday, Muscat time, UTC+4 all year) ---------- */
  net.weekStart = function (ms) {
    var d = new Date((ms || Date.now()) + 4 * 3600e3); d.setUTCHours(0, 0, 0, 0); d.setUTCDate(d.getUTCDate() - d.getUTCDay());
    return d.toISOString().slice(0, 10);
  };
  net.weekEndsMs = function () { var d = new Date(net.weekStart() + "T00:00:00Z"); return d.getTime() + 7 * 864e5 - 4 * 3600e3; };
  net.fmtLeft = function (ms) {
    var s = Math.max(0, Math.floor(ms / 1000)), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    return d > 0 ? d + "d " + h + "h" : h > 0 ? h + "h " + m + "m" : m + "m";
  };
  net.fmtTime = function (ms) {
    ms = Math.max(0, ms | 0); var m = Math.floor(ms / 60000), s = Math.floor(ms % 60000 / 1000), c = Math.floor(ms % 1000 / 10);
    return m + ":" + String(s).padStart(2, "0") + "." + String(c).padStart(2, "0");
  };

  /* ---------- scoring preview: same formula as the server, used offline and for the results screen ---------- */
  net.score = function (r, cfg) {
    cfg = cfg || net.cfg;
    var tb = Math.max(0, cfg.time_max - Math.max(0, Math.floor(r.timeMs / 1000) - cfg.fast_s) * cfg.time_per_s);
    return Math.max(0, r.correct * cfg.per_correct + tb + Math.min(r.coins, cfg.coin_cap) * cfg.coin - r.hits * cfg.hit_pen);
  };

  /* ---------- local fallback storage (this phone only) ---------- */
  net.local = function () {
    var o = {}; try { o = JSON.parse(ls("gr-local") || "{}"); } catch (e) {}
    var wk = net.weekStart(); if (o.week !== wk) o = { week: wk, best: 0, bestTime: 0, races: 0 };
    return o;
  };
  net.localSave = function (r) {
    var o = net.local(); o.races++;
    if (r.score > o.best || (r.score === o.best && r.timeMs < o.bestTime)) { o.best = r.score; o.bestTime = r.timeMs; }
    ls("gr-local", JSON.stringify(o)); return o;
  };

  /* ---------- sync / runs / boards ---------- */
  net.sync = async function () {
    if (!net.canCompete()) { net.state = "guest"; return null; }
    try {
      var d = await net.rpc("gr_sync", net.who());
      net.info = d; if (d.score) net.cfg = Object.assign({}, DEFAULT_CFG, d.score); if (d.prizes) net.prizes = d.prizes;
      return d;
    } catch (e) { if (net.state !== "missing") net.state = "offline"; return null; }
  };
  net.startRun = async function () {
    if (!net.canCompete() || net.state === "missing" || net.state === "offline") return null;
    try { return await net.rpc("gr_start_run", net.who()); } catch (e) { if (net.state !== "missing") net.state = "offline"; return null; }
  };
  net.finishRun = async function (run, r) {
    if (!run) return null;
    try { return await net.rpc("gr_finish_run", { p_pid: net.pid(), p_secret: net.secret(), p_run: run.run, p_correct: r.correct, p_total: r.total, p_time_ms: Math.round(r.timeMs), p_coins: r.coins, p_hits: r.hits }); }
    catch (e) { return { error: String(e.message || e) }; }
  };
  net.board = function (grade, offset) { return net.rpc("gr_board", { p_grade: grade, p_limit: 20, p_offset: offset || 0 }); };
  net.champions = function (grade, offset) { return net.rpc("gr_champions", { p_grade: grade, p_weeks: 4, p_offset: offset || 0 }); };
  net.claim = function () { return net.rpc("gr_claim", { p_pid: net.pid(), p_secret: net.secret() }); };
  net.history = function (offset) { return net.rpc("gr_my_history", { p_pid: net.pid(), p_secret: net.secret(), p_limit: 8, p_offset: offset || 0 }); };

  /* ---------- questions: three-option multiple choice from the existing bank, a weekly pool per grade ---------- */
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffled(a, rng) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  GR.rng = mulberry; GR.shuffled = shuffled;

  var cache = null;
  net.pool = function () {
    var h = H(), g = h.me().grade || "9", key = net.weekStart() + g;
    if (cache && cache.key === key) return cache.list;
    var seen = {}, all = [];
    h.mcqList().forEach(function (q) {
      if (!q || q.type !== "mcq" || !q.options || q.options.length < 3 || q.image || q.passage || q.audio_text) return;
      var p = String(q.prompt || ""), ans = q.answer;
      if (p.length < 8 || p.length > 110 || seen[p]) return;
      var ok = q.options.every(function (o) { return String(o).length <= 34; });
      if (!ok || q.options.indexOf(ans) < 0) return;
      seen[p] = 1; all.push(q);
    });
    all.sort(function (a, b) { return a.prompt < b.prompt ? -1 : 1; });
    var list = shuffled(all, mulberry(hashStr(key))).slice(0, 90);
    cache = { key: key, list: list }; return list;
  };
  /* ---------- topic maps (epz-patch:maps): one central bank by grade and topic, plus Book mode ----------
     Topic questions live in gaterush/q-g<grade>-w<world>.json (only grade 9 so far; other grades fall back to it).
     Gate i asks for format FMT[i]; the band rises from basic to challenge. Recently seen questions are avoided. */
  var FMT = ["form", "complete", "mistake", "meaning", "rewrite", "real"], topicCache = {};
  // existing bank questions join a topic when their activity title names it (used when a format runs short, and for variety)
  var TITLE = {
    "present-simple": /present simple/i, "present-continuous": /present (simple )?(or |, |& |and )?(simple )?continuous|present continuous/i,
    "past-simple": /past simple/i, "past-continuous": /past continuous/i, "present-perfect": /present perfect(?!.*continuous)|for or since|ever, never|already, yet/i,
    "past-perfect": /past perfect/i, "future-simple": /future|\bwill\b/i, "future-forms": /future|going to/i,
    "present-perfect-continuous": /present perfect continuous|present perfect or present perfect continuous/i, "mixed-tenses": /tenses|past simple|present simple|future/i
  };
  net.loadTopic = function (topic) {
    var g = (H().me().grade || "9"), key = g + "/" + topic;
    if (topicCache[key]) return Promise.resolve(topicCache[key]);
    // one file per grade and world (World 1 = the tenses), e.g. gaterush/q-g9-w1.json
    var get = function (gr) { return fetch("gaterush/q-g" + gr + "-w1.json?v=1").then(function (r) { if (!r.ok) throw new Error("no " + gr); return r.json(); }).then(function (d) { if (!d.topics || !d.topics[topic]) throw new Error("no topic"); return d.topics[topic]; }); };
    return get(g).catch(function () { return get("9"); }).then(function (d) { topicCache[key] = d; return d; });
  };
  function seenKey(k) { return "gr-seen-" + k; }
  function seenGet(k) { try { return JSON.parse(localStorage.getItem(seenKey(k)) || "[]"); } catch (e) { return []; } }
  function seenAdd(k, ids) { try { var a = seenGet(k).concat(ids).slice(-30); localStorage.setItem(seenKey(k), JSON.stringify(a)); } catch (e) {} }
  function toGate(q, rng) {
    var wrong = shuffled(q.options.filter(function (o) { return o !== q.answer; }), rng).slice(0, 2); if (wrong.length < 2) return null;
    var opts = shuffled([q.answer].concat(wrong), rng); return { prompt: q.prompt, options: opts, correct: opts.indexOf(q.answer), explanation: q.explanation || "", id: q.id };
  }
  function bankFor(topic) {
    var re = TITLE[topic], g = H().me().grade || "9", out = [], seen = {};
    if (!re || !H().mcqActs) return out;
    H().mcqActs().forEach(function (a) {
      if (!re.test(a.title) || (a.grade && a.grade !== "all" && String(a.grade) !== String(g))) return;
      a.qs.forEach(function (q, i) {
        var p = String(q.prompt || ""); if (seen[p] || !q.options || q.options.length < 3 || q.image || q.passage || p.length < 8 || p.length > 110 || q.options.indexOf(q.answer) < 0) return;
        if (!q.options.every(function (o) { return String(o).length <= 40; })) return; seen[p] = 1;
        out.push({ id: "bank:" + p.slice(0, 40), prompt: p, options: q.options, answer: q.answer, explanation: q.explanation || "" });
      });
    });
    return out;
  }
  // n questions for a topic map: gate i takes format FMT[i % 6]; one bank question may replace a middle gate for variety
  net.pickTopic = function (topic, n) {
    return net.loadTopic(topic).then(function (d) {
      var rng = Math.random, seen = seenGet(topic), used = {}, out = [], bank = shuffled(bankFor(topic), rng), bankSlot = bank.length ? 1 + Math.floor(rng() * 3) : -1;
      for (var i = 0; i < n; i++) {
        var fmt = FMT[i % FMT.length], pool = d.qs.filter(function (q) { return q.format === fmt && !used[q.id]; });
        var fresh = pool.filter(function (q) { return seen.indexOf(q.id) < 0; }), src = fresh.length ? fresh : pool, q = null;
        if (i === bankSlot && bank.length) q = bank.shift();
        if (!q && src.length) q = src[Math.floor(rng() * src.length)];
        if (!q) q = bank.shift() || shuffled(d.qs.filter(function (x) { return !used[x.id]; }), rng)[0];
        if (!q) break; used[q.id] = 1;
        var gq = toGate(q, rng); gq && out.push(gq);
      }
      seenAdd(topic, out.map(function (q) { return q.id; }).filter(Boolean));
      return out;
    });
  };
  // Book mode: the chosen lesson's three-choice questions, topped up from the rest of its unit
  net.bookUnits = function () { var b = H().book && H().book(); return b && b.units ? b.units : []; };
  net.pickLesson = function (unitId, lessonId, n) {
    var u = net.bookUnits().find(function (x) { return x.id === unitId; }); if (!u) return [];
    var ok = function (q) { return q && q.type === "mcq" && q.options && q.options.length >= 3 && q.options.indexOf(q.answer) > -1 && String(q.prompt || "").length <= 120 && !q.passage; };
    var les = u.lessons.find(function (l) { return l.id === lessonId; }), rng = Math.random;
    var first = shuffled((les ? les.qs || [] : []).filter(ok), rng), rest = shuffled([].concat.apply([], u.lessons.filter(function (l) { return l !== les; }).map(function (l) { return (l.qs || []).filter(ok); })), rng);
    var out = [], seenP = {};
    first.concat(rest).forEach(function (q) { if (out.length >= n || seenP[q.prompt]) return; seenP[q.prompt] = 1; var g = toGate(q, rng); g && out.push(g); });
    return out;
  };

  // one question per gate for one attempt (6 on the fort map): random questions from the weekly pool, three answers each, random door for the right one
  net.pick = function (n) {
    var pool = net.pool(), rng = Math.random, src = shuffled(pool, rng), out = [];
    for (var i = 0; i < src.length && out.length < n; i++) {
      var q = src[i], wrong = shuffled(q.options.filter(function (o) { return o !== q.answer; }), rng).slice(0, 2);
      if (wrong.length < 2) continue;
      var opts = shuffled([q.answer].concat(wrong), rng);
      out.push({ prompt: q.prompt, options: opts, correct: opts.indexOf(q.answer), explanation: q.explanation || "" });
    }
    return out;
  };
})();
