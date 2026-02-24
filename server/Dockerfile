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

# Use Node image as base layer
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