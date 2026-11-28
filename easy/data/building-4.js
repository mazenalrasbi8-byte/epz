/* Easy Level / Build Sentences / Topic 4: Making Questions */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["building-4"] = {
    learn: [
      { k: "intro", kick: "Asking questions", e: "❓", h: "Making questions", p: ["We ask questions to find out information. There are two kinds: **yes/no questions** (Do you like tea?) and **question word questions** (Where do you live?).", "In a question, the **helping verb** (am, is, are, do, does) comes **before the subject**."], ex: [["**Is** he a doctor?"], ["**Do** you like tea?"], ["**Where** do you live?"]] },
      { k: "table", kick: "Yes/no questions", h: "Helping verb + subject + ...", head: ["Statement", "Question"], rows: [["He **is** a doctor.", "**Is** he a doctor?"], ["They **are** at home.", "**Are** they at home?"], ["You **like** tea.", "**Do** you like tea?"], ["She **plays** tennis.", "**Does** she play tennis?"]], note: "With **he, she, it**: **Does** + base verb (no s): **Does** she **play**?" },
      { k: "table", kick: "Question words", h: "What do the question words ask?", head: ["Question word", "Asks about", "Example"], rows: [["**What**", "a thing", "What is your name?"], ["**Where**", "a place", "Where do you live?"], ["**When**", "a time", "When does school start?"], ["**Who**", "a person", "Who is your teacher?"], ["**Why**", "a reason", "Why are you late?"], ["**How**", "the way", "How do you go to school?"]] },
      { k: "table", kick: "Sentence structure", h: "Question word + helping verb + subject + main verb", head: ["Question word", "Helping verb", "Subject", "Main verb"], rows: [["Where", "do", "you", "live?"], ["What", "does", "he", "eat?"], ["When", "do", "they", "play?"], ["How", "are", "you", "?"]] },
      { k: "examples", kick: "Examples", h: "Questions in order", items: [["**Are** you a student?", "be + subject"], ["**Does** your brother play football?", "does + subject + base verb"], ["**What** is your name?", "question word + be + subject"], ["**Where** do you live?", "question word + do + subject + verb"], ["**Why** is he late?", "question word + be + subject"]] },
      { k: "mistakes", h: "Be careful with these", items: [["You are a student?", "**Are you** a student?", "Put the helping verb before the subject."], ["Does she plays tennis?", "Does she **play** tennis?", "After does, use the base verb."], ["Where you live?", "Where **do you** live?", "Add do after the question word."], ["What he eats?", "What **does he eat**?", "Use does + base verb."]] },
      { k: "tip", h: "Quick tips", items: ["Questions start with a **helping verb** or a **question word**, and end with **?**.", "With **do/does** the main verb stays in the **base form**.", "Say the question aloud. If it sounds like a statement, check the **order**."] },
      { k: "practice", h: "Build the questions", p: "Tap the words in the correct order.", qs: [b("Put the words in order.", "Is he a doctor?", "Is + subject + noun."), b("Put the words in order.", "Where do you live?", "Where + do + subject + verb."), m("Which question is correct?", ["Does she play tennis?", "Does she plays tennis?", "Do she play tennis?"], "With she we use does and the base verb play."), c("You like tea?", "Do you like tea?", "Add Do before the subject.")] }
    ],
    tests: [
      T("Yes/no questions", "Build questions with am, is, are, do and does.", [
        b("Put the words in order.", "Are you a student?", "Are + subject + noun."),
        b("Put the words in order.", "Is she your sister?", "Is + subject + noun."),
        b("Put the words in order.", "Do you like fish?", "Do + subject + base verb."),
        b("Put the words in order.", "Does he play tennis?", "Does + subject + base verb."),
        b("Put the words in order.", "Are they at home?", "Are + subject + place."),
        b("Put the words in order.", "Does your mother cook dinner?", "Does + subject + base verb + object."),
        m("Which question is correct?", ["Is it a big city?", "It is a big city?", "Is it a big city."], "Put is before it and end with a question mark."),
        m("Which question is correct?", ["Do they play football?", "Does they play football?", "Do they plays football?"], "They goes with do, and the verb stays play."),
        c("You are ready?", "Are you ready?", "Put are before the subject."),
        tf("In 'Does she like tea?' the verb is 'likes'.", false, "After does we use the base verb: like.")
      ]),
      T("What, where, when", "Build questions with question words.", [
        b("Put the words in order.", "What is your name?", "What + is + subject."),
        b("Put the words in order.", "Where do you live?", "Where + do + subject + verb."),
        b("Put the words in order.", "When does school start?", "When + does + subject + verb."),
        b("Put the words in order.", "Where is the library?", "Where + is + subject."),
        b("Put the words in order.", "What do you eat for breakfast?", "What + do + subject + verb."),
        b("Put the words in order.", "When do you wake up?", "When + do + subject + verb."),
        m("Which question word asks about a place?", ["Where", "When", "Who"], "Where asks about a place."),
        m("Which question word asks about a time?", ["When", "Where", "Why"], "When asks about a time."),
        m("Which question word asks about a thing?", ["What", "Who", "How"], "What asks about a thing."),
        c("Where you live?", "Where do you live?", "Add do after the question word.")
      ]),
      T("Who, why, how", "Build questions with who, why and how.", [
        b("Put the words in order.", "Who is your teacher?", "Who + is + subject."),
        b("Put the words in order.", "Why are you late?", "Why + are + subject."),
        b("Put the words in order.", "How do you go to school?", "How + do + subject + verb."),
        b("Put the words in order.", "How are you today?", "How + are + subject."),
        b("Put the words in order.", "Why does he cry?", "Why + does + subject + verb."),
        b("Put the words in order.", "Who does she call?", "Who + does + subject + verb."),
        m("Which question word asks about a reason?", ["Why", "Who", "Where"], "Why asks for a reason."),
        m("Which question word asks about a person?", ["Who", "What", "When"], "Who asks about a person."),
        m("Which question word asks about the way?", ["How", "Why", "When"], "How asks about the way."),
        c("What he eats?", "What does he eat?", "Use does + base verb.")
      ]),
      T("Make the question", "Turn each sentence into a question.", [
        b("Put the words in order. (Question for: He is a doctor.)", "Is he a doctor?", "Put is before the subject."),
        b("Put the words in order. (Question for: They live in Sur.)", "Do they live in Sur?", "Use do with they."),
        b("Put the words in order. (Question for: She likes milk.)", "Does she like milk?", "Use does with she and the base verb like."),
        b("Put the words in order. (Question for: We are late.)", "Are we late?", "Put are before the subject."),
        b("Put the words in order. (Question for: The bus leaves at seven.)", "Does the bus leave at seven?", "Use does + base verb."),
        b("Put the words in order. (Question for: Ali reads a book.)", "Does Ali read a book?", "Use does + base verb."),
        m("The question for 'You speak English' is ___ .", ["Do you speak English?", "Does you speak English?", "Are you speak English?"], "Use do with you."),
        m("The question for 'She is tired' is ___ .", ["Is she tired?", "Does she tired?", "Do she is tired?"], "Put is before she."),
        c("Does he plays football?", "Does he play football?", "After does, use the base verb."),
        tf("A question ends with a question mark.", true, "Questions end with ?")
      ]),
      T("Mixed review", "Build, choose and correct questions.", [
        b("Put the words in order.", "Where does your father work?", "Where + does + subject + verb."),
        b("Put the words in order.", "What time is it?", "What + time + is + it."),
        b("Put the words in order.", "Are you a student at this school?", "Are + subject + noun + place."),
        b("Put the words in order.", "Why do you study English?", "Why + do + subject + verb."),
        b("Put the words in order.", "How old is your brother?", "How old + is + subject."),
        b("Put the words in order.", "Do you walk to school every day?", "Do + subject + verb + place + time."),
        m("Which is the correct question?", ["What does she eat for lunch?", "What she eats for lunch?", "What does she eats for lunch?"], "What + does + she + eat."),
        c("You are late why?", "Why are you late?", "Start with the question word."),
        mt("Match the question word with what it asks.", [["Who", "a person"], ["Where", "a place"], ["When", "a time"], ["Why", "a reason"]], "Each question word asks for a different thing."),
        tf("In a question the helping verb comes before the subject.", true, "Helping verb first, then the subject.")
      ])
    ]
  };
})(window.EPZ_EASY);
