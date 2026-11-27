/* EPZ bosses — the six bosses as blocky 3D models in the Gate Rush style (boxes only, no files).
   GR.bossModel(T, id) returns the same kind of object the Boss Rush arena already drives:
   { root, body, center, eyes, extra, mats, phase, t, hitT, tauntT, dodgeT, dodgeDir, shield, shieldMesh, update(dt, t) }.
   Menus show still pictures of these models (drawn once by the shared avatar renderer); battles animate them live. */
(function () {
  var GR = (window.GR = window.GR || {});
  var DEF = {
    blob: { color: "#34C46E", dark: "#1F8A4A", accent: "#B8F5CF" },
    troll: { color: "#8B5CF6", dark: "#5B34C4", accent: "#F3E8C8" },
    kraken: { color: "#14B8A6", dark: "#0F766E", accent: "#5EF2E0" },
    vampire: { color: "#3B2A55", dark: "#1E1530", accent: "#E5484D" },
    golem: { color: "#94A3B8", dark: "#5B6678", accent: "#FF8A3D" },
    king: { color: "#4338CA", dark: "#2A2380", accent: "#F2B632" }
  };
  GR.BOSS_IDS = Object.keys(DEF);

  GR.bossModel = function (T, id, opt) {
    opt = opt || {};
    var d = DEF[id] || DEF.blob, root = new T.Group(), body = new T.Group(); root.add(body);
    var unit = new T.BoxGeometry(1, 1, 1), mats = [], cache = {}, geos = [unit];
    function mat(c, emis) { var k = c + (emis || ""); if (cache[k]) return cache[k]; var m = new T.MeshLambertMaterial({ color: c, emissive: emis || "#000000" }); cache[k] = m; mats.push(m); return m; }
    function box(w, h, dd, c, x, y, z, parent, emis) { var m = new T.Mesh(unit, mat(c, emis)); m.scale.set(w, h, dd); m.position.set(x, y, z); m.castShadow = !opt.noShadow; (parent || body).add(m); return m; }
    var b = { id: id, root: root, body: body, eyes: [], extra: [], mats: mats, phase: 1, t: 0, hitT: -9, tauntT: -9, dodgeT: -9, dodgeDir: 1, shield: 0, center: new T.Vector3(0, 1.4, 0.4) };
    // a pair of big cartoon eyes: white block, pupil, angry brow
    function eyes(y, z, gap, s, pupil, browCol, parent) {
      [-1, 1].forEach(function (k) {
        var g = new T.Group(); g.position.set(k * gap, y, z); (parent || body).add(g);
        box(0.42 * s, 0.42 * s, 0.1, "#FFFFFF", 0, 0, 0, g); var p = box(0.2 * s, 0.24 * s, 0.06, pupil || "#13232F", 0, -0.02 * s, 0.06, g);
        var brow = box(0.5 * s, 0.1 * s, 0.08, browCol || d.dark, 0, 0.28 * s, 0.04, g); brow.rotation.z = -k * 0.35;
        b.eyes.push({ g: g, p: p, brow: brow, k: k, glow: false });
      });
    }
    function mouth(y, z, w, teeth, parent) { var m = box(w, 0.22, 0.08, "#4A1020", 0, y, z, parent); if (teeth) [-1, 1].forEach(function (k) { box(0.12, 0.14, 0.06, "#FFFFFF", k * w * 0.3, y + 0.06, z + 0.03, parent); }); b.mouth = m; return m; }
    function arm(s, len, col, hand, parent) {
      var g = new T.Group(); g.position.set(s * 1.05, 1.7, 0); (parent || body).add(g);
      box(0.42, len, 0.42, col, 0, -len / 2, 0, g); if (hand) box(0.55, 0.5, 0.55, hand, 0, -len, 0, g);
      b.extra.push({ arm: g, s: s }); return g;
    }

    if (id === "blob") {
      box(2.2, 1.7, 2, d.color, 0, 0.95, 0); box(1.8, 0.4, 1.6, d.accent, 0, 1.95, 0); box(1.2, 0.3, 1.0, d.color, 0, 2.2, 0);
      [[-0.9, 0.9], [0.4, 1.0], [0.95, -0.4], [-0.5, -0.95]].forEach(function (p) { box(0.32, 0.5, 0.32, d.dark, p[0], 0.25, p[1]); });
      eyes(1.35, 1.02, 0.45, 1.25, "#1B5E20"); mouth(0.75, 1.02, 0.9, true);
    } else if (id === "troll") {
      box(1.8, 1.9, 1.3, d.color, 0, 1.25, 0); box(1.9, 0.4, 1.4, d.dark, 0, 0.45, 0);
      var head = new T.Group(); head.position.y = 2.25; body.add(head); b.head = head;
      box(1.3, 1.1, 1.1, d.color, 0, 0.45, 0, head); [-1, 1].forEach(function (k) { var h = box(0.22, 0.75, 0.22, d.accent, k * 0.58, 1.1, 0, head); h.rotation.z = -k * 0.45; box(0.16, 0.26, 0.12, d.accent, k * 0.32, 0.05, 0.6, head); });
      eyes(0.62, 0.56, 0.3, 0.8, "#F2C230", d.dark, head); mouth(0.18, 0.56, 0.7, false, head);
      arm(-1, 1.2, d.color, d.dark); var club = arm(1, 1.2, d.color, d.dark); box(0.32, 1.6, 0.32, "#7A4B2A", 0, -1.6, 0.4, club).rotation.x = 1.2;
      [-0.5, 0.5].forEach(function (x) { box(0.55, 0.45, 0.6, d.dark, x, 0.22, 0.05); });
    } else if (id === "kraken") {
      box(2.0, 1.9, 1.8, d.color, 0, 1.9, 0); box(1.6, 0.4, 1.4, d.dark, 0, 3.0, 0); box(0.9, 0.3, 0.8, d.color, 0, 3.3, 0);
      eyes(2.1, 0.92, 0.42, 1.15, "#13232F"); mouth(1.35, 0.92, 0.6, true);
      b.tent = [];
      for (var k = 0; k < 6; k++) {
        var a = k / 6 * Math.PI * 2 + 0.3, segs = [];
        for (var q = 0; q < 4; q++) segs.push(box(0.36 - q * 0.05, 0.36 - q * 0.05, 0.36 - q * 0.05, q % 2 ? d.dark : d.color, 0, 0, 0));
        b.tent.push({ a: a, segs: segs });
      }
    } else if (id === "vampire") {
      box(1.4, 1.8, 0.9, d.color, 0, 1.2, 0); box(0.4, 1.4, 0.1, "#FFFFFF", 0, 1.35, 0.46);
      var cape = new T.Group(); cape.position.set(0, 2.1, -0.4); body.add(cape); b.cape = cape;
      box(2.4, 2.2, 0.12, d.accent, 0, -1.05, -0.1, cape); box(2.6, 0.5, 0.2, "#7A1F2B", 0, 0.1, 0.1, cape);
      var vh = new T.Group(); vh.position.y = 2.15; body.add(vh); b.head = vh;
      box(1.0, 1.0, 0.9, "#E8E2F0", 0, 0.5, 0, vh); box(1.06, 0.35, 0.96, "#13232F", 0, 1.05, -0.02, vh); box(0.3, 0.3, 0.2, "#13232F", 0, 0.9, 0.45, vh);
      eyes(0.55, 0.47, 0.24, 0.7, "#E5484D", "#13232F", vh); mouth(0.2, 0.47, 0.5, true, vh);
      arm(-1, 1.3, d.color, "#E8E2F0"); arm(1, 1.3, d.color, "#E8E2F0");
      b.float = true;
    } else if (id === "golem") {
      box(2.0, 1.8, 1.4, d.color, 0, 1.4, 0); box(2.2, 0.5, 1.5, d.dark, 0, 2.4, 0);
      b.core = box(0.5, 0.5, 0.1, d.accent, 0, 1.5, 0.72, body, d.accent);
      [[-0.6, 1.0], [0.5, 1.9], [0.7, 0.9]].forEach(function (p) { box(0.12, 0.6, 0.06, d.accent, p[0], p[1], 0.71, body, d.accent); });
      var gh = new T.Group(); gh.position.y = 2.65; body.add(gh); b.head = gh;
      box(1.1, 0.9, 1.0, d.color, 0, 0.45, 0, gh); eyes(0.5, 0.52, 0.27, 0.7, d.accent, d.dark, gh); b.eyes.forEach(function (e) { e.glow = true; });
      arm(-1, 1.4, d.dark, d.color); arm(1, 1.4, d.dark, d.color);
      [-0.55, 0.55].forEach(function (x) { box(0.7, 0.6, 0.8, d.dark, x, 0.3, 0); });
      b.rock = b.core.material;
    } else {   // king
      box(1.8, 2.0, 1.3, d.color, 0, 1.0, 0); box(1.9, 0.3, 1.4, d.accent, 0, 0.15, 0); box(0.3, 2.0, 0.08, d.accent, 0, 1.0, 0.66);
      var kh = new T.Group(); kh.position.y = 2.0; body.add(kh); b.head = kh;
      box(1.1, 1.0, 1.0, "#F2D3B0", 0, 0.5, 0, kh); box(1.15, 0.55, 0.15, "#E9E4F5", 0, 0.05, 0.5, kh);
      box(1.2, 0.3, 1.1, d.accent, 0, 1.15, 0, kh); [-0.45, 0, 0.45].forEach(function (x) { box(0.2, 0.32, 0.2, d.accent, x, 1.45, 0.4, kh); box(0.12, 0.12, 0.06, "#E5484D", x, 1.2, 0.56, kh); });
      eyes(0.62, 0.52, 0.27, 0.72, "#FF4FD8", "#13232F", kh); mouth(0.28, 0.52, 0.45, false, kh);
      arm(-1, 1.2, d.color, "#F2D3B0"); var sc = arm(1, 1.2, d.color, "#F2D3B0");
      box(0.16, 1.8, 0.16, d.accent, 0, -1.0, 0.45, sc); b.orb = box(0.45, 0.45, 0.45, "#FF4FD8", 0, -0.05, 0.45, sc, "#FF4FD8");
      b.float = true;
    }
    if (opt.shield) {
      var sg = new T.IcosahedronGeometry(2.3, 0); geos.push(sg);
      b.shieldMesh = new T.Mesh(sg, new T.MeshBasicMaterial({ color: "#7DF9FF", transparent: true, opacity: 0, wireframe: true })); b.shieldMesh.position.y = 1.4; root.add(b.shieldMesh);
    }

    // animation: breathe, flinch when hit, lunge when taunting/attacking, dodge sideways, arms, tentacles, cape, orb, glowing core
    b.update = function (t, dt) {
      b.t = t; var th = t * (1 + (b.phase - 1) * 0.22);
      var hit = Math.max(0, 1 - (t - b.hitT) / 0.45), tau = Math.max(0, 1 - (t - b.tauntT) / 0.9), dod = Math.max(0, 1 - (t - b.dodgeT) / 0.6);
      var breathe = Math.sin(th * 2.2) * 0.035;
      body.scale.set(1 + breathe - hit * 0.12, 1 - breathe + hit * 0.1, 1 + breathe);
      root.position.x = Math.sin(dod * Math.PI) * 1.4 * b.dodgeDir;
      body.position.z = -hit * 0.5 + Math.sin(tau * Math.PI) * 0.7;
      body.rotation.z = Math.sin(t * 30) * hit * 0.08;
      body.position.y = (b.float ? 0.25 + Math.sin(th * 1.6) * 0.15 : 0) + Math.abs(Math.sin(tau * Math.PI * 2)) * 0.2;
      if (b.head) { b.head.rotation.y = Math.sin(th * 0.9) * 0.22; b.head.rotation.x = Math.sin(th * 1.3) * 0.05 - tau * 0.3; }
      b.extra.forEach(function (e) { e.arm.rotation.z = e.s * (0.12 + Math.sin(th * 2 + e.s) * 0.12 + tau * 0.9); e.arm.rotation.x = Math.sin(th * 1.6 + e.s) * 0.2 - tau * 1.2; });
      if (b.tent) b.tent.forEach(function (te, k) { te.segs.forEach(function (s, q) { var r = 0.9 + q * 0.32, ang = te.a + Math.sin(th * 2 + q * 0.5 + k) * 0.3; s.position.set(Math.sin(ang) * r, 0.75 - q * 0.18 + Math.sin(th * 3 + q * 0.7 + k) * 0.12, Math.cos(ang) * r * 0.85); }); });
      if (b.cape) b.cape.rotation.x = 0.15 + Math.sin(th * 2) * 0.08 + tau * 0.4;
      if (b.orb) { b.orb0 = b.orb0 || b.orb.scale.clone(); b.orb.scale.copy(b.orb0).multiplyScalar(1 + Math.sin(t * 6) * 0.15 + tau * 0.8); }
      if (b.core) { b.core0 = b.core0 || b.core.scale.clone(); b.core.scale.copy(b.core0).multiplyScalar(1 + Math.sin(t * 5) * 0.12 * b.phase); }
      if (b.mouth) { b.mouthY = b.mouthY || b.mouth.scale.y; b.mouth.scale.y = b.mouthY * (1 + tau * 1.6 + hit * 0.6); }
      b.eyes.forEach(function (e) { e.p.position.x = Math.sin(th * 0.7) * 0.05; e.g.scale.y = hit > 0.3 ? 0.35 : 1; e.brow.rotation.z = -e.k * (0.35 + tau * 0.25); });
      if (b.shieldMesh) { var target = b.shield > 0 ? 0.35 : 0; b.shieldMesh.material.opacity += (target - b.shieldMesh.material.opacity) * 0.1; b.shieldMesh.rotation.y += dt * 0.6; b.shieldMesh.visible = b.shieldMesh.material.opacity > 0.01; }
      var flash = Math.max(0, 1 - (t - b.hitT) / 0.18);
      mats.forEach(function (m) { if (m.userData.dis) return; m.userData.e0 = m.userData.e0 || m.emissive.clone(); m.emissive.copy(m.userData.e0).lerp(new T.Color("#FFFFFF"), flash * 0.8); });
    };
    b.dispose = function () { geos.forEach(function (g) { g.dispose(); }); mats.forEach(function (m) { m.dispose(); }); b.shieldMesh && b.shieldMesh.material.dispose(); };
    b.update(0, 0.016);
    return b;
  };
})();
