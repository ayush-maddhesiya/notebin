const Log = require("../models/logModel");
const TryCatch = require("../middlewares/errorHandler.js");

// Get logs
const getLogs = TryCatch(async (req, res) => {
  const logs = await Log.find()
    .populate("user", "userId name enrollmentNo semester email mobileNo")
    .populate("fileId", "filename title");
  res.status(200).json(logs);
});

module.exports = { getLogs};