
// const path = require("path");
// const express = require('express');
// const multer = require("multer");
// const AbstractDraftController = require("../controllers/AbstractDraftController");
// const router = express.Router();
// // ✅ Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/abstracts/"); // Folder to store files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage });
// // ✅ Routes
// router.get("/", AbstractDraftController.getAll);
// router.get("/:id", AbstractDraftController.getById);
// router.get("/team/:teamId", AbstractDraftController.getByTeamId);
// // ✅ Create Draft (with file upload)
// router.post("/", upload.single("file"), AbstractDraftController.create);
// // ✅ Update Draft (file optional)
// router.put("/:id", upload.single("file"), AbstractDraftController.update);
// router.delete("/:id", AbstractDraftController.delete);
// module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const AbstractDraftController = require("../controllers/AbstractDraftController");

// Storage setup for files
const uploadDir = "uploads/abstracts/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });






// Routes
router.get("/", AbstractDraftController.getAll);
router.get("/:id", AbstractDraftController.getById);
router.get("/team/:teamId", AbstractDraftController.getByTeamId);
router.post("/", upload.single("file"), AbstractDraftController.create);
router.put("/:id", upload.single("file"), AbstractDraftController.update);
router.delete("/:id", AbstractDraftController.delete);

module.exports = router;
