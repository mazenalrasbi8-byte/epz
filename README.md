# epz

English Practice Zone — a static site (`index.html`) with Supabase for the shared class ranking.

## Gate Rush (replaces the Challenge tab)

A 3D parkour race with English question doors. One map ("Sunrise Fort Run").

- Code: `gaterush/*.js`, loaded only when a student opens the Gate Rush tab (Three.js from the CDN, no model files).
- Shared weekly leaderboard, prizes and champions: run `gate-rush.sql` **once** in the Supabase SQL editor
  (change the teacher key in it first). Without it the game still works and keeps results on the phone.
- The card duel is unchanged and reachable from the Gate Rush screen (`#duel`).
- More maps later: add a file that registers `GR.maps.<id>` (see `gaterush/map-fort.js`); the engine does not change.

## Easy Level course (`#easy`)

7 skills, 40 Parts, 200 tests, 2,000 questions: one shared curriculum for Grades 9 to 12, with progress kept per grade and class (`state.easy`).

- Code: `easy/course.js` (curriculum, screens, Learn viewer, scoring), loaded only when a student opens the course.
- Content: `easy/data/<skill>-<n>.js`, one file per Part (a Learn section and exactly 5 tests of 10 questions). Loaded when that Part opens.
- A skill goes live when its files exist and it is added to `E.READY` in `easy/course.js`. Written so far: Grammar (7), Vocabulary (8), Reading (5) and Listening (5).
- Check content before merging: see `easy/validate.js`.
- Tests are normal EPZ activities (ids `ez-<skill>-<part>-<test>`), so points, streaks, badges and the ranking work as before. Retakes only earn points for answers that beat the best score.