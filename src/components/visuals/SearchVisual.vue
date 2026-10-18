<template>
  <svg :viewBox="g.viewBox" class="w-full h-full" :class="{ live }" role="img" aria-label="Visual search: a photo of a jacket returns the most similar catalogue products with their similarity score">
    <!-- query -->
    <g>
      <rect :x="g.query.x" :y="g.query.y" :width="g.query.w" :height="g.query.h" rx="14" fill="none" class="stroke-smoke" stroke-width="1.25" />
      <path :d="items.jacket" :transform="`translate(${g.query.x + g.query.w / 2 - 60} ${g.query.y + g.query.h / 2 - 60}) scale(1.5)`" fill="none" class="stroke-bone/80" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round" />
      <rect :x="g.query.x" :y="g.query.y" :width="g.query.w" height="2" class="scan fill-signal" :style="{ '--scan': `${g.query.h - 2}px` }" />
      <text :x="g.query.x" :y="g.query.y + g.query.h + 26" class="fill-ash text-[12px]">{{ lang === 'es' ? 'tu foto' : 'your photo' }}</text>
    </g>

    <!-- arrow between -->
    <path :d="g.arrow" class="stroke-smoke" stroke-width="1.25" fill="none" stroke-linecap="round" stroke-linejoin="round" />

    <!-- results: always visible; only the best match lights up after each scan -->
    <g v-for="(r, i) in results" :key="i">
      <rect :x="col(i)" :y="row(i)" width="132" height="138" rx="12" fill="none" class="stroke-hair" :class="{ best: i === 0 }" stroke-width="1.25" />
      <path :d="items[r.item]" :transform="`translate(${col(i) + 36} ${row(i) + 18}) scale(0.8)`" fill="none" class="stroke-bone/70" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" />
      <rect :x="col(i) + 14" :y="row(i) + 112" width="104" height="2" rx="1" class="fill-hair" />
      <rect :x="col(i) + 14" :y="row(i) + 112" :width="104 * r.score" height="2" rx="1" class="fill-signal" :opacity="0.45 + r.score * 0.55" />
      <text :x="col(i) + 118" :y="row(i) + 104" text-anchor="end" class="fill-ash text-[11px]">{{ Math.round(r.score * 100) }}%</text>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage.js'
import { useCompact } from '../../composables/useCompact.js'

defineProps({ live: { type: Boolean, default: false } })
const { lang } = useLanguage()
const compact = useCompact()

// Simple garment outlines, drawn on a 80×80 grid.
const items = {
  jacket: 'M28 6 L40 14 L52 6 L70 16 L78 44 L66 48 L64 30 L64 76 L16 76 L16 30 L14 48 L2 44 L10 16 Z M40 14 L40 76 M30 8 L40 30 L50 8',
  shirt: 'M26 6 Q40 16 54 6 L74 18 L66 32 L58 28 L58 76 L22 76 L22 28 L14 32 L6 18 Z',
  coat: 'M28 4 L40 12 L52 4 L68 12 L76 50 L64 52 L62 30 L62 78 L18 78 L18 30 L16 52 L4 50 L12 12 Z M40 12 L34 78 M48 40 h6 M48 54 h6',
  trousers: 'M18 4 H62 L66 78 H46 L40 28 L34 78 H14 Z',
  bag: 'M14 30 H66 L70 76 H10 Z M28 30 V20 Q28 8 40 8 Q52 8 52 20 V30',
  shoe: 'M6 52 L6 34 Q16 34 22 26 L34 30 Q44 44 74 50 Q78 60 72 62 L8 62 Z M6 62 V56',
}
const results = [
  { item: 'jacket', score: 0.94 },
  { item: 'coat', score: 0.88 },
  { item: 'shirt', score: 0.71 },
  { item: 'trousers', score: 0.62 },
  { item: 'bag', score: 0.48 },
  { item: 'shoe', score: 0.41 },
]

// Wide: photo on the left, results on the right. Compact: photo on top, results below.
const layouts = {
  wide: {
    viewBox: '0 0 800 480',
    query: { x: 40, y: 90, w: 230, h: 300 },
    arrow: 'M296 240 H330 M324 234 L330 240 L324 246',
    grid: { x: 350, y: 92 },
  },
  compact: {
    viewBox: '0 0 480 680',
    query: { x: 125, y: 24, w: 230, h: 260 },
    arrow: 'M240 330 V356 M234 350 L240 356 L246 350',
    grid: { x: 21, y: 376 },
  },
}
const g = computed(() => layouts[compact.value ? 'compact' : 'wide'])
const col = (i) => g.value.grid.x + (i % 3) * 146
const row = (i) => g.value.grid.y + Math.floor(i / 3) * 154
</script>

<style scoped>
text { font-family: var(--font-sans); }
.scan { opacity: 0; }
.live .scan { animation: scan 6s ease-in-out infinite; }
.live .best { animation: best 6s ease-in-out infinite; }

@keyframes scan {
  0% { transform: translateY(0); opacity: 0; }
  5% { opacity: 1; }
  30% { transform: translateY(var(--scan)); opacity: 1; }
  34%, 100% { transform: translateY(var(--scan)); opacity: 0; }
}
@keyframes best {
  0%, 32% { stroke: var(--color-hair); }
  42%, 70% { stroke: var(--color-signal); }
  90%, 100% { stroke: var(--color-hair); }
}
@media (prefers-reduced-motion: reduce) {
  .live .scan, .live .best { animation: none; }
}
</style>
