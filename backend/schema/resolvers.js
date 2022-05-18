const {UserInputError} = require('apollo-server');
const User = require('../Models/UserModel');
const Product = require("../Models/ProductModel");
const jwt = require('jsonwebtoken');
const {secret} = require('../Utils/config')
const {auth} = require("../Utils/passport");
auth();

module.exports = {
    Query: {
        getAllUsers: async () => {
            const allUsers = await User.find({});
            return allUsers;
        },
        getProfile: async (_, args) => {
            const {userId} = args;
            const getUser = await User.findById(userId);
            return getUser;
        },
        getShop: async (_, args) => {
            const {userId} = args;
            const getShop = await User.findById(userId);
            return getShop;
        },
        getSingleProduct: async (_, args) => {
            const {id} = args;
            const singleProduct = await Product.findById(id);
            return singleProduct;
        },
        getAllProducts: async () => {
            const allProducts = await Product.find({}).limit(10);
            return allProducts;
        },
        getProducts: async (_, args) => {
            const {categories, sortBy, filterBySearch} = args;
            // const {categories, sortBy, filterBySearch} = args;
            // const {categories} = args;

            let products, sortQuery;

            if (categories) {
                products = await Product.find({
                    categories: {
                        $in: [categories], //list products with specific category
                    },
                });
            } else if (filterBySearch) {
                products = await Product.find({
                    title: {
                        $regex: filterBySearch,
                    },
                });
            } else if (sortBy) {
                switch (sortBy) {
                    case 'price':
                        sortQuery = {price: -1};
                        break;
                    case 'oldest':
                        sortQuery = {createdAt: 1};
                        break;
                    default:
                        sortQuery = {createdAt: -1};
                }
                products = await Product.find({}).sort(sortQuery);
            } else products = await Product.find({});


            return products;
        }
    },
    Mutation: {
        register: async (_, args) => {
            const {username, password} = args;
            const user = new User({
                username,
                password
            });

            const savedUser = await user.save();

            const payload = {id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });

            return {
                id: savedUser._id,
                username: savedUser.username,
                token
            };
        },

        login: async (_, args) => {
            const {username, password} = args;
            const user = await User.findOne({
                username: {$regex: new RegExp('^' + username + '$', 'i')},
                password: {$regex: new RegExp('^' + password + '$', 'i')}
            });

            if (!user) {
                throw new UserInputError("Username or password is invalid");
            }

            const payload = {id: user._id, username: user.username};
            const token = jwt.sign(payload, secret, {
                expiresIn: 1008000
            });

            return {
                id: user._id,
                username: user.username,
                token

            };
        },

        editProfile: async (_, args) => {
            const {userId, name, img, street, state, city, country, zipCode, email, phoneNum, birthDay} = args;


            const updatedProfile = {
                name, img, street, state, city, country, zipCode, email, phoneNum, birthDay
            };

            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new UserInputError(
                        `User with ID: ${userId} does not exist in DB.`
                    );
                }

                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    updatedProfile,
                    {new: true}
                )

                return updatedUser;
            } catch (err) {
                throw new UserInputError(err);
            }
        },

        createShop: async (_, args) => {
            const {userId, shopName} = args;


            const newShop = {
                shopName
            };

            try {
                const shopExist = await User.findOne({
                    shopName: {$regex: new RegExp('^' + shopName + '$', 'i')}
                });
                if (!shopExist) {
                    const createShop = await User.findByIdAndUpdate(
                        userId, newShop, {new: true}
                    )
                    return createShop;
                }
            } catch (err) {
                throw new UserInputError("Shop name already exists");
            }


            return {
                id: createShop._id,
                shopName: createShop.shopName,

            };
        },

        editShop: async (_, args) => {
            const {userId, shopName, shopImg} = args;


            const updateshop = {
                shopName, shopImg
            };

            const updatedShop = await User.findByIdAndUpdate(
                userId, updateshop, {new: true}
            )


            return {
                id: updatedShop._id,
                shopName: updatedShop.shopName,
                shopImg: updatedShop.shopImg

            };
        },


        createProduct: async (_, args) => {
            const {sellerId, title, img, description, categories, price, quantity} = args;


            const newProduct = new Product({
                sellerId, title, img, description, categories, price, quantity
            });

            const savedProduct = await newProduct.save();
            return {
                id: savedProduct._id,
                sellerId: savedProduct.sellerId,
                title: savedProduct.title,
                img: savedProduct.img,
                description: savedProduct.description,
                categories: savedProduct.categories,
                price: savedProduct.price,
                quantity: savedProduct.quantity

            };
        },

        editProduct: async (_, args) => {
            const {id, title, img, description, categories, price, quantity} = args;


            const updateProduct = {
                title, img, description, categories, price, quantity
            };

            const savedProduct = await Product.findByIdAndUpdate(
                id, updateProduct, {new: true}
            )


            return {

                title: savedProduct.title,
                img: savedProduct.img,
                description: savedProduct.description,
                categories: savedProduct.categories,
                price: savedProduct.price,
                quantity: savedProduct.quantity

            };
        },

    },
};
