<template>
  <div class="bg-ink text-bone min-h-screen">
    <LanguageToggle />
    <router-view />
  </div>
</template>

<script setup>
import LanguageToggle from './components/LanguageToggle.vue'
</script>
