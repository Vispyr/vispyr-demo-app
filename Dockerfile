# Use the latest Node.js LTS version
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the port (this will be overridden by docker-compose for each service)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]