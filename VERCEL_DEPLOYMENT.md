# Deploying Ocean Peace Cardiothoracic Surgery to Vercel

Your Git repository is initialized and configured with `vercel.json` for Vercel deployment.

---

## Method 1: Deploy via GitHub (Recommended - Automatic Continuous Deployment)

### Step 1: Push Local Repository to GitHub
Run the following commands in your terminal (replace `YOUR_GITHUB_USERNAME` with your username):

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ocean-peace-surgery.git
git push -u origin main
```

*(If you haven't created the repository on GitHub yet, go to [github.com/new](https://github.com/new) and create a repository named `ocean-peace-surgery`)*

### Step 2: Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
2. Click **Import** next to `ocean-peace-surgery`.
3. Vercel will automatically detect **Vite** and configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

Your website will be live in ~30 seconds with a free `.vercel.app` domain and free SSL certificate! Every future `git push` will auto-deploy updates.

---

## Method 2: Deploy directly from Terminal (Vercel CLI)

In your project directory terminal, run:

```bash
npx vercel
```

- Follow the prompts to log in / link your Vercel account.
- Accept the default settings.
- For production deployment, run:
  ```bash
  npx vercel --prod
  ```

---

## Custom Domain Setup (Optional)
In your Vercel Dashboard:
Go to **Project Settings** → **Domains** → Add your domain (e.g. `oceanpeacecardio.com`) and follow the simple DNS A/CNAME instructions provided by Vercel.
