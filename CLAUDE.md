# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HUMA is a French-language employee wellbeing and feedback tracking application built with React + Vite. It helps employees track their mood ("météo du jour"), provide feedback, and visualize team sentiment trends.

**Critical: All UI text MUST be in French.** Variable/function names can be English, but user-facing strings are French.

## Commands

### Development
```bash
npm install        # Install dependencies
npm run dev        # Start dev server (usually http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
```

### Environment Variables
Create a `.env` file if connecting to a backend API:
```
VITE_API_URL=http://localhost:3000
```
Access in code via `import.meta.env.VITE_API_URL`

## Architecture

### State-Based Navigation (No Router)
Navigation is **state-based**, not route-based. The entire app uses a single `page` state variable in `App.jsx`:

```javascript
const [page, setPage] = useState('Accueil')
// Pages rendered conditionally: {page === 'Accueil' && <HomeEmployee />}
```

**Important patterns:**
- Use `onNavigate` prop pattern for page changes: `onNavigate?.('PageName')`
- Multi-step flows (like check-in) use separate page states: `Checkin`, `CheckinStep2`, `CheckinStep3`
- DO NOT use react-router or similar libraries

### Onboarding Flow
The app shows a multi-step onboarding (`Onboarding.jsx`) on first load:
- Controlled by `showOnboarding` state in `App.jsx`
- 8 steps (0-7): Welcome → SSO → Name Collection → How it Works → 3 questionnaires → Success
- Stores data to `localStorage`:
  - `huma_onboarding_done`: '1' when complete
  - `huma_prenom`, `huma_nom`: User name
  - `huma_motivation`, `huma_environnement_travail`, `huma_energie_sources`: Questionnaire answers

### Check-in System (Multi-Step)
Users can check in their mood through a 3-step flow:
1. **Checkin**: Mood slider with weather icons (Orage → Pluvieux → Nuageux → SoleilNuageux → Soleil based on value)
2. **CheckinStep2**: Additional feelings/context
3. **CheckinStep3**: Final confirmation

Navigation uses `onNavigate` to move between steps and `onBack` for backward navigation.

### Import Aliases
Always use `@/` for src imports (configured in `vite.config.js`):
```javascript
import Modal from '@/components/Modal'
import { api } from '@/services/apiClient'
```

### Deployment Configuration
The app uses conditional base path for different environments:
```javascript
base: process.env.VERCEL ? '/' : '/HUMA-FRONTEND/'
```
- Vercel: root path `/`
- GitHub Pages: `/HUMA-FRONTEND/`

## Styling Approach

### CSS Variables for Theming
Colors and styles use CSS variables defined in `styles.css`:
- Brand: `--brand: #0A2C2F`
- Primary interactive: `--primary: #1a2e44`
- Text: `--text: #0f172a`, `--muted: #6b7280`
- Backgrounds: `--bg: #f7f8fb`, `--card: #ffffff`
- Chart colors: `--chart-grid`, `--chart-tick`, `--chart-h`
- Radial gradients: `--radial1` through `--radial7`

### Common CSS Classes
- `.btn` / `.btn.primary` - Buttons
- `.card` - White rounded containers
- `.panel` - Inset card variant
- `.navbar` - Top navigation bar
- `.subtle` / `.muted` - Text hierarchy
- `.grid.two` / `.grid.three` - Grid layouts

### Inline Styles
Component-specific layouts often use inline styles. This is the established pattern in the codebase - don't refactor to CSS classes.

### Fixed Gradient Background
The app uses a fixed animated gradient background via `body::before` pseudo-element in `styles.css`.

## Data & API Patterns

### API Client
All API calls use the `api` object from `apiClient.js`:
```javascript
import { api } from '@/services/apiClient'

// Usage
await api.get('/endpoint')
await api.post('/endpoint', { data })
await api.put('/endpoint', { data })
await api.delete('/endpoint')
```

Error handling includes status code and payload in thrown errors.

### Mock Data
Mock data services live in `src/services/userInsights.js` for development.

### State Management
- No global state management (Redux, Zustand, etc.)
- Use React hooks (`useState`, `useEffect`)
- Lift state to parent components when sharing data
- Use `localStorage` for persistence (onboarding data, user preferences)

## Chart.js Integration

### Registration
Chart.js components must be explicitly registered before use (see `MoodTrendChart.jsx`):
```javascript
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)
```

### Styling Patterns
- Use gradient fills with RGB values: `rgba(239,68,68,...)` for red, `rgba(59,130,246,...)` for blue
- Access CSS variables: `getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')`
- Apply `tension: 0.35` for smooth curves, `pointRadius: 0` for clean lines

## Modal Patterns

Base `Modal` component (`Modal.jsx`) handles:
- Escape key to close
- Click-outside to close
- Body scroll lock (`document.body.style.overflow = 'hidden'`)

All modals use `open` prop and `onClose` callback. Multi-step modals (like `CheckinModal`) manage internal `step` state.

## Key Files Reference

- **Navigation logic**: `src/App.jsx` - State-based routing, onboarding control
- **Onboarding**: `src/pages/employé/Onboarding.jsx` - 8-step flow with localStorage
- **Check-in flow**: `src/pages/employé/Checkin.jsx`, `CheckinStep2.jsx`, `CheckinStep3.jsx`
- **Styling**: `src/styles.css` - CSS variables, common classes, gradient background
- **Modal pattern**: `src/components/Modal.jsx` - Base implementation
- **API integration**: `src/services/apiClient.js` - Fetch wrapper
- **Chart example**: `src/components/MoodTrendChart.jsx` - Chart.js with gradients
- **Navigation bar**: `src/components/Navbar.jsx` - Responsive nav with mobile menu

## Critical Constraints

1. **French language only** for all UI text (buttons, labels, messages)
2. **No react-router** - navigation is state-based via `setPage`
3. **No TypeScript** - this is a JavaScript project
4. **No CSS frameworks** (Tailwind, etc.) - uses vanilla CSS + variables
5. **Always use `@/` import alias** for src imports
6. **Base path**: Keep `base: '/HUMA-FRONTEND/'` in vite.config for GitHub Pages
7. **Chart.js registration**: Always register components before use
