require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

const app = express()
const port = 3000

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Mongo Database'))

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:4000'
}));

const usersRouter = require('./controllers/UserController');
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})