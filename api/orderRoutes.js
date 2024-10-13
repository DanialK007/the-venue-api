const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// @route POST /api/orders
// @desc Save a new order
router.post('/', async (req, res) => {
  const {
    firstName, lastName, country, address, state, city, postcode, phone, email, 
    shipDifferent, shipDetails, orderNotes, cartItems, totalPrice
  } = req.body;

  try {
    const newOrder = new Order({
      firstName,
      lastName,
      country,
      address,
      state,
      city,
      postcode,
      phone,
      email,
      shipDifferent,
      shipDetails,
      orderNotes,
      cartItems,
      totalPrice
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route GET /api/orders
// @desc Get all orders
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// Export as a serverless function
module.exports = (req, res) => {
  const handler = express();
  handler.use(router);
  handler(req, res);
};