const { authorizeB2, getUploadUrl, uploadFileToB2, getAuthorizationToken } = require('../lib/backblaze');
const File = require('../models/fileModel');

// Upload Files
const uploadFile = async (req, res) => {
  try {
    await authorizeB2(); // Authorize with B2
    const uploadUrlResponse = await getUploadUrl();

    const fileName = `${Date.now()}_${req.file.originalname}`;
    const uploadResponse = await uploadFileToB2(
      uploadUrlResponse.uploadUrl,
      uploadUrlResponse.authorizationToken,
      fileName,
      req.file.buffer
    );

    const authorizationToken = await getAuthorizationToken();

    const fileUrl = `https://f000.backblazeb2.com/file/${process.env.BUCKET_NAME}/${fileName}?Authorization=${authorizationToken}`;

    const newFile = new File({
      filename: req.file.originalname,
      fileUrl, // Save the file URL with the authorization token
      title: req.body.title,
      subject: req.body.subject,
      semester: req.body.semester,
      keyword: req.body.keyword,
      user: req.user._id,
    });

    await newFile.save();

    res.status(200).json({ message: 'File uploaded successfully', fileUrl });
  } catch (error) {
    console.error('File upload failed:', error);
    res.status(500).json({ message: 'File upload failed', error });
  }
};

// Get files
const getFiles = async (req, res) => {
  try {
    const files = await File.find().populate('user', 'userId name enrollmentNo semester');
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files', error });
  }
};

// Get files uploaded by the logged-in user
const getUserFiles = async (req, res) => {
  try {
    const userFiles = await File.find({ user: req.user._id }).populate('user', 'userId name enrollmentNo semester');
    res.status(200).json(userFiles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user files', error });
  }
};


module.exports = { uploadFile, getFiles,getUserFiles };
