const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

// Register Tokens
// the access token will last for 365 days
/* 
this will be the main token. the user will use this as a pass to 
use the application. as long as this is valid. then they will be
allowed to login and 

*/
module.exports = function (user) {
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '365d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}