const cloudinary = require("../lib/cloudinaryConfig");
const File = require("../models/fileModel");
const TryCatch = require("../middlewares/errorHandler.js");

// Upload Files
const uploadFile = TryCatch(async (req, res) => {
  const result = await cloudinary.uploader.upload_stream(
    { resource_type: "raw" },
    (error, result) => {
      if (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ message: "File upload failed", error });
      }

      const newFile = new File({
        filename: req.file.originalname,
        fileUrl: result.secure_url,
        title: req.body.title,
        subject: req.body.subject,
        semester: req.body.semester,
        keyword: req.body.keyword,
        user: req.user._id,
      });

      newFile.save();

      res
        .status(200)
        .json({
          message: "File uploaded successfully",
          fileUrl: result.secure_url,
        });
    }
  );

  result.end(req.file.buffer);
});

// Get files
const getFiles = TryCatch(async (req, res) => {
  const files = await File.find().populate(
    "user",
    "userId name enrollmentNo semester"
  );
  res.status(200).json(files);
});

// Get files uploaded by the logged-in user
const getUserFiles = TryCatch(async (req, res) => {
  const userFiles = await File.find({ user: req.user._id }).populate(
    "user",
    "userId name enrollmentNo semester"
  );
  res.status(200).json(userFiles);
});

module.exports = { uploadFile, getFiles, getUserFiles };
