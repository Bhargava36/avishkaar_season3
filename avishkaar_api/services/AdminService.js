const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function generateAdminId(adminName) {
  const prefix = adminName.slice(0,3).toUpperCase(); // first 3 letters
  // random 5 digits
  const randomNum = Math.floor(10000 + Math.random() * 90000); 
  return `${prefix}-A3-${randomNum}`;
}

const AdminService = {
    
// ✅ Register a new admin
registerAdmin: async ({ AdminName, email, password, secretToken }) => {
  const role = 'Admin';
  const hashedPassword = await bcrypt.hash(password, 10);

  const verified = secretToken === process.env.ADMIN_SECRET ? 1 : 0;
  
  // Generate adminId here
  const AdminId = generateAdminId(AdminName);

  const sql = `
      INSERT INTO admin
      (AdminId, AdminName, email, password, role, verified)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

  const result = await db.query(sql,
    [AdminId,
    AdminName,
    email,
    hashedPassword,
    role,
    verified
  ]);

  return { AdminId };
},

loginAdmin : async (email, password) => {
    try {
        console.log("🔹 Fetching admin with email:", email);

        const [rows] = await db.execute("SELECT * FROM admin WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log("❌ admin not found.");
            throw new Error("admin not found");
        }

        const admin = rows[0];

        if (admin.verified !== 1) {
            console.log("❌ Admin account not verified.");
            throw new Error("Admin account not verified");
        }

        console.log("🔹 Comparing passwords...");
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            console.log("❌ Invalid credentials.");
            throw new Error("Invalid credentials");
        }

        
        console.log("🔹 Generating JWT Token...");
        const token = jwt.sign(
            { id: admin.AdminId, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        console.log("✅ Login successful. Token generated.");

        return { token, adminId: admin.AdminId, role: admin.role ,verified: admin.verified};
    } catch (error) {
        console.error("❌ Error in loginAdmin:", error);
        throw error;
    }
},
};

module.exports = AdminService;