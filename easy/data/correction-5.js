/* Easy Level / Fix the Mistake / Topic 5: Punctuation
   These questions are STRICT: capital letters and punctuation must be exactly right (cs = typed correction, ms = multiple choice). */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, cs = h.cs, ms = h.ms, mt = h.mt, T = h.T;
  E.parts["correction-5"] = {
    learn: [
      { k: "intro", kick: "Punctuation", e: "❗", h: "Fix the punctuation", p: ["**Punctuation** means the small marks in writing: the **full stop** (.), the **question mark** (?), the **exclamation mark** (!), the **comma** (,) and the **apostrophe** (').", "In this Part you look at a sentence with a **punctuation mistake**, find it and write the sentence **correctly**."], ex: [["Wrong: Where do you live **.** → Correct: Where do you live**?**"], ["Wrong: I like apples **bananas** and oranges. → Correct: I like apples**,** bananas and oranges."]] },
      { k: "steps", kick: "How to find a mistake", h: "Check the punctuation in four steps", q: "where do you live", items: [["Look at the end of the sentence", "A sentence needs a mark at the end: ., ? or !"], ["Decide what kind of sentence it is", "'Where do you live' is a question, so it needs a **?**"], ["Check the capital letter", "The first word needs a capital letter: **Where**"], ["Write the sentence again", "**Where do you live?**"]] },
      { k: "table", kick: "Rules", h: "Which mark do I use?", head: ["Mark", "Use", "Example"], rows: [["**.** full stop", "the end of a statement", "I like tea."], ["**?** question mark", "the end of a question", "Do you like tea?"], ["**!** exclamation mark", "strong feeling or a command", "What a nice day!"], ["**,** comma", "between things in a list, and after words like First", "I like apples, bananas and dates."], ["**'** apostrophe", "short forms and belonging", "I don't know. This is Ali's bag."]] },
      { k: "mistakes", h: "Common punctuation mistakes", items: [["Where do you live.", "Where do you live**?**", "A question ends with a question mark."], ["I like tea", "I like tea**.**", "A statement ends with a full stop."], ["I like apples bananas and dates.", "I like apples**,** bananas and dates.", "Use commas between things in a list."], ["I dont know.", "I **don't** know.", "Use an apostrophe in the short form don't."], ["This is Alis bag.", "This is **Ali's** bag.", "Use 's to show who something belongs to."]] },
      { k: "tip", h: "Quick tips", items: ["Every sentence needs a mark at the **end**: **.** or **?** or **!**", "Use a **comma** between the things in a list: apples**,** bananas and dates.", "An **apostrophe** goes where letters are missing: do not → **don't**."] },
      { k: "practice", h: "Short practice", p: "Fix the mistake. Type the correct sentence with the right punctuation.", qs: [cs("Where is the bank.", "Where is the bank?", "A question ends with a question mark."), cs("I like tea", "I like tea.", "A statement ends with a full stop."), ms("Which sentence is correct?", ["I don't like fish.", "I dont like fish.", "I don't' like fish."], "Use an apostrophe in don't."), tf("'What a nice day.' needs an exclamation mark.", true, "A strong feeling ends with an exclamation mark: What a nice day!")] }
    ],
    tests: [
      T("Full stops and question marks", "Fix the end of each sentence.", [
        cs("Where do you live.", "Where do you live?", "A question ends with a question mark."),
        cs("I go to school by bus", "I go to school by bus.", "A statement ends with a full stop."),
        cs("Is she your sister.", "Is she your sister?", "A question ends with a question mark."),
        cs("We have an English lesson today", "We have an English lesson today.", "A statement ends with a full stop."),
        cs("What is your name.", "What is your name?", "A question ends with a question mark."),
        ms("Which sentence is correct?", ["How are you?", "How are you.", "How are you,"], "A question ends with ?"),
        ms("Which sentence is correct?", ["The bus is late.", "The bus is late?", "The bus is late,"], "A statement ends with a full stop."),
        ms("Which sentence is correct?", ["Do you like football?", "Do you like football.", "Do you like football!"], "A question ends with ?"),
        tf("A question mark (?) goes at the end of a question.", true, "Questions end with ?"),
        tf("A statement ends with a question mark.", false, "A statement ends with a full stop.")
      ]),
      T("Commas in lists", "Fix the commas in the lists.", [
        cs("I like apples bananas and dates.", "I like apples, bananas and dates.", "Use a comma between things in a list."),
        cs("We have maths English and science today.", "We have maths, English and science today.", "Use commas between the things in a list."),
        cs("She bought a pen a notebook and a ruler.", "She bought a pen, a notebook and a ruler.", "Use commas between the things in a list."),
        cs("My brother plays football tennis and chess.", "My brother plays football, tennis and chess.", "Use commas between the things in a list."),
        cs("First we wash our hands.", "First, we wash our hands.", "Use a comma after First."),
        ms("Which sentence is correct?", ["I have a cat, a dog and a bird.", "I have a cat a dog, and a bird.", "I have a cat, a dog, and a bird,"], "Put commas between the things and a full stop at the end."),
        ms("Which sentence is correct?", ["We visited Muscat, Nizwa and Sur.", "We visited Muscat Nizwa and Sur.", "We visited, Muscat Nizwa, and Sur."], "Use commas between the places."),
        ms("Which sentence is correct?", ["Red, blue and green are colours.", "Red blue, and green are colours.", "Red, blue and green, are colours."], "Use commas between the colours."),
        tf("We use a comma between the things in a list.", true, "apples, bananas and dates"),
        mt("Match each list with the correct punctuation.", [["I like tea coffee and milk.", "I like tea, coffee and milk."], ["He has a bag a book and a pen.", "He has a bag, a book and a pen."], ["We play chess football and tennis.", "We play chess, football and tennis."], ["She eats rice fish and salad.", "She eats rice, fish and salad."]], "Add commas between the things in the list.")
      ]),
      T("Apostrophes", "Fix the apostrophes in short forms.", [
        cs("I dont like fish.", "I don't like fish.", "Use an apostrophe in don't."),
        cs("She doesnt play tennis.", "She doesn't play tennis.", "Use an apostrophe in doesn't."),
        cs("They arent at home.", "They aren't at home.", "Use an apostrophe in aren't."),
        cs("Its a sunny day.", "It's a sunny day.", "It's is the short form of it is."),
        cs("Im very happy.", "I'm very happy.", "I'm is the short form of I am."),
        ms("Which sentence is correct?", ["He isn't late.", "He isnt late.", "He is'nt late."], "The apostrophe goes where the o is missing: isn't."),
        ms("Which sentence is correct?", ["We can't swim.", "We cant swim.", "We ca'nt swim."], "can't = cannot."),
        ms("Which sentence is correct?", ["This is Ali's bag.", "This is Alis bag.", "This is Alis' bag."], "Use 's to show who owns something."),
        tf("'dont' is the correct short form of do not.", false, "The correct short form is don't."),
        mt("Match each short form with its long form.", [["don't", "do not"], ["isn't", "is not"], ["I'm", "I am"], ["can't", "cannot"]], "An apostrophe replaces the missing letters.")
      ]),
      T("Exclamation marks and capitals", "Fix the punctuation and capital letters.", [
        cs("what a beautiful day!", "What a beautiful day!", "A sentence starts with a capital letter."),
        cs("Watch out", "Watch out!|Watch out.", "Every sentence needs a mark at the end. A warning usually ends with an exclamation mark."),
        cs("how are you", "How are you?", "Add a capital letter and a question mark."),
        cs("we live in nizwa", "We live in Nizwa.", "Add a capital letter for the first word, a capital for the place and a full stop."),
        cs("Wow that is great", "Wow, that is great!|Wow, that is great.", "Put a comma after Wow and a mark at the end."),
        ms("Which sentence is correct?", ["Look out!", "look out!", "Look out."], "A warning has a capital letter and an exclamation mark."),
        ms("Which sentence is correct?", ["Where are you from?", "where are you from?", "Where are you from."], "A question has a capital letter and a question mark."),
        ms("Which sentence is correct?", ["I am from Oman.", "i am from oman.", "I am from Oman"], "Capital letters for I and Oman, and a full stop."),
        tf("An exclamation mark shows strong feeling.", true, "It shows surprise, joy or a warning."),
        tf("'how are you' needs a capital letter and a question mark.", true, "How are you?")
      ]),
      T("Mixed review", "Fix all kinds of punctuation mistakes.", [
        cs("where is hamad", "Where is Hamad?", "Capital letters, a name and a question mark."),
        cs("i like apples bananas and dates", "I like apples, bananas and dates.", "Capital I, commas in the list and a full stop."),
        cs("she doesnt like tea", "She doesn't like tea.", "Capital letter, apostrophe and full stop."),
        cs("what a nice surprise.", "What a nice surprise!|What a nice surprise.", "A sentence starts with a capital letter. A sentence of strong feeling can end with an exclamation mark."),
        cs("Is this Alis bag.", "Is this Ali's bag?", "Use 's for owning and a question mark."),
        ms("Which sentence is correct?", ["Can you help me, please?", "Can you help me please.", "can you help me, please?"], "A question starts with a capital letter and ends with ?"),
        ms("Which sentence is correct?", ["It's raining, so we stay home.", "Its raining, so we stay home.", "It's raining so, we stay home."], "It's is the short form, and a comma comes before so."),
        mt("Match each mark with its name.", [[".", "full stop"], ["?", "question mark"], ["!", "exclamation mark"], [",", "comma"]], "Learn the names of the marks."),
        tf("Every sentence needs a mark at the end.", true, "A full stop, question mark or exclamation mark."),
        ms("Which mark ends a question?", ["?", ".", ","], "A question ends with a question mark.")
      ])
    ]
  };
})(window.EPZ_EASY);
