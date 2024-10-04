const vendorModel=require("../schema/vendor-schema");

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





module.exports={vendorDetailsPost}