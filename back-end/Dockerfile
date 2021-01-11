FROM node:14

# Create app directory
WORKDIR C:/Users/conan/Documents/code/react-sites/dog-site/ohmydawg/back-end

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]