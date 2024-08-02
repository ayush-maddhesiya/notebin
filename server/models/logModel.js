const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);