const User = require('../models/User');

exports.getAllUsers = async (req,res) => {
    try{
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "firstName",
            "lastName",
            "_id"
        ])
        res.status(200).json({
            success:true,
            users
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

 