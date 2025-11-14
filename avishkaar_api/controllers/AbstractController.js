// const AbstractService = require("../services/AbstractService");
// const AbstractController = {
//   getAll: async (req, res) => {
//     try {
//       const data = await AbstractService.getAll();
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   },

//   getById: async (req, res) => {
//     try {
//       const data = await AbstractService.getById(req.params.id);
//       res.json(data);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   },

//    create: async (req, res) => {
//     try {
//       const { team_id } = req.body;

//       if (!team_id) {
//         return res.status(400).json({ error: "team_id is required" });
//       }
//       console.log("Received create draft request for team_id:", req.body, team_id);
//       // ✅ Generate dynamic draft ID
//       const draft_id = `ABS_${team_id}_${Date.now()}`;
//       console.log("Generated draft_id:", draft_id);
//       const data = {
//         ...req.body,
//         draft_id,
//         file_path: req.file ? `/uploads/abstracts/${req.file.filename}` : null,
//       };
//       console.log("Creating draft with data in controller:", data);
//       await AbstractService.create(data);
//       res.status(201).json({ message: "Draft saved successfully!", draft_id });
//     } catch (err) {
//       console.error("Error creating draft:", err);
//       res.status(500).json({ error: err.message });
//     }
//   },

//   update: async (req, res) => {
//     try {
//       await AbstractService.update(req.params.id, req.body);
//       res.json({ message: "Abstract updated successfully!" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       await AbstractService.delete(req.params.id);
//       res.json({ message: "Abstract deleted successfully!" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   },
// };


// module.exports = AbstractController;
const AbstractService = require("../services/AbstractService");

const AbstractController = {
  getAll: async (req, res) => {
    try {
      const data = await AbstractService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await AbstractService.getById(req.params.id);
      if (!data) return res.status(404).json({ error: "Abstract not found" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getByTeamId: async (req, res) => {
    try {
      const data = await AbstractService.getByTeamId(req.params.teamId);
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error("Error fetching drafts by team:", err);
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const {
        team_id,
        abstract_description,
        problem_statement,
        theme,
        technologies_used,
        video_url,
        existing_project,
      } = req.body;

      if (!team_id)
        return res.status(400).json({ error: "team_id is required" });

      console.log("Received create request:", req.body);

      const abstract_id = `ABS_${team_id}_${Date.now()}`;

      const data = {
        abstract_id,
        team_id,
        abstract_description,
        problem_statement,
        theme,
        technologies_used,
        video_url,
        existing_project,
        file_path: req.file ? `/uploads/abstracts/${req.file.filename}` : null,
      };

      console.log("Final data for creation:", data);

      await AbstractService.create(data);
      res.status(201).json({
        message: "Abstract submitted successfully!",
        abstract_id,
      });
    } catch (err) {
      console.error("Error creating abstract:", err);
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = {
        ...req.body,
        file_path: req.file ? `/uploads/abstracts/${req.file.filename}` : req.body.file_path || null,
      };

      await AbstractService.update(id, data);
      res.json({ message: "Abstract updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await AbstractService.delete(req.params.id);
      res.json({ message: "Abstract deleted successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AbstractController;
