# Multi-stage Docker build for React Vite app
# This Dockerfile is optimized for AI-generated applications

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for better compatibility
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies with npm ci for reproducible builds
RUN npm ci

# Copy source code
COPY . .

# Accept build argument for Vite base path
ARG VITE_BASE_PATH=/

ENV VITE_BASE_PATH=${VITE_BASE_PATH}

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Install security updates
RUN apk upgrade --no-cache

# Create non-root user for security
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001 -G appuser

# Remove default nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration for React SPA
COPY --chown=appuser:appuser nginx.conf /etc/nginx/nginx.conf

# Create nginx cache, log, and runtime directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/lib/nginx /tmp && \
    chown -R appuser:appuser /var/cache/nginx /var/log/nginx /var/lib/nginx /etc/nginx /usr/share/nginx/html /tmp && \
    chmod 755 /tmp

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
