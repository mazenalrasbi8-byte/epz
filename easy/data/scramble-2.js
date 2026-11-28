/* Easy Level / Story Order / Topic 2: Daily Activities (the items in each ordering question are listed in the CORRECT order) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, o = h.o, mt = h.mt, T = h.T;
  E.parts["scramble-2"] = {
    learn: [
      { k: "intro", kick: "A day in order", e: "⏰", h: "Daily activities", p: ["Our day has an **order**: we wake up, we eat, we study, we play and we sleep. We tell about our day in **time order**.", "To put daily activities in order, use **times** (at six o'clock), **parts of the day** (in the morning) and your **common sense**: you wake up before you eat breakfast."], ex: [["**At six o'clock**, I wake up."], ["**In the afternoon**, I do my homework."]] },
      { k: "timeline", kick: "A day", h: "From morning to night", items: [["In the morning", "wake up, get dressed, have breakfast, go to school"], ["At noon", "have lunch"], ["In the afternoon", "come home, do homework, play"], ["In the evening", "have dinner, watch TV"], ["At night", "brush your teeth and go to bed"]], note: "The day always follows this order." },
      { k: "table", kick: "Time words", h: "Words that tell us when", head: ["Part of the day", "Example"], rows: [["**in the morning**", "I have breakfast in the morning."], ["**at noon**", "We have lunch at noon."], ["**in the afternoon**", "He plays football in the afternoon."], ["**in the evening**", "They have dinner in the evening."], ["**at night**", "I go to bed at night."]] },
      { k: "examples", kick: "Examples", h: "Ordering with common sense", items: [["You **wake up** before you **get dressed**.", "wake up → dress"], ["You **cook** the food before you **eat** it.", "cook → eat"], ["You **come home** before you **do your homework**.", "come home → homework"], ["You **brush your teeth** before you **go to bed**.", "brush → bed"]] },
      { k: "tip", h: "Quick tips", items: ["Find the **time** words first (at six, in the morning). They tell you the order.", "If there are no time words, think: **what must happen first**?", "Read your order aloud. Does it sound like a real day?"] },
      { k: "practice", h: "Put the sentences in order", p: "Tap the sentences in the correct order.", qs: [o("Khalid's day: put the sentences in order.", ["Khalid wakes up at six.", "He goes to school at seven.", "He has lunch at two.", "He goes to bed at ten."], "Six, seven, two, ten: follow the day."), m("What comes after 'get dressed'?", ["have breakfast", "go to bed", "have dinner"], "After dressing, we have breakfast."), tf("We have dinner in the morning.", false, "We have dinner in the evening."), f("We have lunch at ___ . Type noon.", "noon", "Lunch is at noon.")] }
    ],
    tests: [
      T("A school day", "Put the school day in the correct order.", [
        o("Hamad's school day: put the sentences in order.", ["Hamad wakes up at six.", "He goes to school at seven.", "School finishes at one o'clock.", "He has lunch at home at two."], "Six, seven, one, two."),
        o("Before school: put the sentences in order.", ["The alarm clock rings.", "Hamad gets out of bed.", "He washes his face.", "He eats breakfast."], "Alarm, bed, wash, breakfast."),
        o("In the classroom: put the sentences in order.", ["The students come into the room.", "They sit at their desks.", "The teacher begins the lesson.", "The students write in their notebooks."], "Come in, sit, begin, write."),
        o("After school: put the sentences in order.", ["The bell rings at one o'clock.", "The students leave the school.", "They take the bus home.", "They arrive at home at two."], "Bell, leave, bus, arrive."),
        o("Homework time: put the sentences in order.", ["Hamad sits at his desk.", "He opens his notebook.", "He does his homework.", "He puts his books in his bag."], "Sit, open, do, pack."),
        m("What does Hamad do before he goes to school?", ["He wakes up.", "He has lunch.", "He does homework."], "He wakes up before school."),
        m("What happens after the bell rings at one o'clock?", ["The students leave.", "The lesson begins.", "Hamad wakes up."], "After the bell, students leave."),
        tf("Hamad has lunch before he goes to school.", false, "He has lunch after school."),
        f("School finishes at one o'clock. Lunch is at ___ o'clock. Type the word.", "two", "Lunch is at two o'clock."),
        m("Which part of the day is 'at one o'clock' for the end of school?", ["afternoon", "morning", "night"], "One o'clock is in the afternoon.")
      ]),
      T("The weekend", "Put the weekend activities in the correct order.", [
        o("Friday: put the sentences in order.", ["In the morning, Younis goes to the mosque.", "At noon, the family has lunch.", "In the afternoon, he plays football.", "In the evening, he watches a film."], "Morning, noon, afternoon, evening."),
        o("Saturday: put the sentences in order.", ["In the morning, he studies for his tests.", "At noon, he has lunch.", "In the afternoon, he visits his cousins.", "At night, he goes to bed early."], "Morning, noon, afternoon, night."),
        o("A visit to grandmother: put the sentences in order.", ["The family gets in the car.", "They drive to the village.", "They have lunch with grandmother.", "They drive home in the evening."], "Car, drive, lunch, home."),
        o("A family picnic: put the sentences in order.", ["Mother makes the sandwiches.", "Father puts the bags in the car.", "The family drives to the park.", "They eat on the grass."], "Make, bags, drive, eat."),
        o("The market: put the sentences in order.", ["Mother makes a shopping list.", "She goes to the market.", "She buys fruit and fish.", "She carries the bags home."], "List, market, buy, home."),
        m("When does Younis go to the mosque on Friday?", ["in the morning", "in the evening", "at night"], "He goes in the morning."),
        m("What does the family do at noon on Friday?", ["have lunch", "watch a film", "go to bed"], "At noon the family has lunch."),
        tf("Younis watches a film in the morning.", false, "He watches a film in the evening."),
        f("In the ___ he plays football. Type the part of the day (afternoon).", "afternoon", "He plays football in the afternoon."),
        mt("Match each time with its activity.", [["in the morning", "go to the mosque"], ["at noon", "have lunch"], ["in the afternoon", "play football"], ["in the evening", "watch a film"]], "Think about the order of the day.")
      ]),
      T("The evening", "Put the evening activities in the correct order.", [
        o("Dinner: put the sentences in order.", ["Mother cooks the food.", "She puts the plates on the table.", "The family sits down.", "They eat dinner together."], "Cook, plates, sit, eat."),
        o("After dinner: put the sentences in order.", ["The children clear the table.", "Father washes the dishes.", "Everyone drinks tea.", "The family watches television."], "Clear, wash, tea, TV."),
        o("Bedtime: put the sentences in order.", ["Hamad puts on his pyjamas.", "He brushes his teeth.", "He gets into bed.", "He turns off the light."], "Pyjamas, brush, bed, light."),
        o("Getting ready for tomorrow: put the sentences in order.", ["He checks his timetable.", "He packs his bag.", "He puts out his clothes.", "He sets the alarm clock."], "Timetable, bag, clothes, alarm."),
        o("A phone call: put the sentences in order.", ["The phone rings.", "Hamad picks it up.", "He says hello.", "He talks to his uncle."], "Ring, pick up, hello, talk."),
        m("What do you do before you get into bed?", ["brush your teeth", "wake up", "have breakfast"], "You brush your teeth before bed."),
        m("What happens after mother cooks the food?", ["She puts the plates on the table.", "The family eats the cold food.", "She goes to bed."], "After cooking she puts the plates on the table."),
        tf("Hamad turns off the light before he gets into bed.", false, "He gets into bed and then turns off the light."),
        f("Hamad sets the ___ clock for the morning. Type the word.", "alarm", "He sets the alarm clock."),
        m("Which activity comes last in the evening?", ["go to bed", "have dinner", "do homework"], "Going to bed is the last activity.")
      ]),
      T("A fisherman and a farmer", "Put the workers' days in the correct order.", [
        o("The fisherman's day: put the sentences in order.", ["Salim gets up at four o'clock.", "He goes to sea in his boat.", "He catches fish for three hours.", "He sells the fish at the market."], "Get up, sea, catch, sell."),
        o("The fisherman at home: put the sentences in order.", ["Salim has lunch.", "He sleeps for two hours.", "He repairs his nets.", "He goes to bed at eight."], "Lunch, sleep, nets, bed."),
        o("The farmer's morning: put the sentences in order.", ["Mr. Ahmed waters the date palms.", "He has breakfast with his workers.", "He picks the dates.", "He takes the dates to the market."], "Water, breakfast, pick, market."),
        o("The farmer's evening: put the sentences in order.", ["Mr. Ahmed feeds the goats.", "He washes his hands.", "He has dinner with his family.", "He goes to bed."], "Goats, wash, dinner, bed."),
        o("The nurse's day: put the sentences in order.", ["Mariam drives to the hospital.", "She checks the patients.", "She has lunch at twelve.", "She goes home at three."], "Drive, check, lunch, home."),
        m("What does Salim do after he catches the fish?", ["He sells it at the market.", "He goes to bed.", "He repairs his nets."], "He sells the fish at the market."),
        m("What does Mr. Ahmed do before breakfast?", ["He waters the palms.", "He feeds the goats.", "He goes to bed."], "He waters the palms first."),
        tf("The nurse has lunch before she checks the patients.", false, "She checks the patients first, then has lunch."),
        f("Salim goes to bed at ___ . Type the number as a word (eight).", "eight", "He goes to bed at eight."),
        m("Which worker gets up the earliest?", ["the fisherman", "the farmer", "the nurse"], "Salim, the fisherman, gets up at four o'clock.")
      ]),
      T("Mixed review", "Put different days in the correct order.", [
        o("A birthday: put the sentences in order.", ["In the morning, Ali gets a gift.", "In the afternoon, his friends arrive.", "In the evening, they eat the cake.", "At night, everyone says goodbye."], "Morning, afternoon, evening, night."),
        o("A holiday by the sea: put the sentences in order.", ["They wake up early.", "They have breakfast on the beach.", "They swim in the morning.", "They rest in the shade at noon."], "Wake up, breakfast, swim, rest."),
        o("A busy Thursday: put the sentences in order.", ["Younis goes to school.", "He goes to football practice.", "He does his homework.", "He goes to bed."], "School, practice, homework, bed."),
        o("A visit to the doctor: put the sentences in order.", ["Ali feels ill.", "He goes to the clinic.", "The doctor checks him.", "He takes the medicine."], "Ill, clinic, check, medicine."),
        o("An exam day: put the sentences in order.", ["The students arrive at school.", "The teacher gives out the papers.", "The students write the answers.", "They give the papers back."], "Arrive, papers, write, give back."),
        m("Which part of the day comes first?", ["morning", "evening", "night"], "The day begins in the morning."),
        m("Which part of the day comes last?", ["night", "noon", "afternoon"], "The day ends at night."),
        tf("Noon comes before the evening.", true, "Noon is in the middle of the day."),
        f("We have breakfast in the ___ . Type the part of the day.", "morning", "Breakfast is in the morning."),
        mt("Match each activity with its part of the day.", [["wake up", "morning"], ["have lunch", "noon"], ["do homework", "afternoon"], ["go to bed", "night"]], "Follow the order of the day.")
      ])
    ]
  };
})(window.EPZ_EASY);
