const mongoose=require("mongoose");


const adminSchema=mongoose.Schema({
    adminName:{
        type:String,
        required:true,
    },
    adminMobile:{
        type:String,
        required:true
    }
})

const adminModel=mongoose.model("adminModel",adminSchema);


module.exports=adminModel;