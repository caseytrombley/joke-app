<template>
  <div>
    <header class="bg-gray-800 text-white px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold tracking-wide flex items-center gap-2">
          <span><img src="/favicon-32x32.png" alt=""></span>
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

    <main>
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import AppFooter from "@/components/AppFooter.vue";
</script>
