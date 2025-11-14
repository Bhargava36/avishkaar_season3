const { get } = require("../routes/AbstractResultsRoutes");
const mentorRequestService = require("../services/MentorRequestService");

// Create new mentor request
const createMentorRequest = async (req, res) => {
  try {
    const { team_id, message } = req.body;

    if (!team_id) {
      return res
        .status(400)
        .json({ success: false, message: "Team ID is required" });
    }

    // ✅ Generate custom request_id using team_id + timestamp + random number
    const datePart = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, ""); // e.g., 20251109
    const randomPart = Math.floor(1000 + Math.random() * 9000); // e.g., 8472
    const cleanTeamId = String(team_id).replace(/\s+/g, "").toUpperCase();

    const request_id = `REQ-${cleanTeamId}-${datePart}-${randomPart}`;

    const status = "Pending";
    const created_at = new Date();
    const updated_at = new Date();

    await mentorRequestService.createMentorRequest({
      request_id,
      team_id,
      message,
      status,
      created_at,
      updated_at,
    });

    res.status(201).json({
      success: true,
      message: "Mentor request submitted successfully",
      request_id,
    });
  } catch (err) {
    console.error("Error creating mentor request:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getMentorRequestsByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: "Team ID is required",
      });
    }

    const requests = await mentorRequestService.getMentorRequestsByTeamId(teamId);

    if (!requests || requests.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No mentor requests found for this team",
      });
    }

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (err) {
    console.error("Error fetching mentor requests by team:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get all mentor requests
const getAllMentorRequests = async (req, res) => {
  try {
    const data = await mentorRequestService.getAllMentorRequests();
    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching mentor requests:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get mentor request by ID
const getMentorRequestById = async (req, res) => {
  try {
    const { request_id } = req.params;
    const data = await mentorRequestService.getMentorRequestById(request_id);

    if (!data) {
      return res.status(404).json({ success: false, message: "Mentor request not found" });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching mentor request:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update mentor request status
const updateMentorRequestStatus = async (req, res) => {
  try {
    const { request_id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    await mentorRequestService.updateMentorRequestStatus(request_id, status);
    res.json({ success: true, message: `Status updated to '${status}'` });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete mentor request
const deleteMentorRequest = async (req, res) => {
  try {
    const { request_id } = req.params;
    await mentorRequestService.deleteMentorRequest(request_id);
    res.json({ success: true, message: "Mentor request deleted successfully" });
  } catch (err) {
    console.error("Error deleting mentor request:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createMentorRequest,
  getAllMentorRequests,
  getMentorRequestById,
  getMentorRequestsByTeamId,
  updateMentorRequestStatus,
  deleteMentorRequest,
};
