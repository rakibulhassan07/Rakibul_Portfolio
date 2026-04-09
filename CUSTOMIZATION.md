# Portfolio Customization Guide

## 🎨 How to Customize Each Section

### 1. Hero Section (`components/HeroSection.tsx`)

**Change the text:**
```tsx
<HeroSection
  name="Hello, I'm"
  title1="Your Name"
  title2="Your Title"
  subtitle="Your tagline here"
  buttonText="Get In Touch"
/>
```

**Change colors:**
- Line 38-40: Background gradient
- Line 55-57: Title gradients

---

### 2. About Section (`components/About.tsx`)

**Update your intro:**
- Lines 22-44: Edit the three paragraphs

**Update stats:**
- Lines 49-68: Change numbers and labels
  ```tsx
  <div className="text-3xl">10+</div>
  <div className="text-sm">Years Experience</div>
  ```

---

### 3. Academic Background (`components/Academic.tsx`)

**Add your education:**
- Lines 7-24: Edit the `education` array

Example:
```tsx
{
  degree: "Your Degree",
  institution: "Your University",
  period: "2020 - 2024",
  description: "Your description",
  achievements: ["Achievement 1", "Achievement 2"],
}
```

**Add certifications:**
- Lines 26-31: Edit the `certifications` array

---

### 4. Skills Section (`components/Skills.tsx`)

**Update skill categories:**
- Lines 7-32: Edit `skillCategories` array

Example:
```tsx
{
  title: "Your Category",
  skills: [
    { name: "Skill Name", level: 85 },
  ],
}
```

**Update additional skills:**
- Lines 93-106: Edit the tags array

---

### 5. Projects Section (`components/Projects.tsx`)

**Add your projects:**
- Lines 7-50: Edit the `projects` array

Example:
```tsx
{
  title: "Your Project",
  description: "Project description",
  image: "https://your-image-url.com/image.jpg",
  tags: ["Tech 1", "Tech 2"],
  link: "https://your-project-link.com",
}
```

**Image sources:**
- Use Unsplash: `https://images.unsplash.com/photo-xxxxx`
- Your own images: `/images/project-name.jpg`
- Placeholder: `https://via.placeholder.com/800x600`

---

### 6. Contact Section (`components/Contact.tsx`)

**Update contact info:**
- Lines 26-54: Edit `contactInfo` array

Example:
```tsx
{
  title: "Email",
  value: "your.email@example.com",
  link: "mailto:your.email@example.com",
}
```

**Update social links:**
- Lines 56-60: Edit `socialLinks` array

```tsx
{ name: "GitHub", icon: "🔗", link: "https://github.com/yourusername" }
```

**Form submission:**
- Line 15: Add your form handling logic (e.g., EmailJS, FormSpree)

---

### 7. Navbar (`components/Navbar.tsx`)

**Change logo:**
- Line 45: Edit the "Portfolio" text

**Change nav items:**
- Lines 31-38: Edit `navItems` array (keep hrefs matching section IDs)

**Colors:**
- Line 25: Navbar background
- Line 46: Logo gradient

---

## 🎨 Global Theme Changes

### Colors (`app/globals.css` and components)

**Primary gradients:**
- Purple to Pink: `from-purple-400 to-pink-600`
- Purple to Pink (dark): `from-purple-500 to-pink-600`

**To change theme colors:**
1. Search for `purple` in all components
2. Replace with your color (e.g., `blue`, `green`, `orange`)

Example:
```tsx
// Current: Purple/Pink
from-purple-400 to-pink-600

// New: Blue/Teal
from-blue-400 to-teal-600
```

### Backgrounds

All sections use:
- `bg-gray-900` - Dark background
- `bg-gray-950` - Darker background
- `bg-gray-900/50` - Semi-transparent

---

## 📸 Adding Your Own Images

### For Projects:

1. **Option 1: Local images**
   ```tsx
   // Add images to /public/images/
   image: "/images/my-project.jpg"
   ```

2. **Option 2: External URLs**
   ```tsx
   image: "https://your-domain.com/image.jpg"
   ```

3. **Option 3: Unsplash**
   ```tsx
   image: "https://images.unsplash.com/photo-1234567890"
   ```

---

## 🚀 Quick Customization Checklist

- [ ] Update hero section with your name
- [ ] Write your about section
- [ ] Add your education & certifications
- [ ] List your skills with accurate levels
- [ ] Add 3-6 of your best projects
- [ ] Update contact information
- [ ] Add your social media links
- [ ] Replace placeholder images
- [ ] Test on mobile devices
- [ ] Update metadata in `app/layout.tsx`

---

## 💡 Pro Tips

1. **Keep it concise**: 3 paragraphs max for About
2. **Show your best work**: Quality over quantity for projects
3. **Be honest with skill levels**: Don't inflate percentages
4. **Use high-quality images**: Minimum 800x600 for projects
5. **Test responsiveness**: Check on mobile, tablet, desktop
6. **Update regularly**: Keep projects and skills current

---

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📝 Need Help?

Check the main README.md for:
- Installation instructions
- Deployment guides
- Troubleshooting tips
