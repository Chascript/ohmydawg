FROM node:14

# Create app directory
WORKDIR C:/Users/conan/Documents/code/react-sites/dog-site/ohmydawg/front-end

# install app dependencies
COPY package.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g
# Bundle app source
COPY . .

EXPOSE 80


CMD [ "npm", "run", "start" ]