// const db = require("../config/db");

// const AbstractService = {
//   getAll: async () => {
//     const [rows] = await db.query("SELECT * FROM abstract_submissions");
//     return rows;
//   },

//   getById: async (id) => {
//     const [rows] = await db.query("SELECT * FROM abstract_submissions WHERE abstract_id = ?", [id]);
//     return rows[0];
//   },

//   create: async (data) => {
//     const {
//       draft_id,
//       team_id,
//       file_path,
//       video_url,
//       problem_statement,
//       theme,
//       technologies_used,
//       existing_project,
//       abstract_description,
//     } = data;
//     console.log("Creating draft with data:", data);
//     await db.query(
//       `INSERT INTO abstract_submissions 
//       (draft_id, team_id, file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         draft_id,
//         team_id,
//         file_path,
//         video_url,
//         problem_statement,
//         theme,
//         technologies_used,
//         existing_project,
//         abstract_description,
//       ]
//     );
//   },

//   update: async (id, data) => {
//     const {
//       file_path,
//       video_url,
//       problem_statement,
//       theme,
//       technologies_used,
//       existing_project,
//       abstract_description,
//     } = data;

//     await db.query(
//       `UPDATE abstract_submissions SET 
//        file_path=?, video_url=?, problem_statement=?, theme=?, 
//        technologies_used=?, existing_project=?, abstract_description=? 
//        WHERE abstract_id=?`,
//       [file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description, id]
//     );
//   },

//   delete: async (id) => {
//     await db.query("DELETE FROM abstract_submissions WHERE abstract_id = ?", [id]);
//   },
// };


// module.exports = AbstractService;
const db = require("../config/db");

const AbstractService = {
  getAll: async () => {
  const [rows] = await db.query(`
    SELECT 
      a.abstract_id,
      a.team_id,
      a.abstract_description,
      t.teamname,
      t.collegeName,
      a.problem_statement,
      a.theme,
      a.created_at,
      r.status AS status
    FROM abstract_submissions a
    JOIN teams t ON a.team_id = t.teamId
    LEFT JOIN abstract_results r ON a.abstract_id = r.abstract_id
    ORDER BY a.submitted_at DESC
  `);
  return rows;
},


  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM abstract_submissions WHERE abstract_id = ? OR abstract_id = ?",
      [id, id]
    );
    return rows[0];
  },

  create: async (data) => {
    const {
      abstract_id,
      team_id,
      file_path,
      video_url,
      problem_statement,
      theme,
      technologies_used,
      existing_project,
      abstract_description,
    } = data;

    console.log("Creating abstract with data:", data);

    await db.query(
      `INSERT INTO abstract_submissions 
      (abstract_id, team_id, file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        abstract_id,
        team_id,
        file_path,
        video_url,
        problem_statement,
        theme,
        technologies_used,
        existing_project,
        abstract_description,
      ]
    );

    await db.execute(
      "UPDATE teams SET abstract_submitted = true WHERE teamId = ?",
      [team_id]
    );
  },

  getByTeamId: async (teamId) => {
    console.log("Fetching abstracts for teamId:", teamId);
      const [rows] = await db.query(
        "SELECT * FROM abstract_submissions WHERE team_id = ?",
        [teamId]
      );
      return rows;
    },

  update: async (id, data) => {
    const {
      file_path,
      video_url,
      problem_statement,
      theme,
      technologies_used,
      existing_project,
      abstract_description,
    } = data;

    await db.query(
      `UPDATE abstract_submissions SET 
       file_path=?, video_url=?, problem_statement=?, theme=?, 
       technologies_used=?, existing_project=?, abstract_description=? 
       WHERE abstract_id=?`,
      [
        file_path,
        video_url,
        problem_statement,
        theme,
        technologies_used,
        existing_project,
        abstract_description,
        id,
      ]
    );
  },

  delete: async (id) => {
    await db.query("DELETE FROM abstract_submissions WHERE abstract_id = ?", [id]);
  },
};

module.exports = AbstractService;
