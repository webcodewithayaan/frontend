# Human Health Management — React Frontend

Responsive React + Vite + Bootstrap frontend with public pages, login/signup screens, and Admin, HR Manager, and Employee portal previews. Branding: Human Health Management. Footer credit: Made by Ayaan Muhammad.

## Run locally
```bash
npm install
npm run dev
```

## Routes
- `/` — Home
- `/login` — Login with role selector
- `/signup` — Signup preview
- `/admin` — Admin portal preview
- `/hr-manager` — HR Manager portal preview
- `/employee` — Employee portal preview
- Other existing informational pages are still available.

## Backend
This frontend talks to the Node.js + MongoDB API (separate `backend` project). Set `VITE_API_BASE_URL` to the backend URL (see `.env.example`). Roles are enforced on the server.
