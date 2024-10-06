const mongoose=require("mongoose");


const chatSchema=mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    userId: String
})


const chatModel=mongoose.model("chat",chatSchema);

module.exports=chatModel;