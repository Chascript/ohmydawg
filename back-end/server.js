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
  const data = Object.keys(accounts);
  galleryData = data.map((dogId) => [
    accounts[dogId].name,
    accounts[dogId].breed,
    accounts[dogId].votes,
    accounts[dogId].image,
    accounts[dogId].username,
  ])

  res.json(galleryData)
})

// get username data
app.post('/accounts/details/username', (req,res) => {
  const usernameInputted = req.body.value
  if (accounts[usernameInputted]) {
    const data = [accounts[usernameInputted].name,accounts[usernameInputted].image, false]
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
  accounts[newDog.username] = newDog; // sets email as index

  saveData(accounts, 'accounts.json')

  res.json(`Your first dog and account details are saved`)
})

app.post('/dog/username/name/vote', (req,res) => { 
  const { name } = req.body
  const { username } = req.body
  if(accounts[username].name) {
    
    accounts[username].votes += 1;
    saveData(accounts, 'accounts.json')
    console.log(username)
    const votes = accounts[username].votes

    res.json(`${votes} for ${username} ${name}`);
  } else {
    res.json( `${name} doesn't exist under ${username}`);
  }
});

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

