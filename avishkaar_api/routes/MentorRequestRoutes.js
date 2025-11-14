const express = require("express");
const router = express.Router();
const mentorRequestController = require("../controllers/MentorRequestController");

// Create a mentor request
router.post("/", mentorRequestController.createMentorRequest);

// Get all mentor requests
router.get("/", mentorRequestController.getAllMentorRequests);

// Get single mentor request by ID
router.get("/:request_id", mentorRequestController.getMentorRequestById);

router.get("/team/:teamId",mentorRequestController.getMentorRequestsByTeamId);
// Update mentor request status
router.put("/:request_id", mentorRequestController.updateMentorRequestStatus);

// Delete mentor request
router.delete("/:request_id", mentorRequestController.deleteMentorRequest);

module.exports = router;
