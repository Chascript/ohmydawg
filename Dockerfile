FROM node:14

# backend directory
WORKDIR /home/ubuntu/ohmydawg/back-end
# Install server dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# run server (look at this: Error: Cannot find module '/home/ubuntu/ohmydawg/back-end/server.js' ) 
RUN node server.js
# change directory to react app
WORKDIR /home/ubuntu/ohmydawg/front-end
# install app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
# Bundle app source
COPY . .
# expose port 80 for nginx
EXPOSE 80
# build react app
CMD ["npm", "run", "build"]

# npm serve
# nginx ?