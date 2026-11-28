/* Easy Level / Story Order / Topic 4: Beginning, Middle and Ending (the items in each ordering question are listed in the CORRECT order) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, o = h.o, mt = h.mt, T = h.T;
  E.parts["scramble-4"] = {
    learn: [
      { k: "intro", kick: "Three parts", e: "📚", h: "Beginning, middle and ending", p: ["Every story has **three parts**: a **beginning**, a **middle** and an **ending**.", "Knowing these parts helps you put sentences in order and understand the story."], ex: [["**Beginning:** A boy loses his ball."], ["**Middle:** He looks for it everywhere."], ["**Ending:** He finds it and is happy."]] },
      { k: "timeline", kick: "The story map", h: "What each part does", items: [["Beginning", "We meet the characters and the place. We learn the problem."], ["Middle", "The characters try to solve the problem. Things happen."], ["Ending", "The problem is solved. We learn how the story ends."]], note: "The ending often tells how the characters feel." },
      { k: "table", kick: "Clues", h: "How to find each part", head: ["Part", "Look for", "Example words"], rows: [["**Beginning**", "who, where, when, the problem", "One day, there was a boy named Ali."], ["**Middle**", "what the characters do", "He looked, he asked, he tried."], ["**Ending**", "the solution and the feeling", "In the end, he was happy."]] },
      { k: "examples", kick: "Example", h: "The lost cat", items: [["**Beginning:** Younis has a white cat called Misha. One evening he cannot find her.", "who, what, problem"], ["**Middle:** He looks in the garden and the house. His neighbours help him look.", "what they do"], ["**Ending:** They find Misha under a car. Younis is very happy.", "solution and feeling"]] },
      { k: "tip", h: "Quick tips", items: ["Ask: **Who is in the story? What is the problem?** That is the beginning.", "Ask: **What do they do?** That is the middle.", "Ask: **How does it end? How do they feel?** That is the ending."] },
      { k: "practice", h: "Put the story in order", p: "Tap the sentences in the correct order.", qs: [o("The new bicycle: put the story in order.", ["Hamad wanted a new bicycle.", "He saved money for six months.", "At last he bought a red bicycle.", "He was very happy."], "Wish, save, buy, happy."), m("Which part tells how the story ends?", ["the ending", "the beginning", "the middle"], "The ending tells how the story ends."), tf("The beginning of a story often tells who and where.", true, "The beginning introduces the characters and the place."), f("The problem is solved in the ___ . Type the part.", "ending", "The problem is solved in the ending.")] }
    ],
    tests: [
      T("Parts of a story", "Put the three parts of each story in order.", [
        o("The lost ball: put the three parts in order.", ["Ali lost his new ball in a tree.", "An old man brought a long stick.", "Ali got his ball back and was happy."], "Beginning, middle, ending."),
        o("The late bus: put the three parts in order.", ["Khalid woke up late for his exam.", "He ran after the bus but it left.", "A neighbour gave him a lift and he arrived on time."], "Beginning, middle, ending."),
        o("The wallet: put the three parts in order.", ["Hamad found a wallet at the bus stop.", "He took it to the police.", "The owner was very happy."], "Beginning, middle, ending."),
        o("The party: put the three parts in order.", ["It was Mother's birthday.", "The children made a cake and hid.", "They shouted 'Happy birthday!' and Mother smiled."], "Beginning, middle, ending."),
        o("The seed: put the three parts in order.", ["Rashid had a small seed.", "He put it in soil and watered it.", "A beautiful flower grew."], "Beginning, middle, ending."),
        m("Which part of a story tells who and where?", ["the beginning", "the middle", "the ending"], "The beginning tells who and where."),
        m("Which part of a story tells how it ends?", ["the ending", "the beginning", "the middle"], "The ending tells how it ends."),
        m("Which part tells what the characters do?", ["the middle", "the beginning", "the ending"], "The middle tells what happens."),
        tf("A story can start with the ending.", false, "The ending comes last."),
        mt("Match each part with what it tells.", [["beginning", "who and where"], ["middle", "what happens"], ["ending", "how it ends"], ["all three", "make a whole story"]], "Each part has its own job.")
      ]),
      T("Beginnings", "Find and put the beginning sentences in order.", [
        o("Meeting a friend: put the story in order.", ["Salem came to a new school.", "He did not know anyone.", "A boy called Hamad said hello.", "They became friends."], "New school, no friends, hello, friends."),
        o("A trip: put the story in order.", ["The family planned a trip to the beach.", "They packed the car.", "They drove for an hour.", "They arrived at the sea."], "Plan, pack, drive, arrive."),
        o("A pet: put the story in order.", ["Younis wanted a cat.", "His father said yes.", "They went to the shop.", "Younis chose a white cat."], "Want, yes, shop, choose."),
        o("A new game: put the story in order.", ["The class had a football match.", "The teams came on to the pitch.", "The referee blew the whistle.", "The game began."], "Match, teams, whistle, begin."),
        o("A visit: put the story in order.", ["A guest came to the house.", "Father welcomed him at the door.", "Mother brought coffee and dates.", "They sat and talked."], "Guest, welcome, coffee, talk."),
        m("Which sentence is a good BEGINNING?", ["One day, a boy found a wallet.", "In the end, they were happy.", "Then they went home."], "'One day...' starts a story."),
        m("Which sentence is a good BEGINNING?", ["Salem came to a new school.", "The boys shook hands at last.", "They lived happily."], "It tells who and what is new."),
        m("What does the beginning of a story usually tell us?", ["who, where and the problem", "how it ends", "who wins"], "The beginning introduces the characters and the problem."),
        tf("'In the end' is a good way to start a story.", false, "'In the end' shows the ending of a story."),
        f("'One ___ , a boy lost his bag.' Type the word.", "day", "One day starts many stories.")
      ]),
      T("Middles", "Find and put the middle sentences in order.", [
        o("Looking for the cat: put the story in order.", ["Younis looked in the garden.", "He looked under his bed.", "His neighbours helped him.", "They called the cat's name."], "Garden, bed, neighbours, call."),
        o("Solving a problem: put the story in order.", ["The boys were losing the match.", "Ali told them not to give up.", "They ran faster.", "Ali scored a goal."], "Losing, don't give up, faster, goal."),
        o("The long walk: put the story in order.", ["The tourist could not find the fort.", "He asked a man for help.", "The man told him the way.", "The tourist walked to the souq."], "Lost, ask, way, walk."),
        o("Fixing the bicycle: put the story in order.", ["The tyre was flat.", "Hamad took out the tyre.", "He put in a new one.", "He pumped some air."], "Flat, take out, new, pump."),
        o("Baking a cake: put the story in order.", ["Mother mixed the flour and eggs.", "She poured it into a tin.", "She put the tin in the oven.", "She waited for forty minutes."], "Mix, pour, oven, wait."),
        m("Which sentence belongs in the MIDDLE?", ["He looked in the garden and the house.", "One day, a boy lost his cat.", "In the end, he found it."], "Looking is what happens in the middle."),
        m("Which sentence belongs in the MIDDLE?", ["The neighbours helped him look.", "Once upon a time, there was a king.", "They lived happily."], "Helping to look is part of the middle."),
        m("What happens in the middle of a story?", ["The characters try to solve the problem.", "We meet the characters.", "The problem is solved."], "The characters try to solve the problem in the middle."),
        tf("The middle is usually the shortest part.", false, "The middle is often the longest part, because it has most events."),
        mt("Match each part with its sentence.", [["beginning", "A boy lost his ball."], ["middle", "He looked everywhere for it."], ["ending", "He found it and smiled."], ["problem", "the ball is lost"]], "Each sentence belongs to a part.")
      ]),
      T("Endings", "Find and put the ending sentences in order.", [
        o("The ending of the lost cat: put the story in order.", ["They found Misha under a car.", "She was not hurt.", "Younis carried her home.", "He gave her some milk."], "Found, not hurt, home, milk."),
        o("The ending of the match: put the story in order.", ["Salem scored the winning goal.", "The referee blew his whistle.", "The score was two to one.", "The boys shook hands."], "Goal, whistle, score, handshake."),
        o("The ending of the party: put the story in order.", ["Mother blew out the candles.", "Everyone ate some cake.", "The children cleaned the room.", "Mother said thank you."], "Candles, cake, clean, thanks."),
        o("The ending of the trip: put the story in order.", ["The sun began to set.", "The family packed their things.", "They drove home.", "They were tired but happy."], "Sun, pack, drive, happy."),
        o("The ending of the exam: put the story in order.", ["Khalid finished the exam.", "He gave his paper to the teacher.", "He left the room.", "He felt very proud."], "Finish, give, leave, proud."),
        m("Which sentence is a good ENDING?", ["In the end, Younis found his cat and was happy.", "One day, Younis lost his cat.", "Younis looked in the garden."], "'In the end...' shows the ending."),
        m("What does the ending of a story usually tell us?", ["how it ends and how the characters feel", "who is in the story", "where the story begins"], "The ending shows the solution and feelings."),
        m("Which word often shows the ending?", ["finally", "one day", "first"], "Finally shows the end."),
        tf("The problem is usually solved in the ending.", true, "Yes, the ending usually solves the problem."),
        f("'In the ___ , they were happy.' Type the word.", "end", "'In the end' shows the ending.")
      ]),
      T("Mixed review", "Put different stories in order.", [
        o("The fisherman: put the three parts in order.", ["Salim was a fisherman who lived by the sea.", "One day he caught a very big fish.", "He sold it and bought a new boat."], "Beginning, middle, ending."),
        o("The camel race: put the story in order.", ["Rashid trained his camel every day.", "On the day of the race, the camel ran fast.", "The camel came first.", "Rashid hugged his camel."], "Train, race, first, hug."),
        o("The new teacher: put the story in order.", ["A new teacher came to the school.", "The boys were nervous.", "The teacher smiled and told a joke.", "The boys laughed and relaxed."], "New teacher, nervous, smile, laugh."),
        o("The library book: put the story in order.", ["Younis borrowed a book.", "He read it for three days.", "He took it back to the library.", "He borrowed another one."], "Borrow, read, return, another."),
        o("The picnic: put the story in order.", ["The family went to the park.", "They put a mat on the grass.", "They ate sandwiches and fruit.", "They played football."], "Go, mat, eat, play."),
        m("In 'A boy lost his ball. He looked for it. He found it.', what is the ending?", ["He found it.", "A boy lost his ball.", "He looked for it."], "Finding the ball is the ending."),
        m("In 'A boy lost his ball. He looked for it. He found it.', what is the beginning?", ["A boy lost his ball.", "He found it.", "He looked for it."], "Losing the ball is the beginning."),
        tf("A story has a beginning, a middle and an ending.", true, "Every story has these three parts."),
        f("The ___ of the story tells how it ends. Type the part.", "ending", "The ending tells how the story ends."),
        mt("Match each part of a story with a clue word.", [["beginning", "one day"], ["middle", "then"], ["ending", "in the end"], ["problem", "but"]], "Clue words help you find the part.")
      ])
    ]
  };
})(window.EPZ_EASY);
