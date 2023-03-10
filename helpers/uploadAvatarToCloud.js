const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const imageOptions = {
  width: 250,
  height: 250,
  crop: 'thumb',
  gravity: 'faces',
  format: 'jpg',
};

const uploadAvatarToCloud = async fileToUpload => {
  try {
    const image = await cloudinary.uploader.upload(fileToUpload, {
      folder: 'rest-api-avatars',
      ...imageOptions,
    });
    return image.url;
  } catch (error) {
    error.status(500);
    error.message("File couldn't be written to cloud storage");
    throw error;
  }
};

module.exports = uploadAvatarToCloud;
