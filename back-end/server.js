// Server Running
const express = require('express');
const app = express();
const port = 5000
const path = require('path');

app.listen(port, () => console.log(`CORS-enabled server started on port ${port}`))

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the cors config
const cors = require('cors')
app.use(cors())

// loads json file
const fs = require('fs');
const accounts = JSON.parse(fs.readFileSync('accounts.json'));

// read data sent to server at limit of 1mb
app.use(express.json())

// Send all dog details over to frontend
app.get('/dogs/details', (req,res) => {
  const data = Object.values(accounts);
  res.json(data)
})

// get email data
app.post('/accounts/details/email', (req,res) => {
  const emailInputted = req.body.value
  if (accounts[emailInputted]) {
    const data = [accounts[emailInputted].name,accounts[emailInputted].image, false]
    res.json(data)
  } else {
    const datadata = [false,false,true]
    res.json(datadata)
  }
})

// 3 random dog photos
app.get('/photos/random', (req, res) => {
  const data = Object.keys(accounts);
  const images = data.map((accountId) => accounts[accountId].image)
  const randomNumber1 = Math.floor(Math.random()*images.length);
  const randomNumber2 = Math.floor(Math.random()*images.length);
  const randomNumber3 = Math.floor(Math.random()*images.length);
  const randomImages = [images[randomNumber1],images[randomNumber2],images[randomNumber3]];
  res.json(randomImages)
})

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

