// routes/mentorRoutes.js
const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/MentorsController");

// ✅ Routes
router.get("/", mentorController.getAllMentors);
router.get("/:id", mentorController.getMentorById);
router.post("/", mentorController.addMentor);
router.put("/:id", mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
