import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderID: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
