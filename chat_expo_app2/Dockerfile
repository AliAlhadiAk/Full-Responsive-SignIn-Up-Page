# Use the official Node.js 14 image from Docker Hub
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port that the React Native Metro Bundler runs on
EXPOSE 19000

# Start the React Native Metro Bundler
CMD ["npm", "start"]
