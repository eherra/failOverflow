import multer from "multer";

const allowedFiletypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const upload = multer({
  dest: "uploads/",
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
