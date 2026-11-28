/* Easy Level / Build Sentences / Topic 2: Subject + Verb + Object */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["building-2"] = {
    learn: [
      { k: "intro", kick: "What is an object?", e: "🎯", h: "Subject + Verb + Object", p: ["Many verbs need an **object**. The object is the person or thing that **receives the action**.", "The pattern is **Subject + Verb + Object**: Ali **reads** a **book**. Ali is the subject, reads is the verb and a book is the object."], ex: [["She **reads** a book."], ["We **eat** rice."], ["The boy **kicks** the ball."]] },
      { k: "table", kick: "Parts of a sentence", h: "Subject, verb and object", head: ["Subject", "Verb", "Object"], rows: [["She", "reads", "a book."], ["We", "eat", "rice."], ["The teacher", "writes", "a word."], ["My father", "drives", "a car."], ["They", "play", "football."]], note: "Ask **What?** or **Whom?** after the verb to find the object: She reads **what**? A book." },
      { k: "examples", kick: "Positive sentences", h: "Examples", items: [["Hamad **plays** football.", "S + V + O"], ["My mother **cooks** dinner.", "S + V + O"], ["The students **open** their books.", "S + V + O"], ["I **like** tea.", "S + V + O"], ["Doctors **help** people.", "S + V + O"]] },
      { k: "table", kick: "Negatives and questions", h: "The same pattern, three forms", head: ["Positive", "Negative", "Question"], rows: [["Ali **likes** fish.", "Ali **does not like** fish.", "**Does** Ali **like** fish?"], ["They **eat** rice.", "They **do not eat** rice.", "**Do** they **eat** rice?"], ["She **reads** a book.", "She **doesn't read** a book.", "**Does** she **read** a book?"]] },
      { k: "table", kick: "Adding more", h: "You can add a place or a time at the end", head: ["Subject", "Verb", "Object", "Place or time"], rows: [["I", "eat", "breakfast", "at seven."], ["She", "reads", "a book", "in the library."], ["They", "play", "football", "on Fridays."]] },
      { k: "mistakes", h: "Be careful with these", items: [["Reads she a book.", "**She reads a book.**", "The subject comes first, then the verb, then the object."], ["She a book reads.", "**She reads a book.**", "The object comes after the verb."], ["He eat rice.", "He **eats** rice.", "He needs the s form of the verb."], ["I like very much tea.", "I like tea **very much**.", "Do not put very much between the verb and its object."]] },
      { k: "tip", h: "Quick tips", items: ["The order is always **S - V - O**. Say it: who, does, what.", "To find the object, ask **What?** after the verb.", "Remember the **s** for he, she and it: She **reads** a book."] },
      { k: "practice", h: "Build the sentences", p: "Tap the words in the correct order.", qs: [b("Put the words in order.", "She reads a book.", "Subject (She) + verb (reads) + object (a book)."), b("Put the words in order.", "We eat rice.", "Subject (We) + verb (eat) + object (rice)."), m("What is the object in 'The boy kicks the ball'?", ["the ball", "The boy", "kicks"], "The object receives the action: the ball."), c("She a book reads.", "She reads a book.", "Order: subject, verb, object.")] }
    ],
    tests: [
      T("Find the object", "Choose the subject, verb or object. Then build the sentences.", [
        m("What is the object in 'Ali plays football'?", ["football", "Ali", "plays"], "Ali plays what? Football. That is the object."),
        m("What is the verb in 'My mother cooks dinner'?", ["cooks", "dinner", "My mother"], "The verb is the action: cooks."),
        m("What is the subject in 'The students open their books'?", ["The students", "open", "their books"], "The subject does the action: The students."),
        m("What is the object in 'I like tea'?", ["tea", "I", "like"], "I like what? Tea. That is the object."),
        m("Which sentence has a subject, a verb and an object?", ["She drinks milk.", "She sleeps.", "In the garden."], "She (S) drinks (V) milk (O)."),
        b("Put the words in order.", "Hamad plays football.", "Subject + verb + object."),
        b("Put the words in order.", "My mother cooks dinner.", "Subject + verb + object."),
        b("Put the words in order.", "The students open their books.", "Subject + verb + object."),
        b("Put the words in order.", "I like tea.", "Subject + verb + object."),
        b("Put the words in order.", "Teachers help students.", "Subject + verb + object.")
      ]),
      T("Build S + V + O", "Build each sentence in the correct order.", [
        b("Put the words in order.", "The boy kicks the ball.", "Subject + verb + object."),
        b("Put the words in order.", "We eat rice and fish.", "Subject + verb + object."),
        b("Put the words in order.", "My father drives a car.", "Subject + verb + object."),
        b("Put the words in order.", "The teacher writes a word.", "Subject + verb + object."),
        b("Put the words in order.", "They play football.", "Subject + verb + object."),
        b("Put the words in order.", "She opens the door.", "Subject + verb + object."),
        b("Put the words in order.", "Salem reads a story.", "Subject + verb + object."),
        m("Which sentence is in the correct order?", ["He drinks water.", "Drinks he water.", "He water drinks."], "Subject, verb, object: He drinks water."),
        tf("In 'She a book reads', the order is correct.", false, "The object comes after the verb: She reads a book."),
        m("Which is the object in 'The boys play football'?", ["football", "The boys", "play"], "The boys play what? Football.")
      ]),
      T("Add the missing word", "Choose or type the missing word to complete each sentence.", [
        m("She ___ a book.", ["reads", "read", "reading"], "She needs the s form: reads."),
        m("They ___ football every Friday.", ["play", "plays", "playing"], "They needs the base verb: play."),
        f("My brother ___ a bicycle. (ride)", "rides", "My brother is he, so we add s: rides."),
        f("We ___ English at school. (study)", "study", "We needs the base verb: study."),
        b("Put the words in order.", "They drink juice.", "Subject + verb + object."),
        b("Put the words in order.", "The cat drinks milk.", "Subject + verb + object."),
        c("He eat rice.", "He eats rice.", "He needs the s form: eats."),
        b("Put the words in order.", "Ali eats an apple.", "Subject + verb + object."),
        b("Put the words in order.", "She likes cold milk.", "Subject + verb + object (cold milk)."),
        b("Put the words in order.", "We watch television.", "Subject + verb + object.")
      ]),
      T("Longer sentences", "Add a place or a time to the sentence. Build each one.", [
        b("Put the words in order.", "I eat breakfast at seven.", "Subject + verb + object + time."),
        b("Put the words in order.", "She reads a book in the library.", "Subject + verb + object + place."),
        b("Put the words in order.", "They play football on Fridays.", "Subject + verb + object + time."),
        b("Put the words in order.", "My mother cooks dinner in the kitchen.", "Subject + verb + object + place."),
        b("Put the words in order.", "The students write their names on the board.", "Subject + verb + object + place."),
        b("Put the words in order.", "Hamad drinks water after school.", "Subject + verb + object + time."),
        b("Put the words in order.", "We buy fruit at the market.", "Subject + verb + object + place."),
        m("In 'She reads a book in the library', what is the object?", ["a book", "in the library", "She"], "She reads what? A book."),
        m("In 'They play football on Fridays', which part tells WHEN?", ["on Fridays", "football", "They"], "On Fridays tells us the time."),
        tf("The place or time comes after the object.", true, "The usual order is S + V + O + place or time.")
      ]),
      T("Mixed review", "Build, choose and correct.", [
        b("Put the words in order.", "The girl drinks orange juice.", "Subject + verb + object."),
        b("Put the words in order.", "Ali kicks the ball.", "Subject + verb + object."),
        b("Put the words in order.", "My sister reads a magazine.", "Subject + verb + object."),
        b("Put the words in order.", "We clean the classroom every day.", "Subject + verb + object + time."),
        b("Put the words in order.", "Mr. Said teaches English.", "Subject + verb + object."),
        c("Plays Hamad football.", "Hamad plays football.", "Order: subject, verb, object."),
        m("Which one is the object? 'Fatma opens the window.'", ["the window", "opens", "Fatma"], "Fatma opens what? The window."),
        mt("Match each sentence with its object.", [["She drinks milk.", "milk"], ["He opens the door.", "the door"], ["We eat rice.", "rice"], ["They play football.", "football"]], "Ask: verb + what?"),
        tf("Every verb needs an object.", false, "Some verbs do not need an object: Birds fly. The baby sleeps."),
        m("Which word order is correct?", ["Subject + Verb + Object", "Object + Verb + Subject", "Verb + Subject + Object"], "The English order is Subject + Verb + Object.")
      ])
    ]
  };
})(window.EPZ_EASY);
