const express = require("express");
const router = express.Router();
const { getLogs, getUserLogs } = require("../controllers/logController");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, getLogs);

module.exports = router;