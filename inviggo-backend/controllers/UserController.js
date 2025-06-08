const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', AuthMiddleware, async (req, res) => {

    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json(err.massage);
    }
});

router.post('/register', async (req, res) => {
    try {
        const {username, password, phone} = req.body;
        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({ message: 'User with that username exists. Username must be unique.'});
        }
        else {
            const hashed = await bcrypt.hash(password, 10);
            const user = new User({username, password: hashed, phone, registrationDate: new Date().now});
            const newUser = await user.save();

            // generate token and return, register and login in the same time
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
            res.status(201).json({ username: username, jwtToken: token });
        }
    } catch (error) {
        res.status(400).json(err.massage);
    };
});

router.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;    // get data from body
        const user = await User.findOne({username});    // get user from mongodb
        if(!user){
            return res.status(400).json({ message : 'User with that username doesn\'t exists.'});
        }
        else {
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.status(400).json({ message: 'Wrong password!'});
            }
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.status(200).json({username: username, jwtToken: token});
    }
    catch(err){
        res.status(400).json(err.message);
    }
});

module.exports = router;