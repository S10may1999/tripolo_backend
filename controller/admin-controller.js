const twilio=require('twilio');
const jwt=require("jsonwebtoken");

const sid=process.env.SID;
const auth_token=process.env.AUTH_TOKEN;
const phoneNumber=process.env.TWILIO_PHONE_NUMBER
const twilioClient=new twilio(sid,auth_token);
const adminModel=require("../schema/admin-schema");


const adminLogin=async(req,res)=>{
    const {mobileNumber}=req.query;

    await adminModel.findOne({adminMobile:mobileNumber}).then((result) => {
        if(!result) return res.status(404).json({message:"No Record Found !!"});
        const otp = Math.floor(100000 + Math.random() * 900000);
        const adminId=result._id;
        const token=jwt.sign({"id":adminId,"mobileNumber":mobileNumber},process.env.JWT_SECREAT_KEY);
        const mobileNumberWithStd="+91"+mobileNumber.toString();
        twilioClient.messages.create({
            body:`Your OTP is ${otp}`,
            to:mobileNumberWithStd,
            from:phoneNumber
        }).then((mess) => {
            res.status(200).json({
                message:"OTP sent Successfully !!",
                otp:otp,
                token:token,
                twilio_message:mess
            })
        }).catch((err) => {
            console.log("twilio error")
            res.status(500).json({
                message:"Something went Wrong !!",
                error:err
            })
        });
        
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            mess:"Something Went Wrong !!",
            error:err
        })
    });
}

const adminCreate=async(req,res)=>{
    const {adminName,adminMobile}=req.query;
    await adminModel.create({adminName:adminName,adminMobile:adminMobile}).then((result) => {
        res.status(201).json({
            message:"admin Created Successfully !!",
            id:result._id

        })
    }).catch((err) => {
        res.status(500).json({
            message:"Something Went Wrong !!",
            error:err
        })
    });

}

module.exports={adminLogin,adminCreate};