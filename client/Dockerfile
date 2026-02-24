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

# Use Node image as base layer
FROM node:latest AS builder

# Create app directory
WORKDIR '/app'

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Bundle app source
COPY . .

# run app use RUN and not CMD for this is production
RUN npm run build

############################################################################################
# NGINX Building Layer
# This is a MINIMAL RUNTIME image so project can use ingress on k8s cluster
# For k8s deployment of app
############################################################################################

# Use Nginx image as base layer
FROM nginx

# expose port for pod communication
EXPOSE 3000

# Copy our config into container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html