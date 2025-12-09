# 🚀 CICD-ABCD - Firebase CI/CD Demo App

A sample Angular application with Firebase Cloud Functions backend, demonstrating automated CI/CD deployment using GitHub Actions.

## 📋 Overview

This project showcases a complete CI/CD pipeline for deploying an Angular frontend and Firebase Cloud Functions backend to Firebase Hosting and Cloud Functions, with:

- ✅ **Angular 18 Frontend** with modern standalone components
- ✅ **Firebase Cloud Functions Backend** with Express.js
- ✅ **GitHub Actions CI/CD** for automated deployments
- ✅ **Production Deployments** on push to main branch
- ✅ **PR Preview Environments** for pull requests (7-day expiry)

## 🏗️ Project Structure

```
cicd-abcd/
├── src/                          # Angular frontend source
│   ├── app/
│   │   ├── app.component.ts     # Main app component
│   │   ├── app.component.html   # App template
│   │   └── app.config.ts        # App configuration
│   ├── environments/             # Environment configs
│   ├── main.ts                   # Bootstrap file
│   └── index.html                # HTML entry point
├── functions/                    # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts             # Backend endpoints
│   ├── package.json             # Functions dependencies
│   └── tsconfig.json            # TypeScript config
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline
├── firebase.json                 # Firebase configuration
├── .firebaserc                   # Firebase project config
├── angular.json                  # Angular CLI config
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or v22)
- **npm** (comes with Node.js)
- **Firebase CLI** - Install globally: `npm install -g firebase-tools`
- **Angular CLI** - Install globally: `npm install -g @angular/cli`
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SaviHera/cicd-abcd.git
cd cicd-abcd
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install functions dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Setup

```bash
# Login to Firebase
firebase login

# Verify the project
firebase projects:list

# The project is already configured as: cicd-abcd
```

### 4. Local Development

#### Run Frontend Locally

```bash
npm start
# App will run at http://localhost:4200
```

#### Run Firebase Functions Locally

```bash
cd functions
npm run serve
# Functions will run at http://localhost:5001/cicd-abcd/us-central1
```

#### Run Both with Firebase Emulators

```bash
firebase emulators:start
```

### 5. Build the Project

```bash
# Build frontend
npm run build

# Build functions
cd functions
npm run build
cd ..
```

## 📡 Backend API Endpoints

The Firebase Cloud Functions provide the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hello` | Basic greeting endpoint |
| GET | `/getUser?id=123` | Fetch user data by ID |
| GET | `/getData` | Get sample data array |
| POST | `/submitData` | Submit form data |
| GET | `/health` | Health check endpoint |

### Example API Usage

**Production URL:** `https://us-central1-cicd-abcd.cloudfunctions.net`

```bash
# Test hello endpoint
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/hello

# Test getUser endpoint
curl https://us-central1-cicd-abcd.cloudfunctions.net/api/getUser?id=123

# Test submitData endpoint
curl -X POST https://us-central1-cicd-abcd.cloudfunctions.net/api/submitData \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

### On Push to Main Branch:
1. Checks out the code
2. Sets up Node.js v22
3. Installs frontend dependencies
4. Builds the Angular app
5. Installs functions dependencies
6. Deploys to Firebase Production (Hosting + Functions)

### On Pull Request:
1. Performs the same build steps
2. Deploys to a temporary Firebase Preview Channel
3. Comments on the PR with the preview URL
4. Preview expires after 7 days

## 🔐 Required GitHub Secrets

To enable automated deployments, add the following secret to your GitHub repository:

### `FIREBASE_SERVICE_ACCOUNT`

This is a JSON service account key from Firebase.

#### How to Generate:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **cicd-abcd**
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Copy the entire JSON content
7. In GitHub: Go to **Settings** → **Secrets and variables** → **Actions**
8. Click **New repository secret**
9. Name: `FIREBASE_SERVICE_ACCOUNT`
10. Value: Paste the entire JSON content
11. Click **Add secret**

## 📦 Deployment

### Manual Deployment

```bash
# Deploy everything
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:api
```

### Automatic Deployment via GitHub Actions

Simply push to the `main` branch or create a pull request:

```bash
# For production deployment
git add .
git commit -m "Your changes"
git push origin main

# For PR preview
git checkout -b feature/my-feature
git add .
git commit -m "Add new feature"
git push origin feature/my-feature
# Then create a PR on GitHub
```

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Build and verify
npm run build

# Test functions locally
cd functions
npm run serve
```

## 📝 Environment Configuration

### Development
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:5001/cicd-abcd/us-central1`

### Production
- Frontend: `https://cicd-abcd.web.app` or `https://cicd-abcd.firebaseapp.com`
- Backend: `https://us-central1-cicd-abcd.cloudfunctions.net`

Environment files:
- `src/environments/environment.ts` - Development config
- `src/environments/environment.prod.ts` - Production config

## 🔍 Monitoring & Logs

### View Firebase Logs

```bash
# View all logs
firebase functions:log

# View logs for specific function
firebase functions:log --only api

# Follow logs in real-time
firebase functions:log --only api --follow
```

### GitHub Actions Logs

- Go to your repository on GitHub
- Click the **Actions** tab
- Select a workflow run to view logs

## 🛠️ Troubleshooting

### Build Fails

```bash
# Clear caches and reinstall
rm -rf node_modules dist functions/node_modules functions/lib
npm install
cd functions && npm install
```

### Functions Not Working

```bash
# Check Firebase project
firebase use

# Verify functions are deployed
firebase functions:list

# Check function logs
firebase functions:log --only api
```

### CORS Issues

The functions are already configured with CORS enabled. If you face CORS issues:
- Check the `functions/src/index.ts` file
- Ensure `cors({origin: true})` is properly configured

## 📚 Tech Stack

- **Frontend:** Angular 18, TypeScript, RxJS
- **Backend:** Firebase Cloud Functions, Express.js, TypeScript
- **Hosting:** Firebase Hosting
- **CI/CD:** GitHub Actions
- **Build Tools:** Angular CLI, TypeScript Compiler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Repository:** [https://github.com/SaviHera/cicd-abcd](https://github.com/SaviHera/cicd-abcd)
- **Firebase Project:** cicd-abcd
- **Live Demo:** Will be available after first deployment

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Firebase Documentation](https://firebase.google.com/docs)
3. Check [Angular Documentation](https://angular.io/docs)
4. Open an issue on GitHub

---

**Happy Deploying! 🚀**

