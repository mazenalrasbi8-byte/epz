/* EPZ Lucky Box — the 3D reward-opening scene. Loaded only when a student opens a box (three.js comes from the same CDN import Gate Rush uses).
   Everything is built from boxes in code (no models, no image files): a wooden chest with gold trim, a glowing inside, a lid that opens on a hinge,
   the student's own block character (GR.avatar, from avatar.js) and a reward that rises out of the chest.
   The reward is NOT decided here: the page rolls and saves it first, then hands it to this scene to show.
   Usage: var scene = GR.luckScene(T, { container, cfg, colors, key, tier, points, golden, caption, lines, sfx, onClaim }); scene.dispose(). Throws if WebGL is not available. */
(function () {
  var GR = (window.GR = window.GR || {});
  var NAVY = "#17224D", GOLD = "#FFD83D", GOLD_D = "#B9801A", CREAM = "#FFF6E2";

  var CSS = "\
.lbx{position:fixed;inset:0;z-index:9500;opacity:0;transition:opacity .5s ease;touch-action:none;overscroll-behavior:none;user-select:none;-webkit-user-select:none;font-family:var(--font,'Nunito',system-ui,sans-serif)}\
.lbx.in{opacity:1}.lbx.out{opacity:0;transition-duration:.4s}\
.lbx-dim{position:absolute;inset:0;background:radial-gradient(circle at 50% 52%,color-mix(in srgb,var(--lbt,#FFD83D) 22%,transparent),transparent 58%),rgba(19,35,47,.74);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}\
.lbx-cv{position:absolute;inset:0;width:100%;height:100%;display:block}\
.lbx-ui::before{content:'';position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(transparent,rgba(19,35,47,.78));pointer-events:none}.lbx-ui>*{position:relative}.lbx-skip{position:absolute!important}.lbx-done{position:absolute!important}.lbx-ui{position:absolute;inset:0;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:10px;text-align:center;color:#fff;padding:12px 16px max(18px,env(safe-area-inset-bottom))}\
.lbx-skip{position:absolute;top:max(12px,env(safe-area-inset-top));right:12px;pointer-events:auto;min-height:40px;padding:0 16px;border:0;border-radius:999px;background:rgba(255,255,255,.16);color:#fff;font:inherit;font-weight:800;font-size:.85rem;cursor:pointer;transition:opacity .3s,background .15s}\
.lbx-skip:hover{background:rgba(255,255,255,.26)}.lbx-skip[hidden]{display:none}\
.lbx-info{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:150px;justify-content:flex-end}\
.lbx-cap{font-weight:800;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:#FFE9A8;opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}\
.lbx-tier{display:inline-block;font-family:var(--display,'Baloo 2',sans-serif);font-weight:800;font-size:1.05rem;padding:3px 16px;border-radius:999px;background:var(--lbt,#FFD83D);color:#17224D;box-shadow:0 3px 0 rgba(0,0,0,.28);opacity:0;transform:translateY(10px) scale(.9);transition:opacity .45s,transform .45s cubic-bezier(.3,1.5,.5,1)}\
.lbx-pts{font-family:var(--display,'Baloo 2',sans-serif);font-weight:800;font-size:3rem;line-height:1;color:#fff;text-shadow:0 3px 0 #17224D,0 0 22px color-mix(in srgb,var(--lbt,#FFD83D) 70%,transparent);font-variant-numeric:tabular-nums;opacity:0;transform:translateY(10px);transition:opacity .45s,transform .45s}\
.lbx-pts small{font-size:1.1rem;margin-left:6px;color:#FFE9A8;text-shadow:none}\
.lbx-line{margin:0;font-weight:700;font-size:.92rem;color:#E9EEFF;opacity:0;transition:opacity .5s;max-width:34ch}\
.lbx-line b{color:#FFD83D}\
.lbx-cap.show,.lbx-tier.show,.lbx-pts.show{opacity:1;transform:none}.lbx-line.show{opacity:1}\
.lbx-claim{pointer-events:auto;width:min(100%,340px);min-height:56px;border:3px solid #17224D;border-radius:16px;background:#FFD83D;color:#17224D;font-family:var(--display,'Baloo 2',sans-serif);font-weight:800;font-size:1.25rem;letter-spacing:.02em;box-shadow:0 5px 0 #17224D;cursor:pointer;opacity:0;transform:translateY(14px);transition:opacity .4s,transform .4s,box-shadow .12s,filter .15s}\
.lbx-claim.show{opacity:1;transform:none}.lbx-claim:hover{filter:brightness(1.05)}.lbx-claim:active{transform:translateY(3px);box-shadow:0 2px 0 #17224D}.lbx-claim:not(.show){visibility:hidden}.lbx-claim.show:disabled{opacity:.75;cursor:default}\
.lbx-claim:focus-visible,.lbx-skip:focus-visible{outline:3px solid #fff;outline-offset:3px}\
.lbx-done{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.85);display:flex;align-items:center;gap:10px;padding:14px 22px;border-radius:18px;background:#FFF6E2;color:#17224D;font-family:var(--display,'Baloo 2',sans-serif);font-weight:800;font-size:1.3rem;border:3px solid #17224D;box-shadow:0 5px 0 #17224D;opacity:0;transition:opacity .3s,transform .35s cubic-bezier(.3,1.5,.5,1);pointer-events:none;white-space:nowrap}\
.lbx-done.show{opacity:1;transform:translate(-50%,-50%) scale(1)}.lbx-done i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#178A4C;color:#fff;font-style:normal;font-size:1rem}\
@media (max-height:560px){.lbx-pts{font-size:2.2rem}.lbx-info{min-height:110px}}\
@media (prefers-reduced-motion:reduce){.lbx,.lbx-cap,.lbx-tier,.lbx-pts,.lbx-line,.lbx-claim,.lbx-done{transition-duration:.01s}}\
";
  function injectCss() { if (document.getElementById("lbx-css")) return; var s = document.createElement("style"); s.id = "lbx-css"; s.textContent = CSS; document.head.appendChild(s); }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function easeOut(k) { return 1 - Math.pow(1 - k, 3); }
  function easeInOut(k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function easeBack(k) { var c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); }

  GR.luckScene = function (T, o) {
    injectCss();
    var reduced = false; try { reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    var touch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
    var tier = o.tier, key = o.key, big = key === "rare" || key === "legend", golden = !!o.golden, sfx = o.sfx || {};
    var tcol = tier.color, tglow = tier.glow;

    /* ---------------- DOM ---------------- */
    var root = document.createElement("div"); root.className = "lbx"; root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", "Lucky Box");
    root.style.setProperty("--lbt", tcol);
    root.innerHTML = '<div class="lbx-dim"></div><canvas class="lbx-cv" aria-hidden="true"></canvas><div class="lbx-ui"><button type="button" class="lbx-skip">Skip</button>' +
      '<div class="lbx-info" aria-live="polite"><span class="lbx-cap"></span><span class="lbx-tier"></span><div class="lbx-pts" aria-label="' + o.points + ' points">+<b>0</b><small>points</small></div><p class="lbx-line"></p></div>' +
      '<button type="button" class="lbx-claim" disabled>CLAIM REWARD</button><div class="lbx-done" role="status"><i>✓</i><span></span></div></div>';
    var cv = root.querySelector(".lbx-cv"), elCap = root.querySelector(".lbx-cap"), elTier = root.querySelector(".lbx-tier"), elPts = root.querySelector(".lbx-pts"), elN = elPts.querySelector("b"),
      elLine = root.querySelector(".lbx-line"), btnClaim = root.querySelector(".lbx-claim"), btnSkip = root.querySelector(".lbx-skip"), elDone = root.querySelector(".lbx-done");
    elCap.textContent = o.caption || "Lucky Box"; elTier.textContent = tier.name + (key === "legend" ? " ★" : ""); elTier.style.background = tcol; elTier.style.color = key === "common" ? NAVY : (key === "good" ? NAVY : "#fff");
    elLine.innerHTML = (o.lines || []).join("<br>"); elDone.querySelector("span").textContent = "+" + o.points + " points added";
    (o.container || document.body).appendChild(root);

    /* ---------------- renderer ---------------- */
    var renderer = new T.WebGLRenderer({ canvas: cv, antialias: !touch, alpha: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = T.SRGBColorSpace; renderer.setClearColor(0x000000, 0);
    var dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2); renderer.setPixelRatio(dpr);
    var shadows = !touch || (window.devicePixelRatio || 1) <= 2; renderer.shadowMap.enabled = shadows; renderer.shadowMap.type = T.PCFSoftShadowMap;
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(36, 1, 0.1, 80);
    var geos = [], mats = [], texs = [], disposed = false, raf = 0, lost = false;
    function G(g) { geos.push(g); return g; } function M(m) { mats.push(m); return m; }
    function ctex(w, h, draw, rep) { var c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.magFilter = T.NearestFilter; t.minFilter = T.NearestFilter; t.generateMipmaps = false; if (rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } texs.push(t); return t; }
    var unit = G(new T.BoxGeometry(1, 1, 1));
    function box(w, h, d, mat, x, y, z, parent, shadow) { var m = new T.Mesh(unit, mat); m.scale.set(w, h, d); m.position.set(x, y, z); if (shadow !== false) { m.castShadow = true; m.receiveShadow = true; } (parent || scene).add(m); return m; }

    /* lights */
    var hemi = new T.HemisphereLight("#FFF6E2", "#2B3A78", 1.45); scene.add(hemi);
    var sun = new T.DirectionalLight("#FFF1D0", 1.7); sun.position.set(4, 8, 6); sun.castShadow = shadows; sun.shadow.mapSize.set(1024, 1024);
    var sc = sun.shadow.camera; sc.left = -5; sc.right = 5; sc.top = 5; sc.bottom = -5; sc.near = 1; sc.far = 24; sun.shadow.bias = -0.0008; scene.add(sun);
    var inner = new T.PointLight(tglow, 0, 9, 1.6); inner.position.set(0, 1.1, 0); scene.add(inner);

    /* platform: an octagon of cream and gold blocks with a navy edge */
    var mCream = M(new T.MeshLambertMaterial({ color: "#E8D9AE" })), mNavy = M(new T.MeshLambertMaterial({ color: NAVY })), mGoldRim = M(new T.MeshLambertMaterial({ color: GOLD }));
    var plat = new T.Mesh(G(new T.CylinderGeometry(2.6, 2.7, 0.3, 8)), mCream); plat.position.y = -0.15; plat.receiveShadow = true; scene.add(plat);
    var rim = new T.Mesh(G(new T.CylinderGeometry(2.86, 2.86, 0.14, 8)), mGoldRim); rim.position.y = -0.2; scene.add(rim);
    var base = new T.Mesh(G(new T.CylinderGeometry(3.0, 3.1, 0.3, 8)), mNavy); base.position.y = -0.4; scene.add(base);
    var ring = new T.Mesh(G(new T.RingGeometry(1.55, 1.7, 8)), M(new T.MeshBasicMaterial({ color: tglow, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }))); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01; scene.add(ring);

    /* ---------------- the chest ---------------- */
    var W = 1.7, D = 1.15, BH = 0.85, LH1 = 0.38, LH2 = 0.26, WALL = 0.1;
    var woodTex = ctex(32, 32, function (g, w, h) {
      var base = golden ? ["#E8A317", "#D9930C", "#F3B72E"] : ["#9A622F", "#8A5527", "#A86E38"];
      for (var y = 0; y < h; y += 8) { g.fillStyle = base[(y / 8) % 3]; g.fillRect(0, y, w, 8); g.fillStyle = "rgba(0,0,0,.22)"; g.fillRect(0, y + 7, w, 1); g.fillStyle = "rgba(255,255,255,.1)"; g.fillRect(0, y, w, 1); }
      g.fillStyle = "rgba(0,0,0,.16)"; for (var i = 0; i < 14; i++) g.fillRect((i * 13) % w, (i * 7) % h, 3, 1);
    }, [1, 1]);
    var mWood = M(new T.MeshLambertMaterial({ map: woodTex })), mWoodIn = M(new T.MeshLambertMaterial({ color: golden ? "#B8780B" : "#5E3B1B", emissive: "#3A2200", emissiveIntensity: 0.4 }));
    var trim = golden ? "#E11D48" : GOLD, trimDark = golden ? "#9F1239" : GOLD_D;
    var mTrim = M(new T.MeshLambertMaterial({ color: trim, emissive: trimDark, emissiveIntensity: 0.25 })), mTrimD = M(new T.MeshLambertMaterial({ color: trimDark })), mInk = M(new T.MeshLambertMaterial({ color: "#1B1630" }));
    var chest = new T.Group(); scene.add(chest);
    // body: floor + four walls so the inside can glow
    box(W, 0.1, D, mWoodIn, 0, 0.05, 0, chest);
    box(W, BH, WALL, mWood, 0, BH / 2, D / 2 - WALL / 2, chest); box(W, BH, WALL, mWoodIn, 0, BH / 2, -D / 2 + WALL / 2, chest);
    box(WALL, BH, D - 2 * WALL, mWood, -W / 2 + WALL / 2, BH / 2, 0, chest); box(WALL, BH, D - 2 * WALL, mWood, W / 2 - WALL / 2, BH / 2, 0, chest);
    // gold: corner posts, rim frame, front plate
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { box(0.16, BH + 0.02, 0.16, mTrim, c[0] * (W / 2), BH / 2, c[1] * (D / 2), chest); });
    box(W + 0.08, 0.09, 0.12, mTrim, 0, BH - 0.03, D / 2, chest); box(W + 0.08, 0.09, 0.12, mTrim, 0, BH - 0.03, -D / 2, chest);
    box(0.12, 0.09, D, mTrim, -W / 2, BH - 0.03, 0, chest); box(0.12, 0.09, D, mTrim, W / 2, BH - 0.03, 0, chest);
    box(W + 0.08, 0.08, D + 0.08, mTrimD, 0, 0.04, 0, chest);
    // the treasure and the glow inside
    var mFill = M(new T.MeshLambertMaterial({ color: GOLD, emissive: "#FFB800", emissiveIntensity: 0.55 }));
    box(W - 0.3, 0.16, D - 0.3, mFill, 0, BH - 0.3, 0, chest, false);
    for (var ci = 0; ci < 6; ci++) box(0.22, 0.07, 0.22, mFill, -0.55 + ci * 0.22, BH - 0.19, (ci % 2 ? 0.14 : -0.14), chest, false).rotation.y = ci * 0.7;
    var mGlowPlane = M(new T.MeshBasicMaterial({ color: tglow, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false }));
    var glowPlane = new T.Mesh(G(new T.PlaneGeometry(W - 0.3, D - 0.3)), mGlowPlane); glowPlane.rotation.x = -Math.PI / 2; glowPlane.position.y = BH - 0.1; chest.add(glowPlane);
    // lid on a back hinge
    var lid = new T.Group(); lid.position.set(0, BH, -D / 2); chest.add(lid);
    box(W + 0.02, LH1, D + 0.02, mWood, 0, LH1 / 2, D / 2, lid);
    box(W - 0.3, LH2, D - 0.3, mWood, 0, LH1 + LH2 / 2, D / 2, lid);
    [-0.5, 0.5].forEach(function (x) { box(0.18, LH1 + 0.02, D + 0.08, mTrim, x, LH1 / 2, D / 2, lid); box(0.18, LH2 + 0.02, D - 0.22, mTrim, x, LH1 + LH2 / 2, D / 2, lid); });
    box(W + 0.08, 0.1, 0.14, mTrim, 0, 0.05, D + 0.0, lid); box(0.14, 0.1, D, mTrim, -W / 2, 0.05, D / 2, lid); box(0.14, 0.1, D, mTrim, W / 2, 0.05, D / 2, lid);
    box(0.34, 0.34, 0.1, mTrim, 0, 0.12, D + 0.05, lid); box(0.08, 0.14, 0.04, mInk, 0, 0.12, D + 0.11, lid);
    var topBox = box(W - 0.3, 0.06, D - 0.3, mTrim, 0, LH1 + LH2 + 0.02, D / 2, lid); topBox.visible = false;
    // light shaft out of the opening
    var shaftTex = ctex(4, 64, function (g, w, h) { var gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "rgba(255,255,255,0)"); gr.addColorStop(1, "rgba(255,255,255,1)"); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    var mShaft = M(new T.MeshBasicMaterial({ color: tglow, alphaMap: shaftTex, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }));
    var shaft = new T.Mesh(G(new T.CylinderGeometry(0.95, 0.45, 4.2, 8, 1, true)), mShaft); shaft.position.set(0, BH + 2.0, 0); chest.add(shaft);

    /* ---------------- the reward (built from the real tier; points only) ---------------- */
    var rw = new T.Group(); rw.visible = false; scene.add(rw);
    var mCoin = M(new T.MeshLambertMaterial({ color: GOLD, emissive: "#FFB800", emissiveIntensity: 0.5, flatShading: true })), mCoinIn = M(new T.MeshLambertMaterial({ color: "#F2B632", emissive: "#B9801A", emissiveIntensity: 0.4, flatShading: true }));
    var coinG = G(new T.CylinderGeometry(0.34, 0.34, 0.1, 10)), coinInG = G(new T.CylinderGeometry(0.23, 0.23, 0.108, 10));
    function coin(x, y, z, parent, tilt) { var g = new T.Group(); g.add(new T.Mesh(coinG, mCoin)); g.add(new T.Mesh(coinInG, mCoinIn)); g.position.set(x, y, z); if (tilt) g.rotation.set(tilt[0], tilt[1], tilt[2]); (parent || rw).add(g); return g; }
    var spinners = [];
    if (key === "common") { coin(0, -0.1, 0); coin(0, 0.02, 0); coin(0.04, 0.14, 0.02).rotation.y = 0.5; rw.userData.size = 0.8; }
    else if (key === "good") { coin(-0.28, -0.1, 0); coin(0.28, -0.1, 0); coin(0, -0.1, 0.3); coin(-0.14, 0.02, 0.1); coin(0.16, 0.02, 0.12); coin(0, 0.14, 0.1).rotation.y = 0.4; rw.userData.size = 1; }
    else if (key === "rare") {
      var mGem = M(new T.MeshLambertMaterial({ color: "#4F8BFF", emissive: "#2B5FE0", emissiveIntensity: 0.7, flatShading: true })), gm = new T.Mesh(G(new T.OctahedronGeometry(0.55)), mGem); gm.scale.y = 1.35; gm.position.y = 0.15; rw.add(gm);
      [0, 1, 2].forEach(function (i) { var a = i * 2.094, c = coin(Math.cos(a) * 0.75, -0.2, Math.sin(a) * 0.75, rw, [0.5, 0, 0.3]); spinners.push(c); }); rw.userData.size = 1.2;
    } else {
      var shape = new T.Shape(), pts = 5, ro = 0.75, ri = 0.34; for (var i = 0; i < pts * 2; i++) { var r = i % 2 ? ri : ro, a = Math.PI / 2 + i * Math.PI / pts; i ? shape.lineTo(Math.cos(a) * r, Math.sin(a) * r) : shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      var starG = G(new T.ExtrudeGeometry(shape, { depth: 0.26, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 1 })); starG.translate(0, 0, -0.13);
      var mStar = M(new T.MeshLambertMaterial({ color: GOLD, emissive: "#FFB800", emissiveIntensity: 0.65, flatShading: true })), star = new T.Mesh(starG, mStar); star.position.y = 0.15; rw.add(star);
      var mRuby = M(new T.MeshLambertMaterial({ color: "#B14DFF", emissive: "#8B2BE0", emissiveIntensity: 0.8, flatShading: true })), gm2 = new T.Mesh(G(new T.OctahedronGeometry(0.17)), mRuby); gm2.position.set(0, 0.15, 0.2); rw.add(gm2);
      for (var k = 0; k < 4; k++) { var s = new T.Mesh(unit, mRuby); s.scale.setScalar(0.17); rw.add(s); spinners.push(s); }
      rw.userData.size = 1.5;
    }
    var glowTex = ctex(64, 64, function (g, w, h) { var gr = g.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,.45)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, w, h); });
    glowTex.magFilter = T.LinearFilter; glowTex.minFilter = T.LinearFilter;
    var mHalo = M(new T.SpriteMaterial({ map: glowTex, color: tglow, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false })), halo = new T.Sprite(mHalo); halo.scale.setScalar(3.2); halo.position.set(0, BH + 0.2, 0); scene.add(halo);

    /* ---------------- the student's own character ---------------- */
    var av = GR.avatar(T, o.cfg, o.colors); scene.add(av.root);
    av.root.updateMatrixWorld(true); var bb = new T.Box3().setFromObject(av.root), avH = Math.max(0.5, bb.max.y - bb.min.y), avFoot = -bb.min.y;
    var AVX = 1.95, AVZ = -0.15, avScale = 1.55 / avH; av.root.scale.multiplyScalar(avScale); av.root.position.set(AVX, avFoot * avScale, AVZ); av.root.rotation.y = -0.5;
    av.root.traverse(function (n) { if (n.isMesh) { n.castShadow = shadows; } });

    /* ---------------- particles: one instanced mesh ---------------- */
    var PN = touch ? 110 : 170, pm = new T.InstancedMesh(unit, M(new T.MeshBasicMaterial({ color: "#FFFFFF" })), PN); pm.frustumCulled = false; scene.add(pm);
    var P = { x: new Float32Array(PN), y: new Float32Array(PN), z: new Float32Array(PN), vx: new Float32Array(PN), vy: new Float32Array(PN), vz: new Float32Array(PN), life: new Float32Array(PN), max: new Float32Array(PN), sz: new Float32Array(PN), g: new Float32Array(PN) };
    var tmpO = new T.Object3D(), tmpC = new T.Color(), pHead = 0, cols = [GOLD, "#FFF6E2", tglow, "#FFB800"];
    for (var pi = 0; pi < PN; pi++) { tmpO.scale.setScalar(0); tmpO.updateMatrix(); pm.setMatrixAt(pi, tmpO.matrix); pm.setColorAt(pi, tmpC.set("#fff")); }
    function spawn(x, y, z, vx, vy, vz, size, color, life, g) { var i = pHead; pHead = (pHead + 1) % PN; P.x[i] = x; P.y[i] = y; P.z[i] = z; P.vx[i] = vx; P.vy[i] = vy; P.vz[i] = vz; P.sz[i] = size; P.life[i] = P.max[i] = life; P.g[i] = g; pm.setColorAt(i, tmpC.set(color)); pm.instanceColor.needsUpdate = true; }
    function burst(n, speed, up) { n = Math.round(n * (touch ? 0.7 : 1)); for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = speed * (0.35 + Math.random() * 0.8); spawn((Math.random() - 0.5) * 0.9, BH + 0.1, (Math.random() - 0.5) * 0.5, Math.cos(a) * s * 0.6, up * (0.55 + Math.random() * 0.7), Math.sin(a) * s * 0.5, 0.05 + Math.random() * 0.07, cols[(Math.random() * cols.length) | 0], 0.9 + Math.random() * 0.9, 4); } }
    function sparkle(x, y, z) { spawn(x + (Math.random() - 0.5) * 0.8, y + (Math.random() - 0.5) * 0.6, z + (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.4, 0.5 + Math.random() * 0.6, (Math.random() - 0.5) * 0.4, 0.04 + Math.random() * 0.05, cols[(Math.random() * 2) | 0], 0.9 + Math.random() * 0.6, -0.2); }
    function stepParticles(dt) {
      var any = false;
      for (var i = 0; i < PN; i++) {
        if (P.life[i] <= 0) continue; any = true; P.life[i] -= dt;
        if (P.life[i] <= 0) { tmpO.scale.setScalar(0); tmpO.updateMatrix(); pm.setMatrixAt(i, tmpO.matrix); continue; }
        P.vy[i] -= P.g[i] * dt; P.x[i] += P.vx[i] * dt; P.y[i] += P.vy[i] * dt; P.z[i] += P.vz[i] * dt;
        var k = P.life[i] / P.max[i]; tmpO.position.set(P.x[i], P.y[i], P.z[i]); tmpO.rotation.set(k * 6, k * 4, 0); tmpO.scale.setScalar(P.sz[i] * (k < 0.3 ? k / 0.3 : 1)); tmpO.updateMatrix(); pm.setMatrixAt(i, tmpO.matrix);
      }
      if (any) pm.instanceMatrix.needsUpdate = true;
    }

    /* ---------------- camera + layout ---------------- */
    var vw = 1, vh = 1, camBase = { d: 9, y: 3.0, ty: 1.2 };
    function resize() {
      vw = window.innerWidth; vh = window.innerHeight; renderer.setSize(vw, vh, false); camera.aspect = vw / vh;
      var th = Math.tan(camera.fov * Math.PI / 360), need = 2.95 / (th * camera.aspect);   // keep the chest and the character inside the width
      camBase.d = Math.max(10.5, need * 1.05); camBase.y = 2.4 + camBase.d * 0.13; camBase.ty = 1.15;
      camera.setViewOffset(vw, vh, 0, vh * (vh > vw ? 0.12 : 0.13), vw, vh); camera.updateProjectionMatrix();
    }
    resize(); window.addEventListener("resize", resize);

    /* ---------------- timeline ---------------- */
    var SP = reduced ? 0.55 : 1;                       // reduced motion: shorter, calmer
    var T_IN = 0.7 * SP, T_SHAKE = 2.3 * SP, T_OPEN = 3.0 * SP, T_RISE = 3.2 * SP, T_RISE_END = 4.5 * SP, T_UI = 4.7 * SP;
    var t = 0, flags = {}, shown = {}, shakePlayed = false, claimed = false, closing = false, countStart = 0, dance = (Math.random() * 4) | 0, frames = 0, slow = 0;
    function show(el, k) { if (!shown[k]) { shown[k] = 1; el.classList.add("show"); } }
    function once(k, fn) { if (!flags[k]) { flags[k] = 1; fn(); } }
    requestAnimationFrame(function () { root.classList.add("in"); });
    sfx.start && sfx.start();

    function frame(dt) {
      // chest: rises into place, shakes harder, then the lid swings open
      var inK = easeOut(clamp(t / T_IN, 0, 1)), s = clamp((t - T_IN) / (T_SHAKE - T_IN), 0, 1), amp = s * s;
      chest.scale.setScalar(lerp(0.82, 1, inK)); chest.position.y = lerp(-0.5, 0, inK) + Math.abs(Math.sin(t * 9)) * 0.05 * amp * (t < T_SHAKE ? 1 : 0);
      var shake = t > T_IN && t < T_OPEN - 0.55 * SP ? 1 : 0;
      chest.rotation.z = shake * Math.sin(t * 34) * 0.06 * amp; chest.position.x = shake * Math.sin(t * 47) * 0.05 * amp; chest.rotation.y = lerp(0.5, 0, inK) + shake * Math.sin(t * 21) * 0.03 * amp;
      if (t > T_IN + 0.05 && !shakePlayed) { shakePlayed = true; sfx.shake && sfx.shake(); }
      var crack = (t > T_IN + 0.5 * SP && t < T_OPEN) ? 0.04 + 0.1 * amp * Math.abs(Math.sin(t * 13)) : 0;
      var ok = clamp((t - T_OPEN) / (0.85 * SP), 0, 1);
      lid.rotation.x = ok > 0 ? -easeBack(ok) * 1.95 : -crack;
      topBox.visible = false;
      // glow builds up through the gap, then bursts
      var glowK = t < T_OPEN ? s * 0.55 : lerp(0.55, 1, easeOut(clamp((t - T_OPEN) / 0.6, 0, 1)));
      mGlowPlane.opacity = glowK * (0.5 + 0.2 * Math.sin(t * 6)); inner.intensity = glowK * (big ? 32 : 24) * (1 + (t > T_OPEN && t < T_OPEN + 0.35 ? 1.2 : 0));
      mShaft.opacity = t < T_OPEN ? s * 0.1 : lerp(0.34, 0.12, clamp((t - T_OPEN - 0.4) / 1.6, 0, 1)) * easeOut(clamp((t - T_OPEN) / 0.35, 0, 1));
      mHalo.opacity = t < T_OPEN ? 0 : clamp((t - T_OPEN) / 0.8, 0, 1) * (0.4 + 0.08 * Math.sin(t * 3)); halo.scale.setScalar(lerp(1.8, big ? 3.8 : 2.8, easeOut(clamp((t - T_OPEN) / 1.2, 0, 1))));
      halo.position.y = rw.visible ? rw.position.y : BH + 0.2; ring.material.opacity = clamp((t - T_OPEN) / 0.8, 0, 1) * 0.5 * (0.7 + 0.3 * Math.sin(t * 4));
      if (t >= T_OPEN) once("burst", function () { burst(big ? 80 : 50, 3.2, 4.6); sfx.open && sfx.open(big); try { navigator.vibrate && navigator.vibrate(big ? [60, 40, 120] : 60); } catch (e) {} });
      if (t >= T_OPEN && t < T_UI + 2 && Math.random() < dt * 22) sparkle(0, BH + 0.9, 0);
      // reward rises, then floats
      if (t >= T_RISE) {
        rw.visible = true; var rk = easeOut(clamp((t - T_RISE) / (T_RISE_END - T_RISE), 0, 1)), sz = rw.userData.size || 1;
        rw.position.set(0, lerp(BH - 0.2, 2.35, rk) + (rk >= 1 ? Math.sin(t * 2.4) * 0.07 : 0), 0); rw.scale.setScalar(lerp(0.2, 1, rk) * (big ? 1.12 : 1)); rw.rotation.y = t * (big ? 1.5 : 1.1); rw.rotation.z = Math.sin(t * 1.7) * 0.08;
        for (var i = 0; i < spinners.length; i++) { var a = t * 1.8 + i * (6.283 / spinners.length), r = key === "legend" ? 1.05 : 0.8; spinners[i].position.set(Math.cos(a) * r, (key === "legend" ? 0.15 : -0.2) + Math.sin(t * 3 + i) * 0.08, Math.sin(a) * r); if (key === "legend") spinners[i].rotation.y = t * 3; else spinners[i].rotation.x = t * 3; }
        once("reveal", function () { sfx.reveal && sfx.reveal(big); if (big) burst(60, 2.6, 3.6); });
        if (Math.random() < dt * (big ? 30 : 14)) sparkle(0, rw.position.y, 0);
      }
      // the character: waits, gasps, celebrates (the biggest prize gets a victory dance)
      var st = { speed: 0, vy: 0, ground: true, pose: "idle" };
      if (t < T_OPEN) { av.mood("excited", 0.2); } else if (t < T_RISE) { av.mood("surprised", 0.2); } else { av.mood("happy", 0.2); st.pose = key === "legend" && t > T_RISE + 0.4 ? "dance" : (t < T_UI + 1.4 ? "celebrate" : "idle"); st.dance = dance; once("cele", function () { burst(26, 2, 3); }); }
      av.update(st, dt); av.root.rotation.y = lerp(av.root.rotation.y, t < T_RISE ? -0.5 : -0.3, 1 - Math.exp(-4 * dt));
      // camera: a slow push in, a small kick when the lid opens (never more than a few percent)
      var push = easeInOut(clamp(t / T_OPEN, 0, 1)) * 0.07 + (big ? easeOut(clamp((t - T_OPEN) / 1.2, 0, 1)) * 0.05 : 0), kick = t > T_OPEN ? Math.exp(-(t - T_OPEN) * 5) * 0.012 : 0;
      var d = camBase.d * (1 - push - kick) * lerp(1.1, 1, inK); camera.position.set(Math.sin(t * 0.35) * 0.35, camBase.y * (1 - push * 0.4), d); camera.lookAt(0.4, camBase.ty + (rw.visible ? 0.35 : 0), 0);
      // text
      if (t >= T_RISE + 0.2) { show(elCap, "cap"); show(elTier, "tier"); root.style.setProperty("--lbt", tcol); }
      if (t >= T_RISE + 0.45) { show(elPts, "pts"); if (!countStart) countStart = t; var dur = (big ? 1.2 : 0.7) * SP, k2 = clamp((t - countStart) / dur, 0, 1), n = Math.round(o.points * easeOut(k2)); if (elN.textContent !== String(n)) elN.textContent = n; }
      if (t >= T_UI - 0.3) show(elLine, "line");
      if (t >= T_UI) { show(btnClaim, "claim"); if (btnClaim.disabled && !claimed) { btnClaim.disabled = false; try { btnClaim.focus({ preventScroll: true }); } catch (e) {} btnSkip.hidden = true; } }
      stepParticles(dt);
    }

    var last = 0;
    function loop(now) {
      if (disposed) return; raf = requestAnimationFrame(loop);
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016; last = now;
      if (lost || document.hidden) return;
      t += dt; frame(dt); renderer.render(scene, camera);
      // keep it smooth on slow phones: drop the render size once, never more
      frames++; if (dt > 0.034) slow++; if (frames === 40 && slow > 22 && dpr > 1) { dpr = 1; renderer.setPixelRatio(1); resize(); }
      if (frames === 40) { frames = 0; slow = 0; }
    }
    raf = requestAnimationFrame(loop);

    /* ---------------- controls ---------------- */
    function skip() { if (t < T_UI) { t = Math.max(t, T_UI + 0.1); countStart = Math.min(countStart || t, t - 2); if (!flags.burst) { /* run the missed events once */ } } btnSkip.hidden = true; }
    btnSkip.addEventListener("click", skip);
    function onKey(e) { if (e.key === "Escape" || e.key === " ") { if (t < T_UI) { e.preventDefault(); skip(); } } }
    document.addEventListener("keydown", onKey);
    cv.addEventListener("webglcontextlost", function (e) { e.preventDefault(); lost = true; cv.style.display = "none"; t = T_UI + 3; elCap.classList.add("show"); elTier.classList.add("show"); elPts.classList.add("show"); elN.textContent = o.points; elLine.classList.add("show"); btnClaim.classList.add("show"); btnClaim.disabled = false; btnSkip.hidden = true; });
    btnClaim.addEventListener("click", function () {
      if (claimed || btnClaim.disabled) return; claimed = true; btnClaim.disabled = true; sfx.claim && sfx.claim();
      // the reward flies up into the points, then a clear confirmation, then the scene closes
      var t0 = performance.now(), from = rw.position.y;
      (function fly(now) { if (disposed) return; var k = clamp((now - t0) / 450, 0, 1); rw.position.y = from + easeOut(k) * 1.6; rw.scale.setScalar(Math.max(0.01, 1 - k) * (big ? 1.12 : 1)); if (k < 1) requestAnimationFrame(fly); })(t0);
      elDone.classList.add("show"); elInfoFade(true);
      setTimeout(function () { if (disposed) return; root.classList.add("out"); setTimeout(function () { if (disposed) return; var cb = o.onClaim; api.dispose(); cb && cb(); }, 420); }, 1100);
    });
    function elInfoFade(on) { root.querySelector(".lbx-info").style.transition = "opacity .3s"; root.querySelector(".lbx-info").style.opacity = on ? "0" : "1"; btnClaim.style.opacity = on ? "0" : ""; }

    var api = {
      skip: skip, camera: camera, camBase: camBase, time: function () { return t; },
      dispose: function () {
        if (disposed) return; disposed = true; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); document.removeEventListener("keydown", onKey);
        try { av.dispose(); } catch (e) {}
        geos.forEach(function (g) { g.dispose(); }); mats.forEach(function (m) { m.dispose(); }); texs.forEach(function (x) { x.dispose(); });
        try { pm.dispose && pm.dispose(); } catch (e) {} try { renderer.dispose(); renderer.forceContextLoss(); } catch (e) {}
        root.remove(); if (GR.luckScene.last === api) GR.luckScene.last = null;
      }
    };
    GR.luckScene.last = api;   // handy for checking the scene from the console
    return api;
  };
})();
