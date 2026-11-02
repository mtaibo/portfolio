<template>
  <main>
    <header class="px-6 md:px-12 pt-8 max-w-[1320px] mx-auto min-h-[62svh] flex flex-col">
      <a href="/" @click="handleBack" class="link self-start text-sm text-ash hover:text-bone">{{ t.story.backToHome }}</a>
      <div class="mt-auto pb-10 md:pb-16">
        <h1 class="display text-bone text-[clamp(3.5rem,12vw,11rem)] leading-[0.95]" :aria-label="t.story.heading">
          <span v-for="(word, w) in words" :key="`${t.story.heading}-${w}`" class="word" aria-hidden="true"><span v-for="(ch, c) in word" :key="c" class="ch" :style="{ animationDelay: `${(w * 4 + c) * 32}ms` }">{{ ch }}</span></span>
        </h1>
        <p class="sub text-ash text-lg md:text-xl mt-6 max-w-[40ch]">{{ t.story.subheading }}</p>
      </div>
    </header>

    <StoryStage :entries="t.story.entries" :heading="t.story.heading" :more="t.projects.more" />

    <footer class="px-6 md:px-12 py-24 md:py-32 max-w-[1320px] mx-auto border-t border-hair">
      <a href="/" @click="handleBack" class="display group inline-block text-bone text-4xl md:text-6xl transition-colors duration-300 hover:text-signal">{{ t.story.backToHome }}</a>
    </footer>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import StoryStage from '../components/story/StoryStage.vue'

const router = useRouter()
const { t } = useLanguage()

const words = computed(() => t.value.story.heading.split(' ').map((w, i, all) => [...w, ...(i < all.length - 1 ? [' '] : [])]))

// The story's link sits by the about text at the end of the home page, so that's where it returns to.
const handleBack = (e) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey) return
  e.preventDefault()
  router.push({ path: '/', state: { journeyLevel: 7 } })
}
</script>

<style scoped>
.word { display: inline-block; white-space: nowrap; }
.ch { display: inline-block; animation: letter .9s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.sub { animation: letter .9s .35s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
@keyframes letter {
  from { opacity: 0; transform: translateY(.55em) rotate(4deg); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ch, .sub { animation: none; }
}
</style>
