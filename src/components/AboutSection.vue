<template>
  <section class="min-h-screen flex items-center justify-center px-6 py-24">
    <div class="max-w-2xl fade-in-section">
      <h2 class="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">
        {{ t.about.label }}
      </h2>
      <div class="space-y-6">
        <p class="text-xl md:text-2xl text-neutral-200 leading-relaxed">
          {{ t.about.paragraphs[0] }}
        </p>
        <p class="text-lg text-neutral-400 leading-relaxed">
          {{ t.about.paragraphs[1] }}
        </p>
        <p class="text-lg text-neutral-400 leading-relaxed">
          {{ t.about.paragraphs[2] }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { t } = useLanguage()
</script>
