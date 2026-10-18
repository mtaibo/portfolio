<template>
  <div class="fixed top-6 right-6 md:top-8 md:right-12 z-50 flex items-center gap-3 text-[13px] select-none">
    <button
      v-for="code in ['en', 'es']"
      :key="code"
      @click="setLang(code)"
      :aria-pressed="lang === code"
      :class="lang === code ? 'text-bone' : 'text-smoke hover:text-ash'"
      class="transition-colors duration-300 uppercase tracking-wide"
    >{{ code }}</button>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { lang, setLang } = useLanguage()
</script>
