/* EPZ Easy Level course: 7 skills, 40 Parts. Every Part has one Learn section and exactly 5 tests of 10 questions (200 tests, 2,000 questions).
   One shared curriculum for Grades 9 to 12. Only the progress is separate, kept per grade and class inside the student's saved state (state.easy).
   The tests are ordinary EPZ activities, so the existing question player, feedback, points, streaks, badges and ranking all work unchanged.
   Part content lives in easy/data/<skill>-<n>.js and is loaded only when a student opens that Part. */
(function () {
  var E = (window.EPZ_EASY = window.EPZ_EASY || {});
  E.parts = E.parts || {};
  var TESTS = 5, QS = 10, PTS_Q = 10;

  /* ---------------------------------------------------------------- the curriculum (exactly as agreed) */
  E.SKILLS = [
    { k: "grammar", parts: ["Verb to Be (am, is, are)", "Present Simple", "Present Continuous", "Past Simple", "Subject and Object Pronouns", "Articles (a, an, the)", "Prepositions of Place"] },
    { k: "vocabulary", parts: ["Family Members", "Food and Drinks", "Animals", "School and Education", "Colors and Shapes", "Daily Activities", "Places Around Us", "Jobs and Occupations"] },
    { k: "reading", parts: ["Personal Information", "Daily Routines", "Short Descriptions", "Places and People", "Short Stories"] },
    { k: "listening", parts: ["Greetings and Introductions", "Numbers, Dates and Time", "Daily Conversations", "Places and Directions", "Simple Instructions"] },
    { k: "building", parts: ["Subject + Verb", "Subject + Verb + Object", "Word Order", "Making Questions", "Negative Sentences"] },
    { k: "scramble", parts: ["First, Next, Then, Finally", "Daily Activities", "Events in a Story", "Beginning, Middle and Ending", "Putting Sentences in Order"] },
    { k: "correction", parts: ["Spelling", "Capitalization", "Verb Forms", "Basic Grammar", "Punctuation"] }
  ];
  // skills whose Parts are written and shipped (the rest show as "Coming soon", so no number on screen is ever a promise)
  E.READY = { grammar: true, vocabulary: true, reading: true, listening: true };
  E.TESTS = TESTS; E.QS = QS;

  /* ---------------------------------------------------------------- question helpers used by the data files (same shapes as the rest of EPZ) */
  var x = function (q, ex) { if (ex) q.explanation = ex; return q; };
  E.h = {
    m: function (prompt, options, ex) { return x({ type: "mcq", prompt: prompt, options: options, answer: options[0] }, ex); },   // the first option is the answer; the player shuffles
    tf: function (prompt, isTrue, ex) { return x({ type: "truefalse", prompt: prompt, answer: isTrue ? "True" : "False" }, ex); },
    f: function (prompt, answer, ex) { return x({ type: "fill", prompt: prompt, answer: answer }, ex); },
    c: function (prompt, answer, ex) { return x({ type: "correct", prompt: prompt, answer: answer }, ex); },
    b: function (prompt, answer, ex) { return x({ type: "build", prompt: prompt, answer: answer }, ex); },
    o: function (prompt, items, ex) { return x({ type: "order", prompt: prompt, items: items }, ex); },
    mi: function (image, prompt, options, ex) { var q = x({ type: "mcq", prompt: prompt, options: options, answer: options[0] }, ex); q.image = image; return q; },   // a picture (emoji) above the question
    fi: function (image, prompt, answer, ex) { var q = x({ type: "fill", prompt: prompt, answer: answer }, ex); q.image = image; return q; },
    mt: function (prompt, pairs, ex) { return x({ type: "match", prompt: prompt, pairs: pairs.map(function (p) { return { left: p[0], right: p[1] }; } ) }, ex); },
    T: function (title, instructions, questions, more) { return Object.assign({ title: title, instructions: instructions, questions: questions }, more || {}); }
  };

  var H = null;          // the page's helpers (set by init)
  var css = false;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function hl(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<mark class="ez-hl">$1</mark>'); }
  var plural = function (n, w) { return n + " " + w + (n === 1 ? "" : "s"); };
  var skillOf = function (k) { return E.SKILLS.filter(function (s) { return s.k === k; })[0]; };
  var partId = function (sk, n) { return sk + "-" + n; };
  var testId = function (sk, n, t) { return "ez-" + sk + "-" + n + "-" + t; };
  E.testId = testId;

  /* ---------------------------------------------------------------- progress: kept per grade + class in state.easy (never touches results, points or other state) */
  function profileKey() {
    var s = H.state(), g = s.grade || "", c = s.cls || "";
    return g === "guest" ? "guest-" + (s.practice || "9") : g + "-" + c;
  }
  function prog(create) {
    var s = H.state(); if (!s.easy || typeof s.easy !== "object") { if (!create) return null; s.easy = { v: 1, p: {} }; }
    s.easy.p = s.easy.p || {}; var k = profileKey();
    if (!s.easy.p[k]) { if (!create) return null; s.easy.p[k] = { t: {}, l: {} }; }
    var p = s.easy.p[k]; p.t = p.t || {}; p.l = p.l || {}; return p;
  }
  function tRec(sk, n, t) { var p = prog(false); return p && p.t[testId(sk, n, t)] || null; }
  function lRec(sk, n) { var p = prog(false); return p && p.l[partId(sk, n)] || null; }
  function partStats(sk, n) {
    var done = 0, sum = 0, best = 0, tries = 0;
    for (var t = 1; t <= TESTS; t++) { var r = tRec(sk, n, t); if (r && r.n) { done++; sum += r.b; best = Math.max(best, r.b); tries += r.n; } }
    var lr = lRec(sk, n);
    return { done: done, avg: done ? Math.round(10 * sum / done) : 0, best: best * 10, tries: tries, learn: !!(lr && lr.d), learnStep: lr ? lr.s || 0 : 0 };
  }
  function skillStats(sk) {
    var S = skillOf(sk), parts = S.parts.length, tests = parts * TESTS, done = 0, sum = 0, learned = 0, partsDone = 0;
    for (var n = 1; n <= parts; n++) { var ps = partStats(sk, n); done += ps.done; sum += ps.avg * ps.done; learned += ps.learn ? 1 : 0; if (ps.done === TESTS) partsDone++; }
    return { parts: parts, tests: tests, done: done, avg: done ? Math.round(sum / done) : 0, learned: learned, partsDone: partsDone };
  }
  E.totals = function () {
    var parts = 0, tests = 0, qs = 0; E.SKILLS.forEach(function (s) { parts += s.parts.length; });
    tests = parts * TESTS; qs = tests * QS; return { skills: E.SKILLS.length, parts: parts, learn: parts, tests: tests, questions: qs };
  };
  function readyTotals() {
    var o = { skills: 0, parts: 0, tests: 0, done: 0, learned: 0, sum: 0, best: 0 };
    E.SKILLS.forEach(function (s) {
      if (!E.READY[s.k]) return; o.skills++; o.parts += s.parts.length; o.tests += s.parts.length * TESTS;
      for (var n = 1; n <= s.parts.length; n++) { var ps = partStats(s.k, n); o.done += ps.done; o.learned += ps.learn ? 1 : 0; o.sum += ps.avg * ps.done; o.best = Math.max(o.best, ps.best); }
    });
    o.avg = o.done ? Math.round(o.sum / o.done) : 0; return o;
  }

  /* ---------------------------------------------------------------- loading one Part's data */
  var loading = {};
  function loadPart(sk, n) {
    var id = partId(sk, n); if (E.parts[id]) return Promise.resolve(E.parts[id]);
    if (loading[id]) return loading[id];
    return loading[id] = new Promise(function (ok, bad) {
      var s = document.createElement("script"); s.src = "easy/data/" + id + ".js?v=1"; s.async = true;
      s.onload = function () { E.parts[id] ? ok(E.parts[id]) : bad(new Error("missing " + id)); }; s.onerror = function () { bad(new Error("load " + id)); };
      document.head.appendChild(s);
    }).catch(function (e) { delete loading[id]; throw e; });
  }
  E.loadPart = loadPart;
  // a test as a normal EPZ activity (the player does the rest)
  function makeAct(sk, n, t, part) {
    var T = part.tests[t - 1], S = skillOf(sk);
    return Object.assign({ id: testId(sk, n, t), skill: sk, level: "easy", grade: "all", title: T.title, instructions: T.instructions, questions: T.questions.slice(), course: { skill: sk, part: n, test: t, partName: S.parts[n - 1] }, back: "easy/" + sk + "/" + n }, T.passage ? { passage: T.passage } : {}, T.audio_text ? { audio_text: T.audio_text } : {});
  }
  E.openTest = function (sk, n, t) {
    return loadPart(sk, n).then(function (part) { return makeAct(sk, n, t, part); });
  };

  /* ---------------------------------------------------------------- styles (EPZ look: same cards, buttons, colours, fonts) */
  var CSS = "\
.ez{display:flex;flex-direction:column;gap:14px;padding-bottom:20px}\
.ez-top{display:flex;align-items:center;gap:8px}.ez-top h1{font-size:1.35rem;margin:0;flex:1;min-width:0;line-height:1.2}\
.ez-hero{border-radius:var(--r);padding:16px;background:linear-gradient(135deg,var(--brand),var(--brand-deep,#06604D));color:#fff;display:flex;flex-direction:column;gap:10px;box-shadow:var(--shadow)}\
.ez-hero h2{margin:0;color:#fff;font-size:1.3rem}.ez-hero p{margin:0;opacity:.92;font-weight:700;font-size:.92rem}\
.ez-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.ez-stats div{background:rgb(255 255 255 / .16);border-radius:12px;padding:8px 2px;text-align:center;min-width:0}\
.ez-stats b{display:block;font-family:var(--display);font-size:1.2rem;line-height:1.1}.ez-stats span{font-size:.68rem;font-weight:800;opacity:.9}\
.ez-bar{height:10px;border-radius:999px;background:var(--surface-2);border:1px solid var(--line);overflow:hidden}.ez-bar span{display:block;height:100%;background:var(--c,var(--brand));border-radius:999px;transition:width .4s}\
.ez-hero .ez-bar{background:rgb(255 255 255 / .25);border-color:transparent}.ez-hero .ez-bar span{background:#FFD83D}\
.ez-sk{display:grid;grid-template-columns:1fr;gap:10px}@media(min-width:560px){.ez-sk{grid-template-columns:1fr 1fr}}\
.ez-skill{display:flex;gap:12px;align-items:center;padding:14px;border-radius:var(--r);text-decoration:none;color:var(--ink);background:color-mix(in srgb,var(--c) 9%,var(--surface));border:2px solid color-mix(in srgb,var(--c) 22%,var(--surface));box-shadow:0 4px 0 color-mix(in srgb,var(--c) 30%,var(--surface));transition:transform .08s;min-height:92px}\
.ez-skill:active{transform:translateY(3px);box-shadow:0 1px 0 color-mix(in srgb,var(--c) 30%,var(--surface))}.ez-skill.soon{opacity:.55;pointer-events:none;box-shadow:none}\
.ez-skill .skill-ic{width:46px;height:46px}.ez-skill .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}.ez-skill b{font-family:var(--display);font-size:1.12rem;line-height:1.15}.ez-skill small{color:var(--muted);font-weight:700;font-size:.8rem}\
.ez-chip{display:inline-block;padding:2px 9px;border-radius:999px;font-size:.7rem;font-weight:900;background:var(--surface-2);color:var(--muted);white-space:nowrap}.ez-chip.ok{background:var(--good-bg);color:var(--good-ink)}.ez-chip.warn{background:#FFF1D6;color:#5A3A00}\
.ez-part{display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px;border-radius:var(--r-s);background:var(--surface);border:2px solid var(--line);text-decoration:none;color:var(--ink);box-shadow:0 3px 0 var(--line);transition:transform .08s}\
.ez-part:active{transform:translateY(2px);box-shadow:0 1px 0 var(--line)}.ez-part .no{width:38px;height:38px;border-radius:12px;background:var(--c);color:#fff;display:grid;place-items:center;font-family:var(--display);font-weight:800}\
.ez-part b{display:block;line-height:1.25}.ez-part small{color:var(--muted);font-weight:700}.ez-dots{display:flex;gap:4px;margin-top:5px}.ez-dots i{width:16px;height:8px;border-radius:99px;background:var(--surface-2);border:1px solid var(--line)}.ez-dots i.d{background:var(--c);border-color:var(--c)}.ez-dots i.g{background:var(--good);border-color:var(--good)}\
.ez-test{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:12px;border-radius:var(--r-s);background:var(--surface);border:2px solid var(--line);box-shadow:0 3px 0 var(--line)}\
.ez-test b{display:block;line-height:1.25}.ez-test small{display:block;color:var(--muted);font-weight:700;margin-top:2px}.ez-test .sc{font-family:var(--display);font-weight:800}\
.ez-learnbtn{display:flex;align-items:center;gap:12px;padding:14px;border-radius:var(--r);background:color-mix(in srgb,var(--c) 10%,var(--surface));border:2px solid color-mix(in srgb,var(--c) 28%,var(--surface));text-decoration:none;color:var(--ink)}\
.ez-learnbtn .skill-ic{width:46px;height:46px}.ez-learnbtn .tx{flex:1;min-width:0}.ez-learnbtn b{font-family:var(--display);font-size:1.1rem}.ez-learnbtn small{display:block;color:var(--muted);font-weight:700}\
.ez-h{font-family:var(--display);font-size:1.15rem;margin:6px 2px 0}\
.ez-steps{display:flex;gap:5px;flex-wrap:wrap}.ez-steps i{height:8px;flex:1;min-width:14px;border-radius:99px;background:var(--surface-2);border:1px solid var(--line)}.ez-steps i.d{background:var(--c);border-color:var(--c)}.ez-steps i.now{background:#FFD83D;border-color:#B9801A}\
.ez-card{background:var(--surface);border:2px solid var(--line);border-radius:var(--r);box-shadow:0 4px 0 var(--line);padding:16px;display:flex;flex-direction:column;gap:12px;animation:ezin .3s ease both}@keyframes ezin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}\
.ez-card h2{margin:0;font-size:1.25rem}.ez-card p{margin:0;line-height:1.5;font-size:1rem}.ez-big{font-size:2.4rem;line-height:1}.ez-kick{font-size:.74rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--c)}\
mark.ez-hl{background:#FFE9A8;color:inherit;padding:0 4px;border-radius:5px;font-weight:900}\
.ez-ex{display:flex;flex-direction:column;gap:8px}.ez-ex>div{padding:10px 12px;border-left:5px solid var(--c);background:var(--surface-2);border-radius:0 12px 12px 0;font-size:1.05rem;line-height:1.4}.ez-ex small{display:block;color:var(--muted);font-weight:700;font-size:.8rem;margin-top:2px}\
.ez-table{width:100%;border-collapse:separate;border-spacing:0;border:2px solid var(--line);border-radius:14px;overflow:hidden;font-size:.95rem}.ez-table th{background:var(--c);color:#fff;text-align:left;padding:8px 10px;font-size:.85rem}.ez-table td{padding:9px 10px;border-top:1px solid var(--line);vertical-align:top}.ez-table tr:nth-child(even) td{background:var(--surface-2)}\
.ez-tip{background:#FFF6DA;border:2px solid #F2B632;border-radius:14px;padding:12px;display:flex;gap:10px;color:#3A2600}.ez-tip p{color:#3A2600}.ez-tip .e{font-size:1.4rem}\
.ez-mis{display:flex;flex-direction:column;gap:8px}.ez-mis>div{border-radius:12px;border:2px solid var(--line);overflow:hidden}.ez-mis .no,.ez-mis .yes{padding:8px 12px;font-weight:700}.ez-mis .no{background:var(--bad-bg);color:var(--bad-ink);text-decoration:line-through;text-decoration-thickness:2px}.ez-mis .yes{background:var(--good-bg);color:var(--good-ink)}.ez-mis small{display:block;padding:6px 12px;color:var(--muted);font-weight:700}\
.ez-words{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ez-word{border:2px solid var(--line);border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:3px;background:var(--surface-2)}.ez-word .em{font-size:2rem;line-height:1}.ez-word b{font-size:1.05rem}.ez-word .say{color:var(--c);font-weight:800;font-size:.85rem}.ez-word small{color:var(--muted);font-weight:700}.ez-word button{margin-top:4px;align-self:flex-start}\
.ez-prac{display:flex;flex-direction:column;gap:10px}.ez-prac .qarea{padding:0}\
.ez-fb{border-radius:12px;padding:10px 12px;font-weight:700;line-height:1.4}.ez-fb.good{background:var(--good-bg);color:var(--good-ink)}.ez-fb.bad{background:var(--bad-bg);color:var(--bad-ink)}.ez-fb p{margin:4px 0 0;font-weight:600}\
.ez-nav{display:flex;gap:10px}.ez-nav .btn{flex:1}.ez-link{display:flex;justify-content:center;gap:16px;flex-wrap:wrap}.ez-link a{font-weight:800;color:var(--brand);text-decoration:none}\
.ez-rv{display:flex;flex-direction:column;gap:8px}.ez-rv>div{border:2px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface)}.ez-rv>div.ok{border-color:var(--good)}.ez-rv>div.no{border-color:var(--bad)}.ez-rv b{display:block}.ez-rv .a{margin-top:4px;font-weight:700}.ez-rv small{display:block;color:var(--muted);font-weight:700;margin-top:4px}\
.ez-weak{display:flex;flex-direction:column;gap:8px}.ez-weak a{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:12px;background:var(--surface);border:2px solid var(--line);text-decoration:none;color:var(--ink);font-weight:700}\
.ez-card-home{display:flex;align-items:center;gap:12px;padding:14px;border-radius:var(--r);text-decoration:none;color:#fff;background:linear-gradient(135deg,var(--brand),var(--brand-deep,#06604D));box-shadow:var(--shadow);margin-bottom:14px}.ez-card-home .tx{flex:1;min-width:0;display:flex;flex-direction:column}.ez-card-home b{font-family:var(--display);font-size:1.15rem}.ez-card-home small{opacity:.92;font-weight:700}.ez-card-home .go{background:#FFD83D;color:#2B2300;font-weight:900;padding:9px 14px;border-radius:12px;box-shadow:0 3px 0 #B9801A}\
.ez-pass{background:var(--surface-2);border-left:5px solid var(--c);border-radius:0 14px 14px 0;padding:12px 14px;display:flex;flex-direction:column;gap:8px}.ez-pass p{font-size:1.02rem;line-height:1.55}\
.ez-qbox{background:#E3EAF6;border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:2px}.ez-qbox small{font-weight:900;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--c)}.ez-qbox b{font-size:1.02rem}\
.ez-steps-l{list-style:none;counter-reset:s;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}.ez-steps-l li{counter-increment:s;display:grid;grid-template-columns:30px 1fr;gap:10px;align-items:start}.ez-steps-l li:before{content:counter(s);grid-row:1 / span 2;width:30px;height:30px;border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;font-weight:900}.ez-steps-l b{display:block;grid-column:2}.ez-steps-l span{display:block;grid-column:2;color:var(--muted);font-weight:600;line-height:1.4}\.ez-vnote{background:#FFF1D6;border-radius:12px;padding:10px 12px;font-weight:700;color:#5A3A00}.ez-reveal{background:var(--surface-2);border-left:5px solid var(--c);border-radius:0 14px 14px 0;padding:12px 14px;display:flex;flex-direction:column;gap:6px}.ez-reveal p{font-size:.95rem;line-height:1.45}\
.ez-topic{display:flex;flex-direction:column;gap:10px;padding:12px;border-radius:var(--r-s);background:var(--surface);border:2px solid var(--line);box-shadow:0 3px 0 var(--line)}\
.ez-topic-main{display:grid;grid-template-columns:38px minmax(0,1fr);gap:12px;align-items:center;text-decoration:none;color:var(--ink)}\
.ez-topic .no{width:38px;height:38px;border-radius:12px;background:var(--c);color:#fff;display:grid;place-items:center;font-family:var(--display);font-weight:800}\
.ez-topic b{display:block;line-height:1.25}.ez-topic small{color:var(--muted);font-weight:700}\
.ez-topic-btns{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ez-topic-btns .btn{min-height:42px;justify-content:center;white-space:nowrap}\
.ez-topic.soon{display:grid;grid-template-columns:38px minmax(0,1fr);gap:12px;align-items:center;opacity:.6;box-shadow:none}\
.ez-all{border:2px solid var(--line);border-radius:var(--r);background:var(--surface);padding:0 12px;margin-top:10px}.ez-all summary{display:flex;align-items:center;gap:10px;min-height:54px;cursor:pointer;list-style:none}.ez-all summary::-webkit-details-marker{display:none}.ez-all summary .skill-ic{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;flex:none}.ez-all summary b{flex:1;font-family:var(--display);font-size:1.05rem}.ez-all summary:after{content:'+';font-size:1.3rem;font-weight:900;margin-left:4px}.ez-all[open] summary:after{content:'\\2013'}.ez-all .ez-topics{padding-bottom:12px}\@media(max-width:380px){.ez-stats b{font-size:1.05rem}.ez-words{grid-template-columns:1fr}}\
";
  function injectCss() { if (css) return; css = true; var s = document.createElement("style"); s.id = "ez-css"; s.textContent = CSS; document.head.appendChild(s); }

  /* ---------------------------------------------------------------- screens */
  var app = function () { return H.app; };
  function top(title, backHash, backLabel) {
    return '<header class="top ez-top"><a class="icon-btn" href="#' + backHash + '" aria-label="' + esc(backLabel || "Back") + '">' + H.icon("back", 24) + '</a><h1>' + esc(title) + '</h1><span class="icon-btn" aria-hidden="true"></span></header>';
  }
  // the card shown at the top of the Practice tab
  E.homeCard = function () {
    var t = E.totals(), r = readyTotals(); injectCssSafe();
    return '<a class="ez-card-home" href="#easy"><span class="skill-ic" style="--c:#fff;background:rgb(255 255 255 / .2)">' + H.icon("target", 24) + '</span><span class="tx"><b>Easy Level course</b><small>' + t.skills + ' skills · ' + t.parts + ' topics · Learn and 5 tests in each' + (r.done ? ' · ' + r.done + '/' + r.tests + ' tests done' : '') + '</small></span><span class="go">Open</span></a>';
  };
  function injectCssSafe() { try { injectCss(); } catch (e) {} }

  E.route = function (hash) {
    injectCss(); var p = hash.split("/"); window.scrollTo(0, 0);
    if (p[0] === "easy" && !p[1]) return homeScreen();
    if (p[0] === "easy" && p[1] === "learn") return learnScreen(p[2], +p[3]);
    if (p[0] === "easy" && p[1] && !p[2]) return skillScreen(p[1]);
    if (p[0] === "easy" && p[1] && p[2]) return partScreen(p[1], +p[2]);
    return homeScreen();
  };

  function homeScreen() {
    var t = E.totals(), r = readyTotals(), pct = r.tests ? Math.round(100 * r.done / r.tests) : 0, weak = weakAreas();
    app().dataset.tab = "skills";
    app().innerHTML = '<div class="ez">' + top("Easy Level", "skills", "Back to Practice") +
      '<section class="ez-hero"><h2>Learn, then test yourself</h2><p>' + t.skills + ' skills · ' + t.parts + ' topics · ' + t.tests + ' tests · ' + t.questions.toLocaleString("en") + ' questions. The same course for Grades 9 to 12.</p>' +
      '<div class="ez-bar"><span style="width:' + pct + '%"></span></div>' +
      '<div class="ez-stats"><div><b>' + r.done + '</b><span>of ' + r.tests + ' tests</span></div><div><b>' + r.learned + '</b><span>of ' + r.parts + ' Learn</span></div><div><b>' + (r.done ? r.avg + "%" : "–") + '</b><span>average</span></div><div><b>' + (r.done ? r.best + "%" : "–") + '</b><span>best</span></div></div>' +
      (r.skills < t.skills ? '<p style="font-size:.8rem">' + r.skills + ' of ' + t.skills + ' skills are open now. The rest are on the way.</p>' : "") + '</section>' +
      '<h2 class="ez-h">Pick a skill</h2><div class="ez-sk">' + E.SKILLS.map(function (S) {
        var sk = H.SKILLS2[S.k], st = skillStats(S.k), ready = !!E.READY[S.k], pc = st.tests ? Math.round(100 * st.done / st.tests) : 0;
        return '<a class="ez-skill' + (ready ? "" : " soon") + '" href="' + (ready ? "#easy/" + S.k : "#easy") + '" style="--c:' + sk.color + '"><span class="skill-ic">' + H.icon(sk.icon, 24) + '</span><span class="tx"><b>' + esc(sk.name) + '</b><small>' + plural(S.parts.length, "topic") + ' · ' + S.parts.length * TESTS + ' tests</small>' +
          (ready ? '<div class="ez-bar"><span style="width:' + pc + '%"></span></div><small>' + st.done + '/' + st.tests + ' tests · ' + st.learned + '/' + st.parts + ' Learn</small>' : '<small><span class="ez-chip">Coming soon</span></small>') + '</span></a>';
      }).join("") + '</div>' +
      '<h2 class="ez-h">All topics</h2>' + E.SKILLS.map(function (S, si) {
        var sk = H.SKILLS2[S.k], ready = !!E.READY[S.k];
        return '<details class="ez-all" style="--c:' + sk.color + '"' + (ready && si === 0 ? " open" : "") + '><summary><span class="skill-ic" style="background:' + sk.color + ';color:#fff">' + H.icon(sk.icon, 18) + '</span><b>' + esc(sk.name) + '</b><span class="ez-chip">' + plural(S.parts.length, "topic") + '</span></summary><div class="ez-topics">' + S.parts.map(function (name, i) { return topicRow(S.k, i + 1, name, ready); }).join("") + '</div></details>';
      }).join("") +
      (weak.length ? '<h2 class="ez-h">Practise these again</h2><div class="ez-weak">' + weak.map(function (w) { return '<a href="#easy/' + w.sk + '/' + w.n + '"><span>' + esc(H.SKILLS2[w.sk].name) + ' · ' + esc(w.name) + '</span><b>' + w.avg + '%</b></a>'; }).join("") + '</div>' : "") + '</div>';
  }
  function weakAreas() {
    var out = [];
    E.SKILLS.forEach(function (S) { if (!E.READY[S.k]) return; for (var n = 1; n <= S.parts.length; n++) { var ps = partStats(S.k, n); if (ps.done && ps.avg < 70) out.push({ sk: S.k, n: n, name: S.parts[n - 1], avg: ps.avg }); } });
    return out.sort(function (a, b) { return a.avg - b.avg; }).slice(0, 5);
  }

  // one topic (a Part) as a row with two visible buttons: Learn and Tests
  function topicRow(sk, n, name, ready) {
    var S = skillOf(sk), meta = H.SKILLS2[sk];
    if (!ready) return '<div class="ez-topic soon" style="--c:' + meta.color + '"><span class="no">' + n + '</span><span class="tx"><b>' + esc(name) + '</b><small><span class="ez-chip">Coming soon</span></small></span></div>';
    var ps = partStats(sk, n), dots = ""; for (var t = 1; t <= TESTS; t++) { var r = tRec(sk, n, t); dots += '<i class="' + (r && r.n ? (r.b >= 8 ? "g" : "d") : "") + '"></i>'; }
    return '<div class="ez-topic" style="--c:' + meta.color + '"><a class="ez-topic-main" href="#easy/' + sk + '/' + n + '"><span class="no">' + n + '</span><span class="tx"><b>' + esc(name) + '</b><small>' + ps.done + '/' + TESTS + ' tests' + (ps.done ? ' \u00B7 ' + ps.avg + '% average' : '') + '</small><span class="ez-dots">' + dots + '</span></span></a>' +
      '<div class="ez-topic-btns"><a class="btn ' + (ps.learn ? "btn-ghost" : "btn-primary") + ' btn-sm" href="#easy/learn/' + sk + '/' + n + '">' + H.icon("book", 14) + ' Learn' + (ps.learn ? " \u2713" : "") + '</a><a class="btn ' + (ps.done === TESTS ? "btn-ghost" : "btn-primary") + ' btn-sm" href="#easy/' + sk + '/' + n + '/tests">' + H.icon("target", 14) + ' Tests ' + ps.done + '/' + TESTS + '</a></div></div>';
  }
  function skillScreen(sk) {
    var S = skillOf(sk); if (!S || !E.READY[sk]) return homeScreen();
    var meta = H.SKILLS2[sk], st = skillStats(sk), pc = Math.round(100 * st.done / st.tests);
    app().dataset.tab = "skills";
    app().innerHTML = '<div class="ez" style="--c:' + meta.color + '">' + top(meta.name, "easy", "Back to Easy Level") +
      '<section class="ez-hero" style="background:linear-gradient(135deg,' + meta.color + ',color-mix(in srgb,' + meta.color + ' 60%,#17224D))"><h2>' + esc(meta.name) + '</h2><p>' + plural(st.parts, "topic") + ' · ' + st.tests + ' tests. Study the Learn page, then take the 5 tests.</p><div class="ez-bar"><span style="width:' + pc + '%"></span></div>' +
      '<div class="ez-stats"><div><b>' + st.done + '</b><span>of ' + st.tests + ' tests</span></div><div><b>' + st.learned + '</b><span>of ' + st.parts + ' Learn</span></div><div><b>' + st.partsDone + '</b><span>topics done</span></div><div><b>' + (st.done ? st.avg + "%" : "–") + '</b><span>average</span></div></div></section>' +
      '<h2 class="ez-h">Topics</h2><div class="ez-topics">' + S.parts.map(function (name, i) { return topicRow(sk, i + 1, name, true); }).join("") + '</div></div>';
  }

  function partScreen(sk, n) {
    var S = skillOf(sk); if (!S || !E.READY[sk] || !(n >= 1 && n <= S.parts.length)) return homeScreen();
    var meta = H.SKILLS2[sk], name = S.parts[n - 1]; app().dataset.tab = "skills";
    app().innerHTML = '<div class="ez"><p style="text-align:center;padding:40px 12px">Loading…</p></div>';
    loadPart(sk, n).then(function (part) {
      if (location.hash.replace(/^#/, "").indexOf("easy/" + sk + "/" + n) !== 0) return;
      var ps = partStats(sk, n), prev = n > 1 ? n - 1 : 0, next = n < S.parts.length ? n + 1 : 0;
      app().innerHTML = '<div class="ez" style="--c:' + meta.color + '">' + top(name, "easy/" + sk, "Back to " + meta.name) +
        '<a class="ez-learnbtn" href="#easy/learn/' + sk + '/' + n + '"><span class="skill-ic" style="background:' + meta.color + ';color:#fff">' + H.icon("book", 24) + '</span><span class="tx"><b>' + (ps.learn ? "Learn (done)" : ps.learnStep ? "Continue Learn" : "Start with Learn") + '</b><small>' + part.learn.length + ' short steps. You can open it any time.</small></span><span class="ez-chip ' + (ps.learn ? "ok" : "warn") + '">' + (ps.learn ? "✓ Done" : "Study first") + '</span></a>' +
        '<h2 class="ez-h" id="ez-tests">5 tests · 10 questions each</h2>' + part.tests.map(function (T, i) {
          var t = i + 1, r = tRec(sk, n, t);
          return '<div class="ez-test"><div><b>Test ' + t + ': ' + esc(T.title) + '</b><small>' + esc(T.instructions) + '</small>' + (r && r.n ? '<small>Best ' + r.b * 10 + '% · last ' + r.l * 10 + '% · ' + plural(r.n, "try") + '</small>' : '<small>Not tried yet</small>') + '</div><a class="btn ' + (r && r.n ? "btn-ghost" : "btn-primary") + ' btn-sm" href="#play-' + testId(sk, n, t) + '">' + (r && r.n ? "Again" : "Start") + '</a></div>';
        }).join("") +
        '<div class="ez-link">' + (prev ? '<a href="#easy/' + sk + '/' + prev + '">‹ Previous topic</a>' : "") + '<a href="#easy/' + sk + '">Return to ' + esc(meta.name) + '</a>' + (next ? '<a href="#easy/' + sk + '/' + next + '">Next topic ›</a>' : "") + '</div></div>';
      if (/\/tests$/.test(location.hash)) { var tg = app().querySelector('#ez-tests'); tg && setTimeout(function () { tg.scrollIntoView({ block: 'start' }); }, 60); }
    }).catch(function () { app().innerHTML = '<div class="ez">' + top(name, "easy/" + sk) + '<section class="block" style="text-align:center"><p>Could not load this topic. Check your connection.</p><a class="btn btn-primary" href="#easy/' + sk + '/' + n + '">Try again</a></section></div>'; });
  }

  /* ---------------------------------------------------------------- Learn viewer: one short card at a time, progress saved so the student can continue */
  function learnScreen(sk, n) {
    var S = skillOf(sk); if (!S || !E.READY[sk] || !(n >= 1 && n <= S.parts.length)) return homeScreen();
    app().dataset.tab = "skills"; app().innerHTML = '<div class="ez"><p style="text-align:center;padding:40px 12px">Loading…</p></div>';
    loadPart(sk, n).then(function (part) {
      var meta = H.SKILLS2[sk], cards = part.learn, lr = lRec(sk, n), at = Math.min(lr && !lr.d ? lr.s || 0 : 0, cards.length - 1), name = S.parts[n - 1];
      function save(step, done) { var p = prog(true), r = p.l[partId(sk, n)] || (p.l[partId(sk, n)] = { s: 0, d: 0 }); r.s = step; if (done) r.d = 1; r.at = new Date().toISOString(); H.save(); }
      function draw() {
        var c = cards[at], last = at === cards.length - 1;
        app().innerHTML = '<div class="ez" style="--c:' + meta.color + '">' + top("Learn: " + name, "easy/" + sk + "/" + n, "Back to the topic") +
          '<div class="ez-steps" aria-label="Step ' + (at + 1) + ' of ' + cards.length + '">' + cards.map(function (_, i) { return '<i class="' + (i < at ? "d" : i === at ? "now" : "") + '"></i>'; }).join("") + '</div>' +
          '<section class="ez-card" id="ez-card">' + cardHtml(c, sk) + '</section>' +
          '<div class="ez-nav"><button class="btn btn-ghost btn-big" id="ez-prev" ' + (at ? "" : "disabled") + '>' + H.icon("back", 18) + ' Previous</button><button class="btn btn-primary btn-big" id="ez-next">' + (last ? "Finish " + H.icon("check", 18) : "Next " + H.icon("next", 18)) + '</button></div>' +
          '<div class="ez-link"><a href="#easy/' + sk + '/' + n + '">Back to topic</a><a href="#easy/' + sk + '">Return to ' + esc(meta.name) + '</a></div></div>';
        mountCard(c);
        app().querySelector("#ez-prev").addEventListener("click", function () { if (at) { at--; save(at); window.scrollTo(0, 0); draw(); } });
        app().querySelector("#ez-next").addEventListener("click", function () {
          if (last) { save(0, true); H.toast("Learn finished. Now try the tests!", "success", 2200); H.go("easy/" + sk + "/" + n); return; }
          at++; save(at); window.scrollTo(0, 0); draw();
        });
      }
      draw();
    }).catch(function () { app().innerHTML = '<div class="ez">' + top("Learn", "easy/" + sk + "/" + n) + '<section class="block" style="text-align:center"><p>Could not load this Learn page. Check your connection.</p></section></div>'; });
  }

  function cardHtml(c, sk) {
    var k = c.k, h = c.h ? '<h2>' + esc(c.h) + '</h2>' : "";
    if (k === "intro") return '<span class="ez-kick">' + esc(c.kick || "Learn") + '</span>' + (c.e ? '<div class="ez-big">' + c.e + '</div>' : "") + h + [].concat(c.p || []).map(function (t) { return '<p>' + hl(t) + '</p>'; }).join("") + (c.ex ? exHtml(c.ex) : "");
    if (k === "examples") return '<span class="ez-kick">' + esc(c.kick || "Examples") + '</span>' + h + (c.p ? '<p>' + hl(c.p) + '</p>' : "") + exHtml(c.items);
    if (k === "table") return '<span class="ez-kick">' + esc(c.kick || "Structure") + '</span>' + h + (c.p ? '<p>' + hl(c.p) + '</p>' : "") + '<table class="ez-table"><thead><tr>' + c.head.map(function (t) { return '<th>' + hl(t) + '</th>'; }).join("") + '</tr></thead><tbody>' + c.rows.map(function (r) { return '<tr>' + r.map(function (t) { return '<td>' + hl(t) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table>' + (c.note ? '<p>' + hl(c.note) + '</p>' : "");
    if (k === "tip") return '<span class="ez-kick">Quick tips</span>' + h + [].concat(c.items || []).map(function (t) { return '<div class="ez-tip"><span class="e">' + (c.e || "💡") + '</span><p>' + hl(t) + '</p></div>'; }).join("");
    if (k === "passage") return '<span class="ez-kick">' + esc(c.kick || "Read") + '</span>' + h + '<div class="ez-pass">' + String(c.text).split("\n").map(function (l) { return l ? '<p>' + hl(l) + '</p>' : ""; }).join("") + '</div>' + (c.p ? '<p>' + hl(c.p) + '</p>' : "");
    if (k === "steps") return '<span class="ez-kick">' + esc(c.kick || "Guided example") + '</span>' + h + (c.q ? '<div class="ez-qbox"><small>Question</small><b>' + hl(c.q) + '</b></div>' : "") + '<ol class="ez-steps-l">' + c.items.map(function (i) { return '<li><b>' + hl(i[0]) + '</b><span>' + hl(i[1]) + '</span></li>'; }).join("") + '</ol>' + (c.p ? '<p>' + hl(c.p) + '</p>' : "");    if (k === "mistakes") return '<span class="ez-kick">Common mistakes</span>' + h + '<div class="ez-mis">' + c.items.map(function (i) { return '<div><div class="no">' + esc(i[0]) + '</div><div class="yes">' + hl(i[1]) + '</div>' + (i[2] ? '<small>' + hl(i[2]) + '</small>' : "") + '</div>'; }).join("") + '</div>';
    if (k === "words") return '<span class="ez-kick">' + esc(c.kick || "Words") + '</span>' + h + '<div class="ez-words">' + c.items.map(function (w, i) { return '<div class="ez-word"><span class="em">' + (w[0] || "") + '</span><b>' + esc(w[1]) + '</b><span class="say">' + esc(w[3] || "") + '</span><small>' + esc(w[2]) + '</small>' + (w[4] ? '<small>' + hl(w[4]) + '</small>' : "") + '<button type="button" class="btn btn-ghost btn-sm" data-say="' + i + '">' + H.icon("volume", 14) + ' Hear it</button></div>'; }).join("") + '</div>';
    if (k === "listen") return '<span class="ez-kick">' + esc(c.kick || "Listen") + '</span>' + h + '<p>' + hl(c.p || "Listen, then answer. You can play it again.") + '</p><div class="audio-box"><span class="audio-ic">' + H.icon("listening", 24) + '</span><span class="audio-txt"><b>Listen first</b><span>Play it as many times as you like.</span></span><button class="btn btn-primary" type="button" data-lplay="0.92">' + H.icon("volume", 18) + ' Play</button><button class="btn btn-ghost" type="button" data-lplay="0.7">' + H.icon("slow", 18) + ' Slow</button></div><p class="ez-vnote" hidden></p><div class="ez-prac" id="ez-prac"></div><div class="ez-reveal" id="ez-reveal" hidden><b>What you heard</b>' + String(c.script).split("\n").map(function (l) { return '<p>' + esc(l) + '</p>'; }).join("") + '</div>';
    if (k === "practice") return '<span class="ez-kick">Try it</span>' + h + '<p>' + esc(c.p || "Answer these quick questions.") + '</p>' + (c.text ? '<div class="ez-pass">' + String(c.text).split("\n").map(function (l) { return l ? '<p>' + hl(l) + '</p>' : ""; }).join("") + '</div>' : "") + '<div class="ez-prac" id="ez-prac"></div>';
    return '<p>' + hl(c.p || "") + '</p>';
  }
  function exHtml(items) { return '<div class="ez-ex">' + items.map(function (i) { var a = [].concat(i); return '<div>' + hl(a[0]) + (a[1] ? '<small>' + hl(a[1]) + '</small>' : "") + '</div>'; }).join("") + '</div>'; }
  // interactive bits of a card (say buttons, the mini practice)
  function mountCard(c) {
    var root = app().querySelector("#ez-card");
    root.querySelectorAll("[data-say]").forEach(function (b) { b.addEventListener("click", function () { H.speak(c.items[+b.dataset.say][1], 0.85); }); });
    if (c.k === "listen") { root.querySelectorAll("[data-lplay]").forEach(function (b) { b.addEventListener("click", function () { E.speak(c.script, +b.dataset.lplay); }); }); E.voiceCheck(root.querySelector(".ez-vnote")); }
    if (c.k !== "practice" && c.k !== "listen") return;
    var box = root.querySelector("#ez-prac"), qs = c.qs, i = 0, right = 0;
    function one() {
      var q = qs[i], wrap = document.createElement("div"); wrap.className = "ez-prac"; box.innerHTML = ""; box.appendChild(wrap);
      var area = document.createElement("section"); area.className = "qarea"; wrap.appendChild(area);
      var btn = document.createElement("button"); btn.className = "btn btn-primary btn-big"; btn.textContent = "Check"; btn.disabled = true; wrap.appendChild(btn);
      var fb = document.createElement("div"); wrap.appendChild(fb); var done = false, ctrl;
      function check() {
        if (done) return; done = true; var res = ctrl.evaluate(); res.ok && right++; btn.hidden = true;
        fb.className = "ez-fb " + (res.ok ? "good" : "bad");
        fb.innerHTML = (res.ok ? "Correct! " : "Not quite. ") + (!res.ok && res.correctText ? "Answer: <b>" + esc(res.correctText) + "</b>" : "") + (q.explanation ? "<p>" + esc(q.explanation) + "</p>" : "");
        var nx = document.createElement("button"); nx.className = "btn btn-big " + (i < qs.length - 1 ? "btn-primary" : "btn-ghost"); nx.innerHTML = i < qs.length - 1 ? "Next question" : "Done (" + right + "/" + qs.length + ")";
        nx.addEventListener("click", function () { if (i < qs.length - 1) { i++; one(); } else { nx.disabled = true; nx.textContent = "Nice work! " + right + "/" + qs.length + " ✓"; var rv = root.querySelector("#ez-reveal"); rv && (rv.hidden = false); } }); wrap.appendChild(nx);
      }
      ctrl = H.mountQuestion(q, area, { setReady: function (r) { btn.disabled = !r; }, submitNow: check });
      btn.hidden = !!ctrl.autoCheck; btn.addEventListener("click", check);
    }
    one();
  }

  /* ---------------------------------------------------------------- the player calls these */
  // points for a course test: full points the first time, then only for answers that beat the best score (so retakes can't farm points)
  E.score = function (act, correct, total) {
    var cr = act.course, r = tRec(cr.skill, cr.part, cr.test), prevBest = r ? r.b : -1, gain = Math.max(0, correct - Math.max(0, prevBest)), base = gain * PTS_Q, bonus = correct === total && total > 0 && prevBest < total ? 20 : 0;
    return { base: base, bonus: bonus, points: base + bonus, repeat: prevBest >= 0 };
  };
  E.save = function (act, correct, total) {
    var cr = act.course, p = prog(true), id = testId(cr.skill, cr.part, cr.test), r = p.t[id] || (p.t[id] = { b: 0, n: 0, l: 0 });
    r.n++; r.l = correct; r.b = Math.max(r.b, correct); r.at = new Date().toISOString(); H.save();
  };
  E.finish = function (act, o) {
    var cr = act.course, S = skillOf(cr.skill), meta = H.SKILLS2[cr.skill], acc = Math.round(100 * o.correct / o.total), part = cr.part, next = cr.test < TESTS ? cr.test + 1 : 0;
    var msg = acc === 100 ? "Perfect score! Excellent work." : acc >= 80 ? "Great job! You know this well." : acc >= 60 ? "Good effort. Read the Learn page again, then try another test." : "Keep practising. Open the Learn page and try again.";
    app().dataset.tab = "skills";
    app().innerHTML = '<section class="results" style="--c:' + meta.color + '"><div class="ring" style="--p:' + acc + '"><span><b>' + o.correct + '/' + o.total + '</b><small>' + acc + '%</small></span></div><h1>' + (acc >= 80 ? "Well done!" : acc >= 50 ? "Good effort!" : "Keep practising!") + '</h1><p class="muted">' + esc(meta.name) + ' · ' + esc(cr.partName) + ' · Test ' + cr.test + '</p>' +
      '<div class="res-chips"><span>' + H.icon("check", 16) + ' ' + o.correct + ' correct</span><span>' + H.icon("x", 16) + ' ' + (o.total - o.correct) + ' incorrect</span><span>' + acc + '%</span></div><p>' + msg + '</p>' +
      '<div class="earned-pts">' + H.icon("star", 22) + ' +' + H.fmtNum(o.r.points) + ' points</div>' + (o.r.bonus ? '<p class="small good-text">Includes +' + o.r.bonus + ' for your first perfect score.</p>' : "") + (o.r.repeat ? '<p class="muted small">You tried this test before, so you only earn points for answers that beat your best score.</p>' : "") +
      (o.r.newBadges || []).map(function (k) { return '<div class="unlock badge-new"><span class="badge-ic">' + H.icon(H.BADGES[k].icon, 22) + '</span><div><b>New badge: ' + esc(H.BADGES[k].name) + '</b><span>' + esc(H.BADGES[k].desc) + '</span></div></div>'; }).join("") +
      '<div class="res-actions"><button class="btn btn-ghost btn-big" id="ez-rev">' + H.icon("eye", 20) + ' Review answers</button><a class="btn btn-primary btn-big" href="#' + (next ? "play-" + testId(cr.skill, part, next) : "easy/" + cr.skill + "/" + part) + '">' + H.icon("play", 20) + ' ' + (next ? "Try another test" : "Back to the topic") + '</a><a class="btn btn-ghost btn-big" href="#easy/' + cr.skill + '/' + part + '">' + H.icon("back", 20) + ' Return to the topic</a></div>' +
      '<div class="ez-rv" id="ez-rv" hidden>' + o.log.map(function (L, i) { return '<div class="' + (L.ok ? "ok" : "no") + '"><b>' + (i + 1) + '. ' + esc(L.prompt) + '</b>' + (L.given ? '<div class="a">Your answer: ' + esc(L.given) + '</div>' : "") + (L.ok ? '<div class="a">✓ Correct</div>' : '<div class="a">Correct answer: ' + esc(L.answer) + '</div>') + (L.explanation ? '<small>' + esc(L.explanation) + '</small>' : "") + '</div>'; }).join("") + '</div></section>';
    app().querySelector("#ez-rev").addEventListener("click", function () { var rv = app().querySelector("#ez-rv"); rv.hidden = !rv.hidden; this.lastChild.textContent = rv.hidden ? " Review answers" : " Hide answers"; });
    if (acc >= 80) H.confetti();
  };

  /* ---------------------------------------------------------------- audio: the phone's own English voice (free, no files). "Name: words" lines are read in a different voice or pitch for each speaker. */
  E.voices = function () { try { return window.speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); }); } catch (e) { return []; } };
  E.speak = function (text, rate) {
    if (!("speechSynthesis" in window)) { H.toast("This browser cannot play audio. Try Chrome.", "error", 4000); return; }
    var ss = window.speechSynthesis; ss.cancel();
    var vs = E.voices().sort(function (a, b) { return (/en-GB/i.test(b.lang) ? 1 : 0) - (/en-GB/i.test(a.lang) ? 1 : 0); }), who = {}, n = 0, pitch = [1, 1.3, 0.8, 1.15];
    String(text).split(/\n+/).filter(function (l) { return l.trim(); }).forEach(function (line) {
      var m = /^([A-Z][A-Za-z.' ]{0,18}):\s*(.+)$/.exec(line), spk = m ? m[1] : "narrator", body = m ? m[2] : line;
      if (!(spk in who)) who[spk] = n++;
      var i = who[spk], u = new SpeechSynthesisUtterance(body); u.lang = "en-GB"; u.rate = rate || 0.92; u.pitch = pitch[i % 4];
      if (vs.length) u.voice = vs[i % vs.length];
      ss.speak(u);
    });
  };
  // shows a plain message if the phone has no English voice, so the audio box is never silent without a reason
  E.voiceCheck = function (el) {
    if (!el) return;
    function show(msg) { el.hidden = false; el.className = "ez-vnote"; el.textContent = msg; }
    if (!("speechSynthesis" in window)) { show("This browser cannot play audio. Open EPZ in Chrome or Edge to take the listening tests."); return; }
    var tries = 0;
    (function look() {
      var all = window.speechSynthesis.getVoices();
      if (all.length) { if (!E.voices().length) show("This phone has no English voice. Open Settings, then Language, then Text-to-speech, and add an English voice. Then come back and try again."); return; }
      if (++tries < 12) setTimeout(look, 250);
    })();
  };

  E.init = function (host) { H = host; };
  // numbers a test can be checked against (used by the build checks, never shown to students)
  E.verify = function () {
    var out = { skills: E.SKILLS.length, parts: 0, loaded: 0, tests: 0, questions: 0, problems: [] };
    E.SKILLS.forEach(function (S) { out.parts += S.parts.length; });
    Object.keys(E.parts).forEach(function (id) {
      var p = E.parts[id]; out.loaded++; if (!p.learn || !p.learn.length) out.problems.push(id + ": no Learn"); if (!p.tests || p.tests.length !== TESTS) out.problems.push(id + ": needs " + TESTS + " tests");
      (p.tests || []).forEach(function (t, i) { out.tests++; out.questions += (t.questions || []).length; if (!t.title || !t.instructions) out.problems.push(id + " t" + (i + 1) + ": title or instruction missing"); if ((t.questions || []).length !== QS) out.problems.push(id + " t" + (i + 1) + ": " + (t.questions || []).length + " questions"); });
    });
    return out;
  };
})();
