
const AbstractDraftService = require("../services/abstractDraftService");

const AbstractDraftController = {
  getAll: async (req, res) => {
    try {
      const data = await AbstractDraftService.getAll();
      res.json(data);
    } catch (err) {
      console.error("Error fetching drafts:", err);
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await AbstractDraftService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      console.error("Error fetching draft:", err);
      res.status(500).json({ error: err.message });
    }
  },

  getByTeamId: async (req, res) => {
    try {
      const data = await AbstractDraftService.getByTeamId(req.params.teamId);
      res.json(data);
    } catch (err) {
      console.error("Error fetching drafts by team:", err);
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { team_id } = req.body;

      if (!team_id) {
        return res.status(400).json({ error: "team_id is required" });
      }
      console.log("Received create draft request for team_id:", req.body, team_id);
      // ✅ Generate dynamic draft ID
      const draft_id = `ABS_${team_id}_${Date.now()}`;
      console.log("Generated draft_id:", draft_id);
      const data = {
        ...req.body,
        draft_id,
        file_path: req.file ? `/uploads/abstracts/${req.file.filename}` : null,
      };
      console.log("Creating draft with data in controller:", data);
      await AbstractDraftService.create(data);
      res.status(201).json({ message: "Draft saved successfully!", draft_id });
    } catch (err) {
      console.error("Error creating draft:", err);
      res.status(500).json({ error: err.message });
    }
  },


  update: async (req, res) => {
    try {
      const data = {
        ...req.body,
        file_path: req.file ? `/uploads/abstracts/${req.file.filename}` : req.body.file_path,
      };

      await AbstractDraftService.update(req.params.id, data);
      res.json({ message: "Draft updated successfully!" });
    } catch (err) {
      console.error("Error updating draft:", err);
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await AbstractDraftService.delete(req.params.id);
      res.json({ message: "Draft deleted successfully!" });
    } catch (err) {
      console.error("Error deleting draft:", err);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AbstractDraftController;
