#!/bin/bash

# BCG-Level 297-Slide Presentation Generator
# Deployment Script

set -e

echo "🚀 BCG Slides Generator - Deployment Script"
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        log_error "Python 3 is not installed"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm ci
    log_success "Dependencies installed"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    npm test
    log_success "All tests passed"
}

# Generate presentation
generate_presentation() {
    log_info "Generating 297-slide presentation..."
    npm run generate
    log_success "Presentation generated successfully"
}

# Start server
start_server() {
    log_info "Starting presentation server..."
    log_warning "Server will start on http://localhost:8082"
    log_warning "Press Ctrl+C to stop the server"
    npm run serve
}

# Docker deployment
deploy_docker() {
    log_info "Building Docker image..."
    docker build -t bcg-slides-generator .
    
    log_info "Starting Docker container..."
    docker run -d --name bcg-slides-generator -p 8082:8082 bcg-slides-generator
    
    log_success "Docker container started on http://localhost:8082"
    log_info "To stop: docker stop bcg-slides-generator"
    log_info "To remove: docker rm bcg-slides-generator"
}

# Production deployment
deploy_production() {
    log_info "Production deployment..."
    
    # Clean previous builds
    npm run clean
    
    # Install production dependencies
    npm ci --only=production
    
    # Generate presentation
    npm run generate
    
    # Create production archive
    tar -czf bcg-slides-production-$(date +%Y%m%d).tar.gz output/ src/ data/ package.json README.md
    
    log_success "Production build created: bcg-slides-production-$(date +%Y%m%d).tar.gz"
}

# Main deployment logic
main() {
    case "${1:-local}" in
        "local")
            check_prerequisites
            install_dependencies
            run_tests
            generate_presentation
            start_server
            ;;
        "docker")
            deploy_docker
            ;;
        "production")
            check_prerequisites
            install_dependencies
            run_tests
            deploy_production
            ;;
        "test")
            check_prerequisites
            install_dependencies
            run_tests
            ;;
        "generate")
            check_prerequisites
            install_dependencies
            generate_presentation
            ;;
        *)
            echo "Usage: $0 [local|docker|production|test|generate]"
            echo ""
            echo "Commands:"
            echo "  local      - Full local deployment (default)"
            echo "  docker     - Docker container deployment"
            echo "  production - Production build and archive"
            echo "  test       - Run tests only"
            echo "  generate   - Generate presentation only"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"

