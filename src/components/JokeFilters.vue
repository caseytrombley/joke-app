<template>
  <div class="mb-4 flex gap-4 items-center">
    <select v-model="filterType" @change="store.setFilterType(filterType)">
      <option value="">All Types</option>
      <option value="programming">Programming</option>
      <option value="general">General</option>
      <option value="knock-knock">Knock Knock</option>
    </select>

    <select v-model="sortBy" @change="store.setSortBy(sortBy)">
      <option value="">Sort: None</option>
      <option value="rating">By Rating</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useJokesStore } from '@/stores/jokeStore.js'

const store = useJokesStore()
const filterType = ref(store.filterType)
const sortBy = ref(store.sortBy)
</script>
