import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret, // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader.upload(path, {
    public_id: imageName,
  });

  // delete path from uploads file after upload in mongodb
  fs.unlink(path, (err) => {
    if (err) {
      throw new Error('failed to remove file from uploads folder');
    }
  });
  return uploadResult;
};

// parse file and store to uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });