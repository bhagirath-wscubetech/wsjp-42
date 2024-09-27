const mongoose = require('mongoose');
const { Schema } = mongoose;

const shippingAddressSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        default: null
    },
    shipping_address: {
        type: [shippingAddressSchema],
        default: [],
    },
    status: {
        type: Boolean,
        default: 1
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;