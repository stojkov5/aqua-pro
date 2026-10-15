# Aqua Pro Swim

Website for Aqua Pro swimming club — [aquaproswim.com](https://aquaproswim.com).

React + Vite front-end, deployed on **Vercel**. Server code lives in `api/`
(Vercel serverless functions), which is where secret keys are used.

- **Supabase**: shop products, orders and order items (`supabase/*.sql`)
- **Resend**: order emails sent from `shop@aquaproswim.com`

## Project structure

```
api/
  order.js           POST /api/order — saves the order in Supabase, emails it via Resend
  _lib/              Server-only helpers (not exposed as endpoints)
public/              Static files served as-is (images, PDFs, translations)
src/
  components/        UI sections and shop cart
  pages/             Route pages
  Layout/            Shared layout (navbar, footer)
  lib/               Supabase client and data fetching
  styles/            Per-component CSS
  routes.jsx         App routes
supabase/            SQL to set up the database (run in order in the SQL Editor)
vercel.json          Vercel build + SPA routing config
.env.example         List of required environment variables (no real values)
```

## Managing the shop

- **Products**: Supabase → Table Editor → `products`. Change prices, set
  `is_active` to false to hide a product, `sort_order` to reorder. Images are
  paths to files in `public/Products/`.
- **Orders**: Supabase → Table Editor → `orders` (and `order_items`). Update
  `status` as an order progresses: new → confirmed → paid → completed.

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
