const express = require("express")
const router = express.Router()

const {getAllUsers} = require("../controllers/Profile");


router.get("/getAllUsers/:id", getAllUsers);

module.exports = router