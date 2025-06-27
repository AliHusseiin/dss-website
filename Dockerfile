# Base image with Node.js
FROM node:lts-alpine

# Install serve to serve the built Angular app
RUN npm install -g serve

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Angular app
COPY . .

# Build the Angular app for production
RUN npm run build
# --configuration production

# Serve the app using serve on port 5002
CMD ["serve", "-s", "dist/dss/browser", "-l", "5002"]