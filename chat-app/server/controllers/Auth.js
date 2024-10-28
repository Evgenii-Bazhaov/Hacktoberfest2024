const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signUp = async(req,res) => {
    try{

        const {firstName, lastName, password, confirmPassword, email} = req.body;
        if(!firstName, !password, !confirmPassword, !email){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password value does not match, please try again'
            })
        }
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:'User already exist, please sign in to continue'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email, 
            firstName,
            lastName,
            password: hashedPassword
        })
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again'
        })
    }
}

exports.login = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return req.status(400).json({
                success:false,
                message:'Please Fill up All the Required Fields'
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not Registered with Us Please SignUp to Continue'
            })
        }
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'24h'});
            user.token = token;
            user.password = undefined;
            const options =  {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect'
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:`Login Failure Please Try Again`
        })
    }
}