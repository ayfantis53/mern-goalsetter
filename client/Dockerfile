FROM node:24-alpine AS builder

# Create app directory
WORKDIR '/app'

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Bundle app source
COPY . .

# run app use RUN and not CMD for this is production
RUN npm run build

# NEEDED FOR K8S DEPLOYMENT OF APP ----------------------------------
FROM nginx

EXPOSE 3000

# Copy our config into container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html