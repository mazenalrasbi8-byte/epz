/* Easy Level / Story Order / Topic 3: Events in a Story (the items in each ordering question are listed in the CORRECT order) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, o = h.o, mt = h.mt, T = h.T;
  E.parts["scramble-3"] = {
    learn: [
      { k: "intro", kick: "Events", e: "📖", h: "Events in a story", p: ["The **events** are the things that happen in a story. They come in a **special order**: one event leads to the next.", "To understand a story, ask: **What happened first? What happened next? What happened last?** Look for **clue words** and think about **cause and effect**."], ex: [["Ali kicked the ball. **So** it went into the tree."], ["The old man helped him. **After that**, Ali was happy."]] },
      { k: "timeline", kick: "A story in order", h: "The lost ball", items: [["Event 1", "Ali is playing football in the park."], ["Event 2", "He kicks the ball too hard and it goes into a tree."], ["Event 3", "An old man sees him and gets a long stick."], ["Event 4", "The old man pushes the ball out of the tree."], ["Event 5", "Ali says thank you and is happy again."]], note: "Each event happens because of the one before it." },
      { k: "table", kick: "Clue words", h: "Words that show the order of events", head: ["Clue word", "What it shows", "Example"], rows: [["**one day**", "the story starts", "One day, Ali lost his ball."], ["**then / next**", "the next event", "Then he looked in the park."], ["**so / because**", "cause and effect", "It rained, so we stayed home."], ["**after that**", "what comes after", "After that, they ate dinner."], ["**in the end**", "the last event", "In the end, he found his ball."]] },
      { k: "examples", kick: "Examples", h: "First and last", items: [["Q: What happened **first**? A: Ali was playing football.", "the first event"], ["Q: What happened **after** the ball went into the tree? A: An old man helped him.", "the next event"], ["Q: What happened **last**? A: Ali was happy.", "the last event"], ["Q: **Why** did the ball go into the tree? A: Ali kicked it too hard.", "the cause"]] },
      { k: "tip", h: "Quick tips", items: ["The first event often tells **who** and **where**. The last event tells **how it ends**.", "Look for the **cause**: the event that makes the next one happen.", "Check your order: does each event follow the one before it?"] },
      { k: "practice", h: "Put the events in order", p: "Tap the events in the correct order.", qs: [o("The lost key: put the events in order.", ["Salem could not find his key.", "He looked in his bag.", "He found the key in his pocket.", "He opened the door."], "Lost, look, find, open."), m("Which event is the cause? 'It rained, so we stayed home.'", ["It rained.", "We stayed home.", "We went out."], "The rain is the cause."), tf("The last event of a story tells how it ends.", true, "Yes, the last event is the ending."), f("'___ day, Ali lost his ball.' Type the word.", "One", "One day starts many stories.")] }
    ],
    tests: [
      T("The lost wallet", "Put the events of the story in order.", [
        o("The lost wallet: put the events in order.", ["Hamad found a wallet near the bus stop.", "He looked at the ID card inside.", "He took the wallet to the police.", "The owner thanked Hamad."], "Find, look, police, thanks."),
        o("What the owner did: put the events in order.", ["The police called Mr. Salem.", "Mr. Salem came to the station.", "He got his wallet back.", "He wanted to give Hamad a reward."], "Call, come, wallet, reward."),
        o("Hamad's answer: put the events in order.", ["Mr. Salem offered a reward.", "Hamad said no.", "Hamad said he only did the right thing.", "Mr. Salem shook his hand."], "Offer, no, right thing, handshake."),
        o("The next day: put the events in order.", ["Hamad told his teacher.", "The teacher told the class.", "The class clapped.", "Hamad felt proud."], "Teacher, class, clapped, proud."),
        o("The story's start: put the events in order.", ["Hamad walked to the bus stop.", "He saw something brown on the ground.", "He picked it up.", "He saw it was a wallet."], "Walk, see, pick up, see wallet."),
        m("What happened first in the story?", ["Hamad found a wallet.", "The police called the owner.", "Hamad said no to the reward."], "The story starts when Hamad finds the wallet."),
        m("What happened after Hamad looked at the ID card?", ["He took the wallet to the police.", "He kept the money.", "He went home."], "After the card he took it to the police."),
        m("Why did Hamad take the wallet to the police?", ["He wanted to be honest.", "He wanted a reward.", "He was angry."], "He wanted to give the wallet back."),
        tf("Mr. Salem came to the police station before the police called him.", false, "The police called him first, then he came."),
        m("What happened last?", ["Mr. Salem thanked Hamad.", "Hamad found the wallet.", "The police called Mr. Salem."], "The thanks comes at the end.")
      ]),
      T("The late bus", "Put the events of the story in order.", [
        o("Khalid's morning: put the events in order.", ["Khalid's alarm clock did not ring.", "He woke up late.", "He got dressed quickly.", "He ran to the bus stop."], "Alarm, wake up, dress, run."),
        o("At the bus stop: put the events in order.", ["The bus was leaving.", "Khalid ran after it.", "The driver did not stop.", "Khalid felt sad."], "Leaving, ran, did not stop, sad."),
        o("The help: put the events in order.", ["Mr. Said saw Khalid.", "He stopped his car.", "He gave Khalid a lift.", "They drove to school."], "Saw, stopped, lift, drove."),
        o("At school: put the events in order.", ["Khalid arrived just in time.", "He sat at his desk.", "He took his exam.", "He did very well."], "Arrive, sit, exam, well."),
        o("After the exam: put the events in order.", ["Khalid thanked Mr. Said.", "Mr. Said smiled.", "Khalid set two alarm clocks.", "He was never late again."], "Thanks, smile, two alarms, never late."),
        m("Why was Khalid late?", ["His alarm clock did not ring.", "He lost his bag.", "He was ill."], "The alarm clock did not ring."),
        m("What happened after Khalid ran after the bus?", ["The driver did not stop.", "Khalid took his exam.", "Mr. Said gave him a lift."], "The driver did not stop."),
        m("Who helped Khalid?", ["Mr. Said", "the bus driver", "his teacher"], "Mr. Said, his neighbour, gave him a lift."),
        tf("Khalid took his exam before he arrived at school.", false, "He arrived first, then he took the exam."),
        m("What is the first event in the story?", ["The alarm clock did not ring.", "Khalid did well.", "Mr. Said gave a lift."], "The story begins with the alarm clock.")
      ]),
      T("The surprise party", "Put the events of the story in order.", [
        o("Making the plan: put the events in order.", ["It was Mother's birthday.", "The children wanted to give her a surprise.", "They made a birthday cake.", "They put candles on the cake."], "Birthday, surprise, cake, candles."),
        o("Hiding: put the events in order.", ["They heard the car.", "They turned off the lights.", "They hid behind the sofa.", "They stayed very quiet."], "Car, lights, hide, quiet."),
        o("The surprise: put the events in order.", ["Mother opened the door.", "The children jumped out.", "They shouted, 'Happy birthday!'", "Mother laughed."], "Open, jump, shout, laugh."),
        o("The party: put the events in order.", ["Mother blew out the candles.", "She cut the cake.", "Everyone ate a piece.", "They took a photo."], "Blow, cut, eat, photo."),
        o("The end: put the events in order.", ["Mother hugged the children.", "She said thank you.", "She said it was the best birthday.", "They all went to the garden."], "Hug, thanks, best, garden."),
        m("Why did the children hide?", ["to surprise Mother", "to play a game", "because they were afraid"], "They hid to give Mother a surprise."),
        m("What did Mother do after the children shouted?", ["She laughed.", "She cried.", "She went to bed."], "She laughed."),
        m("What happened right after Mother opened the door?", ["The children jumped out.", "They made the cake.", "She blew out the candles."], "The children jumped out."),
        tf("The children made the cake after Mother came home.", false, "They made the cake before she came home."),
        m("What was the last thing in the story?", ["They went to the garden.", "They made the cake.", "Mother opened the door."], "The story ends in the garden.")
      ]),
      T("The storm", "Put the events of the story in order.", [
        o("The weather: put the events in order.", ["The sky was blue in the morning.", "Dark clouds came in the afternoon.", "The wind began to blow.", "Heavy rain fell."], "Blue, clouds, wind, rain."),
        o("At school: put the events in order.", ["The teacher saw the clouds.", "He closed the windows.", "The students stayed inside.", "The lesson went on."], "See, close, inside, lesson."),
        o("On the road: put the events in order.", ["The rain filled the road.", "Cars drove slowly.", "A bus stopped.", "The driver waited for the rain to stop."], "Fill, slow, stop, wait."),
        o("After the storm: put the events in order.", ["The rain stopped.", "The sun came out.", "A rainbow appeared.", "The children ran outside."], "Stop, sun, rainbow, outside."),
        o("The evening: put the events in order.", ["The air was fresh.", "The children played in the puddles.", "Mothers called them home.", "They had hot soup."], "Fresh, puddles, called, soup."),
        m("What happened first?", ["The sky was blue.", "Heavy rain fell.", "A rainbow appeared."], "The sky was blue in the morning."),
        m("What happened right after the wind began to blow?", ["Heavy rain fell.", "The rainbow appeared.", "The sun came out."], "The rain fell after the wind."),
        m("What happened when the rain stopped?", ["The sun came out.", "Dark clouds came.", "The wind began."], "After the rain the sun came out."),
        tf("The rainbow appeared before the rain fell.", false, "The rainbow appeared after the rain."),
        m("What is the last event in the evening?", ["They had hot soup.", "The rain fell.", "A rainbow appeared."], "The evening ends with hot soup.")
      ]),
      T("Mixed stories", "Put the events of different stories in order.", [
        o("The lost cat: put the events in order.", ["Younis could not find Misha.", "He looked in the garden.", "The neighbours helped him.", "They found Misha under a car."], "Lost, garden, neighbours, found."),
        o("The football match: put the events in order.", ["Class 9/2 scored first.", "The boys were sad.", "Ali scored a goal.", "Salem scored the winning goal."], "First goal, sad, equaliser, winner."),
        o("The seed: put the events in order.", ["Rashid planted a seed.", "He watered it every day.", "A small plant grew.", "It gave a beautiful flower."], "Plant, water, grow, flower."),
        o("The fisherman: put the events in order.", ["Salim went to sea early.", "He caught a big fish.", "He took it to the market.", "He sold it for a good price."], "Sea, catch, market, sell."),
        o("The new student: put the events in order.", ["Salem came to the new school.", "He did not know anyone.", "Hamad said hello.", "They became good friends."], "New, no friends, hello, friends."),
        m("What is the cause? 'The alarm did not ring, so Khalid was late.'", ["The alarm did not ring.", "Khalid was late.", "Khalid ran."], "The alarm not ringing is the cause."),
        m("What is the effect? 'It rained, so we stayed home.'", ["We stayed home.", "It rained.", "We went out."], "Staying home is the effect."),
        tf("The first event of a story is always the most exciting.", false, "The first event usually tells who and where. The exciting events often come later."),
        f("'___ day, a boy found a wallet.' Type the word that starts many stories.", "One", "One day starts many stories."),
        mt("Match each clue word with what it shows.", [["one day", "the start"], ["so", "cause and effect"], ["after that", "the next event"], ["in the end", "the last event"]], "Clue words show the order of events.")
      ])
    ]
  };
})(window.EPZ_EASY);
