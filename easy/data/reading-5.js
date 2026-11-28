/* Easy Level / Reading / Part 5: Short Stories */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, o = h.o, T = h.T;
  E.parts["reading-5"] = {
    learn: [
      { k: "intro", kick: "Reading skills", e: "📖", h: "Reading short stories", p: ["A **story** has **characters** (the people or animals), a **setting** (where and when) and **events** (what happens).", "Most stories have a **beginning**, a **middle** and an **ending**. Often there is a **problem** and a **solution**. Look for these parts to understand the story."], ex: [["**Characters:** Hamad and his dog."], ["**Problem:** The dog is lost. **Solution:** Hamad finds him."]] },
      { k: "passage", kick: "Read the story", h: "The lost ball", text: "**Ali** was playing football in the **park**. He kicked the ball too hard and it went into a **tree**. Ali was **sad** because it was his **new** ball. **Then** an old man saw him. The old man **got a long stick** and pushed the ball out of the tree. Ali **said thank you** and was **happy** again.", p: "Characters, setting, feelings and events are in color." },
      { k: "steps", kick: "Skill 1", h: "Find the main idea", q: "What is the story about?", items: [["Find the characters and the problem", "Ali loses his ball in a tree. That is the problem."], ["Find the solution", "An old man gets the ball with a stick."], ["Say the main idea in one sentence", "A kind old man helps Ali get his ball."]] },
      { k: "steps", kick: "Skill 2", h: "Put the events in order", q: "What happened after the ball went into the tree?", items: [["Find the sentence about the ball in the tree", "\"He kicked the ball too hard and it went into a tree.\""], ["Look at the word that follows", "\"Ali was sad... **Then** an old man saw him.\""], ["Use order words", "First, then, next, after that, finally"], ["Choose the answer", "An old man saw Ali."]] },
      { k: "steps", kick: "Skill 3", h: "Answer a why question", q: "Why was Ali sad?", items: [["Find the word sad", "\"Ali was **sad** because it was his new ball.\""], ["Look for the word because", "**Because** gives the reason."], ["Choose the answer", "He lost his new ball."]] },
      { k: "table", kick: "Story parts", h: "What is in a story?", head: ["Part", "It tells us", "In the story"], rows: [["**Characters**", "who is in the story", "Ali, the old man"], ["**Setting**", "where and when", "in the park"], ["**Beginning**", "the start and the problem", "Ali loses his ball"], ["**Middle**", "what happens next", "the old man helps"], ["**Ending**", "the end and the solution", "Ali is happy"]] },
      { k: "tip", h: "Reading tips", items: ["Ask: **Who? Where? What happened? Why?** Then read again to find the answers.", "**Because** and **so** give reasons: Ali was sad **because** he lost his ball.", "Order words (**first, then, next, finally**) show the order of events."] },
      { k: "practice", h: "Short practice", p: "Read the story and answer.", text: "**Sara** was **late** for school. **First** she ran to the bus stop. The bus had **gone**. **Then** her neighbour gave her a **lift**. **Finally** she arrived **on time**.", qs: [m("Why did Sara run to the bus stop?", ["She was late.", "She was happy.", "She was hungry."], "The text says: 'Sara was late for school.'"), m("What did the neighbour do?", ["He gave her a lift.", "He sold her a ticket.", "He called her teacher."], "The text says: 'her neighbour gave her a lift.'"), f("Sara arrived ___ time. Type the word.", "on", "The text says: 'she arrived on time.'"), tf("The bus was still at the stop.", false, "The text says: 'The bus had gone.'")] }
    ],
    tests: [
      T("The Lost Wallet", "Read the story, then answer the 10 questions.", [
        m("Where did Hamad find the wallet?", ["near the bus stop", "in his school", "in his house"], "The story says: 'Hamad found a brown wallet near the bus stop.'"),
        m("What was in the wallet?", ["money and an ID card", "a phone", "a key"], "The story says: 'It had some money and an ID card inside.'"),
        m("What did Hamad do first?", ["He looked at the ID card.", "He took the money.", "He went home."], "The story says: 'First, he looked at the ID card.'"),
        m("Who was the owner of the wallet?", ["Mr. Salem", "Mr. Ahmed", "Mr. Khalid"], "The story says: 'The name on the card was Mr. Salem Al Hinai.'"),
        f("Hamad took the wallet to the ___ station. Type the word.", "police", "The story says: 'Then he took the wallet to the police station.'"),
        tf("Mr. Salem was angry with Hamad.", false, "The story says: 'Mr. Salem was very happy and thanked Hamad.'"),
        m("Why did Hamad say no to the reward?", ["He wanted to be honest, not to be paid.", "He did not need money.", "He did not like Mr. Salem."], "The story says: 'Hamad said, \"I do not want a reward. I only did the right thing.\"'"),
        o("Put the events in the correct order.", ["Hamad found a wallet.", "Hamad took it to the police.", "Mr. Salem got his wallet back."], "First Hamad found the wallet, then he took it to the police, and finally Mr. Salem got it back."),
        m("In the story, 'a reward' is ___ .", ["something you get for doing something good", "a kind of wallet", "a police station"], "Mr. Salem wanted to give Hamad something to say thank you. That is a reward."),
        m("What is the lesson of the story?", ["Be honest.", "Do not walk to school.", "Always carry money."], "Hamad was honest and gave the wallet back.")
      ], { passage: "Hamad found a brown wallet near the bus stop. It had some money and an ID card inside. First, he looked at the ID card. The name on the card was Mr. Salem Al Hinai. Hamad did not take the money. Then he took the wallet to the police station. The police called Mr. Salem. Mr. Salem came to the station and he was very happy. He thanked Hamad and wanted to give him a reward. Hamad said, \"I do not want a reward. I only did the right thing.\"" }),
      T("The Late Bus", "Read the story, then answer the 10 questions.", [
        m("Why was Khalid worried?", ["He had an important exam.", "He had no friends.", "He lost his book."], "The story says: 'Today he had an important English exam.'"),
        m("Why was Khalid late?", ["His alarm clock did not ring.", "He was ill.", "He had no money."], "The story says: 'His alarm clock did not ring.'"),
        m("What time did he wake up?", ["at seven o'clock", "at six o'clock", "at nine o'clock"], "The story says: 'He woke up at seven o'clock.'"),
        m("What did Khalid do when he saw the bus leave?", ["He ran after it.", "He went home.", "He sat down."], "The story says: 'The bus was leaving, so he ran after it.'"),
        f("The bus did not ___ . Type the verb.", "stop", "The story says: 'but the driver did not stop.'"),
        m("Who helped Khalid?", ["his neighbour", "his teacher", "his brother"], "The story says: 'His neighbour, Mr. Said, saw him and gave him a lift.'"),
        tf("Khalid arrived late for the exam.", false, "The story says: 'He arrived just in time.'"),
        o("Put the events in the correct order.", ["Khalid woke up late.", "The bus left without him.", "Mr. Said gave him a lift."], "He woke up late, then missed the bus, and finally got a lift from Mr. Said."),
        m("In the story, 'a lift' means ___ .", ["a ride in someone's car", "a kind of exam", "a type of bus"], "Mr. Said took Khalid in his car, so a lift is a ride."),
        m("What is the lesson of the story?", ["Set your alarm clock carefully.", "Never take exams.", "Always walk to school."], "Khalid was late because his alarm did not ring.")
      ], { passage: "Khalid was worried. Today he had an important English exam. He woke up at seven o'clock because his alarm clock did not ring. He got dressed quickly and ran to the bus stop. The bus was leaving, so he ran after it, but the driver did not stop. Khalid was very sad. Then his neighbour, Mr. Said, saw him and gave him a lift in his car. Khalid arrived at school just in time. He took his exam and he did very well." }),
      T("A Surprise for Mother", "Read the story, then answer the 10 questions.", [
        m("Whose birthday was it?", ["the children's mother", "their father", "their teacher"], "The story says: 'It was their mother's birthday.'"),
        m("How many children were in the family?", ["three", "two", "five"], "The story says: 'Hamad, Mona and little Sara.'"),
        m("What did the children make?", ["a birthday cake", "a boat", "a phone"], "The story says: 'they made a big birthday cake.'"),
        m("Where did the children hide?", ["behind the sofa", "in the kitchen", "outside"], "The story says: 'The children hid behind the sofa.'"),
        f("The children said, \"Happy ___ !\" Type the word.", "birthday", "The story says: 'they shouted, \"Happy birthday, Mother!\"'"),
        tf("Their mother was angry.", false, "The story says: 'Their mother was very surprised and happy.'"),
        m("What did Mother do after the surprise?", ["She hugged the children.", "She went to work.", "She cried and left."], "The story says: 'She hugged them all.'"),
        o("Put the events in the correct order.", ["The children made a cake.", "Mother came home.", "The children shouted Happy birthday."], "First they made the cake, then Mother came home, and finally they shouted."),
        m("In the story, 'surprised' means Mother ___ .", ["did not know about the cake before", "was very tired", "was sick"], "She was not expecting a cake, so she was surprised."),
        m("What is the best title?", ["A Birthday Surprise", "A Football Match", "The Lost Bag"], "The story is about a surprise birthday cake.")
      ], { passage: "It was their mother's birthday. Hamad, Mona and little Sara wanted to give her a surprise. In the morning, while Mother was at work, they made a big birthday cake. Then they put candles on the cake. At five o'clock, they heard the car. The children hid behind the sofa. Mother opened the door and walked into the room. Then they jumped out and shouted, \"Happy birthday, Mother!\" Their mother was very surprised and happy. She hugged them all and they ate the cake together." }),
      T("The Lost Cat", "Read the story, then answer the 10 questions.", [
        m("What was the cat's name?", ["Misha", "Nemo", "Lulu"], "The story says: 'Younis has a small white cat called Misha.'"),
        m("When did Younis see that Misha was not at home?", ["in the evening", "in the morning", "at noon"], "The story says: 'One evening Younis could not find Misha.'"),
        m("Where did Younis look first?", ["in the garden", "in the school", "in the market"], "The story says: 'First he looked in the garden.'"),
        m("Who helped Younis look for the cat?", ["his neighbours", "his teacher", "a doctor"], "The story says: 'His neighbours helped him.'"),
        f("At last they found Misha ___ a car. Type the word.", "under", "The story says: 'They found Misha under a car.'"),
        tf("Misha was hurt.", false, "The story says: 'She was not hurt, only afraid.'"),
        m("How did Younis feel at the end?", ["happy", "angry", "bored"], "The story says: 'Younis was very happy.'"),
        o("Put the events in the correct order.", ["Younis could not find Misha.", "The neighbours helped him look.", "They found Misha under a car."], "He could not find the cat, then the neighbours helped, and finally they found Misha."),
        m("In the story, 'afraid' means ___ .", ["frightened", "hungry", "sleepy"], "Misha was under a car because she was frightened."),
        m("What is the story mostly about?", ["finding a lost cat", "a cat race", "a trip to the sea"], "Younis looks for Misha and finds her.")
      ], { passage: "Younis has a small white cat called Misha. One evening Younis could not find Misha. He was worried. First he looked in the garden, but she was not there. Then he looked in the house and under his bed. He could not find her. His neighbours helped him to look. They called, \"Misha! Misha!\" At last they heard a small sound. They found Misha under a car. She was not hurt, only afraid. Younis carried her home and gave her some milk. Younis was very happy." }),
      T("The Football Match", "Read the story, then answer the 10 questions.", [
        m("Which teams played the match?", ["Class 9/1 and Class 9/2", "Class 10 and Class 11", "two schools"], "The story says: 'Class 9/1 played Class 9/2.'"),
        m("What was the score at half time?", ["0-1", "1-0", "2-0"], "The story says: 'At half time, Class 9/2 had one goal and Class 9/1 had none.'"),
        m("Who was the captain of Class 9/1?", ["Ali", "Hamad", "Salem"], "The story says: 'Their captain, Ali, said, \"We can still win.\"'"),
        m("What did the captain say to the team?", ["\"We can still win.\"", "\"Let's go home.\"", "\"It is too late.\""], "The story says: 'Their captain, Ali, said, \"We can still win.\"'"),
        f("In the last five minutes, Salem scored a ___ . Type the word.", "goal", "The story says: 'Salem scored a goal.'"),
        tf("Class 9/1 lost the match.", false, "The story says: 'Class 9/1 won 2-1.'"),
        m("What was the final score?", ["2-1 to Class 9/1", "1-0 to Class 9/2", "1-1"], "The story says: 'The final score was 2-1.'"),
        o("Put the events in the correct order.", ["Class 9/2 scored first.", "Ali scored the equalising goal.", "Salem scored the winning goal."], "Class 9/2 scored first, then Ali scored, and finally Salem scored the winner."),
        m("In the story, 'never give up' means ___ .", ["keep trying", "go home early", "stop playing"], "The team kept trying and won."),
        m("What is the lesson of the story?", ["Never give up.", "Always be late.", "Do not play football."], "The team did not give up and they won.")
      ], { passage: "Class 9/1 played Class 9/2 in the school football match. At half time, Class 9/2 had one goal and Class 9/1 had none. The boys in Class 9/1 were sad. Their captain, Ali, said, \"We can still win. Never give up!\" In the second half, they played very well. Ali scored the equalising goal. The score was 1-1. In the last five minutes, Salem scored a goal and Class 9/1 went ahead. The referee blew his whistle. The final score was 2-1. Everyone was very happy and the boys shook hands." })
    ]
  };
})(window.EPZ_EASY);
