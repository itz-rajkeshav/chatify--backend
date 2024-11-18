import { v2 as cloudinary } from "cloudinary";
import { Console, log } from "console";
import fs from "fs";
import { Readable } from "stream"; // ES module-compatible import

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!uploadOnCloudinary) return console.log("there is not any file given");
//     // upload the file on the cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     // file has been uploaded
//     // console.log("file is uploaded on the cloudinary", response.url);
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     // remove the locally saved temporary file as the upload operation got failed
//     // fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// const uploadResult = await cloudinary.uploader
//   .upload(
//     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//     {
//       public_id: "shoes",
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });

// console.log(uploadResult);
// export { uploadOnCloudinary };
 const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    // Return a promise that resolves with the upload result
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Upload to cloudinary failed:", error);
            reject(error);
            return;
          }
          resolve(result);
        }
      );

      // Convert buffer to stream and pipe to cloudinary
      const bufferStream = Readable.from(fileBuffer);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error in uploadOnCloudinary:", error);
    return null;
  }
};
export { uploadOnCloudinary };
