const B2 = require('backblaze-b2');
require('dotenv').config();

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const authorizeB2 = async () => {
  await b2.authorize();
};

const getUploadUrl = async () => {
  const response = await b2.getUploadUrl({
    bucketId: process.env.BUCKET_ID,
  });
  return response.data;
};

const uploadFileToB2 = async (uploadUrl, uploadAuthToken, fileName, data) => {
  const response = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken,
    fileName,
    data,
  });
  return response.data;
};

const getAuthorizationToken = async () => {
  await authorizeB2();
  return b2.authorizationToken;
};

module.exports = { authorizeB2, getUploadUrl, uploadFileToB2, getAuthorizationToken };
