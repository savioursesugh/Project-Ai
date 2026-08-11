# Use official Node.js LTS image
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (leverage Docker cache)
COPY package.json package-lock.json* ./

RUN npm ci --only=production || npm install --only=production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Use a non-root user for security
RUN useradd -m appuser && chown -R appuser /usr/src/app
USER appuser

# Start the server
CMD ["node", "server.js"]
