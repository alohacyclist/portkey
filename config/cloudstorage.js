const dotenv = require("dotenv");
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
dotenv.config();


const bucket = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const  accessKey = process.env.AWS_ACCESS_KEY
const secretKey  = process.env.AWS_SECRET_KEY

const storage = new S3({
  region,
  accessKey,
  secretKey
});

// uploads a file to s3
function uploadFile(file) {
    console.log(file)
    const fileStream = fs.createReadStream(file.path)
  
    const uploadParams = {
      Bucket: bucket,
      Key: file.filename,
      Body: fileStream
    }
  
    return storage.upload(uploadParams).promise()
  }
  
  // downloads a file from s3
  function downloadFile(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucket
    }
  
    return storage.getObject(downloadParams).createReadStream()
  }

module.exports = { uploadFile, downloadFile }
