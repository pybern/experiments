# AGENTS.md

> Context file for AI agents working on this codebase.

## Project Overview

**WeMoveX** - Australia's vehicle transport quote wizard. Users select pickup/dropoff locations, vehicle details, and receive a tailored transport quote.

**Live:** https://wemovex.com.au

## Environment

- **OS:** Windows 10+
- **Shell:** CMD (`C:\WINDOWS\System32\cmd.exe`)
- **Package Manager:** npm

When running CLI commands:
- Use Windows-style paths (`\`) or forward slashes (Node handles both)
- Use `npm run` for scripts (no yarn/pnpm)
- Dev server runs on `http://localhost:3000`

## Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.1.1 | App Router, React Server Components |
| React | 19.2.3 | Latest with use() hook support |
| TypeScript | 5.9.3 | Strict mode |
| Tailwind CSS | 4.x | New CSS-first config, `@theme` blocks |
| Motion | 12.x | Animation library (formerly Framer Motion) |
| @base-ui/react | 1.x | Unstyled primitives from MUI team |
| Leaflet | 1.9.4 | Australia map for location selection |

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint
```

## File Structure

```
app/
├── page.tsx              # Landing page
├── layout.tsx            # Root layout (fonts, metadata)
├── globals.css           # Tailwind + custom animations
├── car/
│   ├── layout.tsx        # Quote wizard layout
│   └── questions/        # Multi-step wizard
│       ├── location/     # Step 1: Pick/drop locations
│       ├── vehicle/      # Step 2: Make/model/age
│       ├── auction/      # Step 3: Auction house check
│       ├── dimensions/   # Step 4: Vehicle specs
│       ├── contact/      # Step 5: Contact + quote
│       └── _components/  # Shared step components

components/
├── ui/                   # Base UI components (Button, Input, etc.)
├── landing/              # Landing page sections
└── *.tsx                 # Shared components

data/
├── car-questions-flow.ts # Step config, validation, exit conditions
└── vehicle-types.ts      # Vehicle categories

lib/
└── utils.ts              # cn() helper for classnames
```

## Component Patterns

### UI Components

Built on `@base-ui/react` primitives with `class-variance-authority` (CVA) for variants. **Not standard shadcn/ui** - these use Base UI underneath.

```tsx
// Example: Button with variants
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">Click me</Button>
<Button variant="outline" size="icon">...</Button>
```

Available variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`
Available sizes: `xs`, `sm`, `default`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`

### Adding New Components

1. Create in `components/ui/` for base components
2. Use `@base-ui/react` primitives where available
3. Style with CVA variants + Tailwind
4. Use `cn()` from `@/lib/utils` for class merging

## Quote Wizard Flow

Defined in `data/car-questions-flow.ts`:

```
location → vehicle → auction → dimensions → contact
```

Each step has:
- `requiredParams`: URL params needed to access the step
- `progress`: Progress bar percentage
- `nextRoute`: Where to navigate on completion

**Exit conditions** redirect users out of the flow:
- Vehicle age > 30 years
- Mechanical/roadworthiness issues
- Salvage auction vehicles

## Design System

### Colors (oklch)

Primary color is **shocking pink/rose**:
```css
--primary: oklch(0.59 0.22 1);        /* Main pink */
--primary-foreground: oklch(0.97 0.01 343);
```

Full palette in `app/globals.css` with light/dark mode support.

### Custom Animations

Defined in `globals.css`:
- `animate-fade-in-up` - Hero entrance
- `animate-marquee` - Scrolling testimonials
- `btn-liquid-border` - Animated gradient border effect
- `animate-map-fade-in` - Map panel transitions
- Marker transitions for Leaflet map

### Typography

- **Sans:** Inter (`--font-sans`)
- **Mono:** Geist Mono (`--font-geist-mono`)

## Key Patterns

### URL State for Wizard

Quote data is stored in URL search params, not React state:
```tsx
// Reading params
const searchParams = useSearchParams()
const pickup = searchParams.get("pick")

// Updating params
router.push(`/car/questions/vehicle?pick=${pickup}&drop=${dropoff}`)
```

### Server vs Client Components

- Pages are Server Components by default
- Add `"use client"` for interactivity (forms, state, effects)
- Map components require `"use client"` (Leaflet needs window)

### Styling Conventions

- Use Tailwind utilities, avoid inline styles
- Custom animations go in `globals.css`
- Color tokens via CSS variables (`bg-primary`, `text-muted-foreground`)
- Rounded corners: `rounded-4xl` for buttons, `rounded-lg` for cards

## Common Tasks

### Add a New Quote Step

1. Create folder in `app/car/questions/[step-name]/`
2. Add `page.tsx` with step content
3. Update `data/car-questions-flow.ts` with step config
4. Update previous step's `nextRoute`

### Add a New UI Component

1. Check if `@base-ui/react` has a primitive
2. Create `components/ui/[name].tsx`
3. Use CVA for variants if needed
4. Export from the file

### Modify the Color Theme

Edit CSS variables in `app/globals.css` under `:root` (light) and `.dark` (dark).

## Development Approach

### Mobile First

**Always design and test mobile before desktop.** The majority of users access on mobile devices.

- Start with mobile layouts, then add `md:` and `lg:` breakpoints
- Test in browser DevTools at 375px width first
- Check touch targets are at least 44x44px
- Verify scrolling and gestures work smoothly

## Gotchas

- **Tailwind v4**: Uses new CSS-based config, not `tailwind.config.js`
- **React 19**: Some patterns changed (ref handling, use() hook)
- **Base UI**: Different API than Radix/shadcn primitives
- **Windows paths**: Use forward slashes in imports, Windows handles both in CLI

