/* Easy Level / Vocabulary / Part 2: Food and Drinks */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-2"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "🍚", h: "Food and drinks", p: ["We eat **food** and we drink **drinks** every day.", "In this Part you learn 16 useful words for meals. Listen to each word and say it aloud."], ex: [["I eat **rice** and **chicken** for lunch."], ["She drinks **tea** with milk."]] },
      { k: "words", kick: "Word list 1", h: "Things we eat", items: [["🍚", "rice", "small white grains we cook and eat", "RYSS", "We eat **rice** with fish."], ["🍞", "bread", "food made from flour and baked", "BRED", "I eat **bread** for breakfast."], ["🍗", "chicken", "meat from a farm bird", "CHIK-in", "My mother cooks **chicken** on Fridays."], ["🐟", "fish", "an animal from the sea we can eat", "FISH", "We eat **fish** at the beach."], ["🥚", "egg", "an oval food from a chicken", "EG", "He has an **egg** for breakfast."], ["🧀", "cheese", "a food made from milk", "CHEEZ", "I like **cheese** with bread."], ["🍎", "apple", "a round red or green fruit", "AP-ul", "An **apple** is good for you."], ["🍌", "banana", "a long yellow fruit", "buh-NAH-nuh", "The monkey eats a **banana**."]] },
      { k: "words", kick: "Word list 2", h: "Drinks, soup and more", items: [["💧", "water", "the clear drink we need to live", "WAW-ter", "I drink **water** every day."], ["🥛", "milk", "a white drink from cows", "MILK", "The baby drinks **milk**."], ["🧃", "juice", "a drink made from fruit", "JOOSS", "I like orange **juice**."], ["🍵", "tea", "a hot drink made with leaves", "TEE", "My father drinks **tea**."], ["☕", "coffee", "a hot brown drink", "KOF-ee", "Omani **coffee** is famous."], ["🍲", "soup", "a hot food you eat with a spoon", "SOOP", "The **soup** is hot."], ["🥗", "salad", "cold vegetables mixed together", "SAL-ud", "We eat **salad** with lunch."], ["", "dates", "sweet brown fruit from palm trees", "DAYTS", "We eat **dates** with coffee."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["For **breakfast** I eat an **egg** and **bread**.", "breakfast"], ["For **lunch** we eat **rice** and **chicken**.", "lunch"], ["For **dinner** we have **soup** and **salad**.", "dinner"], ["I am thirsty. I need a glass of **water**.", "thirsty"], ["Guests drink **coffee** and eat **dates** in Oman.", "coffee, dates"]] },
      { k: "table", kick: "Word groups", h: "Food groups", head: ["Group", "Words"], rows: [["**fruit**", "apple, banana, dates"], ["**drinks**", "water, milk, juice, tea, coffee"], ["**meat and fish**", "chicken, fish"], ["**other food**", "rice, bread, egg, cheese, soup, salad"]] },
      { k: "table", kick: "Word groups", h: "Meals of the day", head: ["Meal", "When", "Example"], rows: [["**breakfast**", "in the morning", "egg and bread"], ["**lunch**", "in the middle of the day", "rice and chicken"], ["**dinner**", "in the evening", "soup and salad"]] },
      { k: "tip", h: "Memory tips", items: ["Say **drink** with liquids (water, tea, milk) and **eat** with food (rice, bread, egg). We **eat** soup with a spoon.", "Picture each word: see a red **apple**, a yellow **banana**, a glass of white **milk**.", "Group the words: fruit, drinks, meat. Groups are easier to remember."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Which one is a drink?", ["milk", "bread", "cheese"], "Milk is a drink. Bread and cheese are food."), mi("🍚", "What is this?", ["rice", "bread", "egg"], "The picture shows rice."), f("A long yellow fruit is a ___ .", "banana", "A banana is a long yellow fruit."), tf("We eat soup with a spoon.", true, "Soup is a hot food we eat with a spoon.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the word that matches each meaning.", [
        m("A white drink from cows.", ["milk", "juice", "tea"], "Milk is a white drink from cows."),
        m("A long yellow fruit.", ["banana", "apple", "cheese"], "A banana is a long yellow fruit."),
        m("A food made from milk.", ["cheese", "rice", "bread"], "Cheese is made from milk."),
        m("A hot brown drink.", ["coffee", "juice", "water"], "Coffee is a hot brown drink."),
        m("The clear drink we need to live.", ["water", "soup", "tea"], "We need water to live."),
        m("Sweet brown fruit from palm trees.", ["dates", "apples", "eggs"], "Dates grow on palm trees."),
        m("Food made from flour and baked.", ["bread", "fish", "salad"], "Bread is made from flour."),
        m("Small white grains we cook and eat.", ["rice", "egg", "chicken"], "Rice is small white grains."),
        tf("An egg comes from a chicken.", true, "Chickens lay eggs."),
        tf("Juice is a kind of food.", false, "Juice is a drink, not a solid food.")
      ]),
      T("Picture words", "Look at the picture and choose the word.", [
        mi("🍚", "What is this?", ["rice", "bread", "soup"], "The picture shows rice."),
        mi("🍞", "What is this?", ["bread", "cheese", "egg"], "The picture shows bread."),
        mi("🍗", "What is this?", ["chicken", "fish", "apple"], "The picture shows chicken."),
        mi("🐟", "What is this?", ["fish", "chicken", "banana"], "The picture shows a fish."),
        mi("🥚", "What is this?", ["egg", "rice", "cheese"], "The picture shows an egg."),
        mi("🍎", "What is this?", ["apple", "banana", "juice"], "The picture shows an apple."),
        mi("🥛", "What is this?", ["milk", "water", "coffee"], "The picture shows milk."),
        mi("🍵", "What is this?", ["tea", "soup", "juice"], "The picture shows tea."),
        mi("🍲", "What is this?", ["soup", "salad", "rice"], "The picture shows soup."),
        fi("🥗", "Type the word for this picture.", "salad", "The picture shows a salad.")
      ]),
      T("Complete the sentences", "Choose or type the missing word.", [
        m("I am thirsty. I need a glass of ___ .", ["water", "rice", "chicken"], "You drink water when you are thirsty."),
        m("For lunch we eat rice and ___ .", ["chicken", "tea", "juice"], "Rice and chicken is a popular lunch. Tea and juice are drinks."),
        m("The ___ is very hot. Be careful!", ["soup", "salad", "cheese"], "Soup is a hot food."),
        m("The monkey is eating a ___ .", ["banana", "milk", "bread"], "Monkeys like bananas."),
        m("He drinks ___ every morning. It is a hot brown drink.", ["coffee", "juice", "milk"], "Coffee is hot and brown."),
        f("We eat ___ with Omani coffee. They are sweet and brown.", "dates", "Dates are sweet and brown."),
        f("I have an ___ for breakfast.", "egg", "An egg is a common breakfast food."),
        m("We eat breakfast in the ___ .", ["morning", "evening", "night"], "Breakfast is the morning meal."),
        m("Dinner is the meal we eat in the ___ .", ["evening", "morning", "afternoon"], "Dinner is the evening meal."),
        m("We use a spoon to eat ___ .", ["soup", "bread", "an apple"], "Soup is a food we eat with a spoon.")
      ]),
      T("Odd one out and groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["milk", "tea", "bread"], "Milk and tea are drinks. Bread is food."),
        m("Which word is different?", ["apple", "banana", "rice"], "Apple and banana are fruit. Rice is not fruit."),
        m("Which word is different?", ["chicken", "fish", "juice"], "Chicken and fish are meat and fish. Juice is a drink."),
        m("Which one is a fruit?", ["apple", "cheese", "egg"], "An apple is a fruit."),
        m("Which one is a drink?", ["coffee", "soup", "salad"], "Coffee is a drink."),
        mt("Match each word with its group.", [["apple", "fruit"], ["milk", "drink"], ["chicken", "meat"], ["breakfast", "meal"]], "Think about what group each word belongs to."),
        tf("Dates are a kind of fruit.", true, "Dates are a sweet fruit."),
        tf("Breakfast is the meal we eat in the evening.", false, "Breakfast is in the morning. Dinner is in the evening."),
        m("Which word is a meal of the day?", ["lunch", "banana", "water"], "Lunch is a meal."),
        m("Which two words are both drinks?", ["tea and juice", "rice and tea", "egg and milk"], "Tea and juice are both drinks.")
      ]),
      T("Mixed review", "Different kinds of questions about food and drinks.", [
        m("What is the plural of 'egg'?", ["eggs", "egges", "egg's"], "Add s to make most nouns plural: eggs."),
        m("What is the plural of 'banana'?", ["bananas", "bananaes", "bananies"], "Add s to make most nouns plural: bananas."),
        f("Cold vegetables mixed together are a ___ .", "salad", "A salad is cold vegetables mixed together."),
        c("I drink bread every morning.", "I eat bread every morning.", "We eat bread. We drink tea or milk."),
        b("Put the words in the correct order.", "She drinks milk every day.", "Subject + verb + object + time."),
        m("Which sentence is correct?", ["We eat rice for lunch.", "We drink rice for lunch.", "We drink bread for lunch."], "We eat rice. We drink liquids."),
        tf("Milk and juice are drinks.", true, "Milk and juice are both drinks."),
        mt("Match each word with its meaning.", [["juice", "a drink made from fruit"], ["cheese", "food made from milk"], ["tea", "a hot drink made with leaves"], ["salad", "cold vegetables"]], "Match each word with what it is."),
        m("Which word means the clear drink we need to live?", ["water", "juice", "milk"], "We need water to live."),
        m("Which meal do we usually eat first in the day?", ["breakfast", "lunch", "dinner"], "Breakfast is the first meal of the day.")
      ])
    ]
  };
})(window.EPZ_EASY);
