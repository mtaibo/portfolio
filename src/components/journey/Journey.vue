<template>
  <div ref="root" class="journey">
    <canvas id="pts" aria-hidden="true"></canvas>
    <svg id="stage" role="img" :aria-label="t.journey.label"></svg>
    <h1 class="sr-only">{{ t.hero.name }}</h1>

    <div class="cap hero" data-level="0">
      <p>{{ t.hero.statement }}</p>
      <SocialLinks />
    </div>

    <div v-for="stop in stops" :key="stop.item.id" :class="['cap', { 'grade-cap': stop.item.id === 'grade' }]" :data-level="stop.level" :data-to="stop.to">
      <h2 class="display">{{ stop.item.name.split(' — ')[0] }}</h2>
      <p>{{ stop.item.tagline }}</p>
      <ul v-if="stop.item.facts" class="facts">
        <li v-for="fact in stop.item.facts" :key="fact">{{ fact }}</li>
      </ul>
      <a v-if="stop.item.href" class="link more" :href="stop.item.href" target="_blank" rel="noopener noreferrer">{{ t.projects.more }}</a>
      <router-link v-else class="link more" :to="stop.item.route">{{ t.projects.more }}</router-link>
    </div>

    <div class="cap end" data-level="7">
      <div>
        <h2 class="display">{{ t.about.heading }}</h2>
        <p>{{ t.about.body }}</p>
        <router-link class="link more" to="/story">{{ t.about.storyLink }}</router-link>
      </div>
      <div class="contact">
        <p class="contact-line">{{ t.contact.heading }}. {{ t.contact.subheading }}</p>
        <a class="display email" :href="`mailto:${t.contact.email}`"><span>{{ emailParts[0] }}</span><span>{{ emailParts[1] }}</span></a>
        <div class="row"><SocialLinks /></div>
      </div>
    </div>

    <div class="grade-fade" aria-hidden="true"></div>
    <div id="devices" aria-hidden="true"></div>
    <div class="track" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage.js'
import SocialLinks from '../SocialLinks.vue'
import { startJourney } from './journey.js'
import './journey.css'

const { t } = useLanguage()
const root = ref(null)

// Where each project sits along the way; Dotfiles spans its drawers and its desktop.
const LEVELS = { tpcloud: [1], tphome: [2], hackudc26: [3], dotfiles: [4, 5], grade: [6] }
const stops = computed(() => t.value.projects.items.map((item) => ({ item, level: LEVELS[item.id][0], to: LEVELS[item.id][1] })))
const emailParts = computed(() => {
  const at = t.value.contact.email.indexOf('@') + 1
  return [t.value.contact.email.slice(0, at), t.value.contact.email.slice(at)]
})

let stop
onMounted(() => {
  stop = startJourney(root.value, () => t.value.journey)
})
onBeforeUnmount(() => stop?.())
</script>
