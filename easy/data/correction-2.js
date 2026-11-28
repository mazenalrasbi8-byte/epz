/* Easy Level / Fix the Mistake / Topic 2: Capitalization
   These questions are STRICT: capital letters and punctuation must be exactly right (cs = typed correction, ms = multiple choice). */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, cs = h.cs, ms = h.ms, mt = h.mt, T = h.T;
  E.parts["correction-2"] = {
    learn: [
      { k: "intro", kick: "Capital letters", e: "🔠", h: "Fix the capital letters", p: ["A **capital letter** is a big letter, like **A**, **B** or **C**. We use capital letters at special places in a sentence.", "In this Part you look at a sentence, find the word that needs a **capital letter** (or has one it should not have) and write the sentence **correctly**."], ex: [["Wrong: **my** name is ali. → Correct: **My** name is **Ali**."], ["Wrong: we go to **muscat**. → Correct: We go to **Muscat**."]] },
      { k: "steps", kick: "How to find a mistake", h: "Check the capital letters in four steps", q: "my friend ali lives in nizwa.", items: [["Check the first word", "A sentence starts with a capital letter: **My**."], ["Check names of people", "Ali is a name: **Ali**."], ["Check names of places", "Nizwa is a place: **Nizwa**."], ["Write the whole sentence again", "My friend Ali lives in Nizwa."]] },
      { k: "table", kick: "Rules", h: "When do we use a capital letter?", head: ["Use a capital letter for", "Example"], rows: [["the **first word** of a sentence", "**T**he bus is late."], ["the word **I**", "Today **I** am happy."], ["**names** of people", "**H**amad and **S**alem are friends."], ["**places**: cities, countries, streets", "**M**uscat is in **O**man."], ["**days** and **months**", "My birthday is on **F**riday in **M**arch."], ["**languages** and **nationalities**", "I speak **A**rabic and **E**nglish."], ["**titles** with names", "**M**r. Said and **D**r. Ali"]] },
      { k: "mistakes", h: "Common capital letter mistakes", items: [["my name is hamad.", "**My** name is **Hamad**.", "Capital for the first word and a name."], ["today i am happy.", "Today **I** am happy.", "I is always a capital letter."], ["we live in sohar.", "We live in **Sohar**.", "Names of places need a capital letter."], ["The Teacher is kind.", "The **teacher** is kind.", "Do not use a capital for a common word like teacher."], ["I like Football.", "I like **football**.", "Do not use a capital for a common word like football."]] },
      { k: "tip", h: "Quick tips", items: ["**Names** (people, places, days, months, languages) always have a **capital letter**.", "Common words like **boy, school, city, teacher** do not need a capital letter, unless they start a sentence.", "After you write, check the **first word** and every **name**."] },
      { k: "practice", h: "Short practice", p: "Fix the mistake. Type the correct sentence with the right capital letters.", qs: [cs("my brother is ten.", "My brother is ten.", "A sentence starts with a capital letter."), cs("i am a student.", "I am a student.", "I is always a capital letter."), ms("Which sentence is correct?", ["We go to Salalah in July.", "we go to salalah in july.", "We go to salalah in July."], "Salalah (a place) and July (a month) need capital letters."), tf("'monday' is written correctly.", false, "Days start with a capital letter: Monday.")] }
    ],
    tests: [
      T("Capital letter at the start", "Fix the sentences. Every sentence starts with a capital letter.", [
        cs("the bus is late.", "The bus is late.", "Start every sentence with a capital letter."),
        cs("we play football on fridays.", "We play football on Fridays.", "Capital letters for the first word and the day."),
        cs("she likes tea.", "She likes tea.", "Start the sentence with a capital letter."),
        cs("it is a sunny day.", "It is a sunny day.", "Start the sentence with a capital letter."),
        ms("Which sentence is correct?", ["The boys are in the garden.", "the boys are in the garden.", "The Boys Are In The Garden."], "Only the first word needs a capital letter."),
        ms("Which sentence is correct?", ["My father works in a bank.", "my father works in a bank.", "My Father Works In A Bank."], "Capital letter for the first word only."),
        ms("Which sentence is correct?", ["We have a lesson today.", "we have a lesson today.", "We Have a lesson today."], "Only the first word needs a capital letter."),
        tf("A sentence starts with a capital letter.", true, "The first word always has a capital letter."),
        tf("'We Like Tea.' is correct.", false, "Only the first word needs a capital letter: We like tea."),
        m("How many capital letters does 'the cat sleeps' need at the start?", ["one", "two", "three"], "Only the first word: The cat sleeps.")
      ]),
      T("I and names of people", "Fix the capital letters for I and for names.", [
        cs("today i am tired.", "Today I am tired.", "I is always a capital letter."),
        cs("my friend hamad is kind.", "My friend Hamad is kind.", "Capital letters for the first word and the name."),
        cs("i like to read with salem.", "I like to read with Salem.", "Capital letters for I and the name."),
        cs("mr. said is our teacher.", "Mr. Said is our teacher.", "Capital letters for the title and the name."),
        cs("ali and younis play chess.", "Ali and Younis play chess.", "Names of people have capital letters."),
        ms("Which sentence is correct?", ["I am Khalid.", "i am khalid.", "I am khalid."], "I and Khalid need capital letters."),
        ms("Which sentence is correct?", ["My sister Mona is ten.", "my sister mona is ten.", "My sister mona is ten."], "The first word and the name Mona need capital letters."),
        ms("Which sentence is correct?", ["Dr. Ali is a doctor.", "dr. ali is a doctor.", "Dr. ali is a doctor."], "Titles and names have capital letters."),
        tf("The word 'I' is always a capital letter.", true, "I is always a capital letter."),
        tf("'the Teacher' is correct in 'The teacher is kind.'", false, "Teacher is a common word. It has no capital in the middle of a sentence.")
      ]),
      T("Days, months and places", "Fix the capital letters for days, months and places.", [
        cs("we go to the beach on friday.", "We go to the beach on Friday.", "Days have capital letters."),
        cs("my birthday is in march.", "My birthday is in March.", "Months have capital letters."),
        cs("i live in sohar.", "I live in Sohar.", "Places have capital letters."),
        cs("the exam is on sunday in april.", "The exam is on Sunday in April.", "Days and months have capital letters."),
        cs("we visited muscat and salalah.", "We visited Muscat and Salalah.", "Places have capital letters."),
        ms("Which sentence is correct?", ["The market opens on Monday.", "The market opens on monday.", "the market opens on Monday."], "Monday needs a capital letter, and the first word too."),
        ms("Which sentence is correct?", ["We study in February.", "We study in february.", "we study in February."], "February and We need capital letters."),
        ms("Which sentence is correct?", ["Nizwa is a city in Oman.", "nizwa is a city in oman.", "Nizwa is a city in oman."], "Nizwa and Oman need capital letters."),
        tf("Months of the year start with a capital letter.", true, "January, February, March..."),
        tf("'summer' needs a capital letter in 'We swim in summer.'", false, "Seasons are not capitalized.")
      ]),
      T("Languages and countries", "Fix the capital letters for languages, countries and nationalities.", [
        cs("i speak arabic and english.", "I speak Arabic and English.", "Languages have capital letters."),
        cs("my teacher is from egypt.", "My teacher is from Egypt.", "Countries have capital letters."),
        cs("tom is english and hamad is omani.", "Tom is English and Hamad is Omani.", "Nationalities have capital letters."),
        cs("we study french on monday.", "We study French on Monday.", "Languages and days have capital letters."),
        cs("oman is a beautiful country.", "Oman is a beautiful country.", "Countries have capital letters."),
        ms("Which sentence is correct?", ["She is from Yemen.", "she is from yemen.", "She is from yemen."], "She and Yemen need capital letters."),
        ms("Which sentence is correct?", ["He speaks Hindi and English.", "He speaks hindi and english.", "he speaks Hindi and English."], "Languages need capital letters."),
        ms("Which sentence is correct?", ["I want to visit Japan.", "I want to visit japan.", "i want to visit Japan."], "I and Japan need capital letters."),
        tf("'arabic' is written correctly.", false, "Languages have a capital letter: Arabic."),
        tf("'Omani' is the nationality of a person from Oman.", true, "Omani is written with a capital O.")
      ]),
      T("Mixed review", "Fix all kinds of capital letter mistakes.", [
        cs("on friday i go to muscat with my father.", "On Friday I go to Muscat with my father.", "Capital letters for the first word, the day, I and the place."),
        cs("mr. ahmed teaches english in sohar.", "Mr. Ahmed teaches English in Sohar.", "Capital letters for the title, names, language and place."),
        cs("in july we travel to salalah.", "In July we travel to Salalah.", "Capital letters for the first word, the month and the place."),
        cs("My Brother Is Ten Years Old.", "My brother is ten years old.", "Only the first word needs a capital letter."),
        cs("we live in a Big House.", "We live in a big house.", "Big and house are common words. They need no capital letter."),
        ms("Which sentence is correct?", ["Hamad and I speak Arabic.", "hamad and i speak arabic.", "Hamad and i speak Arabic."], "Names, I and languages need capital letters."),
        ms("Which sentence is correct?", ["Our school is in Nizwa.", "Our School is in Nizwa.", "our school is in nizwa."], "School is a common word. Nizwa is a place."),
        tf("Common words like 'table' need a capital letter in the middle of a sentence.", false, "Only names and the first word need capital letters."),
        mt("Match each word with the reason for the capital letter.", [["Hamad", "a name"], ["Friday", "a day"], ["Oman", "a country"], ["English", "a language"]], "Names, days, countries and languages have capital letters."),
        m("Which word needs a capital letter in 'we live in oman'?", ["we and oman", "live", "in"], "We starts the sentence and Oman is a country.")
      ])
    ]
  };
})(window.EPZ_EASY);
