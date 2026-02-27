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

# Use the official Node.js runtime as the parent image.
# This provides the necessary environment to run a Node.js application.
FROM node:latest

# Set the working directory inside the container.
# All subsequent instructions will be executed relative to this directory.
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache.
# This prevents reinstalling dependencies if only application code changes.
COPY package*.json ./

# Install project dependencies.
# Docker will only re-run this step if the package*.json files have changed, saving build time.
RUN npm install

# Copy the rest of the application source code to /app
COPY . .

# Specify the command to run when the container starts.
# This command builds the application, which is the default behavior when the container runs.
CMD ["npm", "run", "build"]
