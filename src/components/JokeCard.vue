<!-- components/JokeCard.vue -->
<template>
  <div class="card border p-4 rounded shadow">
    <p class="font-semibold">Setup:</p>
    <p>{{ joke.setup }}</p>
    <p class="font-semibold mt-2">Punchline:</p>
    <p>{{ joke.punchline }}</p>

    <button
        v-if="joke.isCustom"
        @click="$emit('delete', joke)"
        class="absolute top-2 right-2 text-red-600 hover:text-red-800"
        title="Delete this joke"
    >
      🗑️
    </button>
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

<style lang="scss" scoped>
.card {
  position: relative;
}
</style>