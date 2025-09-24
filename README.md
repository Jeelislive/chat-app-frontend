# ConnectSphere — Frontend (Vite + React)

A fast, modern, and privacy-first chat frontend built with Vite + React, Material UI, Redux Toolkit, and Socket.IO. Optimized for quick loads, smooth navigation, and a clean, minimal UI.

## Features
- Real‑time messaging with Socket.IO
- Authenticated routes and session-aware UI
- Google OAuth integration (via `@react-oauth/google`)
- Group chats and 1:1 chat
- Admin dashboard (users, chats, messages)
- Responsive UI with Material UI
- Code‑splitting + route‑level lazy loading for performance

## Tech Stack
- React 18, React Router
- Vite 5 (blazing fast dev/build)
- Redux Toolkit + React Redux
- Material UI (MUI)
- Socket.IO Client
- Axios

## Quick Start
### Prerequisites
- Node.js 18+ and npm

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Create a `.env` file in `client/` (same folder as this README). Vite exposes env vars only if they start with `VITE_`.

Common variables:
```
VITE_SERVER=https://your-api-url.example.com
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
# Optional, if socket server is on a separate origin
# VITE_SOCKET_URL=https://your-socket-url.example.com
```

### 3) Run in development
```bash
npm run dev
```
Vite will print a local URL (typically http://localhost:5173). Open it in the browser.

### 4) Build for production
```bash
npm run build
```
The production build is generated into the `dist/` folder.

### 5) Preview the production build locally
```bash
npm run preview
```

## Available Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Production build (with performance tweaks)
- `npm run preview` — Preview the built app locally
- `npm run lint` — Lint JavaScript/JSX
- `npm run build:analyze` — Build and open bundle analysis (via `vite-bundle-analyzer`)

## Project Structure (key parts)
```
client/
├─ index.html                 # App shell
├─ vite.config.js             # Build + performance config
├─ vercel.json                # SPA rewrite for Vercel
├─ src/
│  ├─ App.jsx                 # Routes + app setup
│  ├─ main.jsx                # App entry point
│  ├─ pages/                  # Landing, Home, Chat, Groups, Admin/*, etc.
│  ├─ components/             # Reusable UI components
│  ├─ redux/                  # Redux Toolkit slices/store
│  ├─ constants/              # config, branding, etc.
│  ├─ socket/                 # Socket provider and helpers
│  └─ assets/                 # Static assets
└─ ...
```

Routing is configured in `src/App.jsx` using `react-router-dom`, with protected routes wrapped by `ProtectRoute` and a `SocketProvider` for authenticated areas.

## Performance Notes
- Manual chunking in `vite.config.js` improves long‑term caching (`react-vendor`, `mui-core`, `router`, etc.)
- Route‑level code splitting via `React.lazy` in `src/App.jsx`
- Optimized deps and HMR overlay disabled for cleaner dev UX

## Deployment (Vercel)
This project is set up for SPA routing on Vercel via `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Two common ways to deploy:

1) Vercel CLI
```bash
# from the client/ directory
npm run build
npx vercel --prod
```

2) GitHub → Vercel
- Import your repository into Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Set env vars (beginning with `VITE_`) under Project Settings → Environment Variables

## Troubleshooting
- API calls fail locally: verify `VITE_SERVER` and CORS settings on the backend.
- Google OAuth popup issues: double‑check `VITE_GOOGLE_CLIENT_ID` and Authorized origins in Google Cloud Console.
- Blank screen after deploy: ensure SPA rewrite is active (`vercel.json`) and `dist/` is used as the output directory.
- Socket not connecting: check `VITE_SOCKET_URL` (if used) and that the server allows the frontend origin.

## Contributing
Pull requests are welcome! For major changes, please open an issue to discuss what you’d like to change.

## License
This project is provided as‑is by the repository owner. Add a license here if you intend broader reuse.
