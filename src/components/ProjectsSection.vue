<template>
  <section id="projects" class="min-h-screen flex items-center justify-center px-6 py-24">
    <div class="max-w-4xl w-full fade-in-section">
      <h2 class="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-12">
        {{ t.projects.label }}
      </h2>

      <div class="space-y-8">
        <router-link
          v-for="project in t.projects.items"
          :key="project.id"
          :to="project.route"
          class="block group border border-neutral-800 rounded-lg p-6 md:p-8 hover:border-neutral-600 transition-all duration-300"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div class="space-y-3 flex-1">
              <h3 class="text-xl font-medium text-white group-hover:text-neutral-200 transition-colors">
                {{ project.name }}
              </h3>
              <p class="text-neutral-400 leading-relaxed">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="text-xs text-neutral-500 border border-neutral-800 rounded-full px-3 py-1"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-600 group-hover:text-neutral-400 transition-colors shrink-0 mt-1">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'
const { t } = useLanguage()
</script>
