const File = require('../models/fileModel');
const B2 = require('backblaze-b2');
require('dotenv').config(); 

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

  
    await b2.authorize();


    const bucketId = process.env.BUCKET_ID;
    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const uploadAuthToken = uploadUrlResponse.data.authorizationToken;


    const response = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName: file.originalname,
      data: file.buffer,
    });

    const fileUrl = `https://f000.backblazeb2.com/file/${bucketId}/${file.originalname}`;

    
    const newFile = new File({
      filename: file.originalname,
      fileUrl,
    });
    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'File upload failed', error });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch files', error });
  }
};

module.exports = {
  uploadFile,
  getFiles,
};
