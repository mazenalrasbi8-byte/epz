/* Easy Level / Vocabulary / Part 5: Colors and Shapes */
(function (E) {
  var h = E.h, m = h.m, mi = h.mi, tf = h.tf, f = h.f, fi = h.fi, c = h.c, b = h.b, mt = h.mt, T = h.T;
  E.parts["vocabulary-5"] = {
    learn: [
      { k: "intro", kick: "Words to learn", e: "🎨", h: "Colors and shapes", p: ["We use **colors** and **shapes** to describe things.", "In this Part you learn 10 colors and 6 shapes. Listen to each word and say it aloud."], ex: [["The sky is **blue**."], ["The window is a **square**."]] },
      { k: "words", kick: "Word list 1", h: "Colors", items: [["🔴", "red", "the color of a ripe tomato", "RED", "The apple is **red**."], ["🔵", "blue", "the color of the sky and the sea", "BLOO", "The sea is **blue**."], ["🟢", "green", "the color of grass and leaves", "GREEN", "The grass is **green**."], ["🟡", "yellow", "the color of the sun and a banana", "YEL-oh", "The banana is **yellow**."], ["⚫", "black", "the color of night", "BLAK", "The night sky is **black**."], ["⚪", "white", "the color of snow and milk", "WYT", "Milk is **white**."], ["🟠", "orange", "the color of a carrot", "OR-inj", "The carrot is **orange**."], ["🟤", "brown", "the color of chocolate and wood", "BROWN", "The table is **brown**."]] },
      { k: "words", kick: "Word list 2", h: "More colors and shapes", items: [["", "pink", "a light red color", "PINGK", "The flower is **pink**."], ["🟣", "purple", "the color made from red and blue", "PER-pul", "The grapes are **purple**."], ["⭕", "circle", "a round shape", "SER-kul", "The sun looks like a **circle**."], ["⬛", "square", "a shape with four equal sides", "SKWAIR", "The window is a **square**."], ["🔺", "triangle", "a shape with three sides", "TRY-ang-gul", "A slice of pizza is a **triangle**."], ["", "rectangle", "a shape with four sides, two long and two short", "REK-tang-gul", "The door is a **rectangle**."], ["⭐", "star", "a shape with points, like in the sky", "STAR", "The flag has a **star**."], ["❤️", "heart", "the shape that means love", "HART", "She drew a **heart**."]] },
      { k: "examples", kick: "Words in context", h: "Read how the words are used", items: [["The sky is **blue** and the grass is **green**.", "colors of nature"], ["My school bag is **black** and my pen is **red**.", "colors of things"], ["The flag has **red**, **white** and **green**.", "colors of a flag"], ["The clock is a **circle** and the book is a **rectangle**.", "shapes of things"], ["Road signs can be a **triangle** or a **circle**.", "shapes of signs"]] },
      { k: "table", kick: "Word groups", h: "Colors and shapes", head: ["Group", "Words"], rows: [["**colors**", "red, blue, green, yellow, black, white, orange, brown, pink, purple"], ["**shapes**", "circle, square, triangle, rectangle, star, heart"]] },
      { k: "table", kick: "Word groups", h: "How many sides?", head: ["Shape", "Sides"], rows: [["**circle**", "no sides (it is round)"], ["**triangle**", "3 sides"], ["**square**", "4 equal sides"], ["**rectangle**", "4 sides (2 long, 2 short)"]] },
      { k: "tip", h: "Memory tips", items: ["Mix colors: **red + yellow = orange**, **blue + yellow = green**, **red + blue = purple**, **red + white = pink**.", "Connect colors to things: **red** = tomato, **blue** = sea, **green** = grass, **yellow** = sun.", "**Tri**angle has 3 sides. **Tri** means three."] },
      { k: "practice", h: "Short practice", p: "Choose or type the answer.", qs: [m("What color is grass?", ["green", "red", "white"], "Grass is green."), mi("🔺", "What shape is this?", ["triangle", "circle", "square"], "A triangle has three sides."), f("A shape with four equal sides is a ___ .", "square", "A square has four equal sides."), tf("Red and yellow make orange.", true, "Mix red and yellow to make orange.")] }
    ],
    tests: [
      T("What color is it?", "Choose the color that matches each thing.", [
        m("The color of the sun.", ["yellow", "blue", "black"], "The sun looks yellow."),
        m("The color of grass.", ["green", "red", "white"], "Grass is green."),
        m("The color of the sky on a clear day.", ["blue", "brown", "orange"], "A clear sky is blue."),
        m("The color of snow.", ["white", "black", "purple"], "Snow is white."),
        m("The color of a carrot.", ["orange", "pink", "blue"], "A carrot is orange."),
        m("The color of the night.", ["black", "yellow", "green"], "The night is dark, so we say black."),
        m("The color of a ripe tomato.", ["red", "blue", "white"], "A ripe tomato is red."),
        m("The color of chocolate.", ["brown", "yellow", "green"], "Chocolate is brown."),
        tf("Milk is white.", true, "Milk is white."),
        tf("A banana is usually blue.", false, "A banana is usually yellow.")
      ]),
      T("Picture colors", "Look at the picture and choose the color or shape.", [
        mi("🔴", "What color is this?", ["red", "blue", "green"], "The circle is red."),
        mi("🔵", "What color is this?", ["blue", "black", "purple"], "The circle is blue."),
        mi("🟢", "What color is this?", ["green", "yellow", "orange"], "The circle is green."),
        mi("🟡", "What color is this?", ["yellow", "orange", "white"], "The circle is yellow."),
        mi("⚫", "What color is this?", ["black", "brown", "grey"], "The circle is black."),
        mi("⚪", "What color is this?", ["white", "yellow", "pink"], "The circle is white."),
        mi("🟠", "What color is this?", ["orange", "red", "brown"], "The circle is orange."),
        mi("🟣", "What color is this?", ["purple", "blue", "pink"], "The circle is purple."),
        mi("⭐", "What shape is this?", ["star", "heart", "circle"], "The picture shows a star."),
        fi("❤️", "Type the shape.", "heart", "The picture shows a heart.")
      ]),
      T("Shapes in our world", "Choose the shape that matches each thing.", [
        m("A ball is round. Which shape is round?", ["circle", "square", "triangle"], "A circle is round."),
        m("A slice of pizza has three sides. It is a ___ .", ["triangle", "circle", "rectangle"], "A shape with three sides is a triangle."),
        m("A window with four equal sides is a ___ .", ["square", "triangle", "circle"], "A square has four equal sides."),
        m("A door has two long sides and two short sides. It is a ___ .", ["rectangle", "circle", "star"], "A rectangle has two long and two short sides."),
        m("A shape with points that we see in the night sky is a ___ .", ["star", "heart", "square"], "A star has points."),
        m("A shape that means love is a ___ .", ["heart", "star", "triangle"], "A heart is the shape of love."),
        f("A clock is usually a ___ . Type the shape.", "circle", "Many clocks are round, so they are circles."),
        f("A triangle has ___ sides. Type the number.", "three|3", "A triangle has three sides."),
        tf("A circle has four sides.", false, "A circle has no sides."),
        tf("A rectangle has four sides.", true, "A rectangle has four sides.")
      ]),
      T("Odd one out and groups", "Find the different word and match the groups.", [
        m("Which word is different?", ["red", "blue", "circle"], "Red and blue are colors. Circle is a shape."),
        m("Which word is different?", ["square", "triangle", "green"], "Square and triangle are shapes. Green is a color."),
        m("Which word is different?", ["yellow", "orange", "heart"], "Yellow and orange are colors. Heart is a shape."),
        m("Which one is a color?", ["purple", "star", "square"], "Purple is a color."),
        m("Which one is a shape?", ["rectangle", "pink", "brown"], "Rectangle is a shape."),
        mt("Match each thing with its usual color.", [["grass", "green"], ["snow", "white"], ["sea", "blue"], ["sun", "yellow"]], "Think of the color of each thing."),
        tf("Black and white are both colors.", true, "Black and white are colors."),
        tf("A star is a color.", false, "A star is a shape."),
        m("Which two are shapes?", ["circle and square", "red and blue", "green and star"], "Circle and square are shapes."),
        m("Which two are colors?", ["pink and purple", "circle and heart", "star and brown"], "Pink and purple are colors.")
      ]),
      T("Mixed review", "A mix of color and shape questions.", [
        m("Red and yellow make ___ .", ["orange", "green", "purple"], "Red + yellow = orange."),
        m("Blue and yellow make ___ .", ["green", "pink", "brown"], "Blue + yellow = green."),
        f("Red and white make ___ . Type the color.", "pink", "Red + white = pink."),
        c("The sky is red and the grass is blue.", "The sky is blue and the grass is green.", "A clear sky is blue and grass is green."),
        b("Put the words in the correct order.", "My bag is black.", "Subject + is + color."),
        m("Which sentence is correct?", ["The door is a rectangle.", "The door is a circle.", "The door is a star."], "A door is a rectangle."),
        tf("A triangle has three sides.", true, "Tri means three."),
        mt("Match each shape with the number of sides.", [["triangle", "3 sides"], ["square", "4 equal sides"], ["circle", "no sides"], ["rectangle", "4 sides: 2 long, 2 short"]], "Count the sides."),
        m("The flag of Oman has red, white and ___ .", ["green", "blue", "black"], "The flag of Oman is red, white and green."),
        m("What color is milk?", ["white", "red", "black"], "Milk is white.")
      ])
    ]
  };
})(window.EPZ_EASY);
