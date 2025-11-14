const AbstractResultsService = require("../services/AbstractResultsService");
const nodemailer = require("nodemailer");
const db = require("../config/db");
const crypto = require("crypto"); // for generating unique suffixes

const AbstractResultsController = {
  async getAll(req, res) {
    try {
      const results = await AbstractResultsService.getAllResults();
      res.status(200).json({ success: true, data: results });
    } catch (err) {
      console.error("Error fetching results:", err);
      res.status(500).json({ success: false, message: "Failed to fetch results" });
    }
  },
  

  async getById(req, res) {
    try {
      const result = await AbstractResultsService.getResultById(req.params.id);
      if (!result)
        return res.status(404).json({ success: false, message: "Result not found" });
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.error("Error fetching result:", err);
      res.status(500).json({ success: false, message: "Failed to fetch result" });
    }
  },

  async getByTeam(req, res) {
    try {
      const results = await AbstractResultsService.getResultsByTeam(req.params.teamId);
      res.status(200).json({ success: true, data: results });
    } catch (err) {
      console.error("Error fetching team results:", err);
      res.status(500).json({ success: false, message: "Failed to fetch results by team" });
    }
  },


async create(req, res) {
  try {
    const { abstract_id, team_id, evaluated_by, status } = req.body;

    // 🧩 Basic validation
    if (!abstract_id || !team_id || !evaluated_by || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: abstract_id, team_id, evaluated_by, or status.",
      });
    }

    // 🆔 Generate unique result_id
    const timestamp = Date.now();
    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g., 'A1B2C3'
    const result_id = `RES_${team_id}_${timestamp}_${randomPart}`;

    console.log("🧾 Creating new abstract result:", {
      result_id,
      abstract_id,
      team_id,
      evaluated_by,
      status,
    });

    // 🛠️ Insert into DB via service
    const newResult = await AbstractResultsService.createResult({
      result_id,
      abstract_id,
      team_id,
      evaluated_by,
      status,
    });

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: "Abstract evaluation recorded successfully.",
      data: newResult,
    });
  } catch (err) {
    console.error("❌ Error creating result:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create result.",
      error: err.message,
    });
  }
},


  async update(req, res) {
    try {
      const updated = await AbstractResultsService.updateResult(req.params.id, req.body);
      if (!updated)
        return res.status(404).json({ success: false, message: "Result not found or not updated" });
      res.status(200).json({ success: true, message: "Result updated successfully" });
    } catch (err) {
      console.error("Error updating result:", err);
      res.status(500).json({ success: false, message: "Failed to update result" });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await AbstractResultsService.deleteResult(req.params.id);
      if (!deleted)
        return res.status(404).json({ success: false, message: "Result not found" });
      res.status(200).json({ success: true, message: "Result deleted successfully" });
    } catch (err) {
      console.error("Error deleting result:", err);
      res.status(500).json({ success: false, message: "Failed to delete result" });
    }
  },
  async publishResults(req, res) {
    try {
    const [results] = await db.query(`
      SELECT 
        ar.*, 
        t.teamname, t.email AS team_email
      FROM abstract_results ar
      JOIN teams t ON ar.team_id = t.teamId;
    `);

    if (!results.length) {
      return res.status(404).json({ success: false, message: "No results found to publish." });
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let sentCount = 0;

    for (const result of results) {
      const to = result.team_email;
      const subject =
        result.status === "Accepted"
          ? "🎉 Congratulations! Your Team Qualified for Next Round"
          : "Hackathon Results – Thank You for Participating";

      const message =
        result.status === "Accepted"
          ? `<p>Dear <b>${result.teamname}</b>,</p>
             <p>Congratulations! Your abstract <b>${result.abstract_id}</b> has been <b>Accepted</b>.</p>
             <p>Get ready for the next round. More details will follow soon.</p>
             <p>– Hackathon Organizing Team</p>`
          : `<p>Dear <b>${result.teamname}</b>,</p>
             <p>Thank you for your submission. Unfortunately, your abstract <b>${result.abstract_id}</b> was not selected for the next round.</p>
             <p>We truly appreciate your efforts and encourage you to participate again.</p>
             <p>– Hackathon Organizing Team</p>`;

      await transporter.sendMail({
        from: `"Hackathon Team" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: message,
      });

      sentCount++;
    }

    res.status(200).json({
      success: true,
      message: `Results published successfully! ${sentCount} emails sent.`,
    });
  } catch (err) {
    console.error("Error publishing results:", err);
    res.status(500).json({ success: false, message: "Error publishing results." });
  }
  }
};

module.exports = AbstractResultsController;
