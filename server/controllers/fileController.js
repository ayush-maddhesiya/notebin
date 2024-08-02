const cloudinary = require("../lib/cloudinaryConfig");
const File = require("../models/fileModel");
const TryCatch = require("../middlewares/errorHandler.js");
const Log = require("../models/logModel");

// Upload Files
const uploadFile = TryCatch(async (req, res) => {
  const result = await cloudinary.uploader.upload_stream(
    { resource_type: "raw" },
    async (error, result) => {
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
      
      await newFile.save();

      //log entry
      const newLog = new Log({
        user: req.user._id,
        action: "Uploaded file",
        details: `Uploaded ${req.file.originalname}`,
        fileId: newFile._id,
      });
      
      await newLog.save();

      res.status(200).json({
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

// Delete file by note ID
const deleteFile = TryCatch(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  // Ensure the user requesting the deletion is the owner of the file
  if (file.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  // Delete the file from Cloudinary
  await cloudinary.uploader.destroy(file.fileUrl, { resource_type: "raw" });

  // Delete the file record from the database
  await File.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'File deleted successfully' });
});

module.exports = { uploadFile, getFiles, getUserFiles,deleteFile};
