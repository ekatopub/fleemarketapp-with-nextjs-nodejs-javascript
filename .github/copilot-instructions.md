# Copilot Instructions for next-market

## Project Overview
- This is a Next.js project (TypeScript, App Router) bootstrapped with `create-next-app`.
- The codebase uses both the `/app` and `/pages` directories. `/app` is for new features (App Router), `/pages` for legacy or API routes.
- API endpoints are under `/pages/api/` (e.g., `/pages/api/item/[id].js`).
- Business logic and utilities are in `/utils/` (e.g., `auth.js`, `database.js`, `schemaModels.js`).

## Key Patterns & Conventions
- **API Routing:**
  - RESTful endpoints for `item` and `user` resources: CRUD operations are mapped to `/pages/api/item/` and `/pages/api/user/` subfolders.
  - Example: `GET /api/item/[id]` → `/pages/api/item/[id].js`, `POST /api/item/create.js`, `DELETE /api/item/delete/[id].js`.
- **Authentication:**
  - Auth logic is in `/utils/auth.js` and `/pages/api/user/login.js`/`register.js`.
  - Sessions/tokens are likely handled in these files (check for custom logic).
- **Data Access:**
  - Database models and queries are in `/utils/database.js` and `/utils/schemaModels.js`.
- **Secrets Management:**
  - Sensitive config is stored in `secrets.yaml` (unencrypted) and `/pages/secrets/secrets.yaml.enc` (encrypted). Never commit secrets to version control.

## Developer Workflows
- **Start Dev Server:** `npm run dev` (or `yarn dev`, `pnpm dev`, `bun dev`)
- **Edit Main Page:** Modify `/app/page.tsx` for the main UI.
- **API Development:** Edit or add files in `/pages/api/` for backend logic.
- **Global Styles:** `/app/globals.css` is the main stylesheet.
- **TypeScript Config:** See `tsconfig.json` for type settings.
- **ESLint:** Project uses `eslint.config.mjs` for linting rules.

## Integration Points
- **External:**
  - No explicit external APIs or services are documented in README, but check `/utils/` for integrations.
- **Frontend/Backend:**
  - Frontend (React/Next.js) in `/app` and `/pages` communicates with backend via `/pages/api/` endpoints.

## Examples
- To add a new API endpoint for items: create a file in `/pages/api/item/` (e.g., `archive.js` for `POST /api/item/archive`).
- To update authentication logic: edit `/utils/auth.js` and `/pages/api/user/login.js`.

## References
- Main entry: `/app/page.tsx`
- API: `/pages/api/`
- Utilities: `/utils/`
- Styles: `/app/globals.css`
- Config: `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`

---
If any conventions or workflows are unclear, please ask for clarification or examples from the codebase.