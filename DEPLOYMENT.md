# Deployment Guide - PT Studio 7 React Website

## 🎯 Quick Deploy to GitHub Pages

### Step 1: Update Repository Name in Config

In `vite.config.ts`, update the base path:

```typescript
base: '/isonka.github.io/',  // Your GitHub repo name
```

**Important**: If you're using a custom domain or username.github.io as the main site, use:
```typescript
base: '/',
```

### Step 2: Push to GitHub

```bash
cd /Users/okarsl/Desktop/ptstudio7-react

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - React rebuild"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/isonka.github.io.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. The workflow will automatically run on push!

### Step 4: Check Deployment

- Go to **Actions** tab in your repository
- Watch the "Deploy to GitHub Pages" workflow run
- Once complete (green checkmark), visit:
  - `https://YOUR_USERNAME.github.io` (if using root)
  - `https://YOUR_USERNAME.github.io/REPO_NAME` (if using subdirectory)

## 🔄 Making Updates

After initial deployment, any push to `main` branch will automatically rebuild and redeploy:

```bash
# Make your changes
git add .
git commit -m "Updated pricing/content/etc"
git push
```

## 🧪 Test Locally Before Deploying

```bash
# Development server (hot reload)
npm run dev
# Open http://localhost:5173

# Production build test
npm run build
npm run preview
# Open http://localhost:4173
```

## 📝 Common Updates

### Update Prices
- Edit `src/pages/Pricing.tsx`
- Update amounts and MindBody links
- Git commit + push

### Update Trainers/Content
- Edit `src/pages/Home.tsx`
- Update images in `public/assets/images/`
- Git commit + push

### Update Schedule Info
- Edit `src/pages/Schedule.tsx`
- Update class duration, group size, etc.
- Git commit + push

### Update MindBody Widget IDs
- Edit widget IDs in `src/pages/Schedule.tsx`:
  ```tsx
  data-widget-id="YOUR_NEW_ID"
  ```

## 🚨 Troubleshooting

### Pages Show 404 Errors
- Check `vite.config.ts` base path matches your repository
- If using custom domain, base should be `/`
- If using username.github.io directly (no subdirectory), base should be `/`

### Assets Not Loading
- Ensure all assets are in `public/` folder
- Check asset paths start with `/assets/...`
- Build and check `dist/` folder structure

### Build Fails on GitHub Actions
- Check Node.js version (currently 18)
- Look at Actions tab > workflow run > logs
- Test build locally: `npm run build`

### Old Site Still Showing
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Wait 5-10 minutes for GitHub Pages cache to clear
- Check if workflow completed successfully in Actions tab

## 🎨 Customization

### Update Brand Colors
Edit variables in `src/App.css`:
```css
:root {
  --primary-color: #ffd700;  /* Your brand color */
  --accent-color: #e5c100;
  --text-color: #333;
}
```

### Update Analytics IDs
Edit `index.html`:
- Google Analytics: `G-J7K4DF0N40`
- Google Tag Manager: `GTM-KB25PGXB`
- Cookiebot: `b7046d56-8fa7-4aff-9789-7c95656f78f5`

## 📦 Project Structure Recap

```
ptstudio7-react/
├── .github/workflows/deploy.yml  ← Auto-deployment config
├── public/assets/                ← Images, videos, fonts
├── src/
│   ├── components/               ← Navbar, Footer, SEOHead
│   ├── pages/                    ← Home, Pricing, Schedule, etc.
│   ├── styles/                   ← CSS per component
│   └── App.tsx                   ← Routing setup
├── vite.config.ts                ← Build config (UPDATE BASE!)
└── package.json                  ← Dependencies & scripts
```

## ✅ Pre-Deployment Checklist

- [ ] Updated `vite.config.ts` base path
- [ ] Tested locally with `npm run dev`
- [ ] Tested production build with `npm run build && npm run preview`
- [ ] All images/assets are in `public/assets/`
- [ ] Analytics tracking codes are correct
- [ ] MindBody widget IDs are correct
- [ ] All links work (especially pricing/schedule)
- [ ] Mobile responsive (test at different screen sizes)
- [ ] SEO meta tags are correct for each page

## 🌟 Next Steps After Deployment

1. **Test all pages and links**
2. **Book a test class** through the schedule page
3. **Check mobile/tablet views**
4. **Test all MindBody widgets** work correctly
5. **Monitor Google Analytics** for traffic
6. **Submit to Google Search Console** for SEO

---

Need help? Contact info@ptstudio7amsterdam.nl

