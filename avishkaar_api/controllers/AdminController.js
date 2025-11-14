const AdminService = require('../services/AdminService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');



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

exports.registerAdmin = async (req, res) => {
  const { AdminName, email, password, secretToken } = req.body;

  try {
    const AdminId = await AdminService.registerAdmin(
        { AdminName, email, password, secretToken }
    );
    res.status(201).json(
        { message: "Admin registered successfully", 
          AdminId }
    );

  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Call the service directly
    const { token, adminId, role , verified } = await AdminService.loginAdmin(email, password);

    if (verified !== 1) {
      return res.status(403).json({ error: "Please verify your account before logging in." });
    }
    // If you want, decode token for debugging
    // decodeToken(token);

    return res.status(200).json({
      message: "Login successful",
      token,
      adminId,
      role
    });
  } catch (error) {
    console.error("Login error (controller):", error);

    // Map service error messages to status codes
    if (error.message.includes("verify")) {
      return res.status(403).json({ error: error.message });
    } else if (error.message.includes("Invalid email or password")) {
      return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  }
};