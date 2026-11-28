/* Gate Rush — screens: entry, weekly leaderboard, Weekly Champions, prizes, race launcher, results, teacher tools. */
(function () {
  var GR = (window.GR = window.GR || {});
  var H = function () { return window.GR_HOST; };
  var net = function () { return GR.net; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var ui = (GR.ui = {});

  /* =====================================================================  CSS (injected once) */
  var CSS = "\
.gr-wrap{width:100%;max-width:720px;min-width:0;flex:1 1 0%;margin:0 auto;padding:0 0 28px;color:var(--gr-navy);overflow-x:clip}.gr-tabs,.gr-head{max-width:100%}.gr-wrap *{box-sizing:border-box}.gr-wrap .muted{color:var(--muted,#56618A)}\
.gr-head{position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(135deg,var(--gr-teal) 0%,var(--gr-tealD) 100%);color:#fff;padding:18px 16px 16px;min-height:150px;box-shadow:var(--shadow)}\
.gr-head h1{margin:0;font-family:var(--gr-head,'Kalam','Lexend',sans-serif);font-size:2.2rem;line-height:1;letter-spacing:.5px;color:#fff}.gr-head h1 b{color:var(--gr-gold)}\
.gr-head p{margin:6px 0 0;font-weight:700;font-size:.92rem;max-width:62%;line-height:1.35;opacity:.95}\
.gr-fort{position:absolute;right:-4px;bottom:0;width:40%;max-width:190px;height:auto;pointer-events:none;opacity:.95}\
.gr-headrow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:14px;position:relative}\
.gr-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border-radius:999px;padding:5px 11px;font-weight:800;font-size:.78rem;white-space:nowrap}\
.gr-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;font:inherit;font-weight:900;font-size:1rem;color:var(--gr-navy);background:var(--gr-gold);border:3px solid var(--gr-navy);border-radius:14px;box-shadow:0 4px 0 var(--gr-navy);cursor:pointer;transition:transform .12s,box-shadow .12s,filter .15s}\
.gr-btn:hover{filter:brightness(1.05)}.gr-btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--gr-navy)}.gr-btn.sm{min-height:40px;padding:0 14px;font-size:.88rem;box-shadow:0 3px 0 var(--gr-navy)}.gr-btn.ghost{background:#fff}.gr-btn.wide{width:100%}\
.gr-btn:focus-visible,.gr-tabs button:focus-visible,.gr-opt:focus-visible,.gr-mapc:focus-visible,.gr-les:focus-visible{outline:3px solid var(--gr-teal);outline-offset:2px}\
.gr-tabs{display:flex;gap:6px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;-webkit-overflow-scrolling:touch;position:sticky;top:0;z-index:5;background:var(--bg,#F7F9FD);padding:10px 2px 8px;margin:0 -2px}\
.gr-tabs::-webkit-scrollbar{display:none}\
.gr-tabs button{flex:0 0 auto;scroll-snap-align:center;display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 14px;font:inherit;font-weight:800;font-size:.88rem;white-space:nowrap;color:var(--gr-navy);background:var(--surface,#fff);border:2px solid transparent;border-radius:999px;box-shadow:0 1px 3px rgb(23 34 77 / .14);cursor:pointer;transition:background .15s,transform .1s}\
.gr-tabs button:active{transform:scale(.96)}.gr-tabs button .ic{flex:none}\
.gr-tabs button.on{background:var(--gr-navy);color:#fff;box-shadow:0 3px 0 rgb(23 34 77 / .35)}.gr-tabs button.on .ic{color:var(--gr-gold)}\
@media (min-width:520px){.gr-tabs button{flex:1 1 0;justify-content:center}}\
.gr-sec{margin-top:18px}.gr-sec>h2{margin:0 0 4px;font-family:var(--gr-head,'Kalam','Lexend',sans-serif);font-size:1.3rem;line-height:1.2;color:var(--gr-navy)}\
.gr-sub{margin:0 0 10px;font-size:.86rem;font-weight:600;line-height:1.4;color:var(--muted,#56618A)}\
.gr-card{background:var(--surface,#fff);border-radius:18px;box-shadow:0 1px 3px rgb(23 34 77 / .12),0 6px 16px rgb(23 34 77 / .06);padding:14px;margin-top:12px;color:var(--gr-navy)}\
.gr-week{display:flex;gap:12px;align-items:center}.gr-mini{flex:none;width:76px;height:76px;border-radius:16px;background:linear-gradient(var(--gr-sky,#E3EAF6) 55%,#E8C98F 55%);position:relative;overflow:hidden}\
.gr-mini i{position:absolute;bottom:0;width:18px;background:#D9C7A3;border:2px solid var(--gr-navy);border-bottom:0;border-radius:4px 4px 0 0}.gr-mini i:nth-child(1){left:6px;height:30px}.gr-mini i:nth-child(2){left:28px;height:44px}.gr-mini i:nth-child(3){left:50px;height:26px}\
.gr-week h2{margin:0;font-family:var(--gr-head,'Kalam','Lexend',sans-serif);font-size:1.3rem;line-height:1.15}.gr-week .gr-sub{margin:2px 0 0}\
.gr-status{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:3px 10px;border-radius:999px;font-weight:800;font-size:.74rem;background:var(--good-bg,#DDF5E6);color:var(--good-ink,#0D5530)}\
.gr-status:before{content:\"\";width:7px;height:7px;border-radius:50%;background:currentColor}.gr-status.off{background:var(--surface-2,#EEF2FA);color:var(--muted,#56618A)}.gr-status.warn{background:#FFF1D6;color:#5A3A00}\
.gr-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0 0}.gr-stats div{background:var(--surface-2,#EEF2FA);border-radius:14px;padding:9px 4px;text-align:center;min-width:0}\
.gr-stats b{display:block;font-size:1.2rem;line-height:1.2}.gr-stats span{display:block;font-size:.68rem;font-weight:800;color:var(--muted,#56618A);line-height:1.2;margin-top:2px}\
.gr-card .gr-btn.wide{margin-top:14px;min-height:54px;font-size:1.1rem}\
.gr-note{display:flex;gap:10px;align-items:center;background:#FFF1D6;border-radius:14px;padding:10px 12px;font-size:.85rem;font-weight:700;line-height:1.4;margin-top:12px;color:#5A3A00}.gr-note .gr-btn{flex:none;margin-left:auto}\
.gr-how{margin-top:12px;background:var(--surface,#fff);border-radius:16px;box-shadow:0 1px 3px rgb(23 34 77 / .1);padding:0 14px}.gr-how summary{cursor:pointer;min-height:46px;display:flex;align-items:center;font-weight:800;font-size:.92rem;list-style:none}.gr-how summary::-webkit-details-marker{display:none}.gr-how summary:after{content:\"+\";margin-left:auto;font-size:1.3rem;font-weight:900}.gr-how[open] summary:after{content:\"–\"}\
.gr-how ul{margin:0 0 12px;padding-left:18px;font-size:.86rem;line-height:1.45;font-weight:600}.gr-how li{margin:4px 0}\
.gr-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}\
.gr-opt{display:flex;flex-direction:column;gap:3px;text-align:left;font:inherit;color:var(--gr-navy);background:var(--surface,#fff);border:2px solid transparent;border-radius:16px;padding:12px;min-height:84px;box-shadow:0 1px 3px rgb(23 34 77 / .14);cursor:pointer;transition:transform .12s,background .15s,border-color .15s}\
.gr-opt:active{transform:scale(.97)}.gr-opt b{font-size:.98rem;display:flex;align-items:center;gap:6px;line-height:1.2}.gr-opt span{font-size:.78rem;font-weight:600;line-height:1.35;color:var(--muted,#56618A)}\
.gr-opt.on{background:#fff;border-color:var(--gr-teal);box-shadow:0 0 0 3px rgb(43 65 196 / .18)}.gr-opt.on b:after{content:\"✓\";margin-left:auto;color:var(--gr-teal);font-weight:900}\
.gr-maps{display:grid;grid-template-columns:1fr;gap:8px}@media (min-width:480px){.gr-maps{grid-template-columns:1fr 1fr}}\
.gr-mapc{display:grid;grid-template-columns:52px minmax(0,1fr) auto;gap:10px;align-items:center;text-align:left;font:inherit;color:var(--gr-navy);background:var(--surface,#fff);border:0;border-radius:16px;padding:10px 12px 10px 10px;min-height:76px;box-shadow:0 1px 3px rgb(23 34 77 / .14);cursor:pointer;transition:transform .12s,box-shadow .15s}\
.gr-mapc:hover{box-shadow:0 4px 14px rgb(23 34 77 / .16)}.gr-mapc:active{transform:scale(.98)}\
.gr-mapc .mi{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;font-size:1.6rem;background:linear-gradient(160deg,var(--mc),color-mix(in srgb,var(--mc) 55%,#17224D))}\
.gr-mapc .tx{min-width:0}.gr-mapc small{display:block;font-weight:800;font-size:.68rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted,#56618A)}.gr-mapc b{display:block;font-size:.98rem;line-height:1.2}\
.gr-mapc .tp{display:block;font-size:.78rem;font-weight:700;color:var(--gr-teal);line-height:1.25}\
.gr-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}.gr-tag{font-size:.66rem;font-weight:800;padding:2px 8px;border-radius:999px;background:var(--surface-2,#EEF2FA);color:var(--gr-navy);white-space:nowrap}.gr-tag.ok{background:var(--good-bg,#DDF5E6);color:var(--good-ink,#0D5530)}\
.gr-play{flex:none;display:inline-flex;align-items:center;gap:4px;min-height:38px;padding:0 12px;border-radius:999px;background:var(--gr-gold);color:var(--gr-navy);font-weight:900;font-size:.82rem;border:2px solid var(--gr-navy)}\
.gr-unit{margin:16px 0 6px;font-size:.95rem;font-family:var(--gr-head,'Kalam','Lexend',sans-serif)}\
.gr-les{display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:inherit;color:var(--gr-navy);background:var(--surface,#fff);border:0;border-radius:14px;box-shadow:0 1px 3px rgb(23 34 77 / .12);padding:10px 12px;margin:0 0 6px;min-height:52px;cursor:pointer;transition:transform .1s}.gr-les:active{transform:scale(.98)}\
.gr-les .em{font-size:1.3rem;flex:none}.gr-les .tx{flex:1;min-width:0}.gr-les b{display:block;font-size:.9rem;line-height:1.25}.gr-les small{display:block;font-size:.72rem;font-weight:700;color:var(--muted,#56618A)}\
.gr-list{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:8px}\
.gr-row{display:grid;grid-template-columns:32px 44px minmax(0,1fr) auto;gap:10px;align-items:center;background:var(--surface,#fff);border-radius:16px;padding:8px 12px 8px 8px;box-shadow:0 1px 3px rgb(23 34 77 / .12)}\
.gr-row.top1{background:linear-gradient(90deg,#FFF3B8,#fff 70%)}.gr-row.top2{background:linear-gradient(90deg,#E9EDF5,#fff 70%)}.gr-row.top3{background:linear-gradient(90deg,#F7DCC4,#fff 70%)}\
.gr-row.me{box-shadow:0 0 0 3px rgb(43 65 196 / .35)}\
.gr-rk{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:.85rem;background:var(--surface-2,#EEF2FA);color:var(--gr-navy)}.gr-rk.gr-r1{background:var(--gr-gold)}.gr-rk.gr-r2{background:#D5DBE0}.gr-rk.gr-r3{background:#E0A06A}\
.gr-av{width:44px;height:44px;border-radius:50%;overflow:hidden;background:var(--gr-sky,#E3EAF6);display:grid;place-items:center;flex:none}.gr-av svg{width:100%;height:100%}\
.gr-nm{min-width:0}.gr-nm b{display:block;font-size:.92rem;line-height:1.2;overflow-wrap:anywhere}.gr-nm span{display:block;font-size:.72rem;font-weight:700;color:var(--muted,#56618A);line-height:1.3}\
.gr-pt{text-align:right;white-space:nowrap}.gr-pt b{font-size:1.05rem}.gr-pt span{display:block;font-size:.66rem;font-weight:700;color:var(--muted,#56618A)}\
.gr-more{display:block;width:100%;margin-top:10px;min-height:44px;font:inherit;font-weight:800;border:0;border-radius:14px;background:var(--surface-2,#EEF2FA);color:var(--gr-navy);cursor:pointer}\
.gr-state{text-align:center;padding:26px 16px;background:var(--surface,#fff);border-radius:18px;box-shadow:0 1px 3px rgb(23 34 77 / .12);margin-top:12px}.gr-state .ico{width:52px;height:52px;border-radius:50%;margin:0 auto 10px;display:grid;place-items:center;background:var(--surface-2,#EEF2FA);color:var(--gr-teal)}\
.gr-state h3{margin:0 0 4px;font-size:1.05rem}.gr-state p{margin:0 auto 12px;max-width:34ch;font-size:.86rem;font-weight:600;line-height:1.45;color:var(--muted,#56618A)}\
.gr-skel{height:60px;border-radius:16px;margin-top:8px;background:linear-gradient(90deg,#E9EDF7 25%,#F4F6FB 50%,#E9EDF7 75%);background-size:200% 100%;animation:grshim 1.2s linear infinite}@keyframes grshim{to{background-position:-200% 0}}\
.gr-champ{margin-top:14px}.gr-champ .hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px;padding:0 2px 6px}.gr-champ .hd b{font-size:1rem}.gr-champ .hd span{font-size:.74rem;font-weight:800;color:var(--muted,#56618A)}\
.gr-win{display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#FFF3B8,#fff 75%);border-radius:18px;padding:12px;box-shadow:0 1px 3px rgb(23 34 77 / .12)}\
.gr-win .gr-av{width:76px;height:76px;background:#fff}.gr-win .tx{min-width:0;flex:1}.gr-win b{display:block;font-size:1.05rem;line-height:1.2;overflow-wrap:anywhere}.gr-win .crown{font-size:.7rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#8A5A00}\
.gr-win small{display:block;font-size:.76rem;font-weight:700;color:var(--muted,#56618A)}\
.gr-runners{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.gr-runners>div{display:flex;align-items:center;gap:8px;background:var(--surface,#fff);border-radius:14px;padding:8px;box-shadow:0 1px 3px rgb(23 34 77 / .1);min-width:0}.gr-runners .gr-av{width:40px;height:40px}.gr-runners .nm{min-width:0}.gr-runners .nm b{display:block;font-size:.8rem;line-height:1.2;overflow-wrap:anywhere}.gr-runners .nm span{font-size:.68rem;font-weight:700;color:var(--muted,#56618A)}\
.gr-pack{display:inline-block;margin:3px 3px 0 0;padding:2px 8px;border-radius:999px;color:#fff;font-size:.66rem;font-weight:800}\
.gr-ladder{display:flex;flex-direction:column;gap:8px}.gr-rw{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:12px;align-items:center;background:var(--surface,#fff);border-radius:16px;padding:10px 12px 10px 10px;box-shadow:0 1px 3px rgb(23 34 77 / .12)}\
.gr-rw .vis{position:relative;width:64px;height:64px;border-radius:16px;background:var(--gr-sky,#E3EAF6);overflow:hidden}.gr-rw .vis svg{width:100%;height:100%}.gr-rw .vis.pts{display:grid;place-items:center;font-size:1.5rem;font-weight:900}.gr-rw .vis.pts svg{width:28px;height:28px;color:var(--gr-teal)}.gr-nm .gr-pack{display:inline-block}.gr-rw.lock .vis svg{filter:grayscale(1) brightness(.85);opacity:.7}\
.gr-rw .vis .lk{position:absolute;right:3px;bottom:3px;width:22px;height:22px;border-radius:50%;background:var(--gr-navy);color:#fff;display:grid;place-items:center}\
.gr-rw .tx{min-width:0}.gr-rw b{display:block;font-size:.95rem;line-height:1.2}.gr-rw small{display:block;font-size:.74rem;font-weight:700;color:var(--muted,#56618A);line-height:1.35;margin-top:2px}\
.gr-own{font-size:.7rem;font-weight:900;padding:4px 10px;border-radius:999px;background:var(--surface-2,#EEF2FA);color:var(--muted,#56618A);white-space:nowrap}.gr-own.on{background:var(--good-bg,#DDF5E6);color:var(--good-ink,#0D5530)}\
.gr-prize{text-align:center}.gr-prize .gr-av{width:120px;height:120px;margin:6px auto}.gr-prize h2{font-size:1.7rem}\
.gr-go{display:flex;width:100%;align-items:center;justify-content:center;gap:10px;min-height:52px;font:inherit;font-weight:900;font-size:1.1rem;color:var(--gr-navy);background:var(--gr-gold);border:3px solid var(--gr-navy);border-radius:14px;box-shadow:0 4px 0 var(--gr-navy);cursor:pointer}.gr-go:active{transform:translateY(3px);box-shadow:0 1px 0 var(--gr-navy)}\
.gr-admlink{display:block;margin:18px auto 0;background:none;border:0;font:inherit;font-size:.76rem;opacity:.55;text-decoration:underline;cursor:pointer;color:inherit}\
@media (max-width:359px){.gr-head h1{font-size:1.9rem}.gr-head p{max-width:100%}.gr-fort{display:none}.gr-row{grid-template-columns:28px 38px minmax(0,1fr) auto;gap:8px}.gr-av{width:38px;height:38px}.gr-opts{grid-template-columns:1fr}.gr-runners{grid-template-columns:1fr}}\
@media (prefers-reduced-motion:reduce){.gr-skel{animation:none}.gr-btn,.gr-opt,.gr-mapc,.gr-les,.gr-tabs button{transition:none}}\
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
  var TABS = [["race", "Home", "home"], ["maps", "Maps", "flag"], ["board", "Leaderboard", "medal"], ["champs", "Champions", "trophy"], ["mine", "Prizes", "star"]];
  ui.mount = async function () {
    injectCss(); var h = H(), app = h.app; window.scrollTo(0, 0);
    app.dataset.tab = "gaterush"; draw(); await net().sync(); if (!app.isConnected || app.dataset.tab !== "gaterush") return;
    draw(); ui.applyRewards().then(function () { app.dataset.tab === "gaterush" && draw(); });
  };
  function stateHtml(icon, title, text, retry) {
    return '<div class="gr-state"><div class="ico">' + H().icon(icon, 26) + '</div><h3>' + esc(title) + '</h3><p>' + esc(text) + '</p>' + (retry ? '<button type="button" class="gr-btn sm" data-retry="1">' + H().icon("refresh", 16) + ' Try again</button>' : "") + '</div>';
  }
  function skel(n) { var s = ""; for (var i = 0; i < (n || 4); i++) s += '<div class="gr-skel"></div>'; return s; }
  // one place decides how the weekly competition is described
  function weekLeft() { var n = net(); return n.fmtLeft((n.info ? n.info.ends : n.weekEndsMs()) - Date.now()); }
  function compStatus() {
    var n = net(), info = n.info, can = n.canCompete(), max = n.cfg.max_scored, used = info ? info.used : n.local().races, left = Math.max(0, max - used);
    var ends = n.fmtLeft((info ? info.ends : n.weekEndsMs()) - Date.now());
    if (!can) return { cls: "off", text: "Practice only", note: "You are playing as a guest. Join a class on your profile to enter the weekly competition." };
    if (n.state === "missing") return { cls: "warn", text: "Leaderboard not switched on", note: "The shared leaderboard is not switched on yet. You can still race; your best score is saved on this phone." };
    if (n.state === "offline") return { cls: "warn", text: "Leaderboard unreachable", note: "We could not reach the leaderboard. You can still race; try again to compete.", retry: true };
    if (left === 0) return { cls: "off", text: "All " + max + " scored races used", note: "" };
    return { cls: "", text: "Live now", note: "", ends: ends };
  }
  function draw() {
    var h = H(), app = h.app, st = compStatus(), body = "";
    if (tab === "race") body = raceHtml(st);
    else if (tab === "maps") body = mapsHtml();
    else if (tab === "board") body = '<div class="gr-sec"><h2>Weekly leaderboard</h2><div id="gr-board">' + skel(5) + '</div></div>';
    else if (tab === "champs") body = '<div class="gr-sec"><h2>Weekly champions</h2><div id="gr-champs">' + skel(3) + '</div></div>';
    else body = '<div class="gr-sec"><h2>Weekly prizes</h2><div id="gr-mine">' + skel(4) + '</div></div>';
    var keep = (app.querySelector(".gr-tabs") || {}).scrollLeft || 0;
    app.innerHTML = '<section class="gr-wrap">' + (tab === "race" ? headHtml(st) : "") +
      '<nav class="gr-tabs" role="tablist" aria-label="Gate Rush sections">' + TABS.map(function (t) { return '<button type="button" role="tab" data-t="' + t[0] + '" aria-selected="' + (tab === t[0]) + '" class="' + (tab === t[0] ? "on" : "") + '">' + h.icon(t[2], 18) + "<span>" + t[1] + "</span></button>"; }).join("") + '</nav>' + body + '</section>';
    var bar = app.querySelector(".gr-tabs"), on = bar && bar.querySelector(".on");
    if (bar) { bar.scrollLeft = keep; if (on) { var l = on.offsetLeft - (bar.clientWidth - on.offsetWidth) / 2; bar.scrollTo ? bar.scrollTo({ left: Math.max(0, l), behavior: keep ? "smooth" : "auto" }) : (bar.scrollLeft = l); } }
    app.querySelectorAll(".gr-tabs button").forEach(function (b) { b.addEventListener("click", function () { tab = b.dataset.t; draw(); }); });
    app.querySelectorAll("[data-retry]").forEach(function (b) { b.addEventListener("click", retry); });
    if (tab === "race") {
      app.querySelectorAll("[data-go]").forEach(function (b) { b.addEventListener("click", function () { ui.startRace(); }); });
      var adm = app.querySelector("#gr-adm"); adm && adm.addEventListener("click", function () { ui.admin(); });
    }
    if (tab === "maps") bindMaps(app);
    if (tab === "board") loadBoard(true); if (tab === "champs") loadChamps(true); if (tab === "mine") loadMine();
  }
  function retry() { var n = net(); n.state = "idle"; n.sync().then(function () { H().app.dataset.tab === "gaterush" && draw(); }); }
  function fortSvg() {
    return '<svg class="gr-fort" viewBox="0 0 240 150" aria-hidden="true"><g stroke="#17224D" stroke-width="4" stroke-linejoin="round"><rect x="10" y="70" width="60" height="80" fill="#D9C7A3"/><rect x="10" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="34" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="56" y="56" width="14" height="14" fill="#D9C7A3"/><rect x="90" y="30" width="70" height="120" fill="#E8C98F"/><rect x="90" y="16" width="16" height="14" fill="#E8C98F"/><rect x="116" y="16" width="16" height="14" fill="#E8C98F"/><rect x="144" y="16" width="16" height="14" fill="#E8C98F"/><path d="M110 150v-34a15 15 0 0 1 30 0v34z" fill="#B07A45"/><rect x="180" y="84" width="50" height="66" fill="#D9C7A3"/><rect x="180" y="70" width="12" height="14" fill="#D9C7A3"/><rect x="204" y="70" width="12" height="14" fill="#D9C7A3"/><path d="M125 16V-6l24 8-24 8" fill="#FFD83D"/></g></svg>';
  }
  function headHtml(st) {
    var h = H();
    return '<header class="gr-head"><h1>GATE <b>RUSH</b></h1><p>Run, jump and smash the right door. English is your key.</p>' + fortSvg() +
      '<div class="gr-headrow"><button type="button" class="gr-btn" data-go="1">' + h.icon("play", 20) + ' Start racing</button><span class="gr-pill">' + h.icon("clock", 14) + " Week ends in " + esc(weekLeft()) + '</span></div></header>';
  }
  function raceHtml(st) {
    var h = H(), n = net(), info = n.info, loc = n.local(), can = n.canCompete(), map = GR.maps.fort;
    var used = info ? info.used : loc.races, max = n.cfg.max_scored, left = Math.max(0, max - used), bt = info ? info.best_time : loc.bestTime;
    var rank = info && info.rank ? ord(info.rank) : "–";
    return '<div class="gr-sec" style="margin-top:6px"><h2>This week\'s race</h2></div>' +
      '<div class="gr-card" style="margin-top:6px"><div class="gr-week"><div class="gr-mini" aria-hidden="true"><i></i><i></i><i></i></div><div><h2>' + esc(map.name) + '</h2><p class="gr-sub">' + map.gates + ' English doors · about 2 min</p><span class="gr-status ' + st.cls + '">' + esc(st.text) + '</span></div></div>' +
      '<div class="gr-stats"><div><b>' + (bt ? n.fmtTime(bt).slice(0, -3) : "–") + '</b><span>Best time</span></div><div><b>' + rank + '</b><span>Position</span></div><div><b>' + (can ? left : "∞") + '</b><span>' + (can ? "Scored races left" : "Practice") + '</span></div></div>' +
      '<button type="button" class="gr-btn wide" data-go="1">' + h.icon("play", 22) + ' Play</button></div>' +
      (st.note ? '<div class="gr-note"><span>' + esc(st.note) + '</span>' + (st.retry ? '<button type="button" class="gr-btn sm" data-retry="1">Retry</button>' : "") + '</div>' : "") +
      '<details class="gr-how"><summary>How scoring works</summary><ul><li><b>Run</b> with WASD or arrows and <b>jump</b> with Space. On a phone, use the joystick and jump button.</li><li><b>Read the question</b>, then run into the right door. A wrong one bounces you back and costs 2 seconds.</li><li>Points: ' + n.cfg.per_correct + ' per correct answer, a speed bonus, coins and −' + n.cfg.hit_pen + ' per obstacle hit.</li><li>Your <b>best race</b> of the week counts, up to ' + max + ' scored races. See <b>Prizes</b> for what the top places win.</li></ul></details>' +
      '<button id="gr-adm" type="button" class="gr-admlink">Teacher tools</button>';
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
    var h = H(), p = pref(), mode = p.mode || "topic", easy = !!p.easy, best = pbs(), n = net();
    var opt = function (attr, val, on, ic, t, d) { return '<button type="button" class="gr-opt' + (on ? " on" : "") + '" ' + attr + '="' + val + '" aria-pressed="' + on + '"><b>' + ic + esc(t) + "</b><span>" + esc(d) + "</span></button>"; };
    var head = '<div class="gr-sec" style="margin-top:6px"><h2>How do you want to play?</h2><p class="gr-sub">Practice maps do not count for the weekly leaderboard. Your best time on each map is saved on this phone.</p>' +
      '<h3 class="gr-unit" style="margin-top:4px">Learning mode</h3><div class="gr-opts" role="group" aria-label="Learning mode">' +
      opt("data-mode", "topic", mode === "topic", "", "Topic maps", "Pick an English topic, like Present Simple.") + opt("data-mode", "book", mode === "book", "", "Book mode", "Pick your grade, unit and lesson.") + '</div>' +
      '<h3 class="gr-unit">Parkour level</h3><div class="gr-opts" role="group" aria-label="Parkour level">' +
      opt("data-easy", "0", !easy, "", "Normal", "The standard course.") + opt("data-easy", "1", easy, "", "Easy", "Bigger platforms, slower obstacles, shorter gaps.") + '</div></div>';
    var diff = easy ? "Easy" : "Normal";
    if (mode === "topic") return head + '<div class="gr-sec"><h2>Topic maps</h2><p class="gr-sub">Choose a map to start.</p><div class="gr-maps">' + MAPS.map(function (m, i) {
      var b = best[m[0]];
      return '<button type="button" class="gr-mapc" data-map="' + m[0] + '" style="--mc:' + m[4] + '"><span class="mi" aria-hidden="true">' + m[1] + '</span><span class="tx"><small>Map ' + (i + 1) + '</small><b>' + esc(m[3]) + '</b><span class="tp">' + esc(m[2]) + '</span><span class="gr-tags"><span class="gr-tag">' + diff + '</span>' + (b ? '<span class="gr-tag ok">✓ Best ' + esc(n.fmtTime(b).slice(0, -3)) + '</span>' : '<span class="gr-tag">New</span>') + '</span></span><span class="gr-play">' + h.icon("play", 14) + ' Play</span></button>';
    }).join("") + "</div></div>";
    var units = n.bookUnits(), g = String(h.me().grade || "9");
    if (!units.length || g !== "9") return head + '<div class="gr-sec"><h2>Book mode</h2>' + stateHtml("book", "Book 9A only for now", "Book mode uses the Grade 9 textbook. More books are coming. For now, choose Topic maps.", false) + '</div>';
    return head + '<div class="gr-sec"><h2>Book 9A</h2><p class="gr-sub">Pick the lesson you are studying. The race asks that lesson\'s questions.</p>' + units.map(function (u) {
      var ls = u.lessons.map(function (l, i) { return [l, i]; }).filter(function (x) { var l = x[0]; return l.kind !== "reading" && l.kind !== "writing" && (l.qs || []).filter(function (q) { return q.type === "mcq" && q.options && q.options.length >= 3; }).length >= 3; });
      return ls.length ? '<h3 class="gr-unit">' + esc(u.label + " · " + u.name) + '</h3>' + ls.map(function (x) { var mid = lessonMap(x[0], x[1]), m = MAPS.find(function (y) { return y[0] === mid; }); return '<button type="button" class="gr-les" data-u="' + u.id + '" data-l="' + x[0].id + '" data-map="' + mid + '"><span class="em" aria-hidden="true">' + m[1] + '</span><span class="tx"><b>' + esc(x[0].title) + '</b><small>' + esc(m[3]) + ' · ' + diff + '</small></span><span class="gr-play">' + h.icon("play", 14) + ' Play</span></button>'; }).join("") : "";
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

  /* ---------- shared states ---------- */
  function unavailableHtml() {
    var n = net();
    if (n.state === "missing") return stateHtml("alert", "Leaderboard not switched on", "The shared leaderboard has not been set up yet. Your races still save on this phone.", false);
    if (!n.canCompete()) return stateHtml("users", "Join a class to compete", "Add your grade and class on your profile to see the weekly rankings. You can still race for practice.", false);
    return null;
  }
  function failHtml(what) { return stateHtml("alert", what + " is taking a break", "We could not reach the server right now. Check your connection and try again. Your races still save on this phone.", true); }
  function bindRetry(el, fn) { var b = el && el.querySelector("[data-retry]"); b && b.addEventListener("click", function () { var n = net(); n.state = "idle"; fn(); }); }
  var rankCls = function (r) { return r <= 3 ? " top" + r : ""; };

  /* ---------- leaderboard ---------- */
  async function loadBoard(reset) {
    var el = document.getElementById("gr-board"), n = net(), me = H().me(); if (!el) return;
    var un = unavailableHtml(); if (un) { el.innerHTML = un; return; }
    if (reset) { boardOff = 0; boardRows = []; el.innerHTML = skel(5); }
    try { var rows = await n.board(me.grade, boardOff); boardRows = boardRows.concat(rows || []); boardOff += 20; }
    catch (e) { el = document.getElementById("gr-board"); if (!el) return; el.innerHTML = n.state === "missing" ? unavailableHtml() : failHtml("The leaderboard"); bindRetry(el, function () { loadBoard(true); }); return; }
    el = document.getElementById("gr-board"); if (!el) return;
    var myPid = n.pid();
    if (!boardRows.length) { el.innerHTML = stateHtml("medal", "No one has raced yet", "Be the first Grade " + me.grade + " student on this week's board!", false); return; }
    el.innerHTML = '<p class="gr-sub">Grade ' + esc(me.grade) + ' · best race of the week · ' + esc(n.fmtLeft(n.weekEndsMs() - Date.now())) + ' left</p><ol class="gr-list" style="margin-top:0">' + boardRows.map(function (r) {
      return '<li class="gr-row' + rankCls(r.rank) + (r.pid === myPid ? " me" : "") + '"><span class="gr-rk gr-r' + (r.rank <= 3 ? r.rank : "") + '">' + r.rank + '</span><span class="gr-av">' + avHtml(r.avatar, 44) + '</span><span class="gr-nm"><b>' + esc(r.name) + (r.pid === myPid ? " (you)" : "") + '</b><span>' + (r.cls ? "Class " + esc(r.cls) + " · " : "") + esc(n.fmtTime(r.time).slice(0, -3)) + " · " + r.acc + '% accuracy</span></span><span class="gr-pt"><b>' + r.score + '</b><span>points</span></span></li>';
    }).join("") + '</ol>' + (boardRows.length % 20 === 0 ? '<button class="gr-more" id="gr-more" type="button">Show more</button>' : "");
    var mb = document.getElementById("gr-more"); mb && mb.addEventListener("click", function () { loadBoard(false); });
  }

  /* ---------- Weekly Champions ---------- */
  async function loadChamps(reset) {
    var el = document.getElementById("gr-champs"), n = net(), me = H().me(); if (!el) return;
    var un = unavailableHtml(); if (un) { el.innerHTML = un; return; }
    if (reset) { champOff = 0; champWeeks = []; el.innerHTML = skel(3); }
    try { var w = await n.champions(me.grade, champOff); champWeeks = champWeeks.concat(w || []); champOff += 4; }
    catch (e) { el = document.getElementById("gr-champs"); if (!el) return; el.innerHTML = n.state === "missing" ? unavailableHtml() : failHtml("Champions"); bindRetry(el, function () { loadChamps(true); }); return; }
    el = document.getElementById("gr-champs"); if (!el) return;
    if (!champWeeks.length) { el.innerHTML = stateHtml("trophy", "No champions yet", "The first champions appear when this week ends. Race now to be one of them!", false); return; }
    el.innerHTML = '<p class="gr-sub">Winners of the Grade ' + esc(me.grade) + ' Weekly Race, with their outfits.</p>' + champWeeks.map(function (wk) {
      var top = wk.top || [], w1 = top[0], rest = top.slice(1);
      var packs = function (t) { return (t.packs || []).map(packSpan).join(""); };
      return '<div class="gr-champ"><div class="hd"><b>Week of ' + esc(weekLabel(wk.week)) + '</b><span>Gate Rush Weekly Race</span></div>' +
        (w1 ? '<div class="gr-win"><div class="gr-av">' + avHtml(w1.avatar, 76) + '</div><div class="tx"><span class="crown">🏆 Champion</span><b>' + esc(w1.name) + '</b><small>' + w1.score + ' points · +' + w1.pts + ' prize points</small>' + packs(w1) + '</div></div>' : "") +
        (rest.length ? '<div class="gr-runners">' + rest.map(function (t) { return '<div><span class="gr-rk gr-r' + t.rank + '">' + t.rank + '</span><span class="gr-av">' + avHtml(t.avatar, 40) + '</span><span class="nm"><b>' + esc(t.name) + '</b><span>' + t.score + ' pts</span></span></div>'; }).join("") + '</div>' : "") + '</div>';
    }).join("") + (champWeeks.length % 4 === 0 ? '<button class="gr-more" id="gr-cmore" type="button">Older weeks</button>' : "");
    var mb = document.getElementById("gr-cmore"); mb && mb.addEventListener("click", function () { loadChamps(false); });
  }

  /* ---------- Prizes: the reward ladder (what each place wins) plus my own results ---------- */
  function wearCfg(id) { return Object.assign({}, H().avatarCfg(), { hat: "grcrown" + id, extra: "grcape" + id, gl: "grvisor" + id }); }
  function ladderHtml() {
    var n = net(), h = H(), pz = n.prizes || {}, pts = pz.pts || {}, pk = pz.packs || {}, owned = (n.info && n.info.packs) || [], part = pz.participation || {};
    var rows = [1, 2, 3].map(function (r) {
      var id = pk[r], pack = id && GR.PACKS[id - 1], own = id && owned.indexOf(id) >= 0;
      return '<div class="gr-rw' + (id && !own ? " lock" : "") + '"><div class="vis">' + (id ? avHtml(wearCfg(id), 64) + (own ? "" : '<span class="lk">' + h.icon("lock", 12) + '</span>') : "") + '</div><div class="tx"><b>' + ord(r) + ' place</b><small>' + (pts[r] != null ? "+" + pts[r] + " points" : "") + (pack ? " · " + esc(pack.name) + " outfit pack" : "") + '</small></div>' + (id ? '<span class="gr-own' + (own ? " on" : "") + '">' + (own ? "Unlocked" : "Locked") + '</span>' : "") + '</div>';
    }).join("");
    if (pts.top10) rows += '<div class="gr-rw"><div class="vis pts">4–10</div><div class="tx"><b>Top 10</b><small>+' + pts.top10 + ' points</small></div></div>';
    if (part.base != null) rows += '<div class="gr-rw"><div class="vis pts">' + h.icon("star", 28) + '</div><div class="tx"><b>Everyone who races</b><small>+' + part.base + ' points, plus ' + (part.per_race || 0) + ' per scored race' + (part.acc_bonus ? " and up to " + part.acc_bonus + " for accuracy" : "") + '</small></div></div>';
    return '<p class="gr-sub">Outfit packs can only be won here. They cannot be bought with points.</p><div class="gr-ladder">' + rows + '</div>';
  }
  async function loadMine() {
    var el = document.getElementById("gr-mine"), n = net(); if (!el) return;
    var ladder = ladderHtml(), un = unavailableHtml();
    if (un) { el.innerHTML = ladder + un; return; }
    try {
      var rows = await n.history(0); el = document.getElementById("gr-mine"); if (!el) return;
      el.innerHTML = ladder + '<div class="gr-sec"><h2>Your results</h2>' + (rows && rows.length ? '<ol class="gr-list" style="margin-top:6px">' + rows.map(function (r) { return '<li class="gr-row' + rankCls(r.rank) + '" style="grid-template-columns:32px minmax(0,1fr) auto"><span class="gr-rk gr-r' + (r.rank <= 3 ? r.rank : "") + '">' + r.rank + '</span><span class="gr-nm"><b>Week of ' + esc(weekLabel(r.week)) + '</b><span>' + r.score + " points · " + r.races + " race" + (r.races === 1 ? "" : "s") + "</span>" + (r.packs || []).map(packSpan).join("") + '</span><span class="gr-pt"><b>+' + r.pts + '</b><span>prize pts</span></span></li>'; }).join("") + "</ol>" : '<p class="gr-sub">Your weekly results will appear here after a week ends.</p>') + '</div>';
    } catch (e) { el = document.getElementById("gr-mine"); if (!el) return; el.innerHTML = ladder + '<div class="gr-sec"><h2>Your results</h2>' + failHtml("Your results") + '</div>'; bindRetry(el, loadMine); }
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
