# Rannabati Catering — Pure Frontend (Vite + React)

A pure, standalone client-side Single Page Application (SPA) built with **Vite**, **React**, **React Router**, and **Tailwind CSS**.
- **Zero backend dependencies**: No Nitro, no SSR, no fullstack complexity.
- **Identical styling & branding**: Uses the exact OKLCH color palette, typography (Mukta & Playfair Display), components, and authentic Rannabati logo assets.
- **Includes 404 Prevention**: Preconfigured redirect rules for Netlify, Cloudflare Pages, Vercel, Apache, and static hosts so page refreshes never return 404.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
The output will be placed in the `dist/` directory, ready to deploy to any hosting provider.

---

## 🔄 Refresh 404 Fix (Redirect Configuration)

When deploying Single Page Applications (SPAs), refreshing on routes like `/menu` or `/packages` normally causes a `404 Not Found` on static hosts because the server looks for a physical file at `/menu/index.html`.

This project includes multi-layer redirect configurations:

1. **Netlify & Cloudflare Pages**:
   - `public/_redirects`: Contains `/*  /index.html  200`. Vite automatically outputs this into `dist/` on build.
2. **Vercel**:
   - `vercel.json`: Rewrites all routes to `/index.html`.
3. **Apache / cPanel / Shared Hosting**:
   - `public/.htaccess`: Standard URL rewrite rules routing all requests to `/index.html`.
4. **GitHub Pages & Static Hosts**:
   - `public/404.html`: Catches 404s and safely redirects back to `/index.html` preserving the current route.

---

## 📁 Project Structure

```
OFFERS/
├── public/
│   ├── _redirects           # Netlify & Cloudflare SPA rewrite
│   ├── .htaccess            # Apache rewrite rule
│   ├── 404.html             # Static host fallback
│   ├── favicon.png          # Site favicon
│   ├── robots.txt           # Robots file
│   └── rannabati-logo-trim.png # Direct static logo asset
├── src/
│   ├── assets/              # Images (rannabati logo, hero.jpg, thali.jpg)
│   ├── components/          # BrandLockup, BrandSeal, MenuTabs, ScrollToTop
│   ├── lib/                 # Contact info & utilities
│   ├── pages/
│   │   ├── Home.tsx         # Home feast page (About, Services, Dishes, Reviews, Contact)
│   │   ├── Menu.tsx         # Interactive "Build Your Own Menu" enquiry form
│   │   ├── Packages.tsx     # 4 Curated Menu Packages & WhatsApp booking form
│   │   └── NotFound.tsx     # Custom 404 Page
│   ├── App.tsx              # Client-side routes definition
│   ├── main.tsx             # Root mounting
│   └── styles.css           # Tailwind v4 theme, OKLCH colors & fonts
├── index.html               # Main HTML entry with Google fonts & SPA script
├── package.json             # Pure frontend scripts & dependencies
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel SPA rewrite config
└── vite.config.ts           # Vite + React configuration
```

