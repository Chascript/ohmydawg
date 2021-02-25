FROM node:14
# backend directory
WORKDIR /home/ubuntu/ohmydawg/back-end
# WORKDIR C:/Users/conan/Desktop/ohmydawg-github/ohmydawg/back-end
# Install server dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# run server
CMD ["node", "server.js"]