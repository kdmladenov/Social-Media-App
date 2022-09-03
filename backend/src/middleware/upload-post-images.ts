import multer from 'multer';
import path from 'path';

const postImages = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'storage/post-images');
  },
  filename(req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

export default multer({
  storage: postImages,
  limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
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