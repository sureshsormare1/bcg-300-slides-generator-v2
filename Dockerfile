# BCG-Level 297-Slide Presentation Generator
# Professional Docker container for enterprise deployment

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Python for serving presentations
RUN apk add --no-cache python3 py3-pip

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create output directory
RUN mkdir -p output

# Set proper permissions
RUN chown -R node:node /app
USER node

# Expose port for presentation serving
EXPOSE 8082

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8082/ || exit 1

# Default command - generate presentation and serve
CMD ["sh", "-c", "npm run generate && npm run serve"]

# Labels for better container management
LABEL maintainer="Manus AI"
LABEL version="1.0.0"
LABEL description="BCG-level 297-slide presentation generator"
LABEL org.opencontainers.image.title="BCG Slides Generator"
LABEL org.opencontainers.image.description="Professional consulting-grade presentation generator"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.vendor="Manus AI"

