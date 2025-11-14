const teamMemberService = require("../services/TeamMembersService");

const getAllMembers = async (req, res) => {
  try {
    const members = await teamMemberService.getAllMembers();
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getTeamMembersByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    console.log("Fetching members for teamId:", teamId);
    if (!teamId) {
      return res.status(400).json({ message: "teamId is required" });
    }

    const members = await teamMemberService.fetchMembersByTeamId(teamId);

    if (!members || members.length === 0) {
      return res.status(404).json({ message: "No members found for this team" });
    }

    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getMemberById = async (req, res) => {
  try {
    const member = await teamMemberService.getMemberById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const createMember = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { teamId, member_name, role, phone_number, email_id, gender } = req.body;
    console.log("Request Body:", req.body);
    let photo_url = null;
    if (req.file) photo_url = `/uploads/members/${req.file.filename}`;

    const memberData = { teamId, member_name, role, phone_number, email_id, gender, photo_url };
    const memberId = await teamMemberService.createMember(memberData);

    res.status(201).json({ message: "Member created successfully", memberId });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_NO_REFERENCED_ROW_2") return res.status(400).json({ message: "Invalid teamId" });
    res.status(500).json({ message: "Server error" });
  }
};





const updateMember = async (req, res) => {
  try {
    const affectedRows = await teamMemberService.updateMember(req.params.id, req.body);
    if (!affectedRows) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMember = async (req, res) => {
  try {
    const affectedRows = await teamMemberService.deleteMember(req.params.id);
    if (!affectedRows) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllMembers,
  getTeamMembersByTeamId,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
