import multer from 'multer';
import path from 'path';

const stories = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'storage/stories');
  },
  filename(req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

export default multer({ storage: stories });
