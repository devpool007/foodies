import { Pool } from "pg";

const pool = new Pool({
  user: "user",
  host: "host",
  database: "db",
  password: "yourpassword",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Accept Render's SSL cert
  },
});

// CREATE TABLE meals (
//   id SERIAL PRIMARY KEY,
//   title TEXT NOT NULL,
//   summary TEXT NOT NULL,
//   instructions TEXT NOT NULL,
//   creator TEXT NOT NULL,
//   creator_email TEXT NOT NULL,
//   image TEXT NOT NULL,
//   slug TEXT NOT NULL UNIQUE
// );

const dummyMeals = [
  {
    title: "Juicy Cheese Burger",
    slug: "juicy-cheese-burger",
    image: "burger.jpg",
    summary:
      "A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.",
    instructions: `\n      1. Prepare the patty:\n         Mix 200g of ground beef with salt and pepper. Form into a patty.\n\n      2. Cook the patty:\n         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes each side, until browned.\n\n      3. Assemble the burger:\n         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.\n\n      4. Serve:\n         Complete the assembly with the top bun and serve hot.\n    `,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  {
    title: "Spicy Curry",
    slug: "spicy-curry",
    image: "curry.jpg",
    summary:
      "A rich and spicy curry, infused with exotic spices and creamy coconut milk.",
    instructions: `\n      1. Chop vegetables:\n         Cut your choice of vegetables into bite-sized pieces.\n\n      2. Sauté vegetables:\n         In a pan with oil, sauté the vegetables until they start to soften.\n\n      3. Add curry paste:\n         Stir in 2 tablespoons of curry paste and cook for another minute.\n\n      4. Simmer with coconut milk:\n         Pour in 500ml of coconut milk and bring to a simmer. Let it cook for about 15 minutes.\n\n      5. Serve:\n         Enjoy this creamy curry with rice or bread.\n    `,
    creator: "Max Schwarz",
    creator_email: "max@example.com",
  },
  {
    title: "Homemade Dumplings",
    slug: "homemade-dumplings",
    image: "dumplings.jpg",
    summary:
      "Tender dumplings filled with savory meat and vegetables, steamed to perfection.",
    instructions: `\n      1. Prepare the filling:\n         Mix minced meat, shredded vegetables, and spices.\n\n      2. Fill the dumplings:\n         Place a spoonful of filling in the center of each dumpling wrapper. Wet the edges and fold to seal.\n\n      3. Steam the dumplings:\n         Arrange dumplings in a steamer. Steam for about 10 minutes.\n\n      4. Serve:\n         Enjoy these dumplings hot, with a dipping sauce of your choice.\n    `,
    creator: "Emily Chen",
    creator_email: "emilychen@example.com",
  },
  {
    title: "Classic Mac n Cheese",
    slug: "classic-mac-n-cheese",
    image: "macncheese.jpg",
    summary:
      "Creamy and cheesy macaroni, a comforting classic that's always a crowd-pleaser.",
    instructions: `\n      1. Cook the macaroni:\n         Boil macaroni according to package instructions until al dente.\n\n      2. Prepare cheese sauce:\n         In a saucepan, melt butter, add flour, and gradually whisk in milk until thickened. Stir in grated cheese until melted.\n\n      3. Combine:\n         Mix the cheese sauce with the drained macaroni.\n\n      4. Bake:\n         Transfer to a baking dish, top with breadcrumbs, and bake until golden.\n\n      5. Serve:\n         Serve hot, garnished with parsley if desired.\n    `,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    title: "Authentic Pizza",
    slug: "authentic-pizza",
    image: "pizza.jpg",
    summary:
      "Hand-tossed pizza with a tangy tomato sauce, fresh toppings, and melted cheese.",
    instructions: `\n      1. Prepare the dough:\n         Knead pizza dough and let it rise until doubled in size.\n\n      2. Shape and add toppings:\n         Roll out the dough, spread tomato sauce, and add your favorite toppings and cheese.\n\n      3. Bake the pizza:\n         Bake in a preheated oven at 220°C for about 15-20 minutes.\n\n      4. Serve:\n         Slice hot and enjoy with a sprinkle of basil leaves.\n    `,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    title: "Wiener Schnitzel",
    slug: "wiener-schnitzel",
    image: "schnitzel.jpg",
    summary:
      "Crispy, golden-brown breaded veal cutlet, a classic Austrian dish.",
    instructions: `\n      1. Prepare the veal:\n         Pound veal cutlets to an even thickness.\n\n      2. Bread the veal:\n         Coat each cutlet in flour, dip in beaten eggs, and then in breadcrumbs.\n\n      3. Fry the schnitzel:\n      Heat oil in a pan and fry each schnitzel until golden brown on both sides.\n\n      4. Serve:\n      Serve hot with a slice of lemon and a side of potato salad or greens.\n `,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
  },
  {
    title: "Fresh Tomato Salad",
    slug: "fresh-tomato-salad",
    image: "tomato-salad.jpg",
    summary:
      "A light and refreshing salad with ripe tomatoes, fresh basil, and a tangy vinaigrette.",
    instructions: `\n      1. Prepare the tomatoes:\n        Slice fresh tomatoes and arrange them on a plate.\n    \n      2. Add herbs and seasoning:\n         Sprinkle chopped basil, salt, and pepper over the tomatoes.\n    \n      3. Dress the salad:\n         Drizzle with olive oil and balsamic vinegar.\n    \n      4. Serve:\n         Enjoy this simple, flavorful salad as a side dish or light meal.\n    `,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

async function initData() {
  for (const meal of dummyMeals) {
    await pool.query(
      `INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        meal.slug,
        meal.title,
        meal.image,
        meal.summary,
        meal.instructions,
        meal.creator,
        meal.creator_email,
      ]
    );
  }
  await pool.end();
  console.log("Dummy data inserted!");
}

initData();
