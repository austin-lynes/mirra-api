const express = require('express');
const router = express.Router();
const Users = require('../../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets');

const generateRefreshToken = require('../../util/generateRefreshToken')
const generateTimeoutToken = require('../../util/generateTimeoutToken')
const generateAccessToken = require('../../util/generateAccessToken')

router.post('/register', (req, res) => {
    // HASH THE PASSWORD FOR USER SAFETY
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
    const auth_user = { ...user, 'access-token': generateAccessToken(user) }
    // ----------------------------------------------------
    Users.create(auth_user)
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

    Users.findByUsername(credentials.username)
        .then((_user) => {
            if (jwt.verify(_user['access-token'], secrets.jwtSecret)) {
                if (bcrypt.compareSync(credentials.password, _user.password)) {
                    // now we can create the refresh token and the timeout token
                    const refreshToken = generateRefreshToken(_user);
                    const timeoutToken = generateTimeoutToken(_user);
                    res.status(200).json({
                        message: `welcome ${_user.username}.`,
                        username: _user.username,
                        tokens: { refreshToken, timeoutToken, accessToken: _user['access-token'] },
                    })
                } else {
                    res.status(403).json({ message: `sorry... wrong credentials`, })
                }
            } else {
                // the token is stale.. been here for more than 365 days...
                // the token was modified
                res.status(403).json({ message: `Sorry but you have been here a really long time... lets refresh your membership`, })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'no user found please create an account' })
        })
})

router.post('/timeout', (req, res) => {
    const { pin, refreshToken } = req.body;
    
})


module.exports = router;