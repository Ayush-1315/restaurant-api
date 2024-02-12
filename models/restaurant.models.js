const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      isVeg: Boolean,
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
},{timestamps:true});

const Restaurant = mongoose.model("Resaturant", restaurantSchema);
module.exports = Restaurant;
