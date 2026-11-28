/* Easy Level / Grammar / Part 4: Past Simple */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-4"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "⏪", h: "The past simple", p: ["We use the **past simple** to talk about things that finished in the past.", "Regular verbs end in **-ed**: play → **played**. Irregular verbs change: go → **went**."], ex: [["I **played** football yesterday."], ["She **went** to Muscat last week."], ["We **watched** a film."]] },
      { k: "examples", kick: "When do we use it?", h: "Finished actions", items: [["I **visited** my uncle **yesterday**.", "a finished action"], ["He **bought** a new phone **last month**.", "a finished time"], ["We **lived** in Sur **two years ago**.", "a finished situation"], ["She **was** born **in 2010**.", "a past date"]] },
      { k: "table", kick: "Sentence structure", h: "Subject + past verb", head: ["Subject", "Past verb", "Example"], rows: [["I / You / He / She / It / We / They", "verb + **ed** or irregular form", "They **played**. She **went**."]], note: "The past simple is the **same for every subject**. There is no extra s." },
      { k: "table", kick: "Regular verbs: spelling", h: "How to add -ed", head: ["Rule", "Verb", "Past"], rows: [["Most verbs: add **ed**", "play, watch, walk", "played, watched, walked"], ["Verbs ending in e: add **d**", "live, like, love", "lived, liked, loved"], ["Consonant + y: change y to **ied**", "study, carry, try", "studied, carried, tried"], ["One short vowel + one consonant: double it", "stop, plan", "stopped, planned"]] },
      { k: "table", kick: "Common irregular verbs", h: "These verbs change. Learn them!", head: ["Base", "Past", "Base", "Past"], rows: [["go", "**went**", "see", "**saw**"], ["eat", "**ate**", "have", "**had**"], ["make", "**made**", "come", "**came**"], ["buy", "**bought**", "take", "**took**"], ["write", "**wrote**", "drink", "**drank**"], ["be (I, he, she, it)", "**was**", "be (you, we, they)", "**were**"]] },
      { k: "table", kick: "Negative sentences", h: "Use did not + base verb", head: ["Positive", "Negative"], rows: [["I played tennis.", "I **did not** (**didn't**) play tennis."], ["She went home.", "She **didn't go** home."], ["They watched TV.", "They **didn't watch** TV."]], note: "After **didn't**, use the base verb: She didn't **go** (not went)." },
      { k: "table", kick: "Questions", h: "Start with Did", head: ["Question", "Short answers"], rows: [["**Did** you play football?", "Yes, I **did**. / No, I **didn't**."], ["**Did** she go to school?", "Yes, she **did**. / No, she **didn't**."], ["What **did** you eat?", "I ate rice."]], note: "After **Did**, use the base verb: Did you **go**...? (not went)." },
      { k: "examples", kick: "Signal words", h: "Words that go with the past simple", items: [["I saw him **yesterday**."], ["We travelled **last week**."], ["She called me **two days ago**."], ["He was born **in 2008**."], ["I met him **last night**."]], p: "These words show that the time is finished." },
      { k: "mistakes", h: "Be careful with these", items: [["I goed to school.", "I **went** to school.", "Go is irregular. The past is went."], ["She didn't went home.", "She didn't **go** home.", "After didn't, use the base verb."], ["Did you saw him?", "Did you **see** him?", "After did, use the base verb."], ["He buyed a book.", "He **bought** a book.", "Buy is irregular. The past is bought."]] },
      { k: "tip", h: "Quick tips", items: ["Look for **yesterday, last week, ago** or a year. They tell you to use the past.", "In negatives and questions, **did** shows the past. The main verb goes back to the base form.", "Practise the irregular verbs a little every day."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("We ___ a film last night.", ["watched", "watch", "watching"], "Last night is past. Add ed to watch."), f("She (go) ___ to Salalah last year.", "went", "Go is irregular: went."), c("Did he went home?", "Did he go home?", "After did, use the base verb."), m("They ___ at the party yesterday.", ["were", "was", "are"], "They goes with were in the past.")] }
    ],
    tests: [
      T("Regular verbs: add -ed", "Choose the correct past simple form of the regular verb.", [
        m("I ___ football yesterday.", ["played", "play", "plays"], "Yesterday is past. Add ed to play."),
        m("We ___ in Sur two years ago.", ["lived", "live", "lives"], "Live ends in e, so just add d."),
        m("She ___ English last night.", ["studied", "studyed", "studing"], "Study ends in consonant + y. Change y to ied."),
        m("The bus ___ at the school.", ["stopped", "stoped", "stopt"], "Stop has one short vowel and one consonant. Double the p."),
        m("He ___ his room on Friday.", ["cleaned", "clean", "cleans"], "A finished action needs ed."),
        m("They ___ to the radio.", ["listened", "listen", "listens"], "The past simple of listen is listened."),
        m("My father ___ a new car.", ["wanted", "want", "wants"], "Add ed to want."),
        m("I ___ the door.", ["opened", "open", "opens"], "Add ed to open."),
        tf("The past of 'carry' is 'carryed'.", false, "Consonant + y changes to ied: carried."),
        tf("The past of 'like' is 'liked'.", true, "Like ends in e, so add d.")
      ]),
      T("Irregular verbs", "Choose or type the past form of these irregular verbs.", [
        f("I (go) ___ to the market yesterday.", "went", "Go is irregular: went."),
        f("She (see) ___ her cousin last week.", "saw", "See is irregular: saw."),
        f("We (eat) ___ rice for lunch.", "ate", "Eat is irregular: ate."),
        f("He (buy) ___ a new bag.", "bought", "Buy is irregular: bought."),
        m("They ___ a big cake for the party.", ["made", "maked", "make"], "Make is irregular: made."),
        m("My uncle ___ to our house on Friday.", ["came", "comed", "come"], "Come is irregular: came."),
        m("She ___ a letter to her friend.", ["wrote", "writed", "write"], "Write is irregular: wrote."),
        m("I ___ a glass of water.", ["drank", "drinked", "drunk"], "Drink is irregular: drank."),
        m("Which sentence is correct?", ["He took a photo.", "He taked a photo.", "He take a photo."], "Take is irregular: took."),
        m("Which sentence is correct?", ["We had a good time.", "We haved a good time.", "We has a good time."], "Have is irregular: had.")
      ]),
      T("Negative sentences", "Use didn't and the base verb.", [
        m("I ___ watch TV yesterday.", ["didn't", "don't", "wasn't"], "Yesterday is past. Use didn't."),
        m("She ___ go to school on Friday.", ["didn't", "doesn't", "not"], "Use didn't for the past."),
        c("He didn't went home.", "He didn't go home.", "After didn't, use the base verb."),
        c("We didn't played football.", "We didn't play football.", "After didn't, use the base verb."),
        f("They ___ visit us last week. (negative short form)", "didn't", "Use didn't in the past negative."),
        b("Put the words in the correct order.", "I didn't see him yesterday.", "Subject + didn't + base verb."),
        m("Choose the correct sentence.", ["She didn't eat breakfast.", "She didn't ate breakfast.", "She not eat breakfast."], "After didn't, use eat, not ate."),
        tf("'He didn't bought a car.' is a correct sentence.", false, "After didn't, use buy: He didn't buy a car."),
        m("My brother ___ do his homework.", ["didn't", "don't", "doesn't"], "The sentence is about the past. Use didn't."),
        f("We did not ___ the answer. (know)", "know", "After did not, use the base verb.")
      ]),
      T("Questions and short answers", "Make questions with did.", [
        m("___ you play football yesterday?", ["Did", "Do", "Does"], "Yesterday is past. Use did."),
        m("___ she go to school last Sunday?", ["Did", "Does", "Was"], "Use did for the past."),
        c("Did you saw him?", "Did you see him?", "After did, use the base verb."),
        b("Put the words in order to make a question.", "Did they watch the match?", "Did + subject + base verb."),
        m("Did he call you? — Yes, ___.", ["he did", "he does", "he called"], "Answer with did: Yes, he did."),
        m("Did they come on time? — No, ___.", ["they didn't", "they don't", "they weren't"], "Answer with didn't: No, they didn't."),
        f("___ your father drive to Nizwa? Type Did or Does.", "Did", "The question is about the past. Use did."),
        mt("Match each question with its answer.", [["What did you eat?", "I ate fish."], ["Where did he go?", "He went to the market."], ["Did you sleep well?", "Yes, I did."], ["Who did she call?", "She called her mother."]], "The answer is in the past too."),
        tf("'Did she wrote a letter?' is a correct sentence.", false, "After did, use write: Did she write a letter?"),
        m("Which question is correct?", ["Did you finish your homework?", "Do you finished your homework?", "Did you finished your homework?"], "Did + subject + base verb.")
      ]),
      T("Time words and mixed review", "Use the past simple and review.", [
        m("Which word shows the past?", ["yesterday", "now", "every day"], "Yesterday shows a finished time."),
        m("Which word shows the past?", ["two days ago", "at the moment", "always"], "Ago shows the past."),
        f("It (be) ___ very hot yesterday.", "was", "Be in the past with it is was."),
        f("We (be) ___ at the beach last Friday.", "were", "Be in the past with we is were."),
        c("I buyed a book last week.", "I bought a book last week.", "Buy is irregular: bought."),
        m("My friends ___ at my house last night.", ["were", "was", "are"], "Friends means they. Use were."),
        b("Put the words in the correct order.", "She went to Muscat last week.", "Subject + past verb + place + time."),
        tf("The past of 'see' is 'seed'.", false, "See is irregular. The past is saw."),
        m("Choose the correct sentence.", ["He was born in 2009.", "He is born in 2009.", "He were born in 2009."], "Was born is the past form."),
        mt("Match the base verb with its past form.", [["go", "went"], ["eat", "ate"], ["see", "saw"], ["buy", "bought"]], "These are irregular verbs.")
      ])
    ]
  };
})(window.EPZ_EASY);
