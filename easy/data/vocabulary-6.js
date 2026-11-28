/* Easy Level / Vocabulary / Part 6: Daily Activities */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-6"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "⏰", h: "Daily activities", p: ["Every day we do the same kinds of things: we wake up, eat, study and sleep.", "In this Part you learn 16 words and phrases for daily life. Listen to each one and say it aloud."], ex: [["I **wake up** at six o'clock."], ["She **does her homework** in the evening."]] },
      { k: "words", kick: "Word list 1", h: "From morning to school", items: [["⏰", "wake up", "stop sleeping and open your eyes", "WAYK UP", "I **wake up** at six."], ["👕", "get dressed", "put on your clothes", "GET DREST", "He **gets dressed** quickly."], ["🪥", "brush your teeth", "clean your teeth with a toothbrush", "BRUSH yor TEETH", "I **brush my teeth** twice a day."], ["🍳", "have breakfast", "eat the first meal of the day", "HAV BREK-fust", "We **have breakfast** at seven."], ["🚌", "go to school", "travel to the place where you study", "GOH too SKOOL", "I **go to school** by bus."], ["📖", "study", "learn by reading and practising", "STUD-ee", "I **study** English every day."], ["✍️", "write", "make words with a pen or pencil", "RYT", "She **writes** in her notebook."], ["👂", "listen", "pay attention to a sound", "LIS-un", "We **listen** to the teacher."]] },
      { k: "words", kick: "Word list 2", h: "After school and evening", items: [["🏠", "come home", "arrive at your house", "KUM HOHM", "I **come home** at three."], ["🍛", "have lunch", "eat the midday meal", "HAV LUNCH", "We **have lunch** at two."], ["📝", "do homework", "do school work at home", "DOO HOHM-werk", "I **do my homework** after lunch."], ["⚽", "play", "do something for fun", "PLAY", "They **play** football in the park."], ["📺", "watch TV", "look at a television program", "WOCH tee-VEE", "He **watches TV** in the evening."], ["🍲", "cook", "make food", "KUK", "My mother **cooks** dinner."], ["🧹", "clean", "make a place tidy", "KLEEN", "We **clean** the house on Friday."], ["🛏️", "go to bed", "go to sleep", "GOH too BED", "I **go to bed** at ten."]] },
      { k: "examples", kick: "Words in context", h: "A day in the life of Hamad", items: [["Hamad **wakes up** at six and **brushes his teeth**.", "morning"], ["He **gets dressed** and **has breakfast** with his family.", "breakfast"], ["He **goes to school** by bus and **studies** English.", "school"], ["In the afternoon he **comes home** and **does his homework**.", "afternoon"], ["In the evening he **watches TV** and **goes to bed** at ten.", "evening"]] },
      { k: "table", kick: "Word groups", h: "Parts of the day", head: ["Time", "Activities"], rows: [["**morning**", "wake up, get dressed, brush your teeth, have breakfast, go to school"], ["**afternoon**", "come home, have lunch, do homework, play"], ["**evening**", "watch TV, cook, clean, go to bed"]] },
      { k: "table", kick: "Word groups", h: "Use the right verb", head: ["Verb", "We use it with"], rows: [["**have**", "breakfast, lunch, dinner"], ["**do**", "homework"], ["**go to**", "school, bed"], ["**watch**", "TV"], ["**brush**", "your teeth"]] },
      { k: "tip", h: "Memory tips", items: ["Say your own day aloud: \"I wake up at... I go to school at...\"", "Learn **phrases**, not single words: **have** breakfast, **do** homework, **go to** bed.", "With **he, she, it** add **s**: he **wakes up**, she **has** breakfast, it **goes**."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("We ___ breakfast in the morning.", ["have", "do", "watch"], "We say have breakfast."), mi("⏰", "Which activity is this?", ["wake up", "go to bed", "play"], "An alarm clock helps us wake up."), f("I ___ my teeth every morning. Type the verb.", "brush", "We brush our teeth."), tf("We do homework in bed at night.", false, "We do homework after school, not in bed at night.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the activity that matches each meaning.", [
        m("Stop sleeping and open your eyes.", ["wake up", "go to bed", "play"], "To wake up is to stop sleeping."),
        m("Put on your clothes.", ["get dressed", "brush your teeth", "have lunch"], "Get dressed means put on clothes."),
        m("Clean your teeth with a toothbrush.", ["brush your teeth", "watch TV", "do homework"], "You brush your teeth with a toothbrush."),
        m("Eat the first meal of the day.", ["have breakfast", "have dinner", "go to bed"], "Breakfast is the first meal."),
        m("Arrive at your house.", ["come home", "go to school", "wake up"], "To come home is to arrive at your house."),
        m("Make food.", ["cook", "clean", "study"], "To cook is to make food."),
        m("Make a place tidy.", ["clean", "cook", "play"], "To clean is to make a place tidy."),
        m("Go to sleep for the night.", ["go to bed", "get dressed", "come home"], "To go to bed is to go to sleep."),
        tf("We listen with our ears.", true, "We use our ears to listen."),
        tf("We have dinner in the morning.", false, "We have dinner in the evening.")
      ]),
      T("Picture activities", "Look at the picture and choose the activity.", [
        mi("⏰", "What do we do when the alarm rings?", ["wake up", "go to bed", "cook"], "We wake up when the alarm rings."),
        mi("🪥", "What are we doing?", ["brushing our teeth", "washing a car", "writing"], "A toothbrush is for brushing teeth."),
        mi("🍳", "What meal is this?", ["breakfast", "dinner", "lunch"], "Eggs are a common breakfast."),
        mi("🚌", "Where are we going?", ["to school", "to bed", "to the market"], "The school bus takes students to school."),
        mi("📝", "What are we doing?", ["homework", "cooking", "playing"], "Writing at a desk is homework."),
        mi("⚽", "What are the children doing?", ["playing", "sleeping", "cleaning"], "They play football."),
        mi("📺", "What is he doing?", ["watching TV", "studying", "cooking"], "A television is for watching."),
        mi("🧹", "What are we doing?", ["cleaning", "playing", "writing"], "A broom is for cleaning."),
        mi("🍲", "What do we do with a pot of food like this?", ["cook it", "clean it", "listen to it"], "We cook food in a pot."),
        fi("🛏️", "Type the activity: go to ___ . (a place to sleep)", "bed", "We go to bed to sleep.")
      ]),
      T("Complete the sentences", "Choose or type the missing word.", [
        m("We ___ breakfast at seven o'clock.", ["have", "do", "go"], "We say have breakfast."),
        m("I ___ my homework after lunch.", ["do", "have", "wake"], "We say do homework."),
        m("He ___ TV in the evening.", ["watches", "makes", "brushes"], "We watch TV."),
        m("They ___ to school by bus.", ["go", "do", "have"], "We say go to school."),
        m("My mother ___ dinner every night.", ["cooks", "plays", "wakes"], "She makes dinner, so she cooks."),
        m("I ___ to bed at ten o'clock.", ["go", "come", "do"], "We say go to bed."),
        f("I ___ up at six every day. Type the verb.", "wake", "We say wake up."),
        f("Students ___ to the teacher in class. Type the verb.", "listen", "Students listen to the teacher."),
        m("After school I ___ home at three.", ["come", "brush", "cook"], "We come home."),
        m("We ___ the house on Friday to make it tidy.", ["clean", "listen", "write"], "To make a house tidy we clean it.")
      ]),
      T("Order of the day and groups", "Choose the right time and match the activities.", [
        m("Which do we do first in the morning?", ["wake up", "go to bed", "have dinner"], "We wake up first."),
        m("Which do we do last at night?", ["go to bed", "wake up", "have breakfast"], "We go to bed last."),
        m("Which activity is usually in the morning?", ["have breakfast", "go to bed", "watch TV"], "Breakfast is a morning meal."),
        m("Which activity is usually in the evening?", ["have dinner", "wake up", "get dressed"], "Dinner is an evening meal."),
        m("Which word is different?", ["cook", "clean", "pencil"], "Cook and clean are activities. A pencil is a thing."),
        mt("Match each activity with its time of day.", [["wake up", "morning"], ["come home", "afternoon"], ["watch TV", "evening"], ["go to bed", "night"]], "Think about when you do each one."),
        tf("We brush our teeth with a ruler.", false, "We brush our teeth with a toothbrush."),
        tf("We have lunch in the middle of the day.", true, "Lunch is the midday meal."),
        m("Which verb goes with 'homework'?", ["do", "watch", "brush"], "We do homework."),
        m("Which verb goes with 'TV'?", ["watch", "do", "brush"], "We watch TV.")
      ]),
      T("Mixed review", "A mix of daily activity questions.", [
        m("Choose the correct sentence.", ["She wakes up at six.", "She wake up at six.", "She waking up at six."], "With she we add s: wakes."),
        m("Choose the correct sentence.", ["He does his homework.", "He do his homework.", "He doing his homework."], "With he we say does."),
        f("My father ___ to work at seven. Type the verb go in the correct form.", "goes", "With he, go becomes goes."),
        c("I do breakfast at seven.", "I have breakfast at seven.", "We say have breakfast, not do breakfast."),
        b("Put the words in the correct order.", "We have lunch at one.", "Subject + verb + meal + time."),
        m("Which activity belongs to a school day?", ["go to school", "go to the beach on holiday", "sleep all day"], "Going to school is part of a school day."),
        tf("'Get dressed' means put on your clothes.", true, "Get dressed means put on clothes."),
        mt("Match each verb with the word it goes with.", [["have", "breakfast"], ["do", "homework"], ["watch", "TV"], ["brush", "your teeth"]], "Learn the phrases together."),
        m("In the evening we usually ___ .", ["watch TV", "wake up", "have breakfast"], "Watching TV is an evening activity."),
        m("Which one do we do with a pen?", ["write", "listen", "cook"], "We write with a pen.")
      ])
    ]
  };
})(window.EPZ_EASY);
