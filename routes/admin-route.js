const express=require("express");
const adminController=require("../controller/admin-controller");

const route=express.Router();

route.post("/admin-login",adminController.adminLogin);
route.post("/admin-register",adminController.adminCreate);

module.exports=route;