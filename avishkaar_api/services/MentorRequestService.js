const db = require("../config/db");
const { get } = require("../routes/AbstractResultsRoutes");

// Create a new mentor request
const createMentorRequest = async ({
  request_id,
  team_id,
  message,
  status,
  created_at,
  updated_at,
}) => {
  const query = `
    INSERT INTO mentor_requests 
    (request_id, team_id, message, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await db.query(query, [
    request_id,
    team_id,
    message,
    status,
    created_at,
    updated_at,
  ]);

  return { request_id };
};

// Get all mentor requests (with team info)
const getAllMentorRequests = async () => {
  const [rows] = await db.query(`
    SELECT 
      mr.request_id,
      mr.team_id,
      t.teamname AS team_name,
      t.collegeName AS college_name,
      mr.message,
      mr.status,
      mr.created_at
    FROM mentor_requests mr
    JOIN teams t ON mr.team_id = t.teamId
    ORDER BY mr.created_at DESC
  `);
  return rows;
};

// Get a single mentor request by ID
const getMentorRequestById = async (request_id) => {
  const [rows] = await db.query(
    `
    SELECT 
      mr.request_id,
      mr.team_id,
      t.teamname AS team_name,
      t.collegeName AS college_name,
      mr.message,
      mr.status,
      mr.created_at
    FROM mentor_requests mr
    JOIN teams t ON mr.team_id = t.teamId
    WHERE mr.request_id = ?
    `,
    [request_id]
  );
  return rows[0];
};

// Update mentor request status
const updateMentorRequestStatus = async (request_id, status) => {
  const [result] = await db.query(
    "UPDATE mentor_requests SET status = ? WHERE request_id = ?",
    [status, request_id]
  );
  return result;
};

// Delete a mentor request
const deleteMentorRequest = async (request_id) => {
  const [result] = await db.query(
    "DELETE FROM mentor_requests WHERE request_id = ?",
    [request_id]
  );
  return result;
};

const getMentorRequestsByTeamId = async (teamId) => {
  const [rows] = await db.query(
    `
      SELECT 
        request_id, 
        team_id, 
        message, 
        status, 
        created_at, 
        updated_at
      FROM mentor_requests
      WHERE team_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `,
    [teamId]
  );

  return rows;
};

module.exports = {
  createMentorRequest,
  getMentorRequestsByTeamId,
  getAllMentorRequests,
  getMentorRequestById,
  updateMentorRequestStatus,
  deleteMentorRequest,
};
