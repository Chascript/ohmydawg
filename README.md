# ohmydawg
www.ohmydawg.co.uk is the master branch of this repo. ohmydawg will be a site where dogs can create profiles, make paw pals, post their walks/photos and vote for favourite photos. A bit like facebook but for dogs. This is currently in development and my first project with ReactJS. I first began learning in Novemeber 2019. For full journey in creating this repo and DogSite look at twitter and LinkedIn (Links on profile). All feedback is recieved positively :).

## Current Features 

* User can sign-up and details are saved
* Multiple dogs can be added to one account (if created during the signup progess
* Dogs are rendered on Gallery page and can be voted on

## Current Technology

* Frontend is ReactJS, Material-UI, React-Spring, fetch for api calls
* Backend is node using express, Rest API, multer, sharp
* nginx
* docker

## Technology to include

* Auth0 for account creation and logging in
* docker-compose (So the entire app can be built with 1 command).

## Roadmap

* Each dog to vote on eachothers profile (Possibly a 'High-Paw!') these numbers are account bound and can be sent once a day or week?
* To have a gallery of photos for each dog (each photo has individual tally of votes)
* A feed for posts which can be filtered to friends only, user only or see all.
* Each dog has their profile page displaying details of themselves along with photos
* Each dog can delete their own photos and edit their details
* Possibly dogs message eachother to plan walks

## Commands to run site (within an aws Ubuntu 20.04 ec2-instance)

### Production With SSL Certificates 

Download the script with:<br />
`curl https://raw.githubusercontent.com/Chascript/ohmydawg/master/ship-with-certs.sh > ship-with-certs.sh`<br />
Run the script with (with your own domain and email):<br />
`sudo DOMAIN="chosen-domain" EMAIL="chosen-email" ./ship-with-certs.sh`<br />
The site will now be accessible via https://chosen-domain<br />

### Production Without SSL (Testing)
Download the script with:<br />
`curl https://raw.githubusercontent.com/Chascript/ohmydawg/master/ship-no-certs.sh > ship-no-certs.sh`<br />
Run the script with:<br />
`sudo ./ship-no-certs.sh`<br />
The site will now be accessible via http://instance-ip-address


