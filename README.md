# PT Studio 7 Amsterdam - React Website

Modern, maintainable React website for PT Studio 7 Amsterdam, built with TypeScript and Vite.

## 🚀 Features

- **React + TypeScript**: Type-safe, component-based architecture
- **React Router**: Client-side routing for seamless navigation
- **SEO Optimized**: Dynamic meta tags and structured content
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, professional design with brand colors
- **No Code Duplication**: Reusable components (Navbar, Footer, SEO Head)
- **Analytics Ready**: Google Analytics & Tag Manager integrated
- **MindBody Integration**: Embedded widgets for booking

## 📦 Pages

1. **Home** (`/`) - Video hero, about, workouts, trainers, reviews, contact
2. **Pricing** (`/pricing`) - Membership, group classes, private lessons, couples
3. **Schedule** (`/schedule`) - Book group classes or private sessions with MindBody widgets
4. **Equipment** (`/equipment`) - Showcase of Pilates equipment
5. **Congrats** (`/congrats`) - Booking confirmation page

## 🛠️ Development

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
cd ptstudio7-react
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Output in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment to GitHub Pages

### Option 1: Manual Deployment
```bash
npm run build
npm run deploy
```

### Option 2: GitHub Actions (Recommended)

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Set Source to "GitHub Actions"
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

5. Push changes and GitHub will auto-deploy on every push to main

### Update Base URL

In `vite.config.ts`, update the `base` to match your GitHub repository name:
```typescript
base: '/your-repo-name/',
```

If using a custom domain (like `isonka.github.io`), set:
```typescript
base: '/',
```

## 📁 Project Structure

```
ptstudio7-react/
├── public/
│   └── assets/          # Images, videos, fonts
├── src/
│   ├── components/      # Reusable components (Navbar, Footer, SEOHead)
│   ├── pages/           # Page components (Home, Pricing, Schedule, etc.)
│   ├── styles/          # CSS files per component/page
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── index.html           # HTML template with analytics
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Key Components

### SEOHead
Dynamic SEO meta tags component used on every page
```tsx
<SEOHead
  title="Page Title"
  description="Page description"
  keywords="keywords, here"
  canonical="https://www.ptstudio7amsterdam.nl/page"
/>
```

### Navbar
Sticky navigation with mobile menu and "Book Now" button

### Footer
Simple footer with links and copyright

## 📝 Content Updates

### Update Pricing
Edit `src/pages/Pricing.tsx` - Update prices, packages, MindBody links

### Update Trainers
Edit `src/pages/Home.tsx` - Update trainer images and info in trainers section

### Update Equipment
Edit `src/pages/Equipment.tsx` - Add/remove equipment items

### Update Schedule Info
Edit `src/pages/Schedule.tsx` - Update class duration, group size, etc.

## 🔗 MindBody Widget IDs

- Group Classes (Schedules): `2b9312c036`
- Private Lessons (Appointments): `2b18450c036`

## 🎯 Brand Colors

- Primary Gold: `#ffd700`
- Accent Gold: `#e5c100`
- Dark Background: `#1a1a1a` / `#111`
- Text: `#333`

## 🆘 Support

For questions or issues:
- Email: info@ptstudio7amsterdam.nl
- Location: Van Baerlestraat 76C, 1071BB Amsterdam

---

Built with ❤️ using React, TypeScript, and Vite
