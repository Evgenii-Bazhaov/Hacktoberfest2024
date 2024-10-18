const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async(req,res) => {
    try{
        const {username, email, password, confirmPassword} = req.body;
        if(!username || !email || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:'Please Fill up All the Required Fields'
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password value does not match, please try again'
            })
        }
        const userAlreadyExistByEmail = await User.findOne({email: email });
        const userAlreadyExistByUsername = await User.findOne({username: username });
        
        if(userAlreadyExistByEmail && userAlreadyExistByUsername){
            return res.status(400).json({
                success:false,
                message:'User already exist, please sign in to continue'
            })
        }
        else if(userAlreadyExistByUsername && !userAlreadyExistByEmail) {
            return res.status(400).json({
                success:false,
                message:'Username already exist, please try another username'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user
        })

    }
    catch(error){
        console.log("error in signup ", error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again'
        })
    }

}

exports.login = async(req,res) => {
    try{
        const{content, password} = req.body;
        if((!content) && !password){
            return res.status(400).json({
                success:false,
                message:'Please Fill up All the Required Fields'
            })
        }
        const user = await User.findOne({
            $or: [
                { email: content },
                { username: content },
            ],
        });
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not Registered with Us Please SignUp to Continue'
            })
        }
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email:user.email,
                username: user.username,
                id:user._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'24h'});
            user.token = token;
            res.status(200).json({
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

exports.checkUsername = async(req,res) => {
    try{
        const {username} = req.body;
        const existingUser = await User.findOne({username: username});

        if (existingUser) {
            return res.status(500).json({
                success:false,
                message:`Username is already taken`
            })
        }

        return res.status(200).json({
            success:true,
            message:`Username is unique`
        })
    }
    catch(error){
        console.log(err);
        res.status(500).json({
            success:false,
            message:` Failure in checking username Please Try Again`
        })
    }
}