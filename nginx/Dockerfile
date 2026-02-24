############################################################################################
#
#   _   _  ____ ___ _   ___  __
#  | \ | |/ ___|_ _| \ | \ \/ /
#  |  \| | |  _ | ||  \| |\  / 
#  | |\  | |_| || || |\  |/  \ 
#  |_| \_|\____|___|_| \_/_/\_\                             
#
# NGINX
#
# https://github.com/ayfantis53/mern-memories/blob/master/nginx/Dockerfile

############################################################################################
# Nginx Building Layer
# This is a MINIMAL RUNTIME image to build Nginx
# For building Ingress Controller for app
############################################################################################

# Use the official Nginx base image
# Using an official image ensures you get all necessary Nginx setup and entrypoint scripts.
FROM nginx

# The Nginx official image loads configuration files from the /etc/nginx/conf.d/ directory on startup.
# The default file is usually named default.conf.

# Remove the existing default Nginx configuration file in the container.
# This prevents potential conflicts and ensures only our custom config is used.
# The `RUN` instruction executes commands in a new layer on top of the current image.
RUN rm /etc/nginx/conf.d/default.conf

# Copy your local custom default.conf file into the image's Nginx configuration directory.
# The `COPY` instruction takes two arguments: the source path on the host and the destination path in the container.
# Ensure your local `default.conf` is in the same directory as this `Dockerfile`.
COPY ./default.conf /etc/nginx/conf.d/default.conf
