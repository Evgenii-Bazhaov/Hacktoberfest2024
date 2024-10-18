const jwt = require('jsonwebtoken');
const User = require('../models/user')
require("dotenv").config();

//auth
exports.auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '') || req.body.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token not found'
            })
        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        } catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid'
            })
        }
        next()
    } catch(error){
        console.log("error in validating token: ", error);
        res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token'
        })
    }
}