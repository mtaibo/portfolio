# Website text — English

Every text shown on migueltaibo.com in English. Edit it here and ask Claude to apply it.

The website does **not** read this file: the real texts live in `src/content/index.js`. Each heading shows the key (`like.this`) the text maps to there, so a change here can be copied to the right place.

Keep the keys as they are. Change only the text below them.

---

## Hero

_Home, first screen_

**`hero.name`**

Miguel Taibo

**`hero.statement`**

I build my own infrastructure, from the firmware on a wall switch to the app on my phone.

**`hero.stack`**

- Switch firmware
- Home server
- Personal cloud
- Native app

_The four labels under the diagram, left to right (top to bottom on phones)._

## Projects

_Home, project list_

**`projects.label`**

Projects

**`projects.more`**

Read more

### TPCloud

**`projects.items[0].name`**

TPCloud

**`projects.items[0].tagline`**

My own cloud on a Raspberry Pi: one login, my files and photos, a server panel and a native app.

**`projects.items[0].facts`**

- Raspberry Pi 5
- Passkeys and 2FA
- iOS and macOS app
- No open ports

### TPHome

**`projects.items[1].name`**

TPHome

**`projects.items[1].tagline`**

My own firmware on the blind switches of my house, controlled from a live floor plan.

**`projects.items[1].facts`**

- ESP8266 firmware
- Binary MQTT protocol
- Real-time floor plan

### HackUDC 2026 — Inditex Challenge

**`projects.items[2].name`**

HackUDC 2026 — Inditex Challenge

**`projects.items[2].tagline`**

Find the products in a fashion photo by how they look. Built in one weekend with my team.

**`projects.items[2].facts`**

- Fine-tuned CLIP
- FAISS search
- Trained without a GPU

### Dotfiles

**`projects.items[3].name`**

Dotfiles

**`projects.items[3].tagline`**

One Nix flake that rebuilds my laptop, my desktop and my server with a single command.

**`projects.items[3].facts`**

- macOS
- NixOS
- Raspberry Pi OS

## About

_Home, after the projects_

**`about.heading`**

Self-taught since I was twelve. Studying Software Engineering at UDC.

**`about.body`**

I've always wanted to understand how things work underneath. Backend and architecture are where I'm strongest, and I like owning every layer of what I build.

**`about.storyLink`**

Read my story

## Contact

_Home, footer_

**`contact.heading`**

Let's talk.

**`contact.subheading`**

Open to internships, collaborations and good conversations about systems.

**`contact.email`**

contact@migueltaibo.com

**`contact.copyright`**

© 2026 Miguel Taibo

## Project pages

_/tpcloud, /tphome, /hackudc26, /dotfiles_

### Shared labels

**`projectDetail.backToHome`**

Back to home

**`projectDetail.overview`**

Overview

**`projectDetail.modules`**

Modules

**`projectDetail.features`**

Key Features

**`projectDetail.architecture`**

Architecture

**`projectDetail.challenges`**

Challenges & Learnings

**`projectDetail.viewOnGitHub`**

View on GitHub

**`projectDetail.next`**

Next project

### TPCloud (/tpcloud)

**`projectDetail.projects.tpcloud.name`**

TPCloud

**`projectDetail.projects.tpcloud.description`**

My own personal cloud, self-hosted on a Raspberry Pi. One login for everything under migueltaibo.com, file storage and photo backup, a control panel for the server, and a native app for iPhone and Mac.

**`projectDetail.projects.tpcloud.overview`**

Every service I added to my server needed its own login, its own port and its own way of being reached from outside. TPCloud turns all of them into a single cloud: one gateway exposed only through a Cloudflare Tunnel, one auth service that signs me in once for every subdomain, and a set of modules that plug into it. It's my replacement for Google Drive, iCloud Photos and a pile of separate apps, running on hardware I own.

**`projectDetail.projects.tpcloud.modules[0].name`**

Core: gateway & auth

**`projectDetail.projects.tpcloud.modules[0].description`**

Caddy routes each subdomain and checks every request against my auth service. Passkeys on the web, password + TOTP for the native app, and sessions I can see and revoke from anywhere.

**`projectDetail.projects.tpcloud.modules[1].name`**

TPStore

**`projectDetail.projects.tpcloud.modules[1].description`**

My storage and photo cloud: a file browser with resumable uploads, thumbnails and ZIP support, public share links with passwords, and the backend my iPhone backs its photos up to.

**`projectDetail.projects.tpcloud.modules[2].name`**

TPApp

**`projectDetail.projects.tpcloud.modules[2].description`**

A native SwiftUI app for iPhone and Mac that replaces the web frontends: files, a Photos-style gallery with background backup, my house on a live floor plan, and account settings.

**`projectDetail.projects.tpcloud.modules[3].name`**

TPAdmin

**`projectDetail.projects.tpcloud.modules[3].description`**

The admin panel for the server: temperature and health, every container and its logs, one-tap redeploys, and Claude Code sessions running on the Pi, all from my phone.

**`projectDetail.projects.tpcloud.features`**

- Single sign-on across every subdomain with passkeys or password + TOTP
- No open ports: everything is reached through a Cloudflare Tunnel
- File storage with resumable chunked uploads and password-protected share links
- iPhone photo backup in the background, deduplicated and organised by date
- Native iOS and macOS app with Liquid Glass and a Photos-style gallery
- Server dashboard with health, logs and one-tap redeploys

**`projectDetail.projects.tpcloud.architecture`**

Everything runs on a Raspberry Pi 5 with Docker Compose. A Caddy gateway sits behind cloudflared and routes each subdomain to its container on a shared Docker network, asking the FastAPI auth service to validate the session cookie before letting a request through. TPStore and TPHome live in their own repos and join that network as modules, TPAdmin runs on the host as a systemd service, and TPApp talks to all of their APIs directly.

**`projectDetail.projects.tpcloud.challenges`**

TPCloud taught me to think in systems instead of single apps: designing an auth flow that works for both browsers and a native app, keeping modules independent while sharing one login, and making photo backup survive an app being suspended by iOS. It also made me care a lot more about security, since everything is reachable from the internet.

### TPHome (/tphome)

**`projectDetail.projects.tphome.name`**

TPHome

**`projectDetail.projects.tphome.description`**

Home automation built from scratch. My own firmware on commercial blind switches, a FastAPI backend on a Raspberry Pi talking to them over a binary MQTT protocol, and a live floor plan of the house.

**`projectDetail.projects.tphome.overview`**

I got tired of needing a different app and a different cloud for every device in my house, none of which let me change how they behave. So I opened the switches, replaced the factory firmware with my own, and built every layer on top: C++ firmware on the chips, a Python backend on a Raspberry Pi and a Vue control panel with a live floor plan of the house. The devices only talk to a broker on my local network.

**`projectDetail.projects.tphome.features`**

- Custom C++ firmware for ESP8266 blind controllers, with OTA updates
- Compact binary MQTT protocol designed from scratch
- Time-based position tracking: a blind stops at 20% on the first press down
- Automatic discovery and provisioning of new devices
- Interactive SVG floor plan with real-time updates over WebSocket
- Also available as the Home tab of my native app

**`projectDetail.projects.tphome.architecture`**

The switches connect over WiFi to a Mosquitto broker on the Raspberry Pi. The FastAPI backend bridges REST commands to MQTT, parses each device's 2-byte state, stores it in SQLite and pushes live events to the frontend over WebSocket. From outside my network it's reached through the TPCloud gateway, behind the same login as everything else.

**`projectDetail.projects.tphome.challenges`**

Writing firmware for chips with 80 KB of RAM forced me to avoid dynamic memory and blocking code entirely, and to track a blind's position from time alone since there's no sensor. Making it reliable through WiFi drops and reconnections took far longer than making it work the first time. Support for BK7231N chips is still in progress.

### HackUDC 2026 — Inditex Challenge (/hackudc26)

**`projectDetail.projects.hackudc26.name`**

HackUDC 2026 — Inditex Challenge

**`projectDetail.projects.hackudc26.description`**

Visual fashion search built with my team in one weekend. Upload a photo of an outfit and get the most similar products in the catalogue, using a fine-tuned CLIP model and FAISS.

**`projectDetail.projects.hackudc26.overview`**

Inditex gave us thousands of editorial photos of models wearing full looks and a catalogue of products, and asked us to find which products appear in each photo from the image alone. We built it at HackUDC 2026 as a team of first-year Software Engineering and Data Engineering students: upload a photo by file or URL and get the closest products, ranked by visual similarity.

**`projectDetail.projects.hackudc26.features`**

- OpenCLIP ViT-B/32 fine-tuned on bundle–product pairs with a contrastive loss
- FAISS index over the catalogue for millisecond searches
- FastAPI backend with file and URL endpoints
- Simple web frontend with drag and drop and similarity scores
- Fully containerised with Docker Compose

**`projectDetail.projects.hackudc26.architecture`**

Every catalogue product is embedded once with the fine-tuned image encoder and stored in a FAISS inner-product index. At query time, the uploaded photo goes through the same encoder and FAISS returns its nearest products, which the API sends back with their image, description and score.

**`projectDetail.projects.hackudc26.challenges`**

We had no GPU, so the whole fine-tune ran on CPU in Google Colab. That meant only unfreezing the last four blocks of the image encoder and getting the most out of very limited compute in a single weekend.

### Dotfiles (/dotfiles)

**`projectDetail.projects.dotfiles.name`**

Dotfiles

**`projectDetail.projects.dotfiles.description`**

One Nix flake for every machine I use. A single command sets up my MacBook, my NixOS desktop and the Raspberry Pi that runs my home server: same shell, same editors, same tools.

**`projectDetail.projects.dotfiles.overview`**

I used to set up every machine by hand and each one ended up slightly different. Now my whole environment is code: a single Nix flake describes my MacBook, my NixOS desktop and my Raspberry Pi, and any of them can be rebuilt from scratch with one command.

**`projectDetail.projects.dotfiles.features`**

- One flake with nix-darwin, NixOS and standalone Home Manager configurations
- Shared modules for the shell, editors and packages on every machine
- Zsh, Starship, Kitty, Neovim and VS Code declared in Nix
- Hyprland desktop with NVIDIA on NixOS
- One-line bootstrap for a fresh Raspberry Pi
- An update command that rebuilds whichever machine I’m on

**`projectDetail.projects.dotfiles.architecture`**

flake.nix defines one configuration per machine. Each host only declares what makes it unique and imports the shared Home Manager modules: the Mac and the desktop take the full set, the Pi only the shell and Neovim. Plain config files live in an assets folder and are symlinked into place.

**`projectDetail.projects.dotfiles.challenges`**

The hard part was keeping a single source of truth across three very different systems (macOS, NixOS and Raspberry Pi OS) without the config turning into a maze of special cases. Nix makes it possible, but it took a few rewrites to get the module structure right.

## Story

_/story_

**`story.backToHome`**

Back to home

**`story.heading`**

My full story

**`story.subheading`**

From LEGO sets to distributed systems.

### Early childhood

**`story.entries[0].era`**

Early childhood

**`story.entries[0].title`**

Builder by nature

**`story.entries[0].body`**

Before I ever touched a computer, I was obsessed with building things. I spent my afternoons constructing LEGO sets piece by piece — whatever the size, I'd finish them in a single sitting. I told everyone I wanted to be an inventor.

### Primary school

**`story.entries[1].era`**

Primary school

**`story.entries[1].title`**

Scratch & robotics

**`story.entries[1].body`**

At school I got my first taste of programming through Scratch, and started going to robotics classes — USB drive in hand — to program things on the school computers. I visited MUNCIT in A Coruña to see real robots. I loved it. At home I kept making little Scratch projects just for fun.

### Age 12

**`story.entries[2].era`**

Age 12

**`story.entries[2].title`**

Python & Mastermind

**`story.entries[2].body`**

The summer I turned 12, I found Nate Gentile on YouTube and discovered his Mastermind Academy. I started his Python course and was immediately hooked — no AI, no shortcuts, just raw code. I spent hours programming every day.

### Age 12 — same summer

**`story.entries[3].era`**

Age 12 — same summer

**`story.entries[3].title`**

Cybersecurity, Linux & the terminal

**`story.entries[3].body`**

Right after Python, I took Savitar's cybersecurity course on Mastermind. It opened up a whole new world: Linux, networking, virtual machines, terminal customization. I was twelve years old and already spinning up VMs and reading man pages.

### Age 15–16

**`story.entries[4].era`**

Age 15–16

**`story.entries[4].title`**

Web development & the backend pull

**`story.entries[4].body`**

In my third and fourth year of secondary school I picked up HTML, CSS, and JavaScript — mostly through Dalto's YouTube tutorials. I built simple calculators and small websites. Other creators like Hola Mundo and Midu Dev deepened my understanding of the web, and it became clear that what I actually loved was the backend: the logic, the architecture, the systems underneath.

### Bachillerato

**`story.entries[5].era`**

Bachillerato

**`story.entries[5].title`**

Head down, eyes on the goal

**`story.entries[5].body`**

I stepped back from personal projects to focus on my university entrance exams. The goal was clear: Computer Science at UDC. This was also when AI started appearing everywhere — I began tinkering with it early, long before it became mainstream.

### Age 18 — University, year 1

**`story.entries[6].era`**

Age 18 — University, year 1

**`story.entries[6].title`**

TPHome

**`story.entries[6].body`**

I started my Computer Science degree at Universidade Da Coruña and, in parallel, began TPHome. I designed the firmware, the backend, and the frontend entirely from scratch. Today it controls the blinds in my house — end to end, with software I wrote myself.

### Age 19

**`story.entries[7].era`**

Age 19

**`story.entries[7].title`**

TPCloud

**`story.entries[7].body`**

This summer I started TPCloud, my own personal cloud. It began as a single login for my services and grew into file storage, photo backup from my iPhone, a control panel for my server and a native SwiftUI app that ties it all together. It's the most ambitious thing I've built so far — and I'm not done yet.

## Fixed text

_Not in src/content/index.js; written directly in the components and the same in both languages unless noted_

**`src/components/SocialLinks.vue`**

- GitHub
- LinkedIn
- Email

**`src/components/visuals/CloudVisual.vue (TPCloud diagram)`**

- Browser
- TPApp
- Internet
- Cloudflare Tunnel
- gateway
- auth
- login, accounts, cloud, store, share, tphome, admin

**`src/components/visuals/SearchVisual.vue (HackUDC diagram, translated)`**

- your photo

**`src/components/visuals/TerminalVisual.vue (Dotfiles terminal)`**

Command `update` and the output lines for macbook, desktop and tphome.

**`index.html (browser tab and link previews, English only)`**

- Title: Miguel Taibo
- Description: Computer Science student at UDC, building systems end to end, from custom firmware to backend and frontend.
