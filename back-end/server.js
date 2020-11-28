// Server Running
const express = require('express');
const app = express();
const PORT = 5000;
const HOST = '0.0.0.0';
const path = require('path');

app.listen(PORT, HOST, () => console.log(`CORS-enabled server started on port ${PORT}`))

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

//Unique Id 
const { v4: uuidv4 } = require('uuid');

// Send all dog details over to frontend
// Need to now specify what data!
app.get('/dogs/details', (req,res) => {
  //retrieves dog data
  const usernames = Object.keys(accounts)
  const dogData = []
  usernames.forEach(username=>{
    const usersDogs = accounts[username].dogs

    for( let prop in usersDogs){
      const {dogName, dogBreed, image, votes, id} = usersDogs[prop]
      const dog = {
        dogName: dogName,
        dogBreed: dogBreed,
        image: image,
        votes: votes,
        id: id
      }
      dogData.push(dog)
    }
  })
  res.json(dogData)
})

//Save new account
app.post('/signup/newaccount', (req,res) => {
console.log(req.body)
accountId = uuidv4()
const newAccount = {
  email:req.body.email,
  password: req.body.password,
  firstName: req.body.firstName,
  surname: req.body.surname,
  dateOfBirth: req.body.dateOfBirth,
  termsandConditionsAgreed: true,
  dogs:{}
}
accounts[accountId] = newAccount
saveData(accounts, 'accounts.json')
res.json(accountId)
})

//save new dog
app.post('/signup/newdog', upload.single('photo'), (req,res) => {
  const dogId = uuidv4()
  console.log(req.body)
  const  newDog =  { 
      dogName: req.body.dogName,
      dogBreed: req.body.dogBreed,
      dogDateOfBirth: req.body.dogDateOfBirth,
      dogShortBio: req.body.dogShortBio,
      dogPersonality: [req.body.dogPersonality],
      dogPunchLine: req.body.dogPunchLine,
      votes: 0,
      image: `${process.env.REACT_APP_API_URL}/photos/${req.file.filename}`,
      id: dogId,
  }

  accounts[req.body.usernameValue].dogs[dogId] = newDog
  saveData(accounts, 'accounts.json')
  res.json('dog saved to account')
})

app.post('/dog/username/name/vote', (req,res) => { 
  const { dogName } = req.body
  const { id } = req.body
  const usernames = Object.keys(accounts)
  usernames.forEach(accountId=>{
    const dogs = accounts[accountId].dogs
    if(dogs[id]){
      dogs[id].votes += 1;
      saveData(accounts, 'accounts.json')
      const votes = dogs[id].votes
      res.json(`${votes} for ${dogName} (${id})`);
    } else {
      res.json( `${id} doesn't exist`);
    }
  })
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



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
