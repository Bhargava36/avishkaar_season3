const mentorAssignmentService = require("../services/MentorAssignmentsService");

exports.createAssignment = async (req, res) => {
  try {
    const { mentor_id, team_id, assigned_by } = req.body;
    if (!mentor_id || !team_id) {
      return res
        .status(400)
        .json({ success: false, message: "mentor_id and team_id are required" });
    }

    const result = await mentorAssignmentService.createAssignment(
      mentor_id,
      team_id,
      assigned_by || "Admin"
    );

    res.status(201).json({
      success: true,
      message: "Mentor assigned successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating mentor assignment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create mentor assignment" });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { mentor_id, assigned_by } = req.body;

    if (!mentor_id) {
      return res
        .status(400)
        .json({ success: false, message: "mentor_id is required" });
    }

    const result = await mentorAssignmentService.updateAssignment(
      team_id,
      mentor_id,
      assigned_by || "Admin"
    );

    res.json({
      success: true,
      message: "Mentor assignment updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating mentor assignment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update mentor assignment" });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const data = await mentorAssignmentService.getAllAssignments();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching mentor assignments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch mentor assignments" });
  }
};

exports.getAssignmentByTeam = async (req, res) => {
  try {
    const { team_id } = req.params;
    const data = await mentorAssignmentService.getAssignmentByTeam(team_id);

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch assignment" });
  }
};
