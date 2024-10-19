const express = require("express")
const router = express.Router()

const {addMsg,getAllMsg} = require("../controllers/MessageController");


router.post("/addMsg", addMsg);
router.post("/getMsg", getAllMsg);

module.exports = router