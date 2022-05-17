const { UserInputError } = require('apollo-server');
const User = require('../Models/UserModel');

module.exports = {
    Query: {
        getAllUsers: async () => {
            const allUsers = await User.find({});
            return allUsers;
        },
    },
    Mutation: {
        register: async (_, args) => {
            const { username, password } = args;
            const user = new User({
                username,
                password
            });

            const savedUser = await user.save();

            return {
                id: savedUser._id,
                username: savedUser.username,
                password: savedUser.password,
            };
        },

        login: async (_, args) => {
            const { username, password } = args;
            const user = await User.findOne({
                username: { $regex: new RegExp('^' + username + '$', 'i')},
                password: { $regex: new RegExp('^' + password + '$', 'i')}
            });

            if (!user) {
                throw new UserInputError("User or password is invalid");
            }
            return {
                id: user._id,
                username: user.username,

            };
        },
    },
};
