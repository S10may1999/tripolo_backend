const express=require("express");
const property =require("../controller/property-controller");
const propertyImageAndVideoUpload=require("../controller/property-image-uploader-controller");
const upload=require("../helper/cloudinary-storage");

const route=express.Router();


route.post("/property-upload",property.propertyDetailsUploader);
route.post("/property-image-upload",upload.array("media",100),propertyImageAndVideoUpload);
route.get("/property-details-all",property.propertyDataGet);

module.exports=route;