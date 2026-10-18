<template>
  <svg :viewBox="padded" class="w-full h-full" role="img" aria-label="TPHome floor plan with the blinds it controls">
    <!-- rooms -->
    <g fill="none" class="stroke-bone/40" stroke-width="1.5" stroke-linejoin="round">
      <rect v-for="(r, i) in plan.rooms" :key="i" :x="r.x" :y="r.y" :width="r.w" :height="r.h" />
    </g>
    <!-- door openings cut into the walls -->
    <g class="stroke-ink" stroke-width="3.5" stroke-linecap="butt">
      <line v-for="(d, i) in plan.doors" :key="i" :x1="d.x1" :y1="d.y1" :x2="d.x2" :y2="d.y2" />
    </g>
    <!-- blinds, opening and closing one after another -->
    <g>
      <rect
        v-for="(b, i) in plan.blinds"
        :key="i"
        :x="b.x" :y="b.y" :width="b.width" :height="b.height" rx="1.5"
        class="blind fill-signal"
        :class="b.width > b.height ? 'horizontal' : 'vertical'"
        :style="{ animationDelay: `${i * 1.4}s`, transformOrigin: `${b.x}px ${b.y}px` }"
      />
      <rect
        v-for="(b, i) in plan.blinds"
        :key="'o' + i"
        :x="b.x" :y="b.y" :width="b.width" :height="b.height" rx="1.5"
        fill="none" class="stroke-signal/40" stroke-width="0.75"
      />
    </g>
  </svg>
</template>

<script setup>
import plan from '../../data/floorplan.js'
const [, , w, h] = plan.viewBox.split(' ').map(Number)
const padded = `-20 -20 ${w + 40} ${h + 40}`
</script>

<style scoped>
.blind {
  animation: blind 7s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
.blind.horizontal { --axis: scaleX; }
.blind.vertical { --axis: scaleY; }
.blind.horizontal { animation-name: blind-x; }
.blind.vertical { animation-name: blind-y; }

@keyframes blind-x {
  0%, 15% { transform: scaleX(1); opacity: 0.9; }
  40%, 65% { transform: scaleX(0.2); opacity: 0.55; }
  90%, 100% { transform: scaleX(1); opacity: 0.9; }
}
@keyframes blind-y {
  0%, 15% { transform: scaleY(1); opacity: 0.9; }
  40%, 65% { transform: scaleY(0.2); opacity: 0.55; }
  90%, 100% { transform: scaleY(1); opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .blind { animation: none; }
}
</style>
