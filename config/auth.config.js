require('dotenv').config({ silent: true });
module.exports = {
    secret: process.env.AUTH_SECRET,
    jwtExpiration: 3600,           // 1 hour
    jwtRefreshExpiration: 86400,   // 24 hours
};