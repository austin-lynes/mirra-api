const express = require('express');
const router = express.Router();
const Users = require('../../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const generateRefreshToken = require('../../util/generateRefreshToken')
const generateTimeoutToken = require('../../util/generateTimeoutToken')
const generateAccessToken = require('../../util/generateAccessToken')

function shapeIsValid(req, res, next) {
    const user = req.body
    if (!user.username) {
        res.status(500).json({ message: 'please provide a username' })
    } else if (user.password.length < 8) {
        res.status(500).json({ message: 'Password is too short' })
    }
    else if (user.password.length > 56) {
        res.status(500).json({ message: 'Password is too long' })
    } else {

        req.user = { ...user, "access-token": generateAccessToken(user) };
        next()
    }
}



router.post('/register', shapeIsValid, (req, res) => {
    // HASH THE PASSWORD FOR USER SAFETY
    const user = req.user
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
    // ----------------------------------------------------
    Users.create(user)
        .then((_user) => {
            if (_user) {
                res.status(201).json({ message: 'thank you for registering please log in now' })
            } else {
                res.status(400).json({ err: 'something went wrong' })
            }
        }).catch((err) => {
            res.status(500).json({ err: err })

        })
})

router.post('/login', (req, res) => {
    const credentials = req.body;
    if (credentials) {
        if (!credentials.username) {
            res.status(500).json({ message: 'please provide a username' })
        } else if (!credentials.password) {
            res.status(500).json({ message: 'please provide a password' })
        } else {
            // if we have a valid email address or valid username 
            // and password combo then they can login
            // but we need to find them first, and check their access token to verify 
            Users.findByUsername(credentials.username)
                .then((_user) => {
                    if (jwt.verify(_user['access-token'], secrets.jwtSecret)) {
                        if (bcrypt.compareSync(credentials.password, _user.password)) {
                            // now we can create the refresh token and the timeout token
                            const refreshToken = generateRefreshToken(_user);
                            const timeoutToken = generateTimeoutToken(_user);
                            res.status(200).json({ message: `welcome ${_user.username}.`, refreshToken, timeoutToken })
                        } else {
                            res.status(403).json({ message: `sorry... wrong credentials`, })
                        }
                    } else {
                        // the token is stale.. been here for more than 365 days...
                        // the token was modified
                        res.status(403).json({ message: `sorry... wrong credentials`, })
                    }
                }).catch((err) => { console.log(err); res.status(500).json({ message: 'no user found please create an account' }) })
            // that it is valid for them to login.
            // then the api can give them a refresh and timeout token.

        }
    } else {
        res.status(500).json({ message: 'Please Provide Login credentials' })
    }

})


module.exports = router;