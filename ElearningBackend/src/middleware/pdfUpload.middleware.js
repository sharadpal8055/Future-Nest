import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."));
  }
};

const pdfUpload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, //20MB
  },
  fileFilter,
});

export default pdfUpload;