/* Easy Level / Fix the Mistake / Topic 1: Spelling
   The word bank below makes the questions. Each row is [wrong spelling, correct spelling, tip, sentence with {w}, a second wrong spelling]. */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, mt = h.mt, T = h.T;
  var W = [
    ["becuase", "because", "because = be + cause", "I stayed home {w} it was raining.", "becouse"],
    ["freind", "friend", "friend has 'ie' (fri + end)", "My {w} lives in Nizwa.", "frend"],
    ["beutiful", "beautiful", "beau + ti + ful", "The garden is very {w}.", "beautifull"],
    ["scool", "school", "school has 'ch'", "I go to {w} by bus.", "skool"],
    ["libary", "library", "li + brar + y", "I read books in the {w}.", "librery"],
    ["diffrent", "different", "dif + fer + ent", "My bag is {w} from yours.", "diferent"],
    ["tomorow", "tomorrow", "tomorrow has two r's", "We have an exam {w}.", "tommorow"],
    ["peple", "people", "peo + ple", "Many {w} live in this city.", "peeple"],
    ["anser", "answer", "answer has a silent w", "Write the {w} in your notebook.", "answre"],
    ["wensday", "Wednesday", "Wed + nes + day", "The match is on {w}.", "Wednsday"],
    ["wich", "which", "which starts with 'wh'", "{w} book do you want?", "whitch"],
    ["thier", "their", "their: the + ir", "The students opened {w} books.", "ther"],
    ["togather", "together", "to + get + her", "We walk to school {w}.", "togeather"],
    ["allways", "always", "always has one l", "She is {w} on time.", "alwayes"],
    ["agen", "again", "a + gain", "Please say it {w}.", "agian"],
    ["bruther", "brother", "broth + er", "My {w} plays football.", "brothar"],
    ["famly", "family", "fam + i + ly", "I have a big {w}.", "familly"],
    ["Inglish", "English", "English starts with E", "I like {w} lessons.", "Englich"],
    ["recieve", "receive", "i before e, except after c", "Did you {w} my message?", "receeve"],
    ["beleive", "believe", "i before e: believe", "I {w} you.", "belive"],
    ["writting", "writing", "write: drop the e, add ing", "He is {w} a letter.", "writeing"],
    ["runing", "running", "run: double the n, add ing", "The boys are {w} in the park.", "runnig"],
    ["studing", "studying", "study + ing keeps the y", "She is {w} English.", "studiing"],
    ["happyness", "happiness", "y changes to i before ness", "I can see her {w}.", "hapiness"],
    ["intresting", "interesting", "inter + est + ing", "This book is very {w}.", "interessting"],
    ["boxs", "boxes", "words ending in x take es", "There are three {w} on the table.", "boxxes"],
    ["babys", "babies", "consonant + y: change y to ies", "The {w} are sleeping.", "babyes"],
    ["wether", "weather", "weather has 'ea'", "The {w} is hot today.", "wheather"],
    ["sience", "science", "sci + ence", "We have {w} on Sunday.", "scince"],
    ["ofen", "often", "of + ten", "We {w} visit our uncle.", "offten"],
    ["enuf", "enough", "e + nough", "I have {w} money.", "enougth"],
    ["nieghbour", "neighbour", "neigh + bour", "Our {w} is a kind man.", "neighbor"],
    ["grammer", "grammar", "grammar ends in -ar", "I practise {w} every day.", "gramar"],
    ["calender", "calendar", "calendar ends in -ar", "Look at the {w} on the wall.", "calandar"],
    ["doctar", "doctor", "doctor ends in -or", "The {w} helps sick people.", "docter"],
    ["teecher", "teacher", "teacher has 'ea'", "My {w} is kind.", "teachar"],
    ["qestion", "question", "question starts with 'qu'", "Please ask a {w}.", "questoin"],
    ["holyday", "holiday", "holi + day", "We go to Salalah on {w}.", "holliday"],
    ["Febuary", "February", "February has an r after the b", "My birthday is in {w}.", "Februery"],
    ["rember", "remember", "re + mem + ber", "I {w} my first day at school.", "rememer"]
  ];
  var sent = function (r, w) { return r[3].replace("{w}", w); };
  // a write-the-correction question: the student edits the sentence that has the mistake
  var fixQ = function (r) { return c(sent(r, r[0]), sent(r, r[1]), "The correct spelling is '" + r[1] + "'. Tip: " + r[2] + "."); };
  // "which word is spelled wrongly?": the wrong word and two correct words from other rows
  var wrongQ = function (r, a, b) { return m("Which word is spelled wrongly?", [r[0], a[1], b[1]], "'" + r[0] + "' is wrong. The correct spelling is '" + r[1] + "'. Tip: " + r[2] + "."); };
  // "which spelling is correct?"
  var rightQ = function (r) { return m("Which spelling is correct?", [r[1], r[0], r[4]], "The correct spelling is '" + r[1] + "'. Tip: " + r[2] + "."); };
  // "type the correct spelling"
  var typeQ = function (r) { return f("'" + r[0] + "' is spelled wrongly. Type the correct spelling.", r[1], "The correct spelling is '" + r[1] + "'. Tip: " + r[2] + "."); };
  var rows = function (a, b) { return W.slice(a, b); };
  var other = function (i, k) { return W[(i + 17 * k + 7) % W.length]; };   // two other rows, never the same row
  E.parts["correction-1"] = {
    learn: [
      { k: "intro", kick: "Spelling", e: "✏️", h: "Fix the spelling", p: ["**Spelling** means writing the letters of a word in the correct order. A wrong spelling is a **mistake**, even when we can still read the word.", "In this Part you look at a wrong word or sentence, **find the mistake** and write the **correct spelling**."], ex: [["Wrong: **becuase** → Correct: **because**"], ["Wrong: **freind** → Correct: **friend**"]] },
      { k: "steps", kick: "How to find a mistake", h: "Check the spelling in four steps", q: "I like my freind.", items: [["Read the sentence slowly", "Look at every word, one by one."], ["Find the word that looks wrong", "'freind' looks strange. It does not look like a word you know."], ["Think of the rule or say the word in parts", "i before e: fr**ie**nd = fri + end."], ["Write the correct word", "I like my **friend**."]] },
      { k: "mistakes", h: "Common spelling mistakes", items: [["becuase", "**because**", "be + cause"], ["freind", "**friend**", "i before e"], ["beutiful", "**beautiful**", "beau + ti + ful"], ["tomorow", "**tomorrow**", "two r's and two o's... tomorrow!"], ["libary", "**library**", "li + brar + y"]] },
      { k: "table", kick: "Spelling rules", h: "Four rules that help", head: ["Rule", "Wrong", "Correct"], rows: [["**i before e**, except after c", "recieve, beleive", "receive, believe"], ["**drop the e** before -ing", "writeing, makeing", "writing, making"], ["**double the last letter** (short vowel + one consonant)", "runing, siting", "running, sitting"], ["**consonant + y** → change y to i", "babys, happyness", "babies, happiness"]] },
      { k: "examples", kick: "Editing", h: "Show the mistake, then the correction", items: [["He is **writting** a letter. → He is **writing** a letter.", "drop the e: write → writing"], ["The **babys** are asleep. → The **babies** are asleep.", "baby → babies"], ["I **beleive** you. → I **believe** you.", "i before e"]] },
      { k: "tip", h: "Quick tips", items: ["Say the word in **parts** (syllables): fam-i-ly. Then write each part.", "Learn the words you get wrong often. Keep a list in your notebook.", "When you are not sure, use a **dictionary** or ask your teacher."] },
      { k: "practice", h: "Short practice", p: "Fix the mistake. Type the correct sentence.", qs: [c("I have a big famly.", "I have a big family.", "The correct spelling is 'family'."), m("Which spelling is correct?", ["different", "diffrent", "diferent"], "The correct spelling is 'different'."), f("'agen' is spelled wrongly. Type the correct spelling.", "again", "The correct spelling is 'again'."), tf("'Tomorow' has the correct spelling.", false, "The correct spelling is 'tomorrow', with two r's.")] }
    ],
    tests: [
      T("Spot the wrong spelling", "Find the wrong spelling, then fix the sentences.", rows(0, 7).map(function (r, i) { return wrongQ(r, other(i, 1), other(i, 2)); }).concat(rows(7, 10).map(fixQ))),
      T("Choose the correct spelling", "Choose the correct spelling, then fix the sentences.", rows(10, 17).map(rightQ).concat(rows(17, 20).map(fixQ))),
      T("Type the correct word", "Type the correct spelling, then fix the sentences.", rows(20, 27).map(typeQ).concat(rows(27, 30).map(fixQ))),
      T("Fix the sentences", "Each sentence has one spelling mistake. Fix it.", rows(30, 38).map(fixQ).concat([rightQ(W[38]), rightQ(W[39])])),
      T("Spelling rules", "Use the spelling rules to fix the mistakes.", [
        c("She is siting on the chair.", "She is sitting on the chair.", "sit has a short vowel and one consonant: double the t before -ing."),
        c("He is makeing tea.", "He is making tea.", "make ends in e: drop the e before -ing."),
        c("There are two citys in the picture.", "There are two cities in the picture.", "city: consonant + y → change y to ies."),
        m("Which spelling is correct?", ["stopping", "stoping", "stopeing"], "stop: double the p before -ing."),
        m("Which spelling is correct?", ["stories", "storys", "storyes"], "story: consonant + y → stories."),
        m("Which spelling is correct?", ["swimming", "swiming", "swimmming"], "swim: double the m before -ing."),
        f("Add -ing to 'take'. Type the new word.", "taking", "take ends in e: drop the e → taking."),
        f("Write the plural of 'watch'. Type the new word.", "watches", "Words ending in ch take es: watches."),
        mt("Match each word with its correct plural or -ing form.", [["box", "boxes"], ["baby", "babies"], ["run", "running"], ["make", "making"]], "Use the spelling rules."),
        tf("The rule 'i before e, except after c' explains 'receive'.", true, "After c the order is ei: receive.")
      ])
    ]
  };
})(window.EPZ_EASY);
