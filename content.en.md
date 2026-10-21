# Website text - English

Every text shown on migueltaibo.com in English.

The website does **not** read this file: the real texts live in `src/content/index.js`. Each heading shows the key (`like.this`) the text maps to there, so a change here can be copied to the right place.

Keep the keys as they are. Change only the text below them.

---

## Hero

_Home, first screen_

**`hero.name`**

Miguel Taibo

**`hero.statement`**

I study Software Engineering at UDC and build my own infrastructure: firmware, servers and native apps.

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

A personal cloud on a Raspberry Pi 5. Single sign-on, files, photo backup, a server dashboard and a native app.

**`projects.items[0].facts`**

- Raspberry Pi 5
- Passkeys and 2FA
- iOS and macOS app
- No open ports

### TPHome

**`projects.items[1].name`**

TPHome

**`projects.items[1].tagline`**

Custom firmware for the blind switches in my house, with a Raspberry Pi backend and a live floor plan.

**`projects.items[1].facts`**

- ESP8266 firmware
- Binary MQTT protocol
- Real-time floor plan

### HackUDC 2026 — Inditex Challenge

**`projects.items[2].name`**

HackUDC 2026 — Inditex Challenge

**`projects.items[2].tagline`**

Visual search: give it a fashion photo and it finds the products in the catalogue. Built as a team over one weekend.

**`projects.items[2].facts`**

- Fine-tuned CLIP
- FAISS search
- Trained without a GPU

### Dotfiles

**`projects.items[3].name`**

Dotfiles

**`projects.items[3].tagline`**

A Nix flake that sets up my laptop, my desktop and my server with a single command.

**`projects.items[3].facts`**

- macOS
- NixOS
- Raspberry Pi OS

## About

_Home, after the projects_

**`about.heading`**

Self-taught since I was twelve.

**`about.body`**

I focus on backend and systems architecture. In my projects I build every layer, from the hardware to the interface, to understand and control how the whole thing works.

**`about.storyLink`**

My story

## Contact

_Home, footer_

**`contact.heading`**

Contact

**`contact.subheading`**

Looking for a backend or infrastructure internship.

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

Features

**`projectDetail.architecture`**

Architecture

**`projectDetail.challenges`**

Challenges

**`projectDetail.viewOnGitHub`**

View on GitHub

**`projectDetail.next`**

Next project

### TPCloud (/tpcloud)

**`projectDetail.projects.tpcloud.name`**

TPCloud

**`projectDetail.projects.tpcloud.description`**

A self-hosted personal cloud on a Raspberry Pi 5. Single sign-on for every service on migueltaibo.com, file storage, photo backup, an admin panel and a native app for iPhone and Mac.

**`projectDetail.projects.tpcloud.overview`**

Every service on my server had its own login, its own port and its own way in from outside. TPCloud brings them together. A gateway, reachable only through a Cloudflare Tunnel, checks every request against an auth service shared by all subdomains. Each service is an independent module that plugs into that core. The system replaces Google Drive, iCloud Photos and a handful of standalone apps.

**`projectDetail.projects.tpcloud.modules[0].name`**

Core: gateway & auth

**`projectDetail.projects.tpcloud.modules[0].description`**

Caddy routes each subdomain and checks every request against the auth service. Passkeys on the web, password and TOTP in the native app. Sessions can be reviewed and revoked from any device.

**`projectDetail.projects.tpcloud.modules[1].name`**

TPStore

**`projectDetail.projects.tpcloud.modules[1].description`**

File and photo storage. Resumable chunked uploads, thumbnails, ZIP support and password-protected share links. It's where the iPhone backs up its photos.

**`projectDetail.projects.tpcloud.modules[2].name`**

TPApp

**`projectDetail.projects.tpcloud.modules[2].description`**

A native SwiftUI app for iPhone and Mac that replaces the web interfaces: files, a gallery with background photo backup, home control on the live floor plan, and account settings.

**`projectDetail.projects.tpcloud.modules[3].name`**

TPAdmin

**`projectDetail.projects.tpcloud.modules[3].description`**

A server admin panel built for the phone. System temperature and health, containers and their logs, one-tap redeploys and Claude Code sessions on the Pi.

**`projectDetail.projects.tpcloud.features`**

- Single sign-on across every subdomain, with passkeys or password and TOTP
- No open ports: access only through a Cloudflare Tunnel
- Resumable chunked uploads and password-protected share links
- Background iPhone photo backup, deduplicated and organised by date
- Native iOS and macOS app with Liquid Glass
- Server dashboard with health, logs and redeploys

**`projectDetail.projects.tpcloud.architecture`**

Everything runs on a Raspberry Pi 5 with Docker Compose. A Caddy gateway behind cloudflared routes each subdomain to its container on a shared Docker network. Before letting a request through, it asks the FastAPI auth service whether the session cookie is valid. TPStore and TPHome live in their own repositories and join that network as modules. TPAdmin runs on the host as a systemd service. TPApp talks to every API directly.

**`projectDetail.projects.tpcloud.challenges`**

The first challenge was designing an auth flow that works in both the browser and a native app. The second was keeping the modules in separate repositories while sharing a single login. The third was making photo backup survive iOS suspending the app. With everything exposed to the internet, security shaped every design decision.

### TPHome (/tphome)

**`projectDetail.projects.tphome.name`**

TPHome

**`projectDetail.projects.tphome.description`**

Home automation built end to end. C++ firmware for commercial blind switches, a FastAPI backend on a Raspberry Pi, a binary MQTT protocol and a live floor plan of the house.

**`projectDetail.projects.tphome.overview`**

Every device in the house needed its own app and its own cloud, with no way to change how it behaved. I replaced the switches' factory firmware with my own and built the remaining layers: C++ firmware, a Python backend on a Raspberry Pi and a Vue dashboard with the floor plan. The devices only talk to a broker on the local network.

**`projectDetail.projects.tphome.features`**

- Custom C++ firmware for ESP8266 blind controllers, with OTA updates
- Binary MQTT protocol designed from scratch
- Time-based position tracking: the first press stops the blind at 20%
- Automatic discovery and provisioning of new devices
- Interactive SVG floor plan with updates over WebSocket
- Built into TPApp as its Home tab

**`projectDetail.projects.tphome.architecture`**

The switches connect over WiFi to a Mosquitto broker on the Raspberry Pi. The FastAPI backend translates REST commands into MQTT, parses each device's 2-byte state, stores it in SQLite and pushes events to the frontend over WebSocket. Access from outside the house goes through the TPCloud gateway, behind the same login as every other service.

**`projectDetail.projects.tphome.challenges`**

The chips have 80 KB of RAM. The firmware avoids dynamic memory and blocking code entirely, and tracks the blind's position from time alone, since there's no sensor. The hardest part was making it reliable through WiFi drops and reconnections. Support for BK7231N chips is in progress.

### HackUDC 2026 — Inditex Challenge (/hackudc26)

**`projectDetail.projects.hackudc26.name`**

HackUDC 2026 — Inditex Challenge

**`projectDetail.projects.hackudc26.description`**

Visual fashion search built as a team over one weekend. Given a photo of an outfit, it returns the most similar products in the catalogue using a fine-tuned CLIP model and FAISS.

**`projectDetail.projects.hackudc26.overview`**

Inditex provided thousands of editorial photos of complete outfits along with its product catalogue. The challenge was to identify which products appear in each photo using only the image. We solved it as a team of first-year Software Engineering and Data Engineering students. You upload a photo by file or URL and the system returns the products ranked by visual similarity.

**`projectDetail.projects.hackudc26.features`**

- OpenCLIP ViT-B/32 fine-tuned on outfit–product pairs with a contrastive loss
- FAISS index over the catalogue with millisecond searches
- FastAPI backend with file and URL endpoints
- Web frontend with drag and drop and a similarity score
- Deployed with Docker Compose

**`projectDetail.projects.hackudc26.architecture`**

Every catalogue product is embedded once with the fine-tuned encoder and stored in a FAISS inner-product index. On each search, the photo goes through the same encoder and FAISS returns the closest products. The API sends them back with their image, description and score.

**`projectDetail.projects.hackudc26.challenges`**

We had no GPU, so all the fine-tuning ran on CPU in Google Colab. To fit the training into a weekend, we only unfroze the last four blocks of the image encoder.

### Dotfiles (/dotfiles)

**`projectDetail.projects.dotfiles.name`**

Dotfiles

**`projectDetail.projects.dotfiles.description`**

One Nix flake for all my machines. A single command sets up my MacBook, my NixOS desktop and the server's Raspberry Pi with the same shell, editors and tools.

**`projectDetail.projects.dotfiles.overview`**

I used to set up each machine by hand and no two ended up the same. Now the whole environment is defined in code: one flake describes all three machines, and any of them can be rebuilt from scratch with a single command.

**`projectDetail.projects.dotfiles.features`**

- One flake with nix-darwin, NixOS and standalone Home Manager configurations
- Shared shell, editor and package modules for every machine
- Zsh, Starship, Kitty, Neovim and VS Code declared in Nix
- Hyprland desktop with NVIDIA on NixOS
- One-line bootstrap for a fresh Raspberry Pi
- An update command that rebuilds the current machine

**`projectDetail.projects.dotfiles.architecture`**

flake.nix defines one configuration per machine. Each host declares only what sets it apart and imports the shared Home Manager modules. The Mac and the desktop use the full set; the Pi, just the shell and Neovim. Plain config files live in an assets folder and are symlinked into place.

**`projectDetail.projects.dotfiles.challenges`**

Keeping a single source of truth for macOS, NixOS and Raspberry Pi OS without filling the config with special cases. Nix makes it possible, but it took several rewrites to find a module structure that scaled.

## Story

_/story_

**`story.backToHome`**

Back to home

**`story.heading`**

My story

**`story.subheading`**

How I started programming and what I've built since.

### Early childhood

**`story.entries[0].era`**

Childhood

**`story.entries[0].title`**

LEGO

**`story.entries[0].body`**

I'd build LEGO sets in a single sitting, however big they were. Whenever anyone asked, I told them I wanted to be an inventor.

### Primary school

**`story.entries[1].era`**

Primary school

**`story.entries[1].title`**

Scratch & robotics

**`story.entries[1].body`**

I wrote my first programs in Scratch at school, alongside robotics classes. A visit to MUNCIT in A Coruña brought me closer to real robots. At home I kept making Scratch projects.

### Age 12

**`story.entries[2].era`**

Age 12

**`story.entries[2].title`**

Python

**`story.entries[2].body`**

That summer I started the Python course at Mastermind, Nate Gentile's academy. I spent several hours a day programming.

### Age 12 — same summer

**`story.entries[3].era`**

Age 12

**`story.entries[3].title`**

Linux & cybersecurity

**`story.entries[3].body`**

Next I took Savitar's cybersecurity course, also at Mastermind. I learned Linux, networking and virtual machines, and started working from the terminal.

### Age 15–16

**`story.entries[4].era`**

Age 15–16

**`story.entries[4].title`**

Web development

**`story.entries[4].body`**

In my third and fourth year of secondary school I learned HTML, CSS and JavaScript from Dalto, Hola Mundo and midudev tutorials, and built calculators and small websites. That's when I saw that what interested me was the backend: the logic and the architecture.

### Bachillerato

**`story.entries[5].era`**

Bachillerato

**`story.entries[5].title`**

University entrance exams

**`story.entries[5].body`**

I put personal projects aside to prepare for the university entrance exams and get into Software Engineering at UDC. Around that time I started working with AI tools.

### Age 18 — University, year 1

**`story.entries[6].era`**

Age 18 · University, year 1

**`story.entries[6].title`**

TPHome

**`story.entries[6].body`**

I started Software Engineering at Universidade da Coruña and, alongside it, TPHome: firmware, backend and frontend from scratch. Today it controls the blinds in my house.

### Age 19

**`story.entries[7].era`**

Age 19

**`story.entries[7].title`**

TPCloud

**`story.entries[7].body`**

In the summer of 2026 I started TPCloud. It began as a single login for my services and now includes file storage, iPhone photo backup, a server dashboard and a native SwiftUI app. It's still a work in progress.

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
- Description: Computer Science student at UDC. I build complete systems: firmware, backend and native apps.
