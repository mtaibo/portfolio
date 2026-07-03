<template>
  <div class="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6">
    <div class="flex flex-col items-center gap-8 max-w-lg">
      <div class="animate-float">
        <svg
          width="96"
          height="96"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d4d4d4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="animate-pulse-slow"
        >
          <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/>
          <path d="m8 6 2-2"/>
          <path d="m18 16 2-2"/>
          <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/>
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
          <path d="m15 5 4 4"/>
        </svg>
      </div>

      <div class="text-center space-y-4">
        <h1 class="text-4xl md:text-5xl font-semibold text-white tracking-tight">
          Under Construction
        </h1>
        <p class="text-neutral-400 text-lg">
          Coming Summer 2026.
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
      </div>
    </div>
  </div>
</template>
