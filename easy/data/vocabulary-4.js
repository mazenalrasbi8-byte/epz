/* Easy Level / Vocabulary / Part 4: School and Education */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-4"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "🏫", h: "School and education", p: ["We learn many things at **school**. We meet teachers and friends, and we use books, pens and notebooks.", "In this Part you learn 16 school words. Listen to each word and say it aloud."], ex: [["The **teacher** writes on the **board**."], ["I do my **homework** after school."]] },
      { k: "words", kick: "Word list 1", h: "People and places", items: [["🏫", "school", "a place where children learn", "SKOOL", "I go to **school** by bus."], ["🧑‍🏫", "teacher", "a person who teaches students", "TEE-cher", "The **teacher** explains the lesson."], ["🧑‍🎓", "student", "a person who studies at school", "STOO-dunt", "Every **student** has a book."], ["", "classroom", "a room where a class has lessons", "KLASS-room", "Our **classroom** is on the second floor."], ["📚", "library", "a place with many books you can read or borrow", "LY-brer-ee", "I read in the **library**."], ["📖", "book", "pages with words, for reading", "BUK", "This **book** has many pictures."], ["", "desk", "a table where a student sits and writes", "DESK", "My **desk** is near the window."], ["", "board", "a big flat surface the teacher writes on", "BORD", "Look at the **board**."]] },
      { k: "words", kick: "Word list 2", h: "Things we use and do", items: [["🖊️", "pen", "a tool for writing with ink", "PEN", "Write your name with a **pen**."], ["✏️", "pencil", "a tool for writing or drawing that you can rub out", "PEN-sul", "I draw with a **pencil**."], ["📓", "notebook", "a book with empty pages to write in", "NOHT-buk", "I write new words in my **notebook**."], ["🎒", "bag", "something you use to carry your things", "BAG", "My **bag** is heavy."], ["📏", "ruler", "a tool for drawing straight lines", "ROO-ler", "Use a **ruler** to draw a line."], ["", "lesson", "a time when a teacher teaches", "LES-un", "The English **lesson** starts at eight."], ["", "homework", "school work you do at home", "HOHM-werk", "I finish my **homework** at five."], ["📝", "exam", "a test to show what you know", "ig-ZAM", "We have an **exam** on Sunday."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["I am a **student**. I go to **school** every day.", "student, school"], ["The **teacher** writes the date on the **board**.", "teacher, board"], ["I carry my **book**, **notebook** and **pen** in my **bag**.", "things in a bag"], ["After school I do my **homework** at my **desk**.", "homework, desk"], ["We have an English **lesson** in the **classroom**.", "lesson, classroom"]] },
      { k: "table", kick: "Word groups", h: "School word groups", head: ["Group", "Words"], rows: [["**people**", "teacher, student"], ["**places**", "school, classroom, library"], ["**things to write with**", "pen, pencil, ruler"], ["**things to read or write in**", "book, notebook"], ["**work and tests**", "lesson, homework, exam"]] },
      { k: "table", kick: "Word groups", h: "Where is it?", head: ["Place", "What we do there"], rows: [["**classroom**", "learn and listen to the teacher"], ["**library**", "read and borrow books"], ["**school**", "study and meet friends"], ["**desk**", "sit and write"]] },
      { k: "tip", h: "Memory tips", items: ["**home** + **work** = **homework**. It is work for home. **Class** + **room** = **classroom**.", "A **pen** writes with ink. A **pencil** can be rubbed out.", "Draw the words in your notebook: a pen, a ruler, a bag."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which word means 'a person who teaches'?", ["teacher", "student", "desk"], "A teacher teaches students."), mi("📏", "What is this?", ["ruler", "pen", "bag"], "The picture shows a ruler."), f("A test to show what you know is an ___ .", "exam", "An exam is a test."), tf("We borrow books from the library.", true, "A library has many books.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the word that matches each meaning.", [
        m("A person who teaches students.", ["teacher", "student", "driver"], "A teacher teaches."),
        m("A person who studies at school.", ["student", "teacher", "doctor"], "A student studies."),
        m("A place with many books you can borrow.", ["library", "classroom", "desk"], "A library has many books."),
        m("A tool for drawing straight lines.", ["ruler", "pen", "bag"], "A ruler is for straight lines."),
        m("School work you do at home.", ["homework", "lesson", "exam"], "Homework is work for home."),
        m("A test to show what you know.", ["exam", "lesson", "board"], "An exam is a test."),
        m("A book with empty pages to write in.", ["notebook", "library", "ruler"], "A notebook has empty pages."),
        m("A table where a student sits and writes.", ["desk", "bag", "board"], "A desk is for sitting and writing."),
        tf("A pencil can be rubbed out.", true, "You can rub out pencil writing."),
        tf("The teacher writes on the bag.", false, "The teacher writes on the board.")
      ]),
      T("Picture words", "Look at the picture and choose the word.", [
        mi("📖", "What is this?", ["book", "bag", "desk"], "The picture shows a book."),
        mi("🖊️", "What is this?", ["pen", "pencil", "ruler"], "The picture shows a pen."),
        mi("✏️", "What is this?", ["pencil", "pen", "board"], "The picture shows a pencil."),
        mi("🎒", "What is this?", ["bag", "book", "desk"], "The picture shows a bag."),
        mi("📏", "What is this?", ["ruler", "pen", "notebook"], "The picture shows a ruler."),
        mi("📓", "What is this?", ["notebook", "bag", "ruler"], "The picture shows a notebook."),
        mi("🏫", "What is this?", ["school", "library", "classroom"], "The picture shows a school."),
        mi("📝", "What is this?", ["exam", "lesson", "homework"], "The picture shows an exam paper."),
        mi("📚", "What is this?", ["library", "school", "desk"], "Many books together are a library."),
        fi("🧑‍🏫", "Type the word for this person.", "teacher", "The picture shows a teacher.")
      ]),
      T("Complete the sentences", "Choose or type the missing word.", [
        m("I carry my books in my ___ .", ["bag", "board", "desk"], "We carry books in a bag."),
        m("The teacher writes on the ___ .", ["board", "bag", "pen"], "A teacher writes on the board."),
        m("We have an English ___ at nine o'clock.", ["lesson", "ruler", "pencil"], "A lesson is a time when a teacher teaches."),
        m("I do my ___ at home after school.", ["homework", "classroom", "library"], "Homework is school work you do at home."),
        m("Please sit at your ___ .", ["desk", "pen", "exam"], "A student sits at a desk."),
        m("I write with a ___ and then rub it out.", ["pencil", "pen", "ruler"], "You can rub out pencil writing."),
        f("We read and borrow books in the ___ .", "library", "A library has many books."),
        f("I write new words in my ___ .", "notebook", "A notebook has empty pages for writing."),
        m("Every ___ must bring a book to class.", ["student", "teacher", "classroom"], "A student is a person who studies."),
        m("We will have an ___ on Sunday, so I must study.", ["exam", "desk", "bag"], "An exam is a test.")
      ]),
      T("Odd one out and groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["pen", "pencil", "classroom"], "Pen and pencil are things to write with. A classroom is a room."),
        m("Which word is different?", ["teacher", "student", "ruler"], "Teacher and student are people. A ruler is a thing."),
        m("Which word is different?", ["school", "library", "notebook"], "School and library are places. A notebook is a thing."),
        m("Which one is a person?", ["student", "board", "bag"], "A student is a person."),
        m("Which one is a place?", ["classroom", "pen", "exam"], "A classroom is a place."),
        mt("Match each word with its group.", [["teacher", "person"], ["library", "place"], ["pencil", "thing to write with"], ["exam", "test"]], "Think about what kind of word each one is."),
        tf("A library is a place with many books.", true, "Yes, a library has many books."),
        tf("A student teaches the lesson.", false, "A teacher teaches the lesson. A student learns."),
        m("Which two words are things to write with?", ["pen and pencil", "desk and board", "bag and library"], "Pen and pencil are for writing."),
        m("Which word comes from 'home' + 'work'?", ["homework", "classroom", "notebook"], "Homework = home + work.")
      ]),
      T("Mixed review", "A mix of school questions.", [
        m("What is the plural of 'student'?", ["students", "studentes", "studenties"], "Add s to make most nouns plural."),
        m("What is the plural of 'library'?", ["libraries", "librarys", "libraryes"], "Consonant + y changes to ies: libraries."),
        f("One book, two ___ .", "books", "Add s to make most nouns plural."),
        c("The student teach the lesson.", "The teacher teaches the lesson.", "A teacher teaches. A student learns."),
        b("Put the words in the correct order.", "I carry my books in my bag.", "Subject + verb + object + place."),
        m("Which sentence is correct?", ["I study in the library.", "I study in the pen.", "I study in the bag."], "A library is a place to study."),
        tf("A ruler is a person at school.", false, "A ruler is a tool, not a person."),
        mt("Match each word with its meaning.", [["homework", "school work at home"], ["lesson", "a time to learn with a teacher"], ["board", "where the teacher writes"], ["bag", "carries your things"]], "Match each word with what it is."),
        m("Where do students sit and learn?", ["classroom", "library", "bag"], "Students sit and learn in a classroom."),
        m("Which word means the place where children learn?", ["school", "exam", "desk"], "A school is a place where children learn.")
      ])
    ]
  };
})(window.EPZ_EASY);
