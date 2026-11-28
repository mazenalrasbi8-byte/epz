/* Easy Level / Listening / Part 3: Daily Conversations (audio is read by the phone's English voice; the text is never shown before the test ends) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, o = h.o, T = h.T;
  E.parts["listening-3"] = {
    learn: [
      { k: "intro", kick: "Listening skills", e: "💬", h: "Daily conversations", p: ["Every day we talk in restaurants, shops, at home and at school. These conversations are short and use simple, common **expressions**.", "In this Part you learn to follow a conversation: who is speaking, what they want and what they decide."], ex: [["**Can I have** a glass of water, please?"], ["**Would you like** some tea? — **Yes, please.**"]] },
      { k: "steps", kick: "Skill 1", h: "Understand the situation", q: "Where are the speakers and what do they want?", items: [["Listen for the place", "Words like menu, ticket or doctor show the place."], ["Listen to the first lines", "The first lines often tell you who and where."], ["Think about the situation", "A person who asks for the menu is in a restaurant."], ["Choose the answer", "In a restaurant, they want to order food."]] },
      { k: "steps", kick: "Skill 2", h: "Use context to understand", q: "What does 'a table for two' mean?", items: [["Listen to the words around it", "\"Good evening. **A table for two**, please.\" — \"Follow me.\""], ["Think about the place", "The place is a restaurant, so a table is a place to sit."], ["Guess the meaning", "A table for two means a table where two people can sit."]] },
      { k: "examples", kick: "Common expressions", h: "Useful words and answers", items: [["**Can I have** ... , please? / **I would like** ...", "asking for something politely"], ["**Would you like** ...? — **Yes, please.** / **No, thank you.**", "offering and answering"], ["**How much is it?** — **It is** two rials.", "asking about a price"], ["**Excuse me.** / **Sorry.** / **Never mind.**", "getting attention or saying sorry"], ["**What is the matter?** — **I have a headache.**", "asking about a problem"]] },
      { k: "listen", kick: "Guided listening", h: "Try it: at a restaurant", p: "Press Play, then answer. You can play it again.", script: "Waiter: Good evening. A table for two?\nKhalid: Yes, please.\nWaiter: What would you like to drink?\nKhalid: I would like orange juice. And my brother would like water.\nWaiter: Anything to eat?\nKhalid: Yes. Two plates of rice and chicken, please.", qs: [m("Where are they?", ["in a restaurant", "in a school", "in a bank"], "The waiter says 'A table for two?' and asks what they would like to eat and drink."), m("What does Khalid want to drink?", ["orange juice", "tea", "milk"], "Khalid says: 'I would like orange juice.'"), m("What does Khalid order to eat?", ["rice and chicken", "fish and bread", "soup"], "Khalid says: 'Two plates of rice and chicken.'")] },
      { k: "tip", h: "Listening tips", items: ["Think of the **situation** (a shop, a restaurant, a doctor). It helps you guess the words.", "Listen for **question words** (What, How much, When) and the answers that follow.", "Do not stop if you miss a word. **Keep listening** for the main idea."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which sentence is a polite request?", ["Can I have some water, please?", "Give me water.", "Water now."], "'Can I have ... please?' is polite."), m("What is a polite answer to 'Would you like some tea?'", ["Yes, please.", "Yes, give me.", "Tea!"], "'Yes, please.' is polite."), f("'How ___ is it?' asks about the price. Type the word.", "much", "We say 'How much is it?' to ask the price."), tf("'Excuse me' is used to get someone's attention.", true, "We say 'Excuse me' to get attention politely.")] }
    ],
    tests: [
      T("At the Restaurant", "Listen to the conversation, then answer the 10 questions.", [
        m("How many people are at the table?", ["two", "three", "four"], "The waiter asks: 'A table for two?' and Khalid says yes."),
        m("What does Hamad want to drink?", ["water", "juice", "tea"], "Hamad says: 'I would like water.'"),
        m("What does Khalid want to drink?", ["orange juice", "milk", "coffee"], "Khalid says: 'I would like orange juice.'"),
        m("What do they order to eat?", ["fish and rice", "chicken and bread", "soup and salad"], "Khalid says: 'Two plates of fish and rice.'"),
        m("What does the waiter bring first?", ["the drinks", "the food", "the bill"], "The waiter says: 'I will bring your drinks first.'"),
        tf("They want a salad.", true, "Hamad says: 'And a salad, please.'"),
        m("How long will the food take?", ["fifteen minutes", "fifty minutes", "five minutes"], "The waiter says: 'It will take fifteen minutes.'"),
        m("How much is the bill?", ["nine rials", "nineteen rials", "ninety rials"], "The waiter says: 'That is nine rials.'"),
        f("Khalid says: 'The food was very ___ !' Type the adjective.", "good", "Khalid says: 'The food was very good!'"),
        m("What does Khalid say to the waiter at the end?", ["Thank you very much.", "Excuse me.", "I am sorry."], "He says: 'Thank you very much.'")
      ], { audio_text: "Waiter: Good evening. A table for two?\nKhalid: Yes, please.\nWaiter: Here is the menu. What would you like to drink?\nHamad: I would like water.\nKhalid: And I would like orange juice.\nWaiter: Anything to eat?\nKhalid: Two plates of fish and rice, please.\nHamad: And a salad, please.\nWaiter: Certainly. I will bring your drinks first. The food will take fifteen minutes.\nWaiter: Here is your food. Enjoy your meal.\nKhalid: Thank you. The food was very good! How much is it?\nWaiter: That is nine rials.\nKhalid: Here you are. Thank you very much." }),
      T("At the Doctor", "Listen to the conversation, then answer the 10 questions.", [
        m("What is the matter with the boy?", ["He has a headache.", "He has a broken arm.", "He has a cold."], "The boy says: 'I have a headache.'"),
        m("How long has he had it?", ["two days", "two weeks", "two hours"], "The boy says: 'since two days ago'."),
        m("Does he have a temperature?", ["Yes, a little.", "No.", "Yes, a very high one."], "The doctor says: 'You have a little temperature.'"),
        m("What does the doctor tell him to do?", ["rest at home", "go to school", "play football"], "The doctor says: 'You need to rest at home.'"),
        m("How many times a day must he take the medicine?", ["three", "two", "five"], "The doctor says: 'Take it three times a day.'"),
        tf("He must take the medicine before he eats.", false, "The doctor says: 'Take it after meals.'"),
        m("What should he drink a lot of?", ["water", "juice", "milk"], "The doctor says: 'Drink a lot of water.'"),
        m("When should he come back?", ["in three days", "tomorrow", "next month"], "The doctor says: 'Come back in three days.'"),
        f("The boy's name is ___ . Type the name.", "Ali", "The doctor says: 'Hello Ali.'"),
        m("What does the boy say at the end?", ["Thank you, doctor.", "Goodbye, teacher.", "See you at school."], "The boy says: 'Thank you, doctor.'")
      ], { audio_text: "Doctor: Hello Ali. What is the matter?\nAli: Good morning, doctor. I have a headache. I have had it since two days ago.\nDoctor: Let me see. You have a little temperature. Do you have a cough?\nAli: No, doctor. Just a headache and I feel tired.\nDoctor: You need to rest at home. Here is some medicine. Take it three times a day, after meals. Drink a lot of water. Come back in three days.\nAli: Thank you, doctor." }),
      T("Planning the Weekend", "Listen to the conversation, then answer the 10 questions.", [
        m("Who are the speakers?", ["two friends", "a teacher and a student", "a doctor and a patient"], "They talk about plans in a friendly way: two friends."),
        m("What day do they want to meet?", ["Friday", "Saturday", "Thursday"], "Salem says: 'Let us meet on Friday.'"),
        m("What do they decide to do?", ["go to the beach", "stay at home", "go to school"], "They decide: 'Let us go to the beach.'"),
        m("What time will they meet?", ["at eight", "at nine", "at ten"], "Salem says: 'Let us meet at eight o'clock.'"),
        m("Where will they meet?", ["at the bus stop", "at the school", "at the park"], "Salem says: 'Let us meet at the bus stop.'"),
        m("What will Yousef bring?", ["a ball", "a cake", "a camera"], "Yousef says: 'I will bring a ball.'"),
        tf("Salem will bring sandwiches.", true, "Salem says: 'I will bring some sandwiches.'"),
        m("What will they drink?", ["juice", "tea", "milk"], "Salem says: 'And some juice.'"),
        m("Why does Yousef say 'Great idea'?", ["He likes the plan.", "He is angry.", "He is tired."], "'Great idea' shows he agrees."),
        m("How will they get to the beach?", ["by bus", "by car", "on foot"], "Salem says: 'We can go by bus.'")
      ], { audio_text: "Salem: Hello Yousef. What are you doing at the weekend?\nYousef: Hi Salem. I do not have any plans yet.\nSalem: Let us go to the beach on Friday.\nYousef: Great idea! What time shall we meet?\nSalem: Let us meet at eight o'clock at the bus stop. We can go by bus.\nYousef: Good. I will bring a ball.\nSalem: And I will bring some sandwiches and some juice.\nYousef: Perfect. See you on Friday." }),
      T("At Home in the Evening", "Listen to the conversation, then answer the 10 questions.", [
        m("Who are the speakers?", ["a mother and her son", "two teachers", "two friends"], "The boy says 'Mother' and the woman talks to her son."),
        m("What time does Hamad come home?", ["at five", "at three", "at seven"], "Mother says: 'You are late. It is five o'clock.'"),
        m("Why is Hamad late?", ["He played football.", "He missed the bus.", "He was ill."], "Hamad says: 'I played football with my friends.'"),
        m("What does Mother ask him to do first?", ["wash his hands", "do his homework", "clean his room"], "Mother says: 'First, wash your hands.'"),
        m("What is for dinner?", ["rice and chicken", "fish and soup", "bread and eggs"], "Mother says: 'We have rice and chicken.'"),
        tf("Hamad has a lot of homework.", false, "Hamad says: 'I have only a little homework.'"),
        m("What does Hamad say he must do after dinner?", ["his English homework", "his Maths homework", "his Science homework"], "Hamad says: 'I must do my English homework.'"),
        f("Mother says: 'Dinner will be ready in ___ minutes.' Type the number as a word.", "ten", "Mother says: 'Dinner will be ready in ten minutes.'"),
        m("What does Hamad do while he waits?", ["He helps with the table.", "He watches TV.", "He sleeps."], "Hamad says: 'I will help you with the table.'"),
        m("How does Mother feel at the end?", ["pleased", "angry", "sad"], "Mother says: 'Thank you, Hamad. You are a good boy.'")
      ], { audio_text: "Mother: Hamad, you are late. It is five o'clock. Where were you?\nHamad: Sorry, Mother. I played football with my friends.\nMother: Please wash your hands first. We have rice and chicken for dinner.\nHamad: It smells very good. Do I have time to do my homework?\nMother: Dinner will be ready in ten minutes.\nHamad: I have only a little homework. I must do my English homework after dinner. Now I will help you with the table.\nMother: Thank you, Hamad. You are a good boy." }),
      T("Asking for Help", "Listen to the conversation, then answer the 10 questions.", [
        m("What is the problem?", ["The boy lost his bag.", "The boy is hungry.", "The boy is late."], "The boy says: 'I cannot find my bag.'"),
        m("Where does he think he left it?", ["on the bus", "at home", "in the shop"], "He says: 'I think I left it on the bus.'"),
        m("What colour is the bag?", ["black", "blue", "red"], "The boy says: 'It is black.'"),
        m("What is in the bag?", ["his books and a phone", "food", "a football"], "The boy says: 'My books and my phone are in it.'"),
        m("What time was the bus?", ["at eight o'clock", "at nine o'clock", "at seven o'clock"], "He says: 'The bus was at eight o'clock.'"),
        m("What does the woman at the desk ask him?", ["What is your name?", "Where do you live?", "How old are you?"], "The woman says: 'What is your name, please?'"),
        f("His name is ___ . Type the name.", "Rashid", "The boy says: 'My name is Rashid.'"),
        tf("The woman says she can find the bag at once.", false, "The woman says: 'Please wait. I will call the bus company.'"),
        m("What does the woman do?", ["She calls the bus company.", "She gives him money.", "She sends him home."], "The woman says: 'I will call the bus company.'"),
        m("How does the boy feel at the end?", ["relieved", "angry", "bored"], "The woman says the bus company has the bag, and Rashid is very happy.")
      ], { audio_text: "Rashid: Excuse me. Can you help me, please? I cannot find my bag.\nWoman: Of course. Where did you see it last?\nRashid: I think I left it on the bus. The bus was at eight o'clock.\nWoman: What colour is the bag?\nRashid: It is black. My books and my phone are in it.\nWoman: What is your name, please?\nRashid: My name is Rashid.\nWoman: Please wait, Rashid. I will call the bus company.\nWoman: Good news. The bus company has your bag. You can collect it this afternoon.\nRashid: Thank you so much. I am very happy." })
    ]
  };
})(window.EPZ_EASY);
