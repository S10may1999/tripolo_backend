const propertyModel=require("../schema/property-schema");
const propertySchema=require("../schema/property-schema");

const propertyDetailsUploader=(req,res)=>{
    const{
        vendorId,
        propertyName,
        isPool,
        poolSize,
        isGarden,
        isActivites,
        activites,
        isAmenties,
        ameneties,
        priceWithFoodWeekdays,
        priceWithoutFoodWeekDays,
        priceWithFoodWeekends,
        priceWithoutFoodWeekends,
        maxGuest,
        extraCharge,
        }=req.query;
    const activiesList=activites.split(",");
    const amentiesList=ameneties.split(",");
    propertyModel.create({
        vendorId:vendorId,
        propertyName:propertyName,
        isPool:isPool,
        poolSize:poolSize,
        isGarden:isGarden,
        isActivity:isActivites,
        activities:activiesList,
        isAmenties:isAmenties,
        amenties:amentiesList,
        priceWithFoodWeekdays:priceWithFoodWeekdays,
        priceWithoutFoodWeekdays:priceWithoutFoodWeekDays,
        priceWithFoodWeekend:priceWithFoodWeekends,
        priceWithoutFoodWeekend:priceWithoutFoodWeekends,
        maxGuest:maxGuest,
        extraCharge:extraCharge
    }).then((result) => {
       return res.status(201).json({
            message:"Data inserted successfully !!",
            vill_id:result._id
        })
    }).catch((err) => {
       return res.status(500).json({
            message:'somthing went wrong !!',
            error:err

        })
    });

}


const propertyDataGet=async(req,res)=>{
        await propertySchema.find().then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(404).json({
                message:"Something Went Wrong try again !!"
            })
        });
}


module.exports={propertyDetailsUploader, propertyDataGet}