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
EXPOSE 5001

# Set environment variables (optional defaults)
ENV PORT=5001
ENV MONGO_URI=mongodb://mongo:27017/task_tracker_api
ENV JWT_SECRET=db10ab081df057f582345a5365fbb43bfd5a65240a3c5329a288c4a4c1f4f976cd963f8aae79971a12701d031944d648c4368ea9988b392a6aabfc2637fc703d 

# Command to run your server
CMD ["node", "server.js"]
