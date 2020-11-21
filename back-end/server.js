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
  // need to get dog key from json file
  //map through galleryData and use the key to get 
  // dogs info to send over.
  const data = Object.keys(accounts);
  console.log(data)

  galleryData = data.map((dogId) => (accounts[dogId].dogs.dog))
  dogs = galleryData.map((dog)=>({
    name : dog.dogName,
    breed: dog.dogBreed,
    votes: dog.votes,
    image: dog.image,
    username: dog.dogsOwner
  }))

  res.json(dogs)
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

//Save new account
app.post('/signup/newaccount', (req,res) => {
console.log(req.body)
const newAccount={
  username: req.body.username,
  email:req.body.email,
  password: req.body.password,
  firstName: req.body.firstName,
  surname: req.body.surname,
  dateOfBirth: req.body.dateOfBirth,
  termsandConditionsAgreed: true,
  dogs:[]
}
accounts[newAccount.username] = newAccount
saveData(accounts, 'accounts.json')

res.json('account saved')
})

//save new dog
app.post('/signup/newdog', upload.single('photo'), (req,res) => {
  const dogNumber =  accounts[req.body.usernameValue].dogs.length+1
  const dogObject = `Dog ${dogNumber}`

  // need a key generator for dogs, each
  // dog has an unique key this is saved where dogObject is
  const  newDog =  { 
    [dogObject]:{
      dogName: req.body.dogName,
      dogBreed: req.body.dogBreed,
      dogDateOfBirth: req.body.dogDateOfBirth,
      dogShortBio: req.body.dogShortBio,
      dogPersonality: [req.body.dogPersonality],
      dogPunchLine: req.body.dogPunchLine,
      votes: 0,
      image: `http://localhost:5000/photos/${req.file.filename}`
    }
  }
accounts[req.body.usernameValue].dogs.push(newDog)
  saveData(accounts, 'accounts.json')
  res.json('dog saved')
})

app.post('/dog/username/name/vote', (req,res) => { 
  //each dogs has its own unique key,
  // accounts[username].dogs.key.votes
  //adapt code below so it plus 1 to that dogs vote
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
  if(existingEmails.includes(chosenEmail)){
    res.json('exists')
  } else{
    res.json(chosenEmail)
  }
});

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})