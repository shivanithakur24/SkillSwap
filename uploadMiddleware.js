const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skillswap",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "avi", "gif"],
    resource_type: "auto",
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
