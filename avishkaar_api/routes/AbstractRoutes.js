const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AbstractController = require("../controllers/AbstractController");

// Ensure upload directory exists
const uploadDir = "uploads/abstracts/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config
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
router.get("/", AbstractController.getAll);
router.get("/:id", AbstractController.getById);
router.get("/team/:teamId", AbstractController.getByTeamId);
router.post("/", upload.single("file"), AbstractController.create);
router.put("/:id", upload.single("file"), AbstractController.update);
router.delete("/:id", AbstractController.delete);

module.exports = router;
