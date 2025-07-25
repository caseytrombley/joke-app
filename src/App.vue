<template>
  <div>
    <header class="bg-gray-800 text-white px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold tracking-wide flex items-center gap-2">
          <span>🤡</span>
          <span>Jokester</span>
        </RouterLink>

        <nav class="flex gap-6 text-sm font-medium">
          <RouterLink
              to="/"
              class="hover:underline transition-opacity opacity-90 hover:opacity-100"
          >
            Home
          </RouterLink>
          <RouterLink
              to="/add-joke"
              class="hover:underline transition-opacity opacity-90 hover:opacity-100"
          >
            Add Joke
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
