import multer from 'multer';
import path from 'path';

const images = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'storage/images');
  },
  filename(req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

export default multer({ storage: images });
