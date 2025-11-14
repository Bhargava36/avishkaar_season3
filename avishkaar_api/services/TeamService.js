const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// top of TeamController.js or your service file
function generateTeamId(teamName) {
  const prefix = teamName.slice(0,3).toUpperCase(); // first 3 letters
  // random 5 digits
  const randomNum = Math.floor(10000 + Math.random() * 90000); 
  return `${prefix}-A3-${randomNum}`;
}


const TeamService = {
    

getAllTeams: async () => {
  const [teams] = await db.query("SELECT * FROM teams");
  return teams;
},
  getTeamById: async (teamId) => {
    const [rows] = await db.execute("SELECT * FROM teams WHERE teamId = ?", [teamId]);
    return rows[0];
  },

  saveTeamMemberCount: async (teamId, count) => {
    console.log("🔹 Updating member count for teamId:", teamId, "to", count);
    const [result] = await db.execute(
      "UPDATE teams SET members = ? WHERE teamId = ?",
      [count, teamId]
    );
    return result.affectedRows;
  },

// ✅ Register a new team



registerTeam: async (teamName, collegeName, stateName, email, password, members) => {
  try {
    const role = 'Team';
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 0: generate teamId here
    const teamId = generateTeamId(teamName);

    // ✅ Step 1: insert team info including teamId
    const sql = `
      INSERT INTO teams 
      (teamId, teamname, collegeName, stateName, email, password, role, members, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;

    const [result] = await db.execute(sql, [
      teamId,
      teamName,
      collegeName,
      stateName,
      email,
      hashedPassword,
      role,
      members
    ]);

    // ✅ Step 2: generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

    // ✅ Step 3: insert OTP into new table using the team’s ID
    await db.execute(
      `INSERT INTO team_otp (teamId, otp, otp_expiry) VALUES (?, ?, ?)`,
      [teamId, otp, otpExpiry]
    );

    // ✅ Step 4: return insertId, teamId, and otp
    return { insertId: teamId, otp };
  } catch (error) {
    throw error;
  }
},



// ✅ Login Team
loginTeam : async (email, password) => {
    try {
        console.log("🔹 Fetching team with email:", email);

        const [rows] = await db.execute("SELECT * FROM teams WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log("❌ Team not found.");
            throw new Error("Team not found");
        }

        const team = rows[0];

        console.log("🔹 Comparing passwords...");
        const isMatch = await bcrypt.compare(password, team.password);

        if (!isMatch) {
            console.log("❌ Invalid credentials.");
            throw new Error("Invalid credentials");
        }

        console.log("🔹 Generating JWT Token...");
        const token = jwt.sign(
            { id: team.ID, role: team.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("✅ Login successful. Token generated.");
        
        return { token, team };
    } catch (error) {
        console.error("❌ Error in loginTeam:", error);
        throw error;
    }
},
}

module.exports = TeamService;