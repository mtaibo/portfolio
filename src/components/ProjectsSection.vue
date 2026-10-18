<template>
  <section id="projects" class="px-6 md:px-12 py-24 md:py-36 max-w-[1320px] mx-auto">
    <h2 class="display text-3xl md:text-4xl text-bone mb-16 md:mb-24">{{ t.hero.work }}</h2>

    <div class="space-y-28 md:space-y-44">
      <article
        v-for="(project, i) in t.projects.items"
        :key="project.id"
        :class="layout(i).article"
      >
        <router-link :to="project.route" :class="layout(i).visual" :aria-label="project.name">
          <ProjectVisual :id="project.id" :class="layout(i).aspect" />
        </router-link>

        <div :class="layout(i).text">
          <h3 class="display text-bone text-4xl md:text-6xl leading-none">
            <router-link :to="project.route">{{ project.name }}</router-link>
          </h3>
          <div>
            <p class="text-ash text-lg leading-relaxed max-w-[42ch]" :class="i === 0 ? 'mt-5 md:mt-0' : 'mt-5'">{{ project.tagline }}</p>
            <ul class="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-bone/70">
              <li v-for="fact in project.facts" :key="fact" class="flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-signal/70"></span>{{ fact }}
              </li>
            </ul>
            <router-link :to="project.route" class="link inline-block mt-8 text-bone text-sm">{{ t.projects.more }}</router-link>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
import ProjectVisual from './ProjectVisual.vue'
const { t } = useLanguage()

// The lead project spans the full width; the rest alternate sides so the page has a rhythm.
const layout = (i) => {
  if (i === 0) {
    return {
      article: 'grid gap-10 md:gap-14',
      visual: 'block order-2',
      aspect: 'aspect-[4/5] sm:aspect-[5/3]',
      text: 'order-1 md:grid md:grid-cols-2 md:items-start md:gap-14',
    }
  }
  const flip = i % 2 === 0
  return {
    article: 'grid md:grid-cols-12 gap-10 md:gap-14 items-center',
    visual: `block md:col-span-7 ${flip ? 'md:order-2' : ''}`,
    aspect: i === 3 ? 'aspect-[4/3] md:aspect-[7/5]' : i === 2 ? 'aspect-[4/5] sm:aspect-[4/3]' : 'aspect-[4/3]',
    text: `md:col-span-5 ${flip ? 'md:order-1' : ''}`,
  }
}
</script>
