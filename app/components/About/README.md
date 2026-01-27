# About Section

A comprehensive, modular About section with consistent design language matching the Hero and Projects sections.

## 📁 File Structure

```
About/
├── index.ts                    # Central exports
├── types.ts                    # TypeScript type definitions
├── aboutData.ts                # Centralized data configuration
├── AboutSection.tsx            # Main section component
├── SectionHeader.tsx           # Reusable section header
├── StatsGrid.tsx              # Statistics display grid
├── SkillsList.tsx             # Skills with proficiency bars
├── ExperienceTimeline.tsx     # Work experience timeline
└── README.md                  # Documentation (this file)
```

## 🎨 Design Patterns

### Consistent with Hero & Projects

- **Colors**: Emerald accent (#10B981) with gradients
- **Background**: Dark theme with particle effects
- **Animations**: Framer Motion with stagger effects
- **Typography**: Large headlines with signature font
- **Effects**: Aurora glow, backdrop blur, hover interactions

### Component Architecture

- **Modular**: Each component is self-contained
- **Typed**: Full TypeScript support
- **Reusable**: Components can be used independently
- **Documented**: JSDoc comments throughout

## 🚀 Usage

### Basic Import

```tsx
import { AboutSection } from "@/app/components/About";

export default function Page() {
  return <AboutSection />;
}
```

### Custom Data

Update `aboutData.ts` with your personal information:

```typescript
export const aboutData: AboutData = {
  headline: "Your Headline",
  tagline: "Your Tagline",
  description: "Your description...",
  stats: [...],
  skills: [...],
  experience: [...],
  education: [...],
};
```

### Using Individual Components

```tsx
import { StatsGrid, SkillsList, ExperienceTimeline } from '@/app/components/About';

// Use components individually
<StatsGrid stats={aboutData.stats} />
<SkillsList skills={aboutData.skills} />
<ExperienceTimeline experiences={aboutData.experience} />
```

## 📦 Components

### AboutSection

Main wrapper component that orchestrates all sub-components.

**Features:**

- Hero-style introduction
- Particle background
- Aurora glow effects
- Responsive layout
- Smooth scroll animations

### SectionHeader

Reusable header for subsections.

**Props:**

- `badge?: string` - Optional badge text
- `title: string` - Section title
- `subtitle?: string` - Optional subtitle
- `align?: 'left' | 'center'` - Text alignment

### StatsGrid

Animated statistics grid.

**Props:**

- `stats: AboutData['stats']` - Array of stat objects

**Features:**

- Hover animations
- Glow effects
- Responsive grid (2 columns mobile, 4 desktop)

### SkillsList

Categorized skills with proficiency bars.

**Props:**

- `skills: Skill[]` - Array of skill objects

**Features:**

- Organized by category (Frontend, Backend, Tools, Design)
- Animated progress bars
- Hover interactions
- Color-coded categories

### ExperienceTimeline

Vertical timeline of work experience.

**Props:**

- `experiences: Experience[]` - Array of experience objects

**Features:**

- Timeline visualization
- Current position badge
- Technology tags
- Smooth animations

## 🎯 Customization

### Adding New Skills

```typescript
// In aboutData.ts
skills: [
  {
    id: "skill-id",
    name: "Skill Name",
    category: "frontend" | "backend" | "tools" | "design",
    proficiency: 85, // 0-100
  },
];
```

### Adding Experience

```typescript
// In aboutData.ts
experience: [
  {
    id: "exp-id",
    role: "Job Title",
    company: "Company Name",
    duration: "2022 - Present",
    description: "Job description...",
    technologies: ["Tech1", "Tech2"],
    current: true, // Optional
  },
];
```

### Styling Adjustments

All components use Tailwind CSS for styling. Modify classes directly in component files for customization.

## 🔄 Animation Timeline

1. **Hero Section**: 0s - 1s (fade in)
2. **Stats Grid**: Staggered entry (0.1s intervals)
3. **Skills Section**: On scroll into view
4. **Experience Timeline**: Staggered entry (0.2s intervals)

## 📱 Responsive Behavior

- **Mobile**: Single column layout, smaller text sizes
- **Tablet**: 2-column grids, adjusted spacing
- **Desktop**: Full 4-column grids, optimal spacing

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Focus states for interactive elements
- Reduced motion support (can be added)

## 🔧 Performance

- Components use `viewport={{ once: true }}` to animate only once
- Optimized animation timings
- Lazy loading for scroll-triggered animations
- Efficient re-renders with proper memoization

## 📝 Notes

- All animations are GPU-accelerated via Framer Motion
- Color scheme can be globally adjusted via CSS variables
- Timeline dot uses `lucide-react` icons
- Compatible with Next.js App Router
