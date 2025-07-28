<template>
  <section class="bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 py-16 px-4">
    <div class="max-w-4xl mx-auto text-center space-y-4">
      <div class="text-6xl">🎪</div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
        Welcome to <span class="text-pink-600">Jokester</span> — your daily dose of
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">laughs</span>
      </h1>

      <p class="text-lg md:text-xl text-gray-700">
        Browse random programming, general, and knock-knock jokes. Add your own punchlines,
        rate jokes, and share the giggles!
      </p>

      <RouterLink
          :to="addJokeLink"
          class="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
      >
        Submit Your Own Joke
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAddJokeLink } from '@/composables/useAddJokeLink';

const { addJokeLink } = useAddJokeLink();
</script>
