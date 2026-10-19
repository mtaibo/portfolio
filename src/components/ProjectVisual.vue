<template>
  <div ref="el" class="visual stage" :class="{ 'is-live': inView }">
    <!-- Absolutely filled so every engine gives the visual a definite size; Safari otherwise sizes
         a 100%-height child of an aspect-ratio box against the padding too and clips it. -->
    <div class="absolute inset-0" :class="padded ? 'p-4 md:p-10' : ''">
      <component :is="visual" :live="inView" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useInView } from '../composables/useInView.js'
import CloudVisual from './visuals/CloudVisual.vue'
import HomeVisual from './visuals/HomeVisual.vue'
import SearchVisual from './visuals/SearchVisual.vue'
import TerminalVisual from './visuals/TerminalVisual.vue'

const props = defineProps({ id: { type: String, required: true } })
const { el, inView } = useInView({ threshold: 0.25 })

const visuals = { tpcloud: CloudVisual, tphome: HomeVisual, hackudc26: SearchVisual, dotfiles: TerminalVisual }
const visual = computed(() => visuals[props.id])
const padded = computed(() => props.id !== 'dotfiles')
</script>

<style scoped>
.stage {
  position: relative;
  border: 1px solid var(--color-hair);
  border-radius: 22px;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(237, 235, 230, 0.035), transparent 60%),
    var(--color-ink);
  overflow: hidden;
}
</style>
