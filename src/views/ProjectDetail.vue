<template>
  <div class="min-h-screen bg-black text-white px-6 py-12">
    <div class="max-w-4xl mx-auto">
      <a
        href="/"
        @click.prevent="goBack"
        class="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        Back to home
      </a>

      <div class="fade-in-section visible">
        <h1 class="text-4xl md:text-5xl font-medium text-white mb-6">
          {{ project.name }}
        </h1>

        <p class="text-xl text-neutral-300 leading-relaxed mb-8">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-12">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="text-sm text-neutral-400 border border-neutral-700 rounded-full px-4 py-2"
          >
            {{ tech }}
          </span>
        </div>

        <div class="prose prose-invert max-w-none">
          <div class="space-y-8">
            <div v-if="project.overview" class="border border-neutral-800 rounded-lg p-6">
              <h2 class="text-2xl font-medium text-white mb-4">Overview</h2>
              <p class="text-neutral-300 leading-relaxed">{{ project.overview }}</p>
            </div>

            <div v-if="project.features" class="border border-neutral-800 rounded-lg p-6">
              <h2 class="text-2xl font-medium text-white mb-4">Key Features</h2>
              <ul class="space-y-3">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex items-start gap-3 text-neutral-300"
                >
                  <span class="text-neutral-500 mt-1">•</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div v-if="project.architecture" class="border border-neutral-800 rounded-lg p-6">
              <h2 class="text-2xl font-medium text-white mb-4">Architecture</h2>
              <p class="text-neutral-300 leading-relaxed">{{ project.architecture }}</p>
            </div>

            <div v-if="project.challenges" class="border border-neutral-800 rounded-lg p-6">
              <h2 class="text-2xl font-medium text-white mb-4">Challenges & Learnings</h2>
              <p class="text-neutral-300 leading-relaxed">{{ project.challenges }}</p>
            </div>
          </div>
        </div>

        <div class="mt-12 flex gap-4">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 border border-neutral-700 rounded-lg px-6 py-3 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  projectId: String
})

const goBack = () => {
  router.push({ path: '/', state: { scrollTo: 'projects' } })
}

const projects = {
  tphome: {
    name: 'TPHome',
    description: 'Self-hosted home automation system built from scratch. Custom firmware for ESP devices, FastAPI backend on a Raspberry Pi, and a Vue frontend — all running on a local network with MQTT orchestration.',
    tech: ['Vue', 'FastAPI', 'C++', 'MQTT', 'PlatformIO'],
    github: 'https://github.com/mtaibo/tphome',
    overview: 'TPHome is a complete home automation solution designed to run entirely on a local network without any cloud dependencies. The system consists of custom ESP32/ESP8266 firmware, a FastAPI backend running on a Raspberry Pi, and a Vue.js frontend for control and monitoring.',
    features: [
      'Custom C++ firmware for ESP32/ESP8266 devices with OTA updates',
      'MQTT-based communication for real-time device control',
      'FastAPI backend with REST API and WebSocket support',
      'Vue.js dashboard with real-time device status',
      'Local network only — no cloud dependencies',
      'Support for multiple sensor types and actuators'
    ],
    architecture: 'The system follows a hub-and-spoke architecture with the Raspberry Pi acting as the central hub. ESP devices connect via MQTT to publish sensor data and receive commands. The FastAPI backend handles business logic and persistence, while the Vue frontend provides the user interface.',
    challenges: 'Building a reliable IoT system from scratch taught me a lot about embedded systems, network protocols, and real-time communication. The biggest challenge was ensuring reliability and handling edge cases like network interruptions and device reconnections.'
  },
  hackudc26: {
    name: 'HackUDC 2026 — Inditex Challenge',
    description: 'Visual clothing search engine using CLIP and FAISS embeddings. Built during a 48-hour hackathon as part of the Inditex AI challenge at the Faculty of Computer Science (UDC).',
    tech: ['Python', 'CLIP', 'FAISS', 'Jupyter'],
    github: 'https://github.com/mtaibo/hackUDC26_reto_inditex',
    overview: 'A visual search engine for clothing items that uses OpenAI\'s CLIP model to generate embeddings and FAISS for efficient similarity search. Users can upload an image of clothing and find visually similar items from a catalog.',
    features: [
      'CLIP model for generating image embeddings',
      'FAISS index for fast similarity search',
      'Support for multiple image formats',
      'Real-time search results',
      'Built in 48 hours during a hackathon'
    ],
    architecture: 'The system pre-computes CLIP embeddings for the entire clothing catalog and stores them in a FAISS index. At query time, the user\'s image is embedded using the same CLIP model, and FAISS performs an approximate nearest neighbor search to find the most similar items.',
    challenges: 'The main challenge was optimizing the embedding computation and search to work within the hackathon time constraints while maintaining good accuracy. We also had to handle various image qualities and styles.'
  },
  dotfiles: {
    name: 'Dotfiles',
    description: 'Fully reproducible development environment managed with Nix flakes. One command sets up my MacBook, NixOS desktop, and Raspberry Pi — same shell, same editor, same tools.',
    tech: ['Nix', 'NixOS', 'Nix Darwin'],
    github: 'https://github.com/mtaibo/dotfiles',
    overview: 'A declarative, reproducible development environment configuration using Nix flakes. The same configuration sets up multiple machines (MacBook, NixOS desktop, Raspberry Pi) with identical tools, shell, and editor setup.',
    features: [
      'Nix flakes for reproducible builds',
      'Cross-platform support (macOS, NixOS, Raspberry Pi)',
      'Declarative system configuration',
      'Home-manager for user environment',
      'Neovim configuration with LSP support',
      'Custom shell setup with zsh and useful aliases'
    ],
    architecture: 'The configuration uses Nix flakes as the entry point, with separate modules for each machine type. Home-manager handles user-level configuration, while system-level configuration is handled by NixOS or nix-darwin depending on the platform.',
    challenges: 'The biggest challenge was creating a configuration that works seamlessly across different platforms while maintaining a single source of truth. Nix\'s declarative nature made this possible, but required careful planning of the module structure.'
  }
}

const project = projects[props.projectId]
</script>
