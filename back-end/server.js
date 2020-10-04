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
  const data = Object.keys(accounts)
  const emailData = data.map((accountId) => 
    accounts[accountId].email
  )
  const exists = emailData.includes(emailInputted)
  res.json(exists)
})







app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

