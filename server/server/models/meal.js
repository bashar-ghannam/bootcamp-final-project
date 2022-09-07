const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  category: [], //lunch,breakfast
  type: String, //jucie,food
  sensitivity: [],
  calories: Number,
  img: String,
  cookingTime: Number,
  orderCounter: Number,
  ratingSum: Number,
  ratingCounter: Number,
  likes: Number,
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
