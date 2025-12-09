# 🚀 Quick Command Reference

This is a quick reference guide for common commands used in this project.

## 📦 Installation

```bash
# Install all frontend dependencies
npm install

# Install all functions dependencies
cd functions && npm install && cd ..

# Install Firebase CLI globally (if not installed)
npm install -g firebase-tools

# Install Angular CLI globally (if not installed)
npm install -g @angular/cli
```

## 🔧 Development

```bash
# Start Angular development server (frontend only)
npm start
# Access at: http://localhost:4200

# Start Firebase Functions emulator (backend only)
cd functions
npm run serve
# Access at: http://127.0.0.1:5001/cicd-abcd/us-central1

# Start both with Firebase emulators (recommended)
firebase emulators:start
# Frontend proxy at: http://localhost:5000
# Functions at: http://127.0.0.1:5001/cicd-abcd/us-central1
```

## 🏗️ Build

```bash
# Build frontend for production
npm run build
# Output: dist/cicd-abcd/browser/

# Build functions
cd functions
npm run build
# Output: functions/lib/

# Build both
npm run build && cd functions && npm run build && cd ..
```

## 🚀 Deployment

```bash
# Deploy everything (hosting + functions)
firebase deploy

# Deploy only frontend
firebase deploy --only hosting

# Deploy only backend functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:api

# Force deploy (skip confirmations)
firebase deploy --force
```

## 🔍 Firebase Commands

```bash
# Login to Firebase
firebase login

# Logout
firebase logout

# List your Firebase projects
firebase projects:list

# Use specific project
firebase use cicd-abcd

# Check current project
firebase use

# List deployed functions
firebase functions:list

# View function logs
firebase functions:log

# View logs for specific function
firebase functions:log --only api

# Follow logs in real-time
firebase functions:log --only api --follow

# View hosting deployments
firebase hosting:channel:list
```

## 🧪 Testing

```bash
# Run Angular tests
npm test

# Run tests in watch mode
npm test -- --watch

# Build and verify it works
npm run build
```

## 📝 Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to main (triggers production deployment)
git push origin main

# Create new feature branch
git checkout -b feature/my-feature

# Push feature branch (create PR for preview)
git push origin feature/my-feature

# Switch back to main
git checkout main

# Pull latest changes
git pull origin main
```

## 🔐 GitHub Secrets Setup

```bash
# After generating Firebase service account key:
# 1. Go to: https://github.com/SaviHera/cicd-abcd/settings/secrets/actions
# 2. Click "New repository secret"
# 3. Name: FIREBASE_SERVICE_ACCOUNT
# 4. Value: Paste entire JSON content from service account key
# 5. Click "Add secret"
```

## 🐛 Troubleshooting Commands

```bash
# Clear all node_modules and reinstall
rm -rf node_modules functions/node_modules
npm install
cd functions && npm install && cd ..

# Clear Firebase cache
firebase logout
firebase login

# Clear Angular cache
rm -rf .angular

# Clear build outputs
rm -rf dist functions/lib

# Full clean and rebuild
rm -rf node_modules functions/node_modules dist functions/lib .angular
npm install
cd functions && npm install && cd ..
npm run build
cd functions && npm run build && cd ..
```

## 🌐 URLs

### Local Development
- Frontend Dev Server: `http://localhost:4200`
- Firebase Emulator UI: `http://localhost:4000`
- Functions Emulator: `http://127.0.0.1:5001/cicd-abcd/us-central1`

### Production (after deployment)
- Frontend: `https://cicd-abcd.web.app`
- Alternate URL: `https://cicd-abcd.firebaseapp.com`
- Functions: `https://us-central1-cicd-abcd.cloudfunctions.net`

### API Endpoints (Production)
```bash
# Base URL
https://us-central1-cicd-abcd.cloudfunctions.net/api

# Example endpoints
GET  https://us-central1-cicd-abcd.cloudfunctions.net/api/hello
GET  https://us-central1-cicd-abcd.cloudfunctions.net/api/getUser?id=123
GET  https://us-central1-cicd-abcd.cloudfunctions.net/api/getData
POST https://us-central1-cicd-abcd.cloudfunctions.net/api/submitData
GET  https://us-central1-cicd-abcd.cloudfunctions.net/api/health
```

## 🧪 Testing API Endpoints

```bash
# Test hello endpoint
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/hello

# Test with user ID
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/getUser?id=123

# Test getData
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/getData

# Test POST endpoint
curl -X POST https://us-central1-cicd-abcd.cloudfunctions.net/api/submitData \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","message":"Test message"}'

# Test health endpoint
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/health
```

## 📊 Monitoring

```bash
# Open Firebase Console
open https://console.firebase.google.com/project/cicd-abcd

# Open GitHub Actions
open https://github.com/SaviHera/cicd-abcd/actions

# View real-time function logs
firebase functions:log --only api --follow

# View hosting deployment history
firebase hosting:channel:list
```

## 🔄 CI/CD Pipeline

### Trigger Production Deployment
```bash
git add .
git commit -m "Update app"
git push origin main
# Automatically deploys to production
```

### Trigger PR Preview
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create PR on GitHub - preview will be auto-deployed
```

## 📚 Useful Links

- Firebase Console: https://console.firebase.google.com/project/cicd-abcd
- GitHub Repo: https://github.com/SaviHera/cicd-abcd
- GitHub Actions: https://github.com/SaviHera/cicd-abcd/actions
- Angular Docs: https://angular.io/docs
- Firebase Docs: https://firebase.google.com/docs

---

**💡 Pro Tip:** Bookmark this file for quick reference!

