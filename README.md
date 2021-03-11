# ohmydawg
www.ohmydawg.co.uk (currently dogsite) will become this repo (Aiming for end of 2020). A ReadME still needs to be created so use description for brief info on repo. ohmydawg will be a site where dogs can create profiles, make paw pals, post their walks and photos, vote for favourite photos. Like facebook but for dogs. This is in development and expect there to be errors, I am learning and this is my first ReactJS project. I first began to learn in Novemeber 2019. For full journey in creating this repo and DogSite look at twitter and LinkedIn (Links on profile). All feedback is helpful, even if its pointing at the obvious that I have missed.

## Current Features 

* When username is typed if recognised user is proptempted to sign-in if not sign-up
* User can sign-up and details are saved to accounts.json (backend) (not currently image)

## Current Technology

* Frontend is ReactJS, Material-UI, React-Spring, fetch for api calls
* Backend is node using express, Rest API

## Technology to include

* Auth0 for account creation and logging in
* NginX to get front and backend talk properly (saving photos and rendering them)

## Roadmap

* Impliment NginX
* Image to save
* Multiple dogs to be added under one username
* Each dog to vote on eachothers profile (Possibly a 'High-Paw!') these numbers are account bound and can be sent once a day or week?
* To have a gallery of photos for each dog (each photo has individual tally of votes)
* A feed for posts which can be filtered to friends only, user only or see all.
* Each dog has their profile page displaying details of themselves along with photos
* Each dog can delete their own photos and edit their details
* Possibly dogs message eachother to plan walks

## Commands to run site 

* source <(curl -s https://raw.githubusercontent.com/Chascript/ohmydawg/master/init-letsencrypt.sh)
* Please note with above command I need to include env var, so will update command above

