<template>
  <main class="px-6 md:px-12 pt-8 pb-24 max-w-[1320px] mx-auto">
    <a href="/" @click="handleBack" class="link inline-block text-sm text-ash hover:text-bone">{{ t.story.backToHome }}</a>

    <header class="intro mt-16 md:mt-24">
      <h1 class="display text-bone text-[clamp(3rem,8vw,7rem)] leading-[0.95]">{{ t.story.heading }}</h1>
      <p class="text-ash text-lg mt-6 max-w-[40ch]">{{ t.story.subheading }}</p>
    </header>

    <ol class="timeline relative mt-20 md:mt-32">
      <li
        v-for="(entry, i) in t.story.entries"
        :key="i"
        class="entry relative grid md:grid-cols-12 gap-3 md:gap-14 pl-8 md:pl-0 pb-14 md:pb-20"
      >
        <span class="dot" :class="{ last: i === t.story.entries.length - 1 }"></span>
        <p class="md:col-span-3 md:text-right text-sm text-ash md:pt-2">{{ entry.era }}</p>
        <div class="md:col-span-7 md:col-start-5">
          <h2 class="display text-bone text-2xl md:text-4xl leading-tight">{{ entry.title }}</h2>
          <p class="text-ash leading-relaxed mt-3 max-w-[60ch]">{{ entry.body }}</p>
        </div>
      </li>
    </ol>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const router = useRouter()
const { t } = useLanguage()

const handleBack = (e) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey) return
  e.preventDefault()
  router.push('/')
}
</script>

<style scoped>
/* The line sits between the era column and the text on desktop, on the left edge on mobile. */
.timeline::before {
  content: '';
  position: absolute;
  top: 0.6rem;
  bottom: 0;
  left: 3px;
  width: 1px;
  background: linear-gradient(var(--color-hair), var(--color-smoke) 85%, var(--color-signal));
}
.dot {
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--color-ink);
  border: 1px solid var(--color-ash);
}
.dot.last {
  background: var(--color-signal);
  border-color: var(--color-signal);
  box-shadow: 0 0 0 5px rgba(191, 208, 219, 0.12);
}
@media (min-width: 768px) {
  .timeline::before { left: calc(25% + 1.75rem); }
  .dot { left: calc(25% + 1.75rem - 3px); top: 0.75rem; }
}
.intro {
  animation: rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
</style>
