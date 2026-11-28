/* Easy Level / Build Sentences / Topic 5: Negative Sentences */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["building-5"] = {
    learn: [
      { k: "intro", kick: "Saying no", e: "🚫", h: "Negative sentences", p: ["A **negative sentence** says that something is **not** true or does **not** happen.", "We make negatives with **not**: **am not, is not, are not** with the verb be, and **do not / does not** with other verbs."], ex: [["He **is not** a doctor."], ["I **do not** like fish."], ["She **does not** play tennis."]] },
      { k: "table", kick: "With the verb be", h: "am / is / are + not", head: ["Positive", "Negative", "Short form"], rows: [["I am tired.", "I am **not** tired.", "I'm not tired."], ["He is late.", "He is **not** late.", "He **isn't** late."], ["They are here.", "They are **not** here.", "They **aren't** here."]], note: "There is no short form for **am not**. Say **I'm not**." },
      { k: "table", kick: "With other verbs", h: "do not / does not + base verb", head: ["Subject", "Negative", "Short form"], rows: [["I / you / we / they", "**do not** + verb", "**don't**"], ["he / she / it", "**does not** + verb", "**doesn't**"]], note: "After **don't** and **doesn't** the verb is the **base form** (no s): She doesn't **like** fish." },
      { k: "table", kick: "With can", h: "can + not", head: ["Positive", "Negative"], rows: [["I **can** swim.", "I **cannot** (can't) swim."], ["She **can** drive.", "She **can't** drive."]], note: "We write **cannot** as one word." },
      { k: "examples", kick: "Examples", h: "Negative sentences in order", items: [["She **is not** at home.", "subject + be + not"], ["They **aren't** students.", "subject + be + n't"], ["I **don't** like tea.", "subject + don't + verb"], ["He **doesn't** play football.", "subject + doesn't + verb"], ["We **cannot** go now.", "subject + cannot + verb"]] },
      { k: "mistakes", h: "Be careful with these", items: [["He not is late.", "He **is not** late.", "Not comes after am, is or are."], ["I no like fish.", "I **don't** like fish.", "Use don't, not no."], ["She doesn't likes tea.", "She doesn't **like** tea.", "After doesn't, use the base verb."], ["They doesn't play.", "They **don't** play.", "Use don't with they."]] },
      { k: "tip", h: "Quick tips", items: ["With **be**: put **not** after am, is, are.", "With other verbs: **don't** or **doesn't** + the base verb.", "**He, she, it** → **doesn't**. **I, you, we, they** → **don't**."] },
      { k: "practice", h: "Build the sentences", p: "Tap the words in the correct order.", qs: [b("Put the words in order.", "He is not late.", "Subject + is + not."), b("Put the words in order.", "I don't like tea.", "Subject + don't + base verb."), m("Which is correct?", ["She doesn't play tennis.", "She don't play tennis.", "She doesn't plays tennis."], "She needs doesn't and the base verb play."), c("They not are here.", "They are not here.", "Not comes after are.")] }
    ],
    tests: [
      T("Negatives with be", "Build negative sentences with am not, is not and are not.", [
        b("Put the words in order.", "She is not at home.", "Subject + is + not."),
        b("Put the words in order.", "They are not students.", "Subject + are + not."),
        b("Put the words in order.", "I am not tired.", "Subject + am + not."),
        b("Put the words in order.", "He isn't a doctor.", "Subject + isn't."),
        b("Put the words in order.", "We aren't late.", "Subject + aren't."),
        b("Put the words in order.", "It is not cold today.", "Subject + is + not."),
        m("Which sentence is correct?", ["He is not here.", "He not is here.", "He is no here."], "Not comes after is."),
        m("Which short form means 'are not'?", ["aren't", "isn't", "amn't"], "Are not becomes aren't."),
        c("She not is happy.", "She is not happy.", "Not comes after is."),
        tf("There is a short form 'amn't'.", false, "We say I'm not instead.")
      ]),
      T("Don't and doesn't", "Build negative sentences with don't and doesn't.", [
        b("Put the words in order.", "I don't like fish.", "Subject + don't + base verb."),
        b("Put the words in order.", "She doesn't play tennis.", "Subject + doesn't + base verb."),
        b("Put the words in order.", "They don't live in Sur.", "Subject + don't + base verb."),
        b("Put the words in order.", "He doesn't drink coffee.", "Subject + doesn't + base verb."),
        b("Put the words in order.", "We don't watch television.", "Subject + don't + base verb."),
        b("Put the words in order.", "The shop doesn't open on Fridays.", "Subject + doesn't + base verb."),
        m("Which sentence is correct?", ["He doesn't like milk.", "He don't like milk.", "He doesn't likes milk."], "He needs doesn't and the base verb like."),
        m("Which sentence is correct?", ["They don't eat meat.", "They doesn't eat meat.", "They don't eats meat."], "They needs don't and the base verb eat."),
        c("She doesn't likes tea.", "She doesn't like tea.", "After doesn't, use the base verb."),
        tf("With 'he' we use 'don't'.", false, "With he, she and it we use doesn't.")
      ]),
      T("Choose the negative", "Choose or type the correct negative form.", [
        m("I ___ like cold water.", ["don't", "doesn't", "isn't"], "I needs don't."),
        m("She ___ play football.", ["doesn't", "don't", "aren't"], "She needs doesn't."),
        m("They ___ at school today.", ["aren't", "isn't", "don't"], "They goes with aren't."),
        m("He ___ tired.", ["isn't", "doesn't", "don't"], "He is tired uses isn't."),
        b("Put the words in order.", "You aren't ready.", "Subject + aren't + adjective."),
        b("Put the words in order.", "It isn't hot.", "Subject + isn't + adjective."),
        b("Put the words in order.", "My father doesn't work on Fridays.", "Subject + doesn't + base verb."),
        b("Put the words in order.", "The students aren't ready.", "Subject + aren't + adjective."),
        b("Put the words in order.", "They don't play tennis.", "Subject + don't + base verb."),
        c("I no like fish.", "I don't like fish.", "Use don't, not no.")
      ]),
      T("Make it negative", "Change each positive sentence into a negative sentence.", [
        b("Put the words in order. (Negative of: He is late.)", "He isn't late.", "Is + not."),
        b("Put the words in order. (Negative of: They play football.)", "They don't play football.", "Don't + base verb."),
        b("Put the words in order. (Negative of: She likes fish.)", "She doesn't like fish.", "Doesn't + base verb."),
        b("Put the words in order. (Negative of: I am ready.)", "I am not ready.", "Am + not."),
        b("Put the words in order. (Negative of: We eat meat.)", "We don't eat meat.", "Don't + base verb."),
        b("Put the words in order. (Negative of: The bus stops here.)", "The bus doesn't stop here.", "Doesn't + base verb."),
        m("The negative of 'She walks to school' is ___ .", ["She doesn't walk to school.", "She don't walks to school.", "She not walks to school."], "Doesn't + base verb."),
        m("The negative of 'They are happy' is ___ .", ["They aren't happy.", "They don't happy.", "They not happy."], "Are + not."),
        c("He don't like tea.", "He doesn't like tea.", "Use doesn't with he."),
        tf("To make a negative with 'plays' we write 'doesn't plays'.", false, "After doesn't the verb is the base form: doesn't play.")
      ]),
      T("Mixed review", "Build, choose and correct negative sentences.", [
        b("Put the words in order.", "I cannot swim.", "Subject + cannot + base verb."),
        b("Put the words in order.", "She can't drive a car.", "Subject + can't + base verb."),
        b("Put the words in order.", "The children don't eat vegetables.", "Subject + don't + base verb."),
        b("Put the words in order.", "He isn't a pilot.", "Subject + isn't + noun."),
        b("Put the words in order.", "We don't go to school on Fridays.", "Subject + don't + base verb."),
        b("Put the words in order.", "My sister doesn't like spicy food.", "Subject + doesn't + base verb."),
        m("Which sentence is correct?", ["I don't have a car.", "I doesn't have a car.", "I no have a car."], "I needs don't."),
        c("He not is a student.", "He is not a student.", "Not comes after is."),
        mt("Match each positive start with its negative.", [["I am", "I am not"], ["She is", "She isn't"], ["They are", "They aren't"], ["We eat", "We don't eat"]], "Make the negative with not, isn't, aren't or don't."),
        tf("'Cannot' is written as one word.", true, "We write cannot as one word (or can't).")
      ])
    ]
  };
})(window.EPZ_EASY);
