<template>
  <div class="hero-line">
    <!-- Mobile: the same four steps stacked vertically, each with its label beside it -->
    <svg viewBox="0 0 320 362" preserveAspectRatio="xMinYMid meet" class="md:hidden w-full max-w-[340px] h-full overflow-visible" role="img" :aria-label="labels.join(', ')">
      <path class="wire stroke-smoke" pathLength="1" fill="none" stroke-width="1.25" d="M60 65 V93 M60 160 V188 M60 258 V286" />
      <g class="stroke-bone/70" fill="none" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
        <g v-for="(step, i) in vertical" :key="i" class="vnode" :style="{ '--d': `${0.2 + i * 0.6}s` }" :transform="step.transform" v-html="icons[i]" />
      </g>
      <text v-for="(step, i) in vertical" :key="'t' + i" x="120" :y="step.labelY" class="label fill-ash" :style="{ '--d': `${0.5 + i * 0.6}s` }">{{ labels[i] }}</text>
      <circle class="packet-v fill-signal" r="2.6" />
    </svg>

    <svg viewBox="0 0 1200 180" class="hidden md:block w-full h-auto overflow-visible" role="img" :aria-label="labels.join(', ')">
      <g class="stroke-bone/70" fill="none" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
        <!-- Switch chip -->
        <g class="node" style="--d: 0.2s">
          <rect x="60" y="60" width="60" height="60" rx="4" pathLength="1" />
          <rect x="76" y="76" width="28" height="28" rx="2" pathLength="1" class="stroke-ash" />
          <path pathLength="1" d="M72 60v-10M84 60v-10M96 60v-10M108 60v-10M72 120v10M84 120v10M96 120v10M108 120v10M60 72h-10M60 84h-10M60 96h-10M60 108h-10M120 72h10M120 84h10M120 96h10M120 108h10" />
        </g>

        <!-- Raspberry Pi -->
        <g class="node" style="--d: 0.9s">
          <rect x="400" y="52" width="140" height="76" rx="6" pathLength="1" />
          <rect x="452" y="74" width="30" height="30" rx="2" pathLength="1" class="stroke-ash" />
          <path pathLength="1" d="M416 62h108" stroke-dasharray="0.01 0.02" />
          <path pathLength="1" d="M540 70h10v14h-10M540 96h10v14h-10" />
          <circle cx="414" cy="116" r="3" pathLength="1" />
          <circle cx="526" cy="116" r="3" pathLength="1" />
        </g>

        <!-- Cloud -->
        <g class="node" style="--d: 1.6s">
          <path pathLength="1" d="M742 124h86a26 26 0 0 0 2-52 38 38 0 0 0-72-6 30 30 0 0 0-16 58z" />
          <path pathLength="1" class="stroke-ash" d="M772 104h40M772 92h28" />
        </g>

        <!-- Phone -->
        <g class="node" style="--d: 2.3s">
          <rect x="1094" y="42" width="54" height="98" rx="11" pathLength="1" />
          <path pathLength="1" d="M1113 50h16" />
          <path pathLength="1" class="stroke-ash" d="M1104 64h10v10h-10zM1116 64h10v10h-10zM1128 64h10v10h-10zM1104 76h10v10h-10zM1116 76h10v10h-10zM1128 76h10v10h-10zM1104 88h10v10h-10zM1116 88h10v10h-10zM1128 88h10v10h-10z" />
        </g>

        <!-- The wire that ties them together -->
        <path
          class="wire stroke-smoke"
          pathLength="1"
          d="M142 90 H388 M562 90 H708 M867 90 H1082"
        />
      </g>

      <!-- A packet travelling the whole stack once the drawing is done -->
      <circle class="packet fill-signal" r="2.6" />
    </svg>

    <ol class="relative h-6 mt-4 text-sm text-ash hidden md:block">
      <li
        v-for="(label, i) in labels"
        :key="label"
        class="label absolute top-0 -translate-x-1/2 whitespace-nowrap"
        :style="{ left: positions[i], '--d': `${0.5 + i * 0.7}s` }"
      >
        {{ label }}
      </li>
    </ol>
  </div>
</template>

<script setup>
defineProps({ labels: { type: Array, required: true } })
// Icon markup shared by the vertical (mobile) version, drawn in the same coordinates as the wide one.
const icons = [
  '<rect x="60" y="60" width="60" height="60" rx="4" pathLength="1"/><rect x="76" y="76" width="28" height="28" rx="2" pathLength="1" class="stroke-ash"/><path pathLength="1" d="M72 60v-10M84 60v-10M96 60v-10M108 60v-10M72 120v10M84 120v10M96 120v10M108 120v10M60 72h-10M60 84h-10M60 96h-10M60 108h-10M120 72h10M120 84h10M120 96h10M120 108h10"/>',
  '<rect x="400" y="52" width="140" height="76" rx="6" pathLength="1"/><rect x="452" y="74" width="30" height="30" rx="2" pathLength="1" class="stroke-ash"/><path pathLength="1" d="M540 70h10v14h-10M540 96h10v14h-10"/><circle cx="414" cy="116" r="3" pathLength="1"/><circle cx="526" cy="116" r="3" pathLength="1"/>',
  '<path pathLength="1" d="M742 124h86a26 26 0 0 0 2-52 38 38 0 0 0-72-6 30 30 0 0 0-16 58z"/><path pathLength="1" class="stroke-ash" d="M772 104h40M772 92h28"/>',
  '<rect x="1094" y="42" width="54" height="98" rx="11" pathLength="1"/><path pathLength="1" d="M1113 50h16"/><path pathLength="1" class="stroke-ash" d="M1104 64h10v10h-10zM1116 64h10v10h-10zM1128 64h10v10h-10zM1104 76h10v10h-10zM1116 76h10v10h-10zM1128 76h10v10h-10zM1104 88h10v10h-10zM1116 88h10v10h-10zM1128 88h10v10h-10z"/>',
]
// Each icon moved so its centre sits on the vertical wire at x=60, scaled to fit.
const vertical = [
  { transform: 'translate(60 30) scale(0.62) translate(-90 -90)', labelY: 35 },
  { transform: 'translate(60 126.4) scale(0.62) translate(-470 -90)', labelY: 131 },
  { transform: 'translate(60 227) scale(0.62) translate(-785 -90)', labelY: 232 },
  { transform: 'translate(60 326.6) scale(0.62) translate(-1121 -91)', labelY: 332 },
]

// Centres of the four drawings, as a share of the 1200-wide viewBox.
const positions = ['7.5%', '39.2%', '65.4%', '93.4%']
</script>

<style scoped>
.node > * {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  animation-delay: var(--d);
}
.node path[stroke-dasharray] {
  animation: none;
  stroke-dashoffset: 0;
  opacity: 0;
  animation: appear 0.6s ease forwards;
  animation-delay: calc(var(--d) + 0.6s);
}

.wire {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 2.6s cubic-bezier(0.45, 0, 0.2, 1) 0.4s forwards;
}

.packet {
  offset-path: path('M142 90 H1082');
  offset-rotate: 0deg;
  opacity: 0;
  animation: travel 5.5s linear 3.4s infinite;
}

.vnode {
  opacity: 0;
  animation: appear 0.9s ease forwards;
  animation-delay: var(--d);
}
.packet-v {
  offset-path: path('M60 65 V286');
  offset-rotate: 0deg;
  opacity: 0;
  animation: travel-v 5.5s linear 3s infinite;
}
text.label {
  font-family: var(--font-sans);
  font-size: 15px;
}

.label {
  opacity: 0;
  animation: appear 0.8s ease forwards;
  animation-delay: var(--d);
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
@keyframes appear {
  to { opacity: 1; }
}
/* The packet only shows on the wires: it fades out at the end of each one, crosses the
   drawing hidden and comes back out on the far side. Distances match the wire gaps. */
@keyframes travel {
  0%        { offset-distance: 0%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  1.5%      { opacity: 1; }
  22%       { opacity: 1; }
  23.5%     { offset-distance: 26.17%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  29.5%     { offset-distance: 44.68%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  31%       { opacity: 1; }
  41.95%    { opacity: 1; }
  43.45%    { offset-distance: 60.21%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  49.45%    { offset-distance: 77.13%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  50.95%    { opacity: 1; }
  68.5%     { opacity: 1; }
  70%, 100% { offset-distance: 100%; opacity: 0; }
}
@keyframes travel-v {
  0%        { offset-distance: 0%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  1.5%      { opacity: 1; }
  17.83%    { opacity: 1; }
  19.33%    { offset-distance: 12.67%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  25.33%    { offset-distance: 42.99%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  26.83%    { opacity: 1; }
  43.17%    { opacity: 1; }
  44.67%    { offset-distance: 55.66%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  50.67%    { offset-distance: 87.33%; opacity: 0; animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1); }
  52.17%    { opacity: 1; }
  68.5%     { opacity: 1; }
  70%, 100% { offset-distance: 100%; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .node > *, .wire { stroke-dashoffset: 0; }
  .label, .vnode, .node path[stroke-dasharray] { opacity: 1; }
  .packet, .vnode {
  opacity: 0;
  animation: appear 0.9s ease forwards;
  animation-delay: var(--d);
}
.packet-v { display: none; }
}
</style>
