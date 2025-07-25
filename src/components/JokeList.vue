<template>
  <div>
    <JokeCard v-for="joke in jokes" :key="joke.id" :joke="joke" />
    <div v-if="store.loading" class="text-center my-4">Loading...</div>
    <div ref="bottom" class="h-4"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useJokesStore } from '@/stores/jokeStore.js'
import JokeCard from './JokeCard.vue'

const store = useJokesStore()
const jokes = store.visibleJokes

const bottom = ref(null)

function setupObserver() {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      store.loadMore()
    }
  })
  if (bottom.value) observer.observe(bottom.value)
}

onMounted(setupObserver)
</script>
