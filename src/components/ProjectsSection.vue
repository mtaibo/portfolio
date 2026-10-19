<template>
  <section class="px-6 md:px-12 max-w-[1320px] mx-auto">
    <!-- A full screen of black with only the title, so the work clearly starts here -->
    <div class="min-h-[100svh] flex items-center">
      <h2 class="display text-bone text-[clamp(3.25rem,10vw,8.5rem)] leading-none">{{ t.projects.label }}</h2>
    </div>

    <div id="projects" class="space-y-28 md:space-y-44 pt-10 md:pt-16 pb-24 md:pb-36">
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
      // On desktop the lead project fits in one screen: the diagram takes whatever height is left.
      article: 'grid gap-10 md:gap-14 md:flex md:flex-col md:h-[min(calc(100svh-6rem),60rem)]',
      visual: 'block order-2 md:flex md:flex-col md:flex-1 md:min-h-[22rem]',
      aspect: 'aspect-[4/5] sm:aspect-[5/3] md:aspect-auto md:flex-1',
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
