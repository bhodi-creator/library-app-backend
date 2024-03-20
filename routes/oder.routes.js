const express = require('express');
const oderRouter = express.Router();
const Order = require('../model/oder.model.js');
const auth = require('../middleware/auth.middleware.js');

// POST create a new order
oderRouter.post('/', async (req, res) => {
  try {
    const { user, books, totalAmount } = req.body;
    const newOrder = new Order({ user, books, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all orders (for admin)
oderRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('books');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
    oderRouter
};
