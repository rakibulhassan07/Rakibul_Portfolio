# Portfolio Project

## Project Structure

Portfolio
- app
  - layout.tsx
  - page.tsx
  - globals.css
  - admin
    - page.tsx
- components
  - About.tsx
  - Academic.tsx
  - Contact.tsx
  - HeroSection.tsx
  - Navbar.tsx
  - Projects.tsx
  - Skills.tsx
  - Vlog.tsx
  - VlogCard.tsx
  - VlogSection.tsx
  - LoadingScreen.tsx
  - SplashScreen.tsx
  - AnimatedBackground.tsx
  - CinematicText.tsx
  - AdvancedCinematicText.tsx
  - ScrollWeightText.tsx
  - CustomCursor.tsx
- public
  - vlog
  - icon-rounded.svg
- types
  - vlog.ts
- package.json
- tsconfig.json
- tailwind.config.ts
- next.config.ts
- README.md

## Local PC Setup

1. Install Node.js 18 or newer on your PC.
2. Clone or download this project.
3. Open the project folder in VS Code.
4. Open a terminal in the project root folder.
5. Install dependencies with npm install.
6. Start development server with npm run dev.
7. Open http://localhost:3000 in your browser.

If the port is busy, stop the other process using that port and run npm run dev again.

## Environment Variables

Add these values in your local `.env.local` file:

```bash
BLOG_ADMIN_PASSWORD=your-admin-password
IMGBB_API_KEY=your-imgbb-api-key
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
```

The admin panel drag-and-drop image uploader uses `NEXT_PUBLIC_IMGBB_API_KEY` in the browser to upload directly to ImgBB and auto-fills image URLs after upload.
