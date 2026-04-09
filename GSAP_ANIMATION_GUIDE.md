# GSAP Cinematic Text Animation Components

## Overview
Professional, cinematic text animations using GSAP and ScrollTrigger, inspired by modern designer portfolios like minhpham.design.

## Components

### 1. CinematicText (Basic)
Simple character-by-character animation with blur and scale effects.

**Usage:**
```tsx
import CinematicText from "./components/CinematicText";

<CinematicText
  text="About Me"
  as="h2"
  className="text-4xl font-bold"
  stagger={0.04}
  duration={1.2}
/>
```

**Props:**
- `text?: string` - Text to animate (alternative to children)
- `children?: React.ReactNode` - Can pass string or JSX
- `as?` - HTML element (h1, h2, p, etc.) - default: "div"
- `className?` - Tailwind classes
- `stagger?` - Delay between characters (default: 0.05)
- `duration?` - Animation duration (default: 1)
- `delay?` - Initial delay (default: 0)
- `triggerStart?` - ScrollTrigger start position (default: "top 80%")

**Animation:**
- Start: y: 100, opacity: 0, blur(10px), scale: 0.9
- End: y: 0, opacity: 1, blur(0px), scale: 1
- Easing: power4.out

---

### 2. AdvancedCinematicText
Advanced component with multiple animation types and word/char splitting options.

**Usage:**
```tsx
import AdvancedCinematicText from "./components/AdvancedCinematicText";

<AdvancedCinematicText
  text="Welcome to my portfolio"
  as="p"
  className="text-lg"
  animationType="fade-up"
  splitBy="word"
  stagger={0.03}
  duration={0.8}
/>
```

**Additional Props:**
- `splitBy?: "char" | "word" | "line"` - How to split text (default: "char")
- `animationType?` - Animation preset:
  - `"blur-up"` (default) - Blur + slide from below
  - `"fade-up"` - Simple fade + slide
  - `"fade-scale"` - Fade + scale from small
  - `"slide-rotate"` - Slide from left + rotation

---

## Animation Types Explained

### blur-up (Default - Most Cinematic)
```
Initial: y: 100, opacity: 0, blur(10px), scale: 0.9
Final: y: 0, opacity: 1, blur(0px), scale: 1
Best for: Headlines, hero text
```

### fade-up
```
Initial: y: 50, opacity: 0
Final: y: 0, opacity: 1
Best for: Body text, paragraphs
```

### fade-scale
```
Initial: opacity: 0, scale: 0.5
Final: opacity: 1, scale: 1
Best for: Small text, labels
```

### slide-rotate
```
Initial: x: -50, opacity: 0, rotation: -15
Final: x: 0, opacity: 1, rotation: 0
Best for: Creative headlines, unique effects
```

---

## Examples

### Hero Title
```tsx
<CinematicText
  text="RAKIBUL HASSAN"
  as="h1"
  className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
  stagger={0.05}
  duration={1.2}
  triggerStart="top 90%"
/>
```

### Section Title
```tsx
<CinematicText
  text="About Me"
  as="h2"
  className="text-5xl font-bold text-center"
  stagger={0.04}
  duration={1}
/>
```

### Paragraph (Word-by-word)
```tsx
<AdvancedCinematicText
  text="I am a passionate developer skilled in building web applications."
  as="p"
  className="text-lg leading-relaxed"
  animationType="fade-up"
  splitBy="word"
  stagger={0.03}
  duration={0.8}
  delay={0.2}
/>
```

### Creative Headline
```tsx
<AdvancedCinematicText
  text="MAKING GOOD SHIT"
  as="h1"
  className="text-8xl font-black"
  animationType="slide-rotate"
  splitBy="char"
  stagger={0.06}
  duration={1.5}
/>
```

---

## Performance Tips

1. **Use word-splitting for long paragraphs** - Less DOM elements
2. **Adjust stagger** - Lower values (0.02-0.04) for smoother animations
3. **Set `once: true`** - Animation runs only once (already default)
4. **Use appropriate duration** - 0.8-1.2s for most cases

---

## Scroll Trigger Settings

The component uses these defaults:
```javascript
scrollTrigger: {
  trigger: containerRef.current,
  start: "top 80%",  // Animation starts when element is 80% down viewport
  toggleActions: "play none none none",
  once: true,  // Run animation only once
}
```

To customize trigger start:
```tsx
<CinematicText
  text="Hello"
  triggerStart="top 60%"  // Trigger earlier
/>
```

---

## Common Patterns

### Staggered Sections
```tsx
<CinematicText text="Title" delay={0} />
<AdvancedCinematicText text="Subtitle" delay={0.2} splitBy="word" />
<AdvancedCinematicText text="Body text..." delay={0.4} splitBy="word" />
```

### Multiple Lines
```tsx
<CinematicText text="Line One" />
<CinematicText text="Line Two" delay={0.3} />
<CinematicText text="Line Three" delay={0.6} />
```

---

## Troubleshooting

**Animation not triggering:**
- Check if element is in viewport
- Adjust `triggerStart` prop
- Ensure GSAP and ScrollTrigger are installed

**Jittery animation:**
- Reduce stagger value
- Increase duration
- Use smoother easing (power4.out is already smooth)

**Gradient not working on animated text:**
- Apply gradient to className, not children
- Use: `className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"`

---

## Installation

GSAP is already installed in your project:
```bash
npm install gsap
```

Components are located in:
- `/components/CinematicText.tsx`
- `/components/AdvancedCinematicText.tsx`
