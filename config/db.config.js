require('dotenv').config({ silent: true });
module.exports = {
    HOST: process.env.MONGO_HOST,
    PORT: process.env.MONGO_PORT,
    DB: process.env.MONGO_DB
};