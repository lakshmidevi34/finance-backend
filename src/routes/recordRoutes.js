const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} = require("../controllers/recordController");

// create (admin only)
router.post("/", auth, authorize("admin"), createRecord);

// view (all roles)
router.get("/", auth, getRecords);

// update (admin only)
router.patch("/:id", auth, authorize("admin"), updateRecord);

// delete (admin only)
router.delete("/:id", auth, authorize("admin"), deleteRecord);

module.exports = router;