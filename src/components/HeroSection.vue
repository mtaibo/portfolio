<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-6 relative">
    <div class="flex flex-col items-center gap-8 max-w-2xl text-center">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-semibold text-white tracking-tight">
          Miguel Taibo
        </h1>
        <p class="text-neutral-400 text-xl md:text-2xl">
          Software Developer
        </p>
        <p class="text-neutral-500 text-base md:text-lg max-w-md mx-auto">
          Building things that live on the internet.
        </p>
      </div>

      <div class="flex items-center gap-6 pt-4">
        <a
          href="https://github.com/mtaibo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-500 hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a
          href="mailto:contact@migueltaibo.com"
          class="text-neutral-500 hover:text-white transition-colors duration-200"
          aria-label="Email"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M22 4L12 13L2 4"/>
          </svg>
        </a>
        <a
          href="https://bsky.app/profile/migueltaibo.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-500 hover:text-white transition-colors duration-200"
          aria-label="Bluesky"
        >
          <svg width="22" height="22" viewBox="0 0 16 17" fill="currentColor">
            <path d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="absolute bottom-10 animate-bounce">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-600">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>
  </section>
</template>
