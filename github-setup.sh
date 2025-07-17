#!/bin/bash

# GitHub Setup Script for BCG-Level 297-Slide Presentation Generator
# This script helps you push the project to GitHub

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
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

log_step() {
    echo -e "${CYAN}🔧 $1${NC}"
}

echo "🚀 GitHub Setup for BCG-Level 297-Slide Presentation Generator"
echo "=============================================================="

# Check if we're in a Git repository
if [ ! -d ".git" ]; then
    log_error "Not in a Git repository. Please run this script from the project root."
    exit 1
fi

# Check if Git is configured
if [ -z "$(git config user.name)" ] || [ -z "$(git config user.email)" ]; then
    log_warning "Git user not configured. Please set your Git credentials:"
    echo "git config user.name 'Your Name'"
    echo "git config user.email 'your.email@example.com'"
    exit 1
fi

log_info "Current Git status:"
git status --short

echo ""
log_step "Step 1: Create a new repository on GitHub"
echo "1. Go to https://github.com/new"
echo "2. Repository name: bcg-300-slides-generator (or your preferred name)"
echo "3. Description: BCG-level 297-slide presentation generator with professional styling"
echo "4. Set to Public or Private (your choice)"
echo "5. DO NOT initialize with README, .gitignore, or license (we already have these)"
echo "6. Click 'Create repository'"

echo ""
read -p "Press Enter after creating the GitHub repository..."

echo ""
log_step "Step 2: Add GitHub remote"
echo "Please enter your GitHub repository URL:"
echo "Format: https://github.com/USERNAME/REPOSITORY-NAME.git"
echo "Example: https://github.com/johndoe/bcg-300-slides-generator.git"
echo ""
read -p "GitHub repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    log_error "Repository URL cannot be empty"
    exit 1
fi

# Add remote origin
log_info "Adding GitHub remote..."
git remote add origin "$REPO_URL"
log_success "Remote origin added: $REPO_URL"

echo ""
log_step "Step 3: Push to GitHub"
log_info "Pushing to GitHub main branch..."

# Push to GitHub
if git push -u origin main; then
    log_success "Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your BCG-level presentation generator is now on GitHub!"
    echo "📁 Repository: $REPO_URL"
    echo ""
    echo "🔗 Next steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Check that all files are uploaded correctly"
    echo "3. Review the README.md for usage instructions"
    echo "4. Set up GitHub Pages (optional) for live demo"
    echo "5. Configure branch protection rules (recommended)"
    echo ""
    echo "🚀 GitHub Actions CI/CD pipeline will run automatically on push!"
else
    log_error "Failed to push to GitHub"
    echo ""
    echo "Common solutions:"
    echo "1. Check your GitHub credentials"
    echo "2. Ensure the repository exists and you have write access"
    echo "3. Try: git push --set-upstream origin main"
    echo "4. For authentication issues, set up SSH keys or personal access token"
    exit 1
fi

echo ""
log_step "Step 4: Optional - Set up GitHub Pages"
echo "To host your presentation on GitHub Pages:"
echo "1. Go to your repository on GitHub"
echo "2. Click Settings → Pages"
echo "3. Source: Deploy from a branch"
echo "4. Branch: main, Folder: / (root)"
echo "5. Your presentation will be available at:"
echo "   https://USERNAME.github.io/REPOSITORY-NAME/output/Paclitaxel-300-slides.html"

echo ""
log_success "GitHub setup complete! 🎉"

