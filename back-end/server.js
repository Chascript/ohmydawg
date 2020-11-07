// Server Running
const express = require('express');
const app = express();
const port = 5000
const path = require('path');

app.listen(port, () => console.log(`CORS-enabled server started on port ${port}`))

// Middleware
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

// Setting up the cors config
const cors = require('cors')
app.use(cors())

// load json files
const fs = require('fs');
const accounts = JSON.parse(fs.readFileSync('accounts.json'));
const breeds = JSON.parse(fs.readFileSync('breeds.json')); // loads breeds file

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

// Storage for multer to know where to save images (Gallary)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'static/photos');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
//assign upload to storage
const upload = multer({ storage });

// Send all dog details over to frontend
app.get('/dogs/details', (req,res) => {
  
  const data = Object.keys(accounts);

  galleryData = data.map((dogId) => ({
  name: accounts[dogId].name,
  breed: accounts[dogId].breed,
  votes: accounts[dogId].votes,
  image: accounts[dogId].image,
  username: accounts[dogId].username,
  })
)

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
app.post('/signup/newdog', upload.single('photo'), (req,res) => {
  const newDog = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    colour: req.body.colour,
    votes: 0,
    image: `http://localhost:5000/photos/${req.file.filename}`
  };
  accounts[newDog.username] = newDog; // sets email as index

  saveData(accounts, 'accounts.json')

  res.json('Your first dog and account details are saved')
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

app.get('/dogs/breeds', (req, res) => {
  const data = Object.values(breeds);
  res.json(data[0]);
})

app.post('/dogs/email/exist', (req, res) => {
  const {chosenEmail} = req.body;
  const data = Object.keys(accounts)
  const existingEmails = data.map((dogid) => accounts[dogid].email)
  console.log(existingEmails)
  const emailexist = existingEmails.includes(chosenEmail)
  console.log(emailexist)
  console.log(chosenEmail)
  res.json(emailexist)
});

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

