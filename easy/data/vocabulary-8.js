/* Easy Level / Vocabulary / Part 8: Jobs and Occupations */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-8"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "👩‍⚕️", h: "Jobs and occupations", p: ["A **job** is the work a person does to earn money. Another word for job is **occupation**.", "In this Part you learn 16 job words. Listen to each word and say it aloud."], ex: [["My father is a **doctor**."], ["She works as a **teacher**."]] },
      { k: "words", kick: "Word list 1", h: "Common jobs", items: [["🧑‍🏫", "teacher", "teaches students at school", "TEE-cher", "My **teacher** is kind."], ["🧑‍⚕️", "doctor", "helps sick people get well", "DOK-ter", "The **doctor** works in a hospital."], ["👩‍⚕️", "nurse", "helps doctors and looks after patients", "NERS", "The **nurse** takes care of the patients."], ["🧑‍🔧", "engineer", "designs and builds roads, machines and buildings", "en-ji-NEER", "My uncle is an **engineer**."], ["🧑‍✈️", "pilot", "flies a plane", "PY-lut", "The **pilot** flies to Dubai."], ["🚕", "driver", "drives a car, bus or taxi", "DRY-ver", "The bus **driver** is friendly."], ["🧑‍🌾", "farmer", "grows food and keeps animals", "FAR-mer", "The **farmer** grows dates."], ["👮", "police officer", "keeps people safe and helps with the law", "puh-LEESS OF-i-ser", "The **police officer** helps us cross the road."]] },
      { k: "words", kick: "Word list 2", h: "More jobs", items: [["🧑‍🍳", "cook", "makes food for people", "KUK", "The **cook** makes tasty rice."], ["🎣", "fisherman", "catches fish from the sea", "FISH-er-mun", "The **fisherman** goes to sea early."], ["🧑‍🔧", "mechanic", "repairs cars and machines", "muh-KAN-ik", "The **mechanic** fixes my father's car."], ["🏗️", "builder", "builds houses and buildings", "BIL-der", "The **builder** is making a new house."], ["🏪", "shopkeeper", "owns or works in a shop", "SHOP-kee-per", "The **shopkeeper** sells fruit."], ["🦷", "dentist", "looks after your teeth", "DEN-tist", "The **dentist** checks my teeth."], ["🎨", "artist", "draws or paints pictures", "AR-tist", "The **artist** paints the sea."], ["👩‍💻", "programmer", "writes instructions for computers", "PROH-gram-er", "The **programmer** makes apps."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["My father is a **doctor**. He works in a **hospital**.", "job + place"], ["My mother is a **teacher**. She works at a **school**.", "job + place"], ["A **pilot** flies a plane and a **driver** drives a bus.", "what they do"], ["My uncle is a **fisherman**. He catches fish.", "what he does"], ["The **mechanic** repairs cars and the **builder** builds houses.", "repair and build"]] },
      { k: "table", kick: "Word groups", h: "Who works where?", head: ["Job", "Place of work"], rows: [["**teacher**", "school"], ["**doctor / nurse**", "hospital"], ["**pilot**", "airport / plane"], ["**farmer**", "farm"], ["**cook**", "restaurant or kitchen"], ["**shopkeeper**", "shop"]] },
      { k: "table", kick: "Word groups", h: "Who does what?", head: ["Job", "What this person does"], rows: [["**dentist**", "looks after teeth"], ["**mechanic**", "repairs cars"], ["**builder**", "builds houses"], ["**fisherman**", "catches fish"], ["**artist**", "paints pictures"], ["**engineer**", "designs and builds"]] },
      { k: "tip", h: "Memory tips", items: ["Learn the verb with the job: **teach** → **teacher**, **drive** → **driver**, **build** → **builder**, **paint** → **painter**.", "Say: \"He is a doctor.\" Use **a** before jobs, and **an** before a vowel sound: **an** engineer, **an** artist.", "Ask: \"What do you want to be?\" Say: \"I want to be a pilot.\""] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("Who flies a plane?", ["pilot", "driver", "farmer"], "A pilot flies a plane."), mi("🦷", "Who looks after your teeth?", ["dentist", "nurse", "cook"], "A dentist looks after teeth."), f("A person who catches fish is a ___ .", "fisherman", "A fisherman catches fish."), tf("An engineer repairs teeth.", false, "A dentist looks after teeth. An engineer designs and builds.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the job that matches each meaning.", [
        m("A person who helps doctors and looks after patients.", ["nurse", "teacher", "driver"], "A nurse helps doctors and looks after patients."),
        m("A person who helps sick people get well.", ["doctor", "farmer", "pilot"], "A doctor helps sick people."),
        m("A person who flies a plane.", ["pilot", "builder", "cook"], "A pilot flies a plane."),
        m("A person who grows food and keeps animals.", ["farmer", "dentist", "artist"], "A farmer works on a farm."),
        m("A person who catches fish from the sea.", ["fisherman", "mechanic", "engineer"], "A fisherman catches fish."),
        m("A person who repairs cars.", ["mechanic", "nurse", "teacher"], "A mechanic repairs cars."),
        m("A person who looks after your teeth.", ["dentist", "driver", "shopkeeper"], "A dentist looks after teeth."),
        m("A person who makes food for people.", ["cook", "builder", "pilot"], "A cook makes food."),
        tf("A police officer keeps people safe.", true, "Police officers keep people safe."),
        tf("An artist builds houses.", false, "A builder builds houses. An artist paints or draws.")
      ]),
      T("Picture jobs", "Look at the picture and choose the job.", [
        mi("🧑‍⚕️", "Who is this?", ["doctor", "teacher", "pilot"], "The picture shows a doctor."),
        mi("🧑‍🏫", "Who is this?", ["teacher", "farmer", "cook"], "The picture shows a teacher."),
        mi("🧑‍✈️", "Who is this?", ["pilot", "driver", "nurse"], "The picture shows a pilot."),
        mi("🧑‍🌾", "Who is this?", ["farmer", "builder", "artist"], "The picture shows a farmer."),
        mi("🧑‍🍳", "Who is this?", ["cook", "mechanic", "dentist"], "The picture shows a cook."),
        mi("👮", "Who is this?", ["police officer", "driver", "shopkeeper"], "The picture shows a police officer."),
        mi("🚕", "Who drives this?", ["driver", "pilot", "fisherman"], "A taxi driver drives a taxi."),
        mi("🎨", "Who uses this?", ["artist", "mechanic", "farmer"], "An artist paints."),
        mi("🎣", "Who uses this to catch fish?", ["fisherman", "cook", "nurse"], "A fisherman catches fish."),
        fi("🦷", "Type the job: a person who looks after your teeth is a ___ .", "dentist", "A dentist looks after teeth.")
      ]),
      T("Where do they work?", "Choose the place or tool for each job.", [
        m("A teacher works at a ___ .", ["school", "farm", "airport"], "Teachers work at schools."),
        m("A doctor works in a ___ .", ["hospital", "bank", "market"], "Doctors work in hospitals."),
        m("A pilot works in a ___ .", ["plane", "shop", "classroom"], "A pilot works in a plane."),
        m("A farmer works on a ___ .", ["farm", "street", "library"], "A farmer works on a farm."),
        m("A shopkeeper works in a ___ .", ["shop", "hospital", "park"], "A shopkeeper works in a shop."),
        m("A cook works in a ___ .", ["kitchen", "classroom", "bank"], "A cook works in a kitchen."),
        f("A person who builds houses is a ___ . Type the job.", "builder", "A builder builds houses."),
        f("A person who helps a doctor in a hospital is a ___ . Type the job.", "nurse", "A nurse helps doctors and patients."),
        m("A mechanic repairs ___ .", ["cars", "teeth", "fish"], "A mechanic repairs cars and machines."),
        m("An artist paints ___ .", ["pictures", "cars", "classrooms"], "An artist paints or draws pictures.")
      ]),
      T("Odd one out and groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["doctor", "nurse", "pencil"], "Doctor and nurse are jobs. A pencil is a thing."),
        m("Which word is different?", ["pilot", "driver", "hospital"], "Pilot and driver are jobs. A hospital is a place."),
        m("Which job is different?", ["doctor", "nurse", "farmer"], "Doctor and nurse work in a hospital. A farmer works on a farm."),
        m("Which job helps sick people?", ["nurse", "builder", "artist"], "A nurse helps sick people."),
        m("Which job is outside on a farm?", ["farmer", "dentist", "teacher"], "A farmer works on a farm."),
        mt("Match each job with what the person does.", [["pilot", "flies a plane"], ["builder", "builds houses"], ["cook", "makes food"], ["fisherman", "catches fish"]], "Think about what each person does."),
        tf("A dentist works with teeth.", true, "A dentist works with teeth."),
        tf("A driver flies a plane.", false, "A pilot flies a plane. A driver drives a car or bus."),
        m("Which two jobs work in a hospital?", ["doctor and nurse", "farmer and cook", "pilot and driver"], "Doctors and nurses work in hospitals."),
        m("Which two jobs use cars?", ["driver and mechanic", "cook and artist", "nurse and dentist"], "A driver drives cars and a mechanic repairs them.")
      ]),
      T("Mixed review", "A mix of job questions.", [
        m("Which sentence is correct?", ["He is an engineer.", "He is a engineer.", "He is engineer."], "Use an before a vowel sound: an engineer."),
        m("Which sentence is correct?", ["She is a doctor.", "She is an doctor.", "She doctor."], "Use a before a consonant sound: a doctor."),
        f("My brother wants to be a ___ . He loves planes. Type the job.", "pilot", "A person who loves planes may want to be a pilot."),
        c("My father is a teacher. He works in a hospital.", "My father is a teacher. He works in a school.", "Teachers work in schools."),
        b("Put the words in the correct order.", "My uncle is a fisherman.", "Subject + is + a + job."),
        m("What is the job of a person who teaches?", ["teacher", "builder", "driver"], "A person who teaches is a teacher."),
        tf("We say 'a artist'.", false, "Artist starts with a vowel sound. Say an artist."),
        mt("Match each job with its place of work.", [["teacher", "school"], ["doctor", "hospital"], ["farmer", "farm"], ["shopkeeper", "shop"]], "Think about where each person works."),
        m("What do you ask to find out someone's job?", ["What do you do?", "Where are you?", "How old are you?"], "We ask What do you do? to ask about a job."),
        m("Which word means the work a person does to earn money?", ["job", "place", "city"], "A job is the work a person does to earn money.")
      ])
    ]
  };
})(window.EPZ_EASY);
