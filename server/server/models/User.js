const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  phone: Number,
  email: String,
  favMeals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
});

const User = mongoose.model('user', userSchema);
module.exports = User;
