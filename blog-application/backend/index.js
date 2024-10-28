const express = require('express');
const app = express();
const { dbConnect } = require('./config/database');
const cors = require("cors");
const userRoutes = require('./routes/user');
require('dotenv').config();

const port = process.env.PORT || 4000;

dbConnect();
app.use(
    cors({
        origin: "*",
        credentials:true
    })
)
app.use(express.json());
app.use("/api", userRoutes);

app.listen(port, () => {
    console.log("App is listening on port: ", port);
})