const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

// timeout token 
// a 15 min token 
// if the user has a valid one of these then 
// they are allowed to use the application
module.exports = function (user) {
    const payload = {
           username: user.username
       }
       const options = {
           expiresIn: '15m'
       }
       return jwt.sign(payload, secrets.jwtSecret, options);
   }
   

// the timeout token will last for 15 mins
/*
    this will be the strictest of all the tokens.
    if this token isn't valid, the user will NOT be able to use the application
    after the 15 min timer.. the user will be prompted to ask for a new timeout
    token token as long as their refresh token is still valid.
*/