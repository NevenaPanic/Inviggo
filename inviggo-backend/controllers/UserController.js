const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {

    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(400).json(err.massage);
    }
});

router.post('/', async (req, res) => {

    const user = new User({ username: "nevenaaa", password: "pass123", phone: "0230431431", registrationDate: new Date()});
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch(err){
        res.status(400).json(err.massage);
    }
});

module.exports = router;