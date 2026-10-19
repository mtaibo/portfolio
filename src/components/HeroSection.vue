<template>
  <!-- On phones the hero is exactly one screen tall and the diagram shrinks to fit what's left -->
  <section class="h-[100svh] min-h-[640px] md:h-auto md:min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-20 md:pt-24 pb-8 md:pb-16 max-w-[1320px] mx-auto">
    <div class="intro">
      <h1 class="display text-bone text-[clamp(3.5rem,11vw,10rem)] leading-[0.92]">
        <a href="https://cloud.migueltaibo.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;cursor:text;user-select:text;">{{ t.hero.name }}</a>
      </h1>

      <div class="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <p class="text-ash text-lg md:text-xl leading-relaxed max-w-[34ch]">
          {{ t.hero.statement }}
        </p>
        <SocialLinks class="shrink-0" />
      </div>
    </div>

    <div class="mt-10 md:mt-24 flex-1 min-h-0 md:flex-none">
      <HeroLine :labels="t.hero.stack" class="h-full md:h-auto" />
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
import HeroLine from './visuals/HeroLine.vue'
import SocialLinks from './SocialLinks.vue'
const { t } = useLanguage()
</script>

<style scoped>
.intro {
  animation: rise 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
</style>
