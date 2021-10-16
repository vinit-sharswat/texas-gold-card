const signin = require('./signin');
const signup = require('./signup');

module.exports = {
    paths: {
        '/api/auth/signin': {
            ...signin
        },
        '/api/auth/signup': {
            ...signup
        }
    }
}