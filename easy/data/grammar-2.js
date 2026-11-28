/* Easy Level / Grammar / Part 2: Present Simple */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-2"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "🕒", h: "The present simple", p: ["We use the **present simple** to talk about things we do again and again, and things that are always true.", "The verb is the base form: **play**, **go**, **eat**. With he, she and it we add **s**: he **plays**."], ex: [["I **play** football on Fridays."], ["She **studies** English."], ["The sun **rises** in the east."]] },
      { k: "examples", kick: "When do we use it?", h: "Habits, routines and facts", items: [["I **play** football every Friday.", "a habit"], ["He **wakes up** at six o'clock.", "a daily routine"], ["Water **boils** at 100 degrees.", "a fact"], ["She **lives** in Muscat.", "a permanent situation"]] },
      { k: "table", kick: "Sentence structure", h: "Add s for he, she and it", head: ["Subject", "Verb", "Example"], rows: [["I / You / We / They", "base verb", "They **play** football."], ["He / She / It", "base verb + **s**", "He **plays** football."]], note: "Only **he, she, it** (and one person or thing) take the **s**." },
      { k: "table", kick: "Spelling the s", h: "How to add s, es or ies", head: ["Rule", "Verb", "He / She / It"], rows: [["Most verbs: add **s**", "play, sleep, eat", "plays, sleeps, eats"], ["Verbs ending in s, sh, ch, x, o: add **es**", "watch, wash, fix, go", "watches, washes, fixes, goes"], ["Consonant + y: change y to **ies**", "study, carry, try", "studies, carries, tries"], ["Special verb", "have", "**has**"]] },
      { k: "examples", kick: "Positive sentences", h: "Subject + verb", items: [["I **like** tea."], ["You **speak** two languages."], ["He **works** in a bank."], ["It **rains** in Salalah in summer."], ["We **go** to school by bus."], ["They **live** in Nizwa."]] },
      { k: "table", kick: "Negative sentences", h: "Use do not or does not + base verb", head: ["Subject", "Negative", "Short form"], rows: [["I / You / We / They", "do **not** + base verb", "**don't**"], ["He / She / It", "does **not** + base verb", "**doesn't**"]], note: "After **doesn't**, the verb has no **s**: She doesn't **like** tea (not likes)." },
      { k: "table", kick: "Questions", h: "Start with Do or Does", head: ["Question", "Short answers"], rows: [["**Do** you like tea?", "Yes, I **do**. / No, I **don't**."], ["**Does** she like tea?", "Yes, she **does**. / No, she **doesn't**."], ["**Do** they live in Sohar?", "Yes, they **do**. / No, they **don't**."]], note: "After **Does**, the verb has no **s**: Does he **play**...?" },
      { k: "examples", kick: "Signal words", h: "Words that often go with the present simple", items: [["I **always** brush my teeth.", "always = every time"], ["She **usually** walks to school.", "usually = most times"], ["We **often** eat rice.", "often = many times"], ["He **sometimes** plays games.", "sometimes = not often"], ["They **never** miss school.", "never = not at any time"], ["I study **every day** and **on Sundays**.", "time phrases"]], p: "Put always, usually, often, sometimes and never **before** the main verb." },
      { k: "mistakes", h: "Be careful with these", items: [["She play football.", "She **plays** football.", "He, she and it need s."], ["He doesn't likes fish.", "He doesn't **like** fish.", "After doesn't, use the base verb."], ["Do she live here?", "**Does** she live here?", "Use does with he, she and it."], ["I am go to school.", "I **go** to school.", "Do not use am with a main verb in the present simple."]] },
      { k: "tip", h: "Quick tips", items: ["Think: he, she, it → add **s** (or es, ies).", "In negatives and questions the **s** goes to **does**, so the verb loses its **s**.", "Facts are always present simple: The sun **rises** in the east."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("My brother ___ basketball on Saturdays.", ["plays", "play", "playing"], "My brother is he, so we add s."), f("She (watch) ___ a film every weekend.", "watches", "Verbs ending in ch take es."), m("He ___ eat fish.", ["doesn't", "don't", "isn't"], "He needs doesn't."), c("Does she likes tea?", "Does she like tea?", "After does, use the base verb.")] }
    ],
    tests: [
      T("Choose the correct verb", "Choose the correct present simple verb.", [
        m("He ___ football every day.", ["plays", "play", "playing"], "He needs the s form: plays."),
        m("My sister ___ to school by bus.", ["goes", "go", "going"], "My sister is she. Go becomes goes."),
        m("They ___ English at school.", ["study", "studies", "studying"], "They does not take s, so the verb stays study."),
        m("She ___ TV in the evening.", ["watches", "watch", "watchs"], "Watch ends in ch, so add es."),
        m("The sun ___ in the east.", ["rises", "rise", "rising"], "The sun is it. Add s."),
        m("I ___ my homework after dinner.", ["do", "does", "doing"], "I takes the base verb: do."),
        m("Fatma ___ a red bag.", ["has", "have", "haves"], "Have becomes has with he, she and it."),
        m("We ___ lunch at one o'clock.", ["eat", "eats", "eating"], "We takes the base verb."),
        tf("'He go to school.' is a correct sentence.", false, "He needs goes: He goes to school."),
        tf("'My brother studies in Nizwa.' is a correct sentence.", true, "Study ends in consonant + y, so it becomes studies.")
      ]),
      T("Spelling the s", "Type the correct form of the verb in brackets.", [
        f("She (study) ___ English every night.", "studies", "Consonant + y: change y to ies."),
        f("My father (fix) ___ cars.", "fixes", "Verbs ending in x take es."),
        f("The cat (sleep) ___ on the sofa.", "sleeps", "Most verbs just add s."),
        f("He (wash) ___ his hands before lunch.", "washes", "Verbs ending in sh take es."),
        f("Ali (play) ___ with his friends.", "plays", "Vowel + y: just add s."),
        f("She (carry) ___ a heavy bag.", "carries", "Consonant + y: change y to ies."),
        f("My teacher (teach) ___ us grammar.", "teaches", "Verbs ending in ch take es."),
        f("It (rain) ___ a lot in winter.", "rains", "Most verbs just add s."),
        m("Which spelling is correct?", ["He goes", "He gos", "He goies"], "Go ends in o, so add es."),
        m("Complete: 'My cousin ___ a new laptop.'", ["has", "have", "haves"], "Have becomes has.")
      ]),
      T("Negative sentences", "Choose, type or build negative sentences.", [
        m("I ___ like coffee.", ["don't", "doesn't", "not"], "I needs don't."),
        m("She ___ work on Fridays.", ["doesn't", "don't", "isn't"], "She needs doesn't."),
        m("They ___ live in Sohar.", ["don't", "doesn't", "aren't"], "They needs don't."),
        f("He ___ play basketball. (negative short form)", "doesn't", "He needs doesn't."),
        c("She doesn't likes pizza.", "She doesn't like pizza.", "After doesn't, use the base verb without s."),
        b("Put the words in the correct order.", "My brother doesn't drink coffee.", "Subject + doesn't + base verb."),
        m("Choose the correct sentence.", ["He doesn't watch TV.", "He don't watch TV.", "He doesn't watches TV."], "Doesn't is followed by the base verb."),
        tf("'They doesn't speak French.' is a correct sentence.", false, "They needs don't: They don't speak French."),
        m("The shop ___ open on Fridays.", ["doesn't", "don't", "isn't"], "The shop is it. Use doesn't."),
        f("We ___ go to school on Fridays. (negative short form)", "don't", "We needs don't.")
      ]),
      T("Questions with do and does", "Make questions and choose short answers.", [
        m("___ you like football?", ["Do", "Does", "Are"], "You needs do."),
        m("___ she speak English?", ["Does", "Do", "Is"], "She needs does."),
        m("___ your parents live in Muscat?", ["Do", "Does", "Are"], "Parents means they. Use do."),
        b("Put the words in order to make a question.", "Does he play tennis?", "Does + subject + base verb."),
        m("Do you walk to school? — Yes, ___.", ["I do", "I am", "I does"], "Answer with do: Yes, I do."),
        m("Does Hamad study at night? — No, ___.", ["he doesn't", "he don't", "he isn't"], "Hamad is he. The short answer is doesn't."),
        c("Does she likes tea?", "Does she like tea?", "After does, use the base verb."),
        mt("Match each question with its answer.", [["Do you play chess?", "Yes, I do."], ["Does your father work here?", "No, he doesn't."], ["Do they speak Arabic?", "Yes, they do."], ["Does it rain in July?", "No, it doesn't."]], "The answer uses the same helper: do or does."),
        f("___ your sister drink tea? Type Do or Does.", "Does", "Your sister is she. Use does."),
        tf("'Do he work here?' is a correct sentence.", false, "He needs does: Does he work here?")
      ]),
      T("Always, usually, never and mixed review", "Use time words and review everything.", [
        m("Choose the correct sentence.", ["He always walks to school.", "He walks always to school.", "Always he walk to school."], "Put always before the main verb, and add s for he."),
        b("Put the words in the correct order.", "I usually wake up at six.", "Usually goes before the main verb."),
        m("Which word means 'not at any time'?", ["never", "always", "often"], "Never means not at any time."),
        f("My dad (work) ___ in a bank.", "works", "My dad is he. Add s."),
        m("They ___ football on Saturdays.", ["play", "plays", "playing"], "They takes the base verb."),
        c("I am go to school at seven.", "I go to school at seven.", "Do not use am with a main verb in the present simple."),
        tf("'Sometimes' is a word we often use with the present simple.", true, "Sometimes is a frequency word, like always and never."),
        m("Which sentence is a fact?", ["Water boils at 100 degrees.", "I am studying now.", "He is eating lunch."], "Facts use the present simple."),
        f("The bus (leave) ___ at eight o'clock.", "leaves", "The bus is it. Add s."),
        mt("Match each word with its meaning.", [["always", "every time"], ["never", "not at any time"], ["sometimes", "not often"], ["usually", "most of the time"]], "These words tell us how often something happens.")
      ])
    ]
  };
})(window.EPZ_EASY);
