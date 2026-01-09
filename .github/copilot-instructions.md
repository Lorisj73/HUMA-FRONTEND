# HUMA Frontend - AI Coding Agent Instructions

## Project Overview
HUMA is a French-language employee wellbeing and feedback tracking application built with React + Vite. It helps employees track their mood, provide feedback, and visualize team sentiment trends.

## Tech Stack & Architecture

### Core Technologies
- **Framework**: React 18.3 with Vite 5.4
- **Language**: JavaScript (not TypeScript)
- **Styling**: Vanilla CSS with CSS variables (no CSS frameworks)
- **Charts**: Chart.js 4.5 + react-chartjs-2
- **Build**: Vite with `base: '/HUMA-FRONTEND/'` for GitHub Pages deployment
- **State**: React hooks (useState, useEffect) - no external state management
- **Routing**: Manual client-side routing via state (see `App.jsx`)

### Project Structure
```
src/
├── main.jsx              # React bootstrap
├── App.jsx               # Main router (state-based navigation)
├── styles.css            # Global styles with CSS variables
├── components/           # Reusable UI components
│   ├── checkin/         # Check-in modal flow
│   ├── Modal.jsx        # Base modal with Escape key handling
│   ├── MoodTrendChart.jsx  # Chart.js wrapper
│   └── WordCloud.jsx    # Custom word cloud visualization
├── pages/               # Page-level components
│   ├── employé/        # Employee-specific pages
│   │   ├── Onboarding.jsx  # Multi-step onboarding with localStorage
│   │   └── HomeEmployee.jsx  # Employee dashboard
│   └── employeur/      # Manager pages (future)
└── services/
    ├── apiClient.js    # Fetch wrapper using import.meta.env.VITE_API_URL
    └── userInsights.js # Mock data services
```

## Critical Patterns & Conventions

### Navigation System
Navigation is **state-based**, not route-based. See `App.jsx`:
```javascript
const [page, setPage] = useState('Accueil')
// Pages rendered conditionally: {page === 'Accueil' && <HomeEmployee />}
```
Use `onNavigate` prop pattern for page changes. Do NOT use react-router or similar.

### Import Aliases
- Use `@/` for all src imports: `import Modal from '@/components/Modal'`
- Configured in both `vite.config.js` and `jsconfig.json`

### Styling Approach
- **CSS Variables** for theming (see `:root` in `styles.css`):
  - Colors: `--text`, `--muted`, `--bg`, `--card`, `--border`, `--primary`
  - Chart colors: `--chart-grid`, `--chart-tick`, `--chart-h`
  - Radial gradients: `--radial1` through `--radial7`
- **Inline styles** for component-specific layouts (common pattern)
- **CSS classes** for reusable patterns: `.btn`, `.card`, `.panel`, `.navbar`, `.subtle`
- Fixed animated gradient background using `body::before` pseudo-element

### Modal Patterns
- Base `Modal` component handles Escape key, click-outside, body scroll lock
- All modals use `open` prop and `onClose` callback
- Example: `CheckinModal` has multi-step state with `step` variable
- Modals prevent body scroll: `document.body.style.overflow = 'hidden'`

### Data Flow & State
- Mock data lives in `src/services/userInsights.js`
- API calls use `api` object from `apiClient.js`: `api.get('/endpoint')`
- Onboarding data saved to `localStorage` (keys: `huma_onboarding_done`, `huma_work_style`, etc.)
- No global state - lift state to parent or use localStorage for persistence

### Chart.js Integration
- Register required Chart.js components explicitly (see `MoodTrendChart.jsx`)
- Use gradient fills with RGB values: `rgba(239,68,68,...)` for red, `rgba(59,130,246,...)` for blue
- Charts use CSS variable colors: `getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')`
- Apply `tension: 0.35` for smooth curves, `pointRadius: 0` for clean lines

### French Language
- **All UI text must be in French**: labels, buttons, placeholders, error messages
- Variable/function names can be English, but user-facing strings are French
- Common terms: "humeur" (mood), "ressenti" (feeling), "check-in", "bien-être" (wellbeing)

## Development Workflows

### Running the App
```powershell
npm install        # Install dependencies
npm run dev        # Start dev server (usually http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

### Environment Variables
- API URL configured via `VITE_API_URL` (default: empty string)
- Access in code: `import.meta.env.VITE_API_URL`
- Create `.env` file if connecting to backend API

### Database Schema
- PostgreSQL schema in `database.sql` with tables for:
  - `organizations`, `teams`, `users`, `mood_checkins`, `mood_feelings`
  - Check schema for field names when building API integrations
- Uses UUIDs for primary keys, CHECK constraints for enums

## Component Development Guidelines

### Creating New Components
1. Prefer functional components with hooks
2. Use destructured props: `export default function MyComponent({ prop1, prop2 })`
3. Import from `@/` alias: `import Header from '@/components/Header'`
4. Add to appropriate directory (`components/` for reusable, `pages/` for routes)

### Adding New Pages
1. Create in `src/pages/` (or subdirectory like `employé/`)
2. Import in `App.jsx`
3. Add navigation tab to `Navbar.jsx` if needed
4. Add conditional render in `App.jsx`: `{page === 'NewPage' && <NewPage />}`

### Working with Forms
- Use controlled inputs with `useState`
- Check `CheckinModal.jsx` for multi-step form pattern
- Use `<select>` with custom styling (see onboarding steps)
- Apply inline styles for unique layouts, CSS classes for common elements

## Common Pitfalls to Avoid

1. **Don't** install react-router - navigation is state-based
2. **Don't** use TypeScript - this is a JavaScript project
3. **Don't** add Tailwind or CSS frameworks - uses vanilla CSS + variables
4. **Don't** forget `@/` import alias - always use it for src imports
5. **Don't** use English UI text - must be French
6. **Don't** forget to register Chart.js components before using them
7. **Don't** forget `base: '/HUMA-FRONTEND/'` in vite.config for deployment

## Key Files to Reference

- **Navigation logic**: `src/App.jsx` (state-based routing example)
- **Styling patterns**: `src/styles.css` (CSS variables, common classes)
- **Modal pattern**: `src/components/Modal.jsx` (base implementation)
- **Multi-step flow**: `src/pages/employé/Onboarding.jsx` (with localStorage)
- **API integration**: `src/services/apiClient.js` (fetch wrapper)
- **Chart example**: `src/components/MoodTrendChart.jsx` (Chart.js + gradients)
- **Database schema**: `database.sql` (PostgreSQL table definitions)

## Design System Quick Reference

### Common CSS Classes
- `.btn` / `.btn.primary` - Buttons
- `.card` - White rounded containers
- `.panel` - Inset card variant
- `.navbar` - Top navigation bar
- `.subtle` / `.muted` - Text hierarchy
- `.grid.two` / `.grid.three` - Grid layouts

### Color Palette
- Primary brand: `--brand: #0A2C2F`
- Interactive: `--primary: #1a2e44`
- Text: `--text: #0f172a`, `--muted: #6b7280`
- Backgrounds: `--bg: #f7f8fb`, `--card: #ffffff`
- Mood colors: Red (#ef4444) for low, Blue (#3b82f6) for high
