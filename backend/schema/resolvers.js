const {UserInputError} = require('apollo-server');
const User = require('../Models/UserModel');
const Product = require("../Models/ProductModel");
const Order = require("../Models/OrderModel");
const Favorite = require("../Models/FavoriteModel");
const jwt = require('jsonwebtoken');
const {secret} = require('../Utils/config')
// const {auth} = require("../Utils/passport");
const bcrypt = require('bcrypt');
const {checkAuth} = require("../utils/passport");

// auth();

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
        getSellerProduct: async (_, args) => {
            const {sellerId} = args;
            const sellerProduct = await Product.find({
                sellerId: {
                    $in: [sellerId],
                }
            });
            return sellerProduct;
        },
        getSingleProduct: async (_, args) => {
            const {id} = args;
            const singleProduct = await Product.findById(id);
            return singleProduct;
        },
        getAllProducts: async () => {
            const allProducts = await Product.find({}).limit(20);
            return allProducts;
        },
        getFavoriteProducts: async (_, args) => {
            const {userId} = args;
            const favoriteProducts = await Favorite.find({userId: userId});
            return favoriteProducts;
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
        },

        uploads: async (_, args) => {
            const {img} = args;
            const getImg = await User.find(img);
            return getImg;
        },
    },
    Mutation: {
        register: async (_, args) => {
            const {name, username, password} = args;


            const existingUser = await User.findOne({
                username: username,
            });

            console.log(existingUser);
            if (existingUser) {
                throw new UserInputError(`Username '${username}' is already taken.`);
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const user = new User({
                name,
                username,
                password: passwordHash
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

        login: async (_, args, checkAuth) => {
            const {username, password} = args;
            const user = await User.findOne({
                username: username,
            });

            if (!user) {
                throw new UserInputError("Username or password is invalid");
            }
            const credentialsValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!credentialsValid) {
                throw new UserInputError('Invalid credentials.');
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

            console.log(args);

            const updatedProfile = {
                name, img, street, state, city, country, zipCode, email, phoneNum, birthDay
            };
            console.log(img);
            console.log(city);


            try {
                const user = await User.findById(userId);
                if (!user) {
                    throw new UserInputError(
                        `User with ID: ${userId} does not exist in DB.`
                    );
                }

                const updatedUser = await User.findByIdAndUpdate(
                    userId,
                    {$set: updatedProfile},
                    // {new: true}
                )

                console.log(updatedUser)
                return updatedUser;
            } catch (err) {
                throw new UserInputError(err);
            }
        },
        singleUpload: async (parent, {file}) => {
            const {filename, mimetype, encoding} = await file;
            let stream = createReadStream();

            let {ext, name} = parse(filename);
            name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
            let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);
            serverFile = serverFile.replace(' ', '_');
            let writeStream = await createWriteStream(serverFile);
            await stream.pipe(writeStream);
            serverFile = `${BASE_URL}${serverFile.split('uploads')[1]}`;

            return serverFile;
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
                        userId, {$set: newShop}, {new: true}
                    )
                    return createShop;
                }
            } catch (err) {
                throw new UserInputError("Shop name already exists");
            }

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
            const {sellerId, shopName, title, img, description, categories, price, quantity} = args;


            const newProduct = new Product({
                sellerId, shopName, title, img, description, categories, price, quantity
            });

            const savedProduct = await newProduct.save();
            return {
                id: savedProduct._id,
                shopName: savedProduct.shopName,
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
        removeProduct: async (_, args) => {
            const {id} = args;

            const product = await Product.findById(id);
            if (!product) {
                throw new UserInputError(
                    `Product with ID: ${id} does not exist.`
                );
            }
            await Product.findByIdAndDelete(id);
            return product;
        },

        createOrder: async (_, args) => {
            const {userId, productId, title, img, price, quantity} = args;

            const newOrder = new Order({
                userId, productId, title, img, price, quantity
            });

            const savedOrder = await newOrder.save();
            return {
                id: savedOrder._id,
                productId: savedOrder.productId,
                userId: savedOrder.userId,
                title: savedOrder.title,
                img: savedOrder.img,
                price: savedOrder.price,
                quantity: savedOrder.quantity

            };
        },

        singleUpload: async (parent, {file}) => {
            console.log(file);
        },

        addFavorite: async (_, args) => {
            const {userId, productId} = args;

            const newFavorite = new Favorite({
                userId, productId
            });

            const savedFavorite = await newFavorite.save();
            return {
                id: savedFavorite._id,
                userId: savedFavorite.userId,
                productId: savedFavorite.productId,

            };
        },
        removeFavorite: async (_, args) => {
            const {id} = args;

            const favorite = await Favorite.findById(id);
            if (!favorite) {
                throw new UserInputError(
                    `Favorite product with ID: ${id} does not exist.`
                );
            }
            await Favorite.findByIdAndDelete(id);
            return favorite;

        },




    },
};
