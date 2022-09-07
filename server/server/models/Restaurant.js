const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  img: String,
  description: String,
  workHours: String,
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = Restaurant;
