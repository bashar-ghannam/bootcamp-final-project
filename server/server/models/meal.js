const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
  name: String,
  price: Number,
  ingredients: String,
  description: String,
  size: String, //number of person
  category: String, //lunch,breakfast
  type: String, //jucie,food
  vegan: Boolean,
  seafood: Boolean,
  nutAllergy: Boolean,
  egg: Boolean,
  milk: Boolean,
  gluten: Boolean,
  orderCounter: Number,
  rating: Number,
  liks: Number,
});

const Meal = mongoose.model('meal', mealSchema);
module.exports = Meal;
