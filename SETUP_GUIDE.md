# 📖 Complete Setup Guide for CICD-ABCD

This guide will walk you through setting up the entire CI/CD pipeline from scratch.

## 🎯 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js (v20 or v22) installed
- [ ] npm installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Firebase account (Google account)
- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Angular CLI installed: `npm install -g @angular/cli`

## 📋 Step-by-Step Setup

### Step 1: Firebase Project Setup

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Click "Add project" or select existing project "cicd-abcd"

2. **Enable Required Services**
   - Navigate to **Build** → **Functions** → Enable Cloud Functions
   - Navigate to **Build** → **Hosting** → Get started

3. **Upgrade to Blaze Plan** (Required for Cloud Functions)
   - Go to **Upgrade** in the left sidebar
   - Select the **Blaze (Pay as you go)** plan
   - Note: Firebase has generous free tiers, so costs are minimal for development

### Step 2: Generate Firebase Service Account Key

1. **Open Firebase Project Settings**
   - Click the gear icon (⚙️) → Project settings

2. **Navigate to Service Accounts**
   - Click the "Service accounts" tab

3. **Generate New Private Key**
   - Click "Generate new private key"
   - Click "Generate key" in the confirmation dialog
   - A JSON file will be downloaded - **Keep this secure!**

4. **Copy the JSON Content**
   - Open the downloaded JSON file
   - Copy the entire content

### Step 3: GitHub Repository Setup

1. **Create/Access Repository**
   - Go to: https://github.com/SaviHera/cicd-abcd
   - If not created, click "New repository"
   - Repository name: `cicd-abcd`
   - Make it Public or Private (your choice)

2. **Add Firebase Service Account Secret**
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the entire JSON content from Step 2
   - Click "Add secret"

### Step 4: Clone and Install

```bash
# Clone the repository
git clone https://github.com/SaviHera/cicd-abcd.git
cd cicd-abcd

# Install frontend dependencies
npm install

# Install functions dependencies
cd functions
npm install
cd ..

# Login to Firebase
firebase login

# Verify project connection
firebase projects:list
```

### Step 5: Verify Firebase Configuration

Check that `.firebaserc` contains:

```json
{
  "projects": {
    "default": "cicd-abcd"
  }
}
```

If not, run:

```bash
firebase use cicd-abcd
```

### Step 6: Test Locally

```bash
# Terminal 1 - Start Firebase Emulators
firebase emulators:start

# Terminal 2 - Start Angular Dev Server
npm start
```

Visit `http://localhost:4200` to see the app.

### Step 7: First Deployment

#### Option A: Manual Deployment (Recommended for first time)

```bash
# Build the frontend
npm run build

# Build the functions
cd functions
npm run build
cd ..

# Deploy everything
firebase deploy
```

After deployment, you'll see:
- **Hosting URL:** `https://cicd-abcd.web.app`
- **Functions URL:** `https://us-central1-cicd-abcd.cloudfunctions.net`

#### Option B: GitHub Actions Deployment

```bash
# Push to master branch
git add .
git commit -m "Initial deployment"
git push origin master
```

The GitHub Action will automatically deploy to Firebase.

### Step 8: Verify Deployment

1. **Check Frontend**
   - Visit: `https://cicd-abcd.web.app`
   - You should see the Angular app

2. **Test Backend Endpoints**
   ```bash
   # Test hello endpoint
   curl https://us-central1-cicd-abcd.cloudfunctions.net/api/hello
   
   # Or visit in browser:
   # https://us-central1-cicd-abcd.cloudfunctions.net/api/hello
   ```

3. **Check GitHub Actions**
   - Go to repository → Actions tab
   - Verify the workflow completed successfully

### Step 9: Test PR Preview (Optional)

```bash
# Create a new branch
git checkout -b feature/test-preview

# Make a small change (e.g., edit src/app/app.component.html)

# Commit and push
git add .
git commit -m "Test PR preview"
git push origin feature/test-preview

# Create Pull Request on GitHub
```

The GitHub Action will create a preview deployment and comment on the PR with the preview URL.

## 🔧 Configuration Details

### Frontend Configuration

Update `src/environments/environment.prod.ts` if needed:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://us-central1-cicd-abcd.cloudfunctions.net'
};
```

### Backend Configuration

The backend is in `functions/src/index.ts`. All endpoints are exported through the `api` function.

To access endpoints in production:
- Base URL: `https://us-central1-cicd-abcd.cloudfunctions.net/api`
- Example: `https://us-central1-cicd-abcd.cloudfunctions.net/api/hello`

## 🐛 Common Issues & Solutions

### Issue 1: "Permission denied" during Firebase deploy

**Solution:**
```bash
firebase login --reauth
firebase use cicd-abcd
```

### Issue 2: GitHub Action fails with "unauthorized"

**Solution:**
- Verify `FIREBASE_SERVICE_ACCOUNT` secret is properly set
- Make sure the JSON is complete and valid
- Check that the service account has necessary permissions

### Issue 3: Functions not accessible after deployment

**Solution:**
```bash
# Check if functions are deployed
firebase functions:list

# Check function logs
firebase functions:log --only api

# Verify the functions region matches
# It should be us-central1 (default)
```

### Issue 4: CORS errors when calling functions

**Solution:**
The functions are already configured with CORS. If issues persist:
- Clear browser cache
- Check network tab in browser DevTools
- Verify the function URL is correct in environment files

### Issue 5: Build fails in GitHub Actions

**Solution:**
- Check Node.js version (should be 22)
- Verify all dependencies are in package.json
- Check the Actions log for specific errors
- Try building locally first: `npm run build`

### Issue 6: PR Preview not working

**Solution:**
- Ensure `FIREBASE_SERVICE_ACCOUNT` secret is set
- Verify the Firebase project has Hosting enabled
- Check that the workflow has proper permissions (check `permissions:` in deploy.yml)

## 📊 Monitoring & Logs

### View Deployment Status

**Firebase Console:**
- Hosting: https://console.firebase.google.com/project/cicd-abcd/hosting
- Functions: https://console.firebase.google.com/project/cicd-abcd/functions

**GitHub Actions:**
- Actions tab: https://github.com/SaviHera/cicd-abcd/actions

### View Function Logs

```bash
# Real-time logs
firebase functions:log --only api --follow

# Recent logs
firebase functions:log --only api --limit 50
```

### Check Function Usage

```bash
# List all deployed functions
firebase functions:list

# Get function details
firebase functions:config:get
```

## 🎉 Success Checklist

Once everything is set up, you should have:

- [ ] Firebase project "cicd-abcd" configured
- [ ] GitHub repository with code
- [ ] `FIREBASE_SERVICE_ACCOUNT` secret added to GitHub
- [ ] Local development working (frontend + functions)
- [ ] Manual deployment successful
- [ ] GitHub Actions workflow working
- [ ] Frontend accessible at: `https://cicd-abcd.web.app`
- [ ] Backend APIs responding at: `https://us-central1-cicd-abcd.cloudfunctions.net/api/*`
- [ ] PR previews working (optional)

## 🚀 Next Steps

Now that everything is set up:

1. **Customize the App**
   - Modify the Angular components in `src/app/`
   - Add new backend endpoints in `functions/src/index.ts`

2. **Add More Features**
   - Implement Firebase Authentication
   - Add Firestore database integration
   - Create more Cloud Functions

3. **Enhance CI/CD**
   - Add automated tests
   - Add code quality checks (ESLint, Prettier)
   - Add deployment notifications (Slack, Discord, etc.)

4. **Monitor Performance**
   - Set up Firebase Performance Monitoring
   - Enable Cloud Logging
   - Configure alerts for errors

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

---

**Need Help?** Open an issue on GitHub or check the troubleshooting section above.

