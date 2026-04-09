# One-Command Install & Run

## Automatic Setup (No Prompts)

```bash
# Clone or download this project, then run:
npm run setup
npm run dev
```

That's it! Open http://localhost:3000 🚀

---

## Manual Commands

```bash
# Fresh install (clears everything and reinstalls)
npm run fresh

# Development
npm run dev

# Production build
npm run build
npm start

# Clean build artifacts
npm run clean
```

---

## What's Included

✨ **Modern Hero Section** with:
- Full-screen height
- Dark gradient background (gray → purple)
- Bold responsive headings with gradient text
- Smooth fade-in + slide-up animations (Framer Motion)
- "View My Work" CTA button
- Animated scroll indicator

📦 **Tech Stack**:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Auto-configured build pipeline

🎯 **Pre-configured**:
- No manual prompts during install
- Hot reload enabled
- TypeScript strict mode
- ESLint ready
- Production-optimized builds

---

## File Structure

```
Portfolio/
├── app/
│   ├── page.tsx           # Home page with HeroSection
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles + Tailwind
├── components/
│   └── HeroSection.tsx    # 🌟 Main hero component
├── .npmrc                 # Auto-accept npm prompts
├── setup.sh               # Automated setup script
└── package.json           # Dependencies + scripts
```

---

## Customization

### Change Text
Edit `components/HeroSection.tsx`:
```tsx
<h1>Your Name</h1>
<p>Your tagline</p>
```

### Change Colors
Modify gradient classes:
```tsx
// Background
className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"

// Text
className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text"
```

### Adjust Animations
Edit Framer Motion props:
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay: 0.2 }}
```

---

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Need a fresh start?**
```bash
npm run fresh
```

**Dependencies issues?**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## Deploy

**Vercel** (Recommended):
```bash
npm i -g vercel
vercel
```

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

---

Made with ❤️ using Next.js + Framer Motion
