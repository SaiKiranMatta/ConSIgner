// models/Product.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },

    image: {
        type: String, // Assuming the image is stored as a URL
        required: true,
    },
});

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
