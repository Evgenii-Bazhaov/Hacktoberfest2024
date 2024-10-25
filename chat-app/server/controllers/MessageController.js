const Messages = require('../models/Message');

exports.addMsg = async (req,res) => {
    try{
        const {from, to, message} = req.body;
        if(!from || !to || !message){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        const data = await Messages.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        })
        console.log("data:" , data)
        if(data) 
            return res.status(200).json({
                success: true,
                message: "Message Added Successfully"
            });
        return res.status(400).json({
            success: false,
            message: "Something went wrong while adding message"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllMsg = async (req,res) => {
    try{
        const {from, to} = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt: 1});
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        return res.json({
            success: true,
            message: "All messages are returned",
            projectMessages
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}