# Clone Wars Checklist

A no-filler episode checklist for Star Wars: The Clone Wars with progress saved to localStorage.

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a new repo on GitHub named `clone-wars-checklist`
2. In `vite.config.js`, make sure `base` matches your repo name:
   ```js
   base: '/clone-wars-checklist/',
   ```
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/clone-wars-checklist.git
   git push -u origin main
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. In your GitHub repo → Settings → Pages → set source to `gh-pages` branch

Your site will be live at: `https://YOUR_USERNAME.github.io/clone-wars-checklist/`
