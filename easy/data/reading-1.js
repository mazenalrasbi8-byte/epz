/* Easy Level / Reading / Part 1: Personal Information */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, c = h.c, mt = h.mt, T = h.T;
  E.parts["reading-1"] = {
    learn: [
      { k: "intro", kick: "Reading skills", e: "🪪", h: "Reading about people", p: ["Many short texts give **personal information**: a person's name, age, home, family, job, school and hobbies.", "You find these texts in profiles, forms and emails. In this Part you learn how to read them and find the answers to questions."], ex: [["Name: **Hamad**. Age: **15**."], ["I live in **Nizwa** with my family."]] },
      { k: "passage", kick: "Read the text", h: "A short profile", text: "My name is **Hamad**. I am **fifteen** years old. I live in **Nizwa**. I have **two brothers** and one sister. My father is a **teacher**. My favourite subject is **English**. I like to play **football** after school.", p: "The words in color are the **keywords**: the important words that give the information." },
      { k: "steps", kick: "Skill 1", h: "Find the main idea", q: "What is the text about?", items: [["Read the title and the first sentence", "The first sentence often tells you who or what the text is about."], ["Look at the keywords", "Name, age, home, family, school, hobby: they are all about one person."], ["Choose the sentence that covers the whole text", "The main idea is: Hamad tells us about himself."]] },
      { k: "steps", kick: "Skill 2", h: "Find specific information", q: "How old is Hamad?", items: [["Read the question", "The question word **How old** asks for an age (a number)."], ["Find the keywords in the question", "The keywords are **old** and **Hamad**."], ["Find the sentence with the answer", "\"I am **fifteen** years old.\" is the sentence."], ["Choose the answer", "The answer is **fifteen** (15)."]] },
      { k: "table", kick: "Question words", h: "What does the question want?", head: ["Question word", "Looks for", "Example answer"], rows: [["**Who**", "a person", "my father"], ["**Where**", "a place", "in Nizwa"], ["**How old**", "an age", "fifteen"], ["**How many**", "a number", "two brothers"], ["**What** (job)", "a job", "a teacher"], ["**What** (hobby)", "something you like", "football"]] },
      { k: "examples", kick: "Skill 3", h: "Understand new words from context", items: [["My hobby is **fishing**. I go to the sea at weekends.", "hobby = something you like to do in your free time"], ["She is a **nurse**. She helps patients in the hospital.", "nurse = a person who helps sick people"], ["I am **fifteen**. I am not twelve or sixteen.", "fifteen = 15"]], p: "If a word is new, read the sentences **around** it. They give clues." },
      { k: "tip", h: "Reading tips", items: ["Read the text once for the **main idea**. Read it again to find **details**.", "Underline keywords like **names, numbers, places** and **jobs**.", "Put your finger on the sentence where you find the answer. Check it matches the question."] },
      { k: "practice", h: "Short practice", p: "Read the text and answer.", text: "My name is **Younis**. I am **thirteen**. I live in **Sur** with my parents and my **sister**. My mother is a **doctor**. I like **swimming**.", qs: [m("How old is Younis?", ["thirteen", "fifteen", "ten"], "The text says: 'I am thirteen.'"), m("Where does Younis live?", ["in Sur", "in Muscat", "in Nizwa"], "The text says: 'I live in Sur.'"), f("Younis's mother is a ___ .", "doctor", "The text says: 'My mother is a doctor.'"), tf("Younis likes swimming.", true, "The text says: 'I like swimming.'")] }
    ],
    tests: [
      T("Meet Hamad", "Read the text, then answer the 10 questions.", [
        m("What is the writer's name?", ["Hamad Al Rashdi", "Salem Al Rashdi", "Khalid Al Rashdi"], "The first sentence says: 'My name is Hamad Al Rashdi.'"),
        m("How old is Hamad?", ["fifteen", "fourteen", "sixteen"], "The text says: 'I am fifteen years old.'"),
        m("Where does Hamad live?", ["in Nizwa", "in Muscat", "in Sohar"], "The text says: 'I live in Nizwa with my family.'"),
        m("How many people are in Hamad's family?", ["six", "four", "five"], "The text says: 'There are six people in my family.'"),
        m("What is Hamad's father's job?", ["a teacher", "a nurse", "a doctor"], "The text says: 'My father is a teacher.'"),
        m("Which subject does Hamad like best?", ["English", "Maths", "Science"], "The text says: 'My favourite subject is English.'"),
        tf("Hamad's mother is a teacher.", false, "The text says: 'my mother is a nurse.' His father is the teacher."),
        f("Hamad plays ___ with his friends in his free time.", "football", "The text says: 'In my free time I play football with my friends.'"),
        m("Who is Salem?", ["Hamad's best friend", "Hamad's brother", "Hamad's teacher"], "The text says: 'My best friend is Salem.'"),
        m("What is the text mostly about?", ["Hamad and his life", "A football match", "A school trip"], "The whole text gives personal information about Hamad: his age, home, family, school and hobby.")
      ], { passage: "Hello! My name is Hamad Al Rashdi. I am fifteen years old. I live in Nizwa with my family. There are six people in my family: my father, my mother, my two brothers, my sister and me. My father is a teacher and my mother is a nurse. I am a student in Grade 9. My favourite subject is English, but I do not like Maths very much. In my free time I play football with my friends. My best friend is Salem. He lives next to my house. We walk to school together every morning." }),
      T("A School Form", "Read the form, then answer the 10 questions.", [
        m("What is Khalid's family name?", ["Al Harthi", "Said", "Khalid"], "The form says: 'Name: Khalid Said Al Harthi.' The family name is the last name."),
        m("Which grade is Khalid in?", ["Grade 9", "Grade 10", "Grade 11"], "The form says: 'Grade: 9'."),
        m("Where does Khalid live?", ["in Salalah", "in Sur", "in Nizwa"], "The form says: 'Address: Salalah, Oman'."),
        m("What is Khalid's favourite subject?", ["Science", "English", "Maths"], "The form says: 'Favourite subject: Science'."),
        f("Khalid's brother is called ___ .", "Younis", "The form says: 'Brother: Younis (Grade 11)'."),
        tf("Khalid is fourteen years old.", true, "The form says: 'Age: 14'."),
        m("What are Khalid's hobbies?", ["swimming and reading", "football and fishing", "cycling and drawing"], "The form says: 'Hobbies: swimming and reading'."),
        m("How does Khalid come to school?", ["by bus", "by car", "on foot"], "The text says: 'He comes to school by bus.'"),
        m("Where does Khalid's mother work?", ["at a bank", "at a school", "at a hospital"], "The text says: 'His mother works at a bank.'"),
        m("Which languages does Khalid speak?", ["Arabic and English", "Arabic and French", "English and Spanish"], "The form says: 'Languages: Arabic and English'.")
      ], { passage: "Al Noor School: New Student Form\nName: Khalid Said Al Harthi\nDate of birth: 3 March 2012\nAge: 14\nGrade: 9\nClass: 9/3\nAddress: Salalah, Oman\nPhone number: 9123 4567\nLanguages: Arabic and English\nFavourite subject: Science\nHobbies: swimming and reading\nBrother: Younis (Grade 11)\nKhalid started at Al Noor School in September. He comes to school by bus. His mother works at a bank and his father is a farmer." }),
      T("An Email to a New Friend", "Read the email, then answer the 10 questions.", [
        m("Who is the email to?", ["Tom", "Ahmed", "Yousef"], "The email starts: 'Hello Tom,'. Tom is the reader."),
        m("Where is Yousef from?", ["Sur", "Muscat", "Salalah"], "The email says: 'I am from Sur, a city by the sea in Oman.'"),
        m("How many sisters does Yousef have?", ["two", "one", "three"], "The email says: 'I have one brother and two sisters.'"),
        m("What does Ahmed do?", ["He studies at university.", "He works at a hospital.", "He goes to school."], "The email says: 'He studies at university in Muscat.'"),
        m("What does Yousef do at weekends?", ["He goes fishing with his uncle.", "He plays football.", "He visits Tom."], "The email says: 'At weekends I go fishing with my uncle.'"),
        tf("Yousef is learning English.", true, "The email says: 'I speak Arabic and I am learning English.'"),
        f("Yousef loves fishing and ___ .", "cycling", "The email says: 'I love fishing and cycling.'"),
        m("Why does Yousef write the email?", ["to make a new friend", "to ask for money", "to say sorry"], "He tells Tom about himself and asks Tom questions. He wants a new friend."),
        m("In the text, 'a city by the sea' means a city ___ .", ["near the sea", "under the sea", "far from the sea"], "'By the sea' means next to or near the sea."),
        m("How old is Yousef's brother?", ["twenty", "sixteen", "twelve"], "The email says: 'My brother Ahmed is twenty.'")
      ], { passage: "Hello Tom,\nMy name is Yousef and I am sixteen years old. I am from Sur, a city by the sea in Oman. I speak Arabic and I am learning English. I have one brother and two sisters. My brother Ahmed is twenty. He studies at university in Muscat. I love fishing and cycling. At weekends I go fishing with my uncle. What about you? Where are you from? What do you like to do? Please write to me soon.\nYour friend,\nYousef" }),
      T("Two Cousins", "Read the text, then answer the 10 questions.", [
        m("Who is older?", ["Ali", "Salem", "They are the same age."], "The text says: 'Ali is fourteen and Salem is thirteen.' Ali is older."),
        m("Where does Salem live?", ["in a village near Rustaq", "in Muscat", "in Sohar"], "The text says: 'Salem lives in a small village near Rustaq.'"),
        m("How many brothers does Ali have?", ["four", "two", "none"], "The text says: 'Ali has a big family with four brothers.'"),
        m("What does Ali like?", ["computers", "animals", "cooking"], "The text says: 'Ali likes computers.'"),
        m("What does Salem want to be?", ["a vet", "an engineer", "a teacher"], "The text says: 'wants to be a vet.'"),
        tf("Ali lives on a farm.", false, "The text says Ali lives in Muscat. Salem's father has a farm."),
        f("Salem helps his father on the ___ .", "farm", "The text says: 'He helps his father on the farm.'"),
        m("What do the cousins do every summer?", ["They ride bikes and eat dates.", "They go to school.", "They visit Muscat."], "The text says: 'Ali visits Salem's village and they ride bikes and eat fresh dates together.'"),
        m("In the text, 'a vet' is ___ .", ["a doctor for animals", "a farm", "a school teacher"], "The text explains: 'A vet is a doctor for animals.'"),
        m("Which sentence is true?", ["Salem has two sisters.", "Ali has two sisters.", "Salem has four brothers."], "The text says: 'Salem has no brothers, but he has two sisters.'")
      ], { passage: "Ali and Salem are cousins. Ali is fourteen and Salem is thirteen. Ali lives in Muscat, but Salem lives in a small village near Rustaq. Ali has a big family with four brothers. Salem has no brothers, but he has two sisters. Ali likes computers and wants to be an engineer. Salem likes animals. He helps his father on the farm and wants to be a vet. A vet is a doctor for animals. Every summer, Ali visits Salem's village and they ride bikes and eat fresh dates together." }),
      T("Dr. Fatma's Profile", "Read the text, then answer the 10 questions.", [
        m("Where does Dr. Fatma work?", ["at the Royal Hospital in Muscat", "at a school in Salalah", "at a bank in Sur"], "The text says: 'Dr. Fatma Al Said is a doctor at the Royal Hospital in Muscat.'"),
        m("How old is Dr. Fatma?", ["thirty-five", "twenty-five", "forty-five"], "The text says: 'She is thirty-five years old.'"),
        m("What is her husband's job?", ["engineer", "doctor", "teacher"], "The text says: 'Her husband is an engineer.'"),
        m("How many children does she have?", ["two", "one", "three"], "The text says: 'they have two children, a boy and a girl.'"),
        m("What time does Dr. Fatma get up?", ["at five o'clock", "at seven o'clock", "at three o'clock"], "The text says: 'Dr. Fatma gets up at five o'clock every morning.'"),
        f("She works from seven o'clock to ___ o'clock.", "three", "The text says: 'She works from seven o'clock to three o'clock.'"),
        tf("She cooks dinner for her family after work.", true, "The text says: 'After work she cooks dinner for her family.'"),
        m("Which languages does she speak?", ["Arabic, English and French", "Arabic and English", "English and German"], "The text says: 'She speaks Arabic, English and French.'"),
        m("Why does she love her job?", ["She helps sick people.", "She earns a lot.", "She travels a lot."], "The text says: 'She loves her job because she helps sick people.'"),
        m("What does she like to do at the weekend?", ["walk on the beach with her children", "work at the hospital", "cook for guests"], "The text says: 'At the weekend, she likes to walk on the beach with her children.'")
      ], { passage: "Dr. Fatma Al Said is a doctor at the Royal Hospital in Muscat. She is thirty-five years old and she is married. Her husband is an engineer and they have two children, a boy and a girl. Dr. Fatma gets up at five o'clock every morning. She works from seven o'clock to three o'clock. After work she cooks dinner for her family. She speaks Arabic, English and French. She loves her job because she helps sick people. At the weekend, she likes to walk on the beach with her children." })
    ]
  };
})(window.EPZ_EASY);
