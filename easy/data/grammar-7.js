/* Easy Level / Grammar / Part 7: Prepositions of Place */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-7"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "📍", h: "Prepositions of place", p: ["A **preposition of place** tells us **where** something is.", "Common ones are **in, on, at, under, behind, in front of, next to, between** and **near**."], ex: [["The book is **on** the table."], ["The cat is **under** the chair."], ["I am **at** school."]] },
      { k: "examples", kick: "When do we use them?", h: "To say where things and people are", items: [["My phone is **in** my bag.", "inside something"], ["The picture is **on** the wall.", "touching a surface"], ["He is **at** the bus stop.", "at a point or a place"], ["The ball is **under** the bed.", "lower than something"]] },
      { k: "table", kick: "Sentence structure", h: "Subject + be + preposition + place", head: ["Subject", "be", "Preposition + place"], rows: [["The keys", "**are**", "**on** the table."], ["She", "**is**", "**in** the kitchen."], ["I", "**am**", "**at** home."]], note: "The preposition goes **before** the place: **on** the table, **in** the room." },
      { k: "table", kick: "Main prepositions", h: "Learn these words", head: ["Preposition", "Meaning", "Example"], rows: [["**in**", "inside", "The pen is **in** the box."], ["**on**", "on the top, touching", "The book is **on** the desk."], ["**at**", "at a place or point", "He is **at** the door."], ["**under**", "below", "The cat is **under** the table."], ["**behind**", "at the back of", "The garden is **behind** the house."], ["**in front of**", "at the front of", "The car is **in front of** the shop."], ["**next to / beside**", "by the side of", "The bank is **next to** the school."], ["**between**", "in the middle of two", "The shop is **between** the bank and the school."], ["**near**", "not far from", "I live **near** the mosque."], ["**above**", "higher than, not touching", "The picture is **above** the door."]] },
      { k: "examples", kick: "Positive sentences", h: "Examples", items: [["The cat is **on** the sofa."], ["The children are **in** the garden."], ["The bus stop is **in front of** the school."], ["My house is **next to** the park."], ["The ball is **under** the car."], ["Hamad sits **between** Ali and Salem."]] },
      { k: "table", kick: "Negative sentences and questions", h: "Use the same prepositions", head: ["Positive", "Negative", "Question"], rows: [["The pen is **on** the desk.", "The pen isn't **on** the desk.", "Is the pen **on** the desk?"], ["They are **at** school.", "They aren't **at** school.", "Are they **at** school?"]], note: "For where questions, use **Where**: **Where** is the pen? It is **on** the desk." },
      { k: "examples", kick: "Words to remember", h: "in, on or at?", items: [["**in** a room, **in** a car, **in** Oman", "in = inside a place, city, country"], ["**on** the table, **on** the wall, **on** the floor", "on = on a surface"], ["**at** home, **at** school, **at** the door", "at = a point or a normal place"]] },
      { k: "mistakes", h: "Be careful with these", items: [["The book is in the table.", "The book is **on** the table.", "The book is on top of the table. Use on."], ["I am in home.", "I am **at** home.", "Say at home, at school, at work."], ["The cat is on the box. (it is inside)", "The cat is **in** the box.", "Use in for inside."], ["The bank is between the school.", "The bank is **between** the school **and** the shop.", "Between needs two places."]] },
      { k: "tip", h: "Quick tips", items: ["Picture it: **in** = inside, **on** = on the top, **under** = below.", "Say **at home**, **at school**, **at work**, but **in the house**, **in the school building**.", "**Next to** and **beside** mean the same."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("The keys are ___ my bag.", ["in", "on", "between"], "The keys are inside the bag. Use in."), m("The picture is ___ the wall.", ["on", "in", "at"], "A picture touches the surface of the wall. Use on."), f("My brother is ___ school now.", "at", "Say at school."), c("The cat is in the table.", "The cat is on the table.", "The cat is on top of the table. Use on.")] }
    ],
    tests: [
      T("In, on or at?", "Choose in, on or at.", [
        m("The book is ___ the table.", ["on", "in", "at"], "A book on a table is on the top. Use on."),
        m("The milk is ___ the fridge.", ["in", "on", "at"], "The milk is inside the fridge. Use in."),
        m("I am ___ home.", ["at", "in", "on"], "Say at home."),
        m("There is a clock ___ the wall.", ["on", "in", "at"], "The clock touches the wall. Use on."),
        m("My father is ___ work.", ["at", "in", "on"], "Say at work."),
        m("The students are ___ the classroom.", ["in", "on", "at"], "The students are inside the classroom. Use in."),
        m("Someone is ___ the door.", ["at", "in", "under"], "At the door means at that point."),
        m("The cat is sleeping ___ the sofa.", ["on", "in", "at"], "The cat is on top of the sofa. Use on."),
        tf("We say 'I am in home'.", false, "Say I am at home."),
        tf("We say 'The pen is in the bag'.", true, "The pen is inside the bag. Use in.")
      ]),
      T("Under, behind, in front of, next to", "Look at the sentence and choose the correct preposition.", [
        m("The ball is ___ the chair. (It is below the chair.)", ["under", "on", "behind"], "Below is under."),
        m("The garden is ___ the house. (It is at the back.)", ["behind", "in front of", "between"], "At the back is behind."),
        m("The car is ___ the shop. (It is at the front.)", ["in front of", "behind", "under"], "At the front is in front of."),
        m("The bank is ___ the school. (They are side by side.)", ["next to", "under", "on"], "By the side is next to."),
        m("Hamad sits ___ Ali and Salem. (One is on his left, one on his right.)", ["between", "behind", "on"], "In the middle of two is between."),
        m("The cat is ___ the box. (It is inside.)", ["in", "on", "under"], "Inside is in."),
        m("The picture is ___ the door. (It is above the door.)", ["above", "under", "beside"], "Higher than something is above."),
        m("I live ___ the mosque. (It is not far.)", ["near", "in", "between"], "Not far from is near."),
        tf("'Beside' and 'next to' have the same meaning.", true, "Both mean by the side of something."),
        tf("'Under' means 'at the back of'.", false, "Under means below. At the back of is behind.")
      ]),
      T("Where is it?", "Type or choose the correct preposition.", [
        f("The keys are ___ the table. (on top)", "on", "On the top of a surface is on."),
        f("The shoes are ___ the bed. (below)", "under", "Below is under."),
        f("The bus stop is ___ the bank. (side by side) Type next to or beside.", "next to|beside", "Both next to and beside are correct."),
        f("The ball is ___ the box. (inside)", "in", "Inside is in."),
        m("Where is the cat? It is ___ the sofa and the table.", ["between", "in", "on"], "Between means in the middle of two things."),
        m("Where is the library? It is ___ the school. It is at the back.", ["behind", "between", "on"], "At the back is behind."),
        m("The students are ___ the teacher. They are looking at him.", ["in front of", "behind", "under"], "Facing the teacher at the front is in front of."),
        m("My bag is ___ my desk. It is on the floor below the desk.", ["under", "above", "between"], "Below is under."),
        m("There is a bird ___ the tree. It is sitting on a branch.", ["in", "under", "behind"], "Inside the tree among the branches is in."),
        tf("'The shop is near the mosque.' means the shop is not far from the mosque.", true, "Near means not far.")
      ]),
      T("Find and fix the mistake", "Correct the preposition mistakes.", [
        c("The book is in the table.", "The book is on the table.", "A book on the top of a table. Use on."),
        c("I am in home.", "I am at home.", "Say at home."),
        c("My father is on work.", "My father is at work.", "Say at work."),
        c("The students are at the classroom.", "The students are in the classroom.", "Inside a room, use in."),
        c("The cat is sleeping in the roof.", "The cat is sleeping on the roof.", "The cat is on top of the roof. Use on."),
        b("Put the words in the correct order.", "The bank is next to the school.", "Subject + is + next to + place."),
        m("Choose the correct sentence.", ["The shop is between the bank and the school.", "The shop is between the bank.", "The shop is among the bank and the school."], "Between needs two places joined by and."),
        m("Choose the correct sentence.", ["There is a bird on the tree.", "There is a bird in the tree.", "There is a bird at the tree."], "A bird sitting among the branches is in the tree."),
        tf("'He is at the library' is a correct sentence.", true, "At is used for a place: at the library."),
        tf("'The keys are in front the door.' is a correct sentence.", false, "Say in front of the door.")
      ]),
      T("Mixed review", "Review all the prepositions of place.", [
        m("The picture is ___ the wall.", ["on", "in", "under"], "A picture touches the wall. Use on."),
        m("The football is ___ the car. (below the car)", ["under", "behind", "on"], "Below is under."),
        m("The post office is ___ the bank and the supermarket.", ["between", "behind", "under"], "Between needs two places."),
        f("My school is ___ the mosque. (not far from) Type one word.", "near", "Not far from is near."),
        m("There is a lamp ___ the desk. (on the top)", ["on", "in", "at"], "On the top of a surface is on."),
        m("The students are ___ the teacher, looking at the board. (the teacher is at the front)", ["in front of", "behind", "between"], "If they face him at the front, they are in front of."),
        c("The books are on the bag.", "The books are in the bag.", "Books inside a bag are in the bag."),
        b("Put the words in the correct order.", "The ball is under the chair.", "Subject + is + under + place."),
        tf("'At' is used with 'home', 'school' and 'work'.", true, "We say at home, at school and at work."),
        mt("Match each preposition with its meaning.", [["in", "inside"], ["on", "on the top"], ["under", "below"], ["behind", "at the back"]], "Think of a picture for each word.")
      ])
    ]
  };
})(window.EPZ_EASY);
