/* Easy Level / Vocabulary / Part 7: Places Around Us */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-7"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "🏙️", h: "Places around us", p: ["We go to many different **places** in our town or village. Each place has a special use.", "In this Part you learn 16 place words. Listen to each word and say it aloud."], ex: [["We buy food at the **market**."], ["The doctor works in the **hospital**."]] },
      { k: "words", kick: "Word list 1", h: "Home, school and town", items: [["🏠", "house", "a building where a family lives", "HOWSS", "My **house** has three bedrooms."], ["🏫", "school", "a place where students learn", "SKOOL", "The **school** opens at seven."], ["🕌", "mosque", "a place where Muslims pray", "MOSK", "We pray at the **mosque**."], ["🏥", "hospital", "a place where doctors help sick people", "HOS-pi-tul", "The nurse works in the **hospital**."], ["🏪", "shop", "a small place where we buy things", "SHOP", "I buy bread at the **shop**."], ["🛒", "market", "a big place with many shops or stalls", "MAR-kit", "The fish **market** is busy."], ["🌳", "park", "a green place where people walk and play", "PARK", "We play football in the **park**."], ["🏦", "bank", "a place where we keep money", "BANGK", "My father works at the **bank**."]] },
      { k: "words", kick: "Word list 2", h: "More places", items: [["📚", "library", "a place with books to read and borrow", "LY-brer-ee", "I read at the **library**."], ["🍽️", "restaurant", "a place where we eat a meal and pay", "RES-tuh-rant", "We eat lunch at a **restaurant**."], ["✈️", "airport", "a place where planes take off and land", "AIR-port", "The plane lands at the **airport**."], ["🏖️", "beach", "a sandy place next to the sea", "BEECH", "We swim at the **beach**."], ["🌾", "farm", "land where people grow food and keep animals", "FARM", "The cows live on the **farm**."], ["✉️", "post office", "a place where we send letters and parcels", "POHST OF-iss", "I send a letter at the **post office**."], ["🛣️", "street", "a road in a town with buildings on both sides", "STREET", "The **street** is full of cars."], ["🏙️", "city", "a large town with many people", "SIT-ee", "Muscat is a **city**."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["I live in a **house** near the **mosque**.", "near"], ["My mother goes to the **market** to buy fruit and fish.", "market"], ["The **hospital** is next to the **park**.", "next to"], ["We fly from the **airport** and land at the **airport** in another city.", "airport"], ["On Friday we go to the **beach** and then to a **restaurant**.", "beach, restaurant"]] },
      { k: "table", kick: "Word groups", h: "What do we do there?", head: ["Place", "We ..."], rows: [["**school**", "learn"], ["**hospital**", "get help when we are sick"], ["**bank**", "keep money"], ["**market / shop**", "buy things"], ["**restaurant**", "eat a meal"], ["**post office**", "send letters"], ["**library**", "read books"], ["**airport**", "travel by plane"]] },
      { k: "table", kick: "Word groups", h: "Big or small?", head: ["Small", "Big"], rows: [["street", "city"], ["shop", "market"], ["house", "farm"]] },
      { k: "tip", h: "Memory tips", items: ["Connect each place with a person: **hospital** → doctor, **school** → teacher, **bank** → worker.", "Learn places with their action: **post** office → **post** a letter.", "Say a sentence for each place: \"I go to the ___ to ___.\""] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Where do we keep our money?", ["bank", "park", "beach"], "A bank keeps money."), mi("🏥", "What is this place?", ["hospital", "school", "market"], "The picture shows a hospital."), f("Planes take off and land at the ___ .", "airport", "A plane uses an airport."), tf("We send letters at the post office.", true, "A post office is for letters and parcels.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the place that matches each meaning.", [
        m("A place where doctors help sick people.", ["hospital", "bank", "library"], "A hospital is for sick people."),
        m("A place where we keep money.", ["bank", "park", "farm"], "A bank keeps money."),
        m("A place where Muslims pray.", ["mosque", "airport", "beach"], "A mosque is a place for prayer."),
        m("A place with many books to read.", ["library", "market", "restaurant"], "A library has many books."),
        m("A place where planes take off and land.", ["airport", "street", "farm"], "Planes use an airport."),
        m("A sandy place next to the sea.", ["beach", "park", "city"], "A beach is next to the sea."),
        m("Land where people grow food and keep animals.", ["farm", "shop", "bank"], "A farm grows food and keeps animals."),
        m("A place where we send letters.", ["post office", "restaurant", "mosque"], "We send letters at the post office."),
        tf("A restaurant is a place where we eat a meal and pay.", true, "In a restaurant we eat and pay."),
        tf("A park is a place for planes.", false, "A park is a green place for walking and playing.")
      ]),
      T("Picture places", "Look at the picture and choose the place.", [
        mi("🏠", "What is this place?", ["house", "school", "bank"], "The picture shows a house."),
        mi("🏫", "What is this place?", ["school", "hospital", "market"], "The picture shows a school."),
        mi("🕌", "What is this place?", ["mosque", "bank", "library"], "The picture shows a mosque."),
        mi("🏥", "What is this place?", ["hospital", "school", "shop"], "The picture shows a hospital."),
        mi("🏪", "What is this place?", ["shop", "bank", "park"], "The picture shows a shop."),
        mi("🌳", "What is this place?", ["park", "market", "beach"], "Trees show a park."),
        mi("🏦", "What is this place?", ["bank", "hospital", "restaurant"], "The picture shows a bank."),
        mi("✈️", "Where do planes go?", ["airport", "farm", "street"], "Planes use an airport."),
        mi("🏖️", "What is this place?", ["beach", "park", "farm"], "Sand and an umbrella show a beach."),
        fi("🍽️", "Type the place where we eat and pay: a ___ .", "restaurant", "We eat and pay in a restaurant.")
      ]),
      T("Where do we go?", "Choose the right place for each activity.", [
        m("We go to the ___ to buy fruit and fish.", ["market", "airport", "mosque"], "We buy food at the market."),
        m("We go to the ___ when we are sick.", ["hospital", "beach", "park"], "A hospital helps sick people."),
        m("We go to the ___ to study.", ["school", "restaurant", "bank"], "We study at school."),
        m("We go to the ___ to swim in the sea.", ["beach", "library", "bank"], "We swim at the beach."),
        m("We go to the ___ to borrow a book.", ["library", "farm", "post office"], "We borrow books at a library."),
        m("We go to the ___ to send a parcel.", ["post office", "park", "school"], "We send parcels at the post office."),
        f("We play football in the ___ . Type the place.", "park", "A park is a green place for playing."),
        f("We travel by plane from the ___ . Type the place.", "airport", "Planes leave from an airport."),
        m("The cows and sheep live on the ___ .", ["farm", "bank", "mosque"], "Animals live on a farm."),
        m("Muscat is a big ___ .", ["city", "street", "house"], "Muscat is a large city.")
      ]),
      T("Odd one out and groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["bank", "school", "teacher"], "Bank and school are places. A teacher is a person."),
        m("Which word is different?", ["market", "shop", "beach"], "Market and shop are places to buy things. A beach is not."),
        m("Which word is different?", ["library", "hospital", "pen"], "Library and hospital are places. A pen is a thing."),
        m("Which place is for sick people?", ["hospital", "airport", "street"], "A hospital is for sick people."),
        m("Which place is bigger?", ["city", "street", "shop"], "A city is bigger than a street or a shop."),
        mt("Match each place with what we do there.", [["bank", "keep money"], ["library", "read books"], ["airport", "travel by plane"], ["restaurant", "eat a meal"]], "Think about what happens in each place."),
        tf("We swim at the post office.", false, "We swim at the beach."),
        tf("A shop is usually smaller than a market.", true, "A market is a big place with many shops."),
        m("Which two places are for buying things?", ["shop and market", "bank and school", "beach and farm"], "We buy things at shops and markets."),
        m("Which two places are outside with trees and grass?", ["park and farm", "bank and library", "hospital and school"], "A park and a farm are outside.")
      ]),
      T("Mixed review", "A mix of place questions.", [
        m("What is the plural of 'city'?", ["cities", "citys", "cityes"], "Consonant + y changes to ies: cities."),
        m("What is the plural of 'beach'?", ["beaches", "beachs", "beachies"], "Words ending in ch take es: beaches."),
        f("One shop, two ___ .", "shops", "Add s to make most nouns plural."),
        c("We buy bread at the hospital.", "We buy bread at the shop.", "A hospital is for sick people. We buy bread at a shop."),
        b("Put the words in the correct order.", "My father works at the bank.", "Subject + verb + at + place."),
        m("Which sentence is correct?", ["I read books in the library.", "I read books in the airport.", "I read books in the farm."], "We read books in a library."),
        tf("A mosque is a place where we pray.", true, "A mosque is a place of prayer."),
        mt("Match each place with the right sentence.", [["hospital", "The doctor works here."], ["school", "The teacher works here."], ["farm", "The farmer works here."], ["bank", "We keep money here."]], "Think about who works in each place."),
        m("Which place has many shops and stalls?", ["market", "mosque", "beach"], "A market has many shops or stalls."),
        m("Which place is a road with buildings on both sides?", ["street", "farm", "park"], "A street is a road in a town.")
      ])
    ]
  };
})(window.EPZ_EASY);
