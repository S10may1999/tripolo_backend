const propertySchema=require("../schema/property-schema");
const mongoose=require("mongoose");


const propertyImageAndVideoUpload = async (req, res) => {
    const { property_id } = req.body;
  
    if (!req.files || req.files.length === 0) {
      return res.status(404).json({ message: "No Files Uploaded" });
    }
  
    
    const filePath = req.files.map((file) => file.path);
    const photoList = filePath.toString().split(",");
  
  
    try {
      
      if (!mongoose.Types.ObjectId.isValid(property_id)) {
        return res.status(400).json({ message: "Invalid Property ID" });
      }
  
      const result = await propertySchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(property_id) },
        { propertyImages: photoList },
        { new: true }
      );
  
      if (!result) {
        return res.status(500).json({ message: "Update failed!" });
      }
  
      res.status(201).json({ message: "Images or videos uploaded successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!", error: err });
    }
  };
  
module.exports=propertyImageAndVideoUpload;