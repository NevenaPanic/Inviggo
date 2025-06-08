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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const { name, category, minPrice, maxPrice, username } = req.query;
      
      const query = {};
      if (name) {
        query.name = { $regex: name, $options: 'i' }; // case-insensitive contains
      }

      if (category) {
        query.category = category;
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) 
          query.price.$gte = Number(minPrice);
        if (maxPrice) 
          query.price.$lte = Number(maxPrice);
      }

      if (username) {
        query.user = await User.find({username});
      }

      const skip = (page - 1) * limit;

      const ads = await Ad.find(query)
        .sort({ createdAt: -1, _id: -1 })
        .limit(limit)
        .skip(skip)
        .populate('user', 'username phone registrationDate')

      const total = await Ad.countDocuments(query); // ukupan broj oglasa

      res.status(200).json({
        total,
        page,
        pages: Math.ceil(total/limit),
        limit,
        ads: ads
      });
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

router.delete('/:id', AuthMiddleware, async(req, res) => {
  try{
    const id = req.params.id;
    const result = await Ad.findByIdAndDelete(id);
  
    if(!result){
      return res.status(404).json({ message: 'Ad not found.' });
    }
    res.status(200).json({ message: 'Add deleted successfully.'});
  } catch(error) {
    res.status(500).json({ message: 'Server error'});
  }
});


module.exports = router;