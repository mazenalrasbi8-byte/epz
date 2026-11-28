/* Easy Level / Vocabulary / Part 1: Family Members */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-1"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "👨‍👩‍👧‍👦", h: "Family members", p: ["Your **family** is the group of people you are related to.", "In this Part you learn 16 words for the people in a family. Listen to each word and say it aloud."], ex: [["My **father** and my **mother** are teachers."], ["I have one **brother** and two **sisters**."]] },
      { k: "words", kick: "Word list 1", h: "Close family", items: [["👨", "father", "your male parent", "FAH-ther", "My **father** works in a bank."], ["👩", "mother", "your female parent", "MUTH-er", "My **mother** cooks very well."], ["👦", "brother", "a boy with the same parents as you", "BRUTH-er", "My **brother** is ten years old."], ["👧", "sister", "a girl with the same parents as you", "SIS-ter", "My **sister** reads many books."], ["👴", "grandfather", "the father of your mother or father", "GRAND-fah-ther", "My **grandfather** lives in Nizwa."], ["👵", "grandmother", "the mother of your mother or father", "GRAND-muth-er", "My **grandmother** tells nice stories."], ["", "uncle", "the brother of your mother or father", "UNG-kul", "My **uncle** has a big car."], ["", "aunt", "the sister of your mother or father", "ANT", "My **aunt** lives in Muscat."]] },
      { k: "words", kick: "Word list 2", h: "More family words", items: [["", "cousin", "the child of your uncle or aunt", "KUZ-in", "My **cousin** is in my class."], ["👦", "son", "a boy who is the child of someone", "SUN", "Mr. Salem has one **son**."], ["👧", "daughter", "a girl who is the child of someone", "DAW-ter", "Her **daughter** is five."], ["", "husband", "a married man", "HUZ-bund", "Her **husband** is a doctor."], ["", "wife", "a married woman", "WYF", "His **wife** is a teacher."], ["👨‍👩", "parents", "your mother and father", "PAIR-ents", "My **parents** are kind."], ["👶", "baby", "a very young child", "BAY-bee", "The **baby** is sleeping."], ["👪", "family", "parents, children and relatives", "FAM-i-lee", "I have a big **family**."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["My name is Hamad. I have a big **family**.", "family"], ["My **father** and **mother** are my **parents**.", "parents"], ["I have two **brothers** and one **sister**.", "brothers, sister"], ["My **grandfather** and **grandmother** live in a village.", "grandparents"], ["My **uncle** has a **son**. He is my **cousin**.", "uncle, son, cousin"]] },
      { k: "table", kick: "Word groups", h: "Man or woman?", head: ["Man or boy", "Woman or girl"], rows: [["**father**", "**mother**"], ["**brother**", "**sister**"], ["**grandfather**", "**grandmother**"], ["**uncle**", "**aunt**"], ["**son**", "**daughter**"], ["**husband**", "**wife**"]] },
      { k: "table", kick: "Word groups", h: "Group words", head: ["Group word", "It means"], rows: [["**parents**", "mother + father"], ["**grandparents**", "grandfather + grandmother"], ["**siblings**", "brothers and sisters"], ["**children**", "sons and daughters"], ["**relatives**", "all the people in your extended family"]] },
      { k: "tip", h: "Memory tips", items: ["**grand** means one step older. Your father's father is your **grand**father.", "Your **uncle** and **aunt** are the brothers and sisters of your parents. Their children are your **cousins**.", "Learn words in pairs: father → mother, brother → sister, son → daughter."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Your mother's sister is your ___ .", ["aunt", "cousin", "wife"], "The sister of your mother or father is your aunt."), m("Which word means 'a girl who is the child of someone'?", ["daughter", "sister", "wife"], "A daughter is a girl who is someone's child."), f("The male word for 'aunt' is ___ .", "uncle", "Uncle is the male word for aunt."), tf("'Parents' means your mother and your father.", true, "Parents are your mother and father.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the correct family word.", [
        m("Your father's brother is your ___ .", ["uncle", "cousin", "grandfather"], "The brother of your father is your uncle."),
        m("Your mother's mother is your ___ .", ["grandmother", "aunt", "sister"], "The mother of your mother is your grandmother."),
        m("A boy with the same parents as you is your ___ .", ["brother", "cousin", "son"], "A boy with the same parents is your brother."),
        m("The child of your uncle is your ___ .", ["cousin", "brother", "son"], "The child of your uncle or aunt is your cousin."),
        m("Your mother and father are your ___ .", ["parents", "cousins", "children"], "Mother and father together are your parents."),
        m("The man married to your mother is your ___ .", ["father", "uncle", "brother"], "The man married to your mother is your father."),
        m("Your father's sister is your ___ .", ["aunt", "mother", "cousin"], "The sister of your father is your aunt."),
        m("Which word means a very young child?", ["baby", "parents", "husband"], "A baby is a very young child."),
        tf("A daughter is a girl who is the child of someone.", true, "Daughter is the word for a girl child."),
        tf("Your grandfather is the brother of your father.", false, "The brother of your father is your uncle. The father of your father is your grandfather.")
      ]),
      T("Man or woman?", "Match and choose the male and female words.", [
        mt("Match the male word with the female word.", [["father", "mother"], ["brother", "sister"], ["uncle", "aunt"], ["son", "daughter"]], "Each pair has a male and a female word."),
        m("What is the female word for 'brother'?", ["sister", "aunt", "mother"], "Brother → sister."),
        m("What is the female word for 'son'?", ["daughter", "wife", "aunt"], "Son → daughter."),
        m("What is the female word for 'grandfather'?", ["grandmother", "mother", "aunt"], "Grandfather → grandmother."),
        m("What is the male word for 'wife'?", ["husband", "uncle", "son"], "Wife → husband."),
        m("Which word is for a man?", ["uncle", "aunt", "sister"], "Uncle is a man. Aunt and sister are women."),
        m("Which word is for a woman?", ["mother", "father", "brother"], "Mother is a woman. Father and brother are men."),
        tf("'Aunt' is a word for a man.", false, "Aunt is a woman. The word for a man is uncle."),
        f("The female word for 'uncle' is ___ .", "aunt", "Uncle → aunt."),
        f("The male word for 'wife' is ___ .", "husband", "Wife → husband.")
      ]),
      T("Complete the sentences", "Choose or type the missing word.", [
        m("Ali's father is my uncle. Ali is my ___ .", ["cousin", "brother", "son"], "The child of your uncle is your cousin."),
        m("We visit our ___ in the village. They are my father's parents.", ["grandparents", "cousins", "children"], "The parents of your parents are your grandparents."),
        m("My sister has a baby girl. The baby is my sister's ___ .", ["daughter", "mother", "aunt"], "A baby girl is her daughter."),
        m("I have two brothers and one sister. They are my ___ .", ["siblings", "parents", "cousins"], "Brothers and sisters are siblings."),
        m("Mr. Salem has a wife and two sons. The sons are his ___ .", ["children", "parents", "uncles"], "Sons and daughters are children."),
        f("My mother's husband is my ___ .", "father", "The husband of your mother is your father."),
        f("My father's mother is my ___ .", "grandmother", "The mother of your father is your grandmother."),
        f("My uncle's wife is my ___ .", "aunt", "The wife of your uncle is your aunt."),
        m("The ___ is sleeping in the small bed. He is only one year old.", ["baby", "uncle", "husband"], "A one-year-old child is a baby."),
        m("I live with my ___ : my father, my mother and my brother.", ["family", "uncle", "cousin"], "The people you live with are your family.")
      ]),
      T("Odd one out and word groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["table", "father", "mother"], "Father and mother are family words. Table is not."),
        m("Which word is different?", ["pen", "sister", "brother"], "Sister and brother are family words. Pen is not."),
        m("Which word is different?", ["aunt", "uncle", "bus"], "Aunt and uncle are family words. Bus is not."),
        m("Which word is a group word?", ["parents", "father", "mother"], "Parents means mother and father together."),
        m("Which word means 'brothers and sisters'?", ["siblings", "relatives", "uncles"], "Siblings are brothers and sisters."),
        mt("Match each group word with its meaning.", [["parents", "mother + father"], ["grandparents", "grandfather + grandmother"], ["siblings", "brothers and sisters"], ["children", "sons and daughters"]], "Group words name more than one person."),
        tf("'Grandparents' means your father and your mother.", false, "Grandparents are the parents of your parents."),
        tf("'Cousin' is the child of your uncle or aunt.", true, "Your cousins are the children of your uncles and aunts."),
        m("Which two words are a male and female pair?", ["husband and wife", "father and uncle", "son and brother"], "A husband is a man and a wife is a woman."),
        m("Which word does NOT mean a person in your family?", ["teacher", "cousin", "daughter"], "A teacher is a job. It is not a family word.")
      ]),
      T("Mixed review", "A mix of family questions.", [
        m("What is the plural of 'family'?", ["families", "familys", "familyes"], "Consonant + y changes to ies: families."),
        f("My mother and father are my ___ .", "parents", "Mother and father are your parents."),
        m("Which word is for a married woman?", ["wife", "daughter", "aunt"], "A wife is a married woman."),
        c("She is my brother.", "She is my sister.", "A girl with the same parents is a sister, not a brother."),
        m("Which sentence is correct?", ["She is my sister.", "She is my uncle.", "She is my father."], "Sister is a female word. Uncle and father are male words."),
        b("Put the words in the correct order.", "My grandmother lives in Salalah.", "Subject + verb + place."),
        tf("A husband and a wife are married.", true, "A husband and a wife are a married couple."),
        m("Your grandfather's wife is your ___ .", ["grandmother", "aunt", "mother"], "The wife of your grandfather is usually your grandmother."),
        mt("Match each family word with the right sentence.", [["cousin", "He is the son of my aunt."], ["baby", "She is one year old."], ["wife", "She is married to my uncle."], ["son", "He is the child of my father."]], "Think about each family word."),
        tf("'Siblings' means only brothers.", false, "Siblings are brothers and sisters.")
      ])
    ]
  };
})(window.EPZ_EASY);
