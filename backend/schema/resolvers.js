const {UserInputError} = require('apollo-server');
const User = require('../Models/UserModel');
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


            const updatedProfile= {
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
    },
};
