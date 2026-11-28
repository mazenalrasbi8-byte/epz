/* Easy Level / Grammar / Part 1: Verb to Be (am, is, are) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-1"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "🧑‍🎓", h: "The verb to be", p: ["**Be** is a very important verb. It has three forms: **am**, **is** and **are**.", "We use it to say who or what someone is, how they feel, and where they are."], ex: [["I **am** a student."], ["She **is** happy."], ["They **are** friends."]] },
      { k: "examples", kick: "When do we use it?", h: "Five ways to use am, is, are", items: [["My name **is** Hamad.", "name"], ["I **am** a student.", "job or who you are"], ["He **is** fourteen.", "age"], ["We **are** tired.", "feelings"], ["The books **are** on the desk.", "place"]] },
      { k: "table", kick: "Sentence structure", h: "Which form? It depends on the subject", head: ["Subject", "Verb", "Short form"], rows: [["I", "**am**", "I'm"], ["You", "**are**", "you're"], ["He / She / It", "**is**", "he's / she's / it's"], ["We", "**are**", "we're"], ["They", "**are**", "they're"]], note: "One person or thing: **is**. More than one: **are**. Only **I** uses **am**." },
      { k: "examples", kick: "Positive sentences", h: "Subject + am / is / are + ...", items: [["I **am** from Oman."], ["You **are** my friend."], ["He **is** a doctor."], ["It **is** a big city."], ["We **are** in class."], ["The boys **are** here."]] },
      { k: "table", kick: "Negative sentences", h: "Add not after am, is, are", head: ["Positive", "Negative", "Short form"], rows: [["I am happy.", "I am **not** happy.", "I'm not happy."], ["He is late.", "He is **not** late.", "He **isn't** late."], ["They are ready.", "They are **not** ready.", "They **aren't** ready."]], note: "Remember: there is no short form for **am not**. Say **I'm not**." },
      { k: "table", kick: "Questions", h: "Put am, is, are before the subject", head: ["Question", "Short answers"], rows: [["**Am** I late?", "Yes, you **are**. / No, you **aren't**."], ["**Are** you a student?", "Yes, I **am**. / No, I'm not."], ["**Is** she your sister?", "Yes, she **is**. / No, she **isn't**."], ["**Are** they at home?", "Yes, they **are**. / No, they **aren't**."]], note: "In a short answer with **yes**, do not use a short form: say **Yes, I am**, not Yes, I'm." },
      { k: "examples", kick: "Words that go with be", h: "What comes after am, is, are?", items: [["She is **a teacher**.", "a noun"], ["He is **very tall**.", "an adjective"], ["We are **from Salalah**.", "a place of origin"], ["The cat is **under the chair**.", "a place"]] },
      { k: "mistakes", h: "Be careful with these", items: [["I is a student.", "I **am** a student.", "Only I uses am."], ["She are happy.", "She **is** happy.", "She is one person, so use is."], ["They is my friends.", "They **are** my friends.", "They means more than one, so use are."], ["Am you ready?", "**Are** you ready?", "Use are with you, also in a question."]] },
      { k: "tip", h: "Quick tips", items: ["I → **am**. He, she, it → **is**. You, we, they → **are**.", "One book **is** on the desk. Two books **are** on the desk.", "In writing for school, use the full form (I am). Short forms (I'm) are for speaking and friendly writing."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("My brother ___ twelve years old.", ["is", "are", "am"], "My brother is one person. Use is."), m("We ___ in the classroom.", ["are", "is", "am"], "We is plural. Use are."), f("I ___ happy today.", "am", "Use am with I."), c("They is at home.", "They are at home.", "They is plural, so use are.")] }
    ],
    tests: [
      T("Choose am, is or are", "Choose the correct form of the verb to be.", [
        m("I ___ a student.", ["am", "is", "are"], "Use am with I."),
        m("She ___ my sister.", ["is", "am", "are"], "She is one person, so we use is."),
        m("They ___ at school.", ["are", "is", "am"], "They means more than one, so we use are."),
        m("The book ___ on the table.", ["is", "are", "am"], "One book is singular. Use is."),
        m("We ___ good friends.", ["are", "is", "am"], "We is plural. Use are."),
        m("My father ___ a teacher.", ["is", "are", "am"], "My father is one person. Use is."),
        m("You ___ very kind.", ["are", "is", "am"], "Use are with you."),
        m("The cats ___ under the chair.", ["are", "is", "am"], "Cats is plural. Use are."),
        tf("'He am happy.' is a correct sentence.", false, "With he we use is: He is happy."),
        tf("'It is a big city.' is a correct sentence.", true, "It is one thing, so we use is.")
      ]),
      T("Complete the sentences", "Type am, is or are. In the last two questions, choose the answer.", [
        f("I ___ from Oman.", "am", "Use am with I."),
        f("My mother ___ in the kitchen.", "is", "My mother is one person. Use is."),
        f("The boys ___ in the park.", "are", "Boys is plural. Use are."),
        f("It ___ a sunny day.", "is", "It is one thing. Use is."),
        f("You ___ my best friend.", "are", "Use are with you."),
        f("We ___ students at this school.", "are", "We is plural. Use are."),
        f("Ali and Salem ___ brothers.", "are", "Ali and Salem is two people. Use are."),
        f("The apple ___ red.", "is", "One apple is singular. Use is."),
        m("Fatma and I ___ cousins.", ["are", "is", "am"], "Fatma and I means we. Use are."),
        m("My sister ___ a doctor.", ["is", "are", "am"], "My sister is one person. Use is.")
      ]),
      T("Negative sentences", "Make and choose negative sentences with am not, isn't and aren't.", [
        m("He ___ not at home.", ["is", "are", "am"], "He needs is: He is not at home."),
        m("Choose the correct negative: 'They ___ happy.'", ["are not", "is not", "am not"], "They needs are. Add not after are."),
        m("Which short form means 'She is not'?", ["She isn't", "She aren't", "She amn't"], "Is not becomes isn't."),
        f("We are ___ late today.", "not", "Put not after am, is or are to make a negative."),
        c("I is not a teacher.", "I am not a teacher.", "Use am with I, also in a negative sentence."),
        b("Put the words in the correct order.", "She is not tired.", "Subject + is + not + word."),
        m("The shoes ___ new.", ["aren't", "isn't", "amn't"], "Shoes is plural, so we use aren't."),
        tf("'You isn't my teacher.' is a correct sentence.", false, "Use aren't with you: You aren't my teacher."),
        m("Choose the correct sentence.", ["It isn't cold today.", "It aren't cold today.", "It am not cold today."], "It is one thing. Use isn't."),
        f("I ___ not hungry. Type am, is or are.", "am", "Use am not with I.")
      ]),
      T("Questions and short answers", "Make questions with am, is and are and choose the short answers.", [
        m("___ you a student?", ["Are", "Is", "Am"], "Use are with you."),
        m("___ she your sister?", ["Is", "Are", "Am"], "Use is with she."),
        m("___ I late?", ["Am", "Is", "Are"], "Use am with I in a question."),
        b("Put the words in order to make a question.", "Is he a doctor?", "In a question, is comes before the subject."),
        m("Is Ali at school? — Yes, ___.", ["he is", "he am", "he are"], "Ali is he. The short answer is Yes, he is."),
        m("Are they happy? — No, ___.", ["they aren't", "they isn't", "they amn't"], "They goes with are, so the short answer is aren't."),
        f("___ the children in the garden? Type Is or Are.", "Are", "Children is plural. Use are."),
        c("Am you ready?", "Are you ready?", "Use are with you in a question too."),
        mt("Match each question with its answer.", [["Are you a student?", "Yes, I am."], ["Is she your teacher?", "No, she isn't."], ["Are they at home?", "Yes, they are."], ["Is it a book?", "Yes, it is."]], "The answer uses the same verb as the question."),
        tf("'Is they your friends?' is a correct sentence.", false, "They needs are: Are they your friends?")
      ]),
      T("Mixed review", "Different kinds of questions about am, is and are.", [
        m("My name ___ Hamad.", ["is", "are", "am"], "Name is one thing. Use is."),
        f("I ___ sixteen years old.", "am", "Use am with I."),
        c("She are my teacher.", "She is my teacher.", "She is one person, so use is."),
        m("Which sentence is correct?", ["We are in the library.", "We is in the library.", "We am in the library."], "We needs are."),
        b("Put the words in the correct order.", "They are not here.", "Subject + are + not + word."),
        m("___ it a long road?", ["Is", "Are", "Am"], "It is one thing. Use is."),
        tf("'The students are happy.' is a correct sentence.", true, "Students is plural. Use are."),
        f("Khalid ___ not tall. Type am, is or are.", "is", "Khalid is one person. Use is not."),
        m("Which short form means 'We are'?", ["We're", "We's", "Wer"], "We are becomes we're."),
        c("Are she at home?", "Is she at home?", "She goes with is, also in a question.")
      ])
    ]
  };
})(window.EPZ_EASY);
