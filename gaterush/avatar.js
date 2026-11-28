/* Gate Rush / EPZ — the student's block-style 3D character, built from the avatar settings (state.avatar after czCfg).
   Everything is made of boxes, with small pixel-art canvas textures for faces, fabrics and embroidery: no model files.
   One wardrobe: traditional Omani and modern items share the same slots and can be freely combined.
   Slots (cfg keys): face, cheeks, nose, eyes, brows, mouth, mark, beard, hair, hairline, hat (+ mf = mussar fabric),
   cl (top), bottom, shoes, gl (glasses), neck, wrist, extra (bags, back items, khanjar, capes), pose; sizes in cfg.sz.
   Colours (second argument): skin, hair, eyes, top, top2 (trim / second colour), bottom, shoes, hat, acc (accessories).
   The rig (tilt > rig > body / legs, arms on the body, head on the body) is the one Gate Rush animates (run, jump, dive). */
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

  /* ------------------------------------------------------------------ colour helpers */
  function shade(hex, a) {
    var n = parseInt(String(hex).slice(1), 16), r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
    var f = function (v) { return Math.max(0, Math.min(255, Math.round(a < 0 ? v * (1 + a) : v + (255 - v) * a))); };
    return "#" + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  }
  function mix(a, b, t) {
    var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16), c = function (s) { return Math.round((x >> s & 255) * (1 - t) + (y >> s & 255) * t); };
    return "#" + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1);
  }
  function light(hex) { var n = parseInt(String(hex).slice(1), 16); return ((n >> 16 & 255) * .3 + (n >> 8 & 255) * .59 + (n & 255) * .11) > 170; }

  /* ------------------------------------------------------------------ data the wardrobe draws from (names live in the site's catalogue) */
  // head shapes: crown box W x (H - J) x D on top of a jaw box JW x J x JD (front faces line up, the face texture spans both)
  var SHAPES = {
    round: [.56, .54, .54, .17, .5, .52], oval: [.5, .6, .52, .21, .4, .48], square: [.62, .54, .56, .19, .62, .56], long: [.5, .66, .52, .23, .44, .5],
    wide: [.68, .5, .56, .15, .6, .54], heart: [.62, .56, .54, .2, .36, .46], strong: [.54, .56, .54, .21, .62, .58], soft: [.58, .54, .56, .2, .6, .56]
  };
  // kumma designs: [base, thread 1, thread 2, thread 3, pattern]
  var KUMMA = {
    kumma1: ["#F7F5EE", "#C8323A", "#0B7A63", "#2F6FDE", "diamond"], kumma2: ["#F7F5EE", "#1F5FA8", "#5AA6E0", "#0E3F7A", "stars"],
    kumma3: ["#1E2A4A", "#F2C230", "#FFFFFF", "#E0601C", "triangles"], kumma4: ["#EFE4CC", "#8A4B2A", "#C9772E", "#3B2A20", "lattice"],
    kumma5: ["#F7F5EE", "#178A4C", "#27A39B", "#0B5E3A", "vine"], kumma6: ["#F7F5EE", "#7A3E9D", "#D86AA8", "#4B2466", "chevron"],
    kumma7: ["#FBFAF5", "#D9D4C4", "#BDB6A2", "#E9E4D6", "eyelet"], kumma8: ["#BFDDF0", "#FFFFFF", "#1E3A6B", "#5C8FC4", "panels"],
    kumma9: ["#1B1B1F", "#C9CCD2", "#FFFFFF", "#7D8590", "lattice"], kumma10: ["#F7F5EE", "#1F9C9C", "#C9A46A", "#0F6B6B", "waves"],
    kumma11: ["#1E6B46", "#FFFFFF", "#E6C35A", "#9AD3B0", "stars"], kumma12: ["#7A1F2E", "#E6C35A", "#FFFFFF", "#C2414F", "diamond"],
    kumma13: ["#F7F5EE", "#D13A3A", "#F2B632", "#2F6FDE", "sunrays"], kumma14: ["#8E9399", "#C8323A", "#FFFFFF", "#1B1B1F", "checker"],
    kummag: ["#E9B53A", "#FFFFFF", "#B3262A", "#8A5A12", "royal"]
  };
  // mussar fabrics (mf): [base, motif, accent, border 1, border 2, weave]
  var FABRIC = [
    ["#BFDDF0", "#1F5FA8", "#C8323A", "#C8323A", "#E89A12", "paisley"], ["#8E2F3E", "#F2C230", "#FFFFFF", "#F2C230", "#1B1B1F", "paisley"],
    ["#F2E8D2", "#8A6A35", "#2F6FDE", "#2F6FDE", "#C8323A", "paisley"], ["#5B3A8E", "#E6C35A", "#C9B6F2", "#E6C35A", "#2B1E5A", "paisley"],
    ["#1E6B46", "#F2E8D2", "#E6C35A", "#E6C35A", "#7A1F2E", "paisley"], ["#D99AAE", "#7A2A4A", "#FFFFFF", "#7A2A4A", "#F2E8D2", "paisley"],
    ["#F2B632", "#B3262A", "#1F5FA8", "#B3262A", "#1B1B1F", "paisley"], ["#9AA4AE", "#E9EDF2", "#4A5560", "#1B1B1F", "#E9EDF2", "stripe"],
    ["#A67B50", "#5A3A22", "#E8D6B0", "#5A3A22", "#E8D6B0", "check"], ["#FBFAF5", "#E2DCCB", "#C9A227", "#C9A227", "#E2DCCB", "embroid"],
    ["#8FD0EA", "#6BB6D6", "#FFFFFF", "#FFFFFF", "#1E3A6B", "plain"], ["#1B1B1F", "#B3262A", "#E6C35A", "#B3262A", "#E6C35A", "paisley"]
  ];
  var FOOTBALL_NUM = "10";

  /* ------------------------------------------------------------------ pixel-art textures, shared by every character (cached by what they show) */
  var TEXC = new Map();
  function ctex(T, key, w, h, draw, rep) {
    var t = TEXC.get(key); if (t) return t;
    var c = document.createElement("canvas"); c.width = w; c.height = h; var g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    draw(g, w, h);
    t = new T.CanvasTexture(c); t.colorSpace = T.SRGBColorSpace; t.magFilter = T.NearestFilter; t.minFilter = T.LinearMipmapLinearFilter;
    if (rep) t.wrapS = t.wrapT = T.RepeatWrapping;
    TEXC.set(key, t);
    if (TEXC.size > 700) { var k0 = TEXC.keys().next().value; TEXC.get(k0).dispose(); TEXC.delete(k0); }   // three re-uploads a disposed texture if it is still in use
    return t;
  }
  function px(g, x, y, w, h, c) { g.fillStyle = c; g.fillRect(x, y, w, h); }
  function noise(g, w, h, col, amt, seed) { var s = seed || 7; for (var i = 0; i < w * h * amt; i++) { s = (s * 9301 + 49297) % 233280; var x = s % w; s = (s * 9301 + 49297) % 233280; px(g, x, s % h, 1, 1, col); } }
  function diamond(g, cx, cy, r, c) { for (var dy = -r; dy <= r; dy++) { var k = r - Math.abs(dy); px(g, cx - k, cy + dy, k * 2 + 1, 1, c); } }
  function star8(g, cx, cy, r, c, c2) { px(g, cx - r, cy, r * 2 + 1, 1, c); px(g, cx, cy - r, 1, r * 2 + 1, c); for (var k = 1; k < r; k++) { px(g, cx - k, cy - k, 1, 1, c); px(g, cx + k, cy - k, 1, 1, c); px(g, cx - k, cy + k, 1, 1, c); px(g, cx + k, cy + k, 1, 1, c); } px(g, cx, cy, 1, 1, c2 || c); }
  function text(g, s, x, y, size, c, outline) { g.font = "900 " + size + "px Arial, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; if (outline) { g.lineWidth = Math.max(1, size / 7); g.strokeStyle = outline; g.strokeText(s, x, y); } g.fillStyle = c; g.fillText(s, x, y); }

  // ---- kumma embroidery: a band around the cap (96 x 32) and the round top (48 x 48)
  function kummaSide(d) {
    return function (g, w, h) {
      var b = d[0], c1 = d[1], c2 = d[2], c3 = d[3], p = d[4], cols = [c1, c2, c3];
      px(g, 0, 0, w, h, b); noise(g, w, h, shade(b, -.06), .05, 3);
      px(g, 0, 0, w, 2, c1); px(g, 0, h - 5, w, 1, c1); px(g, 0, h - 3, w, 1, c2);   // top edge + stitched lower bands
      for (var x = 0; x < w; x += 4) px(g, x + 1, h - 2, 2, 1, c3);
      var i, y, k;
      if (p === "diamond" || p === "royal") { for (y = 7, k = 0; y < 26; y += 7, k++) for (x = (k % 2) * 6 + 3; x < w; x += 12) diamond(g, x, y, 3, cols[(x / 6 + k) % 3 | 0]); if (p === "royal") for (x = 0; x < w; x += 2) px(g, x, 3 + (x % 4 ? 0 : 1), 1, 1, c3); }
      else if (p === "stars") { for (y = 9, k = 0; y < 26; y += 10, k++) for (x = (k % 2) * 8 + 4; x < w; x += 16) star8(g, x, y, 4, cols[k % 3], c3); for (x = 0; x < w; x += 8) px(g, x + 4, 4, 1, 1, c2); }
      else if (p === "triangles") { for (x = 0; x < w; x += 8) { for (k = 0; k < 6; k++) px(g, x + k, h - 6 - (k < 3 ? k : 5 - k) * 2, 1, (k < 3 ? k : 5 - k) * 2 + 1, cols[(x / 8) % 3 | 0]); } for (x = 2; x < w; x += 6) px(g, x, 10, 2, 2, c2); for (x = 5; x < w; x += 6) px(g, x, 5, 1, 1, c3); }
      else if (p === "lattice") { for (y = 3; y < h - 5; y++) for (x = 0; x < w; x++) { if ((x + y) % 8 === 0 || ((x - y) % 8 + 8) % 8 === 0) px(g, x, y, 1, 1, c1); if ((x + y) % 8 === 0 && ((x - y) % 8 + 8) % 8 === 0) px(g, x, y, 1, 1, c2); } }
      else if (p === "vine") { for (x = 0; x < w; x++) { y = Math.round(15 + Math.sin(x / 5) * 6); px(g, x, y, 1, 2, c1); if (x % 10 === 0) { px(g, x, y - 4, 3, 3, c2); px(g, x + 1, y - 3, 1, 1, c3); } if (x % 10 === 5) px(g, x, y + 3, 3, 3, c2); } }
      else if (p === "chevron") { for (k = 0; k < 3; k++) for (x = 0; x < w; x++) { y = 6 + k * 7 + Math.abs((x % 8) - 4); px(g, x, y, 1, 2, cols[k]); } }
      else if (p === "eyelet") { for (y = 4, k = 0; y < h - 6; y += 4, k++) for (x = (k % 2) * 2; x < w; x += 4) { px(g, x, y, 2, 2, c1); px(g, x, y, 1, 1, c2); } px(g, 0, h - 5, w, 1, c3); }
      else if (p === "panels") { for (x = 0; x < w; x += 12) { for (y = 3; y < h - 5; y += 2) px(g, x, y, 1, 1, c2); px(g, x + 6, 3, 1, h - 8, c1); diamond(g, x + 3, 15, 2, c3); diamond(g, x + 9, 9, 2, c2); diamond(g, x + 9, 21, 2, c2); } }
      else if (p === "waves") { for (k = 0; k < 3; k++) for (x = 0; x < w; x++) { y = Math.round(7 + k * 7 + Math.sin((x + k * 4) / 3) * 2); px(g, x, y, 1, 1, cols[k]); } }
      else if (p === "sunrays") { for (x = 0, i = 0; x < w; x += 4, i++) { var hh = 8 + (i % 3) * 5; px(g, x, h - 6 - hh, 2, hh, cols[i % 3]); } for (x = 1; x < w; x += 8) diamond(g, x, 5, 2, c3); }
      else if (p === "checker") { for (y = 4; y < h - 6; y += 4) for (x = 0; x < w; x += 4) if (((x + y) / 4) % 2 === 0) { px(g, x, y, 3, 3, c1); px(g, x + 1, y + 1, 1, 1, c3); } }
    };
  }
  function kummaTop(d) {
    return function (g, w, h) {
      var b = d[0], cols = [d[1], d[2], d[3]], cx = w / 2, cy = h / 2;
      px(g, 0, 0, w, h, b);
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
        var dx = x - cx + .5, dy = y - cy + .5, r = Math.max(Math.abs(dx), Math.abs(dy)) * .7 + Math.min(Math.abs(dx), Math.abs(dy)) * .45, a = Math.atan2(dy, dx);
        if (Math.abs(r - 18) < .8 || Math.abs(r - 11) < .7) { px(g, x, y, 1, 1, cols[0]); continue; }
        if (r < 4) { px(g, x, y, 1, 1, cols[1]); continue; }
        if (r > 4 && r < 11 && Math.abs(Math.sin(a * 4)) > .92) px(g, x, y, 1, 1, cols[2]);
        if (r > 11 && r < 18 && Math.abs(Math.sin(a * 8)) > .9) px(g, x, y, 1, 1, cols[1]);
        if (d[4] === "eyelet" && r > 5 && (x + y) % 4 === 0 && x % 2 === 0) px(g, x, y, 1, 1, cols[0]);
      }
    };
  }
  // ---- mussar fabric tile (32 x 32, repeats) and its border (32 x 8)
  function fabric(f) {
    return function (g, w, h) {
      var b = f[0], m = f[1], a = f[2], t = f[5], x, y, k;
      px(g, 0, 0, w, h, b); noise(g, w, h, shade(b, -.05), .08, 11);
      if (t === "paisley") {
        for (y = 3, k = 0; y < h; y += 9, k++) for (x = (k % 2) * 6 + 3; x < w; x += 12) {
          var c = (x + y) % 2 ? a : m;
          px(g, x - 1, y, 3, 2, c); px(g, x, y - 1, 2, 1, c); px(g, x + 1, y - 2, 1, 1, c); px(g, x - 2, y + 2, 1, 1, (x + y) % 2 ? m : a);
        }
      } else if (t === "stripe") { for (y = 0; y < h; y += 6) { px(g, 0, y, w, 2, m); px(g, 0, y + 3, w, 1, a); } }
      else if (t === "check") { for (x = 0; x < w; x += 6) px(g, x, 0, 2, h, m); for (y = 0; y < h; y += 6) px(g, 0, y, w, 2, m); for (x = 3; x < w; x += 6) px(g, x, 0, 1, h, a); }
      else if (t === "embroid") { for (y = 2, k = 0; y < h; y += 7, k++) for (x = (k % 2) * 4 + 2; x < w; x += 8) { diamond(g, x, y + 2, 2, m); px(g, x, y + 2, 1, 1, a); } }
      else if (t === "plain") { for (y = 0; y < h; y += 2) px(g, 0, y, w, 1, shade(b, -.03)); }
    };
  }
  function fabricBorder(f) { return function (g, w, h) { px(g, 0, 0, w, h, f[0]); px(g, 0, 1, w, 2, f[3]); px(g, 0, 4, w, 1, f[4]); for (var x = 0; x < w; x += 3) px(g, x, 6, 1, 2, f[3]); }; }

  /* ------------------------------------------------------------------ the character */
  GR.avatar = function (T, cfg, colors) {
    cfg = cfg || {}; colors = colors || {};
    var mats = {}, geos = [], texs = [], root = new T.Group(), unit = new T.BoxGeometry(1, 1, 1); geos.push(unit);
    function mat(c) { return mats[c] || (mats[c] = new T.MeshLambertMaterial({ color: c })); }
    function tmat(tex, tint) { var k = "t" + tex.uuid + (tint || ""); return mats[k] || (mats[k] = new T.MeshLambertMaterial({ map: tex, color: tint || "#FFFFFF" })); }
    function tx(key, w, h, draw, rep) { return ctex(T, key, w, h, draw, rep); }
    function M(m) { return typeof m === "string" ? mat(m) : Array.isArray(m) ? m.map(M) : m; }
    function box(w, h, d, m, x, y, z, parent, o) {
      var mesh = new T.Mesh(unit, M(m)); mesh.scale.set(w, h, d); mesh.position.set(x, y, z);
      if (o) { if (o.rx) mesh.rotation.x = o.rx; if (o.ry) mesh.rotation.y = o.ry; if (o.rz) mesh.rotation.z = o.rz; }
      if (!(o && o.noShadow)) mesh.castShadow = true;
      (parent || root).add(mesh); return mesh;
    }
    // faces: [right, left, top, bottom, front, back]
    function faces(side, top, front, back, bot) { return [side, side, top || side, bot || side, front || side, back || side]; }

    var C = colors, skin = C.skin || "#C68258", hair = C.hair || "#3B2A20", top = C.top || "#FFFFFF", bottom = C.bottom || "#2E3440", shoesC = C.shoes || "#7A4B2A";
    var acc = C.acc || "#2B41C4", hatC = C.hat || top, skinD = shade(skin, -.1), skinDD = shade(skin, -.2);
    var cl = cfg.cl || "dish", SZ = cfg.sz || {}, BX = SZ.b || 1;
    var ROBES = { dish: 1, dishe: 1, dishs: 1, bisht: 1, bishtz: 1, bishtg: 1 }, robe = !!ROBES[cl], cloak = /^bisht/.test(cl);
    var top2 = C.top2 || ({ dish: shade(top, -.14), dishs: shade(top, -.1), dishe: "#C9A227", bisht: "#2B1E14", bishtz: "#4A3423", bishtg: "#141014", blazer: "#B3262A", check: "#B3262A", explorer: "#F2E8D2",
      stripe: "#1E2A4A", graphic: "#F2B632", polo: shade(top, -.25), bball: "#FFFFFF", bomber: "#E8590C", uniform: "#2B41C4", track: "#FFFFFF", jersey: "#FFFFFF", kit2: "#FFFFFF", kit3: "#FFFFFF", kit4: "#FFFFFF", denim: "#F4F7FB" }[cl] || shade(top, -.2));
    var GOLD = "#D9A93A";

    // ---- rig: tilt pivots at the hips (dive, stagger); the rig inside it is the standing character
    var tilt = new T.Group(); tilt.position.y = 0.6; root.add(tilt); var rig = new T.Group(); rig.position.y = -0.6; tilt.add(rig);
    var body = new T.Group(); body.position.y = 0.6; rig.add(body);          // pivot at the hips

    /* ================================================================ legs, trousers, shoes */
    var BOT = cfg.bottom || "trousers", shortsLike = BOT === "shorts" || BOT === "kitshorts", wrapLike = BOT === "wizar";
    function pantsTex(side) {
      var k = "pants|" + BOT + "|" + bottom + "|" + side;
      return tx(k, 26, 60, function (g, w, h) {
        var b = BOT === "jeans" ? bottom : bottom; px(g, 0, 0, w, h, b);
        if (BOT === "jeans") { noise(g, w, h, shade(b, .12), .12, 5); noise(g, w, h, shade(b, -.12), .08, 9); px(g, side ? w - 3 : 2, 0, 1, h, shade(b, .3)); if (!side) { px(g, 3, 4, 8, 1, shade(b, .3)); px(g, 10, 4, 1, 6, shade(b, .3)); } }
        else if (BOT === "joggers") { px(g, 0, h - 6, w, 6, shade(b, -.18)); for (var x = 0; x < w; x += 2) px(g, x, h - 6, 1, 6, shade(b, -.28)); if (side) px(g, w / 2 - 1, 0, 2, h - 6, shade(b, .25)); }
        else if (BOT === "track") { if (side) { px(g, w / 2 - 4, 0, 2, h, "#FFFFFF"); px(g, w / 2 + 2, 0, 2, h, "#FFFFFF"); } }
        else if (BOT === "cargo") { if (side) { px(g, 4, 22, w - 8, 14, shade(b, -.14)); px(g, 4, 22, w - 8, 3, shade(b, -.24)); px(g, w / 2, 27, 2, 2, shade(b, .3)); } noise(g, w, h, shade(b, .08), .05, 3); }
        else if (BOT === "formal") { if (!side) px(g, w / 2, 0, 1, h, shade(b, .18)); }
        else if (BOT === "shorts" || BOT === "kitshorts") { px(g, 0, h - 3, w, 3, shade(b, -.18)); if (BOT === "kitshorts" && side) px(g, w / 2 - 2, 0, 4, h, top2); }
        else { px(g, 0, 0, w, 3, shade(b, -.15)); }
      });
    }
    function wizarTex(part) {
      return tx("wizar|" + bottom + "|" + part, 36, 48, function (g, w, h) {
        var b = bottom, l = shade(b, .45), d = shade(b, -.25); px(g, 0, 0, w, h, b);
        for (var x = 0; x < w; x += 9) { px(g, x, 0, 3, h, l); px(g, x + 5, 0, 1, h, d); }
        for (var y = 0; y < h; y += 12) { px(g, 0, y, w, 2, l); }
        px(g, 0, h - 4, w, 4, d); for (var x2 = 0; x2 < w; x2 += 3) px(g, x2, h - 2, 1, 2, l);
      });
    }
    function shoe(g, s) {
      var S = cfg.shoes || "sandals", sc = shoesC, dk = shade(sc, -.35), sole = "#F4F4F0", y0 = -0.55;
      if (S === "sandals" || S === "slides") {
        box(0.3, 0.05, 0.42, shade(sc, -.15), 0, -0.585, 0.05, g);                        // thick sole
        box(0.26, 0.07, 0.36, skin, 0, -0.53, 0.05, g, { noShadow: true });               // the foot
        if (S === "sandals") { box(0.28, 0.035, 0.12, sc, 0, -0.5, 0.12, g); box(0.07, 0.04, 0.12, dk, s * 0.06, -0.495, 0.2, g); }   // cross strap + toe loop (Omani na'al)
        else box(0.28, 0.05, 0.16, acc, 0, -0.5, 0.06, g);
        return;
      }
      var hi = S === "hightops" ? 0.24 : S === "boots" ? 0.28 : 0.14, top3 = tx("shoe|" + S + "|" + sc, 16, 20, function (g2, w, h) {
        px(g2, 0, 0, w, h, sc);
        if (S === "sneakers" || S === "hightops" || S === "runners" || S === "boots" || S === "school") for (var y = 4; y < h - 2; y += 3) px(g2, 4, y, w - 8, 1, S === "boots" ? "#E8D6B0" : S === "school" ? "#2A2A2A" : "#FFFFFF");
        if (S === "loafers") { px(g2, 3, 6, w - 6, 3, dk); px(g2, w / 2 - 1, 9, 2, 3, GOLD); }
      });
      var sideT = tx("shoeS|" + S + "|" + sc, 20, 10, function (g2, w, h) {
        px(g2, 0, 0, w, h, sc);
        if (S === "sneakers" || S === "hightops") { px(g2, 3, 4, 12, 2, S === "hightops" ? "#FFFFFF" : shade(sc, light(sc) ? -.4 : .5)); }
        if (S === "runners") for (var i = 0; i < 3; i++) px(g2, 5 + i * 3, 2 + i, 2, 5, acc);
        if (S === "football") { px(g2, 2, 3, 16, 1, "#FFFFFF"); px(g2, 2, 5, 16, 1, "#FFFFFF"); }
        if (S === "school" || S === "loafers") px(g2, 1, 1, 4, 1, shade(sc, .35));
      });
      var mainM = [tmat(sideT), tmat(sideT), tmat(top3), mat(dk), mat(sc), mat(sc)];
      box(0.3, hi, 0.4, mainM, 0, -0.62 + 0.04 + hi / 2, 0.05, g);
      var soleC = S === "school" || S === "loafers" ? "#1B1B1F" : S === "boots" ? "#3B2A20" : S === "runners" ? acc : S === "football" ? "#1B1B1F" : sole;
      box(0.31, 0.045, 0.41, soleC, 0, -0.6, 0.05, g);
      if (S === "football") [-.1, .1].forEach(function (zz) { [-.08, .08].forEach(function (xx) { box(0.05, 0.03, 0.05, "#D9DDE2", xx, -0.635, 0.05 + zz, g, { noShadow: true }); }); });
      if (S === "hightops" || S === "boots") box(0.32, 0.04, 0.3, S === "boots" ? shade(sc, -.2) : "#FFFFFF", 0, -0.62 + 0.04 + hi, 0.02, g);
    }
    function leg(s) {
      var g = new T.Group(); g.position.set(s * 0.15, 0.6, 0); rig.add(g);
      var pf = tmat(pantsTex(0)), ps = tmat(pantsTex(1)), legM = [ps, ps, mat(bottom), mat(bottom), pf, pf];
      if (shortsLike) {
        box(0.27, 0.3, 0.31, legM, 0, -0.15, 0, g);
        box(0.25, 0.3, 0.29, skin, 0, -0.42, 0, g);
        if (BOT === "kitshorts") box(0.26, 0.17, 0.3, top2 === "#FFFFFF" ? "#FFFFFF" : top2, 0, -0.475, 0, g);
      } else box(0.26, 0.56, 0.3, legM, 0, -0.28, 0, g);
      shoe(g, s);
      // long robes (dishdasha, bisht) and the wizar: the lower half moves with each leg, so legs never poke through the cloth
      if (robe || wrapLike) {
        var lenR = robe ? 0.3 : 0.26, part = robe ? robeLegTex(s) : null;
        var fm = robe ? tmat(part) : tmat(wizarTex("f")), sm = robe ? mat(cloak ? top2 : top) : tmat(wizarTex("s"));
        box(0.35, lenR, 0.46, [sm, sm, fm, fm, fm, robe ? mat(cloak ? top2 : top) : tmat(wizarTex("f"))], -s * 0.025, -0.2 - lenR / 2, 0, g);
      }
      return g;
    }
    function robeLegTex(s) {
      return tx("robeLeg|" + cl + "|" + top + "|" + top2 + "|" + s, 35, 30, function (g, w, h) {
        px(g, 0, 0, w, h, top);
        if (cloak) { var cw = 22, x0 = s < 0 ? 0 : w - cw; px(g, x0, 0, cw, h, top2); px(g, s < 0 ? cw : w - cw - 2, 0, 2, h, GOLD); if (cl !== "bisht") px(g, s < 0 ? cw - 2 : w - cw + 2, 0, 1, h, shade(GOLD, .3)); }
        px(g, 0, h - 2, w, 2, shade(cloak ? top2 : top, -.08));
      });
    }
    var legL = leg(-1), legR = leg(1);

    /* ================================================================ torso and tops */
    var TOPS_SHORT = { tee: 1, vtee: 1, stripe: 1, graphic: 1, polo: 1, uniform: 1, jersey: 1, kit2: 1, kit3: 1, kit4: 1, explorer: 1 };
    var sleeve = cl === "bball" ? "none" : TOPS_SHORT[cl] ? "short" : cloak ? "cloak" : "long";
    function torsoFront(g, w, h) {
      var c = top, t = top2, d = shade(c, -.22), x, y, cx = w / 2;
      px(g, 0, 0, w, h, c);
      var neckU = function (col) { for (var i = 0; i < 4; i++) px(g, cx - 9 + i, i, 18 - i * 2, 1, col || d); };
      var neckV = function (col) { for (var i = 0; i < 9; i++) { px(g, cx - 8 + i, i, 1, 1, col || d); px(g, cx + 7 - i, i, 1, 1, col || d); } };
      var buttons = function (col, y0, n) { for (var i = 0; i < n; i++) px(g, cx - 1, y0 + i * 9, 2, 2, col); };
      var collar = function (col) { for (var i = 0; i < 6; i++) { px(g, cx - 12 + i, 0, 1, 7 - i, col); px(g, cx + 11 - i, 0, 1, 7 - i, col); } };
      if (robe) {
        // Omani dishdasha: collarless round neck, a short front opening with embroidery, plain long body (the tassel is 3D)
        for (var i2 = 0; i2 < 3; i2++) px(g, cx - 7 + i2, i2, 14 - i2 * 2, 1, shade(c, -.18));
        var em = cl === "dishe" ? t : shade(c, -.16), ln = cl === "dishs" ? 12 : 18;
        px(g, cx - 1, 3, 2, ln, em); if (cl !== "dishs") for (y = 3; y < 3 + ln; y += 3) { px(g, cx - 3, y, 1, 1, em); px(g, cx + 2, y, 1, 1, em); }
        for (x = cx - 7; x < cx + 7; x += 2) px(g, x, 3, 1, 1, em);
        if (cl === "dishe") { for (y = 4; y < 3 + ln; y += 4) { diamond(g, cx - 5, y, 1, t); diamond(g, cx + 4, y, 1, t); } px(g, cx - 8, 2, 16, 1, t); }
        if (cloak) {
          var cw = 22; px(g, 0, 0, cw, h, top2); px(g, w - cw, 0, cw, h, top2);
          px(g, cw - 2, 0, 2, h, GOLD); px(g, w - cw, 0, 2, h, GOLD);
          if (cl !== "bisht") { px(g, cw - 5, 0, 2, h, shade(GOLD, .3)); px(g, w - cw + 3, 0, 2, h, shade(GOLD, .3)); for (y = 0; y < h; y += 4) { px(g, cw - 4, y, 1, 1, GOLD); px(g, w - cw + 3, y, 1, 1, GOLD); } }
          if (cl === "bishtg") { for (y = 2; y < h; y += 6) { diamond(g, cw - 7, y, 1, GOLD); diamond(g, w - cw + 6, y, 1, GOLD); } }
        }
        return;
      }
      if (cl === "tee" || cl === "longsleeve") neckU();
      else if (cl === "vtee") neckV();
      else if (cl === "stripe") { for (y = 8; y < h; y += 9) px(g, 0, y, w, 4, t); neckU(shade(t, -.1)); }
      else if (cl === "graphic") { neckU(); star8(g, cx, 26, 9, t, shade(t, .4)); diamond(g, cx, 26, 3, t); text(g, "EPZ", cx, 44, 9, t); }
      else if (cl === "polo") { collar(t); px(g, cx - 2, 0, 4, 16, shade(c, -.1)); buttons("#FFFFFF", 5, 2); }
      else if (cl === "shirt" || cl === "uniform" || cl === "check") {
        if (cl === "check") { for (x = 0; x < w; x += 10) px(g, x, 0, 4, h, mix(c, t, .55)); for (y = 0; y < h; y += 10) px(g, 0, y, w, 4, mix(c, t, .45)); for (x = 0; x < w; x += 10) for (y = 0; y < h; y += 10) px(g, x, y, 4, 4, t); }
        collar(cl === "check" ? shade(c, .2) : shade(c, .35)); px(g, cx, 0, 1, h, shade(c, -.15)); buttons(cl === "check" ? "#F4F4F0" : shade(c, -.35), 9, 6);
        px(g, 8, 14, 14, 1, shade(c, -.18)); px(g, 8, 14, 1, 12, shade(c, -.18)); px(g, 21, 14, 1, 12, shade(c, -.18)); px(g, 8, 25, 14, 1, shade(c, -.18));
        if (cl === "uniform") { px(g, 11, 17, 8, 7, t); px(g, 12, 23, 6, 2, t); px(g, 14, 18, 2, 4, "#FFFFFF"); }
      }
      else if (cl === "hoodie" || cl === "ziphood") {
        neckU(shade(c, -.3)); px(g, cx - 6, 3, 1, 14, "#F4F4F0"); px(g, cx + 5, 3, 1, 14, "#F4F4F0");
        px(g, cx - 14, h - 22, 28, 16, shade(c, -.1)); px(g, cx - 14, h - 22, 28, 1, d); px(g, cx - 14, h - 22, 1, 16, d); px(g, cx + 13, h - 22, 1, 16, d);
        px(g, 0, h - 5, w, 5, shade(c, -.15));
        if (cl === "ziphood") { px(g, cx - 1, 0, 2, h, "#B9BEC6"); px(g, cx - 1, 0, 2, h - 22, "#9AA0A8"); px(g, cx - 2, 6, 4, 3, "#D9DDE2"); }
      }
      else if (cl === "sweatshirt" || cl === "sweater") {
        neckU(shade(c, -.25)); px(g, 0, h - 6, w, 6, shade(c, -.15)); for (x = 0; x < w; x += 2) px(g, x, h - 6, 1, 6, shade(c, -.25));
        if (cl === "sweatshirt") { star8(g, 16, 16, 3, t); }
        else { for (x = 0; x < w; x++) { y = 20 + Math.abs((x % 8) - 4); px(g, x, y, 1, 2, t); px(g, x, y + 6, 1, 1, shade(t, .4)); } for (x = 2; x < w; x += 8) diamond(g, x, 14, 2, shade(t, .3)); }
      }
      else if (cl === "jacket" || cl === "track" || cl === "bomber" || cl === "puffer") {
        px(g, cx - 1, 0, 2, h, cl === "track" ? "#FFFFFF" : "#B9BEC6"); px(g, cx - 2, 5, 4, 3, "#D9DDE2");
        if (cl === "jacket") { for (var j = 0; j < 8; j++) { px(g, 8 + j, 30 + j, 1, 1, d); px(g, w - 9 - j, 30 + j, 1, 1, d); } px(g, cx - 14, 0, 28, 3, shade(c, -.12)); }
        if (cl === "track") { px(g, cx - 12, 0, 24, 3, t); px(g, 10, 12, 3, 3, t); }
        if (cl === "bomber") { px(g, 0, 0, w, 4, t); px(g, 0, 1, w, 1, shade(t, -.3)); px(g, 0, h - 5, w, 5, t); px(g, 0, h - 3, w, 1, shade(t, -.3)); px(g, 8, 10, 10, 2, shade(c, -.2)); }
        if (cl === "puffer") { for (y = 7; y < h; y += 9) px(g, 0, y, w, 2, shade(c, -.25)); px(g, cx - 12, 0, 24, 4, shade(c, -.1)); }
      }
      else if (cl === "denim") {
        noise(g, w, h, shade(c, .15), .15, 4); noise(g, w, h, shade(c, -.15), .08, 6);
        px(g, cx - 8, 0, 16, 8, t); collar(shade(c, -.15)); px(g, cx, 8, 1, h - 8, shade(c, .3)); buttons("#C9A227", 12, 5);
        [10, w - 24].forEach(function (x0) { px(g, x0, 12, 14, 9, shade(c, -.1)); px(g, x0, 12, 14, 1, shade(c, .35)); px(g, x0 + 6, 18, 2, 2, "#C9A227"); });
      }
      else if (cl === "blazer") {
        for (y = 0; y < 30; y++) { var hw = Math.max(1, 13 - Math.floor(y * .43)); px(g, cx - hw, y, hw * 2, 1, "#F4F4F0"); }
        px(g, cx - 2, 2, 4, 3, t); for (y = 5; y < 34; y++) px(g, cx - 2 + (y > 28 ? 1 : 0), y, 4 - (y > 28 ? 2 : 0), 1, t);
        for (y = 0; y < 34; y++) { px(g, cx - 14 + Math.floor(y * .3), y, 3, 1, shade(c, -.25)); px(g, cx + 11 - Math.floor(y * .3), y, 3, 1, shade(c, -.25)); }
        px(g, cx - 1, 38, 2, 2, "#1B1B1F"); px(g, cx - 1, 47, 2, 2, "#1B1B1F"); px(g, 10, 14, 8, 2, t);
      }
      else if (/^(jersey|kit2|kit3|kit4|bball)$/.test(cl)) {
        if (cl === "kit2") for (x = 0; x < w; x += 12) px(g, x, 0, 6, h, t);
        if (cl === "kit3") for (y = 6; y < h; y += 12) px(g, 0, y, w, 6, t);
        if (cl === "kit4") for (y = 0; y < h; y++) px(g, Math.round(y * .9) - 4, y, 14, 1, t);
        if (cl === "bball") { px(g, 0, 0, 8, h, shade(c, -.15)); px(g, w - 8, 0, 8, h, shade(c, -.15)); text(g, FOOTBALL_NUM, cx, 30, 20, t, shade(c, -.4)); }
        neckV(t); px(g, cx - 9, 0, 18, 2, t);
        if (cl !== "bball") { px(g, 12, 12, 7, 8, t); px(g, 13, 19, 5, 2, t); px(g, 14, 14, 3, 4, c); }
        px(g, 0, h - 3, w, 3, shade(c, -.15));
      }
      else if (cl === "explorer") {
        px(g, cx - 9, 0, 18, h, t); neckU(shade(t, -.2));
        [[6, 14], [w - 20, 14], [6, 34], [w - 20, 34]].forEach(function (p) { px(g, p[0], p[1], 14, 12, shade(c, -.12)); px(g, p[0], p[1], 14, 3, shade(c, -.25)); px(g, p[0] + 6, p[1] + 3, 2, 2, "#5A3A22"); });
        px(g, cx - 10, 0, 1, h, shade(c, -.3)); px(g, cx + 9, 0, 1, h, shade(c, -.3));
      }
    }
    function torsoBack(g, w, h) {
      var c = top; px(g, 0, 0, w, h, cloak ? top2 : c);
      if (cl === "kit2") for (var x = 0; x < w; x += 12) px(g, x, 0, 6, h, top2);
      if (cl === "kit3") for (var y = 6; y < h; y += 12) px(g, 0, y, w, 6, top2);
      if (/^(jersey|kit2|kit3|kit4|bball)$/.test(cl)) { var bk = cl === "kit2" || cl === "kit3" ? c : top2; px(g, w / 2 - 14, 12, 28, 28, cl === "kit2" || cl === "kit3" ? top2 : c); text(g, FOOTBALL_NUM, w / 2, 27, 24, bk, null); }
      if (cl === "bomber") { px(g, 0, 0, w, 4, top2); px(g, 0, h - 5, w, 5, top2); }
      if (cl === "puffer") for (var y2 = 7; y2 < h; y2 += 9) px(g, 0, y2, w, 2, shade(c, -.25));
      if (cl === "hoodie" || cl === "ziphood" || cl === "sweatshirt" || cl === "sweater") px(g, 0, h - 5, w, 5, shade(c, -.15));
      if (cl === "explorer") { px(g, 0, 0, w, h, c); px(g, 8, 8, w - 16, 20, shade(c, -.1)); }
      if (cloak) { px(g, 0, 0, w, 3, GOLD); if (cl === "bishtg") for (var x2 = 2; x2 < w; x2 += 6) diamond(g, x2, 6, 1, GOLD); }
      if (cl === "denim") { noise(g, w, h, shade(c, .15), .15, 4); px(g, 6, 18, w - 12, 1, shade(c, .3)); }
    }
    var tKey = "torso|" + cl + "|" + top + "|" + top2;
    var frontT = tx(tKey + "|f", 66, 62, torsoFront), backT = tx(tKey + "|b", 66, 62, torsoBack);
    var sideC = cloak ? top2 : cl === "explorer" ? top : top, sideM = cl === "bomber" || cl === "puffer" ? mat(shade(top, -.04)) : mat(sideC);
    var torsoW = cl === "puffer" ? 0.72 : 0.66, torsoD = cl === "puffer" ? 0.46 : 0.4;
    box(torsoW, 0.62, torsoD, [sideM, sideM, mat(cloak ? top2 : top), mat(top), tmat(frontT), tmat(backT)], 0, 0.31, 0, body);
    if (cl === "explorer") { box(0.67, 0.2, 0.41, mat(top2), 0, 0.52, 0, body, { noShadow: true }); box(torsoW + 0.005, 0.62, torsoD + 0.005, [sideM, sideM, mat(top), mat(top), tmat(frontT), tmat(backT)], 0, 0.31, 0, body); }
    if (cl === "puffer") { box(0.5, 0.08, 0.36, shade(top, -.1), 0, 0.64, 0, body); }
    if (cl === "hoodie" || cl === "ziphood") { box(0.52, 0.22, 0.16, shade(top, -.08), 0, 0.58, -0.25, body); box(0.4, 0.14, 0.04, shade(top, -.3), 0, 0.6, -0.17, body, { noShadow: true }); }
    if (cl === "polo" || cl === "shirt" || cl === "uniform" || cl === "check" || cl === "denim") {   // a raised collar
      var colc = cl === "polo" ? top2 : cl === "check" ? shade(top, .2) : cl === "denim" ? shade(top, -.15) : shade(top, .35);
      box(0.2, 0.05, 0.05, colc, -0.12, 0.61, 0.19, body, { rz: 0.25 }); box(0.2, 0.05, 0.05, colc, 0.12, 0.61, 0.19, body, { rz: -0.25 });
      box(0.46, 0.05, 0.05, colc, 0, 0.63, -0.18, body);
    }
    if (cl === "blazer") { box(0.12, 0.3, 0.02, shade(top, -.25), -0.13, 0.47, 0.205, body, { rz: -0.2, noShadow: true }); box(0.12, 0.3, 0.02, shade(top, -.25), 0.13, 0.47, 0.205, body, { rz: 0.2, noShadow: true }); }
    if (robe) {
      // the hip part of the long robe; the rest moves with the legs (see leg())
      var hipT = tx("robeHip|" + cl + "|" + top + "|" + top2, 70, 24, function (g, w, h) {
        px(g, 0, 0, w, h, top); if (cloak) { px(g, 0, 0, 22, h, top2); px(g, w - 22, 0, 22, h, top2); px(g, 20, 0, 2, h, GOLD); px(g, w - 22, 0, 2, h, GOLD); }
      });
      var hs = mat(cloak ? top2 : top);
      box(0.7, 0.24, 0.46, [hs, hs, mat(top), mat(top), tmat(hipT), hs], 0, -0.1, 0, body);
      // the furakha: the dishdasha's tassel hanging from the neckline
      {
        var tc = cl === "dishe" ? top2 : shade(top, -.08), tl = cl === "dishs" ? 0.1 : 0.17;
        box(0.016, tl, 0.016, tc, 0.05, 0.6 - tl / 2, 0.208, body, { noShadow: true });
        box(0.045, 0.07, 0.035, tc, 0.05, 0.6 - tl - 0.03, 0.212, body);
        box(0.03, 0.02, 0.02, shade(tc, -.15), 0.05, 0.6 - tl + 0.005, 0.214, body, { noShadow: true });
      }
    }
    if (cloak) { box(0.7, 0.07, 0.44, GOLD, 0, 0.59, -0.01, body, { noShadow: true }); }   // the bisht's gold-trimmed collar

    /* ================================================================ arms (pivot at the shoulder) */
    function sleeveTex(s) {
      return tx("slv|" + cl + "|" + top + "|" + top2 + "|" + s, 22, 48, function (g, w, h) {
        var c = cloak ? top2 : cl === "explorer" ? top2 : top; px(g, 0, 0, w, h, c);
        if (cl === "track") { px(g, 6, 0, 3, h, top2); px(g, 12, 0, 3, h, top2); }
        if (cl === "bomber") { px(g, 0, h - 6, w, 6, top2); px(g, 4, 6, 10, 8, shade(c, -.2)); }
        if (/^(sweatshirt|sweater|hoodie|ziphood)$/.test(cl)) { px(g, 0, h - 6, w, 6, shade(c, -.15)); for (var x = 0; x < w; x += 2) px(g, x, h - 6, 1, 6, shade(c, -.25)); }
        if (cl === "puffer") for (var y = 6; y < h; y += 10) px(g, 0, y, w, 2, shade(c, -.25));
        if (cl === "stripe") for (var y2 = 2; y2 < h; y2 += 9) px(g, 0, y2, w, 4, top2);
        if (/^(jersey|kit2|kit3|kit4)$/.test(cl)) px(g, 0, h - 4, w, 4, top2);
        if (cl === "kit3") for (var y3 = 6; y3 < h - 4; y3 += 12) px(g, 0, y3, w, 6, top2);
        if (cloak) { px(g, 0, h - 4, w, 4, GOLD); if (cl !== "bisht") px(g, 0, h - 7, w, 1, GOLD); }
        if (cl === "check") { for (var x2 = 0; x2 < w; x2 += 10) px(g, x2, 0, 4, h, mix(top, top2, .55)); for (var y4 = 0; y4 < h; y4 += 10) px(g, 0, y4, w, 4, mix(top, top2, .45)); }
        if (cl === "denim") noise(g, w, h, shade(c, .15), .15, 4);
        if (cl === "blazer" || /^(shirt|uniform|check|dish|dishe|dishs)$/.test(cl)) px(g, 0, h - 4, w, 4, shade(c, cl === "blazer" ? -.15 : -.08));
      });
    }
    function arm(s) {
      var g = new T.Group(); g.position.set(s * 0.43, 0.56, 0); body.add(g);
      box(0.2, 0.6, 0.22, skin, 0, -0.28, 0, g);
      if (sleeve !== "none") {
        var len = sleeve === "short" ? 0.26 : sleeve === "cloak" ? 0.46 : 0.48, wd = sleeve === "cloak" ? 0.28 : cl === "puffer" ? 0.25 : 0.22, dp = sleeve === "cloak" ? 0.3 : cl === "puffer" ? 0.27 : 0.24;
        var sm = tmat(sleeveTex(s)), plain = mat(cloak ? top2 : cl === "explorer" ? top2 : top);
        box(wd, len, dp, [sm, sm, plain, plain, sm, sm], 0, -len / 2 + 0.02, 0, g);
        if (sleeve === "cloak") box(0.22, 0.48, 0.24, top, 0, -0.22, 0, g, { noShadow: true });   // the dishdasha sleeve inside the bisht sleeve
      }
      return g;
    }
    var armL = arm(-1), armR = arm(1);

    /* ================================================================ head */
    var SH = SHAPES[cfg.face] || SHAPES.round, HW = SH[0], HH = SH[1], HD = SH[2], HJ = SH[3], JW = SH[4], JD = SH[5];
    var head = new T.Group(); head.position.y = 0.62; body.add(head); head.scale.setScalar(SZ.hd || 1);
    // the face is drawn on one canvas that spans the whole front (crown + jaw); each box shows its own part of it
    var fc = document.createElement("canvas"); fc.width = fc.height = 128; var fx = fc.getContext("2d"); fx.scale(2, 2);
    var ftex = new T.CanvasTexture(fc); ftex.colorSpace = T.SRGBColorSpace; ftex.magFilter = T.NearestFilter; ftex.minFilter = T.LinearFilter; ftex.generateMipmaps = false; texs.push(ftex);
    var crownTex = ftex.clone(), jawTex = ftex.clone(); texs.push(crownTex, jawTex);
    crownTex.repeat.set(1, (HH - HJ) / HH); crownTex.offset.set(0, HJ / HH);
    jawTex.repeat.set(JW / HW, HJ / HH); jawTex.offset.set((1 - JW / HW) / 2, 0);
    var crownFace = new T.MeshLambertMaterial({ map: crownTex }), jawFace = new T.MeshLambertMaterial({ map: jawTex }); mats.crownFace = crownFace; mats.jawFace = jawFace;
    box(HW, HH - HJ, HD, [skin, skin, skin, skin, crownFace, skin], 0, HJ + (HH - HJ) / 2, 0, head);
    box(JW, HJ + 0.002, JD, [skinD, skinD, skin, skinD, jawFace, skinD], 0, HJ / 2, HD / 2 - JD / 2, head);
    box(0.24, 0.08, 0.22, skinD, 0, -0.02, -0.02, head, { noShadow: true });   // neck
    var fy = function (v) { return HH * (1 - v / 64); }, fxp = function (u) { return (u / 64 - .5) * HW; }, FZ = HD / 2;   // face canvas (64 x 64) -> head space
    // ears
    var hatV = cfg.hat || "none", earsHidden = hatV === "beaniew";
    if (!earsHidden) [-1, 1].forEach(function (s) { box(0.06, 0.13, 0.1, skinD, s * (HW / 2 + 0.025), fy(34), -0.02, head); box(0.02, 0.07, 0.05, skinDD, s * (HW / 2 + 0.05), fy(34), -0.01, head, { noShadow: true }); });
    // nose (3D)
    var NS = SZ.ns || 1, nose = cfg.nose || "button", ny = fy(38), nc = shade(skin, -.06);
    var nb = function (w, h, d, x, y, z, c, o) { box(w * NS, h * NS, d * NS, c || nc, x, y, FZ + z * NS, head, o || { noShadow: true }); };
    if (nose === "button") nb(0.07, 0.06, 0.05, 0, ny, 0.02);
    else if (nose === "small") nb(0.05, 0.045, 0.035, 0, ny, 0.015);
    else if (nose === "round") { nb(0.09, 0.08, 0.06, 0, ny - 0.005, 0.025); nb(0.05, 0.03, 0.02, 0, ny + 0.05, 0.01); }
    else if (nose === "wide") { nb(0.13, 0.06, 0.05, 0, ny - 0.01, 0.02); nb(0.05, 0.05, 0.03, 0, ny + 0.04, 0.012); }
    else if (nose === "long") { nb(0.055, 0.14, 0.045, 0, ny + 0.03, 0.02); nb(0.07, 0.05, 0.065, 0, ny - 0.035, 0.03); }
    else if (nose === "pointed") { nb(0.05, 0.1, 0.05, 0, ny + 0.02, 0.022); nb(0.04, 0.05, 0.09, 0, ny - 0.02, 0.04, shade(nc, .03)); }
    else if (nose === "roman") { nb(0.05, 0.13, 0.05, 0, ny + 0.035, 0.022); nb(0.05, 0.035, 0.08, 0, ny + 0.05, 0.035); nb(0.08, 0.05, 0.07, 0, ny - 0.03, 0.03); }
    else if (nose === "flat") nb(0.1, 0.04, 0.02, 0, ny - 0.01, 0.008);
    // cheeks
    var ck = cfg.cheeks || "none";
    if (ck === "round" || ck === "chubby") { var cw = ck === "chubby" ? 0.07 : 0.04, ch = ck === "chubby" ? 0.15 : 0.11; [-1, 1].forEach(function (s) { box(cw, ch, 0.16, skin, s * (Math.max(JW, HW * .8) / 2 + cw / 2 - 0.01), fy(46), FZ - 0.1, head); }); }
    // 3D full beard around the jaw
    if (cfg.beard === "full") { var bc = hair; [-1, 1].forEach(function (s) { box(0.05, HJ + 0.12, JD * 0.8, bc, s * (JW / 2 + 0.02), (HJ + 0.12) / 2, HD / 2 - JD / 2 - 0.02, head); }); box(JW + 0.08, 0.07, JD * 0.9, bc, 0, -0.02, HD / 2 - JD / 2 + 0.02, head); box(JW + 0.02, 0.08, 0.03, bc, 0, 0.04, FZ + 0.01, head); }

    /* ---- the face texture: eyes, brows, mouth, details, beard; the mood changes it */
    var curFace = "", EYEC = C.eyes || "#3B2A20", ES = SZ.es || 1, GAP = 13 + (SZ.ed || 0) * 1.5, BW = SZ.bw || 1;
    var EYES = {
      big: { r: [9, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 9], ir: [8, 10] }, round: { r: [5, 9, 11, 13, 13, 13, 13, 13, 11, 9, 5], ir: [9, 9] },
      almond: { r: [5, 9, 11, 12, 11, 9, 5], ir: [6, 7] }, narrow: { r: [8, 12, 12, 8], ir: [5, 4] }, sharp: { r: [5, 9, 11, 12, 11, 9, 5], ir: [6, 7], sl: 2, lid: .2 },
      droopy: { r: [5, 9, 11, 12, 11, 9, 5], ir: [6, 7], sl: -2, lid: .3 }, sparkle: { r: [5, 9, 11, 13, 13, 13, 13, 13, 11, 9, 5], ir: [10, 10], hi: 2 },
      lashes: { r: [9, 11, 11, 11, 11, 11, 11, 11, 11, 11, 9], ir: [8, 9], lash: 1 }, cool: { r: [9, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 9], ir: [8, 10], lid: .45 }
    };
    function drawEye(g, x, ey, side, def, mood, px2, py2) {
      var rows = def.r, n = rows.length, ink = "#1B1630", sl = def.sl || 0, lid = mood === "think" ? Math.max(def.lid || 0, .45) : def.lid || 0;
      var y0 = Math.round(ey - n * ES / 2);
      for (var i = 0; i < n; i++) {
        var wdt = Math.round(rows[i] * ES), yy = y0 + Math.round(i * ES);
        for (var k = 0; k < wdt; k++) {
          var dx = k - wdt / 2, sh = Math.round(sl * (dx / 6) * side), rh = Math.max(1, Math.round(ES));
          px(g, Math.round(x + dx), yy - sh, 1, rh, "#FFFFFF");
        }
      }
      var iw = Math.round(def.ir[0] * ES), ih = Math.round(def.ir[1] * ES);
      px(g, Math.round(x - iw / 2 + px2), Math.round(ey - ih / 2 + py2), iw, ih, EYEC);
      px(g, Math.round(x - iw / 4 + px2), Math.round(ey - ih / 4 + py2), Math.max(2, Math.round(iw / 2)), Math.max(2, Math.round(ih / 2)), ink);
      px(g, Math.round(x - iw / 2 + px2 + 1), Math.round(ey - ih / 2 + py2 + 1), 2, 2, "#FFFFFF");
      if (def.hi) { px(g, Math.round(x + iw / 4 + px2), Math.round(ey + ih / 6 + py2), 1, 1, "#FFFFFF"); px(g, Math.round(x + iw / 2 - 1), Math.round(y0 - 2), 1, 3, "#FFF6B0"); px(g, Math.round(x + iw / 2 - 2), Math.round(y0 - 1), 3, 1, "#FFF6B0"); }
      if (lid > 0) { px(g, Math.round(x - rows[0] * ES / 2 - 2), y0 - 2, Math.round(13 * ES) + 2, Math.round(n * ES * lid) + 2, skin); px(g, Math.round(x - rows[0] * ES / 2 - 2), y0 - 1 + Math.round(n * ES * lid), Math.round(13 * ES) + 2, 2, ink); }
      else px(g, Math.round(x - rows[0] * ES / 2), y0 - 1, Math.round(rows[0] * ES), 1, ink);
      if (def.lash) { var ox = Math.round(x + side * rows[0] * ES / 2); px(g, ox, y0 - 3, 2, 2, ink); px(g, ox + side * 2, y0 - 1, 2, 2, ink); px(g, Math.round(x - rows[0] * ES / 2), y0 - 2, Math.round(rows[0] * ES), 2, ink); }
    }
    function drawFace(mood, lx, ly, lid) {
      var qx = Math.round((lx || 0) * 2), qy = Math.round((ly || 0) * 2), closed = lid > 0.55 || mood === "blink";
      var key = mood + qx + "," + qy + (closed ? "c" : ""); if (key === curFace) return; curFace = key;
      var g = fx, ink = "#1B1630"; g.fillStyle = skin; g.fillRect(0, 0, 64, 64);
      g.fillStyle = ink; g.strokeStyle = ink; g.lineWidth = 4.5; g.lineCap = "round"; g.lineJoin = "round";
      var ex = [32 - GAP, 32 + GAP], ey = 27, pdx = qx * 1.6, pdy = qy * 1.4, style = cfg.eyes || "big";
      var arc = function (x, y, up) { g.lineWidth = 4; g.strokeStyle = ink; g.beginPath(); g.arc(x, y + (up ? 4 : -2), 6 * ES, up ? Math.PI * 1.1 : Math.PI * 0.15, up ? Math.PI * 1.9 : Math.PI * 0.85); g.stroke(); };
      // cheek details under the eyes
      var ck2 = cfg.cheeks || "none", mk = cfg.mark || "none";
      if (ck2 === "high") { px(g, 6, 38, 10, 2, skinD); px(g, 48, 38, 10, 2, skinD); px(g, 9, 40, 6, 1, skinD); px(g, 49, 40, 6, 1, skinD); }
      if (mk === "blush" || mood === "happy") { g.fillStyle = "rgba(240,110,110,.35)"; g.fillRect(6, 37, 11, 6); g.fillRect(47, 37, 11, 6); }
      if (mk === "freckles") [[10, 37], [13, 39], [8, 40], [15, 36], [50, 37], [53, 39], [48, 40], [55, 36], [12, 42], [52, 42]].forEach(function (p) { px(g, p[0], p[1], 2, 2, shade(skin, -.3)); });
      if (mk === "mole") px(g, 42, 46, 2, 2, shade(skin, -.55));
      if (mk === "birthmark") { g.fillStyle = shade(skin, -.18); g.fillRect(48, 34, 7, 5); g.fillRect(50, 33, 4, 7); }
      if (mk === "scar") { px(g, ex[0] - 2, 12, 2, 12, shade(skin, .3)); px(g, ex[0] - 1, 12, 1, 12, shade(skin, -.15)); }
      // eyes
      if (closed) ex.forEach(function (x) { px(g, Math.round(x - 6 * ES), ey + 1, Math.round(12 * ES), 3, ink); });
      else if (mood === "happy" || (style === "happy" && mood === "idle")) ex.forEach(function (x) { arc(x, ey, true); });
      else if (mood === "dizzy") ex.forEach(function (x) { g.lineWidth = 4; g.beginPath(); g.moveTo(x - 5, ey - 5); g.lineTo(x + 5, ey + 5); g.moveTo(x + 5, ey - 5); g.lineTo(x - 5, ey + 5); g.stroke(); });
      else ex.forEach(function (x, i) {
        var side = i ? 1 : -1;
        if (style === "wink" && mood === "idle" && i === 1) { arc(x, ey, true); return; }
        if (style === "dots") { var d = Math.round(7 * ES); px(g, Math.round(x - d / 2 + pdx), Math.round(ey - d / 2 + pdy), d, d, ink); px(g, Math.round(x - d / 2 + pdx + 1), Math.round(ey - d / 2 + pdy + 1), 2, 2, "#FFFFFF"); return; }
        var def = EYES[style] || EYES.big; if (mood === "wow") def = EYES.round;
        drawEye(g, x, ey, side, def, mood, pdx, pdy);
        if (mood === "sad") { g.fillStyle = skin; g.beginPath(); g.moveTo(x - 10, ey - 12); g.lineTo(i ? x - 10 : x + 10, ey - 12); g.lineTo(i ? x - 10 : x + 10, ey - 2); g.closePath(); g.fill(); }
      });
      // brows (style, height, weight, mood)
      var by = 13 - (SZ.by || 0) * 1.4 - (mood === "wow" ? 4 : mood === "happy" ? 1.5 : 0), bs = cfg.brows || "soft", bh = Math.max(1, Math.round((bs === "thick" || bs === "bushy" ? 4.5 : bs === "thin" ? 1.6 : 3) * BW));
      ex.forEach(function (x, i) {
        var s = i ? -1 : 1, tilt = mood === "sad" ? -4 * s : mood === "think" && i ? -3 : 0;
        if (bs === "angled") tilt += 3 * s; if (bs === "worried") tilt -= 3 * s;
        g.fillStyle = hair; g.strokeStyle = hair;
        if (bs === "straight" || bs === "thick" || bs === "angled" || bs === "worried" || bs === "short") { var bwid = bs === "short" ? 10 : 16; g.save(); g.translate(x, by); g.rotate(tilt * 0.06); g.fillRect(-bwid / 2, -bh / 2, bwid, bh); g.restore(); }
        else if (bs === "bushy") { g.save(); g.translate(x, by); g.rotate(tilt * 0.06); g.fillRect(-9, -bh / 2, 18, bh); for (var k = -8; k < 9; k += 3) g.fillRect(k, -bh / 2 - 1.5, 1.5, 1.5); g.restore(); }
        else { var peak = bs === "arched" ? 7 : 3; g.lineWidth = bh; g.beginPath(); g.moveTo(x - 7, by + 2 + tilt * 0.4 * s); g.quadraticCurveTo(x, by - peak, x + 7, by + 2 - tilt * 0.4 * s); g.stroke(); }
      });
      if ((cfg.nose || "button") === "none") { px(g, 31, 36, 2, 5, skinD); px(g, 30, 40, 4, 1, skinDD); }
      // mouth
      g.strokeStyle = ink; g.fillStyle = ink; g.lineWidth = 4.5;
      var mw = 10 * (SZ.mw || 1), my = 48, m = mood === "happy" ? "grin" : mood === "sad" ? "sad" : mood === "wow" ? "o" : mood === "dizzy" ? "wave" : mood === "think" ? "flat" : cfg.mouth || "smile";
      if (m === "small") { mw *= 0.55; m = "smile"; } if (m === "wide") { mw *= 1.4; m = "smile"; }
      var lip = shade(skin, -.3), dark = "#7A1F2B";
      if (m === "grin" || m === "teeth" || m === "laugh" || (m === "tongue" && mood === "happy")) { var dp = m === "laugh" ? 14 : 10; g.fillStyle = dark; g.beginPath(); g.moveTo(32 - mw - 2, my - 4); g.lineTo(32 + mw + 2, my - 4); g.quadraticCurveTo(32 + mw, my + dp, 32, my + dp); g.quadraticCurveTo(32 - mw, my + dp, 32 - mw - 2, my - 4); g.fill(); g.fillStyle = "#FFFFFF"; g.fillRect(32 - mw, my - 4, mw * 2, m === "teeth" ? 5 : 3.5); if (m === "laugh") { g.fillStyle = "#E86A7A"; g.fillRect(28, my + 5, 8, 4); } }
      else if (m === "sad") { g.beginPath(); g.moveTo(32 - mw, my + 4); g.quadraticCurveTo(32, my - 5, 32 + mw, my + 4); g.stroke(); }
      else if (m === "o") { g.fillStyle = dark; g.beginPath(); g.ellipse(32, my + 1, 5, 7, 0, 0, 7); g.fill(); }
      else if (m === "flat") { g.fillRect(32 - mw * 0.7, my, mw * 1.4, 3.5); }
      else if (m === "wave") { g.beginPath(); g.moveTo(32 - mw, my); for (var k2 = 1; k2 <= 4; k2++) g.lineTo(32 - mw + k2 * mw / 2, my + (k2 % 2 ? -3 : 3)); g.stroke(); }
      else if (m === "smirk") { g.lineWidth = 4; g.beginPath(); g.moveTo(32 - mw * .8, my + 1); g.quadraticCurveTo(32 + mw * .2, my + 4, 32 + mw, my - 4); g.stroke(); }
      else if (m === "cat") { g.lineWidth = 3.5; g.beginPath(); g.moveTo(32 - mw, my - 1); g.quadraticCurveTo(32 - mw / 2, my + 5, 32, my); g.quadraticCurveTo(32 + mw / 2, my + 5, 32 + mw, my - 1); g.stroke(); }
      else if (m === "lips") { g.fillStyle = lip; g.beginPath(); g.moveTo(32 - mw, my - 1); g.quadraticCurveTo(32, my - 5, 32 + mw, my - 1); g.quadraticCurveTo(32, my + 8, 32 - mw, my - 1); g.fill(); g.lineWidth = 2; g.strokeStyle = ink; g.beginPath(); g.moveTo(32 - mw, my - 1); g.quadraticCurveTo(32, my + 3, 32 + mw, my - 1); g.stroke(); }
      else { g.beginPath(); g.moveTo(32 - mw, my - 2); g.quadraticCurveTo(32, my + 7, 32 + mw, my - 2); g.stroke(); if (m === "tongue") { g.fillStyle = "#FF7A8A"; g.fillRect(29, my + 2, 7, 6); } }
      if (mk === "dimples") { px(g, Math.round(32 - mw - 4), my, 2, 2, skinDD); px(g, Math.round(32 + mw + 2), my, 2, 2, skinDD); }
      // beard on the face
      var bd = cfg.beard;
      if (bd && bd !== "none") {
        g.fillStyle = hair;
        if (bd === "stubble") { g.globalAlpha = .32; g.fillRect(8, 40, 48, 24); g.globalAlpha = 1; }
        else if (bd === "moustache") g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 5);
        else if (bd === "goatee") { g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 4); g.fillRect(25, 58, 14, 6); }
        else if (bd === "chinstrap") { g.fillRect(4, 42, 5, 22); g.fillRect(55, 42, 5, 22); g.fillRect(4, 59, 56, 5); }
        else { g.fillRect(4, 56, 56, 8); g.fillRect(4, 40, 7, 20); g.fillRect(53, 40, 7, 20); g.fillRect(32 - mw - 2, my - 9, mw * 2 + 4, 4); }
      }
      ftex.needsUpdate = true; crownTex.needsUpdate = true; jawTex.needsUpdate = true;
    }
    drawFace("idle", 0, 0, 0);

    /* ---- headwear first (it decides how much hair shows) */
    var hatBottom = 99, h = hatV, pk = packOf(h), KUM = KUMMA[h];
    var HT = HH;   // top of the head
    function octo(w, hgt, d, m, y, parent) { box(w, hgt, d - 0.06, m, 0, y, 0, parent || head); box(w - 0.06, hgt - 0.004, d, m, 0, y - 0.002, 0, parent || head); }
    if (KUM) {
      var ks = tx("kumS|" + h, 96, 32, kummaSide(KUM)), kt = tx("kumT|" + h, 48, 48, kummaTop(KUM));
      var kh = 0.25, ky = HT - 0.16 + kh / 2, kmSide = tmat(ks), kmTop = tmat(kt);
      octo(HW + 0.09, kh, HD + 0.09, [kmSide, kmSide, kmTop, mat(KUM[0]), kmSide, kmSide], ky);
      hatBottom = HT - 0.16;
    } else if (/^mz/.test(h)) {
      // the Omani mussar: a rounded wrapped body, a coloured border at the forehead, folds that cross at the front and run round the sides
      var fi = cfg.mf | 0, F = FABRIC[fi] || FABRIC[0];
      var ft = tx("fab2|" + fi, 64, 32, fabric(F)), ftT = tx("fabT|" + fi, 48, 48, fabric(F)), fb = tx("fabB2|" + fi, 64, 8, fabricBorder(F));
      var tallA = h === "mztall" ? 0.08 : h === "mzflat" ? -0.07 : 0, mb = HT - 0.17, mh = 0.27 + tallA, mt = mb + mh;
      var fm = tmat(ft), fmD = tmat(ft, "#CFCFCF"), fmL = tmat(ft, "#F4F4F4"), topM = tmat(ftT), bm = tmat(fb);
      octo(HW + 0.1, mh, HD + 0.1, [fm, fm, topM, fmD, fm, fm], mb + mh / 2);
      octo(HW + 0.12, 0.06, HD + 0.12, bm, mb + 0.03);
      var layers = h === "mztall" ? 4 : h === "mzflat" ? 2 : 3;
      for (var r = 0; r < layers; r++) {
        var yy = mb + 0.09 + r * (mh - 0.1) / layers, dir = r % 2 ? 1 : -1, mA = r % 2 ? fmL : fmD, mB = r % 2 ? fmD : fmL;
        box(HW * 0.62, 0.055, 0.03, mA, -HW * 0.2, yy, HD / 2 + 0.065, head, { rz: dir * 0.22 });
        box(HW * 0.62, 0.055, 0.03, mB, HW * 0.2, yy + 0.012, HD / 2 + 0.072, head, { rz: -dir * 0.22 });
        [-1, 1].forEach(function (s) { box(0.03, 0.055, HD * 0.9, mA, s * (HW / 2 + 0.065), yy, -0.01, head, { rx: s * dir * 0.07 }); });
        box(HW * 0.9, 0.055, 0.03, mA, 0, yy, -HD / 2 - 0.065, head, { rz: dir * 0.08 });
      }
      if (h === "mzopen") {   // worn open on top, so the kumma's crown shows
        var KO = KUMMA.kumma1, kS = tmat(tx("kumS|kumma1", 96, 32, kummaSide(KO))), kT = tmat(tx("kumT|kumma1", 48, 48, kummaTop(KO)));
        box(HW - 0.1, 0.06, HD - 0.1, [kS, kS, kT, mat(KO[0]), kS, kS], 0, mt + 0.015, 0, head);
      } else if (h !== "mzflat") octo(HW - 0.02, 0.05, HD - 0.02, [fmD, fmD, topM, fmD, fmD, fmD], mt + 0.02);
      if (h === "mzclassic" || h === "mztall") { box(0.11, 0.13, 0.03, fm, HW / 2 - 0.05, mt + 0.04, 0.08, head, { rz: -0.35 }); box(0.11, 0.03, 0.032, bm, HW / 2 - 0.03, mt + 0.1, 0.08, head, { rz: -0.35, noShadow: true }); }
      if (h === "mzflap") { box(0.17, 0.26, 0.03, fm, -HW / 2 + 0.07, mt + 0.1, 0.02, head, { rz: 0.35 }); box(0.17, 0.04, 0.032, bm, -HW / 2 + 0.03, mt + 0.22, 0.02, head, { rz: 0.35, noShadow: true }); }
      if (h === "mzsport") { var tail = new T.Group(); tail.position.set(-0.14, mb + 0.12, -HD / 2 - 0.07); head.add(tail); box(0.13, 0.46, 0.03, fm, 0, -0.23, 0, tail, { rx: 0.12 }); box(0.13, 0.07, 0.034, bm, 0, -0.47, 0.03, tail, { rx: 0.12 }); }
      hatBottom = mb;
    } else if (h === "cap" || h === "capb" || h === "snap") {
      var cc = hatC, ccD = shade(cc, -.2), back = h === "capb" ? -1 : 1;
      var capT = tx("cap|" + h + "|" + cc, 32, 16, function (g, w, hh) { px(g, 0, 0, w, hh, cc); px(g, w / 2, 0, 1, hh, ccD); px(g, w / 2 - 6, 4, 12, 6, h === "snap" ? "#FFFFFF" : shade(cc, .35)); if (h === "snap") text(g, "EPZ", w / 2, 7.5, 6, cc); });
      var cm = tmat(capT);
      box(HW + 0.08, 0.17, HD + 0.08, [mat(cc), mat(cc), mat(cc), mat(cc), back > 0 ? cm : mat(cc), back < 0 ? cm : mat(cc)], 0, HT + 0.02, 0, head);
      box(HW * 0.7, 0.04, HD * 0.6, cc, 0, HT + 0.12, 0, head);
      box(HW * 0.92, 0.035, 0.24, h === "snap" ? "#1B1B1F" : ccD, 0, HT - 0.05, back * (HD / 2 + 0.12), head, { rx: h === "snap" ? 0 : back * 0.12 });
      box(0.06, 0.04, 0.06, ccD, 0, HT + 0.12, 0, head);
      hatBottom = HT - 0.07;
    } else if (h === "beanie" || h === "beaniew") {
      var bc2 = hatC, rib = tx("rib|" + bc2, 16, 16, function (g, w, hh) { px(g, 0, 0, w, hh, bc2); for (var x = 0; x < w; x += 2) px(g, x, 0, 1, hh, shade(bc2, -.2)); }, true);
      var ribM = tmat(rib); octo(HW + 0.09, 0.3, HD + 0.09, [ribM, ribM, mat(bc2), ribM, ribM, ribM], HT - 0.01);
      octo(HW + 0.12, 0.09, HD + 0.12, tmat(rib, "#D8D8D8"), HT - 0.13);
      box(HW * .6, 0.06, HD * .6, bc2, 0, HT + 0.16, 0, head);
      if (h === "beaniew") { box(0.14, 0.14, 0.14, "#FFFFFF", 0, HT + 0.24, 0, head); [-1, 1].forEach(function (s) { box(0.05, 0.22, 0.16, bc2, s * (HW / 2 + 0.06), fy(36), -0.02, head); box(0.02, 0.12, 0.02, "#FFFFFF", s * (HW / 2 + 0.06), fy(36) - 0.17, -0.02, head); }); }
      hatBottom = HT - 0.17;
    } else if (h === "bucket" || h === "explorer") {
      var hc2 = h === "explorer" ? "#C9A46A" : hatC, band = h === "explorer" ? "#5A3A22" : shade(hatC, -.25);
      octo(HW + 0.08, 0.2, HD + 0.08, hc2, HT + 0.02);
      octo(HW + 0.09, 0.05, HD + 0.09, band, HT - 0.05);
      var bwid = h === "explorer" ? 0.2 : 0.12, by2 = HT - 0.08, ro = h === "explorer" ? 0 : 0.25;
      box(HW + 0.08 + bwid * 2, 0.03, bwid, hc2, 0, by2, HD / 2 + 0.04 + bwid / 2, head, { rx: ro }); box(HW + 0.08 + bwid * 2, 0.03, bwid, hc2, 0, by2, -HD / 2 - 0.04 - bwid / 2, head, { rx: -ro });
      box(bwid, 0.03, HD + 0.08, hc2, HW / 2 + 0.04 + bwid / 2, by2, 0, head, { rz: -ro }); box(bwid, 0.03, HD + 0.08, hc2, -HW / 2 - 0.04 - bwid / 2, by2, 0, head, { rz: ro });
      hatBottom = HT - 0.08;
    } else if (h === "headband") {
      var hbw = cfg.hair === "afro" ? 0.34 : 0.04, hby = cfg.hair === "afro" ? HT + 0.02 : fy(9); box(HW + hbw, 0.07, HD + hbw, acc, 0, hby, cfg.hair === "afro" ? -0.03 : 0, head); box(HW * .3, 0.05, 0.01, "#FFFFFF", 0, hby, HD / 2 + hbw / 2 + 0.005 + (cfg.hair === "afro" ? -0.03 : 0), head, { noShadow: true });
    } else if (pk && /^grcrown/.test(h)) {
      box(HW + 0.04, 0.14, HD + 0.04, pk.col, 0, HT + 0.06, 0, head); [-0.22, 0, 0.22].forEach(function (x) { box(0.12, 0.2, 0.12, pk.col, x, HT + 0.22, 0.2, head); box(0.12, 0.2, 0.12, pk.col, x, HT + 0.22, -0.2, head); });
      box(0.1, 0.1, 0.02, "#FFFFFF", 0, HT + 0.06, HD / 2 + 0.03, head); hatBottom = HT - 0.01;
    } else if (h === "crown") {
      box(HW + 0.04, 0.14, HD + 0.04, "#F2B632", 0, HT + 0.06, 0, head); [-0.2, 0, 0.2].forEach(function (x) { box(0.12, 0.2, 0.12, "#F2B632", x, HT + 0.22, 0.2, head); });
      box(0.08, 0.08, 0.02, "#E5484D", 0, HT + 0.06, HD / 2 + 0.03, head); hatBottom = HT - 0.01;
    }

    /* ---- hair: a list of boxes in head space, trimmed under any headwear so nothing pokes through */
    var hs = cfg.hair || "short", hl = cfg.hairline || "straight", hairBoxes = [], E = 0.035, hT = shade(hair, .12), hD = shade(hair, -.15);
    function hb(w, hgt, d, x, y, z, c, o) { hairBoxes.push([w, hgt, d, x, y, z, c || hair, o]); }
    function capTop(t, c) { hb(HW + 2 * E, t, HD + 2 * E, 0, HT + t / 2 - 0.01, 0, c || hT); }
    function backH(len, c) { hb(HW + 2 * E, len, E, 0, HT - len / 2, -HD / 2 - E / 2, c); }
    function sides(len, c) { [-1, 1].forEach(function (s) { hb(E, len, HD * 0.72, s * (HW / 2 + E / 2), HT - len / 2, -HD * 0.14, c); }); }
    function hairline(fh, c) {
      var y0 = HT - fh / 2, z = HD / 2 + E / 2;
      if (hl === "high") { hb(HW + 2 * E, fh * 0.5, E, 0, HT - fh * 0.25, z, c); return; }
      hb(HW + 2 * E, fh, E, 0, y0, z, c);
      if (hl === "peak") hb(HW * 0.16, 0.05, E, 0, HT - fh - 0.02, z, c);
      if (hl === "round") hb(HW * 0.5, 0.04, E, 0, HT - fh - 0.015, z, c);
      if (hl === "mshape") [-1, 1].forEach(function (s) { hb(HW * 0.22, 0.04, E, s * HW * 0.32, HT - fh - 0.015, z, c); });
    }
    var bz = mix(hair, skin, .45);
    if (hs === "buzz") { capTop(0.03, bz); backH(0.26, bz); sides(0.16, bz); hairline(0.05, bz); }
    else if (hs === "short") { capTop(0.1); backH(0.34); sides(0.22); hairline(0.1); }
    else if (hs === "crew") { capTop(0.08); backH(0.3); sides(0.16); hairline(0.07); hb(HW * 0.6, 0.05, 0.14, 0, HT + 0.09, HD / 2 - 0.05, hT); }
    else if (hs === "side") { capTop(0.1); backH(0.34); sides(0.22); hairline(0.1); hb(HW * 0.6, 0.07, HD * 0.85, -HW * 0.2, HT + 0.1, 0.02, hT); hb(0.02, 0.02, HD * 0.6, HW * 0.13, HT + 0.095, 0, hD); }
    else if (hs === "fringe") { capTop(0.1); backH(0.36); sides(0.24); hairline(0.17); }
    else if (hs === "quiff") { capTop(0.08); backH(0.3); sides(0.16); hairline(0.06); hb(HW * 0.82, 0.15, 0.2, 0, HT + 0.11, HD / 2 - 0.06, hT, { rx: -0.35 }); }
    else if (hs === "slick") { capTop(0.07, hair); backH(0.32); sides(0.18); hairline(0.05); hb(HW + 2 * E, 0.1, 0.1, 0, HT + 0.02, -HD / 2 - 0.02, hair); }
    else if (hs === "undercut") { hb(HW * 0.92, 0.12, HD * 0.96, 0, HT + 0.05, 0, hT); hb(HW * 0.92, 0.06, 0.08, 0, HT + 0.02, HD / 2 + 0.02, hT, { rx: -0.3 }); backH(0.24, bz); sides(0.14, bz); }
    else if (hs === "fauxhawk") { capTop(0.05, bz); backH(0.24, bz); sides(0.14, bz); hairline(0.05, bz); hb(HW * 0.26, 0.15, HD * 0.85, 0, HT + 0.08, 0, hT); }
    else if (hs === "spiky") { capTop(0.08); backH(0.3); sides(0.18); hairline(0.08); [[-0.18, 0.1], [0, 0.14], [0.18, 0.1], [-0.09, -0.08], [0.09, -0.08]].forEach(function (p, i) { hb(0.12, 0.2, 0.12, p[0], HT + 0.13, p[1], hT, { rz: (i % 2 ? .25 : -.25), rx: p[1] > 0 ? -.2 : .2 }); }); }
    else if (hs === "messy") { capTop(0.09); backH(0.34); sides(0.22); hairline(0.11); [[-0.2, .06, .1, .2], [0.15, .1, .14, -.3], [0, .12, -.1, .1], [-0.1, .09, .2, -.4], [0.22, .07, -.16, .5], [0.05, .13, .05, .3]].forEach(function (p) { hb(0.15, 0.1, 0.15, p[0], HT + p[1], p[2], hT, { rz: p[3], rx: p[3] / 2 }); }); }
    else if (hs === "curly") { capTop(0.08); backH(0.3); sides(0.2); hairline(0.08); for (var cx2 = -1; cx2 <= 1; cx2++) for (var cz2 = -1; cz2 <= 1; cz2++) hb(0.16, 0.14, 0.16, cx2 * HW * 0.34, HT + 0.1 + ((cx2 + cz2) % 2 ? 0.02 : 0), cz2 * HD * 0.32, (cx2 + cz2) % 2 ? hair : hT); [-1, 1].forEach(function (s) { hb(0.12, 0.14, 0.14, s * (HW / 2 + 0.05), HT - 0.05, -0.08, hair); }); }
    else if (hs === "wavy") { capTop(0.1); backH(0.42); sides(0.26); hairline(0.12); [-1, 1].forEach(function (s) { [0, 1, 2].forEach(function (k) { hb(0.05, 0.1, 0.12, s * (HW / 2 + E + 0.02), HT - 0.12 - k * 0.1, -0.1 + k * 0.08 * (k % 2 ? -1 : 1), k % 2 ? hT : hair); }); }); }
    else if (hs === "afro") { hb(HW + 0.3, 0.42, HD + 0.3, 0, HT + 0.03, -0.03, hair); hb(HW + 0.2, 0.1, HD + 0.2, 0, HT + 0.27, -0.03, hT); hairline(0.1); }
    else if (hs === "twists") { capTop(0.07); backH(0.36); sides(0.24); hairline(0.08); for (var tx2 = -2; tx2 <= 2; tx2++) for (var tz = -1; tz <= 1; tz++) hb(0.07, 0.18, 0.07, tx2 * HW * 0.2, HT + 0.1 - Math.abs(tz) * 0.02, tz * HD * 0.3, (tx2 + tz) % 2 ? hT : hD); }
    else if (hs === "middle") { capTop(0.1); backH(0.38); sides(0.26); [-1, 1].forEach(function (s) { hb(HW * 0.47, 0.15, E, s * HW * 0.27, HT - 0.06, HD / 2 + E / 2, hair, { rz: s * 0.18 }); }); }
    else if (hs === "long") { capTop(0.1); hb(HW + 2 * E, 0.78, E * 1.6, 0, HT - 0.39, -HD / 2 - E, hair); [-1, 1].forEach(function (s) { hb(E, 0.56, HD * 0.72, s * (HW / 2 + E / 2), HT - 0.28, -HD * 0.14, hair); }); hairline(0.11); }
    else if (hs === "bun") { capTop(0.08); backH(0.32); sides(0.2); hairline(0.07); hb(0.22, 0.17, 0.22, 0, HT + 0.14, -0.08, hT); hb(0.26, 0.04, 0.26, 0, HT + 0.06, -0.08, hD); }
    else if (hs === "ponytail") { capTop(0.08); backH(0.32); sides(0.2); hairline(0.08); hb(0.12, 0.08, 0.12, 0, HT - 0.12, -HD / 2 - 0.06, hD); hb(0.13, 0.36, 0.12, 0, HT - 0.32, -HD / 2 - 0.1, hair, { rx: 0.2 }); }
    else if (hs === "cornrows") {
      var rowT = tx("rows|" + hair, 32, 32, function (g, w, hh) { px(g, 0, 0, w, hh, mix(hair, skin, .35)); for (var x = 1; x < w; x += 5) { px(g, x, 0, 3, hh, hair); for (var y = 0; y < hh; y += 3) px(g, x + (y % 2), y, 1, 1, hT); } }, true);
      hairBoxes.push([HW + 2 * E, 0.04, HD + 2 * E, 0, HT + 0.01, 0, tmat(rowT)]); backH(0.24); sides(0.14); hairline(0.06);
    }
    // trim under the headwear: keep only the part of each piece below the hat's lower edge
    hairBoxes.forEach(function (b) {
      var w = b[0], hgt = b[1], d = b[2], x = b[3], y = b[4], z = b[5], top3 = y + hgt / 2, bot = y - hgt / 2;
      if (hatBottom < 99) { if (bot >= hatBottom - 0.005) return; if (top3 > hatBottom) { hgt = hatBottom - bot; y = bot + hgt / 2; } if (b[7] && (b[7].rx || b[7].rz) && hgt < b[1]) return; }
      box(w, hgt, d, b[6], x, y, z, head, b[7]);
    });

    /* ---- glasses (at the eyes, which follow the face shape and eye spacing) */
    var gl = cfg.gl || "none", gp = packOf(gl), gy = fy(27), gxs = [fxp(32 - GAP), fxp(32 + GAP)], gz = FZ + 0.025, lw = 0.17 * Math.max(.85, ES), lh = 0.12 * Math.max(.85, ES);
    function temples(c) { [-1, 1].forEach(function (s) { box(0.015, 0.025, HD * 0.62, c, s * (HW / 2 + 0.008), gy + 0.02, HD * 0.18, head, { noShadow: true }); }); }
    if (gp && /^grvisor/.test(gl)) { box(HW + 0.04, 0.16, 0.05, gp.col, 0, gy, gz, head); box(HW - 0.02, 0.1, 0.02, "#0E1B2E", 0, gy, gz + 0.03, head); temples(gp.col); }
    else if (gl !== "none") {
      var fr = { round: "#2A2540", square: "#2A2540", sun: "#0E1B2E", aviator: GOLD, sport: "#1B1B1F", reading: "#7A4B2A", thick: "#111111" }[gl] || "#2A2540";
      var lens = gl === "sun" || gl === "aviator" ? "#1E2F45" : gl === "sport" ? "#3B2A6B" : null;
      var lensM = lens ? mat(lens) : (mats.glass || (mats.glass = new T.MeshLambertMaterial({ color: "#CFEFFF", transparent: true, opacity: 0.35 })));
      if (gl === "sport") { box(HW + 0.04, 0.12, 0.04, fr, 0, gy + 0.01, gz, head); box(HW - 0.04, 0.08, 0.015, lensM, 0, gy, gz + 0.025, head, { noShadow: true }); }
      else {
        var t2 = gl === "thick" ? 0.03 : 0.018;
        gxs.forEach(function (x) {
          var w = gl === "round" ? lw * 0.9 : lw, hh = gl === "aviator" ? lh * 1.15 : gl === "reading" ? lh * 0.7 : lh;
          if (gl !== "reading") box(w + t2 * 2, t2, 0.02, fr, x, gy + hh / 2 + t2 / 2, gz, head, { noShadow: true });
          box(w + t2 * 2, t2, 0.02, fr, x, gy - hh / 2 - t2 / 2, gz, head, { noShadow: true });
          box(t2, hh, 0.02, fr, x - w / 2 - t2 / 2, gy, gz, head, { noShadow: true }); box(t2, hh, 0.02, fr, x + w / 2 + t2 / 2, gy, gz, head, { noShadow: true });
          box(w, hh, 0.01, lensM, x, gy, gz, head, { noShadow: true });
          if (gl === "aviator") box(w * 0.7, 0.03, 0.01, lensM, x, gy - hh / 2 - 0.02, gz, head, { noShadow: true });
        });
        box(Math.abs(gxs[1] - gxs[0]) - lw, 0.02, 0.02, fr, 0, gy + 0.03, gz, head, { noShadow: true });
      }
      temples(fr);
    }

    /* ---- neck, wrist and body accessories */
    var nk = cfg.neck || "none", ex = cfg.extra || "none", wr = cfg.wrist || "none", cape = null, xp = packOf(ex);
    function vStrap(c, w, len, y0, z) { box(w, len, 0.02, c, -0.09, y0 - len / 2, z, body, { rz: 0.32, noShadow: true }); box(w, len, 0.02, c, 0.09, y0 - len / 2, z, body, { rz: -0.32, noShadow: true }); }
    var FZB = (cl === "puffer" ? 0.23 : 0.2) + 0.01;
    if (nk === "chain" || nk === "pendant") { vStrap(GOLD, 0.018, 0.2, 0.62, FZB); box(0.08, 0.02, 0.02, GOLD, 0, 0.43, FZB, body, { noShadow: true }); if (nk === "pendant") { box(0.06, 0.07, 0.025, GOLD, 0, 0.39, FZB + 0.005, body); box(0.03, 0.035, 0.03, "#2BB3C0", 0, 0.39, FZB + 0.012, body, { noShadow: true }); } }
    else if (nk === "scarf") { var sfT = tx("scarf|" + acc, 16, 16, function (g, w, hh) { px(g, 0, 0, w, hh, acc); for (var y = 0; y < hh; y += 6) px(g, 0, y, w, 3, "#FFFFFF"); }, true); var sfM = tmat(sfT); box(0.54, 0.12, 0.46, sfM, 0, 0.64, 0, body); box(0.13, 0.34, 0.05, sfM, -0.12, 0.44, FZB + 0.02, body); box(0.13, 0.03, 0.05, "#FFFFFF", -0.12, 0.27, FZB + 0.02, body); }
    else if (nk === "bandana") { var bdT = tx("band|" + acc, 16, 16, function (g, w, hh) { px(g, 0, 0, w, hh, acc); for (var i = 0; i < 6; i++) diamond(g, (i * 5) % w, (i * 7) % hh, 1, "#FFFFFF"); }, true); [0.34, 0.26, 0.18, 0.1].forEach(function (w, i) { box(w, 0.05, 0.03, tmat(bdT), 0, 0.6 - i * 0.05, FZB + 0.01, body, { noShadow: true }); }); }
    else if (nk === "lanyard") { vStrap(acc, 0.02, 0.3, 0.62, FZB); var idT = tx("idcard", 12, 16, function (g, w, hh) { px(g, 0, 0, w, hh, "#FFFFFF"); px(g, 2, 2, 5, 6, "#9FB4D9"); px(g, 2, 10, 8, 1, "#3B4A6B"); px(g, 2, 12, 6, 1, "#3B4A6B"); px(g, 0, 0, w, 1, acc); }); box(0.12, 0.16, 0.012, [mat("#FFFFFF"), mat("#FFFFFF"), mat("#FFFFFF"), mat("#FFFFFF"), tmat(idT), mat("#FFFFFF")], 0, 0.27, FZB + 0.005, body); }
    else if (nk === "bowtie") { box(0.08, 0.07, 0.03, acc, -0.05, 0.585, FZB + 0.01, body, { rz: 0.15 }); box(0.08, 0.07, 0.03, acc, 0.05, 0.585, FZB + 0.01, body, { rz: -0.15 }); box(0.03, 0.04, 0.035, shade(acc, -.2), 0, 0.585, FZB + 0.015, body); }
    if (ex === "medal") { box(0.1, 0.36, 0.02, "#D8343F", -0.1, 0.38, FZB, body); box(0.14, 0.14, 0.03, "#F2B632", -0.1, 0.18, FZB + 0.01, body); }
    else if (ex === "backpack") { box(0.48, 0.5, 0.2, acc, 0, 0.3, -0.3, body); box(0.36, 0.2, 0.06, shade(acc, -.2), 0, 0.2, -0.42, body); [-1, 1].forEach(function (s) { box(0.06, 0.5, 0.02, shade(acc, -.3), s * 0.17, 0.33, FZB, body, { noShadow: true }); }); }
    else if (ex === "schoolbag") { box(0.05, 0.86, 0.02, "#5A3A22", 0, 0.3, FZB, body, { rz: 0.72, noShadow: true }); box(0.05, 0.86, 0.02, "#5A3A22", 0, 0.3, -0.21, body, { rz: -0.72, noShadow: true }); box(0.34, 0.28, 0.12, "#8A5A2B", 0.2, 0.05, -0.27, body); box(0.34, 0.1, 0.13, "#6B4422", 0.2, 0.15, -0.27, body); box(0.06, 0.05, 0.02, GOLD, 0.2, 0.1, -0.34, body, { noShadow: true }); }
    else if (ex === "sling") { box(0.04, 0.8, 0.02, "#1B1B1F", 0, 0.32, FZB, body, { rz: -0.7, noShadow: true }); box(0.22, 0.14, 0.08, acc, -0.12, 0.42, FZB + 0.04, body); box(0.2, 0.02, 0.09, "#D9DDE2", -0.12, 0.47, FZB + 0.04, body, { noShadow: true }); }
    else if (ex === "pen") { box(0.025, 0.1, 0.02, "#2F6FDE", -0.16, 0.5, FZB, body); box(0.025, 0.1, 0.02, "#D13A3A", -0.12, 0.49, FZB, body); }
    else if (ex === "camera") { vStrap("#1B1B1F", 0.02, 0.3, 0.62, FZB); box(0.2, 0.13, 0.08, "#2A2F36", 0, 0.32, FZB + 0.04, body); box(0.08, 0.08, 0.05, "#111111", 0, 0.32, FZB + 0.1, body); box(0.04, 0.04, 0.01, "#7FB6E6", 0, 0.32, FZB + 0.13, body, { noShadow: true }); box(0.05, 0.03, 0.03, "#D9DDE2", 0.06, 0.4, FZB + 0.04, body, { noShadow: true }); }
    else if (ex === "khanjar") {
      // the Omani khanjar on its silver belt, worn at the front of the waist
      var silv = "#C9CED6", sT = tx("khanjar", 8, 16, function (g, w, hh) { px(g, 0, 0, w, hh, silv); for (var y = 1; y < hh; y += 3) for (var x = (y % 2); x < w; x += 2) px(g, x, y, 1, 1, "#8E96A3"); px(g, 0, 0, w, 1, GOLD); });
      var kM = tmat(sT), bz2 = robe ? 0.235 : 0.21;
      box(0.72, 0.07, robe ? 0.48 : 0.42, silv, 0, 0.02, 0, body); box(0.7, 0.02, robe ? 0.485 : 0.425, "#8E96A3", 0, 0.02, 0, body, { noShadow: true });
      box(0.07, 0.09, 0.05, "#E8D6B0", 0, 0.1, bz2 + 0.03, body); box(0.1, 0.03, 0.055, GOLD, 0, 0.055, bz2 + 0.03, body);
      box(0.09, 0.17, 0.05, kM, 0, -0.04, bz2 + 0.03, body); box(0.08, 0.07, 0.05, kM, 0.04, -0.14, bz2 + 0.03, body, { rz: -0.7 }); box(0.06, 0.07, 0.05, kM, 0.1, -0.13, bz2 + 0.03, body, { rz: -1.5 }); box(0.04, 0.05, 0.05, GOLD, 0.13, -0.09, bz2 + 0.03, body, { rz: -1.6 });
    }
    else if (ex === "headphones") {
      var hpC = acc;
      if (hatBottom < 99) { box(0.1, 0.16, 0.16, hpC, -0.24, 0.66, 0.1, body); box(0.1, 0.16, 0.16, hpC, 0.24, 0.66, 0.1, body); box(0.5, 0.04, 0.06, shade(hpC, -.3), 0, 0.64, -0.17, body); }
      else { box(HW + 0.1, 0.05, 0.08, shade(hpC, -.3), 0, HT + 0.03, 0, head); [-1, 1].forEach(function (s) { box(0.08, 0.2, 0.22, hpC, s * (HW / 2 + 0.05), fy(34), 0, head); box(0.02, 0.12, 0.14, shade(hpC, .4), s * (HW / 2 + 0.095), fy(34), 0, head, { noShadow: true }); }); }
    }
    if (xp && /^grcape/.test(ex)) {
      cape = new T.Group(); cape.position.set(0, 0.58, -0.22); body.add(cape);
      box(0.72, 1.0, 0.06, xp.col, 0, -0.5, -0.03, cape); box(0.72, 0.1, 0.07, "#FFFFFF", 0, -0.96, -0.03, cape); box(0.3, 0.1, 0.08, xp.dark, 0, -0.04, 0, cape);
    } else if (ex === "cape") { cape = new T.Group(); cape.position.set(0, 0.58, -0.22); body.add(cape); box(0.68, 0.9, 0.05, "#D8343F", 0, -0.45, -0.03, cape); }
    if (wr !== "none") {
      var wy = -0.5, ww = 0.235, wd = 0.255;
      if (wr === "watch") { box(ww, 0.06, wd, "#3B2A20", 0, wy, 0, armR); box(0.02, 0.08, 0.09, "#D9DDE2", 0.12, wy, 0, armR); box(0.01, 0.06, 0.07, "#F4F7FB", 0.13, wy, 0, armR, { noShadow: true }); }
      else if (wr === "smartwatch") { box(ww, 0.06, wd, "#1B1B1F", 0, wy, 0, armR); box(0.02, 0.09, 0.1, "#111111", 0.12, wy, 0, armR); box(0.01, 0.07, 0.08, "#2BB3C0", 0.13, wy, 0, armR, { noShadow: true }); }
      else if (wr === "beads") { for (var bi = 0; bi < 8; bi++) { var a = bi / 8 * Math.PI * 2; box(0.045, 0.045, 0.045, bi % 2 ? acc : shade(acc, .4), Math.cos(a) * 0.11, wy, Math.sin(a) * 0.12, armR, { noShadow: true }); } }
      else if (wr === "sweatband") { box(0.24, 0.09, 0.26, acc, 0, wy, 0, armR); box(0.24, 0.09, 0.26, acc, 0, wy, 0, armL); }
      else if (wr === "bracelet") { box(0.225, 0.03, 0.245, GOLD, 0, wy, 0, armR); box(0.225, 0.02, 0.245, shade(GOLD, .3), 0, wy - 0.03, 0, armR, { noShadow: true }); }
    }
    // dizzy stars
    var stars = new T.Group(); stars.position.y = HH + 0.24; stars.visible = false; head.add(stars);
    for (var si = 0; si < 3; si++) { var sm = box(0.1, 0.1, 0.1, "#FFD93B", 0, 0, 0, stars, { noShadow: true }); sm.userData.a = si * 2.094; }
    root.scale.y = SZ.h || 1;   // height slider

    var A = { tilt: 0, tiltY: 0.6, ph: 0, run: 0, lean: 0, roll: 0, squash: 0, sq: 0, air: 0, blink: 3, t: 0, mood: "idle", moodT: 0, capeLag: 0 };
    function damp(a, b, k, dt) { return a + (b - a) * (1 - Math.exp(-k * dt)); }
    function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
    function smooth(x) { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); }
    var api = {
      root: root, head: head, body: body,
      mood: function (m, secs) { A.mood = m; A.moodT = secs || 0; },
      land: function (v) { A.sq = Math.min(1, Math.max(A.sq, v)); },
      // st: { speed 0..1, vy, ground, pose: "run"|"stun"|"celebrate"|"dive"|"recover"|"stagger", turn (-1..1) }
      update: function (st, dt) {
        A.t += dt; A.moodT > 0 && (A.moodT -= dt, A.moodT <= 0 && (A.mood = "idle"));
        A.blink -= dt; var face = A.mood; if (face === "idle" && A.blink < 0) { face = "blink"; if (A.blink < -0.12) A.blink = 2 + Math.random() * 3; }
        if (face === "idle" && !st.ground && st.vy < -4) face = "wow";
        drawFace(face === "blink" ? "idle" : face, 0, 0, face === "blink" ? 1 : 0);
        A.run = damp(A.run, st.pose === "run" && st.ground ? st.speed : 0, 14, dt);
        A.ph += dt * (4 + A.run * 9) * (A.run > 0.03 ? 1 : 0);
        var sw = Math.sin(A.ph) * 0.95 * A.run, bob = Math.abs(Math.cos(A.ph)) * 0.07 * A.run;
        var la = 0, ra = 0, ll = sw, rl = -sw, az = 0.06, bx = 0, by = 0, hz = 0, hx = 0, tl = 0, ty = 0.6, tk = 14, flat = false;
        // victory dances at the finish line (st.dance picks one of four); the character stands still and dances
        var dancing = st.pose === "dance", lzl = 0, lzr = 0, ty2 = 0, azL = null, azR = null;
        if (dancing && A.lastPose !== "dance") A.d0 = A.t;
        A.lastPose = st.pose;
        if (dancing) {
          var D = A.t - (A.d0 || 0), k = st.dance || 0, beat = D * 7.5;
          if (k === 0) {        // arm-pump hop: bounce on the beat, fists pumping in turn
            by = Math.abs(Math.sin(beat * .5)) * .28; la = -2.5 + Math.sin(beat) * .55; ra = -2.5 - Math.sin(beat) * .55; az = .3;
            ll = rl = -.15 + Math.abs(Math.cos(beat * .5)) * .25; hx = -.12 + Math.sin(beat) * .08;
          } else if (k === 1) { // disco point: one arm points up and across, hips sway, side steps
            var sw2 = Math.sin(beat * .5); ra = -2.6 + Math.max(0, -sw2) * 1.9; la = .2 + Math.max(0, sw2) * .3; az = .5 + sw2 * .35;
            bx = 0; hz = sw2 * .12; lzl = Math.max(0, sw2) * .35; lzr = -Math.max(0, -sw2) * .35; by = Math.abs(sw2) * .06; hx = -.1;
          } else if (k === 2) { // spin and pose: a full turn with arms out, then a V pose on one leg
            var cyc = D % 2.8, sp2 = Math.min(1, cyc / 1.2); ty2 = cyc < 1.2 ? (sp2 * sp2 * (3 - 2 * sp2)) * Math.PI * 2 : 0;
            if (cyc < 1.2) { la = ra = -1.57; az = 1.3; ll = rl = 0; by = Math.sin(sp2 * Math.PI) * .25; }
            else { la = ra = -2.7; az = .55; ll = 0; rl = -.9; by = .04 + Math.sin((cyc - 1.2) * 6) * .02; hx = -.2; }
          } else {              // razha-inspired: knees bounce on the beat, right arm raised and pumping, left hand on the hip, side to side
            var b2 = Math.sin(beat), side = Math.sin(beat * .25);
            ra = -3.05 + Math.max(0, b2) * .4; azR = .12; la = .45; azL = .95; by = -Math.abs(b2) * .07 + .02; ll = rl = .1 + Math.abs(b2) * .18;
            lzl = side * .12; lzr = side * .12; hz = side * .08; hx = Math.abs(b2) * .1 - .05;
          }
          if (k !== 1) A.lean = damp(A.lean, 0, 10, dt);
          ty = 0.6 + by; by = 0; tk = 30;   // the whole character hops (legs too), so there is never a gap at the waist
        } else if (st.pose === "celebrate") {
          la = -2.9 + Math.sin(A.t * 14) * 0.35; ra = -2.9 - Math.sin(A.t * 14) * 0.35; az = 0.35; ll = Math.sin(A.t * 10) * 0.5; rl = -ll; by = Math.abs(Math.sin(A.t * 7)) * 0.25; hx = -0.15;
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
        legL.rotation.z = damp(legL.rotation.z, lzl, 18, dt); legR.rotation.z = damp(legR.rotation.z, lzr, 18, dt);
        tilt.rotation.y = dancing ? ty2 : damp(tilt.rotation.y, 0, 12, dt);
        armL.rotation.x = damp(armL.rotation.x, la, 26, dt); armR.rotation.x = damp(armR.rotation.x, ra, 26, dt);
        armL.rotation.z = damp(armL.rotation.z, -(azL === null ? az : azL), 20, dt); armR.rotation.z = damp(armR.rotation.z, azR === null ? az : azR, 20, dt);
        A.lean = damp(A.lean, st.ground ? A.run * 0.22 : 0.1 + (st.vy < 0 ? 0.1 : 0), 10, dt);
        body.rotation.x = damp(body.rotation.x, flat || dancing ? bx : A.lean + bx, 14, dt);
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
      // shared textures (fabrics, embroidery) stay cached for the next character; only this one's own things are freed
      dispose: function () { geos.forEach(function (g) { g.dispose(); }); texs.forEach(function (t) { t.dispose(); }); Object.keys(mats).forEach(function (k) { mats[k].dispose(); }); }
    };
    return api;
  };
  GR.avatar.KUMMA = KUMMA; GR.avatar.FABRIC = FABRIC; GR.avatar.SHAPES = SHAPES;
})();
