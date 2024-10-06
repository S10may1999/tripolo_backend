const vendorModel=require("../schema/vendor-schema");
const jwt=require("jsonwebtoken");
const twilio=require("twilio");
const sid=process.env.SID;
const auth_token=process.env.AUTH_TOKEN;
const phoneNumber=process.env.TWILIO_PHONE_NUMBER
const twilioClient=new twilio(sid,auth_token);


const vendorDetailsPost=(req, res)=>{
    const {vendorName, vendorContact, address, careTakerName, careTakerContact}=req.query;

    console.log(vendorName, vendorContact, address, careTakerName, careTakerContact);
    if(vendorName !=null && vendorContact !=null && address !=null && careTakerName !=null && careTakerContact !=null){
        vendorModel.create({vendorName:vendorName,VendorContact:vendorContact,address:address,careTakerName:careTakerName,careTakernumber:careTakerContact}).then((result) => {
            res.status(201).json({
                message:"Data Inserted Successfully !!",
                data_id:result._id
            })
        }).catch((err) => {
            res.status(400).json({
                message:"Something Went Wrong !!",
                error:err.toString()
            })
        });
    }
}


const VendorLogin=async(req,res)=>{
    const {mobileNumber}=req.query;
    await vendorModel.findOne({VendorContact:mobileNumber}).then((result) => {
        if(!result) return res.status(404).json({
            message:"No Record Found !!"
        });
        const otp = Math.floor(100000 + Math.random() * 900000);
        const vendorId=result._id;
        const token=jwt.sign({"id":vendorId,"mobileNumber":mobileNumber},process.env.JWT_SECREAT_KEY);
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
        console.log("mongo error",err)
        res.status(500).json({
            message:"Something Went Wrong !!",
            error:err
        })
    });

}




module.exports={vendorDetailsPost,VendorLogin}