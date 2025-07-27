<template>
  <AppHero />
  <div class="max-w-6xl mx-auto p-4 py-6">
    <JokeFilters
        :loading="isLoading"
        :types="jokeTypes"
        :model-value-type="selectedType"
        :model-value-sort="sortByRating"
        @update:type="selectedType = $event"
        @update:sort="sortByRating = $event"
    />

    <div v-if="isLoading">
      <div class="grid gap-4">
        <div
            v-for="n in 10"
            :key="n"
            class="animate-pulse border p-4 rounded shadow space-y-4"
        >
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <div v-else>
      <transition-group name="slide-fade" tag="div" class="grid gap-4">
        <JokeCard
            v-for="joke in paginatedJokes"
            :key="joke.id"
            :joke="joke"
            @delete="requestDelete"
        />
      </transition-group>

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="(page) => store.setPage(page, router)"
      />
    </div>

    <ConfirmModal
        :visible="showModal"
        @cancel="showModal = false"
        @confirm="confirmDelete"
    />

    <AddJokeModal :visible="showAddModal" @close="closeAddModal">
      <AddJokeForm @added="handleJokeAdded" />
    </AddJokeModal>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJokeStore } from '../stores/jokeStore';

import JokeCard from '../components/JokeCard.vue';
import Pagination from '../components/Pagination.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import JokeFilters from "@/components/JokeFilters.vue";
import AppHero from "@/components/AppHero.vue";
import AddJokeForm from "@/components/AddJokeForm.vue";
import AddJokeModal from "@/components/AddJokeModal.vue";

const store = useJokeStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const selectedType = ref('all');
const sortByRating = ref(false);

const showModal = ref(false);
const showAddModal = ref(false);
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

function closeAddModal() {
  router.replace({ path: '/', query: { ...route.query, add: undefined } });
}

function handleJokeAdded() {
  closeAddModal();
  // Optional: scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(async () => {
  if (!store.jokes.length) {
    await store.fetchJokes();
  }

  const pageFromQuery = parseInt(route.query.page, 10);
  if (!isNaN(pageFromQuery)) {
    store.setPage(pageFromQuery);
  } else {
    store.setPage(1);
  }

  isLoading.value = false;

  // Open add modal if ?add=true
  if (route.query.add === 'true') {
    showAddModal.value = true;
  }
});

watch(() => route.query.add, (val) => {
  showAddModal.value = val === 'true';
});

watch(() => route.query.page, (newPage) => {
  const pageNum = parseInt(newPage, 10);
  if (!isNaN(pageNum)) {
    store.setPage(pageNum);
  } else {
    store.setPage(1);
  }
});

const jokeTypes = computed(() => {
  const types = new Set(store.jokes.map(j => j.type));
  return Array.from(types).sort();
});

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

const paginatedJokes = computed(() => {
  const start = (store.currentPage - 1) * store.jokesPerPage;
  return filteredJokes.value.slice(start, start + store.jokesPerPage);
});

const totalPages = computed(() =>
    Math.ceil(filteredJokes.value.length / store.jokesPerPage)
);
const currentPage = computed(() => store.currentPage);
const jokes = computed(() => store.jokes);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
