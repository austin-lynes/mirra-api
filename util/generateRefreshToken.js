const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
// refresh token
    // valid for 1 day
    // used as a pass to get a new timeout token

module.exports = function (user) {
 const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options);
}


// the refresh token will last for 1 day
    /* 
        this will be the main token. the user will use this as a pass to 
        use the application. as long as this is valid. then they will be
        allowed to ask the api for a new refresh and timeout token
        
    */
