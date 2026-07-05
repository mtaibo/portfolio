<template>
  <div>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ContactSection from '../components/ContactSection.vue'

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  document.querySelectorAll('.fade-in-section').forEach((el) => {
    observer.observe(el)
  })

  if (history.state?.scrollTo === 'projects') {
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + 70
        window.scrollTo({ top })
      }
      history.replaceState({}, '')
    }, 150)
  }
})
</script>
