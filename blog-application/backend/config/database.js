const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose
    .connect(process.env.DATABASE_URL)
    .then( () => {console.log('DB connection successfull')})
    .catch((err) => {
        console.error(err);
        console.log("DB Connection unsuccessful")
        process.exit(1);
    })
} 