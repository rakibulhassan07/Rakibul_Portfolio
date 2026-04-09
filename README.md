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

## Azure Hosting (Dynamic Web App)

This project is configured for dynamic hosting on Azure App Service (Node.js), not Azure Static Web Apps.

1. Build command: npm run build
2. Startup command: npm run start:azure
3. Runtime stack: Node.js 20 LTS
4. Hosting target: Azure App Service (Linux recommended)

### Required App Settings (Environment Variables)

Add these in Azure App Service -> Configuration -> Application settings:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
- BLOG_ADMIN_PASSWORD
- SUPABASE_SERVICE_ROLE_KEY (optional if your RLS policies allow anon write)

### Deploy Notes

- The app uses Next.js standalone output for production.
- After deploy, restart the App Service once to apply environment variables.
