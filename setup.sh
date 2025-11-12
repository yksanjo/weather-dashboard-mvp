#!/bin/bash

echo "🌤️  Setting up Weather Dashboard MVP..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "⚠️  Don't forget to:"
echo "  1. Get a free API key from https://openweathermap.org/api"
echo "  2. Copy server/.env.example to server/.env"
echo "  3. Add your API key to server/.env"
echo ""
echo "To start the application, run:"
echo "  npm run dev"

