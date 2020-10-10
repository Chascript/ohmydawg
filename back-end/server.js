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

// Save data (parameter is object and path)
const saveData = (object, filepath) => {
  function finished(error) {
    if(error) {
      console.log(error);
      return // if error occurs then return prevents data saving
    }
  }
  const jsonData = JSON.stringify(object, null, 2); //gets accounts.json and makes it so JS can understand
  fs.writeFile(filepath, jsonData, finished);
};

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

//save new dog
app.post('/signup/newdog', (req,res) => {
  const newDog = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    colour: req.body.colour,
    votes: 0,
  }
  accounts[newDog.email] = newDog; // sets email as index

  saveData(accounts, 'accounts.json')

  res.json(`Your first dog and account details are saved`)
})

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

