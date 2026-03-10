# How to Deploy NutriFlow AI to Netlify

You can deploy this application to Netlify in two main ways.

## CRITICAL: BEFORE YOU START

**If you use Google Sign-In, you MUST do this step or it will FAIL on Netlify.**

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Go to **Authentication** > **Settings** > **Authorized domains**.
3.  Click **Add domain**.
4.  Enter your new Netlify domain (e.g., `nutriflow-ai.netlify.app`).
5.  Click **Add**.

---

## Option 1: Git Integration (Recommended)
This is the best way as it will automatically redeploy whenever you push changes to your code.

1.  **Push your code to GitHub.** (If you haven't already).
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** > **"Import an existing project"**.
4.  Select **GitHub**.
5.  Choose your `nutriflow-ai` repository.
6.  **Verify Settings:**
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
7.  **Environment Variables (CRITICAL):**
    *   Click on **"Advanced"** or go to **Site settings > Environment variables** after setting up.
    *   You MUST add the same variables from your `.env.local` file here:
        *   `VITE_FIREBASE_API_KEY`
        *   `VITE_FIREBASE_AUTH_DOMAIN`
        *   `VITE_FIREBASE_PROJECT_ID`
        *   `VITE_FIREBASE_STORAGE_BUCKET`
        *   `VITE_FIREBASE_MESSAGING_SENDER_ID`
        *   `VITE_FIREBASE_APP_ID`
        *   `VITE_FIREBASE_DATABASE_URL`
        *   `VITE_GEMINI_API_KEY`
8.  Click **Deploy**.

## Option 2: Manual Drag & Drop
Good for a quick test if you don't want to use Git.

1.  Open your terminal in the project folder.
2.  Run the build command:
    ```bash
    npm run build
    ```
    *(Make sure your `.env.local` file exists before running this!)*
3.  This will create a `dist` folder in your project directory.
4.  Log in to [Netlify Drop](https://app.netlify.com/drop).
5.  Drag and drop the **`dist`** folder into the browser window.
