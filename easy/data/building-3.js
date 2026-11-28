/* Easy Level / Build Sentences / Topic 3: Word Order */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["building-3"] = {
    learn: [
      { k: "intro", kick: "Why does order matter?", e: "🔀", h: "Word order", p: ["In English, the **order of the words** changes the meaning. \"The dog bites the man\" and \"The man bites the dog\" are very different!", "A normal sentence follows this order: **Subject + Verb + Object + Place + Time**."], ex: [["**I** **eat** **breakfast** **at home** **every day**."], ["**Ali** **plays** **football** **in the park** **on Fridays**."]] },
      { k: "table", kick: "The normal order", h: "Subject, verb, object, place, time", head: ["Subject", "Verb", "Object", "Place", "Time"], rows: [["We", "study", "English", "at school", "every day."], ["She", "reads", "a book", "in the library", "after lunch."], ["They", "play", "football", "in the park", "on Fridays."]], note: "Not every sentence has all five parts. Keep the **order**: S, V, O, place, time." },
      { k: "table", kick: "Adjectives", h: "The adjective comes before the noun", head: ["Correct", "Wrong"], rows: [["a **red** car", "a car red"], ["a **small** house", "a house small"], ["a **new** bicycle", "a bicycle new"], ["**cold** water", "water cold"]], note: "After the verb **be**, the adjective comes after the verb: The car **is red**." },
      { k: "table", kick: "Frequency words", h: "Where do always, usually and never go?", head: ["With be", "With other verbs"], rows: [["She is **always** late.", "She **always** walks."], ["He is **never** angry.", "He **never** drinks coffee."], ["They are **usually** at home.", "They **usually** eat rice."]], note: "**always, usually, often, sometimes, never** go **after be** and **before other verbs**." },
      { k: "examples", kick: "Examples", h: "Put the words in the right place", items: [["She has **a small red bag**.", "adjectives before the noun"], ["He **always** drinks tea.", "frequency word before the verb"], ["I am **never** late.", "frequency word after be"], ["We play football **in the park on Fridays**.", "place, then time"], ["My brother **often** reads **in the evening**.", "frequency word + time"]] },
      { k: "mistakes", h: "Be careful with these", items: [["I play football on Fridays in the park.", "I play football **in the park on Fridays**.", "Put the place before the time."], ["She walks always to school.", "She **always walks** to school.", "Always goes before the main verb."], ["He is late always.", "He is **always** late.", "Always goes after be."], ["I have a car red.", "I have a **red car**.", "The adjective comes before the noun."]] },
      { k: "tip", h: "Quick tips", items: ["Say it in your head: **who, does, what, where, when**.", "**Place before time**: in the park, on Fridays.", "Frequency words: **before** the verb, but **after** am, is, are."] },
      { k: "practice", h: "Build the sentences", p: "Tap the words in the correct order.", qs: [b("Put the words in order.", "She has a red bag.", "Subject + verb + a + adjective + noun."), b("Put the words in order.", "He always drinks tea.", "Always goes before the main verb drinks."), b("Put the words in order.", "I am never late.", "Never goes after am."), c("I have a car red.", "I have a red car.", "The adjective comes before the noun.")] }
    ],
    tests: [
      T("Subject, verb, object", "Build each sentence in the correct order.", [
        b("Put the words in order.", "The students close their notebooks.", "Subject + verb + object."),
        b("Put the words in order.", "My father reads the newspaper.", "Subject + verb + object."),
        b("Put the words in order.", "The cat drinks the milk.", "Subject + verb + object."),
        b("Put the words in order.", "The waiter brings the menu.", "Subject + verb + object."),
        b("Put the words in order.", "Fatma paints a picture.", "Subject + verb + object."),
        b("Put the words in order.", "The students close the window.", "Subject + verb + object."),
        m("'The dog bites the man.' Who bites?", ["the dog", "the man", "nobody"], "The subject comes first: the dog bites."),
        m("Which sentence has the correct word order?", ["She drinks tea.", "Drinks she tea.", "Tea she drinks."], "The normal order is Subject + Verb + Object."),
        tf("In English the verb usually comes before the subject.", false, "The subject comes first, then the verb."),
        m("Which word order is correct?", ["S + V + O", "V + S + O", "O + V + S"], "The normal order is Subject + Verb + Object.")
      ]),
      T("Adjectives before nouns", "Build sentences with adjectives. The adjective comes before the noun.", [
        b("Put the words in order.", "She has a small bag.", "Adjective (small) before the noun (bag)."),
        b("Put the words in order.", "He wears a white shirt.", "Adjective (white) before the noun (shirt)."),
        b("Put the words in order.", "I have a new bicycle.", "Adjective (new) before the noun (bicycle)."),
        b("Put the words in order.", "We live in a big house.", "Adjective (big) before the noun (house)."),
        b("Put the words in order.", "They drink cold water.", "Adjective (cold) before the noun (water)."),
        b("Put the words in order.", "The old man walks slowly.", "Adjective (old) before the noun (man)."),
        m("Which phrase is correct?", ["a red car", "a car red", "red a car"], "The adjective goes before the noun: a red car."),
        m("Which phrase is correct?", ["a tall boy", "a boy tall", "tall a boy"], "The adjective goes before the noun: a tall boy."),
        c("I have a bicycle new.", "I have a new bicycle.", "The adjective comes before the noun."),
        tf("After the verb 'be' the adjective can come after the verb: The car is red.", true, "After be the adjective comes after the verb.")
      ]),
      T("Always, usually, never", "Put the frequency words in the correct place.", [
        b("Put the words in order.", "He always drinks tea.", "Always goes before the main verb."),
        b("Put the words in order.", "She is never late.", "Never goes after be."),
        b("Put the words in order.", "They usually eat rice.", "Usually goes before the main verb."),
        b("Put the words in order.", "I sometimes play football.", "Sometimes goes before the main verb."),
        b("Put the words in order.", "My brother is often tired.", "Often goes after be."),
        b("Put the words in order.", "We never watch television.", "Never goes before the main verb."),
        m("Which sentence is correct?", ["She always walks to school.", "She walks always to school.", "Always she walks to school."], "Always goes before the main verb."),
        m("Which sentence is correct?", ["He is always happy.", "He always is happy.", "He is happy always."], "Always goes after the verb be."),
        c("She walks never to school.", "She never walks to school.", "Never goes before the main verb."),
        tf("'Often' goes before the main verb: 'They often play'.", true, "Frequency words go before the main verb.")
      ]),
      T("Place and time", "Put the place before the time. Build each sentence.", [
        b("Put the words in order.", "We play football in the park on Fridays.", "Place (in the park) before time (on Fridays)."),
        b("Put the words in order.", "She reads a book in the library after lunch.", "Place before time."),
        b("Put the words in order.", "I eat breakfast at home every morning.", "Place before time."),
        b("Put the words in order.", "They study English at school every day.", "Place before time."),
        b("Put the words in order.", "He waits at the bus stop at seven.", "Place before time."),
        b("Put the words in order.", "The children play in the garden after school.", "Place before time."),
        m("Which sentence is correct?", ["I swim in the sea on Saturdays.", "I swim on Saturdays in the sea.", "I in the sea swim on Saturdays."], "Put the place before the time."),
        m("In 'We eat dinner at home at eight', which part is the time?", ["at eight", "at home", "dinner"], "At eight is the time."),
        c("I study at night in my room.", "I study in my room at night.", "Put the place before the time."),
        tf("The place usually comes before the time.", true, "The order is place, then time.")
      ]),
      T("Mixed review", "Build, choose and correct.", [
        b("Put the words in order.", "My sister always reads a book in the evening.", "Subject + always + verb + object + time."),
        b("Put the words in order.", "The boys play football in the park on Fridays.", "S + V + O + place + time."),
        b("Put the words in order.", "She has a beautiful blue dress.", "Adjectives before the noun."),
        b("Put the words in order.", "I am never late for school.", "Never goes after be."),
        b("Put the words in order.", "They usually watch a film at night.", "Usually before the main verb."),
        b("Put the words in order.", "He drinks hot tea every morning.", "Adjective before the noun, time at the end."),
        m("Which word order is correct?", ["She often visits her aunt on Sundays.", "She visits often her aunt on Sundays.", "She visits her aunt often on Sundays."], "Often goes before the main verb."),
        c("He plays always football.", "He always plays football.", "Always goes before the main verb."),
        mt("Match each part with its position.", [["adjective", "before the noun"], ["always", "before the main verb"], ["place", "before the time"], ["time", "at the end"]], "Learn the position of each part."),
        tf("We can say 'a house big'.", false, "The adjective comes before the noun: a big house.")
      ])
    ]
  };
})(window.EPZ_EASY);
