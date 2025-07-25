<template>
  <div class="card border p-4 rounded shadow">
    <p class="font-semibold">Setup:</p>
    <p>{{ joke.setup }}</p>

    <p class="font-semibold mt-2">Punchline:</p>
    <p>{{ joke.punchline }}</p>

    <!-- ⭐ Star Rating -->
    <StarRating :model-value="rating" @rate="onRate" />

    <!-- 🗑️ Delete Button -->
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
import { computed } from 'vue';
import { useJokeStore } from '../stores/jokeStore';
import StarRating from './StarRating.vue';

const { joke } = defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const store = useJokeStore();

const rating = computed(() => store.ratings[joke.id] || 0);

function onRate(value) {
  store.rateJoke(joke.id, value);
}
</script>


<style lang="scss" scoped>
.card {
  position: relative;
}
</style>
