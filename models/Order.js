const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  shipDifferent: { type: Boolean, default: false },
  shipDetails: {
    firstName: { type: String },
    lastName: { type: String },
    country: { type: String },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    postcode: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  orderNotes: { type: String },
  cartItems: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);