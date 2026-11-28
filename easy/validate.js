/* Easy Level content check (developer tool, not loaded by the site).
   Open the site, go to #easy, then in the browser console load this file and run:  await __check(EPZ_EASY, 'grammar', 7)
   It loads every Part of a skill and lists problems: wrong counts (5 tests, 10 questions), missing Learn cards, missing explanations, bad options, repeated questions. */
window.__check = async function (E, skill, nParts) {
  for (var n = 1; n <= nParts; n++) await E.loadPart(skill, n);
  var v = E.verify(), prob = v.problems.slice(), seen = {}, kinds = {}, fmt = {};
  var need = skill === "scramble" ? { intro: 1, timeline: 1, tip: 1, practice: 1 } : skill === "building" ? { intro: 1, table: 1, examples: 1, mistakes: 1, tip: 1, practice: 1 } : skill === "grammar" ? { intro: 1, examples: 1, table: 1, tip: 1, mistakes: 1, practice: 1 } : skill === "reading" ? { intro: 1, passage: 1, steps: 1, tip: 1, practice: 1 } : skill === "listening" ? { intro: 1, steps: 1, listen: 1, tip: 1, practice: 1 } : { intro: 1, words: 1, examples: 1, table: 1, tip: 1, practice: 1 };
  for (var n2 = 1; n2 <= nParts; n2++) {
    var id = skill + "-" + n2, p = E.parts[id];
    var k = {}; p.learn.forEach(function (c) { k[c.k] = (k[c.k] || 0) + 1; });
    Object.keys(need).forEach(function (x) { if (!k[x]) prob.push(id + ": Learn has no '" + x + "' card"); });
    p.learn.forEach(function (c, i) { if (c.k === "words") c.items.forEach(function (w) { if (!w[1] || !w[2] || !w[3] || !w[4]) prob.push(id + " word card: " + w[1] + " needs a meaning, a pronunciation and an example"); else if (w[4].indexOf("**") < 0) prob.push(id + " word card: example for " + w[1] + " has no highlighted word"); }); if (c.k === "practice" && (c.qs || []).length < 3) prob.push(id + " learn practice has <3 questions"); if (c.k === "table" && c.rows.some(function (r) { return r.length !== c.head.length; })) prob.push(id + " learn card " + i + ": table row width"); });
    p.tests.forEach(function (t, ti) {
      var tag = id + " T" + (ti + 1);
      if (skill === "listening") { var aw = String(t.audio_text || "").split(/\s+/).filter(Boolean).length; if (aw < 60) prob.push(tag + ": audio script too short (" + aw + " words)"); if (aw > 260) prob.push(tag + ": audio script too long (" + aw + " words)"); if (t.passage) prob.push(tag + ": a listening test must not show a passage"); }
      if (skill === "reading") { var words = String(t.passage || "").split(/\s+/).filter(Boolean).length; if (words < 70) prob.push(tag + ": reading passage too short (" + words + " words)"); if (words > 220) prob.push(tag + ": reading passage too long (" + words + " words)"); }
      if (skill === "scramble") { var no = t.questions.filter(function (q) { return q.type === "order"; }).length; if (no < 5) prob.push(tag + ": only " + no + " ordering questions (needs 5 or more)"); t.questions.forEach(function (q, qi) { if (q.type === "order" && new Set(q.items.map(function (s) { return s.trim().toLowerCase(); })).size !== q.items.length) prob.push(tag + " Q" + (qi + 1) + ": duplicate sentences in an ordering question"); }); }
      if (skill === "building") { var nb = t.questions.filter(function (q) { return q.type === "build"; }).length; if (nb < 5) prob.push(tag + ": only " + nb + " sentence-building questions (needs 5 or more)"); }
      var f = {}; t.questions.forEach(function (q, qi) {
        var qt = tag + " Q" + (qi + 1); f[q.type] = (f[q.type] || 0) + 1; fmt[q.type] = (fmt[q.type] || 0) + 1;
        var key = (q.type + "|" + q.prompt + "|" + (q.answer || (q.items || []).join("/") || JSON.stringify(q.pairs || "")) + "|" + (q.options || []).slice().sort().join(",")).toLowerCase();
        if (seen[key]) prob.push(qt + ": repeats " + seen[key]); seen[key] = qt;
        if (!q.prompt) prob.push(qt + ": no prompt");
        if (!q.explanation) prob.push(qt + ": no explanation");
        if (q.type === "mcq") {
          if (!q.options || q.options.length < 3) prob.push(qt + ": needs 3+ options");
          else { if (q.options.indexOf(q.answer) !== 0) prob.push(qt + ": answer is not the first option"); if (new Set(q.options.map(function (o) { return o.toLowerCase(); })).size !== q.options.length) prob.push(qt + ": duplicate options"); }
        }
        if (q.type === "truefalse" && q.answer !== "True" && q.answer !== "False") prob.push(qt + ": bad true/false");
        if ((q.type === "fill" || q.type === "build" || q.type === "correct") && !String(q.answer || "").trim()) prob.push(qt + ": empty answer");
        if (q.type === "correct" && q.answer.split("|").every(function (a) { return a.trim().toLowerCase() === q.prompt.trim().toLowerCase(); })) prob.push(qt + ": 'correct' answer equals the mistake");
        if (q.type === "fill" && !q.image && !/_{2,}/.test(q.prompt)) prob.push(qt + ": fill has no blank");
        if (q.type === "build" && String(q.answer).split(/\s+/).length < 2) prob.push(qt + ": build too short");
        if (q.type === "match") { var L = q.pairs.map(function (x) { return x.left; }), R = q.pairs.map(function (x) { return x.right; }); if (new Set(L).size !== L.length || new Set(R).size !== R.length) prob.push(qt + ": match has duplicate sides"); if (q.pairs.length < 3) prob.push(qt + ": match needs 3+ pairs"); }
        if (q.type === "order" && (q.items || []).length < 3) prob.push(qt + ": order needs 3+ items");
      });
      if (Object.keys(f).length < 2) prob.push(tag + ": only one question format");
    });
  }
  return { counts: v, formats: fmt, problems: prob };
};
