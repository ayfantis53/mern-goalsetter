FROM node:latest

# Create app directory
WORKDIR '/app'

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Bundle app source
COPY . .

# run app
CMD ["npm", "run", "build"]