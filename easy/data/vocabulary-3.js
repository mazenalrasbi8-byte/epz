/* Easy Level / Vocabulary / Part 3: Animals */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-3"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "🐪", h: "Animals", p: ["Animals live on farms, in homes, in the wild, in the sea and in the sky.", "In this Part you learn 16 animal words. Listen to each word and say it aloud."], ex: [["The **camel** lives in the desert."], ["My **cat** sleeps all day."]] },
      { k: "words", kick: "Word list 1", h: "Pets and farm animals", items: [["🐱", "cat", "a small pet that says meow", "KAT", "My **cat** drinks milk."], ["🐶", "dog", "a pet that says woof", "DOG", "The **dog** runs in the garden."], ["🐴", "horse", "a big animal people can ride", "HORSS", "He rides a **horse**."], ["🐪", "camel", "a desert animal with a hump", "KAM-ul", "The **camel** drinks a lot of water."], ["🐄", "cow", "a farm animal that gives us milk", "KOW", "The **cow** eats grass."], ["🐑", "sheep", "a farm animal with wool", "SHEEP", "The **sheep** has soft wool."], ["🐐", "goat", "a farm animal with horns", "GOHT", "The **goat** climbs the hill."], ["🐦", "bird", "an animal with wings and feathers", "BERD", "A **bird** is singing in the tree."]] },
      { k: "words", kick: "Word list 2", h: "Wild animals", items: [["🦁", "lion", "a big wild cat; the male has a mane", "LY-un", "The **lion** is strong."], ["🐘", "elephant", "a very big grey animal with a trunk", "EL-i-funt", "An **elephant** drinks with its trunk."], ["🐒", "monkey", "an animal that climbs trees and eats fruit", "MUNG-kee", "The **monkey** eats a banana."], ["🐰", "rabbit", "a small animal with long ears", "RAB-it", "The **rabbit** eats carrots."], ["🐯", "tiger", "a big wild cat with stripes", "TY-ger", "A **tiger** has orange and black stripes."], ["🐍", "snake", "a long animal with no legs", "SNAYK", "The **snake** moves on the ground."], ["🐢", "turtle", "an animal with a hard shell", "TER-tul", "A **turtle** lays eggs on the beach."], ["", "oryx", "a wild animal with long straight horns", "OR-iks", "The Arabian **oryx** lives in Oman."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["The **cow** gives us **milk** and the **sheep** gives us wool.", "farm animals"], ["A **bird** can fly, but a **snake** cannot.", "can and cannot"], ["The **turtle** comes to the beach at night to lay eggs.", "turtle"], ["The **lion** is a wild animal. The **cat** is a pet.", "wild and pet"], ["A **camel** can walk in the desert for many days.", "camel"]] },
      { k: "table", kick: "Word groups", h: "Animal groups", head: ["Group", "Animals"], rows: [["**pets**", "cat, dog, rabbit, bird"], ["**farm animals**", "cow, sheep, goat, horse, camel"], ["**wild animals**", "lion, tiger, elephant, monkey, snake, oryx"], ["**animals with a shell**", "turtle"]] },
      { k: "table", kick: "Useful facts", h: "What does the animal do or have?", head: ["Animal", "Fact"], rows: [["**cat**", "says meow"], ["**dog**", "says woof"], ["**cow**", "says moo and gives milk"], ["**elephant**", "has a long trunk"], ["**tiger**", "has stripes"], ["**bird**", "has wings and can fly"], ["**turtle**", "has a hard shell"]] },
      { k: "tip", h: "Memory tips", items: ["Learn the animal with its **sound** or **picture**: dog = woof, cat = meow, cow = moo.", "**Sheep** is the same in singular and plural: one sheep, two sheep.", "Group the animals: pets at home, farm animals, wild animals."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [mi("🐘", "What is this animal?", ["elephant", "horse", "camel"], "The picture shows an elephant."), m("Which animal gives us milk?", ["cow", "snake", "lion"], "A cow gives us milk."), f("A pet that says woof is a ___ .", "dog", "A dog says woof."), tf("A snake has four legs.", false, "A snake has no legs.")] }
    ],
    tests: [
      T("What does it mean?", "Choose the animal that matches each meaning.", [
        m("A big grey animal with a long trunk.", ["elephant", "horse", "cow"], "An elephant has a long trunk."),
        m("A desert animal with a hump.", ["camel", "sheep", "goat"], "A camel has a hump and lives in the desert."),
        m("A farm animal that gives us milk.", ["cow", "tiger", "bird"], "A cow gives us milk."),
        m("A big wild cat with a mane.", ["lion", "rabbit", "turtle"], "The male lion has a mane."),
        m("An animal with a hard shell.", ["turtle", "monkey", "snake"], "A turtle has a hard shell."),
        m("A long animal with no legs.", ["snake", "horse", "dog"], "A snake has no legs."),
        m("A small animal with long ears.", ["rabbit", "elephant", "lion"], "A rabbit has long ears."),
        m("A pet that says woof.", ["dog", "cat", "bird"], "A dog says woof."),
        tf("Most birds can fly.", true, "Birds have wings and most of them can fly."),
        tf("A goat is a farm animal.", true, "Goats live on farms.")
      ]),
      T("Picture animals", "Look at the picture and choose the word.", [
        mi("🐱", "What is this?", ["cat", "dog", "rabbit"], "The picture shows a cat."),
        mi("🐶", "What is this?", ["dog", "cat", "goat"], "The picture shows a dog."),
        mi("🐴", "What is this?", ["horse", "cow", "camel"], "The picture shows a horse."),
        mi("🐪", "What is this?", ["camel", "horse", "sheep"], "The picture shows a camel."),
        mi("🐄", "What is this?", ["cow", "goat", "horse"], "The picture shows a cow."),
        mi("🐑", "What is this?", ["sheep", "goat", "cow"], "The picture shows a sheep."),
        mi("🐦", "What is this?", ["bird", "snake", "turtle"], "The picture shows a bird."),
        mi("🦁", "What is this?", ["lion", "tiger", "dog"], "The picture shows a lion."),
        mi("🐒", "What is this?", ["monkey", "elephant", "rabbit"], "The picture shows a monkey."),
        fi("🐰", "Type the word for this animal.", "rabbit", "The picture shows a rabbit.")
      ]),
      T("Complete the sentences", "Choose or type the missing animal.", [
        m("A ___ says meow.", ["cat", "dog", "cow"], "A cat says meow."),
        m("A ___ says moo and gives us milk.", ["cow", "horse", "bird"], "A cow says moo."),
        m("A ___ has a very long trunk.", ["elephant", "monkey", "tiger"], "An elephant has a trunk."),
        m("A ___ can fly in the sky.", ["bird", "snake", "sheep"], "A bird has wings."),
        m("Monkeys like to eat ___ .", ["bananas", "fish", "grass"], "Monkeys like bananas."),
        m("The ___ has orange and black stripes.", ["tiger", "lion", "camel"], "A tiger has stripes."),
        f("A ___ lays eggs on the beach and has a hard shell. Type the animal.", "turtle", "A turtle lays eggs on the beach."),
        f("The ___ gives us soft wool. Type the animal.", "sheep", "A sheep gives us wool."),
        m("People can ride a ___ or a camel.", ["horse", "goat", "snake"], "People ride horses and camels."),
        m("The Arabian ___ is a wild animal with long straight horns.", ["oryx", "cat", "rabbit"], "The Arabian oryx has long straight horns.")
      ]),
      T("Animal groups", "Find the different animal and match the groups.", [
        m("Which animal is different?", ["cow", "sheep", "lion"], "Cow and sheep are farm animals. A lion is wild."),
        m("Which animal is different?", ["cat", "dog", "elephant"], "Cat and dog are pets. An elephant is a wild animal."),
        m("Which animal is different?", ["tiger", "lion", "goat"], "Tiger and lion are wild cats. A goat is a farm animal."),
        m("Which animal can fly?", ["bird", "horse", "snake"], "Birds can fly."),
        m("Which animal has no legs?", ["snake", "cat", "monkey"], "A snake has no legs."),
        mt("Match each animal with its group.", [["cat", "pet"], ["cow", "farm animal"], ["lion", "wild animal"], ["bird", "can fly"]], "Think where each animal lives."),
        tf("A turtle is a pet that says woof.", false, "A dog says woof. A turtle has a shell."),
        tf("A monkey can climb trees.", true, "Monkeys climb trees."),
        m("Which animal gives us wool?", ["sheep", "cow", "dog"], "A sheep gives wool."),
        m("Which two animals are both pets?", ["cat and dog", "lion and tiger", "cow and horse"], "Cat and dog are pets.")
      ]),
      T("Mixed review", "A mix of animal questions.", [
        m("What is the plural of 'monkey'?", ["monkeys", "monkies", "monkeyes"], "Vowel + y: just add s. Monkeys."),
        m("What is the plural of 'sheep'?", ["sheep", "sheeps", "sheepes"], "Sheep is the same in singular and plural."),
        f("One bird, two ___ .", "birds", "Add s to make most nouns plural."),
        c("A snake have no legs.", "A snake has no legs.", "Use has with a singular noun like snake."),
        b("Put the words in the correct order.", "The cat drinks milk.", "Subject + verb + object."),
        m("Which sentence is correct?", ["A dog says woof.", "A cow says woof.", "A bird says moo."], "A dog says woof."),
        tf("An elephant is smaller than a cat.", false, "An elephant is much bigger than a cat."),
        mt("Match each animal with what it does or has.", [["camel", "has a hump"], ["bird", "has wings"], ["snake", "has no legs"], ["tiger", "has stripes"]], "Each animal has a special feature."),
        m("Which animal lives in the desert?", ["camel", "turtle", "monkey"], "Camels live in the desert."),
        m("Which animal lays its eggs on the beach?", ["turtle", "horse", "goat"], "Turtles lay their eggs on the beach.")
      ])
    ]
  };
})(window.EPZ_EASY);
