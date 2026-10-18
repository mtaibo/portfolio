<template>
  <main>
    <HeroSection />
    <ProjectsSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'

onMounted(() => {
  if (history.state?.scrollTo === 'projects') {
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView()
      history.replaceState({}, '')
    }, 150)
  }
})
</script>
