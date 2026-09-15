<template>
  <div class="bg-black text-white">
    <LanguageToggle />
    <router-view />
  </div>
</template>

<script setup>
import LanguageToggle from './components/LanguageToggle.vue'
</script>
