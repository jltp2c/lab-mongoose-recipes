const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .set("strictQuery", false)
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "Special JL",
      level: "UltraPro Chef",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese",
      ],
      cuisine: "Chinese",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef JL",
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    const query = { title: "Rigatoni alla Genovese" };
    return Recipe.findOneAndUpdate(query, { duration: 100 }, { new: true });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
