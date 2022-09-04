const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  meals: Array,
  logo: String,
  description: String,
  workHours: String,
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = Restaurant;
