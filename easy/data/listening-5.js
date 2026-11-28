/* Easy Level / Listening / Part 5: Simple Instructions (audio is read by the phone's English voice; the text is never shown before the test ends) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, o = h.o, T = h.T;
  E.parts["listening-5"] = {
    learn: [
      { k: "intro", kick: "Listening skills", e: "📋", h: "Simple instructions", p: ["**Instructions** tell us what to do. Teachers, recipes, signs and machines all give instructions.", "Instructions use the **base verb** (Open your book. Sit down.) and **order words** (first, next, then, finally). Listen for the **order** of the steps."], ex: [["**Open** your books. **Read** page ten."], ["**First**, boil the water. **Then** add the tea."]] },
      { k: "table", kick: "Order words", h: "Words that show the order", head: ["Word", "When"], rows: [["**first**", "the start"], ["**next** / **then** / **after that**", "the middle"], ["**finally** / **last**", "the end"], ["**before** / **after**", "something comes earlier or later"]] },
      { k: "table", kick: "Do and do not", h: "Positive and negative instructions", head: ["Positive (do)", "Negative (do not)"], rows: [["**Sit** down.", "**Do not** talk."], ["**Listen** carefully.", "**Do not** run in the corridor."], ["**Wash** your hands.", "**Do not** touch the hot pot."], ["**Wear** a helmet.", "**Don't** forget your book."]], note: "**Don't** is the short form of **do not**." },
      { k: "steps", kick: "Skill 1", h: "Listen for the order of steps", q: "What do you do after you boil the water?", items: [["Listen for the first step", "\"**First**, boil the water.\""], ["Listen for the order words", "\"**Then** put the tea in the cup.\""], ["Find the step after the keyword", "After boil the water comes put the tea in the cup."], ["Choose the answer", "Put the tea in the cup."]] },
      { k: "listen", kick: "Guided listening", h: "Try it: classroom instructions", p: "Press Play, then answer. You can play it again.", script: "Teacher: Good morning, class. Please sit down. Open your books at page ten. Read the story quietly. Do not talk. Then answer the questions in your notebook.", qs: [m("What page must the students open?", ["page ten", "page twelve", "page two"], "The teacher says: 'Open your books at page ten.'"), m("How must they read?", ["quietly", "loudly", "fast"], "The teacher says: 'Read the story quietly.'"), m("What must they not do?", ["talk", "write", "sit"], "The teacher says: 'Do not talk.'")] },
      { k: "tip", h: "Listening tips", items: ["Number the steps in your head or on paper: 1, 2, 3.", "Listen for **do not** and **don't**. They tell you what is not allowed.", "If you miss a step, press **Play** again and listen for the **order words**."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which word shows the last step?", ["finally", "first", "next"], "Finally shows the last step."), m("Which is a correct instruction?", ["Open your book.", "You opens your book.", "Opening your book."], "Instructions use the base verb: Open your book."), f("'___ not run in the corridor.' Type the word.", "Do", "'Do not' tells us it is not allowed."), tf("'First' is the beginning of the instructions.", true, "First shows the first step.")] }
    ],
    tests: [
      T("In the Classroom", "Listen to the teacher, then answer the 10 questions.", [
        m("What must the students do first?", ["sit down", "open their books", "write their names"], "The teacher says: 'Please sit down.'"),
        m("What page must they open?", ["page twenty", "page twelve", "page two"], "The teacher says: 'Open your books at page twenty.'"),
        m("What must they read?", ["the story", "the poem", "the letter"], "The teacher says: 'Read the story.'"),
        m("How long must they read?", ["five minutes", "fifteen minutes", "fifty minutes"], "The teacher says: 'Read for five minutes.'"),
        m("What must they do after reading?", ["answer the questions", "draw a picture", "go home"], "The teacher says: 'Then answer the questions.'"),
        m("Where must they write the answers?", ["in their notebooks", "on the board", "on their desks"], "The teacher says: 'Write your answers in your notebooks.'"),
        tf("The students can talk to each other.", false, "The teacher says: 'Do not talk.'"),
        m("What must they do if they need help?", ["put up their hands", "shout", "leave the room"], "The teacher says: 'If you need help, put up your hand.'"),
        o("Put the steps in the correct order.", ["Sit down.", "Read the story.", "Answer the questions."], "The teacher says: sit down, then read, and finally answer the questions."),
        m("What does the teacher say at the end?", ["Good luck.", "Goodbye.", "Be quiet."], "The teacher ends: 'Good luck.'")
      ], { audio_text: "Good morning, class. Today we will read a story together, so please listen carefully to the instructions. Please sit down quietly. Take out your notebooks and your pens. Open your books at page twenty. Read the story for five minutes. Do not talk. Then answer the questions. Write your answers in your notebooks. If you need help, put up your hand. Do not shout. When you finish, check your answers again. Good luck." }),
      T("How to Make Tea", "Listen to the instructions, then answer the 10 questions.", [
        m("What do you do first?", ["boil some water", "put the tea in the cup", "add sugar"], "The speaker says: 'First, boil some water.'"),
        m("How much water do you boil?", ["two cups", "ten cups", "twelve cups"], "The speaker says: 'Boil two cups of water.'"),
        m("What do you put in the pot after boiling?", ["a teaspoon of tea", "a cup of milk", "a spoon of salt"], "The speaker says: 'put one teaspoon of tea in the pot.'"),
        m("How long do you wait?", ["three minutes", "thirty minutes", "thirteen minutes"], "The speaker says: 'Wait for three minutes.'"),
        m("What do you do after waiting?", ["pour the tea into cups", "boil the water again", "clean the pot"], "The speaker says: 'Then pour the tea into cups.'"),
        m("What can you add last?", ["sugar or milk", "rice", "salt"], "The speaker says: 'Finally, add sugar or milk if you like.'"),
        tf("You must add the sugar before you boil the water.", false, "The speaker says to add sugar finally, at the end."),
        o("Put the steps in the correct order.", ["Boil the water.", "Wait three minutes.", "Pour the tea into cups."], "The speaker says: first boil the water, then wait three minutes, then pour the tea."),
        m("What must you be careful of?", ["the hot water", "the cold water", "the milk"], "The speaker says: 'Be careful. The water is hot.'"),
        m("What does the speaker say at the end?", ["Enjoy your tea.", "Wash the cups.", "Turn off the light."], "The speaker ends: 'Enjoy your tea.'")
      ], { audio_text: "Tea is a popular drink and many families in Oman drink it in the afternoon. Here is how to make a nice cup of tea. You need a pot, two cups, some tea and some sugar. First, boil two cups of water. Be careful. The water is hot. Next, put one teaspoon of tea in the pot. Pour the hot water into the pot. Wait for three minutes. Then pour the tea into cups. Finally, add sugar or milk if you like. Enjoy your tea." }),
      T("Safety Rules", "Listen to the rules, then answer the 10 questions.", [
        m("Where are the students?", ["in the science lab", "in the library", "in the gym"], "The teacher says: 'Welcome to the science lab.'"),
        m("What must students wear?", ["glasses", "hats", "gloves only"], "The teacher says: 'Always wear safety glasses.'"),
        m("What must students not do?", ["run", "write", "listen"], "The teacher says: 'Do not run in the lab.'"),
        m("What must students not do with the chemicals?", ["touch them", "write about them", "look at them"], "The teacher says: 'Do not touch the chemicals.'"),
        m("What must students do before they start?", ["listen to the teacher", "eat", "go to the playground"], "The teacher says: 'Listen carefully to the teacher before you start.'"),
        tf("Students can eat in the lab.", false, "The teacher says: 'Do not eat or drink in the lab.'"),
        m("What must they do if there is a problem?", ["tell the teacher at once", "ignore it", "go home"], "The teacher says: 'If there is a problem, tell me at once.'"),
        m("What must they do at the end of the lesson?", ["wash their hands", "run to the door", "take the equipment home"], "The teacher says: 'At the end, wash your hands.'"),
        f("The teacher says: 'Keep your bags ___ the desk.' Type the word.", "under", "The teacher says: 'Keep your bags under the desk.'"),
        m("Why are these rules important?", ["to keep everyone safe", "to make the lab beautiful", "to save time"], "The teacher says: 'These rules keep us safe.'")
      ], { audio_text: "Welcome to the science lab. Please listen to the safety rules. Always wear safety glasses. Keep your bags under the desk. Do not run in the lab. Do not touch the chemicals. Do not eat or drink in the lab. Listen carefully to the teacher before you start. If there is a problem, tell me at once. At the end, wash your hands. These rules keep us safe." }),
      T("Printing a Document", "Listen to the instructions, then answer the 10 questions.", [
        m("What must you do first?", ["turn on the computer", "turn on the printer", "buy paper"], "The speaker says: 'First, turn on the computer.'"),
        m("What must you open?", ["your document", "a game", "the internet"], "The speaker says: 'Open your document.'"),
        m("Which button must you click?", ["Print", "Save", "Close"], "The speaker says: 'Click the Print button.'"),
        m("How many copies can you choose?", ["one to five", "ten to twenty", "fifty"], "The speaker says: 'Choose how many copies you want, from one to five.'"),
        m("What do you do after you click Print?", ["wait for the paper", "turn off the computer", "leave the room"], "The speaker says: 'Then wait for the paper.'"),
        tf("You must put the paper in the printer before you click Print.", true, "The speaker says: 'Check that there is paper in the printer.'"),
        m("What must you do if the paper gets stuck?", ["call the teacher", "pull it hard", "turn off the lights"], "The speaker says: 'If the paper gets stuck, call the teacher.'"),
        o("Put the steps in the correct order.", ["Open your document.", "Click Print.", "Take your paper."], "The speaker says: open the document, click Print, then take your paper."),
        m("What must you do at the end?", ["turn off the computer", "go home", "play a game"], "The speaker says: 'Finally, turn off the computer.'"),
        m("Who gives these instructions?", ["the computer teacher", "the doctor", "the driver"], "The speaker talks about the school computer room, so it is the computer teacher.")
      ], { audio_text: "Let me show you how to print a document in the computer room. First, turn on the computer. Open your document. Check that there is paper in the printer. Click the Print button. Choose how many copies you want, from one to five. Then wait for the paper. Take your paper from the printer. If the paper gets stuck, call the teacher. Finally, turn off the computer." }),
      T("Planting a Seed", "Listen to the instructions, then answer the 10 questions.", [
        m("What do you need first?", ["a small pot", "a big bag", "a book"], "The speaker says: 'First, you need a small pot.'"),
        m("What do you put in the pot?", ["soil", "sand", "water only"], "The speaker says: 'Fill the pot with soil.'"),
        m("How deep must the hole be?", ["two centimetres", "twenty centimetres", "two metres"], "The speaker says: 'Make a hole about two centimetres deep.'"),
        m("How many seeds do you put in?", ["two", "ten", "twelve"], "The speaker says: 'Put two seeds in the hole.'"),
        m("What do you do after you put the seeds in?", ["cover them with soil", "pull them out", "dry them"], "The speaker says: 'Then cover the seeds with soil.'"),
        m("How much water do you give?", ["a little water", "a lot of water", "no water"], "The speaker says: 'Give the seeds a little water.'"),
        m("Where must you put the pot?", ["in a sunny place", "in a dark cupboard", "in the fridge"], "The speaker says: 'Put the pot in a sunny place.'"),
        tf("You must water the plant every day.", true, "The speaker says: 'Water it every day.'"),
        m("When will the plant appear?", ["after about one week", "after one day", "after one year"], "The speaker says: 'In about one week you will see a small plant.'"),
        o("Put the steps in the correct order.", ["Fill the pot with soil.", "Put the seeds in the hole.", "Give the seeds some water."], "The speaker says: fill the pot, put the seeds in, then give water.")
      ], { audio_text: "Do you want to grow a plant? It is easy. First, you need a small pot. Fill the pot with soil. Make a hole about two centimetres deep. Put two seeds in the hole. Then cover the seeds with soil. Give the seeds a little water. Put the pot in a sunny place. Water it every day. In about one week you will see a small plant." })
    ]
  };
})(window.EPZ_EASY);
