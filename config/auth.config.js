require('dotenv').config({ silent: true });
module.exports = {
    secret: process.env.AUTH_SECRET
};