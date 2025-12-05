# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the LegalHub frontend.

## Prerequisites

1. A Firebase project (create one at https://console.firebase.google.com/)
2. Firebase Authentication enabled in your Firebase project
3. Email/Password and Google sign-in methods enabled

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Enable **Google** provider:
   - Click on Google
   - Enable it
   - Add your project's support email
   - Save

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click on the Web icon (`</>`) to add a web app
4. Register your app (give it a nickname)
5. Copy the Firebase configuration object

## Step 4: Set Environment Variables

1. Create a `.env.local` file in the `nextjs-app/` directory (if it doesn't exist)
2. Add your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Backend API
NEXT_PUBLIC_API_BASE_URL=https://legalhub-xwht.onrender.com/api
```

3. Replace all placeholder values with your actual Firebase config values

## Step 5: Install Dependencies

Run the following command in the `nextjs-app/` directory:

```bash
npm install
```

This will install Firebase and other dependencies.

## Step 6: Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`
3. Try signing up with email/password
4. Try signing in with Google

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure all environment variables are set correctly
- Restart the dev server after adding environment variables

### "Firebase: Error (auth/unauthorized-domain)"
- Go to Firebase Console > Authentication > Settings
- Add your domain to "Authorized domains"

### Google Sign-in not working
- Make sure Google provider is enabled in Firebase Console
- Check that OAuth consent screen is configured in Google Cloud Console
- Add your domain to authorized domains

## Security Notes

- Never commit `.env.local` to version control
- The `.env.example` file is safe to commit (it contains no secrets)
- Firebase API keys are safe to expose in client-side code (they're public)
- Real security is enforced by Firebase Security Rules

## Next Steps

After setting up Firebase:
1. Configure Firebase Security Rules for Firestore (if using)
2. Set up Firebase Storage rules (if using file uploads)
3. Configure authorized domains for production
4. Set up custom domain (optional)

## Backend Integration

The frontend is configured to send Firebase ID tokens to your backend at:
`https://legalhub-xwht.onrender.com/api`

Your backend should verify these tokens using the Firebase Admin SDK.

