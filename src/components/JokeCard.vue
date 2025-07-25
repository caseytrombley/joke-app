<!-- components/JokeCard.vue -->
<template>
  <div class="border p-4 rounded shadow">
    <p class="font-semibold">Setup:</p>
    <p>{{ joke.setup }}</p>
    <p class="font-semibold mt-2">Punchline:</p>
    <p>{{ joke.punchline }}</p>
  </div>
</template>

<script setup>
defineProps({
  joke: {
    type: Object,
    required: true,
  },
});
</script>
