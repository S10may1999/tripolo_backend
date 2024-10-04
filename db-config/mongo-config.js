const mongoose=require("mongoose");
require("dotenv").config();


const connectDB=()=>{
    mongoose.connect(process.env.CONNECT_DB_STRING).then(()=>{
        console.log("Database Connected Successfully !!");
    }).catch((error)=>{
        console.log(`Something Went Wrong !! ${error}`);
    })
}


module.exports=connectDB;