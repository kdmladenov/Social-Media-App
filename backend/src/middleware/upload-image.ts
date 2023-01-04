import multer from 'multer';
import { uploads } from '../constants/constants.js';

// TO DO - finish backend validation in controller
export default multer({
  limits: { fileSize: uploads.MAX_FILE_SIZE }, // 5MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/bmp'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg, .bmp and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  }
});
