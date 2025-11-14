// services/mentorService.js
const db = require("../config/db");

// ✅ Get all mentors
exports.getAllMentors = async () => {
  const [rows] = await db.query("SELECT * FROM mentors ORDER BY mentor_id DESC");
  return rows;
};

// ✅ Get mentor by ID
exports.getMentorById = async (id) => {
  const [rows] = await db.query("SELECT * FROM mentors WHERE mentor_id = ?", [id]);
  return rows[0];
};

// ✅ Add new mentor
exports.addMentor = async (mentor) => {
  const { mentor_id, mentor_name, designation, email, tech_stack } = mentor;
  const [result] = await db.query(
    "INSERT INTO mentors (mentor_id, mentor_name, designation, email, tech_stack) VALUES (?, ?, ?, ?, ?)",
    [mentor_id, mentor_name, designation, email, tech_stack]
  );
  return { mentor_id, mentor_name, designation, email, tech_stack };
};

// ✅ Update mentor
exports.updateMentor = async (id, mentor) => {
  const { mentor_name, designation, email, tech_stack } = mentor;
  await db.query(
    "UPDATE mentors SET mentor_name = ?, designation = ?, email = ?, tech_stack = ? WHERE mentor_id = ?",
    [mentor_name, designation, email, tech_stack, id]
  );
  return { mentor_id: id, ...mentor };
};

// ✅ Delete mentor
exports.deleteMentor = async (id) => {
  await db.query("DELETE FROM mentors WHERE mentor_id = ?", [id]);
  return true;
};
