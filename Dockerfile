# Use the official Node.js 20 slim image for the build stage
FROM node:20-slim as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (dependency caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the .env file for Next.js to read environment variables
COPY .env.prod ./.env

# Copy the application source code
COPY . .

# Build the Next.js project with increased memory allocation
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Use the same Node.js image for production
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --production

# Copy built application from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./next.config.mjs

# Set environment to production
ENV NODE_ENV=production

# Expose the port that Next.js will run on
# Note: Cloud Run will set the PORT environment variable
EXPOSE 3000

# Start the Next.js production server
# We use a script to read the PORT environment variable set by Cloud Run
CMD ["sh", "-c", "npm start -- -p ${PORT:-3000}"]