<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Joke App</h1>

    <ConfirmModal
        :visible="showModal"
        @cancel="showModal = false"
        @confirm="confirmDelete"
    />

    <div v-if="!jokes.length">Loading jokes...</div>

    <div v-else>
      <!-- Filters -->
      <div class="mb-4 flex flex-wrap gap-4 items-center">
        <select v-model="selectedType" class="border p-2 rounded">
          <option value="all">All Jokes</option>
          <option
              v-for="type in jokeTypes"
              :key="type"
              :value="type"
          >
            {{ type[0].toUpperCase() + type.slice(1) }} Jokes
          </option>
        </select>

        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="sortByRating" />
          Sort by rating
        </label>
      </div>

      <!-- Joke List -->
      <div class="grid gap-4">
        <JokeCard
            v-for="joke in paginatedJokes"
            :key="joke.id"
            :joke="joke"
            @delete="requestDelete"
        />
      </div>

      <!-- Pagination -->
      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="(page) => store.setPage(page, router)"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJokeStore } from '../stores/jokeStore';
import JokeCard from '../components/JokeCard.vue';
import Pagination from '../components/Pagination.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

const store = useJokeStore();
const route = useRoute();
const router = useRouter();

// Filter and sort state
const selectedType = ref('all');
const sortByRating = ref(false);

// Modal delete state
const showModal = ref(false);
const jokeToDelete = ref(null);

// Modal logic
function requestDelete(joke) {
  jokeToDelete.value = joke;
  showModal.value = true;
}

function confirmDelete() {
  if (jokeToDelete.value) {
    store.removeCustomJoke(jokeToDelete.value.id);
    showModal.value = false;
    jokeToDelete.value = null;
  }
}

// Fetch jokes on mount
onMounted(async () => {
  if (!store.jokes.length) {
    await store.fetchJokes();
  }

  const pageFromQuery = parseInt(route.query.page, 10);
  if (!isNaN(pageFromQuery)) {
    store.setPage(pageFromQuery);
  }
});

watch(
    () => route.query.page,
    (newPage) => {
      const pageNum = parseInt(newPage, 10);
      if (!isNaN(pageNum)) {
        store.setPage(pageNum);
      } else {
        store.setPage(1);
      }
    }
);

// Available joke types
const jokeTypes = computed(() => {
  const types = new Set(store.jokes.map(j => j.type));
  return Array.from(types).sort();
});

// Filtered + sorted list
const filteredJokes = computed(() => {
  let list = [...store.jokes];
  if (selectedType.value !== 'all') {
    list = list.filter(j => j.type === selectedType.value);
  }
  if (sortByRating.value) {
    list.sort((a, b) => {
      const ra = store.ratings[a.id] || 0;
      const rb = store.ratings[b.id] || 0;
      return rb - ra;
    });
  }
  return list;
});

// Paginated result
const paginatedJokes = computed(() => {
  const start = (store.currentPage - 1) * store.jokesPerPage;
  return filteredJokes.value.slice(start, start + store.jokesPerPage);
});

// Update total pages dynamically for filtered set
const totalPages = computed(() =>
    Math.ceil(filteredJokes.value.length / store.jokesPerPage)
);

const currentPage = computed(() => store.currentPage);
const jokes = computed(() => store.jokes);
</script>
