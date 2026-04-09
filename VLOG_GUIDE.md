# Vlog Section - Customization Guide

## 🎨 Premium Travel Gallery

Your portfolio now includes a stunning Vlog section with premium design and advanced animations.

## 📁 Files Created

1. **`/components/Vlog.tsx`** - Main vlog section component
2. **`/components/VlogCard.tsx`** - Reusable vlog card with advanced interactions

## ✨ Features

### Visual Design
- **Dynamic Masonry Layout** - Asymmetric grid with tall and standard cards
- **Premium Hover Effects** - 3D tilt, zoom, and overlay animations
- **Gradient Overlays** - Multi-layer gradients for depth
- **Shimmer Effect** - Subtle light sweep on hover
- **Micro-animations** - Smooth transitions throughout

### Animations (Framer Motion)
- **Parallax 3D Tilt** - Cards tilt based on mouse position
- **Staggered Entry** - Cards animate in sequence when scrolling
- **Image Zoom** - Subtle scale effect on hover
- **Content Reveal** - Description slides up on hover
- **Border Glow** - Orange border appears on hover

### Performance
- **Lazy Loading** - Images load only when needed
- **Optimized Animations** - GPU-accelerated transforms
- **Viewport Detection** - Animations trigger in view

## 🎯 Customization

### Add Your Own Travel Photos

Edit `/components/Vlog.tsx`, update the `vlogData` array:

```tsx
const vlogData = [
  {
    image: "/vlog/your-image.jpg", // Local path from /public folder
    location: "Your Location",
    description: "Your amazing travel story...",
    date: "Month Year",
    tall: true, // Makes card double height
  },
  // Add more...
];
```

**Current Setup**: Uses placeholder SVG images in `/public/vlog/`
- No external dependencies
- No 404 errors
- Lightweight and fast

**To add your own photos**:
1. Add images to `/public/vlog/` folder
2. Update paths: `image: "/vlog/your-photo.jpg"`
3. Keep the leading `/` (required)

### Change Layout

**Grid columns** (line 61 in Vlog.tsx):
```tsx
// Current: 1 col mobile, 2 col tablet, 3 col desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// For 4 columns:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

**Card height** (VlogCard.tsx line 58):
```tsx
{tall ? "h-[600px]" : "h-[300px]"}
// Adjust these values
```

### Customize Colors

Replace `orange-500` and `red-600` with your brand colors throughout both files.

### Stats Section

Update the stats (Vlog.tsx line 95):
```tsx
{ label: "Countries", value: "12+" },
{ label: "Cities", value: "45+" },
{ label: "Adventures", value: "100+" },
{ label: "Memories", value: "∞" },
```

## 🖼️ Image Sources

**Current Setup**: Uses local SVG placeholder images (no 404 errors!)
- Location: `/public/vlog/`
- Format: SVG with gradient backgrounds
- Lightweight and performant
- 6 placeholder images included

**To use your own images**:
1. Add photos to `/public/vlog/` folder  
   Example: `swiss-alps.jpg`, `bali.jpg`
2. Update image paths in `Vlog.tsx`:  
   ```tsx
   image: "/vlog/swiss-alps.jpg"
   ```
3. Keep the leading `/` - it's required for Next.js public folder

**Recommended image specs**:
- Format: JPG or WebP (or keep SVG for placeholders)
- Standard cards: 800x600px
- Tall cards: 800x1200px  
- Optimized for web (< 200KB each)
- Good quality for best visual impact

## 🎬 Animation Settings

**Card entrance timing** (VlogCard.tsx line 37):
```tsx
delay: index * 0.1 // Stagger delay between cards
```

**Hover zoom intensity** (VlogCard.tsx line 65):
```tsx
scale: isHovered ? 1.1 : 1 // 1.1 = 10% zoom
```

**3D tilt sensitivity** (VlogCard.tsx line 29-30):
```tsx
[-0.5, 0.5], [5, -5] // Adjust tilt range
```

## 🔗 Navigation

The Vlog section is automatically added to:
- Main page (`/app/page.tsx`)
- Navbar with smooth scroll
- Section ID: `#vlog`

## 💡 Tips

1. **Mix tall and standard cards** for visual interest
2. **Use high-quality images** for best results
3. **Keep descriptions concise** (2-3 lines)
4. **Test on mobile** - cards stack beautifully
5. **Update dates** to match your travels

## 🚀 Next Steps

- Replace placeholder images with your travel photos
- Update locations and descriptions
- Adjust colors to match your brand
- Add real links to full vlog posts (if needed)
- Consider adding video thumbnails

## 🎨 Design Consistency

The Vlog section matches your portfolio's design system:
- Dark theme (`bg-black`)
- Orange accent color (`orange-500`)
- Beige text (`#c9b9a1`)
- Consistent spacing and animations
- Mobile-responsive throughout

Enjoy your premium travel gallery! 🌍✨
