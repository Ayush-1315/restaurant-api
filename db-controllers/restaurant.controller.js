const Restaurant = require("../models/restaurant.models");

// Adding a new Restaurant to the database
const createRestaurantService = async (restaurantData) => {
  const newRestaurant = new Restaurant(restaurantData);
  try {
    const savedData = await newRestaurant.save();
    return savedData;
  } catch (e) {
    console.error("Error Saving data", e);
    throw new Error(e);
  }
};

// Reading a Restaurant

const readRestaurantService = async (restaurant) => {
  try {
    const restaurantName = new RegExp(restaurant, "i");
    const restaurantData = await Restaurant.find({ name: restaurantName });
    if (restaurantData.length !== 0) {
      return restaurantData;
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//Read all restaurants

const readAllRestaurantsService = async () => {
  try {
    const restaurantData = await Restaurant.find();
    return restaurantData;
  } catch (e) {
    console.error(`Error findind restaurants: ${e}`);
    throw new Error(e);
  }
};

//  Read Restaurants By Cuisine

const readRestaurantsByCuisineService = async (cuisine) => {
  try {
    const regexPattern = new RegExp(cuisine, "i");
    const restaurantData = await Restaurant.find({ cuisine: regexPattern });
    if (restaurantData.length !== 0) return restaurantData;
    return null;
  } catch (e) {
    console.log(`Error finding restaurants: ${e}`);
    throw new Error(e);
  }
};

//Updating a Restaurant

const updateRestaurantService = async (restaurantId, restaurantData) => {
  try {
    const updatedData = await Restaurant.findByIdAndUpdate(
      restaurantId,
      restaurantData,
      { new: true }
    );
    return updatedData;
  } catch (e) {
    console.error(`Error updating restaurant ${restaurantId}:${e}`);
    throw new Error(e);
  }
};

//Deleting a Restaurant Service

const deleteRestaurantService = async (restaurantId) => {
  try {
    const deletedData = await Restaurant.findByIdAndDelete(restaurantId);
    return deletedData;
  } catch (e) {
    console.log(`Error in deleting restaurant: ${e}`);
    throw new Error(e);
  }
};

//Search Restaurants by location
const searchRestaurantsByLocationService = async (searchLocation) => {
  try {
    const location = new RegExp(searchLocation,"i");
    const foundData = await Restaurant.find({ city:location });
    if (foundData.length !== 0) 
    return foundData;
    return null;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

//Get restaurants with specified minimum rating

const filterRestaurantByRatingService=async(rating)=>{
    try{
        const foundData= await Restaurant.find({rating:{$gte:rating}});
        if(foundData.length!==0)
        return foundData;
        return null
    }catch(e){
        console.error(e)
        throw new Error(e);
    }
}
module.exports = {
  createRestaurantService,
  readRestaurantService,
  readAllRestaurantsService,
  readRestaurantsByCuisineService,
  updateRestaurantService,
  deleteRestaurantService,
  searchRestaurantsByLocationService,
  filterRestaurantByRatingService
};
