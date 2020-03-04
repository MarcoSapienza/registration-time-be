FROM node:8

# Create app directory
WORKDIR /usr/src/registrationtime-be

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

WORKDIR ./bin

EXPOSE 4000
CMD [ "npm", "start" ]
