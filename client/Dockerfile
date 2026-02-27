############################################################################################
#
#    ____ _ _            _   
#   / ___| (_) ___ _ __ | |_ 
#  | |   | | |/ _ \ '_ \| __|
#  | |___| | |  __/ | | | |_ 
#   \____|_|_|\___|_| |_|\__|                            
#
# CLIENT
#
# https://github.com/ayfantis53/mern-memories/blob/master/client/Dockerfile

############################################################################################
# Node Building Layer
# This is a MINIMAL RUNTIME image to run Node project
# For building Goals frontend on pipeline
############################################################################################

# Use the official Node.js runtime as the parent image.
# This provides the necessary environment to run a Node.js application.
FROM node:latest AS builder

# Set the working directory inside the container to /app
WORKDIR '/app'

# Copy package.json and package-lock.json (if present) to the working directory.
COPY ./package*.json ./

# Run npm install to install project dependencies.
# This leverages Docker's layer caching, so dependencies only reinstall if package*.json changes.
RUN npm install

# Copy the rest of the application code to the container.
COPY . .

# Run the npm build script specified in package.json.
# This creates the optimized production build of the application in the 'build' directory.
RUN npm run build

############################################################################################
# NGINX Building Layer
# This is a MINIMAL RUNTIME image so project can use ingress on k8s cluster
# For k8s deployment of app
############################################################################################

# Use the official Nginx base image
# Using an official image ensures you get all necessary Nginx setup and entrypoint scripts.
FROM nginx

# Expose port 80 to the outside world
# Note: The original Dockerfile requested EXPOSE 3000, but Nginx typically serves on port 80 by default.
# The configuration file likely maps Nginx to port 80.
EXPOSE 80

# Copy a custom Nginx configuration file to the container.
# This file is used to configure how Nginx serves the application and handles routing.
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the 'builder' stage to the Nginx web root directory.
# This efficiently transfers only the static files needed for production, without the build tools or source code.
COPY --from=builder /app/build /usr/share/nginx/html
