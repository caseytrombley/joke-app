<template>
<!--  <AppHero @add-joke="openAddModal()" />-->

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
      <transition-group name="fade-slide" tag="div" class="grid gap-4">
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

    <AddJokeModal
        :visible="showAddModal"
        @close="closeAddModal"
        @after-leave="handleAddModalClosed"
    >
      <AddJokeForm
          ref="addForm"
          @added="handleJokeAdded"
          @done="closeAddModal"
      />
    </AddJokeModal>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useJokeStore } from '../stores/jokeStore';
import JokeCard from '../components/JokeCard.vue';
import Pagination from '../components/Pagination.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import JokeFilters from "@/components/JokeFilters.vue";
//import AppHero from "@/components/AppHero.vue";
import AddJokeModal from '@/components/AddJokeModal.vue';
import AddJokeForm from '@/components/AddJokeForm.vue';

const store = useJokeStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const selectedType = ref('all');
const sortByRating = ref(false);
const showModal = ref(false);
const showAddModal = ref(false);
const jokeToDelete = ref(null);
const addForm = ref(null);

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
});

watchEffect(() => {
  showAddModal.value = route.query.add === 'true';
});

watch(() => route.query.page, (newPage) => {
  const pageNum = parseInt(newPage, 10);
  if (!isNaN(pageNum)) {
    store.setPage(pageNum);
  } else {
    store.setPage(1);
  }
});

function openAddModal() {
  router.replace({ query: { ...route.query, add: 'true' } });
}

function closeAddModal() {
  showAddModal.value = false;
  const query = { ...route.query };
  delete query.add;
  router.replace({ query });
}

function handleAddModalClosed() {
  addForm.value?.resetForm();
}

function handleJokeAdded(joke) {
  const { setup, punchline, type } = joke;
  store.addCustomJoke({ setup, punchline, type, isNew: true });


  // setTimeout(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, 100);

  //scroll to new joke on add
  setTimeout(() => {
    const newEl = document.querySelector('.highlight-new');
    if (newEl) {
      const yOffset = -80; // Change this value to control top margin
      const y = newEl.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, 100);



  setTimeout(() => {
    const item = store.jokes.find(j => j.id === joke.id);
    if (item) item.isNew = false;
  }, 2000);
}

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
</script>

<style lang="scss" scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
