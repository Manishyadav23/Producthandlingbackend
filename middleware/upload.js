const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'olx-products', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage }).array('images', 3);

module.exports = upload;
