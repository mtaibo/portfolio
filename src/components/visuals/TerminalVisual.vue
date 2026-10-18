<template>
  <div class="w-full h-full flex flex-col font-mono text-[12px] md:text-[13px] leading-[1.7]" role="img" aria-label="Terminal running the update command on each of my machines">
    <div class="flex items-center gap-6 px-5 py-3 border-b border-hair">
      <div class="flex gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full border border-smoke"></span>
        <span class="w-2.5 h-2.5 rounded-full border border-smoke"></span>
        <span class="w-2.5 h-2.5 rounded-full border border-smoke"></span>
      </div>
      <div class="flex gap-5 text-[12px]">
        <span v-for="(h, i) in hosts" :key="h.name" class="transition-colors duration-500" :class="i === current ? 'text-bone' : 'text-smoke'">{{ h.name }}</span>
      </div>
    </div>

    <div class="flex-1 px-5 py-4 text-ash overflow-hidden">
      <p>
        <span class="text-smoke">migueltaibo@{{ host.name }}</span>
        <span class="text-smoke"> ~ </span>
        <span class="text-bone">{{ typed }}</span><span class="caret" :class="{ hidden: typed.length === command.length && shown > 0 }">▍</span>
      </p>
      <p v-for="(line, i) in host.output.slice(0, shown)" :key="host.name + i" :class="line.startsWith('✓') ? 'text-signal' : ''">
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({ live: { type: Boolean, default: false } })

const command = 'update'
const hosts = [
  {
    name: 'macbook',
    output: ['sudo darwin-rebuild switch --flake ~/Dotfiles#macbook', 'building the system configuration...', 'activating home-manager configuration for migueltaibo', 'setting up Kitty icon and ⌘K shortcut', '✓ macbook is up to date'],
  },
  {
    name: 'desktop',
    output: ['sudo nixos-rebuild switch --flake ~/dotfiles#desktop', 'building Hyprland, NVIDIA and GRUB theme...', 'activating the configuration...', 'restarting sddm.service', '✓ desktop is up to date'],
  },
  {
    name: 'tphome',
    output: ['home-manager switch --flake ~/dotfiles#tphome', 'fetching SSH keys from github.com/mtaibo.keys', 'checking dnsmasq for tp.home', 'linking zsh, starship and neovim', '✓ tphome is up to date'],
  },
]

const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const current = ref(0)
const typed = ref(reduce ? command : '')
const shown = ref(reduce ? hosts[0].output.length : 0)
const host = computed(() => hosts[current.value])

let timer = null
const wait = (ms) => new Promise((r) => (timer = setTimeout(r, ms)))
let running = false

async function loop() {
  if (running || reduce) return
  running = true
  while (props.live) {
    typed.value = ''
    shown.value = 0
    await wait(500)
    for (const ch of command) {
      if (!props.live) break
      typed.value += ch
      await wait(110)
    }
    await wait(350)
    for (let i = 0; i < host.value.output.length && props.live; i++) {
      shown.value = i + 1
      await wait(i === 0 ? 450 : 520)
    }
    await wait(2200)
    current.value = (current.value + 1) % hosts.length
  }
  running = false
}

watch(() => props.live, (live) => { if (live) loop() }, { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.caret {
  color: var(--color-signal);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>
