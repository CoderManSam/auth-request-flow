const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const secret = 'very secure password'

router.post('/login', (req, res) => {

    const {username, password} = req.body

    if(mockUser.username === username && mockUser.password === password) {
        const user = mockUser.username

        const payload = {username: user}
    
        const token = jwt.sign(payload, secret)

        return res.status(201).json(token)

        // console.log("payload", payload)
    }

    else {
        return res.status(400).json("incorrect username/password provided")
    }
});


router.get('/profile', (req, res) => {
    const token = req.headers.authorization

    // console.log("token", token)

    try {
        jwt.verify(token, secret);
        return res.json(mockUser)
    } catch(err) {
        return res.json("incorrect username/password")
    }
});


module.exports = router;
