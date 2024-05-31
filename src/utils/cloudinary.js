import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRECT,
});

const uploadOnCloudenary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload the file in cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file hasbeen uploaded successfully

    console.log("file is uploaded on clouninary", response.url);

    return response;
  } catch (error) {
    fs.unlink(localFilePath); //remove the file from local
    return null
  }
};

export  {uploadOnCloudenary};
