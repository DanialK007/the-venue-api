const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  contents: {
    type: [String], // Array of strings for contents
    required: true,
  }
});

const menuItemSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  dishes: [dishSchema], // Array of dishes for each category
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu');

module.exports = MenuItem;