// controllers/mentorController.js
const mentorService = require("../services/MentorsService");

// ✅ Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorService.getAllMentors();
    res.status(200).json({ success: true, data: mentors });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ success: false, message: "Failed to fetch mentors" });
  }
};

// ✅ Get mentor by ID
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await mentorService.getMentorById(req.params.id);
    if (!mentor)
      return res.status(404).json({ success: false, message: "Mentor not found" });
    res.status(200).json({ success: true, data: mentor });
  } catch (error) {
    console.error("Error fetching mentor:", error);
    res.status(500).json({ success: false, message: "Failed to fetch mentor" });
  }
};

// ✅ Add mentor
exports.addMentor = async (req, res) => {
  try {
    let { mentor_name, designation, email, tech_stack } = req.body;

    if (!mentor_name || !email || !tech_stack) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email, and tech stack are required." });
    }

    // 🔹 Format name and tech stack for ID
    const namePart = mentor_name.replace(/\s+/g, "").toUpperCase();
    const techPart = tech_stack.split(",")[0].replace(/\s+/g, "").toUpperCase();

    // 🔹 Generate Mentor ID (MENTOR_<NAME>_<TECH>)
    const mentor_id = `MENTOR_${namePart}_${techPart}`;

    // 🔹 Create mentor object
    const mentorData = {
      mentor_id,
      mentor_name,
      designation,
      email,
      tech_stack,
    };

    // 🔹 Add to DB
    const newMentor = await mentorService.addMentor(mentorData);

    res.status(201).json({
      success: true,
      message: "Mentor added successfully",
      data: newMentor,
    });
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ success: false, message: "Failed to add mentor" });
  }
};

// ✅ Update mentor
exports.updateMentor = async (req, res) => {
  try {
    const updatedMentor = await mentorService.updateMentor(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedMentor });
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ success: false, message: "Failed to update mentor" });
  }
};

// ✅ Delete mentor
exports.deleteMentor = async (req, res) => {
  try {
    await mentorService.deleteMentor(req.params.id);
    res.status(200).json({ success: true, message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ success: false, message: "Failed to delete mentor" });
  }
};
