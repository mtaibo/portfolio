<template>
  <div class="fixed top-6 right-6 z-50 flex items-center gap-2 text-sm font-medium select-none">
    <button
      @click="setLang('en')"
      :class="lang === 'en' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'"
      class="transition-colors duration-200"
    >EN</button>
    <span class="text-neutral-700">·</span>
    <button
      @click="setLang('es')"
      :class="lang === 'es' ? 'text-white' : 'text-neutral-600 hover:text-neutral-400'"
      class="transition-colors duration-200"
    >ES</button>
  </div>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { lang, setLang } = useLanguage()
</script>
