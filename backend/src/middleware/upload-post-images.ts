import multer from 'multer';

// TO DO finish backend validation in controller

export default multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype, 'file.mimetype');
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/bmp' ||
      file.mimetype == 'video/*'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
  }
}).array('postImages', 10);
