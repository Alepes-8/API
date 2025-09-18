# Use Node.js 18 as the base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose the port your app uses
EXPOSE 5000

# Set environment variables (optional defaults)
ENV PORT=5000
ENV MONGO_URI=mongodb://127.0.0.1:27017/recipe-manager

# Command to run your server
CMD ["node", "server.js"]
