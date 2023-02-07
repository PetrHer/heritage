# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Build the Next.js app in production mode
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose port 3000 in the container
EXPOSE 3000

# Start the Next.js app
CMD [ "npm", "start" ]