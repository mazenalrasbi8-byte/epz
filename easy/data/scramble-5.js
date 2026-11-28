/* Easy Level / Story Order / Topic 5: Putting Sentences in Order (the items in each ordering question are listed in the CORRECT order) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, o = h.o, mt = h.mt, T = h.T;
  E.parts["scramble-5"] = {
    learn: [
      { k: "intro", kick: "Putting it together", e: "🧩", h: "Putting sentences in order", p: ["A paragraph is a group of sentences that go **together in order**. To put them in the right order, look for **clues**.", "Clues are **order words** (first, then), **time words** (in the morning), **pronouns** (he, she, they) and **connecting words** (because, so, but)."], ex: [["**Ali** has a dog. **He** loves it."], ["It was raining, **so** we stayed home."]] },
      { k: "timeline", kick: "How to do it", h: "Five steps for ordering sentences", items: [["Step 1", "Read all the sentences."], ["Step 2", "Find the **first** sentence: it introduces the person or thing by name."], ["Step 3", "Find the **last** sentence: it often ends the story or says how someone feels."], ["Step 4", "Use clue words in the middle: then, next, because, so, after that."], ["Step 5", "Read your order again. Does it make sense?"]] },
      { k: "table", kick: "Clues", h: "Which clue helps?", head: ["Clue", "How it helps", "Example"], rows: [["**Name first**", "The first sentence names the person.", "**Hamad** wakes up. **He** brushes his teeth."], ["**Pronoun after**", "He, she, it, they come after the name.", "Mona is ten. **She** likes books."], ["**Order words**", "first, next, then, finally", "**Next**, add the sugar."], ["**Time words**", "in the morning, at noon, at night", "**At night** the moon comes out."], ["**Because / so**", "cause then effect", "It was cold, **so** I wore a coat."]] },
      { k: "examples", kick: "Examples", h: "Using the clues", items: [["**Ali** has a dog. **He** takes it to the park every day.", "the name comes before the pronoun"], ["It was hot, **so** we went to the beach.", "cause, then effect"], ["**First**, open the box. **Then** take out the book.", "order words"], ["**In the morning** I study. **At night** I sleep.", "time words"]] },
      { k: "tip", h: "Quick tips", items: ["If a sentence has **he** or **she**, look for the sentence with the **name** before it.", "Cause comes **before** effect: It rained, so we stayed home.", "Always read your final order aloud. It should sound like a real story or paragraph."] },
      { k: "practice", h: "Put the sentences in order", p: "Tap the sentences in the correct order.", qs: [o("Mona's dog: put the sentences in order.", ["Mona has a small dog.", "She takes it for a walk every morning.", "The dog loves to run in the park.", "Then they go home for breakfast."], "Name first, pronoun, details, then."), m("Which sentence should come first?", ["Salem is a farmer.", "He gets up at five.", "He waters the palms."], "The first sentence introduces Salem by name."), tf("'He' comes before the name in a good paragraph.", false, "The name comes first, then the pronoun."), f("It was cold, ___ I wore a coat. Type so or because (so).", "so", "So shows the result: I wore a coat.")] }
    ],
    tests: [
      T("Names and pronouns", "Find the first sentence by the name. Then put the rest in order.", [
        o("Khalid: put the sentences in order.", ["Khalid is a student in Grade nine.", "He lives in Sohar.", "He walks to school every day.", "He likes English."], "Name first, then pronouns."),
        o("Mariam: put the sentences in order.", ["Mariam is a nurse.", "She works at a hospital.", "She helps sick people.", "She loves her job."], "Name first, then pronouns."),
        o("The camel: put the sentences in order.", ["The camel is a desert animal.", "It has one or two humps.", "It can walk for many days without water.", "It is a very patient animal."], "Name first, then pronouns."),
        o("My brothers: put the sentences in order.", ["I have two brothers.", "They are called Ali and Salem.", "They go to the same school.", "We walk there together."], "I have, they, they, we."),
        o("The school: put the sentences in order.", ["Our school is in the centre of the town.", "It has four hundred students.", "It has a big library.", "Everyone likes it."], "Name first, then pronouns."),
        m("Which sentence should come FIRST?", ["Younis is my cousin.", "He lives in Rustaq.", "He likes animals."], "The first sentence names Younis."),
        m("Which sentence should come FIRST?", ["The sea is very blue.", "It is calm in the morning.", "It is full of fish."], "The first sentence names the sea."),
        tf("A sentence with 'He' can come before the sentence with the name.", false, "The name should come first."),
        f("Maryam is ten. ___ likes drawing. Type the pronoun.", "She", "She replaces Maryam."),
        m("In 'Ali has a bicycle. It is red.', 'It' means ___ .", ["the bicycle", "Ali", "the road"], "It means the bicycle.")
      ]),
      T("Because and so", "Use because and so to put the sentences in order.", [
        o("Staying home: put the sentences in order.", ["It was raining heavily.", "So we stayed at home.", "We watched a film.", "We had hot tea."], "Cause, so, then activities."),
        o("The beach: put the sentences in order.", ["It was very hot.", "So the children went to the beach.", "They swam in the sea.", "They came home tired."], "Hot, so, swim, home."),
        o("Late for school: put the sentences in order.", ["Hamad's alarm did not ring.", "So he woke up late.", "He missed the bus.", "He arrived after the bell."], "Alarm, late, bus, bell."),
        o("A new bicycle: put the sentences in order.", ["Younis saved money for six months.", "So he could buy a new bicycle.", "He rode it to school.", "His friends liked it."], "Save, so buy, ride, like."),
        o("Hot tea: put the sentences in order.", ["The tea was too hot.", "So Ali waited a few minutes.", "Then he drank it.", "It tasted very good."], "Hot, wait, drink, good."),
        m("Which is the CAUSE? 'It was cold, so I wore a coat.'", ["It was cold.", "I wore a coat.", "I went out."], "The cold is the cause."),
        m("Which is the EFFECT? 'He was tired, so he went to bed.'", ["He went to bed.", "He was tired.", "He read a book."], "Going to bed is the effect."),
        m("Which word shows the result?", ["so", "because", "but"], "So shows the result."),
        f("I went to bed early ___ I was tired. Type because.", "because", "Because gives the reason."),
        tf("In 'because' sentences the reason can come after the word because.", true, "I stayed home because it rained: the reason follows because.")
      ]),
      T("Time words", "Use time words to put the sentences in order.", [
        o("A day in the village: put the sentences in order.", ["In the morning, the farmer waters the palms.", "At noon, he rests in the shade.", "In the afternoon, he picks dates.", "At night, he sleeps under the stars."], "Morning, noon, afternoon, night."),
        o("A week: put the sentences in order.", ["On Sunday, school begins.", "On Wednesday, we have a test.", "On Thursday, we get our books.", "On Friday, we rest."], "Sunday, Wednesday, Thursday, Friday."),
        o("The year: put the sentences in order.", ["In January, it is cool.", "In April, it gets warmer.", "In July, it is very hot.", "In December, it is cool again."], "January, April, July, December."),
        o("A student's life: put the sentences in order.", ["At six, he wakes up.", "At seven, he goes to school.", "At two, he comes home.", "At ten, he goes to bed."], "Six, seven, two, ten."),
        o("A baby: put the sentences in order.", ["At first, a baby sleeps all day.", "After a few months, it can sit.", "After a year, it can walk.", "Later, it can talk."], "First, months, year, later."),
        m("Which time word comes first in a day?", ["morning", "afternoon", "night"], "The morning begins the day."),
        m("Which month comes after March?", ["April", "February", "January"], "April comes after March."),
        m("Which day comes before Friday?", ["Thursday", "Saturday", "Sunday"], "Thursday comes before Friday."),
        tf("'Later' means after some time.", true, "Later shows something that happens after."),
        mt("Match each time word with its meaning.", [["at first", "at the beginning"], ["later", "after some time"], ["at last", "after a long time"], ["at night", "when it is dark"]], "Time words show when things happen.")
      ]),
      T("Instructions and recipes", "Put the steps in the correct order.", [
        o("Making a cup of tea: put the steps in order.", ["Boil the water.", "Put tea in the pot.", "Pour in the hot water.", "Wait three minutes.", "Pour the tea into cups."], "Boil, tea, pour, wait, cups."),
        o("Washing a car: put the steps in order.", ["Wet the car with water.", "Wash it with soap.", "Rinse off the soap.", "Dry the car with a cloth."], "Wet, soap, rinse, dry."),
        o("Writing a letter: put the steps in order.", ["Write the date at the top.", "Write 'Dear' and the name.", "Write what you want to say.", "End with 'Best wishes' and your name."], "Date, name, message, end."),
        o("Making a paper plane: put the steps in order.", ["Take a piece of paper.", "Fold it in half.", "Fold the two corners down.", "Throw the plane."], "Paper, half, corners, throw."),
        o("Using the library: put the steps in order.", ["Choose a book.", "Show your card.", "Take the book home.", "Return it after two weeks."], "Choose, card, home, return."),
        m("What do you do after you boil the water?", ["Put tea in the pot.", "Drink the tea.", "Wash the cups."], "After boiling, you put tea in the pot."),
        m("What do you do last when you write a letter?", ["End with your name.", "Write the date.", "Write 'Dear'."], "You end with your name."),
        tf("You rinse the car before you wash it with soap.", false, "You wash with soap first, then rinse."),
        f("First wet the car. ___ wash it with soap. Type then or next.", "Then|Next", "Then or next shows the next step."),
        mt("Match each step with its number.", [["Take a piece of paper.", "1"], ["Fold it in half.", "2"], ["Fold the corners.", "3"], ["Throw the plane.", "4"]], "Follow the order of the steps.")
      ]),
      T("Mixed paragraphs", "Put the sentences of each paragraph in the correct order.", [
        o("My day out: put the sentences in order.", ["Last Friday, my family went to the beach.", "We swam in the sea.", "Then we had lunch on the sand.", "In the evening, we drove home."], "Friday, swim, lunch, home."),
        o("My best friend: put the sentences in order.", ["I have a best friend called Younis.", "He lives next to my house.", "We walk to school together.", "I am happy to have him."], "Name first, then pronouns."),
        o("The market: put the sentences in order.", ["The market opens at eight.", "Many people come to buy fruit.", "The shopkeepers shout the prices.", "It closes in the afternoon."], "Open, people, shout, close."),
        o("A rainy day: put the sentences in order.", ["It was a rainy morning.", "The road was wet.", "The children took umbrellas.", "They arrived at school dry."], "Morning, road, umbrellas, dry."),
        o("The turtle: put the sentences in order.", ["A mother turtle comes out of the sea at night.", "She digs a hole in the sand.", "She lays her eggs.", "Then she goes back to the sea."], "Come out, dig, lay, back."),
        m("Which sentence should be LAST?", ["They went home happy.", "The family went to the park.", "They played football."], "The ending shows how they feel."),
        m("Which sentence should be FIRST?", ["Hamad is a boy from Nizwa.", "He likes football.", "He plays every Friday."], "The first sentence introduces Hamad."),
        m("Which sentence comes after 'It was hot, so...'?", ["we went to the beach.", "it was hot.", "the sun is a star."], "So is followed by the result."),
        tf("The order of sentences changes the meaning of a story.", true, "Different orders can make a story confusing or change what happens."),
        f("First, wake up. ___, brush your teeth. Type then or next.", "Then|Next", "Then or next shows the next step.")
      ])
    ]
  };
})(window.EPZ_EASY);
