# LegalHub Frontend (app-specific)

This file contains focused setup and developer instructions for the `nextjs-app/` Next.js frontend.

## Purpose
The frontend is built with Next.js (App Router) and contains the Chat UI, Lawyer discovery & booking, and Bookings dashboard. The backend (see `../BackendREADME.md`) is separate and optional for purely UI testing.

## Node / Environment
- This project targets Node 18+. Use a Node version manager (`nvm`, `nvm-windows`, or `Volta`) to pin your local Node runtime.
- `.nvmrc` is included with version `18`.
- A small helper script `setup-dev.sh` is included to install dependencies and copy `.env.example` → `.env.local`.

> Note: A Python `venv` is not required for this Node/Next.js project. `venv` is for Python dependency isolation. If you need Python tooling later, we can add a `requirements.txt` and `venv` steps then.

## Quick start

From the repo root or from `nextjs-app/` run:

```bash
cd /c/Users/DESTO/Desktop/legalhub-frontend/nextjs-app
# Install dependencies and create .env.local
./setup-dev.sh
# Start dev server
npm run dev
# Open http://localhost:3000
```

If you are on Windows and cannot execute `setup-dev.sh`, open PowerShell and run:

```powershell
# Install deps
npm install
# Create .env.local
copy .env.example .env.local
# Start
npm run dev
```

## Environment variables
Edit `.env.local` as needed. Key used by frontend:
- `NEXT_PUBLIC_API_BASE_URL` — backend API base (default: `http://localhost:5000/api`)

## Helpful notes
- If you don't have the backend running, the UI will still render; API calls will fail gracefully and show error messages — you can still test UI flows, modals, and local behaviors.
- If you want a local mock API for full end-to-end testing, tell me and I can add a small mock server (`json-server` or Express). 

## Development checklist
- [ ] Ensure Node 18+ installed (use `nvm`/`Volta`)
- [ ] Run `./setup-dev.sh` (or `npm install` + copy `.env.local`)
- [ ] Run `npm run dev`
- [ ] Visit `/chat`, `/lawyers`, `/bookings`

If you'd like, I can also add a `dev:mock` script that starts the app with a small mocked API for faster UI testing.
