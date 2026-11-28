/* Easy Level / Grammar / Part 6: Articles (a, an, the) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-6"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "📘", h: "Articles", p: ["**Articles** are small words that come before a noun. There are three: **a**, **an** and **the**.", "**A** and **an** are for one thing, when we talk about it for the first time. **The** is for a thing we know or a special thing."], ex: [["I have **a** pen."], ["She is **an** engineer."], ["**The** pen is on the desk."]] },
      { k: "examples", kick: "When do we use them?", h: "a, an or the?", items: [["I see **a** dog.", "a: one dog, any dog"], ["He eats **an** apple.", "an: one thing that starts with a vowel sound"], ["**The** dog is big.", "the: we know which dog"], ["**The** sun is hot.", "the: there is only one"]] },
      { k: "table", kick: "Sentence structure", h: "Article + (adjective) + noun", head: ["Article", "Use", "Example"], rows: [["**a**", "one thing, starts with a consonant sound", "a book, a **u**niversity"], ["**an**", "one thing, starts with a vowel sound", "an egg, an **h**our"], ["**the**", "a special or known thing", "the book on the table"]], note: "Listen to the **sound**, not the letter: **a** university (sounds like \"you\"), **an** hour (the h is silent)." },
      { k: "examples", kick: "Positive sentences", h: "Examples", items: [["I have **a** brother and **a** sister."], ["She wants **an** orange."], ["He is **a** teacher at **the** school near my house."], ["We saw **an** elephant at **the** zoo."], ["Please close **the** window."], ["**The** moon is bright tonight."]] },
      { k: "table", kick: "Negative sentences and questions", h: "Articles stay the same", head: ["Positive", "Negative", "Question"], rows: [["I have **a** car.", "I don't have **a** car.", "Do you have **a** car?"], ["She is **an** artist.", "She isn't **an** artist.", "Is she **an** artist?"], ["**The** shop is open.", "**The** shop isn't open.", "Is **the** shop open?"]] },
      { k: "examples", kick: "No article", h: "Sometimes we use no article", items: [["I like **cats**.", "plural nouns in general"], ["We eat **lunch** at one.", "meals"], ["She speaks **English**.", "languages"], ["He plays **football**.", "sports"], ["I go to **school** by bus.", "school, home, work (the place's normal use)"]] },
      { k: "mistakes", h: "Be careful with these", items: [["He is a engineer.", "He is **an** engineer.", "Engineer starts with a vowel sound. Use an."], ["I need an pen.", "I need **a** pen.", "Pen starts with a consonant sound. Use a."], ["She is a honest girl.", "She is **an** honest girl.", "Honest starts with a vowel sound (the h is silent)."], ["I like the football.", "I like football.", "Do not use the for a sport in general."]] },
      { k: "tip", h: "Quick tips", items: ["**a** + consonant sound, **an** + vowel sound (a, e, i, o, u sounds).", "First time: **a**. Second time: **the**. I have **a** dog. **The** dog is brown.", "Only one in the world? Use **the**: the sun, the moon, the sky."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("I have ___ idea.", ["an", "a", "the"], "Idea starts with a vowel sound. Use an."), m("She is ___ doctor.", ["a", "an", "the"], "Doctor starts with a consonant sound. Use a."), f("Look at ___ sky. It is blue.", "the", "There is only one sky. Use the."), c("He is a engineer.", "He is an engineer.", "Engineer starts with a vowel sound. Use an.")] }
    ],
    tests: [
      T("A or an?", "Choose a or an.", [
        m("I have ___ apple.", ["an", "a", "the"], "Apple starts with a vowel sound. Use an."),
        m("She is ___ student.", ["a", "an", "the"], "Student starts with a consonant sound. Use a."),
        m("He eats ___ egg every morning.", ["an", "a", "the"], "Egg starts with a vowel sound. Use an."),
        m("This is ___ big house.", ["a", "an", "the"], "Big starts with a consonant sound. Use a."),
        m("We saw ___ elephant.", ["an", "a", "the"], "Elephant starts with a vowel sound. Use an."),
        m("I need ___ umbrella.", ["an", "a", "the"], "Umbrella starts with a vowel sound. Use an."),
        m("He is ___ honest man.", ["an", "a", "the"], "Honest starts with a vowel sound because the h is silent."),
        m("She goes to ___ university.", ["a", "an", "the"], "University starts with the sound \"you\", a consonant sound. Use a."),
        tf("We say 'a hour'.", false, "Hour starts with a vowel sound. Say an hour."),
        tf("We say 'an orange'.", true, "Orange starts with a vowel sound. Use an.")
      ]),
      T("A, an or the?", "Choose the correct article.", [
        m("I have a cat. ___ cat is black.", ["The", "A", "An"], "We talk about the cat again. Use the."),
        m("Please open ___ door.", ["the", "a", "an"], "We know which door. Use the."),
        m("___ sun is very hot today.", ["The", "A", "An"], "There is only one sun. Use the."),
        m("My father is ___ pilot.", ["a", "an", "the"], "Pilot starts with a consonant sound. Use a."),
        m("She bought ___ new bag yesterday.", ["a", "an", "the"], "New starts with a consonant sound. Use a."),
        m("We live in ___ small village.", ["a", "an", "the"], "Small starts with a consonant sound. Use a."),
        m("Ali has ___ old bike.", ["an", "a", "the"], "Old starts with a vowel sound. Use an."),
        m("___ moon is bright tonight.", ["The", "A", "An"], "There is only one moon. Use the."),
        f("I saw a dog and a cat. ___ cat was very small. Type a, an or the.", "The", "We talk about the cat again. Use the."),
        f("He is ___ engineer. Type a or an.", "an", "Engineer starts with a vowel sound. Use an.")
      ]),
      T("The or no article?", "Choose the, or no article.", [
        m("I like ___ .", ["pizza", "the pizza", "a pizza"], "Use no article for things we like in general."),
        m("She speaks ___ .", ["English", "the English", "an English"], "Do not use an article before a language."),
        m("We play ___ every Friday.", ["football", "a football", "the football"], "Do not use an article before a sport."),
        m("Please close ___ window. It is cold.", ["the", "a", "an"], "We know which window. Use the."),
        m("I eat ___ at one o'clock.", ["lunch", "the lunch", "a lunch"], "Do not use an article before a meal."),
        m("___ Earth goes round the sun.", ["The", "A", "An"], "There is only one Earth. Use the."),
        tf("'I like the cats.' means I like cats in general.", false, "For cats in general, say I like cats."),
        tf("'He plays the football every day.' is a correct sentence.", false, "Do not use the before a sport: He plays football every day."),
        m("My brother likes ___ .", ["dogs", "the dogs", "a dogs"], "For animals in general, use no article."),
        mt("Match each sentence start with the right ending.", [["I speak", "Arabic and English."], ["The sky", "is blue."], ["We have", "an English lesson."], ["She plays", "volleyball."]], "Languages and sports use no article.")
      ]),
      T("Find and fix the mistake", "Correct the article mistakes.", [
        c("He is a engineer.", "He is an engineer.", "Engineer starts with a vowel sound. Use an."),
        c("I need an pen.", "I need a pen.", "Pen starts with a consonant sound. Use a."),
        c("She is a honest girl.", "She is an honest girl.", "Honest starts with a vowel sound because the h is silent."),
        c("I like the football.", "I like football.", "Do not use the for a sport in general."),
        c("Sun is very hot.", "The sun is very hot.", "There is only one sun. Use the."),
        b("Put the words in the correct order.", "She has an old bag.", "Subject + verb + an + adjective + noun."),
        m("Choose the correct sentence.", ["I have a brother and a sister.", "I have an brother and a sister.", "I have a brother and an sister."], "Brother and sister start with consonant sounds. Use a."),
        m("Choose the correct sentence.", ["We had an English lesson.", "We had a English lesson.", "We had the English lesson in general."], "English starts with a vowel sound. Use an."),
        tf("'It is a unusual story.' is a correct sentence.", false, "Unusual starts with a vowel sound. Say an unusual story."),
        tf("'She is a university teacher.' is a correct sentence.", true, "University starts with the sound \"you\". Use a.")
      ]),
      T("Mixed review", "Review a, an, the and no article.", [
        m("I have ___ orange and ___ banana.", ["an / a", "a / an", "an / an"], "Orange starts with a vowel sound. Banana starts with a consonant sound."),
        m("She is ___ best student in the class.", ["the", "a", "an"], "Best is special, so use the."),
        m("Look! ___ airplane is flying over the city.", ["An", "A", "The"], "Airplane starts with a vowel sound. Use an."),
        f("Can I have ___ glass of water, please? Type a or an.", "a", "Glass starts with a consonant sound. Use a."),
        f("I eat ___ egg every day. Type a or an.", "an", "Egg starts with a vowel sound. Use an."),
        c("My uncle is an teacher.", "My uncle is a teacher.", "Teacher starts with a consonant sound. Use a."),
        tf("We use 'the' before a thing that is the only one, like 'the sun'.", true, "There is only one sun."),
        m("Which sentence is correct?", ["The doctor said I am well.", "Doctor said I am well.", "A the doctor said I am well."], "We know which doctor, so use the."),
        b("Put the words in the correct order.", "He bought a car yesterday.", "Subject + verb + a + noun + time."),
        mt("Match each article with the noun that goes with it.", [["a", "car"], ["an", "idea"], ["the", "moon"], ["no article", "football"]], "Use a before a consonant sound, an before a vowel sound, the for only one, and no article for sports.")
      ])
    ]
  };
})(window.EPZ_EASY);
