/* Gate Rush — game engine: renderer, voxel batching, physics, camera, input, doors, particles, HUD, audio.
   The course itself lives in a map file (GR.maps.<id>.build(B)); the engine knows nothing about a particular map,
   so more maps can be added later without touching this file. Course direction: forward = -Z, right = +X. */
(function () {
  var GR = (window.GR = window.GR || {});
  GR.maps = GR.maps || {};

  var PR = 0.34, PH = 0.85, MAXSP = 9.5, GRAV = 34, JUMP_V = 12.2, STEP = 0.45, CELL = 12;
  // dive (second jump press in the air): forward burst, small pop, belly landing and a short get-up
  var DIVE_SP = 13.5, DIVE_VY = 5.2, DIVE_REC = 0.35;
  // wrong door: about 2 units of backward stagger, control back after 0.35 s
  var KNOCK_V = 7, STG_T = 0.5;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var damp = function (a, b, k, dt) { return a + (b - a) * (1 - Math.exp(-k * dt)); };
  var toward = function (a, b, d) { return a < b ? Math.min(a + d, b) : Math.max(a - d, b); };
  var smooth = function (x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  var angDiff = function (a, b) { var d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

  /* =====================================================================================  AUDIO */
  function Sfx(on) {
    var ctx = null, master = null, enabled = on;
    function init() {
      if (ctx) return ctx;
      try { var AC = window.AudioContext || window.webkitAudioContext; ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.35; master.connect(ctx.destination); } catch (e) { ctx = null; }
      return ctx;
    }
    function tone(f, dur, type, vol, slide, delay) {
      if (!enabled || !init()) return; var t = ctx.currentTime + (delay || 0), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || "square"; o.frequency.setValueAtTime(f, t); slide && o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t + dur);
      g.gain.setValueAtTime(vol || 0.2, t); g.gain.exponentialRampToValueAtTime(0.0008, t + dur); o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
    }
    function noise(dur, vol, freq) {
      if (!enabled || !init()) return; var n = Math.floor(ctx.sampleRate * dur), buf = ctx.createBuffer(1, n, ctx.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = buf; f.type = "lowpass"; f.frequency.value = freq || 1800;
      g.gain.value = vol || 0.3; s.connect(f); f.connect(g); g.connect(master); s.start();
    }
    return {
      unlock: function () { if (init() && ctx.state === "suspended") ctx.resume(); },
      set: function (v) { enabled = v; }, get: function () { return enabled; },
      jump: function () { tone(330, 0.16, "square", 0.12, 760); },
      dive: function () { noise(0.16, 0.16, 1500); tone(520, 0.14, "triangle", 0.12, 240); },
      land: function () { noise(0.07, 0.12, 700); },
      coin: function () { tone(988, 0.07, "square", 0.12); tone(1319, 0.14, "square", 0.12, null, 0.06); },
      correct: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.18, "triangle", 0.2, null, i * 0.07); }); },
      smash: function () { noise(0.35, 0.5, 2600); tone(120, 0.25, "sawtooth", 0.2, 50); },
      wrong: function () { tone(190, 0.3, "sawtooth", 0.22, 110); tone(150, 0.3, "sawtooth", 0.2, 80, 0.12); },
      hit: function () { noise(0.15, 0.4, 900); tone(160, 0.2, "square", 0.18, 70); },
      pad: function () { tone(280, 0.3, "sine", 0.25, 900); },
      beep: function (hi) { tone(hi ? 880 : 520, hi ? 0.4 : 0.15, "square", 0.18); },
      fall: function () { tone(500, 0.6, "sine", 0.18, 90); },
      finish: function () { [523, 659, 784, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.22, "triangle", 0.22, null, i * 0.11); }); },
      close: function () { try { ctx && ctx.close(); } catch (e) {} }
    };
  }

  /* =====================================================================================  GAME */
  GR.Game = function (o) {
    var T = o.T, host = o.host, el = o.container, map = o.map || GR.maps.fort, questions = o.questions || [];
    var disposed = false, raf = 0, listeners = [], timers = [];
    var sfx = Sfx(host.soundOn());
    function on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); listeners.push([t, ev, fn, opt]); }

    /* ---------- renderer, quality ---------- */
    var mobile = false; try { mobile = matchMedia("(pointer: coarse)").matches || innerWidth < 700; } catch (e) {}
    var Q = mobile ? 1 : 2, QCFG = [
      { dpr: 1, shadow: 0, parts: 0.4, fog: [40, 150] },
      { dpr: Math.min(window.devicePixelRatio || 1, 1.5), shadow: 1024, parts: 0.7, fog: [55, 200] },
      { dpr: Math.min(window.devicePixelRatio || 1, 2), shadow: 2048, parts: 1, fog: [70, 260] }
    ];
    var renderer = new T.WebGLRenderer({ antialias: !mobile, alpha: false, powerPreference: "high-performance" });
    renderer.outputColorSpace = T.SRGBColorSpace; renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    var canvas = renderer.domElement; canvas.className = "grx-canvas"; el.appendChild(canvas);
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(62, 1, 0.3, 420);
    // the map's world: sky, fog, light, the ground far below, drifting particles (epz-patch:maps). Sunrise Fort has none, so it looks as before.
    var ENV = map.env || {}, FOGK = ENV.fogK || 1;
    var HORIZON = new T.Color(ENV.sky || "#CDE9F2"); scene.background = HORIZON; scene.fog = new T.Fog(HORIZON, 55, 200);
    var hemi = new T.HemisphereLight(ENV.hemi ? ENV.hemi[0] : "#DFF0FF", ENV.hemi ? ENV.hemi[1] : "#B79A6A", ENV.hemi ? ENV.hemi[2] : 0.95); scene.add(hemi);
    var sun = new T.DirectionalLight(ENV.sun ? ENV.sun[0] : "#FFF1D0", ENV.sun ? ENV.sun[1] : 1.25); sun.castShadow = true; scene.add(sun, sun.target);
    var sc = sun.shadow.camera; sc.left = -26; sc.right = 26; sc.top = 26; sc.bottom = -26; sc.near = 1; sc.far = 90; sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04;

    function applyQuality(q) {
      Q = q; var c = QCFG[q]; renderer.setPixelRatio(c.dpr); resize();
      var shadowOn = c.shadow > 0; if (sun.castShadow !== shadowOn || (shadowOn && sun.shadow.mapSize.x !== c.shadow)) {
        sun.castShadow = shadowOn; if (shadowOn) { sun.shadow.mapSize.set(c.shadow, c.shadow); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; } }
        scene.traverse(function (m) { if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) { x.needsUpdate = true; }); });
      }
      scene.fog.near = c.fog[0] * FOGK; scene.fog.far = c.fog[1] * FOGK;
    }
    function resize() {
      var w = Math.max(2, el.clientWidth), h = Math.max(2, el.clientHeight); renderer.setSize(w, h, false);
      var asp = w / h; camera.aspect = asp; camera.fov = clamp(2 * Math.atan(Math.tan(0.78) / asp) * 180 / Math.PI, 56, 84); camera.updateProjectionMatrix();
      view.asp = asp;
    }
    var view = { asp: 1.7 };
    on(window, "resize", resize); on(window, "orientationchange", function () { timers.push(setTimeout(resize, 250)); });

    /* ---------- block texture + cached geometry / materials ---------- */
    var texs = [], geos = [], mats = {};
    var blockTex = (function () {
      var c = document.createElement("canvas"); c.width = c.height = 32; var g = c.getContext("2d");
      g.fillStyle = "#F2F2F2"; g.fillRect(0, 0, 32, 32);
      for (var i = 0; i < 46; i++) { g.fillStyle = "rgba(0,0,0," + (0.03 + Math.random() * 0.05) + ")"; g.fillRect(Math.floor(Math.random() * 16) * 2, Math.floor(Math.random() * 16) * 2, 2, 2); }
      g.fillStyle = "rgba(0,0,0,.20)"; g.fillRect(0, 0, 32, 1.5); g.fillRect(0, 0, 1.5, 32); g.fillStyle = "rgba(255,255,255,.22)"; g.fillRect(0, 30.5, 32, 1.5); g.fillRect(30.5, 0, 1.5, 32);
      var t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.colorSpace = T.SRGBColorSpace; t.magFilter = T.NearestFilter; t.minFilter = T.LinearMipmapLinearFilter; t.anisotropy = 4; texs.push(t); return t;
    })();
    function matFor(color, extra) {
      var k = color + (extra ? JSON.stringify(extra) : ""); if (mats[k]) return mats[k];
      var p = Object.assign({ color: color, map: blockTex, vertexColors: true }, extra || {}); return (mats[k] = new T.MeshLambertMaterial(p));
    }
    var FACES = [
      { n: [1, 0, 0], v: [[1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]], u: 2, w: 1, s: 0.84 },
      { n: [-1, 0, 0], v: [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]], u: 2, w: 1, s: 0.84 },
      { n: [0, 1, 0], v: [[-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]], u: 0, w: 2, s: 1 },
      { n: [0, -1, 0], v: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], u: 0, w: 2, s: 0.6 },
      { n: [0, 0, 1], v: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], u: 0, w: 1, s: 0.9 },
      { n: [0, 0, -1], v: [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]], u: 0, w: 1, s: 0.9 }
    ];
    function Batch() { this.p = []; this.n = []; this.c = []; this.u = []; this.i = []; this.col = new T.Color(); }
    Batch.prototype.box = function (cx, cy, cz, sx, sy, sz, color, jit) {
      var h = [sx / 2, sy / 2, sz / 2], c = [cx, cy, cz], col = this.col.set(color), j = 1 + (jit === undefined ? (Math.random() - 0.5) * 0.08 : jit);
      for (var f = 0; f < 6; f++) {
        var F = FACES[f], base = this.p.length / 3;
        for (var k = 0; k < 4; k++) {
          var w = [c[0] + F.v[k][0] * h[0], c[1] + F.v[k][1] * h[1], c[2] + F.v[k][2] * h[2]];
          this.p.push(w[0], w[1], w[2]); this.n.push(F.n[0], F.n[1], F.n[2]); this.c.push(col.r * F.s * j, col.g * F.s * j, col.b * F.s * j); this.u.push(w[F.u], w[F.w]);
        }
        this.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
      }
    };
    Batch.prototype.mesh = function (material) {
      var g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(this.p, 3)); g.setAttribute("normal", new T.Float32BufferAttribute(this.n, 3));
      g.setAttribute("color", new T.Float32BufferAttribute(this.c, 3)); g.setAttribute("uv", new T.Float32BufferAttribute(this.u, 2)); g.setIndex(this.i); g.computeBoundingSphere(); geos.push(g);
      var m = new T.Mesh(g, material); m.receiveShadow = true; m.castShadow = true; return m;
    };
    var boxGeos = {};
    function boxGeo(sx, sy, sz) {
      var k = sx + "," + sy + "," + sz; if (boxGeos[k]) return boxGeos[k];
      var b = new Batch(); b.box(0, 0, 0, sx, sy, sz, "#FFFFFF", 0);
      var u = b.u; for (var i = 0; i < u.length; i += 2) { /* start texture at a corner so tiles line up */ u[i] += sx / 2 + 0; u[i + 1] += (sy > 0 ? sy / 2 : 0); }
      var g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(b.p, 3)); g.setAttribute("normal", new T.Float32BufferAttribute(b.n, 3));
      g.setAttribute("color", new T.Float32BufferAttribute(b.c, 3)); g.setAttribute("uv", new T.Float32BufferAttribute(b.u, 2)); g.setIndex(b.i); geos.push(g); return (boxGeos[k] = g);
    }
    function dynBox(sx, sy, sz, color, extra) { var m = new T.Mesh(boxGeo(sx, sy, sz), matFor(color, extra)); m.castShadow = true; m.receiveShadow = true; scene.add(m); return m; }

    /* ---------- world containers ---------- */
    var batch = new Batch(), solids = [], dyn = [], grid = {}, hazards = [], updaters = [], gates = [], coins = [], checkpoints = [], decoBatch = new Batch(), zones = [];
    var simT = 0, finishF = 0, startPos = { x: 0, y: 0, z: 0 }, stamp = 0, S = null;
    function mkSolid(minx, maxx, miny, maxy, minz, maxz, extra) {
      var s = Object.assign({ minx: minx, maxx: maxx, miny: miny, maxy: maxy, minz: minz, maxz: maxz, on: true, dx: 0, dy: 0, dz: 0, vx: 0, vy: 0, vz: 0, stamp: 0 }, extra || {});
      s.cx = (minx + maxx) / 2; s.cy = (miny + maxy) / 2; s.cz = (minz + maxz) / 2; return s;
    }
    function gridAdd(s) { for (var c = Math.floor(s.minz / CELL); c <= Math.floor(s.maxz / CELL); c++) (grid[c] || (grid[c] = [])).push(s); }
    function setBox(s, cx, cy, cz, hx, hy, hz) { s.minx = cx - hx; s.maxx = cx + hx; s.miny = cy - hy; s.maxy = cy + hy; s.minz = cz - hz; s.maxz = cz + hz; s.cx = cx; s.cy = cy; s.cz = cz; }

    /* ---------- the builder handed to the map ---------- */
    var B = {
      time: function () { return simT; },
      // static solid box. f is the distance along the course (z = -f).
      block: function (x0, x1, f0, f1, y0, y1, color, noSolid) {
        batch.box((x0 + x1) / 2, (y0 + y1) / 2, -(f0 + f1) / 2, x1 - x0, y1 - y0, f1 - f0, color);
        if (!noSolid) { var s = mkSolid(x0, x1, y0, y1, -f1, -f0); solids.push(s); gridAdd(s); return s; }
      },
      slab: function (x0, x1, f0, f1, top, th, color) { return B.block(x0, x1, f0, f1, top - th, top, color); },
      deco: function (x0, x1, f0, f1, y0, y1, color) { decoBatch.box((x0 + x1) / 2, (y0 + y1) / 2, -(f0 + f1) / 2, x1 - x0, y1 - y0, f1 - f0, color); },
      mover: function (d) {   // d: { x, y, f, w, d, th, color, fn: function(t) -> [x, f] (centre) }
        var m = dynBox(d.w, d.th, d.d, d.color), s = mkSolid(0, 1, 0, 1, 0, 1, { mesh: m, kind: "mover" });
        var upd = function () {
          var p = d.fn(simT), nx = p[0], nz = -p[1], ny = (p.length > 2 ? p[2] : d.y) - d.th / 2;
          var ox = s.cx, oy = s.cy, oz = s.cz; setBox(s, nx, ny, nz, d.w / 2, d.th / 2, d.d / 2); s.dx = s.cx - ox; s.dy = s.cy - oy; s.dz = s.cz - oz;
          if (ox === 0 && oy === 0 && oz === 0) { s.dx = s.dy = s.dz = 0; } m.position.set(nx, ny, nz);
        };
        updaters.push(upd); upd(); dyn.push(s); return s;
      },
      tiles: function (d) {   // disappearing floor tile: on for d.on seconds of every d.period
        var m = dynBox(d.w, d.th, d.d, d.color), s = mkSolid(d.x - d.w / 2, d.x + d.w / 2, d.y - d.th, d.y, -d.f - d.d / 2, -d.f + d.d / 2, { mesh: m, kind: "tile" });
        m.position.set(d.x, d.y - d.th / 2, -d.f); gridAdd(s); solids.push(s);
        updaters.push(function () {
          var t = (simT + d.phase) % d.period, vis = t < d.on, warn = vis && t > d.on - 0.9;
          s.on = vis && t < d.on - 0.12; m.visible = vis && !(warn && Math.floor(t * 12) % 2 === 0);
          m.position.y = d.y - d.th / 2 + (warn ? Math.sin(simT * 60) * 0.03 : 0);
        });
        return s;
      },
      faller: function (d) {  // falls shortly after it is stepped on, comes back later
        var m = dynBox(d.w, d.th, d.d, d.color), s = mkSolid(d.x - d.w / 2, d.x + d.w / 2, d.y - d.th, d.y, -d.f - d.d / 2, -d.f + d.d / 2, { mesh: m, kind: "faller" });
        var st = { s: "idle", t: 0, vy: 0, dy: 0 }; m.position.set(d.x, d.y - d.th / 2, -d.f); gridAdd(s); solids.push(s);
        updaters.push(function (dt) {
          if (st.s === "idle") { m.position.y = d.y - d.th / 2; m.scale.setScalar(Math.min(1, m.scale.x + dt * 5)); if (S && S.gs === s) { st.s = "shake"; st.t = 0; } }
          else if (st.s === "shake") { st.t += dt; m.position.x = d.x + (Math.random() - 0.5) * 0.09; if (st.t > 0.6) { st.s = "fall"; st.t = 0; st.vy = 0; s.on = false; } }
          else if (st.s === "fall") { st.t += dt; st.vy -= 30 * dt; m.position.y += st.vy * dt; m.rotation.x += dt * 0.8; if (st.t > 2.4) { st.s = "gone"; st.t = 0; m.visible = false; } }
          else if (st.s === "gone") { st.t += dt; if (st.t > 2.2) { st.s = "idle"; s.on = true; m.visible = true; m.rotation.set(0, 0, 0); m.position.set(d.x, d.y - d.th / 2, -d.f); m.scale.setScalar(0.2); } }
        });
        return s;
      },
      pad: function (d) {
        var s = B.block(d.x - d.w / 2, d.x + d.w / 2, d.f - d.d / 2, d.f + d.d / 2, d.y - 0.5, d.y, "#3DDC84"); s.pad = true;
        decoBatch.box(d.x, d.y + 0.04, -d.f, d.w * 0.7, 0.08, d.d * 0.7, "#FFFFFF", 0); return s;
      },
      sweeper: function (d) { // spinning bar around a post
        var g = new T.Group(); g.position.set(d.x, d.y, -d.f); scene.add(g);
        var bar = dynBox(d.len * 2, 0.5, 0.5, "#E5484D"); bar.position.y = 0.5; g.add(bar); scene.remove(bar); g.add(bar);
        [-1, 1].forEach(function (k) { var cap = dynBox(0.9, 0.62, 0.62, "#FFFFFF"); scene.remove(cap); cap.position.set(k * (d.len - 0.45), 0.5, 0); g.add(cap); });
        var post = dynBox(0.7, 1.4, 0.7, "#2A2540"); scene.remove(post); post.position.y = 0.7; g.add(post);
        var hz = { x: d.x, z: -d.f, y: d.y, len: d.len, a: 0, kind: "sweeper" };
        updaters.push(function () { hz.a = d.phase + simT * d.speed; g.rotation.y = -hz.a; });
        hazards.push(function (p, out) {
          // bar spans from hub - dir*len to hub + dir*len; dir in the XZ plane at angle hz.a (g.rotation.y = -a means dir = (cos a, sin a))
          if (p.y - PH > hz.y + 0.9 || p.y + PH < hz.y + 0.1) return false;
          var dx = Math.cos(hz.a), dz = Math.sin(hz.a), rx = p.x - hz.x, rz = p.z - hz.z, t = clamp(rx * dx + rz * dz, -hz.len, hz.len);
          var nx = hz.x + dx * t, nz = hz.z + dz * t, ex = p.x - nx, ez = p.z - nz, dd = Math.sqrt(ex * ex + ez * ez);
          if (dd > PR + 0.28) return false;
          var l = dd || 1; out.x = ex / l * 0.6 + (-dz) * Math.sign(d.speed) * 0.4; out.z = ez / l * 0.6 + dx * Math.sign(d.speed) * 0.4; return true;
        });
        return hz;
      },
      hammer: function (d) {  // pendulum swinging across the lane
        var g = new T.Group(); g.position.set(d.x, d.y + d.piv, -d.f); scene.add(g);
        var arm = dynBox(0.35, d.len, 0.35, "#5A3A22"); scene.remove(arm); arm.position.y = -d.len / 2; g.add(arm);
        var head = dynBox(1.6, 1.5, 1.5, "#E5484D"); scene.remove(head); head.position.y = -d.len; g.add(head);
        var cap = dynBox(1.7, 0.35, 1.6, "#FFFFFF"); scene.remove(cap); cap.position.y = -d.len + 0.58; g.add(cap);
        decoBatch.box(d.x, d.y + d.piv + 0.4, -d.f, 0.8, 0.8, 0.8, "#2A2540"); decoBatch.box(d.x - 5.4, d.y + d.piv / 2 + 0.4, -d.f, 0.6, d.piv + 0.8, 0.6, "#2A2540"); decoBatch.box(d.x + 5.4, d.y + d.piv / 2 + 0.4, -d.f, 0.6, d.piv + 0.8, 0.6, "#2A2540"); decoBatch.box(d.x, d.y + d.piv + 0.9, -d.f, 11.4, 0.5, 0.6, "#2A2540");
        var hh = { x: 0, y: 0, z: -d.f };
        updaters.push(function () { var a = d.amp * Math.sin(simT * d.speed + d.phase); g.rotation.z = a; hh.x = d.x + d.len * Math.sin(a); hh.y = d.y + d.piv - d.len * Math.cos(a); });
        hazards.push(function (p, out) {
          var best = 1e9, py = clamp(hh.y, p.y - PH + 0.3, p.y + PH - 0.3), ex = p.x - hh.x, ey = p.y - hh.y, ez = p.z - hh.z; best = Math.sqrt(ex * ex + (py - hh.y) * (py - hh.y) + ez * ez);
          if (best > 0.85 + PR) return false; var l = Math.sqrt(ex * ex + ez * ez) || 1; out.x = ex / l * 0.5 + Math.cos(simT * d.speed + d.phase) * Math.sign(d.amp) * 0.5; out.z = ez / l * 0.3; return true;
        });
      },
      ball: function (d) {    // boulder rolling toward the runner along a lane
        var m = new T.Mesh(new T.IcosahedronGeometry(d.r, 1), new T.MeshLambertMaterial({ color: d.color || "#E58A2B", flatShading: true })); geos.push(m.geometry); m.castShadow = true; scene.add(m); mats["ball" + Math.random()] = m.material;
        var len = d.f1 - d.f0, b = { x: d.x, y: d.y + d.r, z: 0 };
        updaters.push(function () { var f = d.f1 - ((simT * d.speed + d.phase * len) % len); b.z = -f; m.position.set(b.x, b.y, b.z); m.rotation.x = -f / d.r * -1; });
        hazards.push(function (p, out) {
          var ex = p.x - b.x, ez = p.z - b.z, py = clamp(b.y, p.y - PH, p.y + PH), ey = py - b.y, dd = Math.sqrt(ex * ex + ey * ey + ez * ez);
          if (dd > d.r + PR - 0.05) return false; var l = Math.sqrt(ex * ex + ez * ez) || 1; out.x = ex / l * 0.7; out.z = 0.8; return true;
        });
      },
      slider: function (d) {  // wall sliding across the lane. h < 1.1 can be jumped over.
        var m = dynBox(d.w, d.h, 0.9, d.color || "#7C5CFA"), s = mkSolid(0, 1, 0, 1, 0, 1, { mesh: m, kind: "slider", hurt: true });
        var upd = function () {
          var nx = d.cx + d.amp * Math.sin(simT * d.speed + d.phase), ox = s.cx, oy = s.cy, oz = s.cz;
          setBox(s, nx, d.y + d.h / 2, -d.f, d.w / 2, d.h / 2, 0.45); s.dx = s.cx - ox; s.dy = 0; s.dz = 0; s.vx = s.dx / Math.max(1 / 240, lastDt); if (ox === 0 && oz === 0) { s.dx = 0; s.vx = 0; } m.position.set(nx, d.y + d.h / 2, -d.f);
        };
        updaters.push(upd); upd(); dyn.push(s); return s;
      },
      // ---- epz-patch:maps building blocks -------------------------------------------------------------
      // conveyor floor: carries you along (vf forward, vx sideways, units per second); the stripes scroll
      belt: function (d) {
        var c = document.createElement("canvas"); c.width = 32; c.height = 32; var g = c.getContext("2d"); g.fillStyle = d.color || "#3B4252"; g.fillRect(0, 0, 32, 32); g.fillStyle = d.stripe || "#F2B632";
        for (var i = 0; i < 2; i++) { g.beginPath(); g.moveTo(4, 14 + i * 16); g.lineTo(16, 4 + i * 16); g.lineTo(28, 14 + i * 16); g.lineTo(28, 18 + i * 16); g.lineTo(16, 8 + i * 16); g.lineTo(4, 18 + i * 16); g.fill(); }
        var t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping; t.magFilter = T.NearestFilter; t.colorSpace = T.SRGBColorSpace; texs.push(t);
        var w = d.x1 - d.x0, len = d.f1 - d.f0, th = d.th || 1, ang = Math.atan2(-(d.vx || 0), d.vf || 0); t.repeat.set(w / 2, len / 2); t.center.set(.5, .5); t.rotation = ang;
        var topM = new T.MeshLambertMaterial({ map: t }); mats["belt" + Math.random()] = topM;
        var m = new T.Mesh(boxGeo(w, th, len), [matFor("#2A2F36"), matFor("#2A2F36"), topM, matFor("#2A2F36"), matFor("#2A2F36"), matFor("#2A2F36")]); m.position.set((d.x0 + d.x1) / 2, d.top - th / 2, -(d.f0 + d.f1) / 2); m.receiveShadow = true; scene.add(m);
        var s = mkSolid(d.x0, d.x1, d.top - th, d.top, -d.f1, -d.f0, { belt: [d.vx || 0, -(d.vf || 0)] }); solids.push(s); gridAdd(s);
        var sp = Math.hypot(d.vx || 0, d.vf || 0) / 2; updaters.push(function (dt) { t.offset.y -= sp * dt; });
        return s;
      },
      // slippery floor: little grip, you keep sliding
      ice: function (x0, x1, f0, f1, top, th, color) { var s = B.block(x0, x1, f0, f1, top - (th || 1), top, color || "#BFE8F5"); s.ice = true; B.deco(x0 + .2, x1 - .2, f0 + .2, f1 - .2, top, top + .02, "#E8F8FF"); return s; },
      // spinning disc: a square floor whose top turns and carries you round (w = turns per second x 2pi)
      spin: function (d) {
        var r = d.r, s = B.block(d.x - r, d.x + r, d.f - r, d.f + r, (d.y || 0) - .8, d.y || 0, d.base || "#2A2F36"); s.spin = { cx: d.x, cz: -d.f, w: d.w };
        var gr = new T.Group(); gr.position.set(d.x, (d.y || 0) + .06, -d.f); scene.add(gr);
        var top = dynBox(r * 2 - .1, .12, r * 2 - .1, d.color || "#27C3C3"); scene.remove(top); gr.add(top);
        [0, 1].forEach(function (k) { var st = dynBox(r * 1.9, .14, .35, d.stripe || "#FFFFFF"); scene.remove(st); st.rotation.y = k * Math.PI / 2; gr.add(st); });
        updaters.push(function () { gr.rotation.y = -simT * d.w; });
        return s;
      },
      // wind zone: pushes you sideways (fx) or back (fb) while you are inside it; fans and streaks show it
      wind: function (d) {
        zones.push({ x0: d.x0, x1: d.x1, z0: -d.f1, z1: -d.f0, y0: d.y0 === undefined ? -3 : d.y0, y1: d.y1 === undefined ? 8 : d.y1, fx: d.fx || 0, fz: d.fb || 0, on: d.on || null });
        var side = (d.fx || 0) > 0 ? d.x0 - 1.2 : d.x1 + 1.2, fan = new T.Group(); fan.position.set(side, 1.6 + (d.y0 || 0), -(d.f0 + d.f1) / 2); scene.add(fan);
        var hub = dynBox(.4, 2.6, 2.6, "#2A2F36"); scene.remove(hub); fan.add(hub);
        var blades = new T.Group(); fan.add(blades); [0, 1].forEach(function (k) { var b = dynBox(.12, 2.4, .4, d.color || "#D9DDE2"); scene.remove(b); b.rotation.x = k * Math.PI / 2; blades.add(b); });
        updaters.push(function (dt) { var live = !d.on || d.on(simT); blades.rotation.x += dt * (live ? 18 : 2); });
      },
      coin: function (x, y, f) { coins.push({ x: x, y: y, z: -f, got: false }); },
      coinLine: function (x0, y0, f0, x1, y1, f1, n) { for (var i = 0; i < n; i++) { var t = n === 1 ? 0 : i / (n - 1); B.coin(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, f0 + (f1 - f0) * t); } },
      checkpoint: function (f, x, y) { checkpoints.push({ f: f, x: x || 0, y: y, z: -f }); },
      gate: function (f, top) { gates.push({ f: f, top: top, idx: gates.length }); return gates[gates.length - 1]; },
      finish: function (f, top) { finishF = f; B.finishTop = top; },
      start: function (x, y, f) { startPos = { x: x, y: y, z: -f }; },
      palm: function (x, y, f) {
        decoBatch.box(x, y + 1.4, -f, 0.5, 2.8, 0.5, "#8B5E34"); decoBatch.box(x + 0.15, y + 3.0, -f, 0.45, 1.0, 0.45, "#8B5E34");
        [[1.5, 0], [-1.5, 0], [0, 1.5], [0, -1.5]].forEach(function (a) { decoBatch.box(x + 0.3 + a[0], y + 3.7, -f + a[1], a[0] ? 2.2 : 0.7, 0.25, a[1] ? 2.2 : 0.7, "#2E9B4A"); });
      },
      lamp: function (x, y, f) { decoBatch.box(x, y + 1.1, -f, 0.3, 2.2, 0.3, "#3B2E22"); decoBatch.box(x, y + 2.4, -f, 0.7, 0.7, 0.7, "#FFD36B", 0); },
      flag: function (x, y, f, color) { decoBatch.box(x, y + 2, -f, 0.2, 4, 0.2, "#3B2E22"); decoBatch.box(x + 0.75, y + 3.4, -f, 1.3, 0.8, 0.12, color || "#0B7A63", 0); },
      rnd: function () { return Math.random(); }
    };
    var lastDt = 1 / 60;

    /* ---------- build the map ---------- */
    function buildWorld() {
      map.build(B, { gates: questions.length, easy: !!o.easy });
      // question gates (each frame is its own mesh so it can fade; their solids join the static collision grid)
      gates.forEach(function (g, i) { buildGate(g, questions[i] || null); });
      scene.add(batch.mesh(matFor("#FFFFFF"))); scene.add(decoBatch.mesh(matFor("#FFFFFF")));
      // sea far below (falling = splash), sky clouds
      var sea = new T.Mesh(new T.PlaneGeometry(900, 1400), new T.MeshLambertMaterial({ color: ENV.ground || "#2AA7B8", emissive: ENV.glow || "#000000" })); geos.push(sea.geometry); mats.sea = sea.material; sea.rotation.x = -Math.PI / 2; sea.position.set(0, -14.5, -finishF / 2); sea.receiveShadow = false; scene.add(sea);
      var cb = new Batch(); for (var i = 0; i < (ENV.clouds === false ? 0 : 34); i++) { var cx = (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 70), cz = -Math.random() * (finishF + 60), cy = 26 + Math.random() * 22; for (var k = 0; k < 4; k++) cb.box(cx + k * 3 - 4, cy + Math.random(), cz + (Math.random() - 0.5) * 3, 3 + Math.random() * 3, 1.6, 3 + Math.random() * 2, ENV.cloud || "#FFFFFF", 0); }
      if (ENV.stars) for (var st2 = 0; st2 < 160; st2++) { var a2 = Math.random() * 6.283, r2 = 90 + Math.random() * 60; cb.box(Math.cos(a2) * r2, 10 + Math.random() * 80, -Math.random() * (finishF + 80) + Math.sin(a2) * 40, .5, .5, .5, Math.random() < .2 ? "#FFE8A0" : "#FFFFFF", 0); }
      var cm = cb.mesh(new T.MeshLambertMaterial({ color: "#FFFFFF", vertexColors: true, map: null })); cm.castShadow = false; cm.receiveShadow = false; mats.cloud = cm.material; scene.add(cm);
      solids.forEach(function (s) { /* already gridded */ });
      // coins
      coinMesh = new T.InstancedMesh(coinGeo(), new T.MeshLambertMaterial({ color: "#FFC52E", emissive: "#6B4A00" }), Math.max(1, coins.length)); mats.coin = coinMesh.material; coinMesh.castShadow = false; coinMesh.frustumCulled = false; scene.add(coinMesh);
      checkpoints.sort(function (a, b) { return a.f - b.f; });
      // drifting particles of the map's world (leaves, sand, sparks, snow, confetti, bubbles, dust): one instanced mesh around the camera
      if (ENV.fx) {
        var FX = { leaves: [["#7BC043", "#F2B632", "#E8590C"], .22, -1.2, 1.6], sand: [["#E8C98F", "#D9B074"], .12, -.4, 4], sparks: [["#FFD36B", "#FF8A3D"], .12, 2.2, .6],
          snow: [["#FFFFFF", "#E3F2FF"], .16, -1.6, .5], confetti: [["#F2B632", "#27C3C3", "#E5484D", "#8B5CF6"], .18, -1.4, 1.2], bubbles: [["#BFE8F5", "#FFFFFF"], .16, 1.5, .4], dust: [["#C9B89A", "#FFFFFF"], .1, -.2, .8], stars: [["#FFFFFF", "#FFE8A0"], .1, 0, .2] }[ENV.fx] || null;
        if (FX) {
          var NF = Math.round(70 * QCFG[Q].parts) + 10, fm = new T.InstancedMesh(new T.BoxGeometry(FX[1], FX[1], FX[1] * .4), new T.MeshBasicMaterial({ color: "#FFFFFF" }), NF); geos.push(fm.geometry); mats.fx = fm.material; fm.frustumCulled = false;
          var fxP = []; for (var fi = 0; fi < NF; fi++) { fxP.push({ x: (Math.random() - .5) * 40, y: Math.random() * 16, z: -Math.random() * 50, s: Math.random() * 6 }); fm.setColorAt(fi, tmpC.set(FX[0][fi % FX[0].length])); }
          scene.add(fm); ambient = function (dt) {
            for (var i = 0; i < NF; i++) { var q = fxP[i]; q.y += FX[2] * dt; q.x += Math.sin(simT * .7 + q.s) * FX[3] * dt; q.s += dt;
              if (q.y < -2) q.y = 16; if (q.y > 18) q.y = -1; var zz = p.z + q.z + 18; if (zz > p.z + 22) q.z -= 50; if (zz < p.z - 30) q.z += 50;
              tmpO.position.set(p.x + q.x, p.y - 4 + q.y, p.z + q.z + 18); tmpO.rotation.set(q.s, q.s * .7, 0); tmpO.scale.setScalar(1); tmpO.updateMatrix(); fm.setMatrixAt(i, tmpO.matrix); }
            fm.instanceMatrix.needsUpdate = true;
          };
        }
      }
    }
    var ambient = null;
    var coinMesh = null; function coinGeo() { var g = new T.CylinderGeometry(0.36, 0.36, 0.09, 14); g.rotateX(Math.PI / 2); geos.push(g); return g; }

    /* ---------- question gates: three identical doors ---------- */
    var DOORX = [-3.1, 0, 3.1], DW = 2.7, DH = 4.2;
    function wrapText(g, text, maxW, lineH, maxLines) {
      var words = String(text).split(" "), lines = [], cur = "";
      words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
      lines.push(cur); return lines.slice(0, maxLines);
    }
    function doorTexture(idx, text) {
      var c = document.createElement("canvas"); c.width = 192; c.height = 300; var g = c.getContext("2d");
      g.fillStyle = "#B07A45"; g.fillRect(0, 0, 192, 300);
      for (var i = 0; i < 6; i++) { g.fillStyle = i % 2 ? "#A56F3C" : "#BA824C"; g.fillRect(i * 32, 0, 32, 300); g.fillStyle = "rgba(0,0,0,.25)"; g.fillRect(i * 32, 0, 2, 300); }
      g.fillStyle = "#5A3A22"; g.fillRect(0, 0, 192, 12); g.fillRect(0, 288, 192, 12); g.fillRect(0, 0, 12, 300); g.fillRect(180, 0, 12, 300);
      g.fillStyle = "#FFF6E2"; g.beginPath(); g.arc(96, 58, 32, 0, 7); g.fill(); g.strokeStyle = "#5A3A22"; g.lineWidth = 5; g.stroke();
      g.fillStyle = "#2A2540"; g.font = "900 40px system-ui,sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("ABC"[idx], 96, 60);
      g.fillStyle = "rgba(255,246,226,.96)"; g.fillRect(16, 110, 160, 170); g.strokeStyle = "#5A3A22"; g.lineWidth = 4; g.strokeRect(16, 110, 160, 170);
      var fs = 30; g.fillStyle = "#2A2540"; g.textBaseline = "alphabetic"; var lines;
      for (; fs >= 17; fs -= 2) { g.font = "800 " + fs + "px system-ui,sans-serif"; lines = wrapText(g, text, 144, fs * 1.15, 6); if (lines.length * fs * 1.15 <= 150 && String(lines.join(" ")).length >= String(text).length - 1) break; }
      var y0 = 195 - (lines.length - 1) * fs * 0.58 + fs * 0.3; lines.forEach(function (ln, i) { g.fillText(ln, 96, y0 + i * fs * 1.15); });
      var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; texs.push(t); return t;
    }
    function boardTexture(text, label) {
      var c = document.createElement("canvas"); c.width = 1024; c.height = 220; var g = c.getContext("2d");
      g.fillStyle = "#13232F"; g.fillRect(0, 0, 1024, 220); g.strokeStyle = "#F2B632"; g.lineWidth = 10; g.strokeRect(8, 8, 1008, 204);
      g.fillStyle = "#F2B632"; g.font = "900 34px system-ui,sans-serif"; g.textAlign = "left"; g.fillText(label, 36, 56);
      g.fillStyle = "#FFFFFF"; var fs = 56, lines; for (; fs >= 30; fs -= 4) { g.font = "800 " + fs + "px system-ui,sans-serif"; lines = wrapText(g, text, 940, fs * 1.15, 3); if (lines.length * fs * 1.15 <= 140) break; }
      lines.forEach(function (ln, i) { g.fillText(ln, 36, 100 + fs * 0.9 + i * fs * 1.15 - (lines.length > 1 ? 14 : 0)); });
      var t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.anisotropy = 4; texs.push(t); return t;
    }
    var woodSide = null, doorGeo = new T.BoxGeometry(1, 1, 1); geos.push(doorGeo);   // a stock box: it has one group per face, which the 6-material door needs
    function buildGate(g, q) {
      var z = -g.f, top = g.top, stone = (ENV.gate || [])[0] || "#D9C7A3", dark = (ENV.gate || [])[1] || "#8F7A55";
      // the frame gets its own mesh (same boxes, same solids as before) so it can turn see-through once the runner is past it
      var gb = new Batch();
      var gblock = function (x0, x1, f0, f1, y0, y1, color, noSolid) {
        gb.box((x0 + x1) / 2, (y0 + y1) / 2, -(f0 + f1) / 2, x1 - x0, y1 - y0, f1 - f0, color);
        if (!noSolid) { var so = mkSolid(x0, x1, y0, y1, -f1, -f0); solids.push(so); gridAdd(so); }
      };
      // frame: side towers, pillars between doors, lintel
      [-1, 1].forEach(function (k) { var x0 = Math.min(k * 4.5, k * 9), x1 = Math.max(k * 4.5, k * 9); gblock(x0, x1, g.f - 0.7, g.f + 0.7, top, top + 8.6, stone); gblock(x0, x1, g.f - 0.9, g.f + 0.9, top + 8.6, top + 9.4, dark, true); });
      [-1.55, 1.55].forEach(function (x) { gblock(x - 0.25, x + 0.25, g.f - 0.6, g.f + 0.6, top, top + DH + 0.3, stone); });
      gblock(-9, 9, g.f - 0.8, g.f + 0.8, top + DH, top + 8.6, stone);
      for (var b = -8; b <= 8; b += 2) gb.box(b, top + 9.1, z, 1.1, 0.8, 1.6, dark);
      g.frameMat = new T.MeshLambertMaterial({ color: "#FFFFFF", map: blockTex, vertexColors: true }); mats["gate" + g.idx] = g.frameMat;
      scene.add(gb.mesh(g.frameMat)); g.fade = 1; g.boardFade = 1;
      g.sideMat = new T.MeshLambertMaterial({ color: "#8E5E32" }); mats["gside" + g.idx] = g.sideMat;
      g.q = q; g.doors = []; g.state = "wait"; g.first = -1; g.prepared = false;
      if (!woodSide) woodSide = new T.MeshLambertMaterial({ color: "#8E5E32" }), mats.woodSide = woodSide;
      for (var i = 0; i < 3; i++) {
        var plain = new T.MeshLambertMaterial({ color: "#B07A45" }); mats["door" + g.idx + i] = plain;
        var mesh = new T.Mesh(doorGeo, [g.sideMat, g.sideMat, g.sideMat, g.sideMat, plain, g.sideMat]); mesh.scale.set(DW, DH, 0.5); mesh.position.set(DOORX[i], top + DH / 2, z); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
        var s = mkSolid(DOORX[i] - DW / 2, DOORX[i] + DW / 2, top, top + DH, z - 0.25, z + 0.25, { door: { gate: g, idx: i }, mesh: mesh }); solids.push(s); gridAdd(s); g.doors.push(s);
      }
      // question board over the doors
      var boardMat = new T.MeshBasicMaterial({ color: "#13232F" }); mats["board" + g.idx] = boardMat; g.boardMat = boardMat;
      var bm = new T.Mesh(new T.PlaneGeometry(8.6, 1.85), boardMat); geos.push(bm.geometry); bm.position.set(0, top + DH + 2.2, z + 0.82); scene.add(bm); g.board = bm;
    }
    function prepareGate(g) {
      if (g.prepared || !g.q) return; g.prepared = true;
      g.doors.forEach(function (s, i) { var m = s.mesh.material[4]; m.map = doorTexture(i, g.q.options[i]); m.color.set("#FFFFFF"); m.needsUpdate = true; });
      g.boardMat.map = boardTexture(g.q.prompt, "QUESTION " + (g.idx + 1) + " OF " + gates.length); g.boardMat.color.set("#FFFFFF"); g.boardMat.needsUpdate = true;
    }

    // a gate the runner has gone through turns see-through while the camera is still behind it, so the wall and the
    // question board never hide the character or the path ahead; its board fades out for good once it is answered and passed
    function setFade(m, a) {
      var tr = a < 0.995; if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = tr ? a : 1;
    }
    function updateGateFade(dt) {
      for (var i = 0; i < gates.length; i++) {
        var g = gates[i], passed = g.state === "done" && -p.z > g.f - 1, camBehind = camera.position.z > -g.f - 1.4;
        var tgt = passed && camBehind ? 0.15 : 1; if (g.fade === tgt && (!passed || g.boardFade === 0)) continue;
        g.fade = damp(g.fade, tgt, 9, dt); if (Math.abs(g.fade - tgt) < 0.003) g.fade = tgt;
        setFade(g.frameMat, g.fade); setFade(g.sideMat, g.fade); g.doors.forEach(function (d) { setFade(d.mesh.material[4], g.fade); });
        if (passed) { g.boardFade = Math.max(0, g.boardFade - dt / 0.3); setFade(g.boardMat, g.boardFade); if (g.boardFade === 0) g.board.visible = false; }
      }
    }

    /* ---------- particles (one instanced mesh) ---------- */
    var PN = 300, pm = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), new T.MeshLambertMaterial({ color: "#FFFFFF" }), PN); geos.push(pm.geometry); mats.part = pm.material; pm.frustumCulled = false; pm.castShadow = false; scene.add(pm);
    var P = { x: new Float32Array(PN), y: new Float32Array(PN), z: new Float32Array(PN), vx: new Float32Array(PN), vy: new Float32Array(PN), vz: new Float32Array(PN), life: new Float32Array(PN), max: new Float32Array(PN), sz: new Float32Array(PN), g: new Float32Array(PN), rx: new Float32Array(PN), ry: new Float32Array(PN) }, pHead = 0, tmpO = new T.Object3D(), tmpC = new T.Color();
    for (var pi = 0; pi < PN; pi++) { tmpO.scale.setScalar(0); tmpO.updateMatrix(); pm.setMatrixAt(pi, tmpO.matrix); pm.setColorAt(pi, tmpC.set("#fff")); }
    function spawn(x, y, z, vx, vy, vz, size, color, life, g) {
      var i = pHead; pHead = (pHead + 1) % PN; P.x[i] = x; P.y[i] = y; P.z[i] = z; P.vx[i] = vx; P.vy[i] = vy; P.vz[i] = vz; P.sz[i] = size; P.life[i] = P.max[i] = life; P.g[i] = g === undefined ? 24 : g; P.rx[i] = Math.random() * 6; P.ry[i] = Math.random() * 6; pm.setColorAt(i, tmpC.set(color)); pm.instanceColor.needsUpdate = true;
    }
    function burst(x, y, z, n, colors, speed, size, life, up, g) {
      n = Math.max(1, Math.round(n * QCFG[Q].parts));
      for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, s = speed * (0.4 + Math.random() * 0.8); spawn(x + (Math.random() - 0.5) * 0.4, y, z + (Math.random() - 0.5) * 0.4, Math.cos(a) * s, up * (0.5 + Math.random()), Math.sin(a) * s, size * (0.6 + Math.random() * 0.8), colors[i % colors.length], life * (0.7 + Math.random() * 0.6), g); }
    }
    function updateParticles(dt) {
      for (var i = 0; i < PN; i++) {
        if (P.life[i] <= 0) continue; P.life[i] -= dt;
        if (P.life[i] <= 0) { tmpO.scale.setScalar(0); tmpO.updateMatrix(); pm.setMatrixAt(i, tmpO.matrix); continue; }
        P.vy[i] -= P.g[i] * dt; P.x[i] += P.vx[i] * dt; P.y[i] += P.vy[i] * dt; P.z[i] += P.vz[i] * dt;
        var k = P.life[i] / P.max[i]; tmpO.position.set(P.x[i], P.y[i], P.z[i]); tmpO.rotation.set(P.rx[i] + P.vz[i] * 0.5 * (1 - k) * 3, P.ry[i] + P.vx[i] * 0.5 * (1 - k) * 3, 0); tmpO.scale.setScalar(P.sz[i] * (k < 0.3 ? k / 0.3 : 1)); tmpO.updateMatrix(); pm.setMatrixAt(i, tmpO.matrix);
      }
      pm.instanceMatrix.needsUpdate = true;
    }

    /* ---------- the player ---------- */
    var av = GR.avatar(T, o.cfg, o.colors); scene.add(av.root);
    // landing marker: a soft round shadow on whatever is under the runner (always on, also when real shadows are off)
    var blob = (function () {
      var c = document.createElement("canvas"); c.width = c.height = 64; var g = c.getContext("2d"), gr = g.createRadialGradient(32, 32, 4, 32, 32, 31);
      gr.addColorStop(0, "rgba(19,35,47,.55)"); gr.addColorStop(0.7, "rgba(19,35,47,.35)"); gr.addColorStop(1, "rgba(19,35,47,0)"); g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
      var t = new T.CanvasTexture(c); texs.push(t); var geo = new T.PlaneGeometry(1.3, 1.3); geo.rotateX(-Math.PI / 2); geos.push(geo);
      var m = new T.Mesh(geo, new T.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false })); mats.blob = m.material; m.renderOrder = 2; scene.add(m); return m;
    })();
    function placeBlob() {
      var feet = p.y - PH + 0.05, best = -1e9;
      near();
      for (var i = 0; i < cand.length; i++) { var s = cand[i]; if (s.on && !s.door && p.x > s.minx && p.x < s.maxx && p.z > s.minz && p.z < s.maxz && s.maxy <= feet && s.maxy > best) best = s.maxy; }
      if (best < -50) { blob.visible = false; return; }
      var hgt = feet - best, k = Math.max(0.45, 1 - hgt * 0.12); blob.visible = true; blob.position.set(p.x, best + 0.03, p.z); blob.scale.setScalar(k); blob.material.opacity = Math.max(0.35, 1 - hgt * 0.1);
    }
    var p = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, grounded: false, gs: null, face: Math.PI, stun: 0, inv: 0, coyote: 0, jbuf: 0, jholding: false, wasGround: false, turn: 0, cp: -1, celebrate: 0, doorCd: 0, dive: false, canDive: false, rec: 0, stg: 0, kick: null };
    S = p;
    var R = { correct: 0, wrong: 0, coins: 0, hits: 0, falls: 0, penaltyMs: 0, rawMs: 0, answers: [] };
    var state = "load", stateT = 0, hudAcc = 0, fade = 0, fadeDir = 0, nearGate = null;

    /* ---------- input ---------- */
    var keys = {}, joy = { x: 0, y: 0, id: null }, jumpHeld = false, jumpQueued = false, touchUI = mobile;
    function keyDown(e) {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target || {}).tagName || "")) return; var k = e.code;
      if (/^(Arrow|Space|Key[WASD])/.test(k)) e.preventDefault();
      if (k === "Space" && !keys.Space) jumpQueued = true;
      if (k === "Escape" || k === "KeyP") { togglePause(); return; }
      keys[k] = true;
    }
    function keyUp(e) { keys[e.code] = false; }
    on(window, "keydown", keyDown); on(window, "keyup", keyUp); on(window, "blur", function () { keys = {}; });
    function axis() {
      var x = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0), y = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
      x += joy.x; y += joy.y; var l = Math.sqrt(x * x + y * y); if (l > 1) { x /= l; y /= l; } return { x: x, y: y };
    }

    /* ---------- HUD ---------- */
    var hud = document.createElement("div"); hud.className = "grx-hud"; hud.innerHTML =
      '<div class="grx-top"><div class="grx-prog" aria-label="Progress"><i class="grx-pf"></i><span class="grx-pm"></span><b class="grx-me"></b></div>' +
      '<div class="grx-stats"><span class="grx-time">0:00.00</span><span class="grx-pen" hidden>+0s</span><span class="grx-coins"><i></i><b>0</b></span><button class="grx-pause" type="button" aria-label="Pause">II</button></div></div>' +
      '<div class="grx-q" hidden></div><div class="grx-banner" hidden></div><div class="grx-count" hidden></div><div class="grx-fade"></div>' +
      '<div class="grx-touch"><div class="grx-joy"><div class="grx-knob"></div></div><button class="grx-jump" type="button" aria-label="Jump">JUMP</button></div>' +
      '<div class="grx-load"><div class="grx-spin"></div><b>Gate Rush</b><span>Building the course…</span></div>';
    el.appendChild(hud);
    var $ = function (s) { return hud.querySelector(s); };
    var elTime = $(".grx-time"), elPen = $(".grx-pen"), elCoins = $(".grx-coins b"), elQ = $(".grx-q"), elBanner = $(".grx-banner"), elCount = $(".grx-count"), elFade = $(".grx-fade"), elPF = $(".grx-pf"), elMe = $(".grx-me"), elLoad = $(".grx-load");
    // joystick + jump (pointer events, fixed positions, no page scroll)
    (function () {
      var joyEl = $(".grx-joy"), knob = $(".grx-knob"), jb = $(".grx-jump"), R2 = 52;
      function setKnob(x, y) { knob.style.transform = "translate(" + x + "px," + y + "px)"; }
      function jmove(e) { var r = joyEl.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy, l = Math.sqrt(dx * dx + dy * dy) || 1, m = Math.min(l, R2); var nx = dx / l * m, ny = dy / l * m; setKnob(nx, ny); var mag = Math.max(0, (m / R2 - 0.12) / 0.88); joy.x = dx / l * mag; joy.y = -dy / l * mag; }
      joyEl.addEventListener("pointerdown", function (e) { e.preventDefault(); touchUI = true; joy.id = e.pointerId; try { joyEl.setPointerCapture(e.pointerId); } catch (x) {} jmove(e); sfx.unlock(); });
      joyEl.addEventListener("pointermove", function (e) { if (e.pointerId === joy.id) { e.preventDefault(); jmove(e); } });
      var jend = function (e) { if (e.pointerId === joy.id) { joy.id = null; joy.x = joy.y = 0; setKnob(0, 0); } };
      joyEl.addEventListener("pointerup", jend); joyEl.addEventListener("pointercancel", jend); joyEl.addEventListener("lostpointercapture", jend);
      jb.addEventListener("pointerdown", function (e) { e.preventDefault(); touchUI = true; jumpHeld = true; jumpQueued = true; jb.classList.add("on"); try { jb.setPointerCapture(e.pointerId); } catch (x) {} sfx.unlock(); });
      var jup = function () { jumpHeld = false; jb.classList.remove("on"); }; jb.addEventListener("pointerup", jup); jb.addEventListener("pointercancel", jup); jb.addEventListener("lostpointercapture", jup);
      ["touchmove", "touchstart"].forEach(function (ev) { hud.addEventListener(ev, function (e) { if (state !== "paused") e.preventDefault(); }, { passive: false }); });
      hud.addEventListener("contextmenu", function (e) { e.preventDefault(); });
      $(".grx-pause").addEventListener("click", function () { togglePause(); });
    })();
    function showTouch() { hud.classList.toggle("is-touch", touchUI); }
    // progress markers
    function buildProgress() { var pmk = $(".grx-pm"), h = ""; gates.forEach(function (g) { h += '<u style="left:' + (g.f / finishF * 100).toFixed(2) + '%"></u>'; }); h += '<s style="left:100%"></s>'; pmk.innerHTML = h; }

    var bannerT = 0;
    function banner(kind, title, sub, secs) {
      elBanner.className = "grx-banner " + kind; elBanner.innerHTML = "<b>" + title + "</b>" + (sub ? "<span>" + sub + "</span>" : ""); elBanner.hidden = false; elBanner.style.animation = "none"; void elBanner.offsetWidth; elBanner.style.animation = ""; bannerT = secs || 2.6;
    }
    var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
    function showQuestion(g) {
      if (!g || !g.q) { elQ.hidden = true; return; }
      elQ.innerHTML = '<em>Question ' + (g.idx + 1) + ' of ' + gates.length + '</em><b>' + esc(g.q.prompt) + '</b><div>' + g.q.options.map(function (t, i) { return '<span><i>' + "ABC"[i] + "</i>" + esc(t) + "</span>"; }).join("") + "</div>"; elQ.hidden = false;
    }
    function fmt(ms) { return GR.net.fmtTime(ms); }

    /* ---------- gameplay events ---------- */
    function addPenalty(ms) { R.penaltyMs += ms; elPen.hidden = false; elPen.textContent = "+" + (R.penaltyMs / 1000).toFixed(0) + "s"; elPen.classList.remove("pop"); void elPen.offsetWidth; elPen.classList.add("pop"); }
    function hurt(dirx, dirz, force) {
      if (p.inv > 0 || state !== "race") return;
      var l = Math.sqrt(dirx * dirx + dirz * dirz) || 1; p.vx = dirx / l * force; p.vz = dirz / l * force; p.vy = 8.5; p.grounded = false; p.gs = null; p.dive = false; p.rec = 0; p.stg = 0; p.kick = null; p.stun = 0.95; p.inv = 1.7; R.hits++;
      av.mood("dizzy", 1.2); sfx.hit(); burst(p.x, p.y, p.z, 10, ["#FFD93B", "#FFFFFF"], 4, 0.18, 0.6, 6);
    }
    function onDoor(s) {
      var g = s.door.gate, idx = s.door.idx;
      if (g.first < 0) {
        g.first = idx; var ok = idx === g.q.correct; R.answers.push({ q: g.q.prompt, ok: ok });
        if (ok) { R.correct++; } else { R.wrong++; }
      }
      if (idx === g.q.correct) {
        s.on = false; s.mesh.visible = false; g.state = "open"; sfx.smash();
        var wood = ["#B07A45", "#A56F3C", "#BA824C", "#8E5E32", "#5A3A22"];
        for (var i = 0; i < 46; i++) { var fx = (Math.random() - 0.5) * DW, fy = Math.random() * DH; spawn(s.cx + fx, s.miny + fy, s.cz, fx * 1.6 + p.vx * 0.2, 3 + Math.random() * 7, -6 - Math.random() * 8, 0.28 + Math.random() * 0.35, wood[i % 5], 1.5 + Math.random() * 0.8, 22); }
        burst(s.cx, s.miny + 2, s.cz, 16, ["#FFE08A", "#FFFFFF"], 5, 0.14, 0.8, 5, 8);
        if (g.first === idx) { sfx.correct(); av.mood("happy", 1.6); p.celebrate = 0.9; if (p.grounded) { p.vy = 7; p.grounded = false; } banner("ok", "Correct!", g.q.explanation ? esc(g.q.explanation) : "", 2.4); elQ.hidden = true; }
        else { banner("ok", "Door open!", "", 1.6); elQ.hidden = true; }
        g.state = "done";
        return "break";
      }
      if (p.doorCd <= 0) {
        p.doorCd = 0.9; if (!s.pen) { s.pen = true; addPenalty(2000); } sfx.wrong(); av.mood("sad", 1.8); p.dive = false; p.rec = 0; p.stun = 0.35; p.stg = STG_T; p.kick = [clamp((p.x - s.cx) * 1.5, -2.5, 2.5), KNOCK_V]; p.vy = 3.5; p.grounded = false; p.gs = null;
        burst(p.x, p.y, p.z - 0.4, 8, ["#B07A45", "#FFFFFF"], 3, 0.16, 0.6, 5);
        if (g.first === idx) banner("bad", "Not quite!", "The answer is <u>" + esc(g.q.options[g.q.correct]) + "</u>. " + (g.q.explanation ? esc(g.q.explanation) : "") + " Try another door!", 3.6);
        else banner("bad", "That door is locked", "Try another one.", 1.8);
      }
      return "bounce";
    }

    /* ---------- physics ---------- */
    var cand = [];
    function near() {
      cand.length = 0; stamp++;
      var c0 = Math.floor((p.z - 1) / CELL), c1 = Math.floor((p.z + 1) / CELL);
      for (var c = c0; c <= c1; c++) { var a = grid[c]; if (a) for (var i = 0; i < a.length; i++) { var s = a[i]; if (s.stamp !== stamp) { s.stamp = stamp; cand.push(s); } } }
      for (var j = 0; j < dyn.length; j++) cand.push(dyn[j]);
    }
    function overlaps(s) { return p.x + PR > s.minx && p.x - PR < s.maxx && p.y + PH > s.miny && p.y - PH < s.maxy && p.z + PR > s.minz && p.z - PR < s.maxz; }
    function collide(axis) {
      for (var i = 0; i < cand.length; i++) {
        var s = cand[i]; if (!s.on || !overlaps(s)) continue;
        if (s.door) { var r = onDoor(s); if (r === "break") continue; }
        if (s.hurt && axis !== 1) { hurt(p.x - s.cx, 0.0001, 11); }
        if (axis === 1) {
          if (p.y >= s.cy - 0.001 && (p.vy - s.vy <= 0.01 || p.y - PH > s.maxy - 0.6)) { p.y = s.maxy + PH; if (p.vy < 0) p.vy = 0; p.grounded = true; p.gs = s; }
          else { p.y = s.miny - PH; if (p.vy > 0) p.vy = 0; }
        } else {
          var feet = p.y - PH;
          if (!s.door && s.maxy - feet <= STEP && s.maxy - feet > 0 && p.vy <= 0.5) { p.y = s.maxy + PH; p.grounded = true; p.gs = s; continue; }
          if (axis === 0) { if (p.x < s.cx) p.x = s.minx - PR; else p.x = s.maxx + PR; if (p.vx * (p.x - s.cx) > 0) p.vx = 0; }
          else { if (p.z < s.cz) p.z = s.minz - PR; else p.z = s.maxz + PR; if (p.vz * (p.z - s.cz) > 0) p.vz = 0; }
        }
      }
    }
    var kb = { x: 0, z: 0 };
    function simStep(h) {
      lastDt = h; simT += h;
      updaters.forEach(function (u) { u(h); });
      p.inv = Math.max(0, p.inv - h); p.stun = Math.max(0, p.stun - h); p.doorCd = Math.max(0, p.doorCd - h); p.celebrate = Math.max(0, p.celebrate - h);
      if (state === "race" || state === "finish" || state === "count") {
        // ride the platform we stand on
        if (p.gs && p.gs.on && p.grounded) { p.x += p.gs.dx; p.y += p.gs.dy; p.z += p.gs.dz;
          if (p.gs.belt) { p.x += p.gs.belt[0] * h; p.z += p.gs.belt[1] * h; }
          if (p.gs.spin) { var sa = p.gs.spin.w * h, rx = p.x - p.gs.spin.cx, rz = p.z - p.gs.spin.cz; p.x = p.gs.spin.cx + rx * Math.cos(sa) - rz * Math.sin(sa); p.z = p.gs.spin.cz + rx * Math.sin(sa) + rz * Math.cos(sa); }
        }
        for (var zi = 0; zi < zones.length; zi++) { var zn = zones[zi]; if (p.x > zn.x0 && p.x < zn.x1 && p.z > zn.z0 && p.z < zn.z1 && p.y > zn.y0 && p.y < zn.y1 && (!zn.on || zn.on(simT))) { p.x += zn.fx * h; p.z += zn.fz * h; } }
        var a = (state === "race" && p.stun <= 0) ? axis() : { x: 0, y: 0 }, mag = Math.sqrt(a.x * a.x + a.y * a.y);
        var tvx = a.x * MAXSP, tvz = -a.y * MAXSP, acc = p.grounded ? (p.gs && p.gs.ice ? 9 : mag > 0.05 ? 58 : 66) : 36;   // good steering in the air; ice has little grip
        if (p.stun > 0) acc = p.grounded ? 14 : 3;
        if (state === "finish") { tvx = tvz = 0; acc = 45; p.face += angDiff(p.face, 0) * Math.min(1, 5 * h); }
        p.rec = Math.max(0, p.rec - h); p.stg = Math.max(0, p.stg - h);
        if (p.dive && !p.grounded) { tvx = p.ddx * DIVE_SP * 0.82 + a.x * 2.5; tvz = p.ddz * DIVE_SP * 0.82 - a.y * 2.5; acc = 5; }   // momentum carries the dive; only a light nudge
        else if (p.rec > 0 && p.grounded && p.stun <= 0) { tvx = tvz = 0; acc = 17; }   // belly slide, then get up
        p.vx = toward(p.vx, tvx, acc * h); p.vz = toward(p.vz, tvz, acc * h);
        // jump (buffered + coyote)
        if (p.grounded) p.coyote = 0.16; else p.coyote -= h;   // a little time to jump after running off an edge
        if (jumpQueued && state === "race" && !p.grounded && p.coyote <= 0 && p.canDive && !p.dive && p.stun <= 0 && p.rec <= 0) {
          // second press in the air: dive toward the held direction, or the way we face
          var dx = a.x, dz = -a.y, dl = Math.sqrt(dx * dx + dz * dz);
          if (dl < 0.2) { dx = Math.sin(p.face); dz = Math.cos(p.face); dl = 1; }
          p.ddx = dx / dl; p.ddz = dz / dl; p.dive = true; p.canDive = false; jumpQueued = false; p.jbuf = 0;
          var hs = Math.max(DIVE_SP, p.vx * p.ddx + p.vz * p.ddz); p.vx = p.ddx * hs; p.vz = p.ddz * hs; p.vy = DIVE_VY;
          sfx.dive(); av.mood("wow", 0.5); burst(p.x, p.y, p.z, 5, ["#FFFFFF", "#E9DFC9"], 1.8, 0.13, 0.35, 1.5, 4);
        }
        if (jumpQueued) { p.jbuf = 0.13; jumpQueued = false; } else p.jbuf -= h;
        var spaceHeld = keys.Space || jumpHeld;
        if (state === "race" && p.stun <= 0 && p.rec <= 0 && p.jbuf > 0 && p.coyote > 0) { p.vy = JUMP_V; p.canDive = true; p.grounded = false; p.gs = null; p.coyote = 0; p.jbuf = 0; sfx.jump(); burst(p.x, p.y - PH, p.z, 4, ["#FFFFFF", "#E9DFC9"], 1.6, 0.14, 0.4, 1.5, 4); }
        if (p.grounded) p.padUp = false;
        if (!spaceHeld && !p.dive && !p.padUp && p.vy > 3.5 && !p.grounded) p.vy -= 50 * h;   // let go early = shorter hop
        p.vy = Math.max(p.vy - GRAV * h, -32);
        // move axis by axis
        var preVy = p.vy; p.grounded = false; p.gs = null;
        near();
        p.x += p.vx * h; collide(0);
        p.z += p.vz * h; collide(2);
        p.y += p.vy * h; collide(1);
        // anything that moved into us
        for (var i = 0; i < dyn.length; i++) { var s = dyn[i]; if (s.on && overlaps(s) && (p.gs !== s)) {
          // a platform rising under you (pillar, lift, seesaw) lifts you onto it instead of shoving you sideways
          if (s.kind === "mover" && Math.abs(s.dx) + Math.abs(s.dz) < 1e-4 && s.dy > 0 && p.y - PH > s.maxy - 0.5) { p.y = s.maxy + PH; if (p.vy < 0) p.vy = 0; p.grounded = true; p.gs = s; break; }
          collide(0); collide(2); break; } }
        if (p.kick) { p.vx = p.kick[0]; p.vz = p.kick[1]; p.kick = null; }   // door knockback, set after the push-out
        if (p.grounded) { p.canDive = true; if (p.dive) { p.dive = false; p.rec = DIVE_REC; av.land(0.55); sfx.land(); burst(p.x, p.y - PH, p.z, 7, ["#FFFFFF", "#E9DFC9"], 2.4, 0.16, 0.45, 1.5, 4); } }
        if (p.grounded && !p.wasGround) { if (p.gs && p.gs.pad) p.rec = 0; if (preVy < -5) { av.land(Math.min(1, -preVy / 20)); sfx.land(); burst(p.x, p.y - PH, p.z, 5, ["#FFFFFF", "#E9DFC9"], 2, 0.16, 0.4, 1.5, 4); } if (p.gs && p.gs.pad) { p.vy = 20; p.grounded = false; p.gs = null; sfx.pad(); burst(p.x, p.y - PH, p.z, 12, ["#3DDC84", "#FFFFFF"], 3, 0.18, 0.6, 4); } }
        // pads on the topic maps also launch you when you run onto them (Sunrise Fort's pad still needs a landing, as before)
        if (p.grounded && p.wasGround && p.gs && p.gs.pad && p.gs.walk && state === "race") { p.padUp = true; p.vy = 20; p.grounded = false; p.gs = null; sfx.pad(); burst(p.x, p.y - PH, p.z, 12, ["#3DDC84", "#FFFFFF"], 3, 0.18, 0.6, 4); }
        p.wasGround = p.grounded;
        // hazards
        if (state === "race") { for (var hi = 0; hi < hazards.length; hi++) { if (hazards[hi](p, kb)) { hurt(kb.x, kb.z, 12); break; } } }
        // void
        if (p.y < -13 && state === "race") respawn();
        // facing
        if (state !== "finish" && (Math.abs(p.vx) > 0.6 || Math.abs(p.vz) > 0.6) && p.stun <= 0) { var want = Math.atan2(p.vx, p.vz), d = angDiff(p.face, want); p.turn = clamp(d * 2, -1, 1); p.face += d * Math.min(1, 16 * h); } else p.turn = damp(p.turn, 0, 10, h);
      }
    }
    function respawn() {
      var cp = checkpoints[Math.max(0, p.cp)] || { x: startPos.x, y: startPos.y, z: startPos.z };
      sfx.fall(); R.falls++; addPenalty(2000); banner("bad", "Splash!", "Back to the last checkpoint. +2s", 1.8);
      p.x = cp.x || 0; p.y = cp.y + PH + 0.3; p.z = cp.z; p.vx = p.vy = p.vz = 0; p.dive = false; p.canDive = false; p.rec = 0; p.stg = 0; p.kick = null; p.stun = 0.4; p.inv = 1.5; p.gs = null; p.grounded = false; camSnap = true; fade = 1; fadeDir = -1; av.mood("wow", 0.8);
    }

    /* ---------- camera ---------- */
    var cam = { x: 0, y: 6, z: 12, ly: 1, lx: 0, dist: 10.5, hgt: 5.6, ahead: 8 }, camSnap = true, orbit = 0;
    function updateCamera(dt) {
      var aspectK = clamp((1.3 - view.asp) / 0.9, 0, 1), tDist = 10.2 + aspectK * 4.5, tH = 5.5 + aspectK * 2.2, tAhead = 8;
      if (nearGate && nearGate.state !== "done") { tDist += 1.8; tH += 0.9; tAhead = 11; }
      var tx = p.x * 0.62, ty = p.y, tz = p.z + tDist;
      if (state === "intro") { /* overview flies in */ }
      var yTarget = ty + tH, k = camSnap ? 1000 : 1;
      cam.dist = damp(cam.dist, tDist, 2 * k, dt); cam.hgt = damp(cam.hgt, tH, 2 * k, dt); cam.ahead = damp(cam.ahead, tAhead, 2 * k, dt);
      cam.x = damp(cam.x, tx, 4.2 * k, dt); cam.ly = damp(cam.ly, ty, (p.grounded ? 4.5 : 2.2) * k, dt); cam.lx = damp(cam.lx, p.x * 0.8, 5 * k, dt);
      cam.z = p.z + cam.dist;
      var py = cam.ly + cam.hgt, lz = p.z - cam.ahead, ly = cam.ly + 1.1;
      if (state === "count" || state === "intro") {
        var u = smooth((stateT - (state === "intro" ? 0 : 0)) / (state === "intro" ? 1 : 1)), over = { x: 16, y: 20, z: p.z - 30, lx: 0, ly: 0, lz: p.z - 70 };
        var blend = state === "intro" ? 0 : smooth(stateT / 3.2); camera.position.set(over.x + (cam.x - over.x) * blend, over.y + (py - over.y) * blend, over.z + (cam.z - over.z) * blend); camera.lookAt(over.lx + (cam.lx - over.lx) * blend, over.ly + (ly - over.ly) * blend, over.lz + (lz - over.lz) * blend); return;
      }
      if (state === "finish") {
        orbit += dt * 0.55; var rr = 7, ang = orbit; var ox = p.x + Math.sin(ang) * rr * 0.55 - 0, oz = p.z + 3 + Math.cos(ang) * rr * 0.9;
        var bl = smooth(stateT / 1.4); camera.position.set(cam.x + (ox - cam.x) * bl, py - 1.4 * bl + 0.2, cam.z + (oz - cam.z) * bl); camera.lookAt(p.x, p.y + 0.4, p.z); return;
      }
      camera.position.set(cam.x, py, cam.z); camera.lookAt(cam.lx, ly, lz); camSnap = false;
    }

    /* ---------- state machine ---------- */
    function setState(s) { state = s; stateT = 0; }
    var countStep = -1;
    function updateState(dt) {
      stateT += dt;
      if (state === "intro") { if (stateT > 0.4) { setState("count"); countStep = -1; } }
      else if (state === "count") {
        var n = Math.floor(stateT / 0.85); if (n !== countStep) { countStep = n; if (n < 3) { elCount.hidden = false; elCount.textContent = String(3 - n); elCount.classList.remove("go"); sfx.beep(false); elCount.style.animation = "none"; void elCount.offsetWidth; elCount.style.animation = ""; } }
        if (stateT >= 2.7 + 0.05) { setState("race"); elCount.textContent = "GO!"; elCount.classList.add("go"); elCount.style.animation = "none"; void elCount.offsetWidth; elCount.style.animation = ""; sfx.beep(true); timers.push(setTimeout(function () { elCount.hidden = true; }, 700)); R.t0 = performance.now(); }
      }
      else if (state === "race") {
        R.rawMs += dt * 1000;
        if (-p.z >= finishF) finish();
      }
      else if (state === "finish") { if (stateT > 4.0 && !R.sent) { R.sent = true; deliver(); } }   // the victory dance plays alone for 4 s, then the results
    }
    function finish() {
      setState("finish"); p.celebrate = 99; p.dance = Math.floor(Math.random() * 4); av.mood("happy", 99); sfx.finish(); banner("ok", "FINISH!", "", 2.5); elQ.hidden = true;
      var cols = ["#F2B632", "#27C3C3", "#E5484D", "#8B5CF6", "#FFFFFF", "#3DDC84"];
      for (var w = 0; w < 4; w++) timers.push(setTimeout(function () { if (!disposed) burst(p.x, p.y + 3.2, p.z, 26, cols, 6.5, 0.3, 2.2, 8, 9); }, w * 260));
    }
    function deliver() {
      var res = { timeMs: Math.round(R.rawMs + R.penaltyMs), rawMs: Math.round(R.rawMs), penaltyMs: R.penaltyMs, correct: R.correct, wrong: R.wrong, total: gates.length, coins: R.coins, coinsTotal: coins.length, hits: R.hits, falls: R.falls, answers: R.answers };
      o.onFinish && o.onFinish(res);
    }

    /* ---------- pause ---------- */
    var pausedFrom = null, pauseEl = null;
    function togglePause(force) {
      if (disposed) return;
      if (pausedFrom && (force === undefined || force === false)) { resumeGame(); return; }
      if (!pausedFrom && (state === "race" || state === "count") && force !== false) {
        pausedFrom = state; state = "paused"; keys = {}; joy.x = joy.y = 0; jumpHeld = false;
        pauseEl = document.createElement("div"); pauseEl.className = "grx-pausebox";
        pauseEl.innerHTML = '<div><h3>Paused</h3><button class="grx-btn pri" data-a="resume" type="button">Resume</button><button class="grx-btn" data-a="sound" type="button">Sound: ' + (sfx.get() ? "On" : "Off") + '</button><button class="grx-btn" data-a="restart" type="button">Restart race</button><button class="grx-btn" data-a="quit" type="button">Leave race</button></div>';
        hud.appendChild(pauseEl);
        pauseEl.addEventListener("click", function (e) { var b = e.target.closest("[data-a]"); if (!b) return; var a = b.dataset.a; if (a === "resume") resumeGame(); else if (a === "sound") { sfx.set(!sfx.get()); host.setSound && host.setSound(sfx.get()); b.textContent = "Sound: " + (sfx.get() ? "On" : "Off"); } else if (a === "restart") { o.onRestart && o.onRestart(); } else if (a === "quit") { o.onExit && o.onExit(); } });
      }
    }
    function resumeGame() { if (!pausedFrom) return; state = pausedFrom; pausedFrom = null; last = performance.now(); pauseEl && pauseEl.remove(); pauseEl = null; }
    on(document, "visibilitychange", function () { if (document.hidden) togglePause(true); });

    /* ---------- main loop ---------- */
    var last = 0, fpsAcc = 0, fpsN = 0, fpsT = 0, qLock = 0, tick = 0, coinT = 0;
    function frame(now) {
      if (disposed) return; raf = requestAnimationFrame(frame);
      var raw = Math.min(0.1, (now - last) / 1000 || 0.016); last = now; var dt = Math.min(raw, 1 / 20);
      // adaptive quality: drop one step if the last 1.5 s averaged under ~42 fps
      if (state === "race" || state === "count") { fpsAcc += raw; fpsN++; fpsT += raw; if (fpsT > 1.6) { var avg = fpsAcc / fpsN; if (avg > 0.024 && Q > 0 && qLock <= 0) { applyQuality(Q - 1); qLock = 3; } qLock -= fpsT; fpsAcc = fpsN = fpsT = 0; } }
      if (state !== "paused" && state !== "load") {
        var n = Math.max(1, Math.ceil(dt / (1 / 90))), h = dt / n;
        for (var i = 0; i < n; i++) simStep(h);
        updateState(dt);
        // coins
        if (state === "race") for (var c = 0; c < coins.length; c++) { var co = coins[c]; if (!co.got && Math.abs(co.z - p.z) < 1.2 && Math.abs(co.x - p.x) < 1.2 && Math.abs(co.y - (p.y)) < 1.7) { co.got = true; R.coins++; elCoins.textContent = R.coins; sfx.coin(); burst(co.x, co.y, co.z, 6, ["#FFD93B", "#FFFFFF"], 2.5, 0.12, 0.5, 3, 4); } }
        // gates ahead: prepare textures, show the question card
        nearGate = null; for (var g = 0; g < gates.length; g++) { var gg = gates[g], d = gg.f - (-p.z); if (d > -3 && d < 170) prepareGate(gg); if (gg.state !== "done" && d > -1 && (!nearGate || gg.f < nearGate.f)) nearGate = gg; }
        var showQ = nearGate && (nearGate.f - (-p.z)) < 62 && state === "race"; if (showQ) { if (elQ.dataset.g !== String(nearGate.idx)) { elQ.dataset.g = nearGate.idx; showQuestion(nearGate); } } else if (!elQ.hidden && (!nearGate || state !== "race")) { elQ.hidden = true; elQ.dataset.g = ""; }
        // checkpoints
        for (var k = 0; k < checkpoints.length; k++) if (-p.z >= checkpoints[k].f && k > p.cp) p.cp = k;
        // avatar
        av.root.position.set(p.x, p.y - PH, p.z); av.root.rotation.y = p.face; placeBlob();
        var sp = Math.min(1, Math.sqrt(p.vx * p.vx + p.vz * p.vz) / MAXSP);
        av.update({ speed: sp, vy: p.vy, ground: p.grounded, pose: state === "finish" ? "dance" : p.celebrate > 0.05 && state !== "race" ? "celebrate" : p.stg > 0 ? "stagger" : p.stun > 0 ? "stun" : p.dive ? "dive" : p.rec > 0 ? "recover" : "run", rec: p.rec / DIVE_REC, dance: p.dance, stg: p.stg / STG_T, turn: p.turn }, dt);
        if (p.celebrate > 0 && state === "race") av.root.position.y += 0;
        // coins spin (only the ones near)
        coinT += dt; if (coinMesh) { for (var ci = 0; ci < coins.length; ci++) { var cc = coins[ci]; if (cc.got) { tmpO.scale.setScalar(0); } else if (Math.abs(cc.z - p.z) < 90) { tmpO.position.set(cc.x, cc.y + Math.sin(coinT * 3 + ci) * 0.12, cc.z); tmpO.rotation.set(0, coinT * 3 + ci, 0); tmpO.scale.setScalar(1); } else { tmpO.scale.setScalar(1); tmpO.position.set(cc.x, cc.y, cc.z); tmpO.rotation.set(0, ci, 0); } tmpO.updateMatrix(); coinMesh.setMatrixAt(ci, tmpO.matrix); } coinMesh.instanceMatrix.needsUpdate = true; }
        updateParticles(dt); updateCamera(dt); updateGateFade(dt); ambient && ambient(dt);
        // sun follows the runner (snapped, so shadows do not swim)
        var stp = 48 / (QCFG[Q].shadow || 1024) * 32, sx = Math.round(p.x / stp) * stp, sz = Math.round((p.z - 8) / stp) * stp;
        sun.position.set(sx - 16, 34, sz + 12); sun.target.position.set(sx, 0, sz); sun.target.updateMatrixWorld();
        // HUD
        elPF.style.transform = "scaleX(" + clamp(-p.z / finishF, 0, 1).toFixed(4) + ")"; elMe.style.left = (clamp(-p.z / finishF, 0, 1) * 100).toFixed(2) + "%";
        hudAcc += dt; if (hudAcc > 0.05) { hudAcc = 0; elTime.textContent = fmt(R.rawMs + R.penaltyMs); }
        if (bannerT > 0) { bannerT -= dt; if (bannerT <= 0) elBanner.hidden = true; }
        if (fadeDir) { fade = clamp(fade + fadeDir * dt * 2.2, 0, 1); elFade.style.opacity = fade; if (fade <= 0 || fade >= 1) fadeDir = 0; }
      }
      renderer.render(scene, camera);
    }

    /* ---------- start ---------- */
    function start() {
      applyQuality(Q); resize(); buildWorld(); buildProgress(); showTouch();
      p.x = startPos.x; p.y = startPos.y + PH + 0.05; p.z = startPos.z; p.cp = -1; p.face = Math.PI; camSnap = true;
      elMe.innerHTML = ""; renderer.compile(scene, camera);
      // warm up one frame so the first race frame is smooth
      for (var i = 0; i < 4; i++) simStep(1 / 60);
      setState("intro"); last = performance.now(); raf = requestAnimationFrame(frame);
      timers.push(setTimeout(function () { elLoad.classList.add("done"); timers.push(setTimeout(function () { elLoad.remove(); }, 500)); }, 250));
    }
    function dispose() {
      if (disposed) return; disposed = true; cancelAnimationFrame(raf); timers.forEach(clearTimeout);
      listeners.forEach(function (l) { l[0].removeEventListener(l[1], l[2], l[3]); });
      try { av.dispose(); } catch (e) {} geos.forEach(function (g) { g.dispose(); }); texs.forEach(function (t) { t.dispose(); }); Object.keys(mats).forEach(function (k) { try { mats[k].dispose(); } catch (e) {} });
      scene.traverse(function (m) { if (m.geometry) m.geometry.dispose(); if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach(function (x) { x.map && x.map.dispose(); x.dispose(); }); });
      if (sun.shadow.map) sun.shadow.map.dispose(); pm.dispose && pm.dispose(); coinMesh && coinMesh.dispose();
      renderer.dispose(); try { renderer.forceContextLoss(); } catch (e) {} sfx.close();
      canvas.remove(); hud.remove();
    }
    return { start: start, dispose: dispose, sfx: sfx, scene: scene, camera: camera, renderer: renderer, p: p, state: function () { return state; }, debug: { p: p, R: R, gates: gates, checkpoints: checkpoints, solids: solids, B: B, get Q() { return Q; }, get finishF() { return finishF; }, setState: setState } };
  };
})();
