const mongoose = require('mongoose');

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => {console.log('DB connection successful')})
    .catch((err) => {
        console.error(err);
        console.log("DB Connection unsuccessful")
        process.exit(1);
    })
} 