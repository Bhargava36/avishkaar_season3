const express = require("express");
const router = express.Router();
const mentorAssignmentController = require("../controllers/MentorAssignmentsController");

// Routes
router.post("/", mentorAssignmentController.createAssignment);
router.put("/:team_id", mentorAssignmentController.updateAssignment);
router.get("/", mentorAssignmentController.getAllAssignments);
router.get("/:team_id", mentorAssignmentController.getAssignmentByTeam);

module.exports = router;
