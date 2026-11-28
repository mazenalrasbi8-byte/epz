/* Easy Level / Grammar / Part 3: Present Continuous */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-3"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "🏃", h: "The present continuous", p: ["We use the **present continuous** to talk about something that is happening **now**.", "It has two parts: **am / is / are** and the verb with **-ing**."], ex: [["I **am reading** a book."], ["She **is cooking** dinner."], ["They **are playing** football."]] },
      { k: "examples", kick: "When do we use it?", h: "Actions happening now", items: [["Look! It **is raining**.", "right now"], ["He **is talking** on the phone.", "at the moment"], ["We **are studying** English today.", "around now"], ["My brother **is learning** to swim this month.", "a temporary activity"]] },
      { k: "table", kick: "Sentence structure", h: "Subject + am / is / are + verb-ing", head: ["Subject", "am / is / are", "Verb + ing"], rows: [["I", "**am**", "reading"], ["He / She / It", "**is**", "reading"], ["You / We / They", "**are**", "reading"]], note: "Never forget the **am / is / are**. The **-ing** verb cannot stand alone." },
      { k: "table", kick: "Spelling the -ing", h: "How to add -ing", head: ["Rule", "Verb", "-ing form"], rows: [["Most verbs: add **ing**", "play, read, eat", "playing, reading, eating"], ["Verbs ending in e: drop the e", "write, make, drive", "writing, making, driving"], ["One short vowel + one consonant: double it", "run, sit, swim", "running, sitting, swimming"], ["Verbs ending in ie: change to y", "lie, die", "lying, dying"]] },
      { k: "examples", kick: "Positive sentences", h: "Subject + am / is / are + verb-ing", items: [["I **am writing** a letter."], ["You **are sitting** on my chair."], ["He **is running** in the park."], ["It **is raining** now."], ["We **are waiting** for the bus."], ["They **are eating** lunch."]] },
      { k: "table", kick: "Negative sentences", h: "Add not after am, is, are", head: ["Positive", "Negative"], rows: [["I am working.", "I am **not** working."], ["She is sleeping.", "She is **not** (isn't) sleeping."], ["They are playing.", "They are **not** (aren't) playing."]] },
      { k: "table", kick: "Questions", h: "Put am, is, are before the subject", head: ["Question", "Short answers"], rows: [["**Am** I speaking too fast?", "Yes, you **are**. / No, you **aren't**."], ["**Is** he sleeping?", "Yes, he **is**. / No, he **isn't**."], ["**Are** they playing?", "Yes, they **are**. / No, they **aren't**."], ["What **are** you doing?", "I'm reading."]] },
      { k: "examples", kick: "Signal words", h: "Words that go with the present continuous", items: [["I am studying **now**.", "now"], ["He is sleeping **at the moment**.", "at the moment"], ["**Look!** The bus is coming.", "Look!"], ["**Listen!** Someone is singing.", "Listen!"], ["They are working **today**.", "today, these days, this week"]] },
      { k: "mistakes", h: "Be careful with these", items: [["I playing football.", "I **am** playing football.", "Do not forget am, is or are."], ["She is play tennis.", "She is **playing** tennis.", "After is, use the -ing form."], ["He is runing fast.", "He is **running** fast.", "Run has one short vowel and one consonant: double the n."], ["They are write letters.", "They are **writing** letters.", "Write loses its e: writing."]] },
      { k: "tip", h: "Quick tips", items: ["Some verbs are not used with -ing: **like, love, know, want, need**. Say: I **want** a drink (not I am wanting).", "Present simple = every day. Present continuous = **right now**.", "Check the spelling: **make → making**, **run → running**."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Look! The children ___ in the garden.", ["are playing", "play", "is playing"], "Look! tells us it is happening now, and children is they."), f("She is (write) ___ a message.", "writing", "Write loses its e before ing."), c("He playing games.", "He is playing games.", "You need is before playing."), m("___ you listening to me?", ["Are", "Is", "Do"], "You goes with are.")] }
    ],
    tests: [
      T("Choose the correct form", "Choose the correct present continuous verb.", [
        m("Look! The children ___ in the garden.", ["are playing", "is playing", "play"], "Children means they. Use are + verb-ing."),
        m("My mother ___ dinner now.", ["is cooking", "are cooking", "cooks"], "My mother is she. Use is + cooking."),
        m("I ___ a letter at the moment.", ["am writing", "is writing", "are writing"], "I needs am."),
        m("We ___ for the bus.", ["are waiting", "is waiting", "waiting"], "We needs are before the -ing verb."),
        m("He ___ on the phone right now.", ["is talking", "talks", "are talking"], "Right now means present continuous."),
        m("The students ___ an exam today.", ["are taking", "is taking", "takes"], "Students means they. Use are."),
        m("It ___ outside. Take an umbrella.", ["is raining", "are raining", "rains"], "It needs is."),
        m("You ___ my pen.", ["are using", "is using", "am using"], "You needs are."),
        tf("'She is read a book.' is a correct sentence.", false, "After is, use reading: She is reading a book."),
        tf("'They are watching a film.' is a correct sentence.", true, "They are + watching is correct.")
      ]),
      T("Spelling the -ing", "Type the -ing form of the verb in brackets.", [
        f("He is (run) ___ in the park.", "running", "Run: double the n and add ing."),
        f("She is (write) ___ an email.", "writing", "Write: drop the e and add ing."),
        f("They are (play) ___ chess.", "playing", "Play: just add ing."),
        f("I am (sit) ___ near the window.", "sitting", "Sit: double the t and add ing."),
        f("We are (make) ___ a cake.", "making", "Make: drop the e and add ing."),
        f("The baby is (sleep) ___ .", "sleeping", "Sleep: just add ing."),
        f("My brother is (swim) ___ in the sea.", "swimming", "Swim: double the m and add ing."),
        f("The boys are (drive) ___ to Nizwa.", "driving", "Drive: drop the e and add ing."),
        m("Which spelling is correct?", ["getting", "geting", "gettting"], "Get has one short vowel and one consonant. Double the t."),
        m("Which spelling is correct?", ["having", "haveing", "haveng"], "Have ends in e. Drop the e.")
      ]),
      T("Negative sentences", "Make and choose negative sentences.", [
        m("I ___ watching TV.", ["am not", "isn't", "aren't"], "I needs am not."),
        m("She ___ sleeping.", ["isn't", "aren't", "am not"], "She needs isn't."),
        m("They ___ working today.", ["aren't", "isn't", "am not"], "They needs aren't."),
        f("It is ___ raining now.", "not", "Put not after is to make a negative."),
        c("He not is playing.", "He is not playing.", "Not comes after am, is or are."),
        b("Put the words in the correct order.", "We are not eating now.", "Subject + are + not + verb-ing."),
        m("Choose the correct sentence.", ["The boys aren't studying.", "The boys isn't studying.", "The boys aren't study."], "Boys means they. Use aren't + verb-ing."),
        tf("'I amn't listening.' is a correct sentence.", false, "There is no short form amn't. Say I'm not listening."),
        m("He ___ using his phone now.", ["isn't", "doesn't", "don't"], "Use is not with the -ing form."),
        f("You ___ not paying attention. Type am, is or are.", "are", "You needs are.")
      ]),
      T("Questions and short answers", "Make questions with am, is and are.", [
        m("___ she reading a book?", ["Is", "Are", "Does"], "She needs is."),
        m("___ they playing outside?", ["Are", "Is", "Do"], "They needs are."),
        m("___ I speaking too fast?", ["Am", "Is", "Are"], "I needs am."),
        b("Put the words in order to make a question.", "Is he sleeping now?", "Is + subject + verb-ing."),
        m("Is it raining? — Yes, ___.", ["it is", "it does", "it are"], "Answer with is: Yes, it is."),
        m("Are you listening? — No, ___.", ["I'm not", "I don't", "I amn't"], "The short answer is No, I'm not."),
        c("Are he working?", "Is he working?", "He goes with is."),
        mt("Match each question with its answer.", [["What are you doing?", "I'm cleaning my room."], ["Where is he going?", "He's going to school."], ["Who are they waiting for?", "They're waiting for Ali."], ["Is she cooking?", "Yes, she is."]], "The answer talks about the action that is happening now."),
        f("___ the baby sleeping? Type Is or Are.", "Is", "The baby is it. Use is."),
        tf("'Do you reading now?' is a correct sentence.", false, "Use are: Are you reading now?")
      ]),
      T("Now or every day? Mixed review", "Use the present continuous and review.", [
        m("Which sentence tells us what is happening now?", ["She is cooking now.", "She cooks every day.", "She always cooks."], "Now and the -ing form show the present continuous."),
        m("Which word shows that something is happening now?", ["Listen!", "Always", "Every day"], "Listen! and Look! show an action happening now."),
        c("I am go to the shop now.", "I am going to the shop now.", "After am, use the -ing form."),
        f("Look! He (carry) ___ a heavy box.", "is carrying", "He needs is + carrying."),
        m("My father usually ___ tea, but today he is drinking coffee.", ["drinks", "is drinking", "drinking"], "Usually shows a habit, so use the present simple."),
        b("Put the words in the correct order.", "They are watching a film.", "Subject + are + verb-ing + object."),
        tf("'Know' is usually used in the present continuous.", false, "Verbs like know, want and like are not used with -ing."),
        m("What is the -ing form of 'lie'?", ["lying", "liing", "lieing"], "Verbs ending in ie change to y before ing."),
        f("We are ___ now. (study)", "studying", "Add ing to study."),
        mt("Match the signal word with its meaning.", [["now", "at this moment"], ["today", "during this day"], ["at the moment", "right now"], ["Look!", "see it happening"]], "These words show the present continuous.")
      ])
    ]
  };
})(window.EPZ_EASY);
