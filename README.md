<div align="center">

# Portfolio

**My personal site, [migueltaibo.com](https://migueltaibo.com).**

<br/>

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Made with](https://img.shields.io/badge/made%20with-Vue%20%7C%20Tailwind-blue)
![Hosted on](https://img.shields.io/badge/hosted%20on-Cloudflare-lightgrey)

</div>

---

This is the source of [migueltaibo.com](https://migueltaibo.com), my personal site. A minimal, dark, single-page portfolio with who I am, what I work with and the projects I've built, each with its own page, plus the longer story of how I got into programming. It's fully bilingual: everything can be read in English or Spanish.

## What's on the site

<table>
<tr>
<td width="33%" valign="top">

### 🏠 Home
Hero, a short bio, the tech stack I use day to day, my projects and how to reach me. A language toggle switches the whole site between English and Spanish and remembers the choice.

</td>
<td width="33%" valign="top">

### 📖 Story
A timeline of how I got here, from my first lines of code to the systems I run today, at [`/story`](https://migueltaibo.com/story).

</td>
<td width="33%" valign="top">

### 🧩 Project pages
A detail page for each project: [TPHome](https://migueltaibo.com/tphome), [HackUDC 2026](https://migueltaibo.com/hackudc26) and my [dotfiles](https://migueltaibo.com/dotfiles).

</td>
</tr>
</table>

## How it's built

There's no CMS and no backend. Every text on the site, in both languages, lives in a single file, [`src/content/index.js`](src/content/index.js), and the components only read from it. Changing the bio or adding a project means editing that file, nothing else.

```
src/
├── content/index.js      # All texts, in English and Spanish
├── composables/          # useLanguage: current language, saved in localStorage
├── router/               # Home, /story and one route per project
├── views/                # Home, StoryView, ProjectDetail
└── components/           # Hero, About, Skills, Projects, Contact, LanguageToggle
```

The build is a static bundle served from Cloudflare's edge as Workers static assets, with single-page-app fallback so direct links like `/tphome` work.

## Tech stack

| Layer | Technology |
|---|---|
| **Framework** | Vue 3 · Vue Router |
| **Styling** | Tailwind CSS 4 |
| **Build** | Vite |
| **Hosting** | Cloudflare Workers (static assets) |

## How to run

```bash
git clone https://github.com/mtaibo/portfolio
cd portfolio
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
```
