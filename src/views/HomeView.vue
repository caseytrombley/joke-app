<!-- views/HomeView.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Joke App</h1>

    <div v-if="!jokes.length">Loading jokes...</div>

    <div v-else>
      <div class="grid gap-4">
        <JokeCard v-for="joke in paginatedJokes" :key="joke.id" :joke="joke" />
      </div>

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="store.setPage"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useJokeStore } from '../stores/jokeStore';
import JokeCard from '../components/JokeCard.vue';
import Pagination from '../components/Pagination.vue';

const store = useJokeStore();

onMounted(() => {
  if (!store.jokes.length) {
    store.fetchJokes();
  }
});

const jokes = computed(() => store.jokes);
const paginatedJokes = computed(() => store.paginatedJokes);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);
</script>
