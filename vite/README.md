# Kyozo Vite Project

A modern React application built with Vite, featuring multiple layouts and pages for the Kyozo platform.

## Features

- ⚡ **Vite** - Fast development server and optimized builds
- ⚛️ **React 18** - Modern React with hooks and concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router** - Client-side routing with multiple layouts
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Multiple Layouts** - Default, Modal, and Visionary Circle layouts

## Project Structure

```
vite/
├── app/                    # Main application code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── data/              # Static data and mocks
│   ├── App.tsx            # Main app with routing
│   └── routes.tsx         # Route definitions
├── src/                   # Vite entry point
│   ├── main.tsx          # Application entry
│   └── index.css         # Global styles
├── styles/               # Additional CSS files
├── imports/              # Generated imports from Figma
└── dist/                # Build output (gitignored)
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Layouts

### Default Layout (`/`)
- Home page with main navigation
- Bio, Feed, Community sections
- Article detail pages
- Contact and Explore pages

### Modal Layout (`/modal`)
- Modal-based interface
- Full-screen modal experience

### Visionary Circle Layout (`/visionary-circle`)
- Specialized layout for Visionary Circle content
- Custom navigation and styling

## Routing

The application uses React Router with `MemoryRouter` for development:

- `/` - Default layout with Home page
- `/bio` - Biography page
- `/feed` - Content feed
- `/community` - Community section
- `/article/:id` - Individual article pages
- `/modal` - Modal interface
- `/visionary-circle` - Visionary Circle section

## Styling

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theme customization
- **Responsive design** with mobile-first approach
- **Component-scoped styles** where needed

## Build Optimization

- Vite automatically optimizes dependencies
- Code splitting by route
- Asset optimization and caching
- Production-ready builds with tree shaking

## Environment Variables

Create a `.env.local` file for environment-specific variables:
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Kyozo
```

## Contributing

1. Create feature branches from `main`
2. Follow the existing code structure
3. Use TypeScript for type safety
4. Test on different screen sizes
5. Optimize for performance

## License

Private project - All rights reserved
