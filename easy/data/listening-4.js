/* Easy Level / Listening / Part 4: Places and Directions (audio is read by the phone's English voice; the text is never shown before the test ends) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, o = h.o, T = h.T;
  E.parts["listening-4"] = {
    learn: [
      { k: "intro", kick: "Listening skills", e: "🗺️", h: "Places and directions", p: ["When we ask for directions, people tell us **where a place is** and **how to get there**.", "Listen for **direction words** (turn left, go straight) and **place words** (next to, opposite, between). Follow the route step by step."], ex: [["**Turn left** at the traffic lights."], ["The bank is **opposite** the school."]] },
      { k: "table", kick: "Direction words", h: "Words you hear in directions", head: ["Words", "Meaning"], rows: [["**go straight** / **go ahead**", "do not turn"], ["**turn left** / **turn right**", "turn to the left or right side"], ["**at the corner**", "where two streets meet"], ["**at the traffic lights**", "where the lights are"], ["**the first / second turning**", "the 1st or 2nd road on the side"], ["**roundabout**", "a circle where roads meet"]] },
      { k: "table", kick: "Place words", h: "Where is it?", head: ["Words", "Meaning"], rows: [["**next to**", "at the side of"], ["**opposite**", "on the other side of the road"], ["**between**", "in the middle of two places"], ["**behind**", "at the back of"], ["**in front of**", "at the front of"], ["**near** / **far from**", "close to / not close to"]] },
      { k: "steps", kick: "Skill 1", h: "Follow the route", q: "How do you get to the bank?", items: [["Listen for the first direction", "\"Go straight.\" You do not turn yet."], ["Listen for the next direction", "\"Turn left at the traffic lights.\""], ["Listen for the place", "\"The bank is next to the post office.\""], ["Draw it in your head or on paper", "Straight, then left, then the bank. Say the route again to check."]] },
      { k: "listen", kick: "Guided listening", h: "Try it: finding the post office", p: "Press Play, then answer. You can play it again.", script: "Tourist: Excuse me. Where is the post office, please?\nMan: Go straight along this road. Take the second turning on the right. The post office is next to the bank.\nTourist: Is it far?\nMan: No, it is only five minutes on foot.", qs: [m("Which turning must the tourist take?", ["the second on the right", "the first on the left", "the third on the right"], "The man says: 'Take the second turning on the right.'"), m("Where is the post office?", ["next to the bank", "opposite the school", "behind the mosque"], "The man says: 'The post office is next to the bank.'"), m("How long does it take on foot?", ["five minutes", "fifteen minutes", "fifty minutes"], "The man says: 'it is only five minutes on foot.'")] },
      { k: "tip", h: "Listening tips", items: ["Listen for the **order** of the route: first, then, after that.", "Listen for the **last** direction and the **place word** (next to, opposite).", "If you need to, **write** L for left and R for right as you listen."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("'Turn left' means ___ .", ["go to the left side", "go to the right side", "stop"], "Left is the opposite of right."), m("The shop is in the middle of the bank and the school. It is ___ them.", ["between", "behind", "opposite"], "Between means in the middle of two places."), f("'Do not turn. Go ___ .' Type the word.", "straight", "Go straight means do not turn."), tf("'Opposite' means on the other side of the road.", true, "Opposite means across the road.")] }
    ],
    tests: [
      T("The Way to the Bank", "Listen to the conversation, then answer the 10 questions.", [
        m("What is the man looking for?", ["the bank", "the school", "the hospital"], "The man says: 'Where is the bank, please?'"),
        m("Which way should he first go?", ["straight", "left", "right"], "The woman says: 'Go straight.'"),
        m("Where should he turn left?", ["at the traffic lights", "at the mosque", "at the roundabout"], "The woman says: 'Turn left at the traffic lights.'"),
        m("What is on the corner?", ["a bakery", "a school", "a park"], "The woman says: 'There is a bakery on the corner.'"),
        m("Where is the bank?", ["next to the bakery", "opposite the park", "behind the school"], "The woman says: 'The bank is next to the bakery.'"),
        m("How long does it take on foot?", ["ten minutes", "twenty minutes", "two minutes"], "The woman says: 'It takes about ten minutes on foot.'"),
        tf("The bank is far from the traffic lights.", false, "The woman says: 'It is not far from the lights.'"),
        m("What does the man ask about the bank?", ["Is it open now?", "Is it big?", "Is it new?"], "The man asks: 'Is it open now?'"),
        m("When does the bank close?", ["at three o'clock", "at five o'clock", "at noon"], "The woman says: 'It closes at three o'clock.'"),
        m("What does the man say at the end?", ["Thank you very much.", "Sorry.", "Good night."], "He says: 'Thank you very much.'")
      ], { audio_text: "Man: Excuse me. Where is the bank, please?\nWoman: Go straight along this road. Turn left at the traffic lights. You will see a bakery on the corner. The bank is next to the bakery.\nMan: Is it far?\nWoman: No, it is not far from the lights. It takes about ten minutes on foot.\nMan: Is it open now?\nWoman: Yes, it is open now, but it closes at three o'clock.\nMan: Thank you very much." }),
      T("A Map of the Town", "Listen to the description, then answer the 10 questions.", [
        m("Where is the school?", ["in the centre of the town", "near the sea", "next to the airport"], "The speaker says: 'The school is in the centre of the town.'"),
        m("What is next to the school?", ["the library", "the hospital", "the mosque"], "The speaker says: 'Next to the school there is the library.'"),
        m("What is opposite the school?", ["the park", "the market", "the bank"], "The speaker says: 'Opposite the school there is a big park.'"),
        m("Where is the hospital?", ["behind the park", "in front of the park", "next to the mosque"], "The speaker says: 'The hospital is behind the park.'"),
        m("What is between the library and the mosque?", ["a small shop", "a bank", "a school"], "The speaker says: 'Between the library and the mosque there is a small shop.'"),
        m("Where is the market?", ["near the sea", "near the school", "in the mountains"], "The speaker says: 'The market is near the sea.'"),
        f("The bus station is next to the ___ . Type the place.", "market", "The speaker says: 'The bus station is next to the market.'"),
        tf("The mosque is far from the school.", false, "The speaker says: 'The mosque is near the school.'"),
        m("How can you go from the school to the market?", ["on foot in ten minutes", "by plane", "by boat"], "The speaker says: 'You can walk to the market in ten minutes.'"),
        m("What is the speaker doing?", ["describing a map of a town", "asking for the time", "buying a ticket"], "The speaker tells where places are in the town.")
      ], { audio_text: "Look at the map of our town. The school is in the centre of the town. Next to the school there is the library. Opposite the school there is a big park. The hospital is behind the park. The mosque is near the school. Between the library and the mosque there is a small shop. The market is near the sea. The bus station is next to the market. You can walk from the school to the market in ten minutes." }),
      T("To the Library", "Listen to the conversation, then answer the 10 questions.", [
        m("Where does the boy want to go?", ["to the library", "to the hospital", "to the airport"], "The boy says: 'How can I get to the library?'"),
        m("How will the boy travel?", ["on foot", "by bus", "by taxi"], "The boy says: 'I will go on foot.'"),
        m("Which direction must he go first?", ["straight", "right", "left"], "The man says: 'Go straight for two streets.'"),
        m("How many streets must he go straight?", ["two", "four", "twelve"], "The man says: 'Go straight for two streets.'"),
        m("Which way must he turn?", ["right", "left", "back"], "The man says: 'Then turn right.'"),
        m("What will he pass on his left?", ["a mosque", "a school", "a shop"], "The man says: 'You will pass a mosque on your left.'"),
        m("Where is the library?", ["opposite the post office", "next to the bank", "behind the hospital"], "The man says: 'The library is opposite the post office.'"),
        f("The library is a ___ building. Type the colour.", "white", "The man says: 'It is a big white building.'"),
        tf("The library is open on Fridays.", false, "The man says: 'It is closed on Fridays.'"),
        m("What does the man say to the boy at the end?", ["Good luck.", "Hurry up.", "Be quiet."], "The man ends: 'Good luck.'")
      ], { audio_text: "Boy: Excuse me. How can I get to the library?\nMan: Are you going by bus?\nBoy: No, I will go on foot.\nMan: Good. Go straight for two streets. Then turn right. You will pass a mosque on your left. The library is opposite the post office. It is a big white building. But be careful. It is closed on Fridays.\nBoy: Thank you. I will go tomorrow.\nMan: Good luck." }),
      T("At the Airport", "Listen to the announcements, then answer the 10 questions.", [
        m("Where is the passenger who asks for help?", ["at the airport", "at a school", "at a market"], "The conversation is about gates and flights at the airport."),
        m("Which gate does the Dubai flight leave from?", ["gate twelve", "gate two", "gate twenty"], "The officer says: 'It leaves from gate twelve.'"),
        m("Where is gate twelve?", ["on the second floor", "on the first floor", "on the ground floor"], "The officer says: 'on the second floor'."),
        m("How can the passenger get to the second floor?", ["by the lift", "by the stairs only", "by bus"], "The officer says: 'Take the lift.'"),
        m("Where is the lift?", ["next to the coffee shop", "behind the desk", "opposite the shop"], "The officer says: 'The lift is next to the coffee shop.'"),
        m("What time does the flight leave?", ["4:45", "4:15", "5:45"], "The officer says: 'at quarter to five'."),
        m("What time is 'quarter to five'?", ["4:45", "5:15", "4:15"], "Quarter to five is 4:45."),
        tf("The passenger must go to gate twenty.", false, "The officer says gate twelve."),
        m("What does the passenger need to show?", ["a passport and a boarding pass", "a phone", "a school bag"], "The officer says: 'Please show your passport and boarding pass at the gate.'"),
        m("What does the officer wish the passenger?", ["a good flight", "a good night", "a good job"], "The officer says: 'Have a good flight.'")
      ], { audio_text: "Passenger: Excuse me. Which gate does the Dubai flight leave from?\nOfficer: The Dubai flight leaves from gate twelve. It is on the second floor.\nPassenger: How do I get to the second floor?\nOfficer: Take the lift. The lift is next to the coffee shop. Then turn left. Gate twelve is at the end.\nPassenger: What time does the flight leave?\nOfficer: At quarter to five. Please show your passport and boarding pass at the gate.\nPassenger: Thank you.\nOfficer: Have a good flight." }),
      T("A Visitor in Nizwa", "Listen to the conversation, then answer the 10 questions.", [
        m("Which place does the visitor want to see?", ["the fort", "the beach", "the airport"], "The visitor says: 'How do I get to the fort?'"),
        m("Where are they now?", ["at the bus station", "at the fort", "at the beach"], "The man says: 'We are at the bus station.'"),
        m("Which way must the visitor go?", ["straight and then left", "right and then straight", "back to the road"], "The man says: 'Go straight and then turn left.'"),
        m("What will he see on the left?", ["the souq", "the river", "the mosque"], "The man says: 'On your left, you will see the souq.'"),
        m("Where is the fort?", ["behind the souq", "in front of the souq", "far from the souq"], "The man says: 'The fort is behind the souq.'"),
        m("How long does it take to walk to the fort?", ["fifteen minutes", "fifty minutes", "five minutes"], "The man says: 'It takes fifteen minutes.'"),
        m("What day is the goat market?", ["Friday", "Saturday", "Sunday"], "The man says: 'On Friday morning there is a goat market.'"),
        tf("The man says the visitor can go by taxi.", true, "The man says: 'You can also take a taxi.'"),
        f("A taxi costs about two ___ . Type the money word.", "rials", "The man says: 'A taxi costs about two rials.'"),
        m("What does the visitor say to the man?", ["Thank you for your help.", "Please be quiet.", "I am hungry."], "The visitor says: 'Thank you for your help.'")
      ], { audio_text: "Visitor: Excuse me. How do I get to the fort?\nMan: We are at the bus station now. Go straight and then turn left. On your left, you will see the souq. The fort is behind the souq.\nVisitor: How long does it take?\nMan: It takes fifteen minutes on foot. You can also take a taxi. A taxi costs about two rials. Today is Friday, so there is a goat market in the morning near the fort.\nVisitor: That is wonderful. Thank you for your help." })
    ]
  };
})(window.EPZ_EASY);
