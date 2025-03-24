# Use a lightweight Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application
COPY . .

# Expose the backend port (change if needed)
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]
