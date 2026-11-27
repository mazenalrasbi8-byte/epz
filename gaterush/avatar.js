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
    // whole-body pitch for the dive: tilt pivots at the hips, rig sits inside it unchanged (identity at rest)
    var tilt = new T.Group(); tilt.position.y = 0.6; root.add(tilt); var rig = new T.Group(); rig.position.y = -0.6; tilt.add(rig);
    var body = new T.Group(); body.position.y = 0.6; rig.add(body);          // pivot at the hips
    // ---- legs (pivot at hip so they swing)
    function leg(s) {
      var g = new T.Group(); g.position.set(s * 0.15, 0.6, 0); rig.add(g);
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
    var fc = document.createElement("canvas"); fc.width = fc.height = 128; var fx = fc.getContext("2d"); fx.scale(2, 2);
    var ftex = new T.CanvasTexture(fc); ftex.colorSpace = T.SRGBColorSpace; ftex.magFilter = T.NearestFilter; ftex.minFilter = T.LinearFilter; ftex.generateMipmaps = false; texs.push(ftex);
    var faceMat = new T.MeshLambertMaterial({ map: ftex });
    var headMats = [mat(skin), mat(skin), mat(skin), mat(skin), faceMat, mat(skin)];
    var SZ = cfg.sz || {}, BX = SZ.b || 1, SH = { oval: [0.52, 0.6, 0.54], square: [0.6, 0.54, 0.56] }[cfg.face] || [0.56, 0.54, 0.54];
    var head = new T.Group(); head.position.y = 0.62; body.add(head); head.scale.setScalar(SZ.hd || 1);
    var hm = new T.Mesh(unit, headMats); hm.scale.set(SH[0], SH[1], SH[2]); hm.position.y = 0.27; hm.castShadow = true; head.add(hm);
    var curFace = "", EYEC = C.eyes || "#3B2A20";
    // the face is drawn on a small canvas: eyes (with the chosen eye style and colour), brows, mouth, beard.
    // mood: idle | happy | sad | dizzy | wow | think | blink. lx/ly move the pupils (looking around), lid closes the eyes.
    function drawFace(mood, lx, ly, lid) {
      var qx = Math.round((lx || 0) * 2), qy = Math.round((ly || 0) * 2), closed = lid > 0.55 || mood === "blink";
      var key = mood + qx + "," + qy + (closed ? "c" : ""); if (key === curFace) return; curFace = key;
      var g = fx, ink = "#1B1630"; g.fillStyle = skin; g.fillRect(0, 0, 64, 64);
      g.fillStyle = ink; g.strokeStyle = ink; g.lineWidth = 4.5; g.lineCap = "round"; g.lineJoin = "round";
      var es = SZ.es || 1, gap = 14 + (SZ.ed || 0) * 0.8, ex = [32 - gap, 32 + gap], ey = 27, px = qx * 1.6, py = qy * 1.4, style = cfg.eyes || "big";
      var arc = function (x, y, up) { g.beginPath(); g.arc(x, y + (up ? 4 : -2), 6 * es, up ? Math.PI * 1.1 : Math.PI * 0.15, up ? Math.PI * 1.9 : Math.PI * 0.85); g.stroke(); };
      // eyes
      if (closed) ex.forEach(function (x) { g.fillRect(x - 6 * es, ey + 1, 12 * es, 3.5); });
      else if (mood === "happy") ex.forEach(function (x) { arc(x, ey, true); });
      else if (mood === "dizzy") ex.forEach(function (x) { g.beginPath(); g.moveTo(x - 5, ey - 5); g.lineTo(x + 5, ey + 5); g.moveTo(x + 5, ey - 5); g.lineTo(x - 5, ey + 5); g.stroke(); });
      else ex.forEach(function (x, i) {
        var w = (style === "dots" ? 7 : 11) * es, h = (style === "dots" ? 7 : mood === "wow" ? 15 : 13) * es;
        if (style === "happy" && mood === "idle") { arc(x, ey, true); return; }
        if (style === "wink" && mood === "idle" && i === 1) { arc(x, ey, true); return; }
        g.fillStyle = "#FFFFFF"; g.fillRect(x - w / 2 - 1, ey - h / 2 - 1, w + 2, h + 2);
        g.fillStyle = style === "dots" ? ink : EYEC; var pw = style === "dots" ? w : w * 0.72, ph = style === "dots" ? h : h * 0.78;
        g.fillRect(x - pw / 2 + px, ey - ph / 2 + py, pw, ph); g.fillStyle = ink; g.fillRect(x - pw / 4 + px, ey - ph / 4 + py, pw / 2, ph / 2);
        g.fillStyle = "#FFFFFF"; g.fillRect(x - pw / 2 + px + 1, ey - ph / 2 + py + 1, 3, 3);
        if (style === "cool" || mood === "think") { g.fillStyle = skin; g.fillRect(x - w / 2 - 1, ey - h / 2 - 1, w + 2, h * 0.45); g.fillStyle = ink; g.fillRect(x - w / 2 - 1, ey - h / 2 - 1 + h * 0.45, w + 2, 2); }
        if (mood === "sad") { g.fillStyle = skin; g.beginPath(); g.moveTo(x - w, ey - h); g.lineTo(i ? x - w : x + w, ey - h); g.lineTo(i ? x - w : x + w, ey - h * 0.1); g.closePath(); g.fill(); }
        g.fillStyle = ink;
      });
      // brows (style, height, mood)
      var by = 13 - (SZ.by || 0) * 1.2 - (mood === "wow" ? 4 : mood === "happy" ? 1.5 : 0), bw = cfg.brows === "thick" ? 4.5 : 3;
      ex.forEach(function (x, i) {
        var s = i ? -1 : 1, tilt = mood === "sad" ? -4 * s : mood === "think" && i ? -3 : 0;
        g.fillStyle = hair;
        if (cfg.brows === "straight" || cfg.brows === "thick") { g.save(); g.translate(x, by); g.rotate(tilt * 0.06); g.fillRect(-8, -bw / 2, 16, bw); g.restore(); }
        else { g.strokeStyle = hair; g.lineWidth = bw; g.beginPath(); g.moveTo(x - 7, by + 2 + tilt * 0.4 * s); g.quadraticCurveTo(x, by - 3, x + 7, by + 2 - tilt * 0.4 * s); g.stroke(); }
      });
      g.strokeStyle = ink; g.fillStyle = ink; g.lineWidth = 4.5;
      // mouth
      var mw = 10 * (SZ.mw || 1), my = 48, m = mood === "happy" ? "grin" : mood === "sad" ? "sad" : mood === "wow" ? "o" : mood === "dizzy" ? "wave" : mood === "think" ? "flat" : cfg.mouth || "smile";
      if (m === "grin" || m === "teeth" || m === "tongue" && mood === "happy") { g.fillStyle = "#7A1F2B"; g.beginPath(); g.moveTo(32 - mw - 2, my - 4); g.lineTo(32 + mw + 2, my - 4); g.quadraticCurveTo(32 + mw, my + 10, 32, my + 10); g.quadraticCurveTo(32 - mw, my + 10, 32 - mw - 2, my - 4); g.fill(); g.fillStyle = "#FFFFFF"; g.fillRect(32 - mw, my - 4, mw * 2, m === "teeth" ? 5 : 3.5); }
      else if (m === "sad") { g.beginPath(); g.moveTo(32 - mw, my + 4); g.quadraticCurveTo(32, my - 5, 32 + mw, my + 4); g.stroke(); }
      else if (m === "o") { g.fillStyle = "#7A1F2B"; g.beginPath(); g.ellipse(32, my + 1, 5, 7, 0, 0, 7); g.fill(); }
      else if (m === "flat") { g.fillRect(32 - mw * 0.7, my, mw * 1.4, 3.5); }
      else if (m === "wave") { g.beginPath(); g.moveTo(32 - mw, my); for (var k = 1; k <= 4; k++) g.lineTo(32 - mw + k * mw / 2, my + (k % 2 ? -3 : 3)); g.stroke(); }
      else { g.beginPath(); g.moveTo(32 - mw, my - 2); g.quadraticCurveTo(32, my + 7, 32 + mw, my - 2); g.stroke(); if (m === "tongue") { g.fillStyle = "#FF7A8A"; g.fillRect(29, my + 2, 7, 6); } }
      // beard
      if (cfg.beard && cfg.beard !== "none") {
        g.fillStyle = hair;
        if (cfg.beard === "stubble") { g.globalAlpha = .3; g.fillRect(8, 40, 48, 24); g.globalAlpha = 1; }
        else if (cfg.beard === "moustache") g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 5);
        else if (cfg.beard === "goatee") { g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 4); g.fillRect(25, 58, 14, 6); }
        else { g.fillRect(4, 56, 56, 8); g.fillRect(4, 40, 7, 20); g.fillRect(53, 40, 7, 20); g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 4); }
      }
      ftex.needsUpdate = true;
    }
    drawFace("idle", 0, 0, 0);
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
    root.scale.y = SZ.h || 1;   // height slider

    var A = { tilt: 0, tiltY: 0.6, ph: 0, run: 0, lean: 0, roll: 0, squash: 0, sq: 0, air: 0, blink: 3, t: 0, mood: "idle", moodT: 0, capeLag: 0 };
    function damp(a, b, k, dt) { return a + (b - a) * (1 - Math.exp(-k * dt)); }
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }
    var api = {
      root: root, head: head, body: body,
      mood: function (m, secs) { A.mood = m; A.moodT = secs || 0; },
      land: function (v) { A.sq = Math.min(1, Math.max(A.sq, v)); },
      // st: { speed 0..1, vy, ground, pose: "run"|"stun"|"celebrate"|"fall", turn (-1..1) }
      update: function (st, dt) {
        A.t += dt; A.moodT > 0 && (A.moodT -= dt, A.moodT <= 0 && (A.mood = "idle"));
        A.blink -= dt; var face = A.mood; if (face === "idle" && A.blink < 0) { face = "blink"; if (A.blink < -0.12) A.blink = 2 + Math.random() * 3; }
        if (face === "idle" && !st.ground && st.vy < -4) face = "wow";
        drawFace(face === "blink" ? "idle" : face, 0, 0, face === "blink" ? 1 : 0);
        A.run = damp(A.run, st.pose === "run" && st.ground ? st.speed : 0, 14, dt);
        A.ph += dt * (4 + A.run * 9) * (A.run > 0.03 ? 1 : 0);
        var sw = Math.sin(A.ph) * 0.95 * A.run, bob = Math.abs(Math.cos(A.ph)) * 0.07 * A.run;
        var la = 0, ra = 0, ll = sw, rl = -sw, az = 0.06, bx = 0, by = 0, hz = 0, hx = 0, tl = 0, ty = 0.6, tk = 14, flat = false;
        if (st.pose === "celebrate") {
          la = -2.9 + Math.sin(A.t * 14) * 0.35; ra = -2.9 - Math.sin(A.t * 14) * 0.35; az = 0.35; ll = Math.sin(A.t * 10) * 0.5; rl = -ll; by = Math.abs(Math.sin(A.t * 7)) * 0.25; root.rotation.y += dt * 0; hx = -0.15;
        } else if (st.pose === "stun") {
          la = 0.5; ra = 0.5; az = 0.5; bx = -0.28 + Math.sin(A.t * 8) * 0.05; hz = Math.sin(A.t * 9) * 0.25; ll = 0.3; rl = -0.2; stars.visible = true;
        } else if (st.pose === "dive") {
          // superman: body stretched out flat, arms reaching forward, legs straight back, eyes on the landing
          flat = true; tl = 1.32 + clamp(-st.vy * 0.02, -0.12, 0.12); ty = 0.78; tk = 20;
          la = -2.95 + Math.sin(A.t * 18) * 0.05; ra = -2.95 - Math.sin(A.t * 18) * 0.05; az = 0.16; ll = 0.12; rl = 0.22; hx = -0.55;
        } else if (st.pose === "stagger") {
          // bumped back by a locked door: lean back, arms windmill, quick backpedal steps, then upright
          var e = smooth((st.stg || 0) / 0.7), w = A.t * 19;
          tl = (-0.34 + Math.sin(w * 0.7) * 0.08) * e; ty = 0.6; tk = 16; flat = true;
          la = (-1.7 + Math.sin(w) * 1.3) * e; ra = (-1.7 + Math.sin(w + 2.2) * 1.3) * e; az = 0.35 + 0.55 * e;
          ll = Math.sin(w * 1.1) * 0.6 * e; rl = -ll; hx = -0.3 * e; hz = Math.sin(w * 0.6) * 0.14 * e;
        } else if (st.pose === "recover") {
          // belly landing, then push up with the arms and pop back onto the feet
          var u = clamp(st.rec || 0, 0, 1), down = smooth(u / 0.55);
          flat = true; tl = 1.48 * down; ty = 0.6 - 0.3 * down; tk = 24;
          la = ra = u > 0.55 ? -2.6 : -0.35 - 1.2 * down; az = u > 0.55 ? 0.2 : 0.45; ll = rl = 0.15 * down; hx = -0.45 * down;
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
        body.rotation.x = damp(body.rotation.x, flat ? 0 : A.lean + bx, 14, dt);
        A.tilt = damp(A.tilt, tl, tk, dt); A.tiltY = damp(A.tiltY, ty, tk, dt); tilt.rotation.x = A.tilt; tilt.position.y = A.tiltY;
        A.roll = damp(A.roll, -(st.turn || 0) * 0.22, 8, dt); body.rotation.z = A.roll + (st.pose === "stun" ? Math.sin(A.t * 7) * 0.12 : st.pose === "stagger" ? Math.sin(A.t * 11) * 0.15 * smooth((st.stg || 0) / 0.7) : 0);
        head.rotation.z = damp(head.rotation.z, hz, 16, dt); head.rotation.x = damp(head.rotation.x, hx, 12, dt);
        // landing squash and stretch
        A.sq = damp(A.sq, 0, 9, dt);
        var stretch = st.ground ? 0 : Math.min(0.12, Math.abs(st.vy) * 0.008);
        body.scale.set((1 + A.sq * 0.18 - stretch * 0.5) * BX, 1 - A.sq * 0.22 + stretch, (1 + A.sq * 0.18 - stretch * 0.5) * BX);
        body.position.y = 0.6 + bob + by - A.sq * 0.08;
        if (cape) { A.capeLag = damp(A.capeLag, Math.min(1.3, A.run * 0.8 + (st.ground ? 0 : 0.55)), 6, dt); cape.rotation.x = 0.12 + A.capeLag * 0.9 + Math.sin(A.t * 9) * 0.06 * (0.3 + A.run); }
        if (stars.visible) stars.children.forEach(function (s) { var a = s.userData.a + A.t * 5; s.position.set(Math.cos(a) * 0.3, Math.sin(A.t * 6 + a) * 0.03, Math.sin(a) * 0.3); s.rotation.y = a; });
      },
      // the site-wide character (portraits, home screen, avatar maker). st: { mood, lid 0..1, lx, ly (look -1..1), turn, tilt, hop, r (seconds since the mood started), t }
      portrait: function (st, dt) {
        var md = st.mood || "idle", r = st.r || 9, t = st.t || 0;
        var face = md === "happy" || md === "celebrate" || md === "proud" || md === "excited" ? "happy" : md === "sad" ? "sad" : md === "surprised" ? "wow" : md === "think" ? "think" : "idle";
        drawFace(face, st.lx || 0, st.ly || 0, st.lid || 0); stars.visible = false;
        var pose = cfg.pose || "relaxed", la = 0.05, ra = 0.05, azl = 0.08, azr = 0.08, nod = 0, shake = 0, up = 0;
        if (pose === "hips") { la = ra = 0.3; azl = azr = 0.75; }
        else if (pose === "crossed") { la = ra = -1.25; azl = azr = -0.5; }
        else if (pose === "think") { ra = -2.3; azr = -0.35; }
        else if (pose === "wave") { ra = -2.75; azr = 0.25 + Math.sin(t * 8) * 0.3; }
        else if (pose === "ready") { la = ra = -0.7; azl = azr = 0.3; }
        else { la = Math.sin(t * 1.8) * 0.04; ra = -la; }
        if (md === "celebrate") { la = -2.85 + Math.sin(t * 12) * 0.3; ra = -2.85 - Math.sin(t * 12) * 0.3; azl = azr = 0.35; up = Math.abs(Math.sin(r * 8)) * 0.12; }
        else if (md === "happy" || md === "proud") { var k = Math.exp(-r * 1.5); ra = ra + (-2.6 - ra) * k; azr = azr + (0.2 - azr) * k; nod = Math.sin(r * 14) * 0.18 * Math.exp(-r * 2.2); up = Math.abs(Math.sin(r * 9)) * 0.1 * Math.exp(-r * 1.8); }
        else if (md === "excited") up = Math.abs(Math.sin(r * 12)) * 0.06;
        else if (md === "sad") { la = ra = 0.12; azl = azr = 0.02; shake = Math.sin(r * 16) * 0.32 * Math.exp(-r * 2.5); nod = 0.16; }
        else if (md === "surprised") { nod = -0.16 * Math.exp(-r * 3); up = 0.08 * Math.exp(-r * 4); la = ra = -0.5 * Math.exp(-r * 2); azl = azr = 0.5; }
        armL.rotation.x = damp(armL.rotation.x, la, 14, dt); armR.rotation.x = damp(armR.rotation.x, ra, 14, dt);
        armL.rotation.z = damp(armL.rotation.z, -azl, 14, dt); armR.rotation.z = damp(armR.rotation.z, azr, 14, dt);
        legL.rotation.x = damp(legL.rotation.x, 0, 10, dt); legR.rotation.x = damp(legR.rotation.x, 0, 10, dt);
        head.rotation.set((st.ly || 0) * 0.18 + nod, (st.turn || 0) * 0.5 + shake, -(st.tilt || 0) * 0.02);
        body.rotation.set(0, (st.turn || 0) * 0.12 + shake * 0.25, 0);
        body.position.y = 0.6 + up - (st.hop || 0) * 0.004; body.scale.set(BX, 1 + Math.sin(t * 1.7) * 0.008, BX);
        if (cape) cape.rotation.x = 0.1 + Math.sin(t * 2) * 0.04;
      },
      dispose: function () { geos.forEach(function (g) { g.dispose(); }); texs.forEach(function (t) { t.dispose(); }); Object.keys(mats).forEach(function (k) { mats[k].dispose(); }); faceMat.dispose(); }
    };
    return api;
  };
})();
