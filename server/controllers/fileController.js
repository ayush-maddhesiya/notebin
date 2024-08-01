const B2 = require('backblaze-b2');
const mongoose = require('mongoose');
const File = require('../models/fileModel');
const multer = require('multer');
require('dotenv').config();

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const uploadFile = async (req, res) => {
  try {
    await b2.authorize(); // Authorize with B2
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: process.env.BUCKET_ID,
    });

    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: `${Date.now()}_${req.file.originalname}`,
      data: req.file.buffer,
    });

    const fileUrl = `https://f000.backblazeb2.com/file/${process.env.BUCKET_ID}/${uploadResponse.data.fileName}`;

    // Save metadata in MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      fileUrl,
      title: req.body.title,
      subject: req.body.subject,
      semester: req.body.semester,
      keyword: req.body.keyword,
    });

    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    console.error('File upload failed:', error);
    res.status(500).json({ message: 'File upload failed', error });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files', error });
  }
};

module.exports = {
  uploadFile,
  getFiles,
};