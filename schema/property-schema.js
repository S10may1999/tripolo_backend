const { type } = require("express/lib/response");
const mongoose=require("mongoose");

const propertySchema=mongoose.Schema({
    vendorId:{
        type:String,
        required:true
    },
    propertyName:{
        type:String,
        required:true,
    },
    isPool:{
        type:Boolean,
        required:true,
    },
    poolSize:{
        type:String,
        required:function(){return this.isPoool}
    },
    isGarden:{
        type:Boolean,
        required:true,
    },
    isActivity:{
        type:Boolean,
        required:true,
    },
    activities:{
        type:[String],
        required:function(){return this.isActivity}
    },
    isAmenties:{
        type:Boolean,
        required:true
    },
    amenties:{
        type:[String],
        required:function(){return this.isAmenties}
    },
    priceWithFoodWeekdays:{
        type:String,
        required:true
    },
    priceWithoutFoodWeekdays:{
        type:String,
        required:true
    },
    priceWithFoodWeekend:{
        type:String,
        required:true,
    },
    priceWithoutFoodWeekend:{
        type:String,
        required:true
    },
    maxGuest:{
        type:String,
        required:true
    },
    extraCharge:{
        type:String,
        required:true
    },
    propertyImages:{
        type:[String],
        required:false
    }
})


const propertyModel=mongoose.model("property",propertySchema);


module.exports=propertyModel;

