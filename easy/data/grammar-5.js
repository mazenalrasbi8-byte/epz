/* Easy Level / Grammar / Part 5: Subject and Object Pronouns */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["grammar-5"] = {
    learn: [
      { k: "intro", kick: "What is it?", e: "👥", h: "Pronouns", p: ["A **pronoun** is a short word that takes the place of a noun. We use pronouns so we do not repeat names again and again.", "There are **subject pronouns** (I, you, he, she, it, we, they) and **object pronouns** (me, you, him, her, it, us, them)."], ex: [["**Ali** is tall. **He** is tall."], ["I like **Sara**. I like **her**."], ["**The boys** are here. I can see **them**."]] },
      { k: "examples", kick: "When do we use them?", h: "Before the verb or after the verb", items: [["**I** play football.", "subject: before the verb"], ["**She** lives in Sur.", "subject: before the verb"], ["The teacher helps **me**.", "object: after the verb"], ["Come with **us**.", "object: after a preposition (with, to, for)"]] },
      { k: "table", kick: "Sentence structure", h: "Subject and object pronouns", head: ["Subject (does the action)", "Object (receives the action)"], rows: [["**I**", "**me**"], ["**you**", "**you**"], ["**he**", "**him**"], ["**she**", "**her**"], ["**it**", "**it**"], ["**we**", "**us**"], ["**they**", "**them**"]], note: "**You** and **it** are the same in both columns." },
      { k: "examples", kick: "Positive sentences", h: "Subject pronoun + verb + object pronoun", items: [["**I** know **him**."], ["**She** sees **us**."], ["**They** like **it**."], ["**We** help **them**."], ["**He** calls **me** every day."], ["**You** can sit with **her**."]] },
      { k: "table", kick: "Negative sentences", h: "The pronouns stay the same", head: ["Positive", "Negative"], rows: [["I know him.", "I **don't** know **him**."], ["She helps us.", "She **doesn't** help **us**."], ["They saw me.", "They **didn't** see **me**."]] },
      { k: "table", kick: "Questions", h: "The pronouns stay the same", head: ["Question", "Answer"], rows: [["Do **you** know **her**?", "Yes, I know **her**."], ["Does **he** like **them**?", "Yes, he likes **them**."], ["Can **you** help **me**?", "Yes, I can help **you**."]] },
      { k: "examples", kick: "Words that go with pronouns", h: "Prepositions are followed by object pronouns", items: [["Sit next to **me**.", "next to me"], ["This is a gift for **him**.", "for him"], ["Come with **us**.", "with us"], ["Listen to **her**.", "to her"], ["Look at **them**.", "at them"]], p: "After words like **to, for, with, at, from**, use an **object pronoun**." },
      { k: "mistakes", h: "Be careful with these", items: [["Him is my friend.", "**He** is my friend.", "Use a subject pronoun before the verb."], ["I like she.", "I like **her**.", "Use an object pronoun after the verb."], ["Give the book to I.", "Give the book to **me**.", "After to, use an object pronoun."], ["Me and Ali are friends.", "Ali and **I** are friends.", "Use I for the subject. It is polite to put the other person first."]] },
      { k: "tip", h: "Quick tips", items: ["Ask: Who **does** the action? → subject pronoun. Who **receives** the action? → object pronoun.", "Use **they / them** for more than one person or thing.", "Use **it** for one thing or animal."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Sara is my sister. ___ is ten.", ["She", "Her", "Hers"], "A subject pronoun comes before the verb."), m("I like Ali. I often play with ___.", ["him", "he", "his"], "After with, use an object pronoun."), f("The books are old. I can't read ___ .", "them", "Books means more than one. The object pronoun is them."), c("Her is a good teacher.", "She is a good teacher.", "Use a subject pronoun before the verb.")] }
    ],
    tests: [
      T("Subject pronouns", "Choose the correct subject pronoun.", [
        m("Fatma is my cousin. ___ lives in Nizwa.", ["She", "Her", "He"], "Fatma is one girl. Use she."),
        m("Ali and I are friends. ___ play together.", ["We", "Us", "They"], "Ali and I means we."),
        m("My brothers are young. ___ go to a small school.", ["They", "Them", "We"], "Brothers means they."),
        m("The car is new. ___ is very fast.", ["It", "He", "They"], "One car is it."),
        m("Mr. Salem is a teacher. ___ teaches English.", ["He", "She", "It"], "Mr. Salem is a man. Use he."),
        m("Ahmed and Hamad are late. ___ are in the bus.", ["They", "He", "We"], "Ahmed and Hamad means two boys. Use they."),
        m("Sara and Mona are friends. ___ are in the same class.", ["They", "She", "We"], "Two girls means they."),
        m("___ am a student.", ["I", "Me", "My"], "I is the subject pronoun for the speaker."),
        tf("In 'He plays football', the word 'He' is a subject pronoun.", true, "He comes before the verb and does the action."),
        tf("'Them' is a subject pronoun.", false, "Them is an object pronoun. The subject pronoun is they.")
      ]),
      T("Object pronouns", "Choose the correct object pronoun.", [
        m("I know Ali. I often play with ___.", ["him", "he", "his"], "After with, use an object pronoun."),
        m("Sara is nice. I like ___.", ["her", "she", "hers"], "After the verb like, use her."),
        m("These are my books. Please give ___ to me.", ["them", "they", "their"], "Books means more than one. Use them."),
        m("Look at the bird! Can you see ___?", ["it", "he", "its"], "One bird or thing is it."),
        m("The teacher is talking. Please listen to ___.", ["him", "he", "his"], "After to, use an object pronoun."),
        m("My friends are here. Come with ___.", ["us", "we", "our"], "After with, use us."),
        m("Mother called ___ for dinner.", ["me", "I", "my"], "After the verb, use the object pronoun me."),
        m("This gift is for you and your brother. It is for ___.", ["you", "your", "yours"], "You is the same as an object pronoun."),
        tf("In 'She helps us', the word 'us' is an object pronoun.", true, "Us comes after the verb and receives the action."),
        tf("'I like she' is a correct sentence.", false, "After the verb like, use her: I like her.")
      ]),
      T("Replace the noun with a pronoun", "Type the correct pronoun.", [
        f("Ahmed is tall. ___ is a basketball player.", "He", "Ahmed is a man. The subject pronoun is he."),
        f("My sister is clever. ___ reads a lot.", "She", "My sister is a girl. The subject pronoun is she."),
        f("The soup is very hot. Do not touch ___ .", "it", "The soup is one thing. The object pronoun is it."),
        f("Salem and I play chess. ___ play every Friday.", "We", "Salem and I means we."),
        f("The boys are noisy. I can hear ___ .", "them", "Boys means more than one. The object pronoun is them."),
        f("The girls are late. ___ are in the bus.", "They", "Girls means more than one. The subject pronoun is they."),
        f("Maryam is my friend. I like ___ .", "her", "Maryam is a girl. The object pronoun is her."),
        f("Khalid is my brother. I help ___ with his homework.", "him", "Khalid is a boy. The object pronoun is him."),
        m("The teachers are kind. We thank ___.", ["them", "they", "their"], "Teachers means more than one. Use them."),
        m("My mother and I are at home. ___ are cooking.", ["We", "Us", "They"], "My mother and I means we.")
      ]),
      T("Find and fix the mistake", "Correct the sentences or choose the correct one.", [
        c("Him is my brother.", "He is my brother.", "Use the subject pronoun He before the verb."),
        c("I see she every day.", "I see her every day.", "After the verb see, use the object pronoun her."),
        c("Give the pen to I.", "Give the pen to me.", "After to, use the object pronoun me."),
        c("Us are friends.", "We are friends.", "Use the subject pronoun We before the verb."),
        c("Me and Ali play football.", "Ali and I play football.", "Use I as a subject. It is polite to say the other person first."),
        b("Put the words in the correct order.", "She gave it to me.", "Subject + verb + object + to + object pronoun."),
        m("Choose the correct sentence.", ["They like us.", "They like we.", "Them like us."], "They is the subject. Us is the object."),
        m("Choose the correct sentence.", ["He told me a story.", "Him told me a story.", "He told I a story."], "He is the subject and me is the object."),
        tf("'Them are my friends.' is a correct sentence.", false, "Use the subject pronoun They: They are my friends."),
        mt("Match each subject pronoun with its object pronoun.", [["I", "me"], ["he", "him"], ["we", "us"], ["they", "them"]], "Each subject pronoun has an object partner.")
      ]),
      T("Mixed review", "Subject and object pronouns together.", [
        m("Hamad is here. Please give ___ the keys.", ["him", "he", "his"], "After give, use an object pronoun."),
        m("___ are my best friends. I like them.", ["They", "Them", "Their"], "They comes before the verb are."),
        m("My teacher is kind. I thank ___.", ["her", "she", "hers"], "The object pronoun for a woman is her."),
        f("My parents are at work. I call ___ at noon.", "them", "Parents means more than one. Use them."),
        f("I have a cat. ___ is white.", "It", "One cat is it."),
        m("Sara and I are cousins. Our grandmother loves ___.", ["us", "we", "our"], "After the verb loves, use us."),
        c("They don't know I.", "They don't know me.", "After the verb know, use the object pronoun me."),
        tf("'You' is the same as a subject pronoun and as an object pronoun.", true, "You does not change."),
        b("Put the words in the correct order.", "We help them every day.", "Subject + verb + object + time."),
        mt("Match the sentence with the correct pronoun.", [["Ali is my friend. ___ is kind.", "He"], ["I love my mother. I help ___ .", "her"], ["The children are tired. Take ___ home.", "them"], ["Mona and I are sisters. ___ live here.", "We"]], "Think about who does the action and who receives it.")
      ])
    ]
  };
})(window.EPZ_EASY);
