/* Easy Level / Build Sentences / Topic 1: Subject + Verb
   Sentence-building questions (b) show the words as tiles; the student taps them in the correct order. */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["building-1"] = {
    learn: [
      { k: "intro", kick: "What is a sentence?", e: "🧩", h: "A sentence needs a subject and a verb", p: ["A **sentence** is a group of words that gives a complete idea. It starts with a **capital letter** and ends with a **full stop** (.), a **question mark** (?) or an **exclamation mark** (!).", "Every sentence needs a **subject** and a **verb**. The simplest sentence is **Subject + Verb**."], ex: [["**Birds** fly."], ["**Ali** sleeps."], ["**The sun** shines."]] },
      { k: "table", kick: "Parts of a sentence", h: "Subject and verb", head: ["Part", "What is it?", "Example"], rows: [["**Subject**", "who or what does the action", "**The boy** runs."], ["**Verb**", "the action word", "The boy **runs**."]], note: "Ask: **Who?** or **What?** to find the subject. Ask: **What does it do?** to find the verb." },
      { k: "table", kick: "Basic pattern", h: "Subject + Verb (+ place or time)", head: ["Subject", "Verb", "Place or time"], rows: [["Birds", "**fly**", "."], ["The children", "**play**", "in the park."], ["My father", "**works**", "every day."], ["I", "**wake up**", "early."]], note: "The subject comes **first**, then the verb. Place and time words usually come at the **end**." },
      { k: "examples", kick: "Examples", h: "Short and clear", items: [["**Fish** swim.", "S + V"], ["**The baby** cries.", "S + V"], ["**We** study.", "S + V"], ["**The bus** stops at the corner.", "S + V + place"], ["**She** sings in the morning.", "S + V + time"]] },
      { k: "table", kick: "Questions and negatives", h: "The same sentence in three forms", head: ["Positive", "Negative", "Question"], rows: [["The boy **runs**.", "The boy **does not run**.", "**Does** the boy **run**?"], ["Birds **fly**.", "Birds **do not fly**.", "**Do** birds **fly**?"], ["I **am** here.", "I **am not** here.", "**Am** I here?"]] },
      { k: "mistakes", h: "Be careful with these", items: [["Runs the boy.", "**The boy runs.**", "The subject comes before the verb."], ["The boy run.", "The boy **runs**.", "He, she and it need s: runs."], ["birds fly", "**Birds fly.**", "Start with a capital letter and end with a full stop."], ["The children plays in the park.", "The children **play** in the park.", "Children means they, so no s."]] },
      { k: "tip", h: "Quick tips", items: ["Find the **verb** first. Then ask **Who?** or **What?** to find the subject.", "Say your sentence aloud. If it sounds wrong, check the order: **subject, then verb**.", "A sentence starts with a **capital letter** and ends with a **full stop**."] },
      { k: "practice", h: "Build the sentences", p: "Tap the words in the correct order.", qs: [b("Put the words in order.", "Birds fly.", "Subject + verb: Birds fly."), b("Put the words in order.", "The baby cries.", "Subject (The baby) + verb (cries)."), m("What is the verb in 'Ali sleeps'?", ["sleeps", "Ali", "Ali sleeps"], "The verb is the action word: sleeps."), m("What is the subject in 'The sun shines'?", ["The sun", "shines", "sun shines"], "The subject is who or what does the action: The sun.")] }
    ],
    tests: [
      T("Find the subject and the verb", "Choose the subject or the verb. Then build the sentences.", [
        m("What is the subject in 'The boy runs'?", ["The boy", "runs", "boy runs"], "The subject is who does the action: The boy."),
        m("What is the verb in 'Fish swim'?", ["swim", "Fish", "Fish swim"], "The verb is the action word: swim."),
        m("What is the verb in 'The baby cries'?", ["cries", "baby", "The baby"], "The action is cries."),
        m("What is the subject in 'We study'?", ["We", "study", "We study"], "The subject is We."),
        m("Which one is a complete sentence?", ["Birds fly.", "Birds", "fly in"], "A sentence needs a subject (Birds) and a verb (fly)."),
        b("Put the words in order.", "Fish swim.", "Subject (Fish) + verb (swim)."),
        b("Put the words in order.", "The sun shines.", "Subject (The sun) + verb (shines)."),
        b("Put the words in order.", "Ali sleeps.", "Subject (Ali) + verb (sleeps)."),
        b("Put the words in order.", "Children play.", "Subject (Children) + verb (play)."),
        b("Put the words in order.", "The bus stops.", "Subject (The bus) + verb (stops).")
      ]),
      T("Build short sentences", "Build each sentence with the words. Remember the capital letter and the full stop.", [
        b("Put the words in order.", "My brother sleeps.", "Subject (My brother) + verb (sleeps)."),
        b("Put the words in order.", "The girls sing.", "Subject (The girls) + verb (sing)."),
        b("Put the words in order.", "The wind blows.", "Subject (The wind) + verb (blows)."),
        b("Put the words in order.", "Dogs bark.", "Subject (Dogs) + verb (bark)."),
        b("Put the words in order.", "The teacher smiles.", "Subject (The teacher) + verb (smiles)."),
        b("Put the words in order.", "Camels walk.", "Subject (Camels) + verb (walk)."),
        b("Put the words in order.", "The students listen.", "Subject (The students) + verb (listen)."),
        tf("'Run boys the.' is a correct sentence.", false, "The order must be subject then verb: The boys run."),
        m("Which sentence is in the correct order?", ["The cat sleeps.", "Sleeps the cat.", "Cat the sleeps."], "Subject first, then the verb: The cat sleeps."),
        m("Which sentence is written correctly?", ["Rain falls.", "Falls rain.", "Rain falling."], "The subject comes first, then the verb, with a capital letter and a full stop.")
      ]),
      T("Choose the correct verb", "Choose or type the verb that fits the subject.", [
        m("The baby ___ .", ["sleeps", "sleep", "sleeping"], "The baby is one person (he or she), so we add s: sleeps."),
        b("Put the words in order.", "The boys run.", "Subject (The boys) + verb (run)."),
        m("My mother ___ .", ["cooks", "cook", "cooking"], "My mother is she, so we add s: cooks."),
        b("Put the words in order.", "Birds sing.", "Subject (Birds) + verb (sing)."),
        f("She ___ every day. (walk)", "walks", "She needs the s form: walks."),
        f("The children ___ in the garden. (play)", "play", "The children means they, so no s: play."),
        c("The boy run.", "The boy runs.", "The boy is one person, so add s: runs."),
        b("Put the words in order.", "Salem sleeps.", "Subject (Salem) + verb (sleeps)."),
        b("Put the words in order.", "She walks.", "Subject (She) + verb (walks)."),
        b("Put the words in order.", "They work.", "Subject (They) + verb (work).")
      ]),
      T("Add a place or a time", "Build sentences with a subject, a verb and a place or a time.", [
        b("Put the words in order.", "The children play in the park.", "Subject + verb + place (in the park)."),
        b("Put the words in order.", "The bird sings in the morning.", "Subject + verb + time (in the morning)."),
        b("Put the words in order.", "I wake up early.", "Subject (I) + verb (wake up) + time (early)."),
        b("Put the words in order.", "My father works every day.", "Subject + verb + time (every day)."),
        b("Put the words in order.", "The bus stops at the corner.", "Subject + verb + place (at the corner)."),
        b("Put the words in order.", "Fish live in the sea.", "Subject + verb + place (in the sea)."),
        b("Put the words in order.", "We study at school.", "Subject + verb + place (at school)."),
        m("Which words tell us WHERE in 'The girls sing in the garden'?", ["in the garden", "The girls", "sing"], "In the garden tells us the place."),
        m("Which word tells us WHEN in 'I wake up early'?", ["early", "wake", "I"], "Early tells us the time."),
        tf("The place or time usually comes at the end of the sentence.", true, "We usually put the place and the time at the end.")
      ]),
      T("Mixed review", "Build, choose and correct.", [
        b("Put the words in order.", "The sun rises in the east.", "Subject + verb + place."),
        b("Put the words in order.", "Camels walk in the desert.", "Subject + verb + place."),
        b("Put the words in order.", "The students study every night.", "Subject + verb + time."),
        b("Put the words in order.", "A bird sings.", "Subject (A bird) + verb (sings)."),
        b("Put the words in order.", "Doctors help people.", "Subject (Doctors) + verb (help) + object (people)."),
        m("Which one is NOT a complete sentence?", ["in the garden", "Birds fly.", "Ali sleeps."], "'In the garden' has no subject and no verb."),
        m("Which sentence has a capital letter and a full stop?", ["Ali sleeps.", "ali sleeps", "sleeps Ali"], "A sentence starts with a capital letter and ends with a full stop."),
        c("Runs the boy.", "The boy runs.", "The subject comes before the verb."),
        mt("Match the sentence with its subject.", [["The baby cries.", "The baby"], ["Fish swim.", "Fish"], ["We study.", "We"], ["The sun shines.", "The sun"]], "The subject is who or what does the action."),
        tf("Every sentence needs a verb.", true, "A sentence must have a subject and a verb.")
      ])
    ]
  };
})(window.EPZ_EASY);
