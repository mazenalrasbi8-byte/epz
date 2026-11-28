/* Gate Rush · World 1 (Tenses World): the kit and its ten maps in one file, loaded only when a World 1 map is played (epz-patch:maps). */
/* Gate Rush — World 1 (Tenses World) kit: the decorations every Tenses map draws from (epz-patch:maps).
   Everything is plain boxes merged into one batch, so a map with dozens of props still costs one draw call.
   Props stand on small islands beside the course; each map picks its own props, colours and start arch. */
(function () {
  var GR = (window.GR = window.GR || {}); GR.kits = GR.kits || {};
  function hash(n) { var x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); }
  var D = function (B, x0, x1, f0, f1, y0, y1, c) { B.deco(x0, x1, f0, f1, y0, y1, c); };
  var P = {
    clock: function (B, x, f, y, s) {
      s = s || 4; D(B, x - .3, x + .3, f - .3, f + .3, y, y + 5, "#5A3A22");
      D(B, x - s / 2, x + s / 2, f - .4, f + .4, y + 5, y + 5 + s, "#F2B632"); D(B, x - s / 2 + .35, x + s / 2 - .35, f - .45, f + .45, y + 5.35, y + 4.65 + s, "#FFF8E6");
      for (var k = 0; k < 12; k++) { var a = k / 12 * 6.283, r = s / 2 - .7; D(B, x + Math.cos(a) * r - .12, x + Math.cos(a) * r + .12, f - .5, f + .5, y + 5 + s / 2 + Math.sin(a) * r - .12, y + 5 + s / 2 + Math.sin(a) * r + .12, "#13232F"); }
      D(B, x - .1, x + .1, f - .55, f + .55, y + 5 + s / 2, y + 5 + s / 2 + s * .32, "#13232F"); D(B, x, x + s * .26, f - .55, f + .55, y + 5 + s / 2 - .1, y + 5 + s / 2 + .1, "#13232F");
    },
    house: function (B, x, f, y, c) {
      c = c || ["#F4A261", "#E76F51", "#2A9D8F", "#E9C46A"][Math.floor(hash(f) * 4)];
      D(B, x - 2.5, x + 2.5, f - 2.5, f + 2.5, y, y + 4.5, c); D(B, x - 2.8, x + 2.8, f - 2.8, f + 2.8, y + 4.5, y + 5.3, "#B3262A"); D(B, x - 1.8, x + 1.8, f - 1.8, f + 1.8, y + 5.3, y + 6, "#B3262A");
      D(B, x - .5, x + .5, f + 2.45, f + 2.6, y, y + 2, "#5A3A22"); [-1.5, 1.5].forEach(function (k) { D(B, x + k - .5, x + k + .5, f + 2.45, f + 2.6, y + 2.6, y + 3.6, "#BFE8F5"); });
    },
    tree: function (B, x, f, y) { D(B, x - .3, x + .3, f - .3, f + .3, y, y + 2.6, "#7A4B2A"); D(B, x - 1.6, x + 1.6, f - 1.6, f + 1.6, y + 2.4, y + 4, "#4CAF50"); D(B, x - 1.1, x + 1.1, f - 1.1, f + 1.1, y + 4, y + 5.2, "#5CC063"); D(B, x - .5, x + .5, f - .5, f + .5, y + 5.2, y + 6, "#7BD36F"); },
    bus: function (B, x, f, y) { D(B, x - 1.5, x + 1.5, f - 4.5, f + 4.5, y + .6, y + 3.6, "#F2B632"); D(B, x - 1.55, x + 1.55, f - 4, f + 3.6, y + 2.2, y + 3.1, "#BFE8F5"); [-3, 3].forEach(function (k) { D(B, x - 1.6, x + 1.6, f + k - .6, f + k + .6, y, y + 1.1, "#1B1B1F"); }); },
    lamp: function (B, x, f, y) { B.lamp(x, y, f); },
    light: function (B, x, f, y) { D(B, x - .25, x + .25, f - .25, f + .25, y, y + 7, "#3B4252"); D(B, x - .9, x + .9, f - .7, f + .7, y + 7, y + 8.2, "#2A2F36"); D(B, x - .7, x + .7, f + .65, f + .75, y + 7.2, y + 8, "#FFF3B0"); },
    camera: function (B, x, f, y) { [-.6, .6].forEach(function (k) { D(B, x + k - .1, x + k + .1, f - .1, f + .1, y, y + 2.4, "#2A2F36"); }); D(B, x - .9, x + .9, f - 1.3, f + 1.3, y + 2.4, y + 3.6, "#1B1B1F"); D(B, x - .5, x + .5, f + 1.3, f + 2, y + 2.6, y + 3.4, "#3B4252"); D(B, x - .3, x + .3, f - 1.5, f - 1.3, y + 3, y + 3.4, "#E5484D"); },
    screen: function (B, x, f, y) { D(B, x - .2, x + .2, f - 3, f + 3, y, y + 2, "#2A2F36"); D(B, x - .3, x + .3, f - 4, f + 4, y + 2, y + 6.5, "#1B1B1F"); D(B, x - .35, x + .35, f - 3.6, f + 3.6, y + 2.4, y + 6.1, "#7C5CFA"); D(B, x - .4, x + .4, f - 1.6, f + 1.6, y + 4, y + 4.8, "#E5484D"); },
    bones: function (B, x, f, y) { for (var k = 0; k < 5; k++) { D(B, x - 2.2 + k * .1, x - 1.8 + k * .1, f - 3 + k * 1.4, f - 2.6 + k * 1.4, y, y + 2.6 - k * .2, "#F4ECD8"); D(B, x + 1.8 - k * .1, x + 2.2 - k * .1, f - 3 + k * 1.4, f - 2.6 + k * 1.4, y, y + 2.6 - k * .2, "#F4ECD8"); } D(B, x - 2.2, x + 2.2, f - 3.2, f + 3.4, y + 2.6, y + 3, "#F4ECD8"); D(B, x - 1, x + 1, f + 3.4, f + 5, y + 1.8, y + 3.2, "#EFE4C8"); },
    rock: function (B, x, f, y) { D(B, x - 1.6, x + 1.6, f - 1.4, f + 1.4, y, y + 1.6, "#A0785A"); D(B, x - 1, x + 1.2, f - .9, f + 1, y + 1.6, y + 2.5, "#B88E6A"); },
    cactus: function (B, x, f, y) { D(B, x - .4, x + .4, f - .4, f + .4, y, y + 4, "#3E9B4F"); D(B, x - 1.4, x - .4, f - .3, f + .3, y + 1.6, y + 2.2, "#3E9B4F"); D(B, x - 1.4, x - .8, f - .3, f + .3, y + 2.2, y + 3.2, "#3E9B4F"); D(B, x + .4, x + 1.2, f - .3, f + .3, y + 2.4, y + 3, "#3E9B4F"); D(B, x + .6, x + 1.2, f - .3, f + .3, y + 3, y + 3.8, "#3E9B4F"); },
    tent: function (B, x, f, y) { for (var k = 0; k < 4; k++) D(B, x - 2.4 + k * .6, x + 2.4 - k * .6, f - 2.4, f + 2.4, y + k * .8, y + k * .8 + .8, k % 2 ? "#E8590C" : "#F2B632"); },
    column: function (B, x, f, y, broken) { var h = broken ? 3 + hash(f) * 3 : 8; D(B, x - 1.2, x + 1.2, f - 1.2, f + 1.2, y, y + .6, "#E9E1CF"); D(B, x - .8, x + .8, f - .8, f + .8, y + .6, y + h, "#F4ECD8"); if (!broken) D(B, x - 1.2, x + 1.2, f - 1.2, f + 1.2, y + h, y + h + .6, "#E9E1CF"); },
    trophy: function (B, x, f, y) { D(B, x - 1.2, x + 1.2, f - 1.2, f + 1.2, y, y + 2.4, "#3B4252"); D(B, x - .3, x + .3, f - .3, f + .3, y + 2.4, y + 3.2, "#C9A227"); D(B, x - 1, x + 1, f - 1, f + 1, y + 3.2, y + 4.8, "#F2B632"); D(B, x - 1.3, x - 1, f - .2, f + .2, y + 3.6, y + 4.4, "#F2B632"); D(B, x + 1, x + 1.3, f - .2, f + .2, y + 3.6, y + 4.4, "#F2B632"); },
    archway: function (B, x, f, y) { D(B, x - .7, x + .7, f - 3, f - 1.8, y, y + 6, "#B8A88A"); D(B, x - .7, x + .7, f + 1.8, f + 3, y, y + 6, "#B8A88A"); D(B, x - .8, x + .8, f - 3.2, f + 3.2, y + 6, y + 7.2, "#A89878"); D(B, x - .85, x + .85, f - 2, f - 1.7, y + 2, y + 6, "#4E9A57"); },
    vines: function (B, x, f, y) { for (var k = 0; k < 4; k++) D(B, x - .2 + k * .3, x + .1 + k * .3, f - 1 + k * .5, f - .7 + k * .5, y, y + 2 + hash(f + k) * 3, "#4E9A57"); },
    rocket: function (B, x, f, y) { D(B, x - 1.2, x + 1.2, f - 1.2, f + 1.2, y + 1, y + 11, "#F4F7FB"); D(B, x - .8, x + .8, f - .8, f + .8, y + 11, y + 12.6, "#E5484D"); D(B, x - .3, x + .3, f - .3, f + .3, y + 12.6, y + 13.6, "#E5484D"); [[-1.8, 0], [1.8, 0], [0, -1.8], [0, 1.8]].forEach(function (p) { D(B, x + p[0] - .3, x + p[0] + .3, f + p[1] - .3, f + p[1] + .3, y, y + 3, "#E5484D"); }); D(B, x - 1.25, x + 1.25, f - 1.25, f + 1.25, y + 6, y + 6.6, "#2B41C4"); D(B, x - .5, x + .5, f + 1.15, f + 1.3, y + 8, y + 9, "#7FB6E6"); },
    tower: function (B, x, f, y) { [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b) { D(B, x + a * 1.2 - .15, x + a * 1.2 + .15, f + b * 1.2 - .15, f + b * 1.2 + .15, y, y + 12, "#E5484D"); }); }); for (var k = 1; k < 12; k += 2.5) D(B, x - 1.35, x + 1.35, f - 1.35, f + 1.35, y + k, y + k + .2, "#F2B632"); },
    dish: function (B, x, f, y) { D(B, x - .25, x + .25, f - .25, f + .25, y, y + 3, "#9AA4AE"); for (var k = 0; k < 3; k++) D(B, x - 2 + k * .4, x + 2 - k * .4, f - 2 + k * .4, f + 2 - k * .4, y + 3 + k * .4, y + 3.4 + k * .4, "#D9DDE2"); D(B, x - .2, x + .2, f - .2, f + .2, y + 4.2, y + 5.4, "#E5484D"); },
    cloud: function (B, x, f, y) { var yy = y + 6 + hash(f) * 5; D(B, x - 3, x + 3, f - 1.6, f + 1.6, yy, yy + 1.4, "#F4F7FB"); D(B, x - 1.8, x + 2, f - 1.2, f + 1.2, yy + 1.4, yy + 2.4, "#FFFFFF"); D(B, x - 2.6, x + 2.6, f - 1.4, f + 1.4, yy - .4, yy, "#C9D3E0"); },
    bolt: function (B, x, f, y) { var yy = y + 9; D(B, x - .3, x + .3, f - .3, f + .3, yy, yy + 2, "#FFD83D"); D(B, x - .3, x + .9, f - .3, f + .3, yy - .4, yy, "#FFD83D"); D(B, x + .3, x + .9, f - .3, f + .3, yy - 2.4, yy - .4, "#FFD83D"); },
    windsock: function (B, x, f, y) { D(B, x - .15, x + .15, f - .15, f + .15, y, y + 6, "#D9DDE2"); for (var k = 0; k < 4; k++) D(B, x + .15 + k * .8, x + .95 + k * .8, f - .45 + k * .06, f + .45 - k * .06, y + 5 - k * .1, y + 5.8 - k * .1, k % 2 ? "#FFFFFF" : "#E8590C"); },
    hourglass: function (B, x, f, y) { D(B, x - 1.8, x + 1.8, f - 1.8, f + 1.8, y, y + .5, "#8A5A2B"); D(B, x - 1.8, x + 1.8, f - 1.8, f + 1.8, y + 7.5, y + 8, "#8A5A2B"); [-1.5, 1.5].forEach(function (k) { D(B, x + k - .15, x + k + .15, f - 1.5, f - 1.2, y + .5, y + 7.5, "#8A5A2B"); D(B, x + k - .15, x + k + .15, f + 1.2, f + 1.5, y + .5, y + 7.5, "#8A5A2B"); });
      for (var i = 0; i < 4; i++) { var w = 1.2 - i * .28; D(B, x - w, x + w, f - w, f + w, y + .5 + i * .6, y + 1.1 + i * .6, "#E8C98F"); D(B, x - w - .1, x + w + .1, f - w - .1, f + w + .1, y + 7.5 - (i + 1) * .7, y + 7.5 - i * .7, i < 2 ? "#E8C98F" : "#D9EEF5"); } D(B, x - .1, x + .1, f - .1, f + .1, y + 3, y + 5, "#E8C98F"); },
    dune: function (B, x, f, y) { D(B, x - 4, x + 4, f - 3, f + 3, y - .5, y + .6, "#E8C98F"); D(B, x - 2.6, x + 2.6, f - 2, f + 2, y + .6, y + 1.4, "#F0D7A6"); },
    portal: function (B, x, f, y, c) { c = c || ["#8B5CF6", "#27C3C3", "#F2B632", "#E5484D"][Math.floor(hash(f) * 4)]; D(B, x - .5, x + .5, f - 3, f - 2.2, y, y + 7, c); D(B, x - .5, x + .5, f + 2.2, f + 3, y, y + 7, c); D(B, x - .5, x + .5, f - 3, f + 3, y + 6.2, y + 7, c); D(B, x - .2, x + .2, f - 2.2, f + 2.2, y + .4, y + 6.2, "#E9E4FF"); },
    gear: function (B, x, f, y) { var yy = y + 5; D(B, x - .3, x + .3, f - 2, f + 2, yy - 2, yy + 2, "#C9A227"); for (var k = 0; k < 8; k++) { var a = k / 8 * 6.283; D(B, x - .3, x + .3, f + Math.cos(a) * 2.3 - .35, f + Math.cos(a) * 2.3 + .35, yy + Math.sin(a) * 2.3 - .35, yy + Math.sin(a) * 2.3 + .35, "#C9A227"); } D(B, x - .35, x + .35, f - .6, f + .6, yy - .6, yy + .6, "#8A5A12"); D(B, x - .1, x + .1, f - .1, f + .1, yy - 7, yy, "#5A3A22"); },
    track: function (B, x, f, y) { D(B, x - 2, x + 2, f - 6, f + 6, y - .2, y, "#5A4636"); [-1.2, 1.2].forEach(function (k) { D(B, x + k - .12, x + k + .12, f - 6, f + 6, y, y + .25, "#9AA4AE"); }); for (var k2 = -5; k2 <= 5; k2 += 1.5) D(B, x - 1.6, x + 1.6, f + k2 - .25, f + k2 + .25, y - .1, y + .1, "#3B2A20"); },
    signal: function (B, x, f, y) { D(B, x - .2, x + .2, f - .2, f + .2, y, y + 6, "#2A2F36"); D(B, x - .5, x + .5, f - .5, f + .5, y + 6, y + 8, "#1B1B1F"); D(B, x - .3, x + .3, f + .5, f + .6, y + 7.3, y + 7.8, "#E5484D"); D(B, x - .3, x + .3, f + .5, f + .6, y + 6.4, y + 6.9, "#3DDC84"); }
  };
  GR.kits.w1 = {
    props: P,
    // decorations on islands beside the course: one every 13-18 units, alternating sides, picked from the map's list
    side: function (list, isle) {
      isle = isle || ["#6BBE5A", "#C79B5A"];
      return function (B, f0, f1, y, w) {
        for (var f = Math.ceil(f0 / 15) * 15 + 4; f < f1 - 2; f += 15) {
          [-1, 1].forEach(function (s, i) {
            var r = hash(f * 3 + i), x = s * (w + 6 + r * 4), name = list[Math.floor(r * list.length * .999)], top = y - 1 - Math.floor(hash(f + i) * 3);
            if (hash(f * 7 + i) < .2) return;
            D(B, x - 3.4, x + 3.4, f - 3.4, f + 3.4, top - 10, top - .6, isle[1]); D(B, x - 3.4, x + 3.4, f - 3.4, f + 3.4, top - .6, top, isle[0]);
            P[name] && P[name](B, x, f, top);
          });
        }
      };
    },
    // the start arch: two pillars, a banner and the world's big clock on top
    arch: function (col) {
      return function (B, f, y, pal) {
        var c = col || pal.trim; D(B, -5.6, -4.4, f, f + 2, y, y + 9, c); D(B, 4.4, 5.6, f, f + 2, y, y + 9, c); D(B, -5.6, 5.6, f, f + 2, y + 8.2, y + 9.4, "#F2B632");
        P.clock(B, 0, f + 1, y + 4.2, 3.4);
      };
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 1: Present Simple — Daily Routine Town (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t01 = {
    id: "t01", n: 1, world: 1, topic: "present-simple", title: "Present Simple", name: "Daily Routine Town", icon: "⏰", color: "#F2B632", gates: 6,
    blurb: "A sunny morning town of giant clocks, bakeries and buses. Conveyor belts carry you like a daily habit.",
    env: { gate: ["#F2DCB4", "#E76F51"], sky: "#BFE3FF", ground: "#3FB6C9", fx: "leaves", hemi: ["#FFF6E0", "#B79A6A", 1], sun: ["#FFE9C2", 1.3] },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["clock", "house", "tree", "bus", "house", "tree"], ["#7BC043", "#C79B5A"]), arch: K.arch("#E76F51") }, { deck: "#F2DCB4", deck2: "#D9B98A", trim: "#E76F51", rail: "#C98F5A", plat: "#2A9D8F", plat2: "#F4A261", belt: "#3B4252", stripe: "#F2B632" });
      
      C.start();
      C.belt(26, { vf: -2.2 });
      C.gate();
      C.movers(2);
      C.gate();
      C.lows(3);
      C.gate();
      C.pad();
      C.belt(30, { vf: 0, vx: 2.4, lows: [.5] });
      C.gate();
      C.sweepers([1.5, -1.7]);
      C.gate();
      C.movers(2, { speed: 1 });
      C.gate();
      C.belt(24, { vf: -3 });
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 2: Present Continuous — Live TV Studio (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t02 = {
    id: "t02", n: 2, world: 1, topic: "present-continuous", title: "Present Continuous", name: "Live TV Studio", icon: "🎬", color: "#7C5CFA", gates: 6,
    blurb: "An ON AIR studio where the set changes while you run: moving walls, spinning stages and shutters that open and close.",
    env: { gate: ["#4A4068", "#F2B632"], sky: "#2B2147", ground: "#1E1A2E", fx: "confetti", clouds: false, hemi: ["#F4EEFF", "#3B2A6B", 1.25], sun: ["#FFF3D6", 1.35], fogK: 1.2 },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["light", "camera", "screen", "light", "camera"], ["#3B4252", "#2A2F36"]), arch: K.arch("#E5484D") }, { deck: "#3B3355", deck2: "#2A2440", under: "#1E1A2E", trim: "#F2B632", rail: "#5B4B8A", plat: "#27C3C3", plat2: "#E5484D", wall: "#8B5CF6", low: "#F2B632", tile: ["#B9A5FF", "#9B86F2"] });
      
      C.start();
      C.shutters(2);
      C.gate();
      C.spins(2);
      C.gate();
      C.walls({ n: 2 });
      C.gate();
      C.sweepers([1.8]);
      C.spins(2, { w: 1.3 });
      C.gate();
      C.shutters(3);
      C.gate();
      C.walls({ n: 2, low: [1] });
      C.gate();
      C.spins(3);
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 3: Past Simple — Dinosaur Dig Site (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t03 = {
    id: "t03", n: 3, world: 1, topic: "past-simple", title: "Past Simple", name: "Dinosaur Dig Site", icon: "🦴", color: "#E8590C", gates: 6,
    blurb: "A desert excavation with fossil bones, crumbling ledges and rolling stone boulders.",
    env: { gate: ["#D9B074", "#8A5A2B"], sky: "#F6D9A8", ground: "#D9B074", fx: "sand", hemi: ["#FFF1D6", "#B9885A", 1], sun: ["#FFE0B0", 1.35], cloud: "#FFF6E6" },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["bones", "rock", "cactus", "tent", "rock", "cactus"], ["#E8C98F", "#B9885A"]), arch: K.arch("#B9885A") }, { deck: "#E3C08A", deck2: "#C79A62", under: "#9C7A4A", trim: "#E8590C", rail: "#A67B50", plat: "#C9A46A", plat2: "#E8590C", low: "#B3262A" });
      
      C.start();
      C.balls(40);
      C.gate();
      C.fallers(3);
      C.gate();
      C.stairs(4, .4);
      C.lows(2);
      C.gate();
      C.balls(36, { lanes: [[-3, 8, 0], [0, 9, .4], [3, 8, .7], [-1.5, 10, .2]] });
      C.gate();
      C.drop(1.6);
      C.fallers(4);
      C.gate();
      C.stairs(3, 1);
      C.gate();
      C.balls(30);
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 4: Past Continuous — Midnight Express (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t04 = {
    id: "t04", n: 4, world: 1, topic: "past-continuous", title: "Past Continuous", name: "Midnight Express", icon: "🚂", color: "#2B41C4", gates: 6,
    blurb: "Run along the roofs of a night train, hopping between carriages under swinging signal arms.",
    env: { gate: ["#6B2232", "#C9A227"], sky: "#16203F", ground: "#101830", fx: "stars", stars: true, clouds: false, hemi: ["#C9D6FF", "#2A2440", .95], sun: ["#DDE6FF", 1.05], fogK: 1.1 },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["track", "signal", "lamp", "track", "signal"], ["#3B4252", "#2A2F36"]), arch: K.arch("#C9A227") }, { deck: "#8E2F3E", deck2: "#5A1F2A", under: "#2A2F36", trim: "#C9A227", rail: "#6B2232", plat: "#3B4252", plat2: "#C9A227", low: "#F2B632" });
      function cars(n) { for (var i = 0; i < n; i++) { C.deck(16, { w: 7, rails: false }); if (i < n - 1) C.gap(1.8); } C.gap(1.8); }
      C.start();
      cars(3);
      C.gate();
      C.plank(24, { hammers: [1.9] });
      C.gate();
      C.movers(2);
      C.gate();
      C.lows(3);
      C.gate();
      C.sweepers([2, -2]);
      C.gate();
      cars(4);
      C.gate();
      C.plank(20, { hammers: [2.1, 2.3] });
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 5: Present Perfect — Hall of Achievements (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t05 = {
    id: "t05", n: 5, world: 1, topic: "present-perfect", title: "Present Perfect", name: "Hall of Achievements", icon: "🏆", color: "#C9A227", gates: 6,
    blurb: "A trophy museum with laser shutters, rising display pillars and blinking glass floors.",
    env: { gate: ["#F4ECD8", "#C9A227"], sky: "#EDE3CF", ground: "#B8A27A", fx: "dust", hemi: ["#FFF8E8", "#9C8A64", 1.05], sun: ["#FFF1D0", 1.25], cloud: "#FFF8E8" },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["column", "trophy", "column", "trophy"], ["#E9E1CF", "#B8A88A"]), arch: K.arch("#C9A227") }, { deck: "#F4ECD8", deck2: "#D9CDB2", under: "#B8A88A", trim: "#C9A227", rail: "#C9B88A", plat: "#C9A227", plat2: "#8E2F3E", wall: "#E5484D", tile: ["#D9F2FF", "#BFE8F5"] });
      
      C.start();
      C.shutters(2, { color: "#E5484D" });
      C.gate();
      C.pillars(4);
      C.gate();
      C.tiles(4);
      C.gate();
      C.plank(22, { w: 1.6, color: "#C9A227" });
      C.gate();
      C.pillars(5, { zig: true });
      C.gate();
      C.shutters(3, { color: "#E5484D" });
      C.gate();
      C.tiles(3);
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 6: Past Perfect — Layers of the Ancient Ruins (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t06 = {
    id: "t06", n: 6, world: 1, topic: "past-perfect", title: "Past Perfect", name: "Layers of the Ancient Ruins", icon: "🏛️", color: "#4E9A57", gates: 6,
    blurb: "Ruins built in layers of history: start on the newest level and go down, step by step, into older ones.",
    env: { gate: ["#B8A88A", "#4E9A57"], sky: "#CFE8D2", ground: "#2F6B4A", fx: "leaves", hemi: ["#EFFFF0", "#5A7A4A", 1], sun: ["#FFF1D0", 1.2] },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["column", "archway", "vines", "column", "tree"], ["#6BBE5A", "#8A7A5A"]), arch: K.arch("#A89878") }, { deck: "#C9BC9C", deck2: "#A89878", under: "#7A6A4A", trim: "#4E9A57", rail: "#A89878", plat: "#8A7A5A", plat2: "#B8A27A", tile: ["#D9CDB2", "#C9BC9C"] });
      
      C.y = 9;
      C.start();
      C.hammers(2);
      C.gate();
      C.fallers(3);
      C.drop(2.5);
      C.gate();
      C.stairs(6, -.5);
      C.hammers(1, { speed: 2.1 });
      C.gate();
      C.stairs(3, .4);
      C.tiles(3);
      C.gate();
      C.fallers(3);
      C.drop(2);
      C.gate();
      C.hammers(2, { speed: 2.2 });
      C.gate();
      C.stairs(5, -.5);
      C.fallers(2);
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 7: Future Simple — Rocket Launch Base (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t07 = {
    id: "t07", n: 7, world: 1, topic: "future-simple", title: "Future Simple", name: "Rocket Launch Base", icon: "🚀", color: "#E5484D", gates: 6,
    blurb: "A launch base of jump pads, lifts, rocket-thruster winds and rising launch pillars. You finish high above the ground.",
    env: { gate: ["#D9DDE2", "#E5484D"], sky: "#9FD3FF", ground: "#5D6B7A", fx: "sparks", hemi: ["#F4FAFF", "#6B7A8A", 1], sun: ["#FFFFFF", 1.3] },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["rocket", "tower", "dish", "rocket", "dish"], ["#9AA4AE", "#5D6B7A"]), arch: K.arch("#E5484D") }, { deck: "#D9DDE2", deck2: "#9AA4AE", under: "#5D6B7A", trim: "#E5484D", rail: "#B9BEC6", plat: "#2B41C4", plat2: "#E5484D", belt: "#3B4252" });
      
      C.start();
      C.pad({ up: 2 });
      C.gate();
      C.lift(3);
      C.gate();
      C.wind(30);
      C.gate();
      C.pillars(4);
      C.gate();
      C.pad();
      C.wind(26, { fx: -3.4, gust: true });
      C.gate();
      C.lift(3);
      C.gate();
      C.pillars(3, { zig: true });
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 8: Future Forms — Weather Forecast Tower (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t08 = {
    id: "t08", n: 8, world: 1, topic: "future-forms", title: "Future Forms", name: "Weather Forecast Tower", icon: "⛈️", color: "#46617A", gates: 6,
    blurb: "A storm-watching tower where gusts of wind, rocking platforms and icy floors change with the forecast.",
    env: { gate: ["#9AA4AE", "#2F6FDE"], sky: "#8C9BB4", ground: "#46617A", fx: "snow", hemi: ["#E8EEF8", "#4A5A6E", 1.05], sun: ["#EAF2FF", 1.05], cloud: "#C9D3E0", fogK: .9 },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["cloud", "windsock", "bolt", "cloud", "dish"], ["#9AA4AE", "#5D6B7A"]), arch: K.arch("#2F6FDE") }, { deck: "#B9C6D8", deck2: "#8C9BB4", under: "#5D6B7A", trim: "#2F6FDE", rail: "#9AA4AE", plat: "#2F6FDE", plat2: "#F2B632", wall: "#46617A" });
      
      C.start();
      C.wind(28, { gust: true });
      C.gate();
      C.seesaws(2);
      C.gate();
      C.ice(30);
      C.gate();
      C.shutters(2, { color: "#46617A" });
      C.gate();
      C.wind(30, { fx: -3.5 });
      C.gate();
      C.seesaws(3);
      C.gate();
      C.ice(26);
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 9: Present Perfect Continuous — Hourglass Desert (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t09 = {
    id: "t09", n: 9, world: 1, topic: "present-perfect-continuous", title: "Present Perfect Continuous", name: "Hourglass Desert", icon: "⏳", color: "#C98F12", gates: 6,
    blurb: "Rivers of flowing sand, sinking pillars and boulders that have been rolling for hours.",
    env: { gate: ["#E8C98F", "#8A5A2B"], sky: "#FFE2B0", ground: "#E0B87A", fx: "sand", hemi: ["#FFF4DE", "#C79A62", 1], sun: ["#FFE6B8", 1.4], cloud: "#FFF6E6" },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["hourglass", "dune", "cactus", "hourglass", "rock"], ["#F0D7A6", "#C79A62"]), arch: K.arch("#8A5A2B") }, { deck: "#F0D7A6", deck2: "#D9B074", under: "#B98A52", trim: "#8A5A2B", rail: "#C79A62", plat: "#C98F12", plat2: "#8A5A2B", belt: "#C79A62", stripe: "#F7E6C0" });
      
      C.start();
      C.belt(30, { vf: -2.5 });
      C.gate();
      C.pillars(4);
      C.gate();
      C.balls(34);
      C.gate();
      C.fallers(3);
      C.gate();
      C.belt(28, { vf: 0, vx: -2.6 });
      C.gate();
      C.pillars(5, { zig: true });
      C.gate();
      C.balls(30, { lanes: [[-3, 9, 0], [0, 10, .5], [3, 9, .25]] });
      C.finish();
    }
  };
})();

/* Gate Rush · World 1 (Tenses) · Map 10: Mixed Tenses — Time Portal Gauntlet (epz-patch:maps) */
(function () {
  var GR = (window.GR = window.GR || {}); GR.maps = GR.maps || {};
  GR.maps.t10 = {
    id: "t10", n: 10, world: 1, topic: "mixed-tenses", title: "Mixed Tenses", name: "Time Portal Gauntlet", icon: "🌀", color: "#8B5CF6", gates: 6,
    blurb: "Every section jumps to another time through a portal: split paths, spinning discs, hammers and blinking tiles.",
    env: { gate: ["#5B4B8A", "#27C3C3"], sky: "#2B2160", ground: "#3B2A6B", fx: "sparks", stars: true, clouds: false, hemi: ["#EDE6FF", "#3B2A6B", 1.15], sun: ["#F4EEFF", 1.2], fogK: 1.15 },
    build: function (B, o) {
      var K = GR.kits.w1, C = GR.course(B, o, { side: K.side(["portal", "gear", "clock", "portal", "hourglass"], ["#8B5CF6", "#3B2A6B"]), arch: K.arch("#8B5CF6") }, { deck: "#5B4B8A", deck2: "#3B2A6B", under: "#2B2160", trim: "#27C3C3", rail: "#7C5CFA", plat: "#27C3C3", plat2: "#F2B632", tile: ["#B9A5FF", "#9B86F2"], low: "#E5484D" });
      
      C.start();
      C.fork(30);
      C.gate();
      C.spins(2);
      C.gate();
      C.hammers(2);
      C.gate();
      C.tiles(3);
      C.gate();
      C.pad({ up: 2 });
      C.belt(20, { vf: -2.5 });
      C.gate();
      C.fork(28);
      C.gate();
      C.spins(3, { w: 1.3 });
      C.finish();
    }
  };
})();
