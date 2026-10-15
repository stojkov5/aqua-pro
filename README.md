# Aqua Pro Swim

Website for Aqua Pro swimming club — [aquaproswim.com](https://aquaproswim.com).

React + Vite front-end, deployed on **Vercel**. Server code lives in `api/`
(Vercel serverless functions), which is where secret keys are used.

## Project structure

```
api/                 Vercel serverless functions (server-side, holds secrets)
public/              Static files served as-is (images, PDFs, translations)
src/
  components/        UI sections and shop cart
  pages/             Route pages
  Layout/            Shared layout (navbar, footer)
  data/              Static data
  styles/            Per-component CSS
  routes.jsx         App routes
vercel.json          Vercel build + SPA routing config
.env.example         List of required environment variables (no real values)
```

## Local development

```bash
npm install
npm run dev
```

To run the `api/` functions locally as well, use the Vercel CLI:

```bash
npx vercel dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. In production the
same variables are set in Vercel → Project → Settings → Environment Variables.
Never commit real keys.

## Deployment

Every push to `main` deploys to production on Vercel automatically. Pushes to
other branches get a preview URL.
