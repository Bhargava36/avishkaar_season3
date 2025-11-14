const express = require("express");
const router = express.Router();
const controller = require("../controllers/TeamMembersController");
const upload = require("../Middlewares/multer");

router.get("/", controller.getAllMembers);           // GET all
router.get("/:id", controller.getMemberById);       // GET by ID
router.post("/", upload.single("photo"), controller.createMember);
router.put("/:id", upload.single("photo"), controller.updateMember);        // UPDATE
router.delete("/:id", controller.deleteMember);     // DELETE
router.get("/team/:teamId", controller.getTeamMembersByTeamId);
module.exports = router;
