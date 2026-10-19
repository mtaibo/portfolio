<template>
  <section class="px-6 md:px-12 pt-24 md:pt-36 pb-36 md:pb-52 max-w-[1320px] mx-auto border-t border-hair">
    <div class="grid md:grid-cols-12 gap-10 md:gap-14">
      <p class="display md:col-span-7 text-bone text-3xl md:text-5xl leading-[1.12] max-w-[22ch]">
        {{ t.about.heading }}
      </p>
      <div class="md:col-span-5 md:pt-3">
        <p class="text-ash text-lg leading-relaxed max-w-[44ch]">{{ t.about.body }}</p>
        <router-link to="/story" class="link inline-block mt-8 text-bone text-sm">{{ t.about.storyLink }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { t } = useLanguage()
</script>
