FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./client ./client
COPY ./server ./server

# Build the client and server
RUN npm run build:prd
RUN npm run build:server

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "server/dist/server.js"]
