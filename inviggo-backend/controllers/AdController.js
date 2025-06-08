const express = require('express');
const multer = require('multer')

const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const User = require('../models/User');
const AuthMiddleware = require('../middleware/authMiddleware');
const Category = require('../enums/Category');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname) 
  }
})

const upload = multer({ storage: storage })


router.get('/', async (req, res) => {

    try{
        const ads = await Ad.find();
        res.status(200).json(ads);
    }
    catch(error){
        res.status(400).json({message: error.massage});
    }
});

router.post('/', AuthMiddleware, upload.single('file'), async (req, res) => {
  const { name, description, price, city, category, username } = req.body
  const file = req.file

  const user = await User.findOne({username});

  const ad = new Ad({ 
    name, 
    description,
    imageUrl: file.filename,
    price,
    category,
    user: user._id,
    city,
    createdAt: new Date().now
  }); 
  const newAd = await ad.save();

  if(!file){
    return res.status(400).json({ message: "File not send"})
  }

  res.status(201).json({ message: "Upload successful" });
});


module.exports = router;