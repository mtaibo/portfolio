# migueltaibo.com — Under Construction

A minimal "Under Construction" landing page for [migueltaibo.com](https://migueltaibo.com), built with Vue 3, Vite, and Tailwind CSS. Hosted on Cloudflare Pages.

## Tech Stack

- **Vue 3** — Frontend framework
- **Vite** — Build tool and dev server
- **Tailwind CSS v4** — Utility-first CSS framework
- **Cloudflare Pages** — Hosting and deployment

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/)

### Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repository to GitHub
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages**
3. Connect your GitHub repository
4. Configure the build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` (or later)
5. Click **Save and Deploy**

Cloudflare Pages will automatically build and deploy your site on every push to the main branch.

## Project Structure

```
portfolio/
├── public/
│   └── _redirects          # Cloudflare Pages SPA routing
├── src/
│   ├── assets/
│   ├── App.vue             # Main under construction page
│   ├── main.js             # App entry point
│   └── style.css           # Tailwind imports + custom animations
├── index.html
├── vite.config.js
└── package.json
```

## License

Private — All rights reserved
