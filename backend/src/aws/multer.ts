import multer from "multer";

const allowedFiletypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2621440, // 2.5MB
  },
  fileFilter: (_req, file, cb) => {
    if (allowedFiletypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Not allowed avatar filetype"));
    }
  },
});
