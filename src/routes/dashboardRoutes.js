const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getSummary,
  getCategorySummary,
  getMonthlyTrends,
  getRecent
} = require("../controllers/dashboardController");

// all require login
router.get("/summary", auth, getSummary);
router.get("/categories", auth, getCategorySummary);
router.get("/trends", auth, getMonthlyTrends);
router.get("/recent", auth, getRecent);

module.exports = router;