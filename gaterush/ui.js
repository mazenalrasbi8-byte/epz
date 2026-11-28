/* Gate Rush — screens: entry, weekly leaderboard, Weekly Champions, prizes, race launcher, results, teacher tools. */
(function () {
  var GR = (window.GR = window.GR || {});
  var H = function () { return window.GR_HOST; };
  var net = function () { return GR.net; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var ui = (GR.ui = {});

  /* =====================================================================  CSS (injected once) */
  var CSS = "\
.gr-tabs{flex-wrap:wrap}.gr-tabs button{flex:1 1 30%;min-width:0}\
.gr-mode{display:flex;gap:6px;margin:4px 0 10px}.gr-mode button{flex:1;font:inherit;font-weight:800;font-size:.84rem;padding:8px 4px;border:3px solid var(--gr-navy);border-radius:12px;background:#fff;color:var(--gr-navy);cursor:pointer}.gr-mode button.on{background:var(--gr-gold)}\
.gr-maps{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}\
.gr-mapc{position:relative;display:flex;flex-direction:column;gap:4px;text-align:left;font:inherit;color:var(--gr-navy);background:#fff;border:3px solid var(--gr-navy);border-radius:16px;padding:10px 12px 12px;box-shadow:0 4px 0 var(--gr-navy);cursor:pointer;border-top:10px solid var(--mc)}\
.gr-mapc:active{transform:translateY(3px);box-shadow:0 1px 0 var(--gr-navy)}.gr-mapc .ic{font-size:1.6rem;line-height:1}.gr-mapc small{font-weight:800;font-size:.7rem;letter-spacing:.04em;text-transform:uppercase;opacity:.7}\
.gr-mapc b{font-size:1.02rem;line-height:1.2}.gr-mapc span{font-size:.8rem;line-height:1.35;opacity:.85}.gr-mapc .pb{font-weight:800;font-size:.76rem;opacity:1;margin-top:2px}\
.gr-unit{margin:12px 0 6px;font-size:1rem}.gr-les{display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:inherit;color:var(--gr-navy);background:#fff;border:2px solid var(--gr-navy);border-radius:12px;padding:9px 12px;margin:0 0 6px;cursor:pointer}.gr-les b{flex:1}.gr-les span{font-size:.78rem;font-weight:700;opacity:.75}\
:root{--gr-navy:#13232F;--gr-ink:#1B1630;--gr-teal:#27C3C3;--gr-tealD:#0B7A63;--gr-gold:#F2B632;--gr-red:#E5484D;--gr-sand:#FFF6E2}\
.gr-wrap{max-width:720px;margin:0 auto;padding:0 0 28px;color:#13232F}.gr-wrap .muted{color:#4B5A66}\
.gr-hero{position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(#7FD3EA,#CDE9F2 58%,#F5D27A 58%);border:4px solid var(--gr-navy);box-shadow:0 6px 0 var(--gr-navy);padding:18px 16px 0;min-height:230px;color:var(--gr-navy)}\
.gr-hero h1{font-family:'Kalam','Lexend',system-ui,sans-serif;font-size:2.7rem;line-height:.95;margin:0;letter-spacing:.5px;color:#fff;text-shadow:0 4px 0 var(--gr-navy),3px 3px 0 var(--gr-navy),-3px 3px 0 var(--gr-navy),3px -2px 0 var(--gr-navy),-3px -2px 0 var(--gr-navy)}\
.gr-hero h1 b{color:var(--gr-gold)}.gr-hero p{margin:8px 0 0;font-weight:700;max-width:60%;font-size:.95rem}\
.gr-fort{position:absolute;right:-6px;bottom:0;width:58%;height:150px;pointer-events:none}\
.gr-card{background:#FFFDF6;border:3px solid var(--gr-navy);border-radius:18px;box-shadow:0 4px 0 var(--gr-navy);padding:14px;margin-top:14px;color:var(--gr-navy)}\
.gr-card h2{margin:0 0 8px;font-size:1.1rem;font-family:'Kalam','Lexend',sans-serif;font-size:1.4rem}\
.gr-map{display:flex;gap:12px;align-items:center}.gr-map .gr-mini{flex:none;width:84px;height:84px;border-radius:14px;border:3px solid var(--gr-navy);background:linear-gradient(#7FD3EA 55%,#E8C98F 55%);position:relative;overflow:hidden}\
.gr-mini i{position:absolute;bottom:0;width:20px;background:#D9C7A3;border:2px solid var(--gr-navy)}.gr-mini i:nth-child(1){left:6px;height:34px}.gr-mini i:nth-child(2){left:30px;height:48px}.gr-mini i:nth-child(3){left:54px;height:30px}\
.gr-map h3{margin:0;font-size:1.15rem}.gr-map p{margin:2px 0 0;font-size:.86rem;opacity:.8}\
.gr-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.gr-chip{background:#FFF6E2;border:2px solid var(--gr-navy);border-radius:999px;padding:3px 10px;font-weight:800;font-size:.78rem}\
.gr-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center}.gr-stats div{background:#FFF6E2;border:2px solid var(--gr-navy);border-radius:12px;padding:8px 2px}.gr-stats b{display:block;font-size:1.25rem}.gr-stats span{font-size:.7rem;font-weight:700;opacity:.75}\
.gr-go{display:flex;width:100%;align-items:center;justify-content:center;gap:10px;margin-top:14px;padding:16px;font:inherit;font-weight:900;font-size:1.35rem;letter-spacing:.5px;color:var(--gr-navy);background:var(--gr-gold);border:4px solid var(--gr-navy);border-radius:18px;box-shadow:0 6px 0 var(--gr-navy);cursor:pointer;transition:transform .08s,box-shadow .08s}\
.gr-go:active{transform:translateY(5px);box-shadow:0 1px 0 var(--gr-navy)}.gr-go[disabled]{opacity:.6}\
.gr-tabs{display:flex;gap:6px;margin-top:14px}.gr-tabs button{flex:1;font:inherit;font-weight:800;font-size:.84rem;padding:9px 4px;border:3px solid var(--gr-navy);border-radius:12px;background:#fff;color:var(--gr-navy);cursor:pointer}.gr-tabs button.on{background:var(--gr-navy);color:#fff}\
.gr-note{background:#FFF1D6;border:2px dashed #B9801A;border-radius:12px;padding:10px 12px;font-size:.88rem;font-weight:600;margin-top:12px;color:#5A3A00}\
.gr-note.bad{background:#FCE3E1;border-color:#A3262A;color:#5E1317}\
.gr-list{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:7px}\
.gr-row{display:grid;grid-template-columns:34px 46px 1fr auto;gap:8px;align-items:center;background:#fff;border:2px solid var(--gr-navy);border-radius:14px;padding:6px 10px 6px 6px}\
.gr-row.me{background:#E3FAF7;border-color:var(--gr-tealD);box-shadow:0 0 0 2px var(--gr-teal)}\
.gr-rk{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;font-weight:900;background:#EDE7D6;border:2px solid var(--gr-navy)}.gr-rk.gr-r1{background:var(--gr-gold)}.gr-rk.gr-r2{background:#D5DBE0}.gr-rk.gr-r3{background:#E0A06A}\
.gr-av{width:44px;height:44px;border-radius:50%;overflow:hidden;background:#DCF5E3;border:2px solid var(--gr-navy);display:grid;place-items:center}.gr-av svg{width:100%;height:100%}\
.gr-nm{min-width:0}.gr-nm b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:.95rem}.gr-nm span{font-size:.72rem;font-weight:700;opacity:.72}\
.gr-pt{text-align:right}.gr-pt b{font-size:1.1rem}.gr-pt span{display:block;font-size:.68rem;font-weight:700;opacity:.7}\
.gr-more{display:block;width:100%;margin-top:10px;padding:10px;font:inherit;font-weight:800;border:3px solid var(--gr-navy);border-radius:12px;background:#fff;color:var(--gr-navy);cursor:pointer}\
.gr-week{margin-top:12px}.gr-week h3{margin:0 0 6px;font-size:.95rem}\
.gr-pod{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;align-items:end}.gr-pod>div{background:#fff;border:3px solid var(--gr-navy);border-radius:14px;text-align:center;padding:8px 4px}.gr-pod>div:nth-child(1){order:2;background:#FFF1C9;padding-bottom:14px}.gr-pod>div:nth-child(2){order:1}.gr-pod>div:nth-child(3){order:3}\
.gr-pod .gr-av{margin:0 auto 4px;width:54px;height:54px}.gr-pod b{display:block;font-size:.82rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gr-pod span{font-size:.7rem;font-weight:700;display:block;opacity:.8}\
.gr-pack{display:inline-block;margin:2px 2px 0;padding:1px 7px;border-radius:999px;color:#fff;font-size:.66rem;font-weight:800;border:2px solid var(--gr-navy)}\
.gr-how{font-size:.88rem;line-height:1.45}.gr-how li{margin:3px 0}\
.gr-prize{text-align:center}.gr-prize .gr-av{width:120px;height:120px;margin:6px auto}.gr-prize h2{font-size:1.7rem}\
/* ---------- fullscreen game stage ---------- */\
.grx-stage{position:fixed;inset:0;z-index:9000;background:#CDE9F2;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;overscroll-behavior:none;font-family:'Lexend',system-ui,sans-serif}\
body.grx-playing{overflow:hidden;overscroll-behavior:none}body.grx-playing .tabbar{display:none}\
.grx-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}\
.grx-hud{position:absolute;inset:0;pointer-events:none;color:#fff;overflow:hidden}.grx-hud button{pointer-events:auto}\
.grx-top{position:absolute;left:0;right:0;top:0;padding:max(10px,env(safe-area-inset-top)) 12px 0;display:flex;flex-direction:column;gap:8px}\
.grx-prog{position:relative;height:14px;border-radius:99px;background:rgba(19,35,47,.55);border:3px solid var(--gr-navy);margin:0 4px}.grx-pf{position:absolute;inset:0;background:linear-gradient(90deg,var(--gr-teal),var(--gr-gold));transform-origin:0 50%;transform:scaleX(0);border-radius:99px}\
.grx-pm{position:absolute;inset:0}.grx-pm u{position:absolute;top:-3px;width:6px;height:14px;margin-left:-3px;background:#fff;border:2px solid var(--gr-navy);border-radius:3px}.grx-pm s{position:absolute;top:-6px;width:12px;height:20px;margin-left:-12px;background:repeating-conic-gradient(#13232F 0 25%,#fff 0 50%) 0 0/8px 8px;border:2px solid var(--gr-navy)}\
.grx-me{position:absolute;top:-5px;width:20px;height:20px;margin-left:-10px;border-radius:50%;background:var(--gr-gold);border:3px solid var(--gr-navy)}\
.grx-stats{display:flex;gap:8px;align-items:center;justify-content:space-between}\
.grx-time{font-weight:900;font-size:1.25rem;font-variant-numeric:tabular-nums;background:rgba(19,35,47,.78);padding:4px 12px;border-radius:12px;border:3px solid var(--gr-navy)}\
.grx-pen{font-weight:900;background:var(--gr-red);padding:3px 9px;border-radius:10px;border:3px solid var(--gr-navy)}.grx-pen.pop{animation:grxpop .4s}\
.grx-coins{margin-left:auto;display:flex;align-items:center;gap:6px;font-weight:900;font-size:1.1rem;background:rgba(19,35,47,.78);padding:4px 12px;border-radius:12px;border:3px solid var(--gr-navy)}.grx-coins i{width:16px;height:16px;border-radius:50%;background:var(--gr-gold);border:2px solid #fff;display:block}\
.grx-pause{width:42px;height:38px;font:900 14px system-ui;letter-spacing:2px;color:#fff;background:rgba(19,35,47,.78);border:3px solid var(--gr-navy);border-radius:12px}\
.grx-q{position:absolute;left:50%;top:max(84px,calc(env(safe-area-inset-top) + 72px));transform:translateX(-50%);width:min(92vw,640px);background:rgba(19,35,47,.92);border:3px solid var(--gr-gold);border-radius:16px;padding:8px 12px 10px;animation:grxin .3s}\
.grx-q em{font-style:normal;font-size:.7rem;font-weight:800;color:var(--gr-gold);letter-spacing:.8px;text-transform:uppercase}.grx-q b{display:block;font-size:1.05rem;line-height:1.25;margin:2px 0 7px}\
.grx-q div{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.grx-q span{background:#FFF6E2;color:var(--gr-navy);border-radius:10px;padding:6px 6px;font-weight:800;font-size:.8rem;line-height:1.15;text-align:center;display:flex;flex-direction:column;align-items:center;gap:2px;word-break:break-word}\
.grx-q span i{font-style:normal;background:var(--gr-navy);color:#fff;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:.72rem}\
.grx-banner{position:absolute;left:50%;top:34%;transform:translateX(-50%);width:min(88vw,460px);text-align:center;border:4px solid var(--gr-navy);border-radius:18px;padding:10px 14px;box-shadow:0 5px 0 var(--gr-navy);animation:grxpop .35s}\
.grx-banner b{display:block;font-size:1.7rem;font-family:'Kalam','Lexend',sans-serif}.grx-banner span{display:block;font-weight:700;font-size:.9rem;line-height:1.3}.grx-banner u{text-decoration:none;background:#fff;color:var(--gr-navy);padding:0 6px;border-radius:6px}\
.grx-banner.ok{background:#3DDC84;color:var(--gr-navy)}.grx-banner.bad{background:var(--gr-red);color:#fff}\
.grx-count{position:absolute;left:0;right:0;top:30%;text-align:center;font-weight:900;font-size:7rem;font-family:'Kalam','Lexend',sans-serif;color:#fff;text-shadow:0 6px 0 var(--gr-navy),4px 4px 0 var(--gr-navy),-4px 4px 0 var(--gr-navy),4px -3px 0 var(--gr-navy),-4px -3px 0 var(--gr-navy);animation:grxpop .5s}.grx-count.go{color:var(--gr-gold)}\
.grx-fade{position:absolute;inset:0;background:#fff;opacity:0}\
.grx-touch{display:none}.is-touch .grx-touch{display:block}\
.grx-joy{position:absolute;left:max(18px,env(safe-area-inset-left));bottom:max(22px,env(safe-area-inset-bottom));width:124px;height:124px;border-radius:50%;background:rgba(19,35,47,.38);border:4px solid rgba(255,255,255,.7);pointer-events:auto;touch-action:none;display:grid;place-items:center}\
.grx-knob{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.9);border:4px solid var(--gr-navy);pointer-events:none;will-change:transform}\
.grx-jump{position:absolute;right:max(22px,env(safe-area-inset-right));bottom:max(30px,env(safe-area-inset-bottom));width:96px;height:96px;border-radius:50%;font:900 .95rem 'Lexend',system-ui;color:var(--gr-navy);background:var(--gr-gold);border:5px solid var(--gr-navy);box-shadow:0 5px 0 var(--gr-navy);touch-action:none;pointer-events:auto}.grx-jump.on{transform:translateY(4px);box-shadow:0 1px 0 var(--gr-navy);background:#FFD86B}\
.grx-load{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:linear-gradient(#13232F,#0B7A63);color:#fff;transition:opacity .45s;z-index:5}.grx-load.done{opacity:0}.grx-load b{font:900 2.4rem 'Kalam','Lexend',sans-serif;color:var(--gr-gold)}.grx-load span{font-weight:700;opacity:.85}\
.grx-spin{width:46px;height:46px;border:6px solid rgba(255,255,255,.25);border-top-color:var(--gr-gold);border-radius:50%;animation:grxspin .8s linear infinite}\
.grx-pausebox,.grx-results{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(19,35,47,.7);pointer-events:auto;padding:14px;overflow:auto;z-index:4}\
.grx-pausebox>div{background:#FFF6E2;color:var(--gr-navy);border:4px solid var(--gr-navy);border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:10px;width:min(86vw,320px);box-shadow:0 6px 0 var(--gr-navy)}.grx-pausebox h3{margin:0;font:1.9rem 'Kalam','Lexend',sans-serif;text-align:center}\
.grx-btn{font:inherit;font-weight:900;font-size:1rem;padding:12px;border:3px solid var(--gr-navy);border-radius:14px;background:#fff;color:var(--gr-navy);box-shadow:0 4px 0 var(--gr-navy);cursor:pointer;pointer-events:auto}.grx-btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--gr-navy)}.grx-btn.pri{background:var(--gr-gold)}\
.grx-res{background:#FFF6E2;color:var(--gr-navy);border:4px solid var(--gr-navy);border-radius:22px;box-shadow:0 7px 0 var(--gr-navy);padding:16px;width:min(94vw,470px);animation:grxin .5s;text-align:center;margin:auto}\
.grx-res h2{margin:0;font:2.3rem 'Kalam','Lexend',sans-serif;line-height:1}.grx-res .tm{font-weight:900;font-size:2.6rem;font-variant-numeric:tabular-nums;margin:2px 0}\
.grx-res .pts{display:inline-block;background:var(--gr-navy);color:var(--gr-gold);font-weight:900;font-size:1.5rem;border-radius:14px;padding:4px 16px;margin:4px 0}\
.grx-res .badge{display:inline-block;background:var(--gr-red);color:#fff;font-weight:900;font-size:.8rem;padding:3px 10px;border-radius:99px;border:2px solid var(--gr-navy);margin-left:6px;animation:grxpop .6s}\
.grx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:10px 0}.grx-grid div{background:#fff;border:2px solid var(--gr-navy);border-radius:12px;padding:7px 2px}.grx-grid b{display:block;font-size:1.25rem}.grx-grid span{font-size:.68rem;font-weight:800;opacity:.75}\
.grx-rank{font-weight:800;margin:6px 0;font-size:.95rem}.grx-acts{display:flex;flex-direction:column;gap:8px;margin-top:10px}\
@keyframes grxpop{0%{transform:translateX(-50%) scale(.6);opacity:0}60%{transform:translateX(-50%) scale(1.08)}100%{transform:translateX(-50%) scale(1);opacity:1}}\
.grx-pen.pop{animation:grxpop2 .4s}@keyframes grxpop2{0%{transform:scale(1.6)}100%{transform:scale(1)}}\
.grx-res,.gr-prize{animation-name:grxin2}@keyframes grxin2{from{transform:translateY(24px) scale(.94);opacity:0}to{transform:none;opacity:1}}\
@keyframes grxin{from{opacity:0}to{opacity:1}}@keyframes grxspin{to{transform:rotate(360deg)}}\
.grx-count{transform:none}@keyframes grxcount{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}.grx-count{animation-name:grxcount}\
@media (prefers-reduced-motion:reduce){.grx-banner,.grx-count,.grx-res{animation:none}}\
@media (max-height:480px){.grx-q{top:62px}.grx-q b{font-size:.9rem}.grx-banner{top:24%}.grx-count{font-size:5rem;top:20%}}\
";
  function injectCss() { if (document.getElementById("gr-css")) return; var s = document.createElement("style"); s.id = "gr-css"; s.textContent = CSS; document.head.appendChild(s); }

  /* =====================================================================  small helpers */
  var ord = function (n) { var s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
  var weekLabel = function (w) { try { var d = new Date(w + "T00:00:00Z"); return d.toLocaleDateString(undefined, { day: "numeric", month: "short", timeZone: "UTC" }); } catch (e) { return w; } };
  var packSpan = function (id) { var p = GR.PACKS[id - 1]; return p ? '<span class="gr-pack" style="background:' + p.col + '">' + esc(p.name) + "</span>" : ""; };
  var avHtml = function (cfg, size) { var h = H(); try { return h.avatarSvg(cfg || null, size || 44); } catch (e) { return ""; } };
  ui.packItems = function (id) { return ["hat:grcrown" + id, "extra:grcape" + id, "gl:grvisor" + id]; };

  /* =====================================================================  prizes (weekly rewards) */
  ui.applyRewards = async function () {
    var n = net(), h = H(); if (!n.canCompete() || n.state === "missing") return null;
    var info = n.info; if (!info) return null;
    // packs I own on the server are always unlocked on this phone (also on a new phone)
    var keys = []; (info.packs || []).forEach(function (id) { keys = keys.concat(ui.packItems(id)); }); keys.length && h.grantItems(keys);
    if (!info.pending || !info.pending.length) return null;
    try {
      var got = await n.claim(); if (!got || !got.length) return null;
      var pts = 0, packs = []; got.forEach(function (r) { pts += r.pts || 0; (r.packs || []).forEach(function (p) { packs.push(p); }); });
      pts > 0 && h.addPoints(pts, "Gate Rush weekly prize");
      packs.forEach(function (id) { h.grantItems(ui.packItems(id)); });
      ui.rewardModal(got, pts, packs); return got;
    } catch (e) { return null; }
  };
  ui.rewardModal = function (got, pts, packs) {
    var h = H(), top = got.slice().sort(function (a, b) { return a.rank - b.rank; })[0], seen = {}, uniq = packs.filter(function (p) { return seen[p] ? false : (seen[p] = 1); });
    var wear = {}; if (uniq.length) { var id = uniq[0]; wear = { hat: "grcrown" + id, extra: "grcape" + id, gl: "grvisor" + id }; }
    var cfg = Object.assign({}, h.avatarCfg(), wear);
    var m = h.openModal('<div class="gr-prize"><h2>' + (top.rank <= 3 ? "🏆 You placed " + ord(top.rank) + "!" : "Weekly prize!") + '</h2><p>Gate Rush week of ' + esc(weekLabel(top.week)) + (got.length > 1 ? " and " + (got.length - 1) + " earlier week" + (got.length > 2 ? "s" : "") : "") + '</p><div class="gr-av">' + avHtml(cfg, 120) + '</div>' +
      '<p><b>+' + pts + ' points</b> added to your score</p>' + (uniq.length ? "<p>" + uniq.map(packSpan).join("") + '</p><p>New exclusive outfit' + (packs.length > 1 ? "s" : "") + " unlocked! Wear them in your avatar maker. These cannot be bought with points.</p>" : "") +
      '<button class="gr-go" type="button" id="gr-ok" style="margin-top:6px">Awesome!</button></div>');
    m.el.querySelector("#gr-ok").addEventListener("click", m.close); try { h.confetti(90); } catch (e) {}
  };

  /* =====================================================================  entry screen */
  var tab = "race", boardOff = 0, boardRows = [], champOff = 0, champWeeks = [];
  ui.mount = async function () {
    injectCss(); var h = H(), app = h.app; window.scrollTo(0, 0);
    app.dataset.tab = "gaterush"; draw(); await net().sync(); if (!app.isConnected || app.dataset.tab !== "gaterush") return;
    draw(); ui.applyRewards().then(function () { app.dataset.tab === "gaterush" && draw(); });
  };
  function draw() {
    var h = H(), app = h.app, n = net(), info = n.info, loc = n.local(), can = n.canCompete(), me = h.me();
    var best = info ? info.best : loc.best, used = info ? info.used : loc.races, max = n.cfg.max_scored, left = Math.max(0, max - used);
    var rank = info && info.rank ? ord(info.rank) : "–";
    var statusNote = "";
    if (!can) statusNote = '<div class="gr-note">You are playing as a guest. You can race for practice. Join a class on your profile to enter the weekly competition.</div>';
    else if (n.state === "missing") statusNote = '<div class="gr-note bad">The shared leaderboard is not switched on yet. You can still race! Your best score is saved on this phone. (Teacher: run <b>gate-rush.sql</b> once in Supabase.)</div>';
    else if (n.state === "offline") statusNote = '<div class="gr-note">Could not reach the leaderboard right now. You can still race; try again later to compete.</div>';
    var left_t = info ? n.fmtLeft(info.ends - Date.now()) : n.fmtLeft(n.weekEndsMs() - Date.now());
    var body = "";
    if (tab === "race") body = raceHtml();
    else if (tab === "maps") body = mapsHtml();
    else if (tab === "board") body = '<div class="gr-card"><h2>Weekly Leaderboard</h2><div id="gr-board"><p class="muted">Loading…</p></div></div>';
    else if (tab === "champs") body = '<div class="gr-card"><h2>Weekly Champions</h2><div id="gr-champs"><p class="muted">Loading…</p></div></div>';
    else body = '<div class="gr-card"><h2>My prizes</h2><div id="gr-mine"><p class="muted">Loading…</p></div></div>';
    app.innerHTML = '<section class="gr-wrap"><div class="gr-hero"><h1>GATE<br><b>RUSH</b></h1><p>Run, jump and smash the right door. English is your key.</p>' + fortSvg() + '</div>' +
      statusNote +
      '<div class="gr-tabs" role="tablist"><button data-t="race" class="' + (tab === "race" ? "on" : "") + '">Weekly race</button><button data-t="maps" class="' + (tab === "maps" ? "on" : "") + '">Maps</button><button data-t="board" class="' + (tab === "board" ? "on" : "") + '">Leaderboard</button><button data-t="champs" class="' + (tab === "champs" ? "on" : "") + '">Champions</button><button data-t="mine" class="' + (tab === "mine" ? "on" : "") + '">Prizes</button></div>' + body + '</section>';
    app.querySelectorAll(".gr-tabs button").forEach(function (b) { b.addEventListener("click", function () { tab = b.dataset.t; draw(); }); });
    if (tab === "race") {
      var go = app.querySelector("#gr-go"); go && go.addEventListener("click", function () { ui.startRace(); });
      var adm = app.querySelector("#gr-adm"); adm && adm.addEventListener("click", function () { ui.admin(); });
    }
    if (tab === "maps") bindMaps(app);
    if (tab === "board") loadBoard(true); if (tab === "champs") loadChamps(true); if (tab === "mine") loadMine();
  }
  function fortSvg() {
    return '<svg class="gr-fort" viewBox="0 0 240 150" aria-hidden="true"><g stroke="#13232F" stroke-width="4" stroke-linejoin="round"><rect x="10" y="70" width="60" height="80" fill="#D9C7A3"/><rect x="10" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="34" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="56" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="90" y="30" width="70" height="120" fill="#E8C98F"/><rect x="90" y="16" width="16" height="14" fill="#E8C98F"/><rect x="116" y="16" width="16" height="14" fill="#E8C98F"/><rect x="144" y="16" width="16" height="14" fill="#E8C98F"/><path d="M110 150v-34a15 15 0 0 1 30 0v34z" fill="#B07A45"/><rect x="180" y="84" width="50" height="66" fill="#D9C7A3"/><rect x="180" y="70" width="12" height="14" fill="#D9C7A3"/><rect x="204" y="70" width="12" height="14" fill="#D9C7A3"/><path d="M125 16V-6l24 8-24 8" fill="#27C3C3"/></g></svg>';
  }
  function raceHtml() {
    var h = H(), n = net(), info = n.info, loc = n.local(), can = n.canCompete(), map = GR.maps.fort;
    var best = info ? info.best : loc.best, used = info ? info.used : loc.races, max = n.cfg.max_scored, left = Math.max(0, max - used);
    var bt = info ? info.best_time : loc.bestTime;
    var cfg = n.cfg, left_t = n.fmtLeft((info ? info.ends : n.weekEndsMs()) - Date.now());
    return '<div class="gr-card"><div class="gr-map"><div class="gr-mini"><i></i><i></i><i></i></div><div><h3>' + esc(map.name) + '</h3><p>The fort course. Parkour, boulders and ' + map.gates + ' English doors.</p></div></div>' +
      '<div class="gr-chips"><span class="gr-chip">' + map.gates + ' question gates</span><span class="gr-chip">About 2 min</span><span class="gr-chip">Week ends in ' + esc(left_t) + '</span></div></div>' +
      '<div class="gr-card"><h2>My week</h2><div class="gr-stats"><div><b>' + (best || 0) + '</b><span>Best score</span></div><div><b>' + (bt ? n.fmtTime(bt).slice(0, -3) : "–") + '</b><span>Best time</span></div><div><b>' + (info && info.rank ? ord(info.rank) : "–") + '</b><span>Position</span></div><div><b>' + (can ? left : "∞") + '</b><span>' + (can ? "Scored races left" : "Practice") + '</span></div></div>' +
      (can && left === 0 ? '<div class="gr-note">You used all ' + max + ' scored races this week. You can still race for practice!</div>' : "") + '</div>' +
      '<button id="gr-go" class="gr-go" type="button">' + h.icon("play", 24) + ' START RACE</button>' +
      '<div class="gr-card"><h2>How it works</h2><ul class="gr-how"><li><b>Run</b> with WASD or the arrow keys and <b>jump</b> with Space. On a phone, use the joystick and the jump button.</li><li><b>Read the question</b>, then run into the door with the right answer. The right door breaks. A wrong one bounces you back and costs 2 seconds.</li><li><b>Score</b> = ' + cfg.per_correct + ' points per correct answer, a speed bonus (up to ' + cfg.time_max + '), coins (' + cfg.coin + ' each, up to ' + cfg.coin_cap + ') and −' + cfg.hit_pen + ' for every obstacle hit.</li><li>Your <b>best race</b> of the week counts. At most ' + max + ' races are scored each week.</li><li>The top 3 win exclusive outfits! Positions 1–10 win bonus points. Everyone who races gets points.</li></ul></div>' +
      '<p style="text-align:center;margin:14px 0 0"><button id="gr-adm" type="button" style="background:none;border:0;font:inherit;font-size:.78rem;opacity:.6;text-decoration:underline;cursor:pointer;color:inherit">Teacher tools</button></p>';
  }

  /* ---------- topic maps (epz-patch:maps): World 1, Topic mode and Book mode, personal bests on this phone ---------- */
  var MAPS = [["t01", "⏰", "Present Simple", "Daily Routine Town", "#F2B632"], ["t02", "🎬", "Present Continuous", "Live TV Studio", "#7C5CFA"], ["t03", "🦴", "Past Simple", "Dinosaur Dig Site", "#E8590C"],
    ["t04", "🚂", "Past Continuous", "Midnight Express", "#2B41C4"], ["t05", "🏆", "Present Perfect", "Hall of Achievements", "#C9A227"], ["t06", "🏛️", "Past Perfect", "Layers of the Ancient Ruins", "#4E9A57"],
    ["t07", "🚀", "Future Simple", "Rocket Launch Base", "#E5484D"], ["t08", "⛈️", "Future Forms", "Weather Forecast Tower", "#46617A"], ["t09", "⏳", "Present Perfect Continuous", "Hourglass Desert", "#C98F12"], ["t10", "🌀", "Mixed Tenses", "Time Portal Gauntlet", "#8B5CF6"]];
  var TOPIC = { t01: "present-simple", t02: "present-continuous", t03: "past-simple", t04: "past-continuous", t05: "present-perfect", t06: "past-perfect", t07: "future-simple", t08: "future-forms", t09: "present-perfect-continuous", t10: "mixed-tenses" };
  function pref() { try { return JSON.parse(localStorage.getItem("gr-maps-pref") || "{}"); } catch (e) { return {}; } }
  function setPref(k, v) { try { var p = pref(); p[k] = v; localStorage.setItem("gr-maps-pref", JSON.stringify(p)); } catch (e) {} }
  function pbs() { try { return JSON.parse(localStorage.getItem("gr-pb-v1") || "{}"); } catch (e) { return {}; } }
  function lessonMap(l, i) { var t = (l.title || "").toLowerCase(); return /present simple/.test(t) ? "t01" : /past simple/.test(t) ? "t03" : /future/.test(t) ? "t08" : MAPS[i % MAPS.length][0]; }
  function mapsHtml() {
    var p = pref(), mode = p.mode || "topic", easy = !!p.easy, best = pbs(), n = net();
    var head = '<div class="gr-card"><h2>World 1 · Tenses World</h2><p class="muted" style="margin:2px 0 8px">Ten practice maps, each with its own place, obstacles and tense. Only Sunrise Fort counts for the weekly leaderboard; your best time on each map is saved on this phone.</p>' +
      '<div class="gr-mode" role="group" aria-label="How to choose questions"><button type="button" data-mode="topic" class="' + (mode === "topic" ? "on" : "") + '">Topic maps</button><button type="button" data-mode="book" class="' + (mode === "book" ? "on" : "") + '">Book mode</button></div>' +
      '<div class="gr-mode" role="group" aria-label="Parkour level"><button type="button" data-easy="0" class="' + (!easy ? "on" : "") + '">Normal parkour</button><button type="button" data-easy="1" class="' + (easy ? "on" : "") + '">Easy parkour</button></div></div>';
    if (mode === "topic") return head + '<div class="gr-maps">' + MAPS.map(function (m, i) {
      var b = best[m[0]]; return '<button type="button" class="gr-mapc" data-map="' + m[0] + '" style="--mc:' + m[4] + '"><span class="ic">' + m[1] + '</span><small>Map ' + (i + 1) + ' · ' + esc(m[2]) + '</small><b>' + esc(m[3]) + '</b><span class="pb">' + (b ? "Best " + n.fmtTime(b).slice(0, -3) : "Not raced yet") + '</span></button>';
    }).join("") + "</div>";
    var units = n.bookUnits(), g = String(H().me().grade || "9");
    if (!units.length || g !== "9") return head + '<div class="gr-card"><p>Book mode uses the Grade 9 textbook (Book 9A). More books are coming. For now, choose a topic map.</p></div>';
    return head + '<div class="gr-card"><h2>Book 9A</h2><p class="muted" style="margin:2px 0 6px">Pick the lesson you are studying. The race asks that lesson\'s questions.</p>' + units.map(function (u) {
      var ls = u.lessons.map(function (l, i) { return [l, i]; }).filter(function (x) { var l = x[0]; return l.kind !== "reading" && l.kind !== "writing" && (l.qs || []).filter(function (q) { return q.type === "mcq" && q.options && q.options.length >= 3; }).length >= 3; });
      return ls.length ? '<h3 class="gr-unit">' + esc(u.label + " · " + u.name) + '</h3>' + ls.map(function (x) { var mid = lessonMap(x[0], x[1]), m = MAPS.find(function (y) { return y[0] === mid; }); return '<button type="button" class="gr-les" data-u="' + u.id + '" data-l="' + x[0].id + '" data-map="' + mid + '"><span>' + m[1] + '</span><b>' + esc(x[0].title) + '</b><span>' + esc(m[3]) + ' ›</span></button>'; }).join("") : "";
    }).join("") + "</div>";
  }
  function bindMaps(app) {
    app.querySelectorAll("[data-mode]").forEach(function (b) { b.addEventListener("click", function () { setPref("mode", b.dataset.mode); draw(); }); });
    app.querySelectorAll("[data-easy]").forEach(function (b) { b.addEventListener("click", function () { setPref("easy", b.dataset.easy === "1"); draw(); }); });
    app.querySelectorAll(".gr-mapc").forEach(function (b) { b.addEventListener("click", function () { ui.startRace({ map: b.dataset.map, topic: TOPIC[b.dataset.map], easy: !!pref().easy }); }); });
    app.querySelectorAll(".gr-les").forEach(function (b) { b.addEventListener("click", function () { ui.startRace({ map: b.dataset.map, book: { u: b.dataset.u, l: b.dataset.l }, easy: !!pref().easy }); }); });
  }
  var mapReady = {};
  function loadMapFiles(id) {
    if (mapReady[id]) return mapReady[id];
    var js = function (src) { return new Promise(function (ok, bad) { if (document.querySelector('script[data-gr="' + src + '"]')) return ok(); var s = document.createElement("script"); s.src = "gaterush/" + src + "?v=1"; s.dataset.gr = src; s.async = false; s.onload = ok; s.onerror = function () { bad(new Error("load " + src)); }; document.head.appendChild(s); }); };
    return mapReady[id] = js("course.js").then(function () { return js("maps-w1.js"); }).catch(function (e) { mapReady[id] = null; throw e; });
  }

  /* ---------- leaderboard ---------- */
  function boardUnavailable() { var n = net(); return n.state === "missing" ? "The shared leaderboard is not switched on yet." : n.state === "guest" || !n.canCompete() ? "Join a class on your profile to see the leaderboard." : null; }
  async function loadBoard(reset) {
    var el = document.getElementById("gr-board"), n = net(), me = H().me(); if (!el) return;
    var un = boardUnavailable(); if (un) { el.innerHTML = '<p class="muted">' + un + "</p>"; return; }
    if (reset) { boardOff = 0; boardRows = []; }
    try { var rows = await n.board(me.grade, boardOff); boardRows = boardRows.concat(rows || []); boardOff += 20; }
    catch (e) { if (!document.getElementById("gr-board")) return; el.innerHTML = '<p class="muted">' + (n.state === "missing" ? "The shared leaderboard is not switched on yet." : "Could not load the leaderboard. Check your connection.") + "</p>"; return; }
    el = document.getElementById("gr-board"); if (!el) return;
    var myPid = n.pid();
    if (!boardRows.length) { el.innerHTML = '<p class="muted">No one has raced yet this week for Grade ' + esc(me.grade) + '. Be the first!</p>'; return; }
    el.innerHTML = '<p class="muted" style="margin:0">Grade ' + esc(me.grade) + ' · best race of the week · ' + esc(n.fmtLeft(n.weekEndsMs() - Date.now())) + ' left</p><ol class="gr-list">' + boardRows.map(function (r) {
      return '<li class="gr-row' + (r.pid === myPid ? " me" : "") + '"><span class="gr-rk gr-r' + (r.rank <= 3 ? r.rank : "") + '">' + r.rank + '</span><span class="gr-av">' + avHtml(r.avatar, 44) + '</span><span class="gr-nm"><b>' + esc(r.name) + '</b><span>' + (r.cls ? "Class " + esc(r.cls) + " · " : "") + esc(n.fmtTime(r.time).slice(0, -3)) + " · " + r.acc + "% accuracy · " + r.races + ' race' + (r.races === 1 ? "" : "s") + '</span></span><span class="gr-pt"><b>' + r.score + '</b><span>points</span></span></li>';
    }).join("") + '</ol>' + (boardRows.length % 20 === 0 ? '<button class="gr-more" id="gr-more" type="button">Show more</button>' : "");
    var mb = document.getElementById("gr-more"); mb && mb.addEventListener("click", function () { loadBoard(false); });
  }

  /* ---------- Weekly Champions ---------- */
  async function loadChamps(reset) {
    var el = document.getElementById("gr-champs"), n = net(), me = H().me(); if (!el) return;
    var un = boardUnavailable(); if (un) { el.innerHTML = '<p class="muted">' + un + "</p>"; return; }
    if (reset) { champOff = 0; champWeeks = []; }
    try { var w = await n.champions(me.grade, champOff); champWeeks = champWeeks.concat(w || []); champOff += 4; }
    catch (e) { if (document.getElementById("gr-champs")) document.getElementById("gr-champs").innerHTML = '<p class="muted">Could not load the champions.</p>'; return; }
    el = document.getElementById("gr-champs"); if (!el) return;
    if (!champWeeks.length) { el.innerHTML = '<p class="muted">No finished weeks yet. The first champions appear when this week ends. Race now to be one of them!</p>'; return; }
    el.innerHTML = champWeeks.map(function (wk) {
      return '<div class="gr-week"><h3>Week of ' + esc(weekLabel(wk.week)) + '</h3><div class="gr-pod">' + wk.top.map(function (t) {
        return '<div><span class="gr-rk gr-r' + t.rank + '" style="margin:0 auto 4px">' + t.rank + '</span><div class="gr-av">' + avHtml(t.avatar, 54) + '</div><b>' + esc(t.name) + '</b><span>' + t.score + ' pts</span><span>+' + t.pts + ' bonus</span>' + (t.packs || []).map(packSpan).join("") + '</div>';
      }).join("") + '</div></div>';
    }).join("") + (champWeeks.length % 4 === 0 ? '<button class="gr-more" id="gr-cmore" type="button">Older weeks</button>' : "");
    var mb = document.getElementById("gr-cmore"); mb && mb.addEventListener("click", function () { loadChamps(false); });
  }
  async function loadMine() {
    var el = document.getElementById("gr-mine"), n = net(); if (!el) return;
    var un = boardUnavailable(); if (un) { el.innerHTML = '<p class="muted">' + un + "</p>"; return; }
    try {
      var rows = await n.history(0); el = document.getElementById("gr-mine"); if (!el) return;
      var owned = (n.info && n.info.packs) || [];
      var own = owned.length ? '<p><b>Exclusive packs you own:</b> ' + owned.map(packSpan).join("") + '</p>' : '<p class="muted">You have no exclusive packs yet. Finish in the top 3 of a week to win one!</p>';
      el.innerHTML = own + (rows && rows.length ? '<ol class="gr-list">' + rows.map(function (r) { return '<li class="gr-row" style="grid-template-columns:34px 1fr auto"><span class="gr-rk gr-r' + (r.rank <= 3 ? r.rank : "") + '">' + r.rank + '</span><span class="gr-nm"><b>Week of ' + esc(weekLabel(r.week)) + '</b><span>' + r.score + " points · " + r.races + " races</span>" + (r.packs || []).map(packSpan).join("") + '</span><span class="gr-pt"><b>+' + r.pts + '</b><span>prize pts</span></span></li>'; }).join("") + "</ol>" : '<p class="muted">Your weekly results will appear here after a week ends.</p>');
    } catch (e) { el.innerHTML = '<p class="muted">Could not load your prizes.</p>'; }
  }

  /* =====================================================================  race launcher + results */
  var stage = null, game = null, racing = false;
  ui.startRace = async function (opt) {
    opt = opt || {}; if (racing) return; racing = true; var h = H(), n = net(), map = GR.maps.fort, practice = !!opt.map;
    stage = document.createElement("div"); stage.className = "grx-stage"; document.body.appendChild(stage); document.body.classList.add("grx-playing");
    stage.innerHTML = '<div class="grx-load"><div class="grx-spin"></div><b>Gate Rush</b><span>Loading 3D engine…</span></div>';
    var T;
    try { T = await h.loadThree(); } catch (e) { exitStage(); h.toast("Could not load the 3D engine. Check your connection.", "error", 4500); return; }
    if (practice) { try { await loadMapFiles(opt.map); map = GR.maps[opt.map]; } catch (e) { exitStage(); h.toast("Could not load this map. Check your connection.", "error", 4500); return; } }
    var qs = [];
    try { qs = !practice ? n.pick(map.gates) : opt.book ? n.pickLesson(opt.book.u, opt.book.l, map.gates) : await n.pickTopic(opt.topic, map.gates); } catch (e) { qs = []; }
    if (!stage) { racing = false; return; }
    if (qs.length < map.gates) { exitStage(); h.toast("Not enough questions for this map yet.", "error", 4500); return; }
    var runPromise = practice ? null : n.startRun();
    stage.innerHTML = "";
    try {
      var cfg = h.avatarCfg();
      game = GR.Game({ T: T, host: h, container: stage, map: map, questions: qs, cfg: cfg, colors: h.colors(cfg), easy: !!opt.easy,
        onFinish: function (res) { practice ? onPractice(res, opt, map) : onFinish(res, runPromise); },
        onRestart: function () { disposeGame(); racing = false; stage.remove(); stage = null; document.body.classList.remove("grx-playing"); ui.startRace(opt); },
        onExit: function () { exitStage(); } });
      game.start(); /[?&]grdebug/.test(location.search) && (GR.game = game);
    } catch (e) { console.error(e); exitStage(); h.toast("Gate Rush could not start on this device.", "error", 4500); }
  };
  function disposeGame() { try { game && game.dispose(); } catch (e) {} game = null; }
  function exitStage() {
    disposeGame(); racing = false; stage && stage.remove(); stage = null; document.body.classList.remove("grx-playing");
    var h = H(); if (h.app.dataset.tab === "gaterush" || location.hash === "#gaterush") { h.app.dataset.tab = "gaterush"; draw(); ui.mount && net().sync().then(function () { h.app.dataset.tab === "gaterush" && draw(); }); }
  }
  function onPractice(res, opt, map) {
    var n = net(), host = stage; if (!host) return;
    var acc = res.total ? Math.round(100 * res.correct / res.total) : 0, best = pbs(), prev = best[opt.map], isNew = !prev || res.timeMs < prev;
    if (isNew) { best[opt.map] = res.timeMs; try { localStorage.setItem("gr-pb-v1", JSON.stringify(best)); } catch (e) {} }
    var box = document.createElement("div"); box.className = "grx-results";
    box.innerHTML = '<div class="grx-res"><h2>' + esc(map.name) + '</h2><div class="tm">' + n.fmtTime(res.timeMs) + '</div>' + (isNew ? '<span class="badge">NEW BEST!</span>' : '<div class="grx-rank">Best: ' + n.fmtTime(prev) + '</div>') +
      '<div class="grx-grid"><div><b>' + acc + '%</b><span>English accuracy</span></div><div><b>' + res.correct + '</b><span>Correct</span></div><div><b>' + res.wrong + '</b><span>Incorrect</span></div><div><b>' + res.coins + '/' + res.coinsTotal + '</b><span>Coins</span></div></div>' +
      '<div class="grx-rank">' + esc(map.title || "") + ' practice · ' + (opt.book ? "Book mode" : "Topic map") + (opt.easy ? " · Easy parkour" : "") + '</div><div class="grx-acts"><button class="grx-btn pri" id="gr-again" type="button">Race again</button><button class="grx-btn" id="gr-maps" type="button">Choose another map</button></div></div>';
    host.appendChild(box);
    box.querySelector("#gr-again").addEventListener("click", function () { disposeGame(); racing = false; host.remove(); stage = null; document.body.classList.remove("grx-playing"); ui.startRace(opt); });
    box.querySelector("#gr-maps").addEventListener("click", function () { tab = "maps"; exitStage(); });
    if (res.correct === res.total) try { H().confetti(50); } catch (e) {}
  }
  async function onFinish(res, runPromise) {
    var n = net(), h = H(), host = stage; if (!host) return;
    res.score = n.score(res); var acc = res.total ? Math.round(100 * res.correct / res.total) : 0, before = n.info ? n.info.best : n.local().best;
    var box = document.createElement("div"); box.className = "grx-results";
    box.innerHTML = '<div class="grx-res"><h2>Race complete!</h2><div class="tm">' + n.fmtTime(res.timeMs) + '</div><div class="pts">+<span id="gr-sc">0</span> pts</div><span id="gr-new"></span>' +
      '<div class="grx-grid"><div><b>' + acc + '%</b><span>English accuracy</span></div><div><b>' + res.correct + '</b><span>Correct</span></div><div><b>' + res.wrong + '</b><span>Incorrect</span></div><div><b>' + res.coins + '/' + res.coinsTotal + '</b><span>Coins</span></div><div><b>' + res.hits + '</b><span>Obstacles hit</span></div><div><b>' + (res.penaltyMs / 1000).toFixed(0) + 's</b><span>Penalties</span></div></div>' +
      '<div class="grx-rank" id="gr-rank">Saving your result…</div><div class="grx-acts"><button class="grx-btn pri" id="gr-again" type="button">Race again</button><button class="grx-btn" id="gr-lb" type="button">Leaderboard</button><button class="grx-btn" id="gr-done" type="button">Done</button></div></div>';
    host.appendChild(box);
    // count the points up
    var sc = box.querySelector("#gr-sc"), t0 = performance.now(); (function tick(now) { var k = Math.min(1, (now - t0) / 1100); sc.textContent = Math.round(res.score * (1 - Math.pow(1 - k, 3))); if (k < 1 && box.isConnected) requestAnimationFrame(tick); })(t0);
    box.querySelector("#gr-again").addEventListener("click", function () { disposeGame(); racing = false; host.remove(); stage = null; document.body.classList.remove("grx-playing"); ui.startRace(); });
    box.querySelector("#gr-lb").addEventListener("click", function () { tab = "board"; exitStage(); });
    box.querySelector("#gr-done").addEventListener("click", function () { tab = "race"; exitStage(); });
    // record it
    var rankEl = box.querySelector("#gr-rank"), newEl = box.querySelector("#gr-new"), run = null;
    try { run = await runPromise; } catch (e) {}
    var out = null; if (run) out = await n.finishRun(run, res);
    if (!box.isConnected) return;
    if (out && !out.error) {
      res.score = out.score; sc.textContent = out.score;
      if (out.scored) {
        if (out.score > before && out.score > 0) newEl.innerHTML = '<span class="badge">NEW BEST!</span>';
        rankEl.innerHTML = out.rank ? "Weekly leaderboard: <b>" + ord(out.rank) + "</b> of " + out.players + " · best " + out.best + " pts · " + out.left + " scored race" + (out.left === 1 ? "" : "s") + " left" : "Saved to the weekly leaderboard.";
        if (n.info) { n.info.best = out.best; n.info.rank = out.rank; n.info.players = out.players; n.info.used = (n.info.used || 0) + 1; }
      } else rankEl.textContent = "Practice race. It does not count for the weekly leaderboard (limit reached or too fast to verify).";
    } else {
      var loc = n.localSave(res); if (res.score >= loc.best) newEl.innerHTML = '<span class="badge">NEW BEST!</span>';
      rankEl.textContent = !n.canCompete() ? "Guest race. Join a class to compete weekly." : n.state === "missing" ? "Saved on this phone. The shared leaderboard is not switched on yet." : "Saved on this phone. Could not reach the leaderboard.";
    }
    if (res.correct === res.total) try { h.confetti(50); } catch (e) {}
  }

  /* =====================================================================  teacher tools */
  ui.admin = function () {
    injectCss(); var h = H(), n = net(), key = ""; try { key = sessionStorage.getItem("gr-admin") || ""; } catch (e) {}
    var m = h.openModal('<h2 class="modal-title">Gate Rush · teacher tools</h2><div id="gra">' + (key ? "<p>Loading…</p>" : "") + '</div>', { wide: true });
    var box = m.el.querySelector("#gra");
    function ask(msg) {
      box.innerHTML = '<p>' + (msg || "Enter the teacher key you set in gate-rush.sql.") + '</p><input id="gra-k" type="password" placeholder="Teacher key" style="width:100%;padding:10px;border-radius:10px;border:2px solid #13232F"><button class="gr-go" id="gra-ok" type="button" style="margin-top:10px">Open</button>';
      box.querySelector("#gra-ok").addEventListener("click", function () { key = box.querySelector("#gra-k").value; try { sessionStorage.setItem("gr-admin", key); } catch (e) {} load(); });
    }
    async function load() {
      box.innerHTML = "<p>Loading…</p>";
      try {
        var d = await n.rpc("gr_admin_state", { p_key: key });
        box.innerHTML = '<h3>This week (' + esc(weekLabel(d.week)) + ') · remove a score</h3>' + (d.board.length ? '<ol class="gr-list">' + d.board.map(function (r) { return '<li class="gr-row" style="grid-template-columns:1fr auto"><span class="gr-nm"><b>' + esc(r.name) + '</b><span>Grade ' + esc(r.grade) + ' ' + esc(r.cls) + ' · ' + r.score + ' pts · ' + r.races + ' races</span></span><button class="gr-more" style="margin:0;width:auto" data-rm="' + esc(r.pid) + '">Remove</button></li>'; }).join("") + "</ol>" : "<p class='muted'>No scores yet.</p>") +
          '<h3 style="margin-top:14px">Scoring (JSON)</h3><textarea id="gra-s" rows="4" style="width:100%;font:12px monospace">' + esc(JSON.stringify(d.score)) + '</textarea><h3>Prizes (JSON)</h3><textarea id="gra-p" rows="5" style="width:100%;font:12px monospace">' + esc(JSON.stringify(d.prizes)) + '</textarea><button class="gr-go" id="gra-save" type="button" style="font-size:1rem;padding:10px">Save settings</button>' +
          '<h3 style="margin-top:14px">Settled weeks</h3>' + (d.settled.length ? "<ul>" + d.settled.map(function (s) { return "<li>" + esc(weekLabel(s.week)) + " · Grade " + esc(s.grade) + "</li>"; }).join("") + "</ul>" : "<p class='muted'>None yet. A week is settled by the first visit after it ends.</p>");
        box.querySelectorAll("[data-rm]").forEach(function (b) { b.addEventListener("click", async function () { if (!confirm("Remove this student from Gate Rush? They cannot compete again.")) return; try { await n.rpc("gr_admin_remove", { p_key: key, p_pid: b.dataset.rm }); load(); } catch (e) { h.toast("Could not remove", "error"); } }); });
        box.querySelector("#gra-save").addEventListener("click", async function () { try { await n.rpc("gr_admin_set_config", { p_key: key, p_score: JSON.parse(box.querySelector("#gra-s").value), p_prizes: JSON.parse(box.querySelector("#gra-p").value) }); h.toast("Saved", "success"); } catch (e) { h.toast("Not saved. Check the JSON.", "error", 4000); } });
      } catch (e) { ask(n.state === "missing" ? "The Gate Rush tables are not installed yet. Run gate-rush.sql in Supabase first." : "Wrong key, or no connection. Try again."); }
    }
    key ? load() : ask();
  };
})();
