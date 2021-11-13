require('dotenv').config({ silent: true });

const aws = require("aws-sdk");

const s3 = new aws.S3({
    endpoint: process.env.IMAGES_S3_ENDPOINT,
    accessKeyId: process.env.IMAGES_ACCESS_KEY,
    secretAccessKey: process.env.IMAGES_SECRET_ACCESS_KEY,
});

module.exports = {
    DB_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    DB_CERT_FILENAME: process.env.MONGO_CERT_FILENAME,
    s3: s3
};