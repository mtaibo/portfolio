<template>
  <svg :viewBox="g.viewBox" class="w-full h-full" role="img" aria-label="TPCloud architecture: browser and app, internet, Cloudflare tunnel, gateway, auth and modules">
    <!-- connections -->
    <g fill="none" stroke-linecap="round" stroke-width="1.25">
      <path v-for="(d, id) in g.clientLinks" :key="id" :d="d" class="stroke-hair" />
      <path :d="g.tunnel" class="stroke-smoke" stroke-dasharray="3 5" />
      <path :d="g.authLink" class="stroke-smoke" />
      <path v-for="m in g.modules" :key="m.id" :d="m.link" class="stroke-hair" />
    </g>

    <!-- clients -->
    <g fill="none" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
      <g class="stroke-bone/70">
        <rect :x="g.web.x - 30" :y="g.web.y - 21" width="60" height="42" rx="6" />
        <path :d="`M${g.web.x - 30} ${g.web.y - 10}h60`" />
      </g>
      <path class="stroke-ash" :d="`M${g.web.x - 23} ${g.web.y - 15.5}h.01M${g.web.x - 18} ${g.web.y - 15.5}h.01M${g.web.x - 13} ${g.web.y - 15.5}h.01`" stroke-width="2.5" />
      <g class="stroke-bone/70">
        <rect :x="g.app.x - 17" :y="g.app.y - 30" width="34" height="60" rx="8" />
        <path :d="`M${g.app.x - 5} ${g.app.y - 23}h10`" />
      </g>
      <path class="stroke-ash" stroke-width="1" :d="phoneGrid(g.app.x, g.app.y)" />
    </g>
    <text v-bind="g.webLabel" class="fill-ash" :style="{ fontSize: g.font + 'px' }">Browser</text>
    <text v-bind="g.appLabel" class="fill-ash" :style="{ fontSize: g.font + 'px' }">TPApp</text>

    <!-- internet + tunnel -->
    <g fill="none" class="stroke-smoke">
      <circle :cx="g.globe.x" :cy="g.globe.y" r="18" stroke-width="1.25" />
      <path stroke-width="1" :d="`M${g.globe.x - 18} ${g.globe.y}h36M${g.globe.x} ${g.globe.y - 18}c-9 10-9 26 0 36M${g.globe.x} ${g.globe.y - 18}c9 10 9 26 0 36`" />
    </g>
    <text v-bind="g.globeLabel" class="fill-ash" :style="{ fontSize: g.font + 'px' }">Internet</text>
    <text v-bind="g.tunnelLabel" class="fill-ash" opacity="0.7" :style="{ fontSize: g.font - 1 + 'px' }">Cloudflare Tunnel</text>

    <!-- gateway + auth -->
    <rect v-bind="box(g.gateway)" rx="10" class="fill-ink stroke-bone/60" stroke-width="1.25" />
    <text :x="g.gateway.x" :y="g.gateway.y + 5" text-anchor="middle" class="fill-bone" :style="{ fontSize: g.font + 1 + 'px' }">gateway</text>
    <rect v-bind="box(g.auth)" rx="10" class="fill-ink stroke-smoke" stroke-width="1.25" />
    <text :x="g.auth.x" :y="g.auth.y + 5" text-anchor="middle" class="fill-ash" :style="{ fontSize: g.font + 'px' }">auth</text>
    <circle class="auth-pulse fill-signal" r="3" :style="{ offsetPath: `path('${g.authPulse}')` }" />

    <!-- modules -->
    <g v-for="m in g.modules" :key="m.id">
      <rect v-bind="box(m)" rx="9" class="fill-ink stroke-smoke" stroke-width="1.25" />
      <text :x="m.x" :y="m.y + 5" text-anchor="middle" class="fill-ash" :style="{ fontSize: g.font + 'px' }">{{ m.label }}</text>
    </g>

    <!-- requests: client → internet, tunnel → gateway, gateway → module. Each leg is its own
         dot, hidden while "inside" a node, so nothing ever crosses a box or a label. -->
    <template v-for="(m, i) in g.modules" :key="'p' + m.id">
      <circle
        v-for="(leg, l) in [g.clientLinks[sources[m.id]], g.tunnel, m.link]"
        :key="l"
        r="2.6"
        class="packet fill-signal"
        :class="`leg${l}`"
        :style="{ offsetPath: `path('${leg}')`, animationDelay: `${i * 1.3}s` }"
      />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useCompact } from '../../composables/useCompact.js'

const compact = useCompact()

const labels = { login: 'login', accounts: 'accounts', cloud: 'cloud', store: 'store', share: 'share', home: 'tphome', admin: 'admin' }
// Which client each request comes from: the app talks to login, store, tphome and admin.
const sources = { login: 'app', accounts: 'web', cloud: 'web', store: 'app', share: 'web', home: 'app', admin: 'app' }

// Boxes are stored by their centre.
const box = (b) => ({ x: b.x - b.w / 2, y: b.y - b.h / 2, width: b.w, height: b.h })
const phoneGrid = (x, y) =>
  [-11, -3, 5].flatMap((dx) => [-13, -5, 3].map((dy) => `M${x + dx} ${y + dy}h6v6h-6z`)).join('')

// Rounded elbow from (x1,y1) along one axis to (x2,y2): out, turn at the bus, then in.
const elbowH = (x1, y1, bus, x2, y2) => {
  if (y1 === y2) return `M${x1} ${y1} H${x2}`
  const s = y2 > y1 ? 1 : -1
  return `M${x1} ${y1} H${bus - 12} Q${bus} ${y1} ${bus} ${y1 + s * 12} V${y2 - s * 12} Q${bus} ${y2} ${bus + 12} ${y2} H${x2}`
}
const elbowV = (x1, y1, bus, x2, y2) => {
  if (x1 === x2) return `M${x1} ${y1} V${y2}`
  const s = x2 > x1 ? 1 : -1
  return `M${x1} ${y1} V${bus - 12} Q${x1} ${bus} ${x1 + s * 12} ${bus} H${x2 - s * 12} Q${x2} ${bus} ${x2} ${bus + 12} V${y2}`
}

// Wide: the request flows left to right. Wires stop 10 units short of every node.
const wide = (() => {
  const gateway = { x: 460, y: 200, w: 120, h: 48 }
  const modules = Object.keys(labels).map((id, i) => {
    const m = { id, label: labels[id], x: 755, y: 62 + i * 46, w: 110, h: 36 }
    m.link = elbowH(530, 200, 610, 690, m.y)
    return m
  })
  return {
    viewBox: '0 0 850 400',
    font: 13,
    web: { x: 70, y: 125 },
    app: { x: 70, y: 285 },
    webLabel: { x: 70, y: 166, 'text-anchor': 'middle' },
    appLabel: { x: 70, y: 340, 'text-anchor': 'middle' },
    clientLinks: {
      web: 'M110 125 H150 Q170 125 170 145 V180 Q170 200 190 200 H222',
      app: 'M97 285 H150 Q170 285 170 265 V220 Q170 200 190 200 H222',
    },
    globe: { x: 250, y: 200 },
    globeLabel: { x: 250, y: 242, 'text-anchor': 'middle' },
    tunnel: 'M278 200 H390',
    tunnelLabel: { x: 334, y: 186, 'text-anchor': 'middle' },
    gateway,
    auth: { x: 460, y: 322, w: 100, h: 44 },
    authLink: 'M460 234 V290',
    authPulse: 'M460 290 V234',
    modules,
  }
})()

// Narrow: the same flow top to bottom, modules on two rows whose wires pass through the gaps.
const narrow = (() => {
  const row1 = [56, 152, 248, 344]
  const row2 = [104, 200, 296]
  const modules = Object.keys(labels).map((id, i) => {
    const top = i < 4
    const m = { id, label: labels[id], x: top ? row1[i] : row2[i - 4], y: top ? 458 : 538, w: 80, h: 36 }
    m.link = elbowV(200, 368, 400, m.x, m.y - 28)
    return m
  })
  return {
    viewBox: '0 0 400 580',
    font: 12,
    web: { x: 130, y: 48 },
    app: { x: 270, y: 48 },
    webLabel: { x: 130, y: 98, 'text-anchor': 'middle' },
    appLabel: { x: 270, y: 98, 'text-anchor': 'middle' },
    clientLinks: {
      web: 'M130 112 V130 Q130 142 142 142 H188 Q200 142 200 154 V162',
      app: 'M270 112 V130 Q270 142 258 142 H212 Q200 142 200 154 V162',
    },
    globe: { x: 200, y: 190 },
    globeLabel: { x: 228, y: 194 },
    tunnel: 'M200 218 V300',
    tunnelLabel: { x: 212, y: 263 },
    gateway: { x: 200, y: 334, w: 120, h: 48 },
    auth: { x: 342, y: 334, w: 84, h: 44 },
    authLink: 'M270 334 H290',
    authPulse: 'M290 334 H270',
    modules,
  }
})()

const g = computed(() => (compact.value ? narrow : wide))
</script>

<style scoped>
text {
  font-family: var(--font-sans);
}
.packet {
  offset-rotate: 0deg;
  opacity: 0;
  animation: 3.6s linear infinite;
}
.packet.leg0 { animation-name: leg0; }
.packet.leg1 { animation-name: leg1; }
.packet.leg2 { animation-name: leg2; }
.auth-pulse {
  offset-rotate: 0deg;
  opacity: 0;
  animation: auth 1.3s ease-in-out infinite;
}
@keyframes leg0 {
  0%        { offset-distance: 0%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  4%        { opacity: 1; }
  18%       { opacity: 1; }
  22%, 100% { offset-distance: 100%; opacity: 0; }
}
@keyframes leg1 {
  0%, 28%   { offset-distance: 0%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  32%       { opacity: 1; }
  44%       { opacity: 1; }
  48%, 100% { offset-distance: 100%; opacity: 0; }
}
@keyframes leg2 {
  0%, 54%   { offset-distance: 0%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  58%       { opacity: 1; }
  84%       { opacity: 1; }
  88%, 100% { offset-distance: 100%; opacity: 0; }
}
@keyframes auth {
  0%, 20%   { offset-distance: 0%; opacity: 0; }
  30%       { opacity: 1; }
  45%       { offset-distance: 100%; opacity: 1; }
  55%, 100% { offset-distance: 100%; opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .packet, .auth-pulse { display: none; }
}
</style>
