<template>
  <div>
    <nav class="bg-gray-800 text-white px-4 py-3 flex gap-4">
      <RouterLink to="/" class="hover:underline">Home</RouterLink>
      <RouterLink to="/add-joke" class="hover:underline">Add Joke</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>