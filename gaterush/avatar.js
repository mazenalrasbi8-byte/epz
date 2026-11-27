/* Gate Rush — the student's block-style racer, built from the same avatar settings as the rest of EPZ
   (skin, hair, hat, glasses, clothes, colours, extras). All shapes are boxes: no model files to download. */
(function () {
  var GR = (window.GR = window.GR || {});
  // the four exclusive weekly packs: colourway + the three items each contains (crown, cape, visor)
  GR.PACKS = [
    { id: 1, name: "Sunrise Gold", col: "#F2B632", dark: "#B9801A" },
    { id: 2, name: "Lagoon Aqua", col: "#27C3C3", dark: "#12807F" },
    { id: 3, name: "Ruby Dash", col: "#E5484D", dark: "#A3262A" },
    { id: 4, name: "Violet Storm", col: "#8B5CF6", dark: "#5B35B8" }
  ];
  function packOf(v) { var m = /^gr\w+?(\d)$/.exec(v || ""); return m ? GR.PACKS[+m[1] - 1] : null; }

  GR.avatar = function (T, cfg, colors) {
    var mats = {}, geos = [], texs = [], root = new T.Group(), unit = new T.BoxGeometry(1, 1, 1); geos.push(unit);
    function mat(c) { return mats[c] || (mats[c] = new T.MeshLambertMaterial({ color: c })); }
    function box(w, h, d, c, x, y, z, parent, shadow) {
      var m = new T.Mesh(unit, typeof c === "string" ? mat(c) : c); m.scale.set(w, h, d); m.position.set(x, y, z);
      if (shadow !== false) m.castShadow = true; (parent || root).add(m); return m;
    }
    function shade(hex, a) {
      var n = parseInt(String(hex).slice(1), 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
      var f = function (v) { return Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a))); };
      return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
    }
    var C = colors, skin = C.skin, top = C.top, bottom = C.bottom, hair = C.hair;
    var long = cfg.cl === "dish" || cfg.cl === "bisht" || cfg.cl === "bishtg";
    var shortSleeve = cfg.cl === "tee" || cfg.cl === "jersey";
    var body = new T.Group(); body.position.y = 0.6; root.add(body);          // pivot at the hips
    // ---- legs (pivot at hip so they swing)
    function leg(s) {
      var g = new T.Group(); g.position.set(s * 0.15, 0.6, 0); root.add(g);
      var shorts = cfg.bottom === "shorts" && !long;
      box(0.26, 0.6, 0.3, long ? top : bottom, 0, -0.3, 0, g);
      if (shorts) box(0.27, 0.3, 0.31, skin, 0, -0.45, 0, g);
      box(0.3, 0.14, 0.4, C.shoes, 0, -0.55, 0.05, g);
      return g;
    }
    var legL = leg(-1), legR = leg(1);
    // ---- torso
    var torso = box(0.66, 0.62, 0.4, top, 0, 0.31, 0, body);
    if (cfg.cl === "bisht" || cfg.cl === "bishtg") {
      box(0.7, 0.66, 0.44, "#3A2A1A", 0, 0.31, 0, body); box(0.12, 0.66, 0.46, cfg.cl === "bishtg" ? "#F2B632" : "#8A6A2F", 0, 0.31, 0, body);
    }
    if (cfg.cl === "jersey") box(0.5, 0.16, 0.42, shade(top, .6), 0, 0.31, 0, body);
    if (cfg.cl === "hoodie") { box(0.5, 0.2, 0.18, shade(top, -.18), 0, 0.55, -0.26, body); box(0.14, 0.4, 0.04, shade(top, .5), 0, 0.2, 0.21, body); }
    if (long) { var robe = box(0.7, 0.72, 0.46, top, 0, -0.05, 0, body); robe.castShadow = true; }
    // ---- arms (pivot at the shoulder)
    function arm(s) {
      var g = new T.Group(); g.position.set(s * 0.43, 0.56, 0); body.add(g);
      var sleeveLen = shortSleeve ? 0.28 : 0.6;
      box(0.2, 0.6, 0.22, skin, 0, -0.28, 0, g);
      box(0.22, sleeveLen, 0.24, top, 0, -sleeveLen / 2 + 0.02, 0, g);
      return g;
    }
    var armL = arm(-1), armR = arm(1);
    // ---- head with a drawn face that changes mood
    var fc = document.createElement("canvas"); fc.width = fc.height = 64; var fx = fc.getContext("2d");
    var ftex = new T.CanvasTexture(fc); ftex.colorSpace = T.SRGBColorSpace; ftex.magFilter = T.NearestFilter; texs.push(ftex);
    var faceMat = new T.MeshLambertMaterial({ map: ftex });
    var headMats = [mat(skin), mat(skin), mat(skin), mat(skin), faceMat, mat(skin)];
    var head = new T.Group(); head.position.y = 0.62; body.add(head);
    var hm = new T.Mesh(unit, headMats); hm.scale.set(0.56, 0.54, 0.54); hm.position.y = 0.27; hm.castShadow = true; head.add(hm);
    var curMood = "";
    function drawFace(mood) {
      if (mood === curMood) return; curMood = mood;
      fx.fillStyle = skin; fx.fillRect(0, 0, 64, 64);
      var ink = "#1B1630", g = fx;
      g.fillStyle = ink; g.strokeStyle = ink; g.lineWidth = 5; g.lineCap = "round";
      var ex = [18, 46], ey = 26;
      if (mood === "happy") { ex.forEach(function (x) { g.beginPath(); g.arc(x, ey + 4, 7, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }); g.beginPath(); g.fillStyle = "#7A1F2B"; g.moveTo(16, 42); g.quadraticCurveTo(32, 62, 48, 42); g.closePath(); g.fill(); g.fillStyle = "#fff"; g.fillRect(20, 42, 24, 4); }
      else if (mood === "sad") { ex.forEach(function (x) { g.fillRect(x - 5, ey - 3, 10, 12); }); g.beginPath(); g.moveTo(12, 18); g.lineTo(26, 22); g.moveTo(52, 18); g.lineTo(38, 22); g.stroke(); g.beginPath(); g.moveTo(22, 52); g.quadraticCurveTo(32, 42, 42, 52); g.stroke(); }
      else if (mood === "dizzy") { ex.forEach(function (x) { g.beginPath(); g.moveTo(x - 6, ey - 6); g.lineTo(x + 6, ey + 6); g.moveTo(x + 6, ey - 6); g.lineTo(x - 6, ey + 6); g.stroke(); }); g.beginPath(); g.moveTo(20, 48); for (var i = 0; i < 5; i++) g.lineTo(20 + i * 6, 48 + (i % 2 ? -4 : 4)); g.stroke(); }
      else if (mood === "wow") { ex.forEach(function (x) { g.fillRect(x - 5, ey - 6, 10, 14); }); g.beginPath(); g.ellipse(32, 49, 7, 9, 0, 0, 7); g.fill(); }
      else if (mood === "blink") { ex.forEach(function (x) { g.fillRect(x - 6, ey + 2, 12, 4); }); g.beginPath(); g.moveTo(22, 46); g.quadraticCurveTo(32, 54, 42, 46); g.stroke(); }
      else { ex.forEach(function (x) { g.fillRect(x - 5, ey - 5, 10, 13); g.fillStyle = "#fff"; g.fillRect(x - 3, ey - 4, 4, 4); g.fillStyle = ink; }); g.beginPath(); g.moveTo(22, 46); g.quadraticCurveTo(32, 54, 42, 46); g.stroke(); }
      if (cfg.beard && cfg.beard !== "none") {
        var bc = hair; g.fillStyle = bc;
        if (cfg.beard === "stubble") { g.globalAlpha = .35; g.fillRect(8, 40, 48, 24); g.globalAlpha = 1; }
        else if (cfg.beard === "moustache") { g.fillRect(16, 38, 32, 6); }
        else if (cfg.beard === "goatee") { g.fillRect(16, 38, 32, 5); g.fillRect(24, 54, 16, 10); }
        else { g.fillRect(4, 36, 56, 28); g.fillStyle = skin; if (mood === "happy") { g.fillStyle = "#7A1F2B"; g.fillRect(20, 44, 24, 8); } else { g.fillRect(22, 46, 20, 4); g.fillStyle = ink; g.fillRect(22, 46, 20, 3); } }
      }
      ftex.needsUpdate = true;
    }
    drawFace("idle");
    // ---- hair
    var hs = cfg.hair, hatOn = cfg.hat && cfg.hat !== "none";
    function hairBox(w, h, d, x, y, z) { return box(w, h, d, hair, x, y, z, head); }
    if (hs && hs !== "none" && !(hatOn && /^(kumma|massar|crown|beanie|grcrown)/.test(cfg.hat))) {
      if (hs === "buzz") hairBox(0.58, 0.08, 0.56, 0, 0.56, 0);
      else if (hs === "afro") hairBox(0.9, 0.5, 0.9, 0, 0.62, -0.02);
      else {
        hairBox(0.58, 0.16, 0.58, 0, 0.58, 0); hairBox(0.58, 0.36, 0.12, 0, 0.42, -0.26);
        if (hs === "side") { hairBox(0.2, 0.12, 0.58, -0.2, 0.68, 0); hairBox(0.06, 0.2, 0.5, -0.3, 0.45, 0); }
        if (hs === "fringe") hairBox(0.58, 0.14, 0.1, 0, 0.5, 0.27);
        if (hs === "wavy") { hairBox(0.08, 0.3, 0.5, -0.32, 0.4, 0); hairBox(0.08, 0.3, 0.5, 0.32, 0.4, 0); }
        if (hs === "curly") { [[-0.22, .72], [0.22, .72], [0, .78], [-0.3, .5], [0.3, .5]].forEach(function (p) { hairBox(0.22, 0.22, 0.22, p[0], p[1], 0); }); }
        if (hs === "spiky") { [-0.2, 0, 0.2].forEach(function (x) { hairBox(0.12, 0.26, 0.12, x, 0.76, 0.02); }); }
      }
    }
    // ---- hats
    var h = cfg.hat || "none", hc = C.hat, pk = packOf(h);
    if (pk && /^grcrown/.test(h)) {
      box(0.6, 0.14, 0.6, pk.col, 0, 0.6, 0, head); [-0.22, 0, 0.22].forEach(function (x) { box(0.12, 0.2, 0.12, pk.col, x, 0.76, 0.2, head); box(0.12, 0.2, 0.12, pk.col, x, 0.76, -0.2, head); });
      box(0.1, 0.1, 0.02, "#FFFFFF", 0, 0.6, 0.31, head);
    } else if (/^kumma/.test(h)) {
      var kb = h === "kummag" ? "#F2B632" : h === "kumma3" ? "#1E2A4A" : "#FFFFFF";
      box(0.6, 0.2, 0.6, kb, 0, 0.6, 0, head); box(0.62, 0.05, 0.62, { kumma1: "#C8323A", kumma2: "#1F5FA8", kumma3: "#F2C230", kummag: "#B9801A" }[h] || "#C8323A", 0, 0.52, 0, head);
    } else if (/^massar/.test(h)) {
      var mc = { massar1: "#2F6FDE", massar2: "#D13A3A", massar3: "#EADFC8" }[h] || "#2F6FDE";
      box(0.68, 0.28, 0.68, mc, 0, 0.64, 0, head); box(0.7, 0.05, 0.7, shade(mc, .35), 0, 0.58, 0, head); box(0.7, 0.05, 0.7, shade(mc, -.25), 0, 0.7, 0, head); box(0.2, 0.3, 0.1, mc, 0.3, 0.45, -0.28, head);
    } else if (h === "cap") { box(0.6, 0.18, 0.6, hc, 0, 0.6, 0, head); box(0.6, 0.05, 0.3, shade(hc, -.2), 0, 0.5, 0.42, head); }
    else if (h === "beanie") { box(0.62, 0.3, 0.62, hc, 0, 0.64, 0, head); box(0.1, 0.1, 0.1, shade(hc, .5), 0, 0.84, 0, head); }
    else if (h === "crown") { box(0.6, 0.14, 0.6, "#F2B632", 0, 0.6, 0, head); [-0.2, 0, 0.2].forEach(function (x) { box(0.12, 0.2, 0.12, "#F2B632", x, 0.76, 0.2, head); }); }
    else if (h !== "none" && h !== "") { box(0.6, 0.2, 0.6, hc, 0, 0.6, 0, head); }
    // ---- glasses
    var gl = cfg.gl || "none", gp = packOf(gl);
    if (gp && /^grvisor/.test(gl)) { box(0.62, 0.16, 0.08, gp.col, 0, 0.32, 0.31, head); box(0.6, 0.12, 0.02, "#0E1B2E", 0, 0.32, 0.36, head); }
    else if (gl !== "none") { var gc = gl === "sun" ? "#0E1B2E" : "#2A2540"; box(0.18, 0.14, 0.04, gc, -0.15, 0.32, 0.29, head); box(0.18, 0.14, 0.04, gc, 0.15, 0.32, 0.29, head); box(0.12, 0.04, 0.04, gc, 0, 0.34, 0.29, head); }
    // ---- extras
    var cape = null, ex = cfg.extra || "none", xp = packOf(ex);
    if (xp && /^grcape/.test(ex)) {
      cape = new T.Group(); cape.position.set(0, 0.58, -0.22); body.add(cape);
      var cm = box(0.72, 1.0, 0.06, xp.col, 0, -0.5, -0.03, cape); box(0.72, 0.1, 0.07, "#FFFFFF", 0, -0.96, -0.03, cape); box(0.3, 0.1, 0.08, xp.dark, 0, -0.04, 0, cape);
    } else if (ex === "cape") { cape = new T.Group(); cape.position.set(0, 0.58, -0.22); body.add(cape); box(0.68, 0.9, 0.05, "#D8343F", 0, -0.45, -0.03, cape); }
    else if (ex === "backpack") box(0.5, 0.5, 0.2, "#2B41C4", 0, 0.3, -0.3, body);
    else if (ex === "headphones") { box(0.62, 0.08, 0.1, "#7E5BEF", 0, 0.55, 0, head); box(0.08, 0.22, 0.26, "#7E5BEF", -0.3, 0.3, 0, head); box(0.08, 0.22, 0.26, "#7E5BEF", 0.3, 0.3, 0, head); }
    else if (ex === "medal") { box(0.1, 0.36, 0.02, "#D8343F", -0.1, 0.38, 0.21, body); box(0.14, 0.14, 0.03, "#F2B632", -0.1, 0.18, 0.22, body); }
    else if (ex === "watch") box(0.24, 0.08, 0.26, "#1B1630", 0.43, -0.4, 0, body, false);
    // dizzy stars
    var stars = new T.Group(); stars.position.y = 0.78; stars.visible = false; head.add(stars);
    for (var si = 0; si < 3; si++) { var sm = box(0.1, 0.1, 0.1, "#FFD93B", 0, 0, 0, stars, false); sm.userData.a = si * 2.094; }
    root.add(new T.Object3D());

    var A = { ph: 0, run: 0, lean: 0, roll: 0, squash: 0, sq: 0, air: 0, blink: 3, t: 0, mood: "idle", moodT: 0, capeLag: 0 };
    function damp(a, b, k, dt) { return a + (b - a) * (1 - Math.exp(-k * dt)); }
    var api = {
      root: root, head: head, body: body,
      mood: function (m, secs) { A.mood = m; A.moodT = secs || 0; },
      land: function (v) { A.sq = Math.min(1, Math.max(A.sq, v)); },
      // st: { speed 0..1, vy, ground, pose: "run"|"stun"|"celebrate"|"fall", turn (-1..1) }
      update: function (st, dt) {
        A.t += dt; A.moodT > 0 && (A.moodT -= dt, A.moodT <= 0 && (A.mood = "idle"));
        A.blink -= dt; var face = A.mood; if (face === "idle" && A.blink < 0) { face = "blink"; if (A.blink < -0.12) A.blink = 2 + Math.random() * 3; }
        if (face === "idle" && !st.ground && st.vy < -4) face = "wow";
        drawFace(face);
        A.run = damp(A.run, st.pose === "run" && st.ground ? st.speed : 0, 14, dt);
        A.ph += dt * (4 + A.run * 9) * (A.run > 0.03 ? 1 : 0);
        var sw = Math.sin(A.ph) * 0.95 * A.run, bob = Math.abs(Math.cos(A.ph)) * 0.07 * A.run;
        var la = 0, ra = 0, ll = sw, rl = -sw, az = 0.06, bx = 0, by = 0, hz = 0, hx = 0;
        if (st.pose === "celebrate") {
          la = -2.9 + Math.sin(A.t * 14) * 0.35; ra = -2.9 - Math.sin(A.t * 14) * 0.35; az = 0.35; ll = Math.sin(A.t * 10) * 0.5; rl = -ll; by = Math.abs(Math.sin(A.t * 7)) * 0.25; root.rotation.y += dt * 0; hx = -0.15;
        } else if (st.pose === "stun") {
          la = 0.5; ra = 0.5; az = 0.5; bx = -0.28 + Math.sin(A.t * 8) * 0.05; hz = Math.sin(A.t * 9) * 0.25; ll = 0.3; rl = -0.2; stars.visible = true;
        } else if (!st.ground) {
          var up = st.vy > 0;
          la = ra = up ? -2.6 : -2.3 + Math.sin(A.t * 22) * 0.35; az = up ? 0.45 : 0.9;
          if (!up) { ra = -2.3 - Math.sin(A.t * 22) * 0.35; }
          ll = up ? 0.5 : -0.2; rl = up ? -0.9 : 0.5; bx = up ? 0.18 : -0.05;
        } else { la = -sw * 0.9; ra = sw * 0.9; if (A.run < 0.05) { la = Math.sin(A.t * 1.8) * 0.04; ra = -la; } }
        if (st.pose !== "stun") stars.visible = false;
        legL.rotation.x = damp(legL.rotation.x, ll, 30, dt); legR.rotation.x = damp(legR.rotation.x, rl, 30, dt);
        armL.rotation.x = damp(armL.rotation.x, la, 26, dt); armR.rotation.x = damp(armR.rotation.x, ra, 26, dt);
        armL.rotation.z = damp(armL.rotation.z, -az, 20, dt); armR.rotation.z = damp(armR.rotation.z, az, 20, dt);
        A.lean = damp(A.lean, st.ground ? A.run * 0.22 : 0.1 + (st.vy < 0 ? 0.1 : 0), 10, dt);
        body.rotation.x = damp(body.rotation.x, A.lean + bx, 14, dt);
        A.roll = damp(A.roll, -(st.turn || 0) * 0.22, 8, dt); body.rotation.z = A.roll + (st.pose === "stun" ? Math.sin(A.t * 7) * 0.12 : 0);
        head.rotation.z = damp(head.rotation.z, hz, 16, dt); head.rotation.x = damp(head.rotation.x, hx, 12, dt);
        // landing squash and stretch
        A.sq = damp(A.sq, 0, 9, dt);
        var stretch = st.ground ? 0 : Math.min(0.12, Math.abs(st.vy) * 0.008);
        body.scale.set(1 + A.sq * 0.18 - stretch * 0.5, 1 - A.sq * 0.22 + stretch, 1 + A.sq * 0.18 - stretch * 0.5);
        body.position.y = 0.6 + bob + by - A.sq * 0.08;
        if (cape) { A.capeLag = damp(A.capeLag, Math.min(1.3, A.run * 0.8 + (st.ground ? 0 : 0.55)), 6, dt); cape.rotation.x = 0.12 + A.capeLag * 0.9 + Math.sin(A.t * 9) * 0.06 * (0.3 + A.run); }
        if (stars.visible) stars.children.forEach(function (s) { var a = s.userData.a + A.t * 5; s.position.set(Math.cos(a) * 0.3, Math.sin(A.t * 6 + a) * 0.03, Math.sin(a) * 0.3); s.rotation.y = a; });
      },
      dispose: function () { geos.forEach(function (g) { g.dispose(); }); texs.forEach(function (t) { t.dispose(); }); Object.keys(mats).forEach(function (k) { mats[k].dispose(); }); faceMat.dispose(); }
    };
    return api;
  };
})();
