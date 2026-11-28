/* Easy Level / Listening / Part 1: Greetings and Introductions
   Each test has an audio_text. It is read aloud by the phone's English voice. Lines like "Hamad: ..." are read in a different voice or pitch for each speaker.
   The text is never shown to the student before the test ends. */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, o = h.o, T = h.T;
  E.parts["listening-1"] = {
    learn: [
      { k: "intro", kick: "Listening skills", e: "👋", h: "Greetings and introductions", p: ["In this Part you listen to people who say hello, meet for the first time and talk about themselves.", "You will hear **greetings** (Good morning), **questions** (How are you?) and **personal information** (name, age, country). Listen for the **keywords**."], ex: [["**Good morning.** How are you?"], ["**Nice to meet you.** My name is Hamad."]] },
      { k: "steps", kick: "Skill 1", h: "Listen for the general meaning", q: "Who is talking, and what are they talking about?", items: [["Think before you listen", "Read the question first. You will hear it again in the audio."], ["Listen the first time for the big idea", "Do not worry about every word. Ask: Who? Where? What about?"], ["Listen for greetings", "Hello, Good morning and Nice to meet you tell you that people are meeting."], ["Choose the answer", "Two students meet and say hello."]] },
      { k: "steps", kick: "Skill 2", h: "Listen for specific information", q: "Where is Salem from?", items: [["Read the question", "**Where** asks for a place."], ["Decide what you need", "You need a **place name**, like Sur, Nizwa or Muscat."], ["Listen for the keyword", "Listen for the words **I am from**."], ["Play it again if you need to", "The answer is the place you hear after 'from'."]] },
      { k: "listen", kick: "Guided listening", h: "Try it: two new friends", p: "Press Play, then answer the questions. You can play it again.", script: "Ali: Good afternoon. My name is Ali.\nYounis: Hello Ali. I am Younis. Nice to meet you.\nAli: Nice to meet you too. Where are you from, Younis?\nYounis: I am from Salalah. And you?\nAli: I am from Muscat.", qs: [m("What do the boys say to each other?", ["Hello and nice to meet you", "Goodbye", "Happy birthday"], "They say 'Hello' and 'Nice to meet you', so they are meeting for the first time."), m("Where is Younis from?", ["Salalah", "Muscat", "Sur"], "Younis says: 'I am from Salalah.'"), m("Where is Ali from?", ["Muscat", "Salalah", "Nizwa"], "Ali says: 'I am from Muscat.'")] },
      { k: "examples", kick: "Common expressions", h: "Words you hear again and again", items: [["**Hello** / **Hi**. How are you?", "I am **fine**, thank you. And you?"], ["**Nice to meet you.**", "**Nice to meet you too.**"], ["**My name is** Hamad. / **I am** Hamad.", "telling your name"], ["**I am from** Oman. / **I live in** Nizwa.", "telling your country or city"], ["**Goodbye.** / **See you tomorrow.**", "saying goodbye"]] },
      { k: "table", kick: "Greetings", h: "Which greeting for which time?", head: ["Time", "Greeting", "Reply"], rows: [["before 12 o'clock", "**Good morning**", "Good morning."], ["12 o'clock to about 6", "**Good afternoon**", "Good afternoon."], ["after about 6", "**Good evening**", "Good evening."], ["any time", "**Hello / Hi**", "Hello! How are you?"]], note: "We say **Good night** only when we go to bed or leave at night." },
      { k: "tip", h: "Listening tips", items: ["Listen for **I am, my name is** and **I am from**. They come just before the answer.", "Numbers and names can be quick. **Play it again** or press **Slow**.", "Do not worry if you do not know every word. Listen for the **keywords**."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which greeting do we use before 12 o'clock?", ["Good morning", "Good evening", "Good night"], "Good morning is for the morning."), m("Which answer is correct? 'Nice to meet you.'", ["Nice to meet you too.", "I am fine.", "Goodbye."], "We answer 'Nice to meet you too.'"), f("'I am ___ Oman' means my country is Oman. Type the word.", "from", "We say 'I am from Oman'."), tf("'Good night' is a greeting for the afternoon.", false, "Good night is for the evening or when you go to bed. In the afternoon we say Good afternoon.")] }
    ],
    tests: [
      T("Meeting a New Friend", "Listen to the conversation, then answer the 10 questions.", [
        m("What time of day is it?", ["morning", "afternoon", "evening"], "Hamad says: 'Good morning!' at the start."),
        m("What is the new student's name?", ["Salem", "Hamad", "Khalid"], "The new student says: 'I am Salem.'"),
        m("Where is Salem from?", ["Sur", "Nizwa", "Muscat"], "Salem says: 'I am from Sur.'"),
        m("Where is Hamad from?", ["Nizwa", "Sur", "Salalah"], "Hamad says: 'I am from Nizwa.'"),
        m("Which grade is Salem in?", ["Grade 9", "Grade 10", "Grade 11"], "Salem says: 'I am in Grade nine.'"),
        m("Which class is Salem in?", ["class 9/4", "class 9/1", "class 9/2"], "Salem says: 'I am in class nine four.'"),
        tf("Hamad is a new student.", false, "Hamad asks Salem: 'Are you a new student?' Salem is the new student."),
        m("What will Hamad show Salem?", ["the classroom", "the library", "the bus"], "Hamad says: 'I will show you our classroom.'"),
        m("How is Salem today?", ["fine", "tired", "angry"], "Salem says: 'I am fine, thank you.'"),
        m("What does Hamad say when Salem says thank you?", ["You are welcome.", "Good night.", "See you later."], "Hamad says: 'You are welcome.'")
      ], { audio_text: "Hamad: Good morning! My name is Hamad.\nSalem: Hello Hamad. I am Salem. Nice to meet you.\nHamad: Nice to meet you too. Are you a new student?\nSalem: Yes, I am. I am in Grade nine. I am from Sur.\nHamad: Oh, I am from Nizwa. Which class are you in?\nSalem: I am in class nine four.\nHamad: Great! I am in class nine four too. Come with me. I will show you our classroom.\nSalem: Thank you very much, Hamad.\nHamad: You are welcome. How are you today?\nSalem: I am fine, thank you. And you?\nHamad: I am very well, thanks." }),
      T("A Visitor at Home", "Listen to the conversation, then answer the 10 questions.", [
        m("Who comes to the house?", ["Mr. Said", "Mr. Ahmed", "Mr. Khalid"], "The father says: 'Welcome, Mr. Said.'"),
        m("What is the visitor's job?", ["teacher", "doctor", "engineer"], "The father says: 'Mr. Said is a teacher at your school.'"),
        m("What does Mr. Said teach?", ["Maths", "English", "Science"], "Mr. Said says: 'I teach Maths at the school.'"),
        m("What is the boy's name?", ["Younis", "Yousef", "Yaqoub"], "The father says: 'This is my son, Younis.'"),
        m("How old is Younis?", ["fourteen", "fifteen", "twelve"], "The father says: 'He is fourteen.'"),
        m("What greeting does Mr. Said use?", ["Good evening", "Good morning", "Good night"], "Mr. Said says: 'Good evening.'"),
        f("The father offers Mr. Said ___ and dates. Type the drink.", "coffee", "The father says: 'Please sit and have some coffee and dates.'"),
        tf("Mr. Said does not know Younis.", false, "Mr. Said says: 'Oh, I know Younis. He is in my class.'"),
        m("Where do they sit?", ["in the living room", "in the garden", "in the kitchen"], "The father says: 'Please come into the living room.'"),
        m("How does Mr. Said feel at the end?", ["happy", "angry", "sad"], "Mr. Said says: 'Thank you. I am very happy to be here.'")
      ], { audio_text: "Father: Good evening, Mr. Said. Welcome to our house.\nMr. Said: Good evening. Thank you very much.\nFather: This is my son, Younis. He is fourteen.\nMr. Said: Oh, I know Younis. He is in my class. Hello Younis, how are you?\nYounis: I am fine, thank you, sir.\nFather: Mr. Said is a teacher at your school. Please come into the living room. Please sit and have some coffee and dates.\nMr. Said: I teach Maths at the school. Thank you. I am very happy to be here." }),
      T("Introducing Myself", "Listen to Khalid, then answer the 10 questions.", [
        m("What is the speaker's name?", ["Khalid", "Hamad", "Salim"], "He says: 'My name is Khalid.'"),
        m("How old is he?", ["fifteen", "sixteen", "fourteen"], "He says: 'I am fifteen years old.'"),
        m("Where does he live?", ["in Sohar", "in Sur", "in Nizwa"], "He says: 'I live in Sohar.'"),
        m("How many people are in his family?", ["five", "four", "six"], "He says: 'There are five people in my family.'"),
        m("What is his father's job?", ["a pilot", "a doctor", "a teacher"], "He says: 'My father is a pilot.'"),
        f("His mother is a ___ . Type the job.", "nurse", "He says: 'My mother is a nurse.'"),
        m("What does Khalid like to do?", ["play football", "swim", "cook"], "He says: 'I like to play football.'"),
        tf("Khalid has two sisters.", true, "He says: 'I have two sisters.'"),
        m("Why is Khalid speaking?", ["to introduce himself to the class", "to say goodbye", "to ask for help"], "He starts with 'Hello everyone' and tells about himself."),
        m("How does he end?", ["Thank you for listening.", "Goodbye, teacher.", "See you tomorrow."], "He ends: 'Thank you for listening.'")
      ], { audio_text: "Hello everyone. My name is Khalid. I am fifteen years old. I live in Sohar. There are five people in my family: my father, my mother, my two sisters and me. My father is a pilot and my mother is a nurse. I like to play football and I play every Friday with my friends. I am in Grade nine and I like English. I am happy to be in this class. Thank you for listening." }),
      T("Teacher and Student", "Listen to the conversation, then answer the 10 questions.", [
        m("What time of day is it?", ["afternoon", "morning", "evening"], "The teacher says: 'Good afternoon, class.'"),
        m("Who is the new teacher?", ["Mr. Hamdan", "Mr. Salem", "Mr. Ali"], "The teacher says: 'My name is Mr. Hamdan.'"),
        m("What subject does he teach?", ["English", "Maths", "Science"], "He says: 'I am your new English teacher.'"),
        m("What does the teacher ask first?", ["What are your names?", "Where is your book?", "Why are you late?"], "He says: 'Please tell me your names.'"),
        f("The first student's name is ___ . Type the name.", "Younis", "The first student says: 'My name is Younis.'"),
        m("Where is the second student from?", ["Salalah", "Sur", "Sohar"], "The second student says: 'I am Said. I am from Salalah.'"),
        m("What does the teacher say to Said?", ["Nice to meet you, Said.", "Goodbye, Said.", "Sit down, Said."], "The teacher says: 'Nice to meet you, Said.'"),
        tf("The class is a Grade 12 class.", false, "The teacher says: 'Welcome to Grade nine.'"),
        m("What will they do next?", ["start the lesson", "go home", "play football"], "The teacher says: 'Now, let us start our first lesson.'"),
        m("What does the teacher say at the end?", ["Open your books.", "Close the door.", "Go to the library."], "He ends: 'Please open your books.'")
      ], { audio_text: "Mr. Hamdan: Good afternoon, class. Welcome to Grade nine. My name is Mr. Hamdan. I am your new English teacher. Please tell me your names.\nYounis: Good afternoon, sir. My name is Younis.\nMr. Hamdan: Nice to meet you, Younis.\nSaid: Good afternoon. I am Said. I am from Salalah.\nMr. Hamdan: Nice to meet you, Said. Welcome to the school. Now, let us start our first lesson. Please open your books." }),
      T("Welcome to Oman", "Listen to the conversation at the airport, then answer the 10 questions.", [
        m("Where is the conversation?", ["at the airport", "at a school", "at a hospital"], "The man says: 'Welcome to Muscat airport.'"),
        m("Where is the visitor from?", ["England", "India", "Egypt"], "The visitor says: 'I am from England.'"),
        m("What is the visitor's name?", ["Tom", "Tim", "Ben"], "The visitor says: 'My name is Tom Brown.'"),
        m("What is the host's name?", ["Salim", "Sami", "Said"], "The host says: 'I am Salim.'"),
        m("How long will Tom stay in Oman?", ["two weeks", "two days", "two months"], "Tom says: 'I will stay for two weeks.'"),
        m("Why does Tom come to Oman?", ["on holiday", "for work", "to study"], "Tom says: 'I am here on holiday.'"),
        tf("This is Tom's first visit to Oman.", true, "Tom says: 'This is my first visit.'"),
        m("What does Salim give Tom?", ["coffee and dates", "a book", "a phone"], "Salim says: 'Please have some Omani coffee and dates.'"),
        m("What does Tom say about Oman?", ["It is a beautiful country.", "It is very cold.", "It is very small."], "Tom says: 'Oman is a beautiful country.'"),
        m("How does Salim say welcome?", ["Welcome to Oman.", "Goodbye, Tom.", "See you soon."], "Salim says: 'Welcome to Oman.'")
      ], { audio_text: "Salim: Good morning. Welcome to Muscat airport. I am Salim.\nTom: Good morning, Salim. Nice to meet you. My name is Tom Brown. I am from England.\nSalim: Welcome to Oman, Tom. How long will you stay here?\nTom: I will stay for two weeks. I am here on holiday. This is my first visit.\nSalim: I hope you like it. Please have some Omani coffee and dates.\nTom: Thank you very much. Oman is a beautiful country." })
    ]
  };
})(window.EPZ_EASY);
