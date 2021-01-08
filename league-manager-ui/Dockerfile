FROM node:current-alpine as league-manager-ui

# Create application directory in container
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy over the package.json and package-lock.json files
COPY ./package*.json /app/

# Install dependencies
RUN npm install --silent
RUN npm install react-scripts -g --silent

# Copy EVERYTHING
COPY . .

# Build the application
RUN yarn build

# Build the nginx server
FROM nginx:latest

# Allow access to port 80
EXPOSE 80

# Copy all the contents from the build directory into the web root directory
COPY --from=league-manager-ui /app/build/ /var/www/html
COPY ./nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
