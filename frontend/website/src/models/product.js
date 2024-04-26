// models/Product.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  productWeight: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  image: {
    type: String, // Assuming the image is stored as a URL
    required: true
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
