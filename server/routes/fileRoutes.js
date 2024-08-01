const express = require('express');
const multer = require('multer');
const { uploadFile, getFiles } = require('../controllers/fileController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);

module.exports = router;