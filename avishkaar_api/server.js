// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello, Node.js Project is running 🚀");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const teamRoutes = require("./routes/teamroutes");
app.use("/api/teams", teamRoutes);
const AdminRoutes = require("./routes/AdminRoutes")
app.use("/api/admin", AdminRoutes);
const teamMemberRoutes = require("./routes/TeamMembersRoutes");
app.use("/api/team-members", teamMemberRoutes);

const abstractDraftRoutes = require("./routes/AbstractDraftRoutes");
app.use("/api/drafts", abstractDraftRoutes);

const AbstractRoutes = require("./routes/AbstractRoutes");
app.use("/api/abstracts", AbstractRoutes);

const AbstractResultsRoutes = require("./routes/AbstractResultsRoutes");
app.use("/api/abstract-results", AbstractResultsRoutes);

const mentorRoutes = require("./routes/MentorsRoutes");
app.use("/api/mentors", mentorRoutes);

const mentorAssignmentRoutes = require("./routes/MentorAssignmentsRoutes");
app.use("/api/mentor-assign", mentorAssignmentRoutes);


const mentorRequestRoutes = require("./routes/MentorRequestRoutes");
app.use("/api/mentor-requests", mentorRequestRoutes);
// Server Listen
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
