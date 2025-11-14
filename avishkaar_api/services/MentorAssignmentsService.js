const db = require("../config/db");

// Helper: Generate unique assignment_id
function generateAssignmentId(mentor_id, team_id) {
  const uniquePart = Date.now().toString(36); // Timestamp-based
  return `MA-${mentor_id.slice(0, 3).toUpperCase()}-${team_id.slice(0, 3).toUpperCase()}-${uniquePart}`;
}

exports.createAssignment = async (mentor_id, team_id, assigned_by) => {
  const assignment_id = generateAssignmentId(mentor_id, team_id);
  const assigned_at = new Date();

  const query = `
    INSERT INTO mentor_assignments (assignment_id, mentor_id, team_id, assigned_by, assigned_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  await db.query(query, [assignment_id, mentor_id, team_id, assigned_by, assigned_at]);

  return { assignment_id, mentor_id, team_id, assigned_by, assigned_at };
};

exports.updateAssignment = async (team_id, mentor_id, assigned_by) => {
  const assigned_at = new Date();

  const query = `
    UPDATE mentor_assignments 
    SET mentor_id = ?, assigned_by = ?, assigned_at = ? 
    WHERE team_id = ?
  `;
  const [result] = await db.query(query, [mentor_id, assigned_by, assigned_at, team_id]);

  if (result.affectedRows === 0) {
    throw new Error("No record found for this team_id.");
  }

  return { team_id, mentor_id, assigned_by, assigned_at };
};

exports.getAllAssignments = async () => {
  const [rows] = await db.query(`
    SELECT 
      ma.assignment_id, 
      ma.mentor_id, 
      m.mentor_name, 
      ma.team_id, 
      t.teamname AS team_name, 
      ma.assigned_by, 
      ma.assigned_at
    FROM mentor_assignments ma
    LEFT JOIN mentors m ON ma.mentor_id = m.mentor_id
    LEFT JOIN teams t ON ma.team_id = t.teamId
    ORDER BY ma.assigned_at DESC
  `);
  return rows;
};

exports.getAssignmentByTeam = async (team_id) => {
  const [rows] = await db.query(
    `SELECT * FROM mentor_assignments WHERE team_id = ?`,
    [team_id]
  );
  return rows[0];
};
