<template>
  <footer class="px-6 md:px-12 pt-24 md:pt-36 pb-10 max-w-[1320px] mx-auto border-t border-hair">
    <p class="text-ash text-lg max-w-[40ch]">{{ t.contact.heading }} {{ t.contact.subheading }}</p>
    <a
      href="mailto:contact@migueltaibo.com"
      class="email display block mt-6 text-bone text-[clamp(2rem,6.4vw,5.5rem)] leading-none break-all"
    >{{ t.contact.email }}</a>

    <div class="mt-20 md:mt-28 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 text-sm">
      <p class="text-smoke">{{ t.contact.copyright }}</p>
      <SocialLinks />
    </div>
  </footer>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
import SocialLinks from './SocialLinks.vue'
const { t } = useLanguage()
</script>

<style scoped>
.email {
  transition: color 0.4s ease;
}
.email:hover {
  color: var(--color-signal);
}
</style>
