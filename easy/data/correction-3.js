/* Easy Level / Fix the Mistake / Topic 3: Verb Forms */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, mt = h.mt, T = h.T;
  E.parts["correction-3"] = {
    learn: [
      { k: "intro", kick: "Verb forms", e: "🔄", h: "Fix the verb", p: ["A verb changes its **form** for the subject and for the time: he **plays**, they **played**, she is **playing**.", "In this Part you look at a sentence with a **wrong verb form**, find the mistake and write the **correct** verb."], ex: [["Wrong: He **play** football. → Correct: He **plays** football."], ["Wrong: I **goed** home. → Correct: I **went** home."]] },
      { k: "steps", kick: "How to find a mistake", h: "Check the verb in four steps", q: "She go to school yesterday.", items: [["Find the verb", "The verb is **go**."], ["Find the time", "**yesterday** means the past."], ["Choose the form", "The past of go is **went**."], ["Write the sentence again", "She **went** to school yesterday."]] },
      { k: "mistakes", h: "Common verb mistakes", items: [["He play football.", "He **plays** football.", "He, she and it need s in the present simple."], ["I goed to school.", "I **went** to school.", "go is irregular: went, not goed."], ["She is play tennis.", "She is **playing** tennis.", "After am, is, are use the -ing form."], ["Does he plays tennis?", "Does he **play** tennis?", "After do, does and did use the base verb."], ["They was at home.", "They **were** at home.", "They goes with were."]] },
      { k: "table", kick: "Verb forms", h: "Which form do I need?", head: ["When", "Form", "Example"], rows: [["he / she / it (present)", "verb + **s**", "She **plays**."], ["I / you / we / they (present)", "base verb", "They **play**."], ["happening now", "am / is / are + **-ing**", "He is **playing**."], ["finished in the past", "**-ed** or an irregular form", "He **played**. He **went**."], ["after do / does / did / can", "**base verb**", "Did you **go**? He can **swim**."]] },
      { k: "tip", h: "Quick tips", items: ["Look for **time words**: yesterday (past), now (-ing), every day (present).", "After **do / does / did / can** the verb is always the **base form**: Did you **see** him?", "Learn the common irregular verbs: go-went, see-saw, eat-ate, buy-bought."] },
      { k: "practice", h: "Short practice", p: "Fix the mistake. Type the correct sentence.", qs: [c("She play tennis every day.", "She plays tennis every day.", "She needs the s form: plays."), c("We goed to the beach.", "We went to the beach.", "go is irregular: went."), m("Which sentence is correct?", ["He is reading a book.", "He is read a book.", "He reading a book."], "After is use the -ing form: reading."), tf("'Did you went?' is correct.", false, "After did use the base verb: Did you go?")] }
    ],
    tests: [
      T("Present simple: he, she, it", "Fix the verb. Remember the s with he, she and it.", [
        c("He play football every Friday.", "He plays football every Friday.", "He needs the s form: plays."),
        c("My mother cook dinner.", "My mother cooks dinner.", "My mother is she: cooks."),
        c("The baby cry at night.", "The baby cries at night.", "baby: he or she form. cry → cries."),
        c("Ali watch TV in the evening.", "Ali watches TV in the evening.", "Verbs ending in ch take es: watches."),
        c("She have a new bag.", "She has a new bag.", "have becomes has with she."),
        m("Which sentence is correct?", ["The boys play in the garden.", "The boys plays in the garden.", "The boys playing in the garden."], "The boys is they: play."),
        m("Which sentence is correct?", ["My brother studies English.", "My brother study English.", "My brother studys English."], "study → studies with he."),
        m("Which sentence is correct?", ["It rains a lot in winter.", "It rain a lot in winter.", "It raining a lot in winter."], "It needs s: rains."),
        tf("'They plays football' is correct.", false, "They needs play."),
        f("He (go) ___ to school by bus. Type the verb.", "goes", "go → goes with he.")
      ]),
      T("Past simple", "Fix the past forms of the verbs.", [
        c("I goed to the market yesterday.", "I went to the market yesterday.", "go is irregular: went."),
        c("She buyed a new bag.", "She bought a new bag.", "buy is irregular: bought."),
        c("We eated rice for lunch.", "We ate rice for lunch.", "eat is irregular: ate."),
        c("They seed a big fish.", "They saw a big fish.", "see is irregular: saw."),
        c("He writed a letter.", "He wrote a letter.", "write is irregular: wrote."),
        m("Which sentence is correct?", ["I played football yesterday.", "I playd football yesterday.", "I plaied football yesterday."], "play + ed = played."),
        m("Which sentence is correct?", ["She studied last night.", "She studyed last night.", "She studid last night."], "study: consonant + y → studied."),
        m("Which sentence is correct?", ["We made a cake.", "We maked a cake.", "We makes a cake."], "make is irregular: made."),
        tf("The past of 'come' is 'comed'.", false, "come is irregular: came."),
        f("Yesterday I (drink) ___ a glass of milk. Type the verb.", "drank", "drink is irregular: drank.")
      ]),
      T("Present continuous", "Fix the verb. Use am, is or are and the -ing form.", [
        c("He is play football now.", "He is playing football now.", "After is use the -ing form: playing."),
        c("They playing in the park.", "They are playing in the park.", "You need are before the -ing form."),
        c("I am write a letter.", "I am writing a letter.", "write → writing."),
        c("She is runing fast.", "She is running fast.", "run: double the n before -ing."),
        c("We are makeing a cake.", "We are making a cake.", "make: drop the e before -ing."),
        m("Which sentence is correct?", ["The children are sleeping.", "The children is sleeping.", "The children sleeping."], "Children is they: are sleeping."),
        m("Which sentence is correct?", ["I am reading a book.", "I is reading a book.", "I reading a book."], "I needs am: I am reading."),
        m("Which sentence is correct?", ["It is raining.", "It are raining.", "It am raining."], "It needs is: It is raining."),
        tf("'She is cook dinner' is correct.", false, "After is use the -ing form: She is cooking dinner."),
        f("Look! The boys (swim) ___ in the sea. Type the verb with am, is or are: 'are ...'", "are swimming", "Boys is they: are swimming.")
      ]),
      T("After do, does, did and can", "Fix the verb. After do, does, did and can use the base verb.", [
        c("Does she plays tennis?", "Does she play tennis?", "After does use the base verb: play."),
        c("Did you went to school?", "Did you go to school?", "After did use the base verb: go."),
        c("I can swimming.", "I can swim.", "After can use the base verb: swim."),
        c("He doesn't likes fish.", "He doesn't like fish.", "After doesn't use the base verb: like."),
        c("They didn't played yesterday.", "They didn't play yesterday.", "After didn't use the base verb: play."),
        m("Which sentence is correct?", ["Do they live in Sur?", "Do they lives in Sur?", "Do they living in Sur?"], "After do use the base verb: live."),
        m("Which sentence is correct?", ["She can drive a car.", "She can drives a car.", "She can driving a car."], "After can use the base verb: drive."),
        m("Which sentence is correct?", ["Did he see the film?", "Did he saw the film?", "Did he seen the film?"], "After did use the base verb: see."),
        tf("'He can plays football' is correct.", false, "After can use the base verb: He can play football."),
        f("Does he ___ tea? (like) Type the verb.", "like", "After does use the base verb: like.")
      ]),
      T("Mixed review", "Fix all kinds of verb mistakes.", [
        c("My father work in a bank.", "My father works in a bank.", "My father is he: works."),
        c("They goed home early.", "They went home early.", "go is irregular: went."),
        c("She is eat an apple.", "She is eating an apple.", "After is use the -ing form: eating."),
        c("Did you saw him yesterday?", "Did you see him yesterday?", "After did use the base verb: see."),
        c("The students was in class.", "The students were in class.", "Students is they: were."),
        m("Which sentence is correct?", ["We are studying English.", "We is studying English.", "We studying English."], "We needs are."),
        m("Which sentence is correct?", ["He bought a new phone.", "He buyed a new phone.", "He buys a new phone yesterday."], "bought is the past of buy."),
        mt("Match each verb with its past form.", [["go", "went"], ["see", "saw"], ["eat", "ate"], ["buy", "bought"]], "These verbs are irregular."),
        tf("Use the base verb after 'did'.", true, "Did you go? He did not see."),
        f("They (be) ___ at school yesterday. Type the verb.", "were", "They goes with were in the past.")
      ])
    ]
  };
})(window.EPZ_EASY);
