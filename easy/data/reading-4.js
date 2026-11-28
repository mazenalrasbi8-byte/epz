/* Easy Level / Reading / Part 4: Places and People */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, T = h.T;
  E.parts["reading-4"] = {
    learn: [
      { k: "intro", kick: "Reading skills", e: "🏙️", h: "Reading about places and people", p: ["Texts about **places** tell us where a place is, what we can see there and what people do.", "They often use **there is / there are**, **place words** (near, next to, in front of) and **people words** (visitors, guides, doctors). Find these words to answer questions."], ex: [["**There is** a big market **in** Muscat."], ["**Visitors** can see turtles **at night**."]] },
      { k: "passage", kick: "Read the text", h: "The school library", text: "The **library** is **next to** the school gate. It is **open** from **eight** to **two**. **There are** about **three thousand** books. Mrs. Aisha is the **librarian**. She helps students **find books**. Students can **borrow** two books for **two weeks**.", p: "Place words, numbers and people in color give the facts." },
      { k: "steps", kick: "Skill 1", h: "Find the main idea", q: "What is the text about?", items: [["Read the first sentence", "\"The library is next to the school gate.\" The topic is the library."], ["Check the other sentences", "They give times, books, a person and rules for the same place."], ["Choose the main idea", "The main idea is: facts about the school library."]] },
      { k: "steps", kick: "Skill 2", h: "Find a place or a person", q: "Where is the library?", items: [["Read the question", "**Where** asks for a place."], ["Find the keywords", "The keywords are **where** and **library**."], ["Find the sentence", "\"The library is **next to** the school gate.\""], ["Choose the answer", "Next to the school gate."]] },
      { k: "steps", kick: "Skill 3", h: "Find numbers and people", q: "How many books can a student borrow?", items: [["Read the question", "**How many** asks for a number."], ["Find the keywords", "**borrow** and **books**."], ["Find the sentence", "\"Students can borrow **two** books for two weeks.\""], ["Choose the answer", "Two books. Be careful: the text also has 'three thousand books', which is a different number."]] },
      { k: "table", kick: "Useful words", h: "Words for places and people", head: ["Type", "Words you may see"], rows: [["**place words**", "in, on, next to, near, behind, in front of, between"], ["**there is / there are**", "There **is** a mosque. There **are** two schools."], ["**people words**", "visitor, guide, doctor, shopkeeper, librarian"], ["**size and time words**", "big, small, old, open, close, from ... to ..."]] },
      { k: "tip", h: "Reading tips", items: ["Look for **there is / there are**. They introduce what you can find in a place.", "Circle **numbers and times** (3,000 books, 8 to 2). They are common answers.", "Match the **question word** (Where, Who, How many) with the right type of answer."] },
      { k: "practice", h: "Short practice", p: "Read the text and answer.", text: "The **market** is in the **centre** of the town. **There are** more than **fifty** shops. **Mr. Said** sells **fish**. **Visitors** come on **Fridays**.", qs: [m("Where is the market?", ["in the centre of the town", "next to the sea", "near the school"], "The text says: 'The market is in the centre of the town.'"), m("What does Mr. Said sell?", ["fish", "dates", "books"], "The text says: 'Mr. Said sells fish.'"), f("There are more than ___ shops. Type the number as a word.", "fifty", "The text says: 'There are more than fifty shops.'"), tf("Visitors come on Mondays.", false, "The text says visitors come on Fridays.")] }
    ],
    tests: [
      T("Muttrah Souq", "Read the text, then answer the 10 questions.", [
        m("Where is Muttrah Souq?", ["in Muscat", "in Salalah", "in Nizwa"], "The text says: 'Muttrah Souq is in Muscat, near the sea.'"),
        m("What is the souq like?", ["old and famous", "new and quiet", "small and empty"], "The text says: 'It is one of the oldest and most famous markets in Oman.'"),
        m("What is the roof made of?", ["wood", "glass", "metal"], "The text says: 'Many small shops are under a wooden roof.'"),
        m("What can visitors buy?", ["frankincense, silver and cloth", "cars and phones", "computers"], "The text says: 'You can buy frankincense, silver, spices and cloth.'"),
        f("Shopkeepers are very ___ to visitors. Type the adjective.", "friendly", "The text says: 'The shopkeepers are very friendly to visitors.'"),
        tf("The souq is quiet.", false, "The text says: 'There are many people, so the souq is busy and noisy.'"),
        m("When is the souq open in the evening?", ["until ten o'clock", "until noon", "until four o'clock"], "The text says: 'It is open until ten o'clock in the evening.'"),
        m("Why do many visitors go there?", ["to buy gifts and enjoy the old atmosphere", "to study", "to visit hospitals"], "The text says visitors buy gifts and enjoy the old atmosphere."),
        m("In the text, 'busy' means the souq is ___ .", ["full of people", "empty", "closed"], "The text says there are many people, so it is busy."),
        m("What is the text mostly about?", ["a famous old market", "a new school", "a football match"], "The whole text describes Muttrah Souq.")
      ], { passage: "Muttrah Souq is in Muscat, near the sea. It is one of the oldest and most famous markets in Oman. Many small shops are under a wooden roof. You can buy frankincense, silver, spices and cloth there. The shopkeepers are very friendly to visitors. There are many people, so the souq is busy and noisy. It is open from nine o'clock in the morning, closes in the afternoon for a rest and opens again until ten o'clock in the evening. Many visitors go there to buy gifts and enjoy the old atmosphere." }),
      T("At the Hospital", "Read the text, then answer the 10 questions.", [
        m("Where is the hospital?", ["next to the park", "near the airport", "behind the school"], "The text says: 'The hospital is next to the big park.'"),
        m("How many floors does it have?", ["five", "three", "ten"], "The text says: 'It has five floors.'"),
        m("Who looks after the patients?", ["doctors and nurses", "teachers", "drivers"], "The text says: 'Doctors and nurses look after the patients.'"),
        m("Where do people go when there is an emergency?", ["to the emergency room", "to the pharmacy", "to the library"], "The text says: 'In an emergency, people go to the emergency room on the ground floor.'"),
        f("The pharmacy is on the ___ floor. Type the word.", "first", "The text says: 'The pharmacy is on the first floor.'"),
        tf("The hospital is closed at night.", false, "The text says: 'The hospital is open twenty-four hours.'"),
        m("What can people buy at the pharmacy?", ["medicine", "food", "books"], "A pharmacy sells medicine. The text says: 'People get their medicine at the pharmacy.'"),
        m("What can visitors do in the cafe?", ["drink tea and eat sandwiches", "see a doctor", "buy medicine"], "The text says: 'Visitors can have tea and sandwiches in the cafe.'"),
        m("In the text, an 'emergency' is a time when someone needs help ___ .", ["very quickly", "next week", "slowly"], "An emergency is urgent, so help is needed quickly."),
        m("What is the best title?", ["The City Hospital", "A School Trip", "The Fish Market"], "The text describes the hospital and the people who work there.")
      ], { passage: "The city hospital is next to the big park. It has five floors. Doctors and nurses look after the patients there. In an emergency, people go to the emergency room on the ground floor. The pharmacy is on the first floor. People get their medicine at the pharmacy. There is a small cafe on the second floor. Visitors can have tea and sandwiches in the cafe. The hospital is open twenty-four hours every day. Many people say the staff are kind and helpful." }),
      T("Nizwa Fort", "Read the text, then answer the 10 questions.", [
        m("Where is Nizwa Fort?", ["in the town of Nizwa", "in Salalah", "on a beach"], "The text says: 'Nizwa Fort is in the old town of Nizwa.'"),
        m("What is the fort like?", ["very old and strong", "new and small", "modern and glass"], "The text says: 'It is very old and strong.'"),
        m("What can visitors see at the top of the tower?", ["the whole town and the mountains", "the sea", "an airport"], "The text says: 'From the top of the round tower, visitors can see the whole town and the mountains.'"),
        m("When is the famous market near the fort?", ["on Friday mornings", "on Sunday evenings", "every night"], "The text says: 'there is a famous market on Friday mornings.'"),
        f("At the market people sell goats, fruit and ___ . Type the word.", "dates", "The text says: 'people sell goats, fruit and dates.'"),
        tf("The fort is open on Fridays.", true, "The text says the fort and the market are busy on Friday."),
        m("Who helps visitors at the fort?", ["guides", "pilots", "farmers"], "The text says: 'Friendly guides tell visitors about the history of the fort.'"),
        m("What can visitors learn from the guides?", ["the history of the fort", "how to drive", "how to cook"], "The text says guides tell visitors about the history of the fort."),
        m("In the text, 'history' means ___ .", ["the story of the past", "the weather", "the food"], "The guides tell about the past, so history is the story of the past."),
        m("Which is the best title?", ["A Visit to Nizwa Fort", "A Day at the Beach", "My New School"], "The text describes the fort and what visitors can do there.")
      ], { passage: "Nizwa Fort is in the old town of Nizwa. It is very old and strong. There is a big round tower in the middle of the fort. From the top of the round tower, visitors can see the whole town and the mountains. Friendly guides tell visitors about the history of the fort. Near the fort, there is a famous market on Friday mornings. At the market people sell goats, fruit and dates. The fort and the market are very busy on Fridays, so many visitors arrive early. After the visit, many people have coffee and halwa in a small cafe." }),
      T("Ras Al Jinz", "Read the text, then answer the 10 questions.", [
        m("Where is Ras Al Jinz?", ["in the east of Oman, by the sea", "in the middle of Muscat", "in the mountains"], "The text says: 'Ras Al Jinz is a quiet beach in the east of Oman.'"),
        m("Which animals come to the beach?", ["green turtles", "camels", "lions"], "The text says: 'Green turtles come to the beach.'"),
        m("When do the turtles lay their eggs?", ["at night", "in the morning", "at noon"], "The text says: 'They come out of the sea at night to lay their eggs.'"),
        m("Who takes the visitors to the beach?", ["a guide", "a pilot", "a doctor"], "The text says: 'A guide takes small groups to the beach.'"),
        f("Visitors must not use ___ because it frightens the turtles. Type the word.", "flash", "The text says: 'Visitors must not use a camera flash.'"),
        tf("Visitors can touch the turtles.", false, "The text says: 'Visitors must keep away from the turtles.'"),
        m("Why must visitors be quiet?", ["Noise can frighten the turtles.", "The beach is closed.", "It is a library."], "The text says: 'Visitors must be quiet and keep away from the turtles.'"),
        m("What happens to the baby turtles?", ["They go into the sea.", "They fly.", "They go to the desert."], "The text says: 'After about two months, baby turtles come out of the eggs and walk to the sea.'"),
        m("In the text, 'lay eggs' means the turtles ___ .", ["put their eggs in the sand", "eat eggs", "buy eggs"], "The turtles put their eggs in holes in the sand."),
        m("What is the text mostly about?", ["visiting the turtle beach", "a school trip", "a desert safari"], "The text tells us about turtles and visiting Ras Al Jinz.")
      ], { passage: "Ras Al Jinz is a quiet beach in the east of Oman. Green turtles come to the beach. They come out of the sea at night to lay their eggs in the sand. Many visitors come to see this special sight. A guide takes small groups to the beach. Visitors must be quiet and keep away from the turtles. They must not use a camera flash because it frightens the turtles. After about two months, baby turtles come out of the eggs and walk to the sea. Ras Al Jinz is a very important place for these animals." }),
      T("Our Neighbourhood", "Read the text, then answer the 10 questions.", [
        m("What is the name of the neighbourhood?", ["Al Noor", "Al Bahr", "Al Salam"], "The text says: 'Hamad lives in a friendly neighbourhood called Al Noor.'"),
        m("Who sells fruit and vegetables?", ["Mr. Said", "Dr. Ali", "Mrs. Fatma"], "The text says: 'Mr. Said has a small shop. He sells fruit and vegetables.'"),
        m("Where does Dr. Ali work?", ["in the small clinic", "in the school", "in the shop"], "The text says: 'Dr. Ali works in the small clinic next to the mosque.'"),
        m("What does Mrs. Fatma do?", ["She teaches at the primary school.", "She sells bread.", "She cleans the park."], "The text says: 'Mrs. Fatma teaches at the primary school.'"),
        f("The school is ___ the park. Type the word.", "behind", "The text says: 'The school is behind the park.'"),
        tf("Dr. Ali works in a clinic next to the mosque.", true, "The text says: 'Dr. Ali works in the small clinic next to the mosque.'"),
        m("What do the children do in the park?", ["play football", "buy bread", "see a doctor"], "The text says: 'In the afternoon, children play football in the park.'"),
        m("What do the neighbours do on Friday evening?", ["They meet at the mosque and talk.", "They go to the beach.", "They work in the shop."], "The text says: 'On Friday evening, the neighbours meet after prayer and talk.'"),
        mt("Match each person with the place.", [["Mr. Said", "the shop"], ["Dr. Ali", "the clinic"], ["Mrs. Fatma", "the school"], ["The children", "the park"]], "Each person or group is linked to a place in the text."),
        m("What is the text mostly about?", ["the people and places in a neighbourhood", "a visit to Muscat", "a football match"], "The text describes people and places in Hamad's neighbourhood.")
      ], { passage: "Hamad lives in a friendly neighbourhood called Al Noor. Mr. Said has a small shop. He sells fruit and vegetables. Dr. Ali works in the small clinic next to the mosque. He helps people when they are sick. Mrs. Fatma teaches at the primary school. The school is behind the park. In the afternoon, children play football in the park. On Friday evening, the neighbours meet after prayer and talk. Everybody knows everybody, so it is a safe and happy place to live." })
    ]
  };
})(window.EPZ_EASY);
