import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

const uploadToCloudinary = (buffer, { folder, resource_type = "image" }) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};

export default uploadToCloudinary;
