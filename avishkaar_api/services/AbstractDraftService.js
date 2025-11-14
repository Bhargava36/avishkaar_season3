// const db = require("../config/db");

// export const AbstractDraftService = {
//   getAll: async () => {
//     const [rows] = await db.query("SELECT * FROM abstract_draft_submissions");
//     return rows;
//   },

//   getById: async (id) => {
//     const [rows] = await db.query("SELECT * FROM abstract_draft_submissions WHERE draft_id = ?", [id]);
//     return rows[0];
//   },

//   // 🔹 NEW FUNCTION — Get all drafts by teamId
//   getByTeamId: async (teamId) => {
//     const [rows] = await db.query(
//       "SELECT * FROM abstract_draft_submissions WHERE team_id = ?",
//       [teamId]
//     );
//     return rows;
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

//     await db.query(
//       `INSERT INTO abstract_draft_submissions 
//       (draft_id, team_id, file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [draft_id, team_id, file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description]
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
//       `UPDATE abstract_draft_submissions SET 
//        file_path=?, video_url=?, problem_statement=?, theme=?, 
//        technologies_used=?, existing_project=?, abstract_description=? 
//        WHERE draft_id=?`,
//       [file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description, id]
//     );
//   },

//   delete: async (id) => {
//     await db.query("DELETE FROM abstract_draft_submissions WHERE draft_id = ?", [id]);
//   },
// };
const db = require("../config/db");

const AbstractDraftService = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM abstract_draft_submissions");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM abstract_draft_submissions WHERE draft_id = ?",
      [id]
    );
    return rows[0];
  },

  getByTeamId: async (teamId) => {
    const [rows] = await db.query(
      "SELECT * FROM abstract_draft_submissions WHERE team_id = ?",
      [teamId]
    );
    return rows;
  },

  create: async (data) => {
    const {
      draft_id,
      team_id,
      file_path,
      video_url,
      problem_statement,
      theme,
      technologies_used,
      existing_project,
      abstract_description,
    } = data;
    console.log("Creating draft with data:", data);
    await db.query(
      `INSERT INTO abstract_draft_submissions 
      (draft_id, team_id, file_path, video_url, problem_statement, theme, technologies_used, existing_project, abstract_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        draft_id,
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
      `UPDATE abstract_draft_submissions SET 
       file_path=?, video_url=?, problem_statement=?, theme=?, 
       technologies_used=?, existing_project=?, abstract_description=? 
       WHERE draft_id=?`,
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
    await db.query(
      "DELETE FROM abstract_draft_submissions WHERE draft_id = ?",
      [id]
    );
  },
};

module.exports = AbstractDraftService;
