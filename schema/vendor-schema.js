const mongoose=require("mongoose");

const vendorSchema=mongoose.Schema({
    vendorName:{
        type:String,
        required:true,
    },
    VendorContact:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    careTakerName:{
        type:String,
        required:true,
    },
    careTakernumber:{
        type:String,
        required:true
    }
});


const vendorModel=mongoose.model("vendorModel",vendorSchema);

module.exports=vendorModel;