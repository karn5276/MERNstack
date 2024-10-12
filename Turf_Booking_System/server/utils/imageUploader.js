const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder) => {
    

    return await cloudinary.uploader.upload(file.tempFilePath, folder);
}