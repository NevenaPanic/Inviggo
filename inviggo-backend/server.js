const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4000'
}));


// set up routers(controllers)
const usersRouter = require('./controllers/UserController');
app.use('/users', usersRouter);
const adsRouter = require('./controllers/AdController');
app.use('/ads', adsRouter);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Mongo Database'));

// app run 
// npm run devStart - command
app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});