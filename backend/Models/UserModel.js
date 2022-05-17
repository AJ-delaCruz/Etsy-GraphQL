const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
        // email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        name:{ type: String},
        img:{ type: String},
        street: {type: String},
        state: {type: String},
        city: {type: String},
        country: {type: String},
        zipCode: {type: Number},
        email: {type: String},
        phoneNum: {type: Number},
        birthDay: {type: Date},
        shopName:{ type: String},
        shopImg:{ type: String},
        products: [
            {
                productId: {
                    type: String,
                }
            },
        ],
    },

    {
        versionKey: false
    });


//model based on schema
const UserModel = mongoose.model('user', usersSchema);
module.exports = UserModel;