const db = require("../config/db"); // your MySQL connection

const AbstractResultsService = {
//   getAllResults: async () => {
//   const [rows] = await db.query(`
//     SELECT 
//       ar.result_id,
//       ar.abstract_id,
//       ar.team_id,
//       t.teamname AS team_name,
//       t.collegeName AS college_name,
//       ar.status,
//       a.AdminName AS evaluated_by_name,
//       ar.evaluated_at
//     FROM abstract_results ar
//     LEFT JOIN teams t ON ar.team_id = t.teamId
//     LEFT JOIN admin a ON ar.evaluated_by = a.AdminId
//     ORDER BY ar.evaluated_at DESC;
//   `);
//   return rows;
// },

getAllResults: async () => {
  const [rows] = await db.query(`
    SELECT 
      a.abstract_id,
      a.team_id,
      t.teamname AS team_name,
      t.collegeName AS college_name,
      a.problem_statement,
      a.theme,
      a.created_at,
      r.result_id,
      r.status,
      r.evaluated_by,
      AD.AdminName AS evaluated_by_name,
      r.evaluated_at
    FROM abstract_submissions a
    JOIN teams t ON a.team_id = t.teamId
    LEFT JOIN abstract_results r ON a.abstract_id = r.abstract_id
    LEFT JOIN admin ad ON r.evaluated_by = ad.AdminId
    ORDER BY a.created_at DESC
  `);
  return rows;
},



  getResultById: async (id) => {
    const [rows] = await db.query("SELECT * FROM abstract_results WHERE result_id = ?", [id]);
    return rows[0];
  },

  getResultsByTeam: async (teamId) => {
    const [rows] = await db.query("SELECT * FROM abstract_results WHERE team_id = ?", [teamId]);
    return rows;
  },

  createResult: async (data) => {
    const { result_id,abstract_id, team_id, status, evaluated_by } = data;
    const [result] = await db.query(
      `INSERT INTO abstract_results (result_id,abstract_id, team_id, status, evaluated_by)
       VALUES (?,?, ?, ?, ?)`,
      [result_id,abstract_id, team_id, status, evaluated_by]
    );
    return { result_id: result.insertId, ...data };
  },

  updateResult: async (id, data) => {
    const { status, evaluated_by } = data;
    const [result] = await db.query(
      `UPDATE abstract_results 
       SET status = ?, evaluated_by = ?
       WHERE result_id = ?`,
      [status, evaluated_by, id]
    );
    return result.affectedRows > 0;
  },

  deleteResult: async (id) => {
    const [result] = await db.query("DELETE FROM abstract_results WHERE result_id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = AbstractResultsService;
