# Portfolio Hero Section ⚡

A modern, animated hero section component built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start (Auto Setup - No Prompts!)

```bash
# Clone/download this project, then:
npm run setup && npm run dev
```

**That's it!** Open [http://localhost:3000](http://localhost:3000) 🎉

Everything installs automatically - no confirmations needed!

---

## ✨ Features

**Modern Design**
- ✓ Full-screen height hero section
- ✓ Dark gradient background (gray → purple)
- ✓ Subtle pattern overlay for depth
- ✓ Customizable via props

**Typography**
- ✓ Bold, large responsive headings
- ✓ Gradient text effects (purple ↔ pink)
- ✓ Clean subtitle text
- ✓ Fully responsive (mobile → desktop)

**Animations**
- ✓ Smooth fade-in and slide-up on load
- ✓ Staggered timing for elements
- ✓ Button hover effects (scale + glow)
- ✓ Animated scroll indicator

**Interactive**
- ✓ Customizable CTA button
- ✓ Smooth scroll functionality
- ✓ Accessibility support
- ✓ Custom click handlers

---

## 📦 Tech Stack

- **Next.js 15** - React framework (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Auto-configured** - Zero manual setup

---

## 📖 Usage

### Basic

```tsx
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return <HeroSection />;
}
```

### Customized

```tsx
<HeroSection
  name="Hello, I'm"
  title1="Your Name"
  title2="Your Title"
  subtitle="Your amazing tagline goes here"
  buttonText="Contact Me"
  onButtonClick={() => window.location.href = '/contact'}
/>
```

### Props API

```typescript
interface HeroSectionProps {
  name?: string;              // Top text (default: "Hi, I'm a")
  title1?: string;            // First gradient title (default: "Developer")
  title2?: string;            // Second gradient title (default: "& Designer")
  subtitle?: string;          // Subtitle text
  buttonText?: string;        // CTA button text (default: "View My Work")
  onButtonClick?: () => void; // Custom click handler
}
```

---

## 🛠 Available Commands

| Command | What it does |
|---------|--------------|
| `npm run setup` | 🔧 Auto-install everything (no prompts!) |
| `npm run dev` | 🚀 Start dev server (hot reload) |
| `npm run build` | 📦 Build for production |
| `npm start` | ▶️  Run production build |
| `npm run fresh` | 🔄 Clean install from scratch |
| `npm run clean` | 🧹 Remove build artifacts |
| `npm run lint` | ✅ Run ESLint |

---

## 🎨 Customization

### Change Colors

Edit `components/HeroSection.tsx`:

```tsx
// Background gradient
className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"

// Text gradients
className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text"
className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text"

// Button
className="bg-gradient-to-r from-purple-500 to-pink-600"
```

### Adjust Animations

Modify Framer Motion transitions:

```tsx
// Faster animation
transition={{ duration: 0.5, delay: 0.1 }}

// Slower animation  
transition={{ duration: 1.2, delay: 0.3 }}

// Different easing
transition={{ ease: "easeInOut" }}
```

### Responsive Breakpoints

Uses Tailwind's default breakpoints:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up

---

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── HeroSection.tsx    # ⭐ Hero component
├── .npmrc                 # Auto-accept npm prompts
├── setup.sh               # Auto setup script
├── package.json           # Dependencies
└── README.md             # This file
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the .next folder
```

### Other Platforms

Build the project:
```bash
npm run build
```

Deploy the generated `.next` folder.

---

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
npx kill-port 3000
npm run dev
```

**Dependencies not installing?**
```bash
npm run fresh
```

**TypeScript errors?**
```bash
rm -rf .next
npm run dev
```

**Still having issues?**
```bash
npm run clean
npm run setup
npm run dev
```

---

## 📄 License

MIT - Feel free to use this in your projects!

---

## 🌟 Star This Project

If you found this helpful, give it a star! ⭐

Built with ❤️ using Next.js + Framer Motion
