#!/bin/bash

# Portfolio Hero Section - Auto Setup Script
# This script automatically sets up everything without prompts

set -e  # Exit on error

echo "🚀 Starting Portfolio Hero Section Setup..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies automatically
echo "📦 Installing dependencies..."
npm install --yes --no-audit --no-fund --legacy-peer-deps 2>&1 | grep -E "added|audited|vulnerabilities" || true
echo ""

# Check if installation was successful
if [ -d "node_modules" ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Dependency installation failed"
    exit 1
fi

echo ""
echo "🎨 Your portfolio hero section is ready!"
echo ""
echo "📁 Project Structure:"
echo "   ├── components/HeroSection.tsx  (Main hero component)"
echo "   ├── app/page.tsx               (Home page)"
echo "   └── app/globals.css            (Styles)"
echo ""
echo "🎯 Features Included:"
echo "   ✓ Full-screen hero section"
echo "   ✓ Dark gradient background"
echo "   ✓ Framer Motion animations"
echo "   ✓ Responsive typography"
echo "   ✓ CTA button with hover effects"
echo ""
echo "🚀 Quick Start:"
echo "   npm run dev      # Start development server"
echo "   npm run build    # Build for production"
echo "   npm start        # Run production server"
echo ""
echo "🌐 Once started, open: http://localhost:3000"
echo ""
