<template>
  <main class="min-h-screen bg-gradient-to-br from-white via-pink-50 to-yellow-50 px-4 py-12">
    <div class="max-w-xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          ➕ <span>Add a Joke</span>
        </h1>
        <p class="text-gray-600 text-base mt-2">
          Got a zinger? Drop it here and share the laughs with the world.
        </p>
      </div>

      <!-- Form card -->
      <div class="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <AddJokeForm />
      </div>
    </div>
  </main>
</template>

<script setup>
import AddJokeForm from '@/components/AddJokeForm.vue'
</script>
