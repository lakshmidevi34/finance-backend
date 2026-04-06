const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.get("/", auth, authorize("admin"), (req, res) => {
  res.send("Only admin can see users");
});

module.exports = router;