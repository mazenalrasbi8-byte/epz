/* Easy Level / Listening / Part 2: Numbers, Dates and Time (audio is read by the phone's English voice; the text is never shown before the test ends) */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, mt = h.mt, o = h.o, T = h.T;
  E.parts["listening-2"] = {
    learn: [
      { k: "intro", kick: "Listening skills", e: "🔢", h: "Numbers, dates and time", p: ["In many conversations the answer is a **number**, a **date** or a **time**: a price, a phone number, a bus time or a birthday.", "Numbers can sound alike, so you must listen **carefully**. In this Part you learn how to catch them."], ex: [["The ticket is **fifteen** rials."], ["The bus leaves at **half past seven**."]] },
      { k: "table", kick: "Be careful", h: "Numbers that sound alike", head: ["Teens (-teen)", "Tens (-ty)"], rows: [["thir**teen** (13)", "thir**ty** (30)"], ["four**teen** (14)", "for**ty** (40)"], ["fif**teen** (15)", "fif**ty** (50)"], ["six**teen** (16)", "six**ty** (60)"]], note: "In **-teen** numbers the end is **strong**: thir-**TEEN**. In **-ty** numbers the first part is strong: **THIR**-ty." },
      { k: "steps", kick: "Skill 1", h: "Listen for numbers", q: "How much is the pen?", items: [["Read the question", "**How much** asks for a price (a number)."], ["Decide what you need", "A number and money word, like two rials."], ["Listen for the keyword", "Listen for the word **pen**. The number comes near it."], ["Check the choices", "Choices may be 13 and 30. Listen to the ending: -teen or -ty."]] },
      { k: "table", kick: "Time", h: "Ways to say the time", head: ["Say", "It means"], rows: [["seven **o'clock**", "7:00"], ["**half past** seven", "7:30"], ["**quarter past** seven", "7:15"], ["**quarter to** eight", "7:45"], ["seven **thirty**", "7:30"], ["**five past** seven", "7:05"]] },
      { k: "listen", kick: "Guided listening", h: "Try it: a bus time", p: "Press Play, then answer. You can play it again.", script: "Passenger: Excuse me. What time is the bus to Muscat?\nDriver: There is a bus at half past seven and another at quarter past nine.\nPassenger: How much is the ticket?\nDriver: It is two rials.", qs: [m("What time is the first bus?", ["7:30", "7:15", "9:15"], "The driver says: 'at half past seven', which is 7:30."), m("What time is the second bus?", ["9:15", "9:30", "7:45"], "The driver says: 'quarter past nine', which is 9:15."), f("The ticket costs ___ rials. Type the number as a word.", "two", "The driver says: 'It is two rials.'")] },
      { k: "examples", kick: "Dates", h: "Days, months and dates", items: [["Today is **Monday**, the **fifth** of **October**.", "day, ordinal number, month"], ["My birthday is on the **twelfth** of **March**.", "first, second, third, fourth ... twelfth"], ["The exam is on **Sunday** at **nine** o'clock.", "day + time"], ["We meet at **four fifteen**.", "4:15"]], p: "Dates use **ordinal numbers**: **first, second, third, fourth, fifth ... twentieth**." },
      { k: "tip", h: "Listening tips", items: ["Write the **number** you hear as you listen, like 30 or 13.", "For prices, listen for **rials** and **baisa**.", "For times, listen for **half past, quarter to, o'clock**."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which number is 14?", ["fourteen", "forty", "four"], "Fourteen ends with -teen, so it is 14."), m("What time is 'half past six'?", ["6:30", "6:15", "5:30"], "Half past six is 6:30."), f("What is the next number? Twelve, thirteen, ___ . Type the word.", "fourteen", "After thirteen comes fourteen."), tf("'Quarter to nine' is 8:45.", true, "Quarter to nine means 15 minutes before nine, so it is 8:45.")] }
    ],
    tests: [
      T("At the Shop", "Listen to the conversation, then answer the 10 questions.", [
        m("How much is the notebook?", ["three rials", "thirteen rials", "thirty rials"], "The shopkeeper says: 'The notebook is three rials.'"),
        m("How much is the pen?", ["one rial", "two rials", "five rials"], "The shopkeeper says: 'The pen is one rial.'"),
        m("How many pencils does the boy want?", ["four", "fourteen", "forty"], "The boy says: 'I want four pencils.'"),
        m("How much is one pencil?", ["two hundred baisa", "five hundred baisa", "one rial"], "The shopkeeper says: 'Each pencil is two hundred baisa.'"),
        m("How much are the four pencils?", ["eight hundred baisa", "two hundred baisa", "four rials"], "Four pencils at two hundred baisa each is eight hundred baisa."),
        m("How many notebooks does he buy?", ["two", "three", "one"], "The boy says: 'Two notebooks, please.'"),
        m("What is the total price?", ["seven rials and eight hundred baisa", "five rials", "eight rials"], "The shopkeeper says: 'That is seven rials and eight hundred baisa.'"),
        f("The boy pays with a ___ rial note. Type the number as a word.", "ten", "The boy says: 'Here is ten rials.'"),
        m("How much change does the boy get?", ["two rials and two hundred baisa", "five rials", "one rial"], "The shopkeeper says: 'Your change is two rials and two hundred baisa.'"),
        tf("The shop is open until nine o'clock.", true, "The shopkeeper says: 'We are open until nine o'clock.'")
      ], { audio_text: "Boy: Good morning. How much is the notebook, please?\nShopkeeper: Good morning. The notebook is three rials and the pen is one rial.\nBoy: I want two notebooks, one pen and four pencils.\nShopkeeper: Each pencil is two hundred baisa. So the four pencils are eight hundred baisa.\nBoy: How much is that altogether?\nShopkeeper: That is seven rials and eight hundred baisa.\nBoy: Here is ten rials.\nShopkeeper: Thank you. Your change is two rials and two hundred baisa. We are open until nine o'clock." }),
      T("Phone Numbers and Addresses", "Listen to the conversation, then answer the 10 questions.", [
        m("What is the caller's name?", ["Hamad", "Hamid", "Ahmed"], "The caller says: 'My name is Hamad.'"),
        m("How old is Hamad?", ["thirteen", "thirty", "fifty"], "The caller says: 'I am thirteen years old.'"),
        m("What is his house number?", ["forty-five", "fourteen", "fifty-four"], "The caller says: 'My house number is forty-five.'"),
        m("Which street does he live on?", ["Palm Street", "Beach Street", "School Street"], "The caller says: 'I live on Palm Street.'"),
        m("What is the first number of his phone number?", ["nine", "five", "seven"], "The phone number starts with 'nine'."),
        m("What is the last number of his phone number?", ["six", "eight", "two"], "The phone number ends with 'six'."),
        m("How many digits are in the phone number?", ["eight", "six", "ten"], "Hamad says: nine, two, three, four, five, six, seven, six. That is eight digits."),
        f("His postcode is one ___ one. Type the number as a word.", "two", "The postcode is 'one two one'."),
        tf("Hamad lives in Nizwa.", false, "The caller says: 'I live in Sohar.'"),
        m("Why is Hamad calling?", ["to join the football club", "to buy a phone", "to book a taxi"], "The caller says: 'I want to join the football club.'")
      ], { audio_text: "Receptionist: Hello. This is the Sports Club. How can I help you?\nHamad: Hello. My name is Hamad. I want to join the football club.\nReceptionist: How old are you, Hamad?\nHamad: I am thirteen years old.\nReceptionist: Where do you live?\nHamad: I live in Sohar. My house number is forty-five, on Palm Street. The postcode is one two one.\nReceptionist: And your phone number?\nHamad: It is nine two three four five six seven six.\nReceptionist: Thank you, Hamad. We will call you." }),
      T("The Bus Timetable", "Listen to the announcement, then answer the 10 questions.", [
        m("Where does the first bus go?", ["to Muscat", "to Nizwa", "to Sohar"], "The announcement says: 'The first bus goes to Muscat.'"),
        m("What time does the Muscat bus leave?", ["7:30", "7:15", "7:45"], "The announcement says: 'at half past seven'."),
        m("What time does the Nizwa bus leave?", ["8:45", "8:15", "9:00"], "The announcement says: 'at quarter to nine'."),
        m("Which platform is the Sohar bus at?", ["platform five", "platform three", "platform fifteen"], "The announcement says: 'platform five'."),
        m("What time does the Sohar bus leave?", ["10:00", "10:30", "9:00"], "The announcement says: 'at ten o'clock'."),
        f("The Salalah bus leaves at quarter ___ eleven. Type the word.", "past", "The announcement says: 'quarter past eleven'."),
        m("What time is 'quarter past eleven'?", ["11:15", "10:45", "11:45"], "Quarter past eleven is 11:15."),
        m("How much is a ticket to Muscat?", ["two rials", "twelve rials", "twenty rials"], "The announcement says: 'a ticket to Muscat is two rials'."),
        tf("The Nizwa bus is cheaper than the Muscat bus.", false, "The Nizwa ticket is three rials. The Muscat ticket is two rials. Nizwa is more expensive."),
        m("Where can passengers buy tickets?", ["at the office", "on the bus only", "at the bank"], "The announcement says: 'You can buy tickets at the ticket office.'")
      ], { audio_text: "Attention please. This is the bus station announcement. The first bus goes to Muscat. It leaves at half past seven. A ticket to Muscat is two rials. The Nizwa bus leaves at quarter to nine. A ticket to Nizwa is three rials. The Sohar bus is at platform five and it leaves at ten o'clock. The Salalah bus leaves at quarter past eleven. You can buy tickets at the ticket office. Thank you." }),
      T("A Birthday Invitation", "Listen to the message, then answer the 10 questions.", [
        m("Whose birthday is it?", ["Younis's", "Hamad's", "Salim's"], "The message says: 'It is my birthday.' It is Younis speaking."),
        m("How old will Younis be?", ["fifteen", "fifty", "fourteen"], "Younis says: 'I will be fifteen.'"),
        m("What day is the party?", ["Thursday", "Tuesday", "Saturday"], "Younis says: 'The party is on Thursday.'"),
        m("What is the date?", ["the twelfth of March", "the second of March", "the twentieth of March"], "Younis says: 'the twelfth of March'."),
        m("What time does the party start?", ["4:30", "4:15", "5:30"], "Younis says: 'at half past four'."),
        m("What time does the party finish?", ["7:00", "6:00", "8:00"], "Younis says: 'at seven o'clock'."),
        f("The party is at Younis's ___ . Type the place.", "house", "Younis says: 'The party is at my house.'"),
        m("How many friends will come?", ["ten", "twelve", "two"], "Younis says: 'ten friends'."),
        m("What should the friends bring?", ["a football", "a cake", "a gift for the school"], "Younis says: 'Please bring a football.'"),
        tf("Younis asks his friends to phone him.", true, "Younis says: 'Please phone me on Wednesday.'")
      ], { audio_text: "Hello Hamad. This is Younis. It is my birthday on the twelfth of March. I will be fifteen. I want to invite you to my party. The party is on Thursday, the twelfth of March. It starts at half past four and it finishes at seven o'clock. The party is at my house. Ten friends will come. We will play football in the garden, so please bring a football. Please phone me on Wednesday and tell me if you can come. Thank you. Goodbye." }),
      T("Numbers at School", "Listen to the headteacher, then answer the 10 questions.", [
        m("How many students are in the school?", ["four hundred", "forty", "fourteen"], "The headteacher says: 'We have four hundred students.'"),
        m("How many teachers are in the school?", ["thirty", "thirteen", "fifty"], "The headteacher says: 'We have thirty teachers.'"),
        m("How many classes are there?", ["sixteen", "sixty", "six"], "The headteacher says: 'There are sixteen classes.'"),
        m("How many students are in each class?", ["twenty-five", "fifteen", "thirty-five"], "The headteacher says: 'Each class has twenty-five students.'"),
        m("What time does school start?", ["7:00", "7:30", "8:00"], "The headteacher says: 'School starts at seven o'clock.'"),
        m("What time is the break?", ["10:15", "10:50", "9:45"], "The headteacher says: 'The break is at quarter past ten.'"),
        m("How long is the break?", ["twenty minutes", "fifteen minutes", "thirty minutes"], "The headteacher says: 'The break is twenty minutes.'"),
        m("What time does school finish?", ["1:30", "2:30", "1:00"], "The headteacher says: 'School finishes at half past one.'"),
        f("The school opened in nineteen ninety-___ . Type the number as a word.", "five", "The headteacher says: 'The school opened in nineteen ninety-five.'"),
        tf("The school library is open until three o'clock.", true, "The headteacher says: 'The library is open until three o'clock.'")
      ], { audio_text: "Good morning, students. Today I want to give you some information about our school. We have four hundred students and thirty teachers. There are sixteen classes, and each class has twenty-five students. School starts at seven o'clock. The break is at quarter past ten, and it is twenty minutes long. School finishes at half past one. The library is open until three o'clock, so you can study there after school. Our school opened in nineteen ninety-five. Thank you for listening." })
    ]
  };
})(window.EPZ_EASY);
