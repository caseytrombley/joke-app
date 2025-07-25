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
      <div class="grid gap-4">
        <JokeCard
            v-for="joke in paginatedJokes"
            :key="joke.id"
            :joke="joke"
            @delete="requestDelete"
        />
      </div>

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

const showModal = ref(false);
const jokeToDelete = ref(null);

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

onMounted(async () => {
  if (!store.jokes.length) {
    await store.fetchJokes();
  }

  const pageFromQuery = parseInt(route.query.page, 10);
  if (!isNaN(pageFromQuery)) {
    store.setPage(pageFromQuery);
  }
});

watch(() => route.query.page, (newPage) => {
  const pageNum = parseInt(newPage, 10);
  if (!isNaN(pageNum)) {
    store.setPage(pageNum);
  }
});

const jokes = computed(() => store.jokes);
const paginatedJokes = computed(() => store.paginatedJokes);
const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);
</script>
