<template>
  <svg :viewBox="g.viewBox" class="w-full h-full" role="img" aria-label="TPCloud architecture: internet, Cloudflare tunnel, gateway, auth and modules">
    <!-- connections -->
    <g fill="none" stroke-linecap="round">
      <path :d="`M${g.cx} 58 V${g.gateway.y}`" class="stroke-smoke" stroke-width="1.25" stroke-dasharray="3 5" />
      <path :d="`M${g.cx + g.gateway.w / 2} ${g.gateway.y + 22} H${g.auth.x - g.auth.w / 2}`" class="stroke-smoke" stroke-width="1.25" />
      <path v-for="m in g.modules" :key="m.id" :d="`M${g.cx} ${gatewayBottom} ${branch(m)}`" class="stroke-hair" stroke-width="1.25" />
      <path v-for="t in g.appLinks" :key="'app' + t.id" :d="t.d" class="stroke-hair" stroke-width="1" stroke-dasharray="2 4" />
    </g>

    <!-- internet -->
    <g>
      <circle :cx="g.cx" cy="38" r="16" fill="none" class="stroke-smoke" stroke-width="1.25" />
      <path :d="`M${g.cx - 16} 38h32M${g.cx} 22c-8 9-8 23 0 32M${g.cx} 22c8 9 8 23 0 32`" fill="none" class="stroke-smoke" stroke-width="1" />
      <text :x="g.cx + 28" y="42" class="fill-ash text-[12px]">Internet</text>
      <text :x="g.cx + 12" :y="(58 + g.gateway.y) / 2 + 4" class="fill-ash text-[11px]" opacity="0.7">Cloudflare Tunnel</text>
    </g>

    <!-- gateway + auth -->
    <g>
      <rect :x="g.cx - g.gateway.w / 2" :y="g.gateway.y" :width="g.gateway.w" height="44" rx="10" class="fill-ink stroke-bone/60" stroke-width="1.25" />
      <text :x="g.cx" :y="g.gateway.y + 27" text-anchor="middle" class="fill-bone text-[13px]">gateway</text>
      <rect :x="g.auth.x - g.auth.w / 2" :y="g.gateway.y" :width="g.auth.w" height="44" rx="10" class="fill-ink stroke-smoke" stroke-width="1.25" />
      <text :x="g.auth.x" :y="g.gateway.y + 27" text-anchor="middle" class="fill-ash text-[13px]">auth</text>
      <circle
        class="auth-pulse fill-signal"
        :cx="g.auth.x - g.auth.w / 2"
        :cy="g.gateway.y + 22"
        r="3"
        :style="{ '--reach': `${-(g.auth.x - g.auth.w / 2 - g.cx - g.gateway.w / 2)}px` }"
      />
    </g>

    <!-- modules -->
    <g v-for="m in g.modules" :key="m.id">
      <rect :x="m.x - g.moduleW / 2" :y="m.y" :width="g.moduleW" height="44" rx="10" class="fill-ink stroke-smoke" stroke-width="1.25" />
      <text :x="m.x" :y="m.y + 27" text-anchor="middle" class="fill-ash text-[12px]">{{ m.label }}</text>
    </g>

    <!-- native app -->
    <g>
      <image href="/projects/tpapp-icon.png" :x="g.app.x" :y="g.app.y" width="44" height="44" />
      <text :x="g.app.x + 54" :y="g.app.y + 26" class="fill-ash text-[12px]">TPApp</text>
    </g>

    <!-- requests -->
    <circle
      v-for="(m, i) in g.modules"
      :key="'p' + m.id"
      r="2.6"
      class="packet fill-signal"
      :style="{ offsetPath: `path('M${g.cx} 58 V${gatewayBottom} ${branch(m)}')`, animationDelay: `${i * 1.3}s` }"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useCompact } from '../../composables/useCompact.js'

const compact = useCompact()

const labels = { login: 'login', accounts: 'accounts', cloud: 'cloud', store: 'store', share: 'share', home: 'tphome', admin: 'admin' }
const mod = (id, x, y, bus) => ({ id, label: labels[id], x, y, bus })

// Wide layout: every module on one row. Compact layout: two rows, with the second row's
// wires passing through the gaps of the first so nothing crosses a box.
const wide = {
  viewBox: '0 0 800 480',
  cx: 400,
  gateway: { y: 146, w: 104 },
  auth: { x: 612, w: 88 },
  moduleW: 88,
  modules: [72, 180, 288, 400, 512, 620, 728].map((x, i) => mod(Object.keys(labels)[i], x, 308, 250)),
  app: { x: 652, y: 396 },
}
wide.appLinks = [400, 620, 728].map((x) => ({ id: x, d: `M${x} 352 V398 Q${x} 418 ${(x + 640) / 2} 418 H652` }))

const narrow = {
  viewBox: '0 0 400 600',
  cx: 200,
  gateway: { y: 150, w: 104 },
  auth: { x: 330, w: 80 },
  moduleW: 80,
  modules: [
    mod('login', 56, 290, 240), mod('accounts', 152, 290, 240), mod('cloud', 248, 290, 240), mod('store', 344, 290, 240),
    mod('share', 104, 384, 240), mod('home', 200, 384, 240), mod('admin', 296, 384, 240),
  ],
  app: { x: 178, y: 506 },
}
narrow.appLinks = [
  { id: 'home', d: 'M200 428 V506' },
  { id: 'admin', d: 'M296 428 V476 Q296 488 284 488 H218 Q210 488 210 496 V506' },
  { id: 'store', d: 'M344 334 V476 Q344 488 332 488 H296' },
]

const g = computed(() => (compact.value ? narrow : wide))
const gatewayBottom = computed(() => g.value.gateway.y + 44)

const branch = (m) => {
  const cx = g.value.cx
  if (m.x === cx) return `V${m.y}`
  const dir = m.x < cx ? -1 : 1
  return `V${m.bus - 12} Q${cx} ${m.bus} ${cx + dir * 12} ${m.bus} H${m.x - dir * 12} Q${m.x} ${m.bus} ${m.x} ${m.bus + 12} V${m.y}`
}
</script>

<style scoped>
text {
  font-family: var(--font-sans);
}
.packet {
  offset-rotate: 0deg;
  opacity: 0;
  animation: travel 3.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}
.auth-pulse {
  opacity: 0;
  animation: auth 1.3s ease-in-out infinite;
}
@keyframes travel {
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 1; }
  85% { offset-distance: 100%; opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}
@keyframes auth {
  0%, 20% { transform: translateX(0); opacity: 0; }
  30% { opacity: 1; }
  45% { transform: translateX(var(--reach)); opacity: 1; }
  55%, 100% { transform: translateX(var(--reach)); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .packet, .auth-pulse { display: none; }
}
</style>
