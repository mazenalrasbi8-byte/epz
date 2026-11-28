/* Easy Level / Fix the Mistake / Topic 4: Basic Grammar */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, mt = h.mt, T = h.T;
  E.parts["correction-4"] = {
    learn: [
      { k: "intro", kick: "Basic grammar", e: "🔎", h: "Fix the grammar", p: ["Grammar mistakes are mistakes with **small words**, **word forms** and **word order**: a / an, am / is / are, singular and plural, he / him, in / on / at.", "In this Part you look at a sentence, find the **grammar mistake** and write the **correct** sentence."], ex: [["Wrong: He is **a** engineer. → Correct: He is **an** engineer."], ["Wrong: They **is** happy. → Correct: They **are** happy."]] },
      { k: "steps", kick: "How to find a mistake", h: "Check the grammar in four steps", q: "Me and my friend is in a classroom.", items: [["Read the sentence aloud", "Does it sound right? Something sounds wrong."], ["Check the small words", "**Me** should be **I** when I do the action. **is** should be **are** for two people."], ["Check the order", "It is polite to put the other person first: **My friend and I**."], ["Write the sentence again", "**My friend and I are** in a classroom."]] },
      { k: "mistakes", h: "Common grammar mistakes", items: [["He is a engineer.", "He is **an** engineer.", "Use an before a vowel sound."], ["They is my friends.", "They **are** my friends.", "They goes with are."], ["I have two brother.", "I have two **brothers**.", "Use the plural (s) after two."], ["Her is my sister.", "**She** is my sister.", "Use a subject pronoun (she) before the verb."], ["The book is in the table.", "The book is **on** the table.", "Use on for a surface."]] },
      { k: "table", kick: "Grammar check", h: "What to check", head: ["Check", "Right", "Wrong"], rows: [["**a / an**", "an apple, a book", "a apple"], ["**am / is / are**", "I am, he is, they are", "I is, they is"], ["**singular / plural**", "one book, two books", "two book"], ["**pronouns**", "She is here. I like her.", "Her is here. I like she."], ["**prepositions**", "in the bag, on the table, at school", "in the table"]] },
      { k: "tip", h: "Quick tips", items: ["Read the sentence **aloud**. Your ear often notices the mistake.", "Check the **small words** first: a / an, am / is / are, in / on / at.", "After you fix one mistake, read the sentence again. There may be another."] },
      { k: "practice", h: "Short practice", p: "Fix the mistake. Type the correct sentence.", qs: [c("She is a teacher in a school. He are a doctor.", "She is a teacher in a school. He is a doctor.", "He goes with is."), c("I have three book.", "I have three books.", "Use the plural after three."), m("Which sentence is correct?", ["I am a student.", "I is a student.", "I are a student."], "I goes with am."), tf("'a elephant' is correct.", false, "Use an before a vowel sound: an elephant.")] }
    ],
    tests: [
      T("A, an and the", "Fix the articles.", [
        c("She is a artist.", "She is an artist.", "Use an before a vowel sound: an artist."),
        c("He wants an pencil.", "He wants a pencil.", "Use a before a consonant sound: a pencil."),
        c("She has a umbrella.", "She has an umbrella.", "Use an before a vowel sound: an umbrella."),
        c("Sun is very hot today.", "The sun is very hot today.", "There is only one sun. Use the."),
        c("They play the basketball every day.", "They play basketball every day.", "Do not use the before a sport in general."),
        m("Which sentence is correct?", ["I eat an apple every day.", "I eat a apple every day.", "I eat the apple every day in general."], "Use an before a vowel sound."),
        m("Which sentence is correct?", ["We saw a big elephant.", "We saw an big elephant.", "We saw a elephant big."], "big starts with a consonant sound: a big elephant."),
        m("Which sentence is correct?", ["She is an honest girl.", "She is a honest girl.", "She is honest girl."], "honest starts with a vowel sound: an honest girl."),
        tf("'an university' is correct.", false, "University starts with the sound 'you': a university."),
        f("He is ___ old man. Type a or an.", "an", "old starts with a vowel sound: an old man.")
      ]),
      T("Am, is and are", "Fix the verb to be.", [
        c("I is a student.", "I am a student.", "I goes with am."),
        c("She are my sister.", "She is my sister.", "She goes with is."),
        c("They is at home.", "They are at home.", "They goes with are."),
        c("We is friends.", "We are friends.", "We goes with are."),
        c("The boys is in the garden.", "The boys are in the garden.", "Boys is plural: are."),
        m("Which sentence is correct?", ["He is tall.", "He are tall.", "He am tall."], "He goes with is."),
        m("Which sentence is correct?", ["You are my friend.", "You is my friend.", "You am my friend."], "You goes with are."),
        m("Which sentence is correct?", ["It is a sunny day.", "It are a sunny day.", "It am a sunny day."], "It goes with is."),
        tf("'My brothers is tall' is correct.", false, "Brothers is plural: My brothers are tall."),
        f("Ali and Salem ___ friends. Type am, is or are.", "are", "Ali and Salem is two people: are.")
      ]),
      T("One or more than one", "Fix the singular and plural nouns.", [
        c("I have two brother.", "I have two brothers.", "Use the plural after two."),
        c("There are three box on the table.", "There are three boxes on the table.", "box → boxes."),
        c("The babys are sleeping.", "The babies are sleeping.", "baby → babies."),
        c("I see five bird in the tree.", "I see five birds in the tree.", "Use the plural after five."),
        c("These book is new.", "These books are new.", "Use these + plural noun + are."),
        m("Which sentence is correct?", ["There are many children here.", "There are many childs here.", "There are many childrens here."], "child → children (irregular plural)."),
        m("Which sentence is correct?", ["This is my pen.", "These is my pen.", "This are my pen."], "One pen: this is."),
        m("Which sentence is correct?", ["Those are my shoes.", "Those is my shoes.", "That are my shoes."], "More than one: those are."),
        tf("The plural of 'man' is 'mans'.", false, "man → men."),
        f("The plural of 'woman' is ___ . Type the word.", "women", "woman → women.")
      ]),
      T("Pronouns and prepositions", "Fix the pronouns and the small place words.", [
        c("Her is my sister.", "She is my sister.", "Use the subject pronoun she."),
        c("I like she.", "I like her.", "Use the object pronoun her after a verb."),
        c("Give the book to I.", "Give the book to me.", "Use the object pronoun me."),
        c("The picture is in the wall.", "The picture is on the wall.", "Use on for a surface."),
        c("My mother is in work.", "My mother is at work.", "We say at work."),
        m("Which sentence is correct?", ["Hamad and I play chess.", "Hamad and me play chess.", "Me and Hamad play chess."], "Use I for the subject."),
        m("Which sentence is correct?", ["We saw them at the market.", "We saw they at the market.", "We saw their at the market."], "Use the object pronoun them."),
        m("Which sentence is correct?", ["The cat is under the chair.", "The cat is in the chair under.", "The cat under is the chair."], "Put the preposition before the noun."),
        tf("'Him is a doctor' is correct.", false, "Use he: He is a doctor."),
        f("The students are ___ school now. Type at, in or on.", "at", "We say at school.")
      ]),
      T("Mixed review", "Fix all kinds of grammar mistakes.", [
        c("He have a old bicycle.", "He has an old bicycle.", "Fix have → has and a → an."),
        c("Me and my brother is in the garden.", "My brother and I are in the garden.", "Use I as the subject and are for two people."),
        c("There is three students in the room.", "There are three students in the room.", "Three students is plural: there are."),
        c("She go to the school by bus.", "She goes to school by bus.", "She needs goes, and we say go to school without the."),
        c("I like play football.", "I like playing football.|I like to play football.", "After like use the -ing form or to + verb: I like playing football."),
        m("Which sentence is correct?", ["She doesn't have a car.", "She don't have a car.", "She doesn't has a car."], "Use doesn't + base verb."),
        m("Which sentence is correct?", ["How many books do you have?", "How much books do you have?", "How many book do you have?"], "Use how many with plural nouns."),
        mt("Match each wrong sentence part with its correct form.", [["a apple", "an apple"], ["two book", "two books"], ["I is", "I am"], ["in the table", "on the table"]], "Fix the small words."),
        tf("After 'there are' we use a plural noun.", true, "There are two books."),
        f("My father and I ___ in the car. Type am, is or are.", "are", "My father and I is two people: are.")
      ])
    ]
  };
})(window.EPZ_EASY);
