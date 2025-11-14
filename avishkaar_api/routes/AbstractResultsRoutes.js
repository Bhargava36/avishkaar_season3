const express = require("express");
const router = express.Router();
const AbstractResultsController = require("../controllers/AbstractResultsController");

// Get all results
router.get("/", AbstractResultsController.getAll);

// Get result by ID
router.get("/:id", AbstractResultsController.getById);

// Get results by team ID
router.get("/team/:teamId", AbstractResultsController.getByTeam);

// Create a new result
router.post("/", AbstractResultsController.create);

// Update an existing result
router.put("/:id", AbstractResultsController.update);

// Delete a result
router.delete("/:id", AbstractResultsController.delete);
router.post("/publish", AbstractResultsController.publishResults);

module.exports = router;
