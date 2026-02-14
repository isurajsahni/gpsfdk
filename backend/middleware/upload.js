const path = require('path');
const multer = require('multer');

// Store in backend/uploads (or use public folder if serving static)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, unique + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/i;
  const ext = path.extname(file.originalname).slice(1);
  if (allowed.test(ext) || allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

exports.uploadMultiple = upload.array('images', 10);
exports.uploadSingle = upload.single('image');
