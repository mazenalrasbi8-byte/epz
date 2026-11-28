/* Easy Level / Reading / Part 3: Short Descriptions */
(function (E) {
  var h = E.h, m = h.m, tf = h.tf, f = h.f, T = h.T;
  E.parts["reading-3"] = {
    learn: [
      { k: "intro", kick: "Reading skills", e: "🖼️", h: "Reading short descriptions", p: ["A **description** tells us what a person, place, animal or thing is like.", "Descriptions use **adjectives** (tall, small, old, kind) to show colour, size, age and character. Find these words to answer the questions."], ex: [["My room is **small** and **blue**."], ["My friend is **tall** and **kind**."]] },
      { k: "passage", kick: "Read the text", h: "My bedroom", text: "My bedroom is **small** but **comfortable**. The walls are **light blue**. There is a **big** window near my bed. I have a **wooden** desk, a **red** chair and a **tall** bookshelf. My room is always **tidy** because I like it **clean**.", p: "The words in color are **adjectives**. They describe the room." },
      { k: "steps", kick: "Skill 1", h: "Find the main idea", q: "What is the text about?", items: [["Read the first sentence", "\"My bedroom is small but comfortable.\" This names the topic."], ["Notice the repeated idea", "All the adjectives describe the bedroom."], ["Choose the main idea", "The main idea is: a description of the writer's bedroom."]] },
      { k: "steps", kick: "Skill 2", h: "Find details with adjectives", q: "What colour are the walls?", items: [["Read the question", "**What colour** asks for a colour word."], ["Find the keywords", "The keywords are **colour** and **walls**."], ["Find the sentence", "\"The walls are **light blue**.\""], ["Choose the answer", "The answer is **light blue**."]] },
      { k: "table", kick: "Describing words", h: "What kind of word describes what?", head: ["It tells us about", "Adjectives", "Example"], rows: [["**size**", "big, small, tall, short, long", "a **tall** man"], ["**colour**", "red, blue, green, white", "a **red** car"], ["**age**", "old, new, young", "an **old** house"], ["**feelings and character**", "kind, happy, funny, quiet", "a **kind** teacher"], ["**how it feels or looks**", "soft, hard, clean, beautiful", "a **soft** bed"]] },
      { k: "examples", kick: "Skill 3", h: "Use clues to understand new words", items: [["The camel is **huge**. It is much bigger than a horse.", "huge = very big"], ["My grandmother is **elderly**. She is seventy-five years old.", "elderly = old"], ["The room is **spotless**. It is very clean.", "spotless = very clean"]], p: "The next sentence often **explains** the new word." },
      { k: "tip", h: "Reading tips", items: ["Underline the **adjectives**. They are the details you need.", "Read the question first, then look for the **noun** (person, place or thing) in the text.", "Remember: **a**/**an** + adjective + noun: a **small** house."] },
      { k: "practice", h: "Short practice", p: "Read the text and answer.", text: "My cat is **small** and **white**. She has **green** eyes. She is very **soft** and very **lazy**. She sleeps on my **old** blue sofa.", qs: [m("What colour is the cat?", ["white", "green", "blue"], "The text says: 'My cat is small and white.'"), m("What colour are her eyes?", ["green", "blue", "white"], "The text says: 'She has green eyes.'"), f("The cat sleeps on an old blue ___ .", "sofa", "The text says: 'She sleeps on my old blue sofa.'"), tf("The cat is very active.", false, "The text says she is 'very lazy', so she is not active.")] }
    ],
    tests: [
      T("My Room", "Read the text, then answer the 10 questions.", [
        m("How big is the bedroom?", ["small", "huge", "very big"], "The text says: 'My bedroom is small.'"),
        m("What colour are the walls?", ["light blue", "dark green", "white"], "The text says: 'The walls are light blue.'"),
        m("Where is the window?", ["near the bed", "near the door", "behind the desk"], "The text says: 'a big window near my bed.'"),
        m("What is the desk made of?", ["wood", "plastic", "metal"], "The text says: 'a wooden desk'."),
        m("What colour is the chair?", ["red", "blue", "black"], "The text says: 'a red chair'."),
        m("What is on the bookshelf?", ["books and a small lamp", "a television", "clothes"], "The text says: 'a tall bookshelf with many books and a small lamp.'"),
        tf("The room is untidy.", false, "The text says: 'My room is always tidy.'"),
        f("The writer likes his room ___ . Type the adjective from the text.", "clean", "The text says: 'because I like it clean.'"),
        m("In the text, 'comfortable' means ___ .", ["nice and easy to relax in", "very big", "very cold"], "The writer likes the room. 'Comfortable' means pleasant to be in."),
        m("What is the text mostly about?", ["the writer's bedroom", "a new house", "a school classroom"], "All the sentences describe the writer's bedroom.")
      ], { passage: "My bedroom is small but comfortable. The walls are light blue. There is a big window near my bed, so the room is bright in the morning. I have a wooden desk, a red chair and a tall bookshelf with many books and a small lamp. There is a soft grey carpet on the floor. My room is always tidy because I like it clean. I do my homework at my desk, and I read in bed at night." }),
      T("The Camel", "Read the text, then answer the 10 questions.", [
        m("Where do camels live?", ["in the desert", "in the sea", "in the forest"], "The text says: 'Camels live in hot deserts.'"),
        m("How big is a camel?", ["very tall", "very small", "very short"], "The text says: 'A camel is very tall.'"),
        m("What does a camel have on its back?", ["a hump or two", "wings", "a shell"], "The text says: 'It has one or two humps on its back.'"),
        m("What is stored in the hump?", ["fat", "water", "sand"], "The text says: 'The hump stores fat.'"),
        f("A camel can walk for many days without ___ . Type the word.", "water", "The text says: 'A camel can walk for many days without water.'"),
        tf("A camel has short legs.", false, "The text says: 'It has long legs.'"),
        m("What is the camel's fur like?", ["thick and light brown", "short and black", "white and soft"], "The text says: 'Its fur is thick and light brown.'"),
        m("Why does a camel have long eyelashes?", ["to keep sand out of its eyes", "to look beautiful", "to see in the dark"], "The text says: 'It has long eyelashes to keep sand out of its eyes.'"),
        m("In the text, 'patient' means a camel is ___ .", ["calm and does not get angry easily", "very fast", "very noisy"], "The text says camels are 'calm', so 'patient' means calm."),
        m("Which is the best title?", ["The Desert Animal", "A Fast Car", "My Pet Cat"], "The text describes the camel, an animal of the desert.")
      ], { passage: "Camels live in hot deserts. A camel is very tall and strong. It has one or two humps on its back. The hump stores fat, and the camel uses the fat when it cannot find food. A camel can walk for many days without water. It has long legs and wide feet, so it does not sink in the sand. Its fur is thick and light brown. It has long eyelashes to keep sand out of its eyes. Camels are patient and calm animals. In Oman, many people love camels and some families keep them as part of their culture." }),
      T("My Best Friend", "Read the text, then answer the 10 questions.", [
        m("How old is Khalid?", ["fifteen", "fourteen", "sixteen"], "The text says: 'Khalid is fifteen years old.'"),
        m("What does Khalid look like?", ["tall with short black hair", "short with long hair", "short with blond hair"], "The text says: 'He is tall and has short black hair.'"),
        m("What colour are his eyes?", ["brown", "blue", "green"], "The text says: 'He has big brown eyes.'"),
        m("What is Khalid like?", ["kind and funny", "quiet and shy", "angry and loud"], "The text says: 'He is kind and funny.'"),
        f("Khalid is good at ___ . Type the sport.", "football", "The text says: 'He is very good at football.'"),
        tf("Khalid is always late for school.", false, "The text says: 'He is never late for school.'"),
        m("What does Khalid do when his friends are sad?", ["He makes them laugh.", "He goes home.", "He shouts."], "The text says: 'When his friends are sad, he makes them laugh.'"),
        m("What does the writer like most about Khalid?", ["He is always honest.", "He has a nice car.", "He lives near the school."], "The text says: 'I like him most because he is always honest.'"),
        m("In the text, 'honest' means ___ .", ["he tells the truth", "he is funny", "he is tall"], "The text explains: 'he always tells the truth'."),
        m("What is the text mostly about?", ["the writer's best friend", "a football match", "a school trip"], "The text describes Khalid, the writer's best friend.")
      ], { passage: "My best friend is Khalid. He is fifteen years old. He is tall and has short black hair and big brown eyes. He wears glasses when he reads. Khalid is kind and funny. He is very good at football and he plays in the school team. He is never late for school. When his friends are sad, he makes them laugh. I like him most because he is always honest. He always tells the truth. We are in the same class and we sit next to each other." }),
      T("Salalah in Summer", "Read the text, then answer the 10 questions.", [
        m("Which city is the text about?", ["Salalah", "Sohar", "Nizwa"], "The text starts: 'Salalah is a beautiful city in the south of Oman.'"),
        m("What is the weather like in Salalah in summer?", ["cool and cloudy with light rain", "very hot and dry", "very cold"], "The text says: 'the weather is cool and cloudy and there is light rain.'"),
        m("What colour are the mountains in summer?", ["green", "brown", "white"], "The text says: 'the mountains and hills are green.'"),
        m("What is this season called?", ["khareef", "winter", "spring"], "The text says: 'This season is called khareef.'"),
        f("Many visitors come to Salalah to enjoy the ___ weather. Type the adjective.", "cool", "The text says: 'Many visitors come to enjoy the cool weather.'"),
        tf("The beaches in Salalah are dirty.", false, "The text says: 'The beaches are clean and quiet.'"),
        m("What can visitors buy at the market?", ["fruit and frankincense", "cars and phones", "shoes and bags"], "The text says: 'the markets sell fresh fruit and frankincense.'"),
        m("What do visitors often do in the evening?", ["walk by the sea", "go to school", "work on farms"], "The text says: 'In the evening many people walk by the sea.'"),
        m("In the text, 'fresh' fruit means fruit that is ___ .", ["new and not old", "very old", "very expensive"], "'Fresh' means recently picked, so it is new."),
        m("Which is the best title?", ["Summer in Salalah", "A Winter Trip", "The Desert at Night"], "The text describes Salalah in the summer.")
      ], { passage: "Salalah is a beautiful city in the south of Oman. In summer, the weather in most of Oman is very hot, but in Salalah it is different. The weather is cool and cloudy and there is light rain. The mountains and hills are green. This season is called khareef. Many visitors come to enjoy the cool weather. The beaches are clean and quiet, and the markets sell fresh fruit and frankincense. In the evening many people walk by the sea and drink coconut water." }),
      T("A New Bicycle", "Read the text, then answer the 10 questions.", [
        m("What colour is Hamad's new bicycle?", ["red", "blue", "black"], "The text says: 'It is red.'"),
        m("Who gave Hamad the bicycle?", ["his uncle", "his father", "his teacher"], "The text says: 'His uncle gave it to him for his birthday.'"),
        m("How many gears does it have?", ["twenty-one", "seven", "ten"], "The text says: 'It has twenty-one gears.'"),
        m("What is the seat like?", ["soft", "hard", "very high"], "The text says: 'The seat is soft.'"),
        f("The bicycle has a small ___ on the front. Type the word.", "light", "The text says: 'It has a small light on the front.'"),
        tf("The bicycle is heavy.", false, "The text says: 'It is light, so Hamad can carry it up the stairs.'"),
        m("Where does Hamad ride his bicycle?", ["to school and in the park", "only at night", "only on the beach"], "The text says: 'He rides it to school and in the park.'"),
        m("What does Hamad do before he rides?", ["He puts on a helmet.", "He washes the bicycle.", "He sleeps."], "The text says: 'He always puts on his helmet.'"),
        m("In the text, 'gears' help the bicycle ___ .", ["go up hills more easily", "stand still", "make music"], "The text says the gears help him go up hills easily."),
        m("What is the text mostly about?", ["Hamad's new bicycle", "a bicycle race", "a bicycle shop"], "All the sentences describe Hamad's new bicycle.")
      ], { passage: "Hamad has a new bicycle. His uncle gave it to him for his birthday. It is red and it looks very modern. It has twenty-one gears, so it is easy to go up hills. The seat is soft and comfortable. It has a small light on the front and a bell. The bicycle is light, so Hamad can carry it up the stairs. He rides it to school and in the park. He always puts on his helmet because safety is important. Hamad loves his new bicycle and takes very good care of it." })
    ]
  };
})(window.EPZ_EASY);
