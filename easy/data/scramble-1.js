/* Easy Level / Story Order / Topic 1: First, Next, Then, Finally
   Ordering questions (o) show the sentences mixed up; the student taps them in the correct order. The items below are in the CORRECT order. */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, o = h.o, mt = h.mt, T = h.T;
  E.parts["scramble-1"] = {
    learn: [
      { k: "intro", kick: "Order words", e: "🧭", h: "First, next, then, finally", p: ["When we tell what happens, we use **order words** so the listener knows which step comes first and which comes last.", "The four most useful order words are **first**, **next**, **then** and **finally**."], ex: [["**First**, I wake up."], ["**Next**, I wash my face."], ["**Then** I eat breakfast."], ["**Finally**, I go to school."]] },
      { k: "timeline", kick: "A timeline", h: "Order words from start to end", items: [["First", "the beginning: the first thing that happens"], ["Next", "the thing that happens after the first"], ["Then", "the thing that happens after that"], ["After that", "another way to say then"], ["Finally", "the end: the last thing that happens"]], note: "You can also use **last**, **at the end** and **in the end**." },
      { k: "table", kick: "Using them", h: "Order words in a sentence", head: ["Order word", "Example", "Notice"], rows: [["**First**", "First, boil the water.", "starts the story"], ["**Next**", "Next, add the tea.", "a comma after it"], ["**Then**", "Then pour the tea.", "often no comma"], ["**Finally**", "Finally, drink it.", "ends the story"]] },
      { k: "examples", kick: "Examples", h: "A short story in order", items: [["**First**, Hamad wakes up at six.", "1"], ["**Next**, he brushes his teeth.", "2"], ["**Then** he has breakfast.", "3"], ["**Finally**, he goes to school.", "4"]] },
      { k: "tip", h: "Quick tips", items: ["Look for **first** at the beginning and **finally** at the end. They are the easiest clues.", "Put **next** and **then** in the middle. Ask: what comes after the first step?", "Read the sentences in your order. Does it make sense, like a real story?"] },
      { k: "practice", h: "Put the sentences in order", p: "Tap the sentences in the correct order.", qs: [o("Making a sandwich: put the steps in order.", ["First, take two pieces of bread.", "Next, put cheese on one piece.", "Then put the other piece on top.", "Finally, eat your sandwich."], "First take the bread, next add the cheese, then close it, finally eat."), m("Which word shows the last step?", ["Finally", "First", "Next"], "Finally shows the end."), f("___, wake up. (the first step) Type the word.", "First", "First starts a list of steps."), tf("'Then' can show a step in the middle.", true, "Next and then show the middle steps.")] }
    ],
    tests: [
      T("Order words", "Choose, type and put the sentences in order.", [
        m("Which word shows the beginning?", ["First", "Finally", "Then"], "First shows the beginning."),
        m("Which word shows the end?", ["Finally", "First", "Next"], "Finally shows the end."),
        f("___, I get up. (the first step) Type the word.", "First", "First is used for the first step."),
        o("Put the sentences in order.", ["First, I wake up.", "Next, I wash my face.", "Then I eat breakfast.", "Finally, I go to school."], "First wake up, next wash, then eat, finally go to school."),
        o("Making tea: put the steps in order.", ["First, boil the water.", "Next, put the tea in the cup.", "Then pour the hot water.", "Finally, add some sugar."], "Boil, put the tea in, pour, then sugar."),
        o("Studying: put the steps in order.", ["First, open the book.", "Next, read the page.", "Then write the answers.", "Finally, close the book."], "Open, read, write, close."),
        o("Washing hands: put the steps in order.", ["First, turn on the water.", "Next, use some soap.", "Then wash your hands well.", "Finally, dry your hands."], "Water, soap, wash, dry."),
        o("Going shopping: put the steps in order.", ["First, make a list.", "Next, go to the shop.", "Then buy the things.", "Finally, go home."], "List, shop, buy, home."),
        tf("'Finally' is used for the last step.", true, "Finally shows the end."),
        mt("Match each order word with its place.", [["First", "the start"], ["Next", "after the first step"], ["Then", "after that"], ["Finally", "the end"]], "Order words show the place in the story.")
      ]),
      T("Making food", "Put the cooking steps in the correct order.", [
        o("Making rice: put the steps in order.", ["First, wash the rice.", "Next, put it in a pot with water.", "Then cook it for twenty minutes.", "Finally, put it on a plate."], "Wash, pot, cook, plate."),
        o("Making an omelette: put the steps in order.", ["First, break two eggs into a bowl.", "Next, mix the eggs.", "Then cook them in a pan.", "Finally, put the omelette on a plate."], "Break, mix, cook, plate."),
        o("Making orange juice: put the steps in order.", ["First, cut the oranges.", "Next, squeeze them.", "Then pour the juice into a glass.", "Finally, add some ice."], "Cut, squeeze, pour, ice."),
        o("Making a salad: put the steps in order.", ["First, wash the vegetables.", "Next, cut them into small pieces.", "Then put them in a bowl.", "Finally, add some oil and salt."], "Wash, cut, bowl, oil and salt."),
        o("Making coffee: put the steps in order.", ["First, heat the water.", "Next, add the coffee.", "Then wait a few minutes.", "Finally, pour it into small cups."], "Heat, add, wait, pour."),
        m("What do you do after you break the eggs?", ["Mix the eggs.", "Eat the omelette.", "Wash the pan."], "After you break the eggs you mix them."),
        m("What is the last step when you make a sandwich?", ["Eat it.", "Buy the bread.", "Cut the cheese."], "The last step is to eat it."),
        tf("You wash the vegetables after you eat the salad.", false, "You wash the vegetables first."),
        f("First, break the eggs. ___, mix them. Type next or then.", "Next|Then", "Next or then shows the second step."),
        m("Which sentence shows the last step?", ["Finally, drink the tea.", "First, drink the tea.", "Next, drink the tea."], "Finally shows the last step.")
      ]),
      T("A morning routine", "Put the morning activities in the correct order.", [
        o("Hamad's morning: put the sentences in order.", ["First, Hamad wakes up at six.", "Next, he brushes his teeth.", "Then he gets dressed.", "Finally, he has breakfast."], "Wake up, brush teeth, dress, breakfast."),
        o("Getting ready for school: put the sentences in order.", ["First, he packs his bag.", "Next, he says goodbye to his mother.", "Then he walks to the bus stop.", "Finally, he gets on the bus."], "Pack, goodbye, walk, bus."),
        o("At school: put the sentences in order.", ["First, the students sit down.", "Next, the teacher says good morning.", "Then they open their books.", "Finally, the lesson begins."], "Sit, greeting, books, lesson."),
        o("After the lesson: put the sentences in order.", ["First, the bell rings.", "Next, the students close their books.", "Then they put them in their bags.", "Finally, they go out for a break."], "Bell, close, bags, break."),
        o("Cleaning the room: put the steps in order.", ["First, pick up the clothes.", "Next, make the bed.", "Then sweep the floor.", "Finally, open the window."], "Clothes, bed, sweep, window."),
        m("What does Hamad do before he brushes his teeth?", ["He wakes up.", "He has breakfast.", "He goes to school."], "He wakes up first."),
        m("What does Hamad do after he gets dressed?", ["He has breakfast.", "He wakes up.", "He brushes his teeth."], "Breakfast comes after getting dressed."),
        tf("The students open their books before the teacher says good morning.", false, "The teacher says good morning first, then they open the books."),
        f("First he wakes up. ___ he washes his face. Type the word.", "Then|Next", "Then or next shows the next step."),
        m("Which word shows the end of the morning routine?", ["Finally", "First", "Next"], "Finally shows the last step.")
      ]),
      T("Instructions", "Put the instructions in the correct order.", [
        o("Planting a seed: put the steps in order.", ["First, fill a pot with soil.", "Next, make a small hole.", "Then put the seed in the hole.", "Finally, give it some water."], "Soil, hole, seed, water."),
        o("Sending a letter: put the steps in order.", ["First, write the letter.", "Next, put it in an envelope.", "Then write the address.", "Finally, post it at the post office."], "Write, envelope, address, post."),
        o("Making a paper boat: put the steps in order.", ["First, take a piece of paper.", "Next, fold it in half.", "Then fold the corners.", "Finally, put the boat on the water."], "Paper, fold, corners, water."),
        o("Using a phone: put the steps in order.", ["First, switch on the phone.", "Next, find the number.", "Then press the call button.", "Finally, say hello."], "Switch on, number, call, hello."),
        o("Crossing the road: put the steps in order.", ["First, stop at the edge of the road.", "Next, look left and right.", "Then wait for the cars to stop.", "Finally, cross the road."], "Stop, look, wait, cross."),
        m("Which step comes last when you plant a seed?", ["Give it some water.", "Fill the pot.", "Make a hole."], "You water the seed at the end."),
        m("What do you do after you write the letter?", ["Put it in an envelope.", "Post it.", "Write the address."], "After writing, you put the letter in an envelope."),
        tf("You cross the road before you look left and right.", false, "You look first, then cross."),
        f("First take the paper. ___ fold it. Type the word.", "Next|Then", "Next or then shows the second step."),
        mt("Match each instruction with its order word.", [["Take the paper.", "First"], ["Fold it in half.", "Next"], ["Fold the corners.", "Then"], ["Put it on the water.", "Finally"]], "The steps follow this order.")
      ]),
      T("Mixed review", "Different ordering questions.", [
        o("A trip to the beach: put the sentences in order.", ["First, we get in the car.", "Next, we drive to the beach.", "Then we swim in the sea.", "Finally, we go home."], "Car, drive, swim, home."),
        o("Getting a book: put the sentences in order.", ["First, Salem goes to the library.", "Next, he finds a book.", "Then he shows his card.", "Finally, he takes the book home."], "Library, find, card, home."),
        o("Buying bread: put the sentences in order.", ["First, the boy goes to the shop.", "Next, he asks for bread.", "Then he pays the shopkeeper.", "Finally, he walks home."], "Shop, ask, pay, home."),
        o("Brushing teeth: put the steps in order.", ["First, put toothpaste on the brush.", "Next, brush your teeth.", "Then rinse your mouth.", "Finally, put the brush away."], "Paste, brush, rinse, away."),
        o("A football match: put the sentences in order.", ["First, the teams come on to the pitch.", "Next, the referee blows the whistle.", "Then they play for ninety minutes.", "Finally, the winner gets the cup."], "Teams, whistle, play, cup."),
        m("Which word shows the beginning of a story?", ["First", "Finally", "Last"], "First shows the beginning."),
        m("Which two words show the middle of a story?", ["Next and then", "First and finally", "Finally and last"], "Next and then show the middle."),
        tf("We can say 'at the end' instead of 'finally'.", true, "At the end can also show the last step."),
        f("First, put on your shoes. ___, go outside. Type the word.", "Then|Next", "Then or next shows the next step."),
        mt("Put the words in order: match each word with its number.", [["First", "1"], ["Next", "2"], ["Then", "3"], ["Finally", "4"]], "First is 1, next is 2, then is 3, finally is 4.")
      ])
    ]
  };
})(window.EPZ_EASY);
