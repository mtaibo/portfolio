<template>
  <section class="min-h-screen flex items-center justify-center px-6 py-24">
    <div class="max-w-4xl w-full fade-in-section">
      <h2 class="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-12">
        Projects
      </h2>

      <div class="space-y-8">
        <a
          v-for="project in projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block group border border-neutral-800 rounded-lg p-6 md:p-8 hover:border-neutral-600 transition-all duration-300"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div class="space-y-3 flex-1">
              <h3 class="text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">
                {{ project.name }}
              </h3>
              <p class="text-neutral-400 leading-relaxed">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="text-xs text-neutral-500 border border-neutral-800 rounded-full px-3 py-1"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-600 group-hover:text-neutral-400 transition-colors shrink-0 mt-1">
              <path d="M7 17L17 7"/>
              <path d="M7 7h10v10"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    name: 'TPHome',
    description: 'Self-hosted home automation system built from scratch. Custom firmware for ESP devices, FastAPI backend on a Raspberry Pi, and a Vue frontend — all running on a local network with MQTT orchestration.',
    tech: ['Vue', 'FastAPI', 'C++', 'MQTT', 'PlatformIO'],
    url: 'https://github.com/mtaibo/tphome',
  },
  {
    name: 'HackUDC 2026 — Inditex Challenge',
    description: 'Visual clothing search engine using CLIP and FAISS embeddings. Built during a 48-hour hackathon as part of the Inditex AI challenge at the Faculty of Computer Science (UDC).',
    tech: ['Python', 'CLIP', 'FAISS', 'Jupyter'],
    url: 'https://github.com/mtaibo/hackUDC26_reto_inditex',
  },
  {
    name: 'Dotfiles',
    description: 'Fully reproducible development environment managed with Nix flakes. One command sets up my MacBook, NixOS desktop, and Raspberry Pi — same shell, same editor, same tools.',
    tech: ['Nix', 'NixOS', 'Nix Darwin'],
    url: 'https://github.com/mtaibo/dotfiles',
  },
]
</script>
