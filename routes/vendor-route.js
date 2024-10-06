const express=require("express");
const vendorDetailsPost=require("../controller/vendor-controller");

const route=express.Router();


route.post("/vendor-details-post",vendorDetailsPost.vendorDetailsPost );
route.post("/vendor-login",vendorDetailsPost.VendorLogin);

module.exports=route;