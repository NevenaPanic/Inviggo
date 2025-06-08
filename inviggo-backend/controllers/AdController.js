const express = require('express');
const multer = require('multer')

const jwt = require('jsonwebtoken');
const User = require('../models/Ad');
const AuthMiddleware = require('../middleware/authMiddleware');

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
        const ads = await Ads.find();
        res.status(200).json(ads);
    }
    catch(error){
        res.status(400).json(error.massage);
    }
});

router.post('/', AuthMiddleware, upload.single('file'), async (req, res) => {
  const { name, description, price, city, category, username } = req.body
  const file = req.file

  // TODO: add to Db
  if(!file){
    return res.status(400).json({ message: "File not send"})
  }

  res.status(201).json({ message: "Upload successful" });
});


module.exports = router;