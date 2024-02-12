require("./db");
const connectDB = require("./db");
const express = require("express");
const app = express();

const {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating,
} = require("./controllers/restaurant.controllers");
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Restaraunt API");
});
app.use(express.json());

app.get("/restaurants/cuisine/:cuisineType", readRestaurantsByCuisine);
app.get("/restaurants/search", searchRestaurantsByLocation);
app.get("/restaurants/rating/:rating",filterRestaurantsByRating);
app.get("/restaurants/:title", readRestaurant);
app.get("/restaurants", readAllRestaurants);

app.post("/restaurants/:restaurantId", updateRestaurant);
app.post("/restaurants", createRestaurant);

app.delete("/restaurants/:restaurantId", deleteRestaurant);

const startServer = () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log("Server is running on", PORT);
    });
  } catch (e) {
    console.error(e);
  }
};
startServer();
