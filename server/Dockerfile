############################################################################################
#
#   ____                           
#  / ___|  ___ _ ____   _____ _ __ 
#  \___ \ / _ \ '__\ \ / / _ \ '__|
#   ___) |  __/ |   \ V /  __/ |   
#  |____/ \___|_|    \_/ \___|_|                              
#
# SERVER
#
# https://github.com/ayfantis53/mern-memories/blob/master/server/Dockerfile

############################################################################################
# Node Building Layer
# This is a MINIMAL RUNTIME image to run Node project
# For building Goals app backend on pipeline
############################################################################################

# Use the latest official Node.js image as base
FROM node:latest

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache.
# This prevents reinstalling dependencies if only application code changes.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to /app
COPY . .

# Build the application (e.g., compile TypeScript, build frontend assets)
RUN npm run build

# Set default command to run after the container starts
CMD ["npm", "run", "build"]
