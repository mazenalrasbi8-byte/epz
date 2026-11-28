/* Easy Level / Reading / Part 2: Daily Routines */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, mt = h.mt, o = h.o, T = h.T;
  E.parts["reading-2"] = {
    learn: [
      { k: "intro", kick: "Reading skills", e: "⏰", h: "Reading about daily routines", p: ["A **daily routine** text tells us what a person does every day, usually in time order: morning, afternoon and evening.", "These texts use **times** (at six o'clock) and **frequency words** (always, usually, every day). Look for them to find the answers."], ex: [["He **gets up** at six o'clock."], ["She **usually** has lunch at two."]] },
      { k: "passage", kick: "Read the text", h: "A day in the life of Said", text: "Said is a farmer. He **gets up** at **five** o'clock. He **has breakfast** with his family. Then he **goes to the farm**. He works there **until twelve**. In the afternoon he **rests**. In the evening he **waters** the date palms. He **goes to bed** at **nine**.", p: "Time words and action verbs in color tell you **what** happens and **when**." },
      { k: "steps", kick: "Skill 1", h: "Find the main idea", q: "What is the text about?", items: [["Read the title", "The title often names the topic."], ["Look at the verbs", "gets up, has breakfast, goes, works, rests, goes to bed: all are actions of one day."], ["Choose the idea that covers the text", "The main idea is: Said's day, from morning to evening."]] },
      { k: "steps", kick: "Skill 2", h: "Find specific information about time", q: "What time does Said get up?", items: [["Read the question", "**What time** asks for a time."], ["Find the keywords", "The keywords are **time**, **Said** and **get up**."], ["Find the sentence", "\"He gets up at **five** o'clock.\""], ["Choose the answer", "The answer is **five o'clock**."]] },
      { k: "steps", kick: "Skill 3", h: "Put events in order", q: "What does Said do after breakfast?", items: [["Read the text in order", "Routine texts follow time order."], ["Find the keyword breakfast", "\"He has breakfast with his family. **Then** he goes to the farm.\""], ["Look at the word that follows", "The word **Then** shows what comes next."], ["Choose the answer", "He goes to the farm."]] },
      { k: "examples", kick: "Useful words", h: "Order and frequency words", items: [["**First**, I wake up. **Then** I brush my teeth.", "first, then, next, after that"], ["I **always** study after school.", "always = every time"], ["She **never** drinks coffee.", "never = not at any time"], ["They go to the beach **on Fridays**.", "on Fridays = every Friday"]] },
      { k: "tip", h: "Reading tips", items: ["Underline **times** (6:00, five o'clock) and **frequency words** (always, usually, never).", "Follow the story in **time order**: morning → afternoon → evening.", "If two answers look similar, check the **time** or the **word before** the answer."] },
      { k: "practice", h: "Short practice", p: "Read the text and answer.", text: "Mona's brother is a **nurse**. He **wakes up** at **six**. He **has lunch** at **two**. He **always walks** to work. He **goes to bed** at **ten**.", qs: [m("What time does he wake up?", ["at six", "at two", "at ten"], "The text says: 'He wakes up at six.'"), m("How does he go to work?", ["He walks.", "He drives.", "He takes a bus."], "The text says: 'He always walks to work.'"), f("He has lunch at ___ o'clock. Type the number as a word.", "two", "The text says: 'He has lunch at two.'"), tf("He goes to bed at six.", false, "He wakes up at six. He goes to bed at ten.")] }
    ],
    tests: [
      T("A School Day", "Read the text, then answer the 10 questions.", [
        m("What time does Hamad wake up?", ["at six o'clock", "at seven o'clock", "at five o'clock"], "The text says: 'Hamad wakes up at six o'clock.'"),
        m("What does he do after he wakes up?", ["He brushes his teeth.", "He goes to school.", "He eats lunch."], "The text says: 'He wakes up at six o'clock, brushes his teeth and gets dressed.'"),
        m("What does Hamad eat for breakfast?", ["eggs and bread", "rice and fish", "fruit and soup"], "The text says: 'He has eggs and bread for breakfast.'"),
        m("How does Hamad go to school?", ["by bus", "by car", "on foot"], "The text says: 'He goes to school by bus.'"),
        f("School starts at ___ o'clock. Type the number as a word.", "seven", "The text says: 'School starts at seven o'clock.'"),
        m("What does Hamad do at 2 o'clock?", ["He has lunch at home.", "He plays football.", "He does homework."], "The text says: 'At two o'clock he comes home and has lunch.'"),
        tf("Hamad does his homework before lunch.", false, "The text says he has lunch first. Then he does his homework after lunch."),
        m("What does Hamad do after dinner?", ["He watches TV for an hour.", "He plays football.", "He goes to the shop."], "The text says: 'After dinner he watches TV for an hour.'"),
        m("In the text, 'at about ten' means ___ .", ["around ten o'clock", "exactly ten o'clock", "before ten o'clock"], "'About' means not exact. It is around that time."),
        m("What is the text mostly about?", ["Hamad's school day", "Hamad's family", "Hamad's holiday"], "The whole text tells us what Hamad does from morning to night.")
      ], { passage: "Hamad wakes up at six o'clock. He brushes his teeth and gets dressed. He has eggs and bread for breakfast with his family. He goes to school by bus. School starts at seven o'clock and finishes at one o'clock. At two o'clock he comes home and has lunch. After lunch he does his homework for one hour. Then he plays football with his friends in the park. In the evening he has dinner with his family. After dinner he watches TV for an hour. He goes to bed at about ten o'clock." }),
      T("A Fisherman's Day", "Read the text, then answer the 10 questions.", [
        m("Why does Salim get up very early?", ["He goes fishing before sunrise.", "He goes to school.", "He has an exam."], "The text says: 'He gets up at four o'clock because he goes fishing before the sun comes up.'"),
        m("What time does Salim get up?", ["at four o'clock", "at six o'clock", "at eight o'clock"], "The text says: 'Salim gets up at four o'clock.'"),
        m("Who goes to the sea with Salim?", ["his brother", "his father", "his friend"], "The text says: 'He goes to the sea in his boat with his brother.'"),
        m("What do they do at the sea?", ["They catch fish.", "They swim.", "They play."], "The text says: 'They catch fish for three hours.'"),
        f("They come back to the beach at about ___ o'clock. Type the number as a word.", "eight", "The text says: 'They come back to the beach at about eight o'clock.'"),
        m("What does Salim do with the fish at the market?", ["He sells it.", "He cooks it.", "He gives it away."], "The text says: 'Salim sells the fish at the market.'"),
        tf("Salim sleeps in the afternoon.", true, "The text says: 'In the afternoon he has lunch and sleeps for two hours.'"),
        m("What does Salim do in the evening?", ["He repairs his nets.", "He goes fishing again.", "He plays football."], "The text says: 'In the evening he repairs his nets.'"),
        m("In the text, a 'net' is something ___ .", ["used to catch fish", "used to drive a car", "used to cook rice"], "Fishermen use nets to catch fish. The text says he repairs his nets."),
        m("When does Salim go to bed?", ["early, at eight o'clock", "late, at midnight", "at noon"], "The text says: 'He goes to bed early, at eight o'clock.'")
      ], { passage: "Salim is a fisherman. He gets up at four o'clock because he goes fishing before the sun comes up. He has a cup of tea and some dates and walks to the beach. He goes to the sea in his boat with his brother. They catch fish for three hours. They come back to the beach at about eight o'clock. Salim sells the fish at the market. In the afternoon he has lunch and sleeps for two hours. In the evening he repairs his nets. He goes to bed early, at eight o'clock." }),
      T("The Weekend in Nizwa", "Read the text, then answer the 10 questions.", [
        m("Which days are the weekend for Younis?", ["Friday and Saturday", "Saturday and Sunday", "Sunday and Monday"], "The text says: 'On Friday and Saturday, Younis does not go to school.'"),
        m("What does Younis do first on Friday morning?", ["He goes to the mosque with his father.", "He plays football.", "He visits his uncle."], "The text says: 'On Friday morning he goes to the mosque with his father.'"),
        m("Who comes for lunch on Friday?", ["his grandparents", "his friends", "his teachers"], "The text says: 'His grandparents come to lunch.'"),
        f("After lunch on Friday, Younis plays ___ with his cousins.", "football", "The text says: 'After lunch he plays football with his cousins.'"),
        m("What does Younis do on Saturday morning?", ["He studies.", "He goes to the market.", "He sleeps all day."], "The text says: 'On Saturday morning he studies for his Sunday tests.'"),
        tf("Younis goes to the market on Saturday afternoon.", true, "The text says: 'On Saturday afternoon he goes to the market with his mother.'"),
        m("Why does Younis study on Saturday?", ["He has tests on Sunday.", "He has no friends.", "He likes homework."], "The text says he studies 'for his Sunday tests'."),
        m("What does the family do on Saturday evening?", ["They have dinner and watch a film.", "They go to the beach.", "They visit Muscat."], "The text says: 'In the evening the family has dinner and watches a film together.'"),
        m("In the text, 'the weekend' means ___ .", ["the days when students do not go to school", "the first day of school", "a holiday in summer"], "The text says Younis does not go to school on Friday and Saturday."),
        m("What is the best title for the text?", ["Younis's Weekend", "A Big Market", "Football Match"], "The text tells us what Younis does on Friday and Saturday.")
      ], { passage: "On Friday and Saturday, Younis does not go to school. On Friday morning he goes to the mosque with his father. Then the family has a big lunch. His grandparents come to lunch. After lunch he plays football with his cousins in the garden. On Saturday morning he studies for his Sunday tests. He studies for three hours. On Saturday afternoon he goes to the market with his mother. They buy fruit, rice and fish. In the evening the family has dinner and watches a film together." }),
      T("Nurse Mariam's Day", "Read the text, then answer the 10 questions.", [
        m("Where does Mariam work?", ["in a hospital", "in a school", "in a shop"], "The text says: 'Mariam is a nurse at a hospital in Sohar.'"),
        m("What time does her work start?", ["at seven o'clock", "at nine o'clock", "at noon"], "The text says: 'Her work starts at seven o'clock in the morning.'"),
        m("How does she go to work?", ["by car", "by bus", "on foot"], "The text says: 'She drives to the hospital.'"),
        m("What does she do first at work?", ["She checks the patients.", "She eats lunch.", "She writes a letter."], "The text says: 'First, she checks the patients and gives them medicine.'"),
        f("She has lunch at ___ o'clock. Type the number as a word.", "twelve", "The text says: 'She has lunch at twelve o'clock.'"),
        tf("Mariam finishes work at three o'clock.", true, "The text says: 'She finishes work at three o'clock.'"),
        m("What does Mariam do after work?", ["She goes home and sleeps for an hour.", "She goes shopping.", "She plays tennis."], "The text says: 'After work she goes home and sleeps for one hour.'"),
        m("What does she usually do in the evening?", ["She helps her son with his homework.", "She goes back to work.", "She watches a match."], "The text says: 'In the evening she usually helps her son with his homework.'"),
        m("In the text, 'medicine' is something ___ .", ["that helps sick people get well", "that people eat for lunch", "that students use at school"], "The text says nurses give medicine to patients."),
        m("Which word shows the order of her morning?", ["First", "Always", "Never"], "'First' tells us what she does at the start of her work.")
      ], { passage: "Mariam is a nurse at a hospital in Sohar. Her work starts at seven o'clock in the morning. She drives to the hospital. First, she checks the patients and gives them medicine. Then she helps the doctors. She has lunch at twelve o'clock. She finishes work at three o'clock. After work she goes home and sleeps for one hour. In the evening she usually helps her son with his homework. They have dinner at eight o'clock. Mariam loves her job because she helps people." }),
      T("A Farmer's Week", "Read the text, then answer the 10 questions.", [
        m("Where does Mr. Ahmed live?", ["in a village near Nizwa", "in a city in Muscat", "in Salalah"], "The text says: 'Mr. Ahmed lives in a small village near Nizwa.'"),
        m("When does he water the date palms?", ["early in the morning", "at night", "in the afternoon"], "The text says: 'Every morning he waters the date palms.'"),
        m("What does he do at 10 o'clock?", ["He has breakfast.", "He goes to the market.", "He sleeps."], "The text says: 'At ten o'clock he has breakfast with his workers.'"),
        m("How often does he take his dates to the market?", ["every Thursday", "every day", "every month"], "The text says: 'Every Thursday he takes dates to the market.'"),
        f("He sells dates and ___ at the market.", "lemons", "The text says: 'He sells dates and lemons.'"),
        tf("Mr. Ahmed works on Fridays.", false, "The text says: 'On Fridays he does not work. He rests with his family.'"),
        m("What does he do on Friday?", ["He rests with his family.", "He sells dates.", "He plants trees."], "The text says: 'On Fridays he does not work. He rests with his family.'"),
        m("What does the family eat on Friday?", ["rice and meat", "fish and bread", "dates only"], "The text says: 'They eat rice and meat together.'"),
        m("In the text, 'workers' are people ___ .", ["who work for Mr. Ahmed", "who buy dates", "who live in the city"], "He has breakfast with his workers, so they work on his farm."),
        m("Which sentence tells us how often he goes to the market?", ["Every Thursday he takes dates to the market.", "He has breakfast at ten.", "He rests on Fridays."], "'Every Thursday' is the frequency phrase.")
      ], { passage: "Mr. Ahmed is a farmer. He lives in a small village near Nizwa. Every morning he waters the date palms. At ten o'clock he has breakfast with his workers. After that he picks dates until two o'clock. Every Thursday he takes dates to the market. He sells dates and lemons there. In the evening he feeds the goats. On Fridays he does not work. He rests with his family. They eat rice and meat together and then visit his brother." })
    ]
  };
})(window.EPZ_EASY);
