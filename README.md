# epz

English Practice Zone — a static site (`index.html`) with Supabase for the shared class ranking.

## Gate Rush (replaces the Challenge tab)

A 3D parkour race with English question doors. One map ("Sunrise Fort Run").

- Code: `gaterush/*.js`, loaded only when a student opens the Gate Rush tab (Three.js from the CDN, no model files).
- Shared weekly leaderboard, prizes and champions: run `gate-rush.sql` **once** in the Supabase SQL editor
  (change the teacher key in it first). Without it the game still works and keeps results on the phone.
- The card duel is unchanged and reachable from the Gate Rush screen (`#duel`).
- More maps later: add a file that registers `GR.maps.<id>` (see `gaterush/map-fort.js`); the engine does not change.
