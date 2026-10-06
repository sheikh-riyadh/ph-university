import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import crypto from "crypto";
import multer from "multer";
import config from "../config";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloudinary_app_name as string,
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_api_secret as string,
});

export const sendImageToCloudinary = (
  filePath: string,
  imageName: string,
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: imageName,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Cloudinary upload failed"));
        }

        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) {
            return reject(unlinkError);
          }

          resolve(result);
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err, "");
      cb(null, file.fieldname + "-" + raw.toString("hex"));
    });
  },
});

export const upload = multer({ storage: storage });
