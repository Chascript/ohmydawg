FROM node:14

# Create app directory
WORKDIR C:/Users/conan/Documents/code/react-sites/dog-site/ohmydawg/front-end

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80



CMD [ "npm", "run", "start" ]