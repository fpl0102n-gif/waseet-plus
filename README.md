# Waseet+ (MVP scaffold)
This scaffold is an MVP for Waseet+ using Next.js (App Router), TypeScript, Tailwind and Prisma (SQLite for local dev).
## Quick start
1. Install deps: `pnpm install` (or `npm install`)
2. Copy env: `cp .env.example .env`
3. Run migrations (prisma): `npx prisma migrate dev --name init`
4. Run dev server: `pnpm dev`
## Notes
- API routes `/api/parse-product` and `/api/create-order` are implemented with mocked logic for testing.
- Replace parse logic with real scraping/affiliate API later.
