<template>
  <section class="min-h-screen flex items-center justify-center px-6 py-24">
    <div class="max-w-2xl w-full fade-in-section">
      <h2 class="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-12">
        Tech Stack
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="border border-neutral-800 rounded-lg p-4 hover:border-neutral-600 transition-colors duration-300"
        >
          <p class="text-white font-medium">{{ skill.name }}</p>
          <p class="text-neutral-500 text-sm mt-1">{{ skill.category }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: 'Vue', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Language' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'C / C++', category: 'Systems' },
  { name: 'Nix', category: 'DevOps' },
  { name: 'MQTT', category: 'IoT' },
  { name: 'Git', category: 'Tools' },
  { name: 'PlatformIO', category: 'Embedded' },
  { name: 'Cloudflare', category: 'Infra' },
  { name: 'Linux', category: 'Systems' },
]
</script>
