const TeamService = require("../services/TeamService");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); 
const bcrypt = require("bcryptjs");
const juice = require("juice"); 

// Utility for decoding JWT and logging
function decodeToken(token) {
  try {
    const decoded = jwt.decode(token);
    console.log("🔍 Decoded JWT Payload (Controller):", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ Error decoding JWT (Controller):", err);
    return null;
  }
}

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await TeamService.getAllTeams();
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ success: false, message: "Failed to fetch teams" });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    console.log(team);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(team);
  } catch (err) {
    console.error("Error retrieving team:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveMemberCount = async (req, res) => {
  try {
    const { count, teamId } = req.body; // ✅ get teamId from body

    if (!teamId) return res.status(400).json({ message: "teamId is required" });
    if (!count || count <= 0) return res.status(400).json({ message: "Invalid member count" });

    const affectedRows = await TeamService.saveTeamMemberCount(teamId, count);

    if (!affectedRows) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team member count saved", count });
  } catch (err) {
    console.error("Error saving team member count:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.registerTeam = async (req, res) => {
  try {
    const { teamName, collegeName, stateName, email, password, teamMembersCount } = req.body;
    console.log(req.body,"request body");
    // register team and get OTP
    const { insertId, otp } = await TeamService.registerTeam(
      teamName, collegeName, stateName, email, password, teamMembersCount
    );

    // now send OTP email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const activationLink = `https://avishkaar.co/activation?teamId=${insertId}`;

    // --- THIS IS THE UPDATED PART ---
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Avishkaar Season 3 Hackathon Account Activation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    body, #bodyTable, #bodyCell {
      height: 100% !important;
      margin: 0;
      padding: 0;
      width: 100% !important;
      background-color: #0f172a; /* slate-900 */
    }
    table { border-collapse: collapse; }
    img, a img { border: 0; outline: none; text-decoration: none; }
    h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    p { margin: 0.75em 0; }

    @media only screen and (max-width: 480px) {
      .responsive-table { width: 100% !important; }
      .header-text { font-size: 20px !important; }
      .otp-text { font-size: 28px !important; letter-spacing: 3px !important; padding: 12px 18px !important; }
    }
  </style>
</head>
<body>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable">
    <tr>
      <td align="center" valign="top" id="bodyCell">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px;" class="responsive-table">
          <tr>
            <td align="center" valign="top">
              
              <!-- Header -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 32px 20px;">
                    <p style="margin: 0; color: #f8fafc; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;">
                      Avishkaar Season-3
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Banner -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #0891b2; border-radius: 10px 10px 0 0;">
                <tr>
                  <td align="center" style="padding: 14px;">
                    <h1 class="header-text" style="color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">
                      Account Activation
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Content -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1e293b; border-radius: 0 0 10px 10px; box-shadow: 0 6px 30px rgba(0,0,0,0.3);">
                <tr>
                  <td align="left" style="padding: 28px 24px; color: #e2e8f0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; line-height: 1.6;">
                    <p>Dear <strong style="color:#ffffff;">${teamName}</strong>,</p>

                    <p>Thank you for registering for <strong style="color:#0891b2;">Avishkaar Season 3 – A National Level Hackathon</strong>. We’re thrilled to welcome your team from <strong style="color:#0891b2;">${collegeName}</strong> to this journey of innovation and creativity.</p>

                    <p>Your account is currently inactive. Please verify your email to activate it and unlock access to the hackathon platform.</p>

                    <p><strong style="color:#ffffff;">How to Activate:</strong></p>
                    <ol style="margin: 8px 0 18px 18px; color: #cbd5e1; padding-left: 8px;">
                      <li>Find your One-Time Password (OTP) below.</li>
                      <li>Click the <strong>“Verify Your Account”</strong> button, or enter the OTP on the activation page.</li>
                      <li>If missing, check your spam folder or request a new OTP.</li>
                    </ol>

                    <!-- OTP -->
                    <div style="text-align: center; margin: 22px 0;">
                      <p style="margin: 0 0 8px 0; color: #cbd5e1; font-size: 13px;">Your One-Time Password</p>
                      <div style="background-color: #0f172a; border-radius: 10px; padding: 16px 26px; display: inline-block; border: 2px solid #0891b2; box-shadow: 0 0 15px rgba(8,145,178,0.5);">
                        <h2 class="otp-text" style="color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 34px; font-weight: 700; letter-spacing: 6px; margin: 0;">${otp}</h2>
                      </div>
                      <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">Expires in <strong style="color:#0891b2;">24 hours</strong></p>
                    </div>
                    <div style="text-align: center; margin-top: 28px;">
                      <a href="${activationLink}" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; background-color: #0891b2; border-radius: 6px; box-shadow: 0 3px 10px rgba(8,145,178,0.4);">
                        Verify Your Account
                      </a>
                    </div>
                    <p>We look forward to your participation and wish you the very best for the hackathon.</p>

                    <p style="margin-top: 20px;">Warm regards,<br><strong style="color:#0891b2;">Team Avishkaar Season 3</strong></p>

                    
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 24px 18px; font-family: 'Inter', Arial, sans-serif; font-size: 11px; color: #64748b;">
                    <p style="margin: 0;">©️ 2025 Avishkaar. All rights reserved.</p>
                    <p style="margin: 4px 0 0 0;">If you did not request this, please ignore this email.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    // Use juice to inline CSS for best email client compatibility
    const inlinedHtml = juice(htmlContent);

    const mailOptions = {
      from: `"Avishkaar Support" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Verify Your Account - Avishkaar",
      html: inlinedHtml,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Team registered successfully. Please check your email for the OTP.",
      teamId: insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { teamId, otp } = req.body;
    console.log(req.body);
    if (!teamId || !otp) {
      return res.status(400).json({ message: "Team ID and OTP are required" });
    }

    // 1. Get teamId from teams table
    const [teamRows] = await db.execute(
      "SELECT teamId FROM teams WHERE teamId = ?",
      [teamId]
    );
    if (teamRows.length === 0) {
      return res.status(404).json({ message: "Team not found" });
    }

    const foundTeamId = teamRows[0].teamId;
    console.log('teamId:', foundTeamId);

    // 2. Get OTP from team_otps table
    const [otpRows] = await db.execute(
      `SELECT * FROM team_otp 
       WHERE teamId = ? 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [foundTeamId]
    );
    if (otpRows.length === 0) {
      return res.status(400).json({ message: "OTP not found or already used" });
    }

    const record = otpRows[0];
    console.log('record:', record);

    // 3. Check OTP
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 4. Check expiry
    if (new Date(record.otp_expiry) < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 5. Mark verified (only if teamId exists)
    if (foundTeamId !== undefined && foundTeamId !== null) {
      await db.execute(
        "UPDATE teams SET verified = 1 WHERE teamId = ?",
        [foundTeamId]
      );
    } else {
      return res.status(500).json({ message: "teamId undefined" });
    }

    // 6. Delete OTP record (only if record.teamId exists)
    if (record.teamId !== undefined && record.teamId !== null) {
      await db.execute(
        "DELETE FROM team_otp WHERE teamId = ?",
        [record.teamId]
      );
    } else {
      console.warn('record.teamId undefined, skipping delete');
    }

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { teamId, email } = req.body; // coming from frontend
    console.log(teamId,email);
    if (!teamId) {
      return res.status(400).json({ message: 'Team ID is required' });
    }

    // create new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hour expiry

    // update table
    await db.execute(
      `UPDATE team_otp SET otp = ?, otp_expiry = ? WHERE teamId = ?`,
      [otp, otpExpiry, teamId]
    );

    // (Optional) send email here again to user
      const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    const activationLink = `http://localhost:5173/activation?teamId=${teamId}`;

    const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Avishkaar New Verification Code</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe:ital@0;1&family=Alumni+Sans:ital,wght@0,100..900;1,100..900&family=Anek+Gujarati:wght@100..800&family=Anek+Kannada:wght@100..800&family=Anek+Malayalam:wght@100..800&family=Anek+Tamil:wght@100..800&family=Changa+One:ital@0;1&family=Chathura:wght@100;300;400;700;800&family=DynaPuff:wght@400..700&family=Gruppo&family=Italiana&family=Julius+Sans+One&family=Matangi:wght@300..900&family=Merriweather:wght@300&family=Monoton&family=Nova+Slim&family=Orbitron:wght@400..900&family=Rozha+One&family=Rubik+Glitch&family=Rubik+Microbe&family=Zen+Tokyo+Zoo&display=swap');
    /* Basic Resets */
    .orbitron {
  font-family: "Orbitron", sans-serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
}
.rubik-glitch {
  font-family: "Rubik Glitch", system-ui;
  font-weight: 100;
  font-style: normal;
}
    body, #bodyTable, #bodyCell { height: 100% !important; margin: 0; padding: 0; width: 100% !important; }
    table { border-collapse: collapse; }
    img, a img { border: 0; outline: none; text-decoration: none; }
    h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    p { margin: 1em 0; }
    /* Responsive Styles */
    @media only screen and (max-width: 480px) {
      .responsive-table { width: 100% !important; }
      .header-text { font-size: 24px !important; }
      .otp-text { font-size: 32px !important; letter-spacing: 4px !important; padding: 15px 20px !important;}
      .details-text { font-size: 14px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0c0a18;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable" style="background: linear-gradient(180deg, #000000 0%, #0c0a18 100%);">
    <tr>
      <td align="center" valign="top" id="bodyCell">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="responsive-table">
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <p style="margin: 0; color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 18px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;" class="orbitron">Avishkaar</p>
                  </td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #9333ea 0%, #22D3EE 100%); border-radius: 12px 12px 0 0; padding: 5px;">
                <tr>
                  <td align="center" style="padding: 20px;">
                    <h1 class="header-text" style="color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: 1px;">NEW VERIFICATION CODE</h1>
                  </td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #110f1f; border-radius: 0 0 12px 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
                <tr>
                  <td align="center" style="padding: 40px 30px;">
                    <p style="margin: 0 0 25px 0; color: #cccccc; font-family: 'Inter', Arial, sans-serif; font-size: 16px;">Here is your new one-time password, as requested.</p>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="90%" style="background-color: #1e1b30; border-radius: 8px; border: 1px solid #9333ea; margin-top: 10px; margin-bottom: 30px;">
                      <tr>
                        <td align="left" style="padding: 20px; font-family: 'Inter', Arial, sans-serif; font-size: 15px;" class="details-text">
                          <p style="margin: 0; color: #22D3EE;"><strong>Email:</strong> <span style="color: #ffffff;">${email}</span></p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 30px 0 10px 0; color: #cccccc; font-family: 'Inter', Arial, sans-serif; font-size: 14px;">New One-Time Password</p>
                    <div style="background-color: #1e1b30; border-radius: 12px; padding: 20px 30px; display: inline-block; border: 2px solid #9333ea; box-shadow: 0 0 25px rgba(147, 51, 234, 0.5);">
                      <h2 class="otp-text" style="color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 42px; font-weight: 800; margin: 0; letter-spacing: 8px;">${otp}</h2>
                    </div>
                    <p style="margin: 10px 0 30px 0; color: #aaaaaa; font-family: 'Inter', Arial, sans-serif; font-size: 12px;">OTP</p>

                    <a href="${activationLink}" target="_blank" style="display: inline-block; padding: 15px 35px; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #22D3EE 0%, #9333ea 100%); border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                      Verify Your Account
                    </a>
                  </td>
                </tr>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 30px 20px; font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #666666;">
                    <p style="margin: 0;">©️ 2025 Avishkaar. All rights reserved.</p>
                    <p style="margin: 5px 0 0 0;">If you did not request this, please ignore this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        </td>
    </tr>
  </table>
</body>
</html>
    `;

    const inlinedHtml = juice(htmlContent);

    const mailOptions = {
      from: `"Avishkaar Support" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Your New Verification Code - Avishkaar",
      html: inlinedHtml,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP resent successfully', otp }); // remove otp in production
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resending OTP' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // ✅ Get token from URL
    const { token } = req.params;

    // ✅ Get new password from body
    const { newPassword } = req.body;

    console.log("Token received:", token);

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // ✅ You now have decoded.email
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Update DB by email
    await db.execute(
      "UPDATE teams SET password = ? WHERE email = ?",
      [hashedPassword, decoded.email]
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if team exists
    const [rows] = await db.execute("SELECT * FROM teams WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a password reset token (you can use JWT or any other method)
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Build HTML email template (you can tweak wording)
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Avishkaar Password Reset</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        body, #bodyTable, #bodyCell { height: 100% !important; margin: 0; padding: 0; width: 100% !important; }
        table { border-collapse: collapse; }
        img, a img { border: 0; outline: none; text-decoration: none; }
        h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
        p { margin: 1em 0; }
        @media only screen and (max-width: 480px) {
          .responsive-table { width: 100% !important; }
          .header-text { font-size: 24px !important; }
          .details-text { font-size: 14px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0c0a18;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" id="bodyTable" style="background: linear-gradient(180deg, #000000 0%, #0c0a18 100%);">
        <tr>
          <td align="center" valign="top" id="bodyCell">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" class="responsive-table">
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 40px 20px;">
                        <p style="margin: 0; color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 18px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Avishkaar</p>
                      </td>
                    </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #9333ea 0%, #22D3EE 100%); border-radius: 12px 12px 0 0; padding: 5px;">
                    <tr>
                      <td align="center" style="padding: 20px;">
                        <h1 class="header-text" style="color: #ffffff; font-family: 'Inter', Arial, sans-serif; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: 1px;">PASSWORD RESET REQUEST</h1>
                      </td>
                    </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #110f1f; border-radius: 0 0 12px 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.4);">
                    <tr>
                      <td align="center" style="padding: 40px 30px;">
                        <p style="margin: 0 0 25px 0; color: #cccccc; font-family: 'Inter', Arial, sans-serif; font-size: 16px;">You requested a password reset. Click the button below to reset your password:</p>

                        <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 15px 35px; font-family: 'Inter', Arial, sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; background: linear-gradient(135deg, #22D3EE 0%, #9333ea 100%); border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                          Reset Your Password
                        </a>

                        <p style="margin: 30px 0 10px 0; color: #aaaaaa; font-family: 'Inter', Arial, sans-serif; font-size: 12px;">If the button does not work, copy and paste this URL in your browser:</p>
                        <p style="color: #22D3EE; font-family: 'Inter', Arial, sans-serif; font-size: 12px;">${resetLink}</p>
                      </td>
                    </tr>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 30px 20px; font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: #666666;">
                        <p style="margin: 0;">©️ 2025 Avishkaar. All rights reserved.</p>
                        <p style="margin: 5px 0 0 0;">If you did not request this, please ignore this email.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // Inline styles for email clients
    const inlinedHtml = juice(htmlContent);

    const mailOptions = {
      from: `"Avishkaar Support" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Password Reset - Avishkaar",
      html: inlinedHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending password reset email" });
  }
};


exports.loginTeam = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Fetch team by email
    const [rows] = await db.execute("SELECT * FROM teams WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const team = rows[0];

    // 2. Check password
    const isMatch = await bcrypt.compare(password, team.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3. Check if verified — make sure this matches your DB column
    // e.g. if your column is 'isVerified', use team.isVerified
    if (team.verified !== 1) {
      return res.status(403).json({ error: "Please verify your account before logging in." });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      {
        id: team.teamId, // adjust to your primary key column
        teamName : team.teamname,
        email: team.email,
        role: "Team",
        verified: team.verified,
        members: team.members
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Respond
    return res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};