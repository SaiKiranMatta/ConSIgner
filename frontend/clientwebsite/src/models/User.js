// models/Order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for users
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product' // Assuming you have a Product model for products
  }],

});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
