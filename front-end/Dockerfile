FROM node:14
# change directory to react app
WORKDIR /home/ubuntu/ohmydawg/front-end
# install app dependencies
COPY package*.json ./
RUN npm install && npm install -g serve
RUN npm install react-scripts@3.4.1 -g
# Bundle app source
COPY . .
# build react app
CMD ["npm", "run", "build"]

# nginx ?