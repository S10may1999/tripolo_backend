const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary=require("../db-config/cloudinary-config")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'uploads';
        let resourceType = "auto";
        let format = "auto";
        let transformation = [];

        if (file.mimetype.startsWith("image")) {
            folder = "images";
            resourceType = "image";
            format = "webp";
            transformation.push({ format: "webp" });
        } else if (file.mimetype.startsWith("video")) {
            folder = "videos";
            resourceType = "video";
            format = "mp4";
            transformation.push({ format: "mp4" });
        }
        return {
            folder: folder,
            resource_type: resourceType,
            allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mkv'],
            transformation: transformation
        };
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
