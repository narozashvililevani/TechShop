const mongoose = require('mongoose');

const productSchema =  new mongoose.Schema({
    name: { type: String,  required: true },
    img: { type: String,  required: true },
    brand: { type: String,  required: true },
    category: { type: String,  required: true },
    price: { type: Number, default: 0,  required: true },
    rating: { type: Number, default: 1,  required: false },
    numReviews: { type: Number, default: 1, required: false },
    countInStock: {type: Number, default: 0,  required: true },
    desctiption:  { type: String,  required: true }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;