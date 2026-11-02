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
One continuous take: scrolling dives through the "o" of my name into my personal cloud and my home's floor plan, its walls turn into a point cloud you can search, the points spell `update`, the blocks it installs become my NixOS desktop, and its last check mark opens Grade, before pulling back out to my name. A language toggle switches the whole site between English and Spanish and remembers the choice.

</td>
<td width="33%" valign="top">

### 📖 Story
A timeline of how I got here, from my first lines of code to the systems I run today, at [`/story`](https://migueltaibo.com/story).

</td>
<td width="33%" valign="top">

### 🧩 Project pages
A page for each project, with a pinned scene that plays as you scroll: [TPCloud](https://migueltaibo.com/tpcloud), [TPHome](https://migueltaibo.com/tphome), [HackUDC 2026](https://migueltaibo.com/hackudc26) and my [dotfiles](https://migueltaibo.com/dotfiles).

</td>
</tr>
</table>

## How it's built

There's no CMS and no backend. Every text on the site, in both languages, lives in a single file, [`src/content/index.js`](src/content/index.js), and the components only read from it. Changing the bio or the story means editing that file and nothing else; a new project only needs its entry there, a route and a visual.

The motion is plain SVG and canvas, with no animation library, drawn from real data. The home page is one scroll-driven take in [`src/components/journey/`](src/components/journey/). Each project page pins a scene in [`src/components/stage/`](src/components/stage/) with three moments, one per text, and the camera dives from one to the next:

| Project | Overview | Architecture | Challenges |
|---|---|---|---|
| **TPCloud** | Every module waking behind one login | A request crossing the tunnel, the gateway and auth | The passkey and password + TOTP ways in |
| **TPHome** | The floor plan from [tphome](https://github.com/mtaibo/tphome) | A press going down through every layer | A working switch and the two bytes it publishes |
| **HackUDC** | A point cloud you can search | A photo through the encoder and FAISS | The encoder blocks that were trained |
| **Dotfiles** | The flake branching into three machines | The modules each machine imports | `update` running on each of them |

Scenes respect reduced motion, and work on phones.

```
src/
├── content/index.js      # All texts, in English and Spanish
├── data/                 # TPHome's floor plan, what each machine imports and prints
├── composables/          # useLanguage
├── router/               # Home, /story and one route per project
├── views/                # Home, StoryView, ProjectDetail
└── components/
    ├── journey/          # The home page: Journey.vue, journey.js, journey.css
    ├── stage/            # The project pages' pinned scenes: ProjectStage.vue, scenes.js
    └── …                 # LanguageToggle, SocialLinks
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
