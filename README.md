<div align="center">

# Portfolio

**My personal site, [migueltaibo.com](https://migueltaibo.com).**

<br/>

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Made with](https://img.shields.io/badge/made%20with-Vue%20%7C%20Tailwind-blue)
![Hosted on](https://img.shields.io/badge/hosted%20on-Cloudflare-lightgrey)

</div>

---

This is the source of [migueltaibo.com](https://migueltaibo.com), my personal site. A dark, quiet portfolio where each project is shown through a small animated drawing made from its real data instead of a wall of text, plus the longer story of how I got into programming. It's fully bilingual: everything can be read in English or Spanish.

## What's on the site

<table>
<tr>
<td width="33%" valign="top">

### 🏠 Home
A hero that draws my stack from a switch chip to a phone, my projects with their live visuals, a short bio and how to reach me. A language toggle switches the whole site between English and Spanish and remembers the choice.

</td>
<td width="33%" valign="top">

### 📖 Story
A timeline of how I got here, from my first lines of code to the systems I run today, at [`/story`](https://migueltaibo.com/story).

</td>
<td width="33%" valign="top">

### 🧩 Project pages
A page for each project, with its visual full width: [TPCloud](https://migueltaibo.com/tpcloud), [TPHome](https://migueltaibo.com/tphome), [HackUDC 2026](https://migueltaibo.com/hackudc26) and my [dotfiles](https://migueltaibo.com/dotfiles).

</td>
</tr>
</table>

## How it's built

There's no CMS and no backend. Every text on the site, in both languages, lives in a single file, [`src/content/index.js`](src/content/index.js), and the components only read from it. Changing the bio or the story means editing that file and nothing else; a new project only needs its entry there, a route and a visual.

The project visuals are plain SVG drawn from real data, animated with CSS:

| Project | Visual |
|---|---|
| **TPCloud** | The architecture, with requests travelling from the internet through the gateway to each module |
| **TPHome** | The floor plan from [tphome](https://github.com/mtaibo/tphome), with its blinds opening and closing |
| **HackUDC** | A photo being scanned and its closest products with their similarity |
| **Dotfiles** | A terminal running `update` on each of my machines |

They only animate while they're on screen, switch to a taller layout on phones, and stay still when the system asks for reduced motion.

```
src/
├── content/index.js      # All texts, in English and Spanish
├── data/floorplan.js     # TPHome floor plan used by its visual
├── composables/          # useLanguage, useInView, useCompact
├── router/               # Home, /story and one route per project
├── views/                # Home, StoryView, ProjectDetail
└── components/
    ├── visuals/          # HeroLine, CloudVisual, HomeVisual, SearchVisual, TerminalVisual
    └── …                 # Hero, Projects, About, Contact, LanguageToggle, SocialLinks
```

The build is a static bundle served from Cloudflare's edge as Workers static assets, with single-page-app fallback so direct links like `/tphome` work.

## Tech stack

| Layer | Technology |
|---|---|
| **Framework** | Vue 3 · Vue Router |
| **Styling** | Tailwind CSS 4 · Newsreader and Hanken Grotesk |
| **Visuals** | Hand-drawn SVG · CSS animations |
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
