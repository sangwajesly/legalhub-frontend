# LegalHub Frontend

This directory contains the Next.js frontend application for LegalHub.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Database/Auth Integration:** Firebase Client SDK

## Getting Started

First, install the dependencies and configure the environment:

```bash
# Install dependencies
npm install

# Create local environment config
copy .env.example .env.local
```

Edit `.env.local` to specify your backend API base URL:
- `NEXT_PUBLIC_API_BASE_URL` — Backend API base (default: `http://localhost:8001/api`)

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
