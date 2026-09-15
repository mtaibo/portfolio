<template>
  <div class="min-h-screen bg-black text-white px-6 py-12">
    <div class="max-w-2xl mx-auto">
      <a
        href="/"
        @click.prevent="goBack"
        class="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-12"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"/>
          <path d="M12 19l-7-7 7-7"/>
        </svg>
        {{ t.story.backToHome }}
      </a>

      <div class="fade-in-section visible mb-16">
        <h1 class="text-4xl md:text-5xl font-medium text-white mb-3">
          {{ t.story.heading }}
        </h1>
        <p class="text-lg text-neutral-500">{{ t.story.subheading }}</p>
      </div>

      <div class="relative">
        <div class="absolute left-[7px] top-2 bottom-0 w-px bg-neutral-800"></div>

        <div class="space-y-12">
          <div
            v-for="(entry, i) in t.story.entries"
            :key="i"
            class="relative pl-10"
          >
            <div class="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border border-neutral-700 bg-black flex items-center justify-center">
              <div class="w-1.5 h-1.5 rounded-full bg-neutral-500"></div>
            </div>
            <p class="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">{{ entry.era }}</p>
            <h3 class="text-xl font-medium text-white mb-2">{{ entry.title }}</h3>
            <p class="text-neutral-400 leading-relaxed">{{ entry.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'

const router = useRouter()
const { t } = useLanguage()

const goBack = () => {
  router.push('/')
}
</script>
