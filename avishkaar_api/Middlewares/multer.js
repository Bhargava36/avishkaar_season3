// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // ✅ Ensure "uploads" folder exists before saving files
// const uploadDir = path.join(__dirname, "../uploads/");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ Configure Multer Storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
//     }
// });

// // ✅ File filter for images only
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only images are allowed"), false);
//     }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/members/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
