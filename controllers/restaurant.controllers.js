const {
  createRestaurantService,
  readRestaurantService,
  readAllRestaurantsService,
  readRestaurantsByCuisineService,
  updateRestaurantService,
  deleteRestaurantService,
  searchRestaurantsByLocationService,
  filterRestaurantByRatingService,
} = require("../db-controllers/restaurant.controller");

// Creating a Restaurant
const createRestaurant = async (req, res) => {
  const newRestaurant = req.body;
  try {
    const newData = await createRestaurantService(newRestaurant);
    res.status(201).json({
      message: "Success",
      restaurant: newData,
    });
  } catch (e) {
    res.status(500).json({ message: `Error adding new Restaurant: ${e}` });
  }
};

// Finding a restaurant
const readRestaurant = async (req, res) => {
  const restaurantName = req.params.title;
  try {
    const foundData = await readRestaurantService(restaurantName);
    if (foundData) {
      res.status(200).json({ message: "Data found", data: foundData });
    } else {
      res
        .status(404)
        .json({
          message: `Restaurants named ${restaurantName} does not exist in database`,
        });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: `Error finding restaurant: ${restaurantName}` });
  }
};

//Retriving all Restaurants
const readAllRestaurants = async (req, res) => {
  try {
    const restaurantData = await readAllRestaurantsService();
    res
      .status(200)
      .json({ message: "Fetched Restaurants", data: restaurantData });
  } catch (e) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

//Retrive restaurants by cuisine type
const readRestaurantsByCuisine = async (req, res) => {
  const { cuisineType } = req.params;
  try {
    const foundData = await readRestaurantsByCuisineService(cuisineType);
    if (foundData !== null) {
      res.status(200).json({ message: "Fetched Restaurants", data: foundData });
    } else {
      res
        .status(404)
        .json({ message: "No restaurants found with related cuisine type" });
    }
  } catch (e) {
    res.status(500).json({ message: `Error finding restaurants` });
  }
};

//Update restaurant by ID
const updateRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  const updatedBody = req.body;
  try {
    const updatedData = await updateRestaurantService(
      restaurantId,
      updatedBody
    );
    res
      .status(201)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

//Delete Restaurant
const deleteRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const deletedData = await deleteRestaurantService(restaurantId);
    if (deletedData !== null) {
      res.status(200).json({ message: "Delete success", data: deletedData });
    } else {
      res
        .status(404)
        .json({
          message: `No restaurants with ${restaurantId} exist in database`,
        });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

//Search Restaurant by Location
const searchRestaurantsByLocation = async (req, res) => {
  const { location } = req.query;
  try {
    const foundData = await searchRestaurantsByLocationService(location);
    if (foundData !== null) {
      res.status(200).json({ message: "Found Data", data: foundData });
    } else {
      res.status(404).json({ message: "No Data Found" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

//Filter Restaurants by rating
const filterRestaurantsByRating = async (req, res) => {
  const { rating } = req.params;
  try {
    const foundData = await filterRestaurantByRatingService(rating);
    if (foundData) {
      res.status(200).json({ message: "Data Found", data: foundData });
    } else {
      res.status(404).json({ message: "No Data found" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByLocation,
  filterRestaurantsByRating,
};
