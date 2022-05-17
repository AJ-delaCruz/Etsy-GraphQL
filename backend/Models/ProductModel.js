const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        // sellerId: {type: String, required: true, unique: true},
        // name: {type: String, required: true},
        // categories: {type: Array},
        // description: {type: String, required: true,},
        // img: {type: String, required: true},
        // price: {type: Number, required: true},
        // inStock: { type: Boolean, default: true }
        title: {type: String, required: true,},
        desc: {type: String, required: true},
        img: {type: String, required: true},
        categories: {type: Array},
        inStock: {type: Boolean, default: true},
        color: {type: Array},
        price: {type: Number, required: true},
        size: {type: Array},
        favorites: {type: Array}


    },
    {
        versionKey: false,
        timestamps: true
    }
);


const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;