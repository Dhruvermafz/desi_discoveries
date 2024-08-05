#!/bin/bash
set -e

# Navigate to the backend directory and install dependencies
cd backend
npm install
# Build or start your backend application
npm run build

# Navigate to the frontend directory and install dependencies
cd ../frontend
npm install
# Build the frontend application
npm run build

# Move the built frontend files to the public directory
rm -rf /path/to/hostinger/public_html/*
cp -R build/* /path/to/hostinger/public_html/

echo "Deployment finished successfully!"
