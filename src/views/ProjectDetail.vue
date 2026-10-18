<template>
  <main class="px-6 md:px-12 pt-8 pb-10 max-w-[1320px] mx-auto">
    <a href="/" @click="handleBack" class="link inline-block text-sm text-ash hover:text-bone">{{ t.projectDetail.backToHome }}</a>

    <header class="intro mt-16 md:mt-24 grid md:grid-cols-12 gap-8 md:gap-14 items-end">
      <h1 class="display md:col-span-7 text-bone text-[clamp(3rem,9vw,8rem)] leading-[0.95]">{{ project.name }}</h1>
      <div class="md:col-span-5 md:pb-3">
        <p class="text-ash text-lg leading-relaxed max-w-[44ch]">{{ project.description }}</p>
        <ul class="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-bone/70">
          <li v-for="fact in summary.facts" :key="fact" class="flex items-center gap-2">
            <span class="w-1 h-1 rounded-full bg-signal/70"></span>{{ fact }}
          </li>
        </ul>
      </div>
    </header>

    <ProjectVisual :id="projectId" :class="['mt-14 md:mt-20 md:aspect-[16/9]', ['tpcloud', 'hackudc26'].includes(projectId) ? 'aspect-[4/5] sm:aspect-[4/3]' : 'aspect-[4/3]']" />

    <div class="mt-24 md:mt-36 space-y-20 md:space-y-28">
      <section v-if="project.overview" class="row">
        <h2 class="heading">{{ t.projectDetail.overview }}</h2>
        <p class="body text-bone/85 text-xl md:text-2xl leading-relaxed">{{ project.overview }}</p>
      </section>

      <section v-if="project.modules" class="row">
        <h2 class="heading">{{ t.projectDetail.modules }}</h2>
        <ul class="body divide-y divide-hair border-y border-hair">
          <li v-for="module in project.modules" :key="module.name" class="py-7 grid md:grid-cols-[1fr_auto] gap-3 md:gap-10">
            <div>
              <h3 class="display text-bone text-2xl md:text-3xl">{{ module.name }}</h3>
              <p class="text-ash leading-relaxed mt-2 max-w-[56ch]">{{ module.description }}</p>
            </div>
            <a v-if="module.github" :href="module.github" target="_blank" rel="noopener noreferrer" class="link self-start md:mt-2 text-sm text-ash hover:text-bone">GitHub</a>
          </li>
        </ul>
      </section>

      <section v-if="project.features" class="row">
        <h2 class="heading">{{ t.projectDetail.features }}</h2>
        <ul class="body grid sm:grid-cols-2 gap-x-10 gap-y-5">
          <li v-for="feature in project.features" :key="feature" class="flex gap-3 text-ash leading-relaxed">
            <span class="mt-[0.7em] w-1 h-1 shrink-0 rounded-full bg-signal/70"></span>{{ feature }}
          </li>
        </ul>
      </section>

      <section v-if="project.architecture" class="row">
        <h2 class="heading">{{ t.projectDetail.architecture }}</h2>
        <p class="body text-ash text-lg leading-relaxed max-w-[62ch]">{{ project.architecture }}</p>
      </section>

      <section v-if="project.challenges" class="row">
        <h2 class="heading">{{ t.projectDetail.challenges }}</h2>
        <p class="body text-ash text-lg leading-relaxed max-w-[62ch]">{{ project.challenges }}</p>
      </section>
    </div>

    <footer class="mt-28 md:mt-40 pt-10 border-t border-hair flex flex-col md:flex-row md:items-end md:justify-between gap-10">
      <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="link self-start text-sm text-bone">
        {{ t.projectDetail.viewOnGitHub }}
      </a>
      <router-link :to="next.route" class="group md:text-right">
        <span class="block text-sm text-ash">{{ t.projectDetail.next }}</span>
        <span class="display block mt-2 text-bone text-4xl md:text-6xl transition-colors duration-300 group-hover:text-signal">{{ next.name }}</span>
      </router-link>
    </footer>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage.js'
import ProjectVisual from '../components/ProjectVisual.vue'

const router = useRouter()
const { t } = useLanguage()

const props = defineProps({ projectId: String })

const handleBack = (e) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey) return
  e.preventDefault()
  router.push({ path: '/', state: { scrollTo: 'projects' } })
}

const project = computed(() => t.value.projectDetail.projects[props.projectId])
const items = computed(() => t.value.projects.items)
const summary = computed(() => items.value.find((p) => p.id === props.projectId))
const next = computed(() => {
  const i = items.value.findIndex((p) => p.id === props.projectId)
  return items.value[(i + 1) % items.value.length]
})
</script>

<style scoped>
.row {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .row {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 3.5rem;
  }
  .heading { grid-column: span 4; }
  .body { grid-column: span 8; }
}
.heading {
  font-family: var(--font-display);
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--color-bone);
}
.intro {
  animation: rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
</style>
