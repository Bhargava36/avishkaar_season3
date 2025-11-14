const pool = require("../config/db");

const getAllMembers = async () => {
  const [rows] = await pool.query("SELECT * FROM team_members");
  return rows;
};
const fetchMembersByTeamId = async (teamId) => {
  console.log("Service: Fetching members for teamId:", teamId);
  const [rows] = await pool.query(
    "SELECT * FROM team_members WHERE teamId = ?",
    [teamId]
  );
  console.log("Service: Retrieved members:", rows);
  return rows;
};

const getMemberById = async (memberId) => {
  const [rows] = await pool.query("SELECT * FROM team_members WHERE memberId = ?", [memberId]);
  return rows[0];
};



const createMember = async (memberData) => {
  const { teamId, member_name, role, phone_number, email_id, photo_url, gender } = memberData;

  const [result] = await pool.query(
    `INSERT INTO team_members 
      (teamId, member_name, role, phone_number, email_id, photo, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [teamId, member_name, role, phone_number, email_id, photo_url, gender]
  );

  return result.insertId;
};

module.exports = { createMember };


const updateMember = async (memberId, data) => {
  const { member_name, phone_number, email_id } = data;
  const [result] = await pool.query(
    `UPDATE team_members SET member_name=?,  phone_number=?, email_id=? WHERE memberId=?`,
    [member_name, phone_number, email_id, memberId]
  );
  return result.affectedRows;
};

const deleteMember = async (memberId) => {
  const [result] = await pool.query("DELETE FROM team_members WHERE memberId=?", [memberId]);
  return result.affectedRows;
};

module.exports = {
  getAllMembers,
  fetchMembersByTeamId,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
