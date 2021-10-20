require('dotenv').config({ silent: true });
module.exports = {
    DB_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    DB_CERT_FILENAME: process.env.MONGO_CERT_FILENAME
};