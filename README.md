# Mah Jenn - Static Website for GitHub Pages

This is a standalone React/Vite project prepared for static deployment on GitHub Pages. It has been extracted from the original Replit workspace and configured to work as a standalone static site.

## Setup Instructions

### 1. Install Dependencies

The environment you're running in appears to have npm registry access restrictions. If you can access npm packages, run:

```bash
npm install
```

### 2. Build the Project

Once dependencies are installed:

```bash
npm run build
```

The built output will be in the `dist/` directory.

### 3. Deploy to GitHub Pages

Copy the contents of the `dist/` directory to your GitHub Pages repository or branch.

## Project Structure

- `src/` - Source code
  - `pages/` - Route pages (home, about, booking, store, league)
  - `components/` - React components including UI library components
  - `hooks/` - Custom hooks (use-cart, use-toast, use-mobile)
  - `stubs/` - Mock implementations (api-client-react.ts)
  - `lib/` - Utilities including zod-resolver
  - `index.css` - Main stylesheet
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component with routing

- `public/` - Static assets
  - `photos/` - Image files
  - `images/` - Other images
  - `favicon.svg` - Favicon

- `index.html` - HTML template
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Key Features

- React 18 with TypeScript
- Client-side routing with Wouter
- Form handling with react-hook-form and Zod validation
- UI components from Radix UI
- Tailwind CSS styling
- Framer Motion animations
- Shopping cart functionality with localStorage
- Mock API client for standalone deployment

## API Integration

The project uses mock implementations of API hooks defined in `src/stubs/api-client-react.ts`:

- `useListSessions()` - Returns mock mahjong session data
- `useCreateBooking()` - Mock booking creation
- `useCreateOrder()` - Mock order creation
- `SessionType` - Type definition for sessions
- `Product` - Type definition for products

These can be replaced with real API calls by updating the alias in `vite.config.ts` and creating actual API client code.

## Environment Variables

None required for the static deployment. The site works entirely on the client side with local storage for the shopping cart.

## Build Output

The `dist/` directory contains the complete static site ready for deployment:
- `index.html` - Main HTML file
- `404.html` - SPA routing fallback for GitHub Pages
- Asset files (CSS, JS, images)

## GitHub Pages Configuration

For a custom domain, update `vite.config.ts` base to match your deployment path:
```typescript
base: "/",  // For custom domain root
base: "/repo-name/",  // For GitHub Pages subdirectory
```

## Troubleshooting

### npm Install Fails
If you encounter npm registry access issues, check:
1. Network connectivity
2. npm proxy settings: `npm config list`
3. Try: `npm install --registry https://registry.yarnpkg.com`
4. Or use an alternative package manager like Yarn or PNPM

### Build Fails
Check that all dependencies are installed and that TypeScript compilation is successful:
```bash
npm run typecheck
```

### Routing Issues on GitHub Pages
The `public/404.html` file handles SPA routing redirects. Ensure it's included in your deployment.

## Development

For local development:

```bash
npm run dev
```

Then visit http://localhost:5173

## License

This project is a static site prepared for deployment.
