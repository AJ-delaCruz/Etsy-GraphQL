//connect to mongoDB
const {mongoDB} = require('./config'); //dotenv.config();
const mongoose = require('mongoose');

const mongoDBConnection = () =>
    mongoose.connect(mongoDB, (err, res) => { //mongoose.connect(process.env.MONGO_URL) for better security
        if (err) {
            console.log(err);
            console.log(`MongoDB Connection Failed`);
        } else {
            console.log(`MongoDB Connected`);
        }
    });

module.exports = mongoDBConnection;
