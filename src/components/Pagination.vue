<template>
  <div class="flex justify-center items-center mt-6 space-x-2">
    <button
        class="p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
        @click="$emit('change-page', 1)"
        title="First Page"
    >
      <ChevronsLeft class="w-4 h-4" />
    </button>

    <button
        class="p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === 1"
        @click="$emit('change-page', currentPage - 1)"
        title="Previous Page"
    >
      <ChevronLeft class="w-4 h-4" />
    </button>

    <span class="px-3 text-xs sm:text-base sm:px-4">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button
        class="p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === totalPages"
        @click="$emit('change-page', currentPage + 1)"
        title="Next Page"
    >
      <ChevronRight class="w-4 h-4" />
    </button>

    <button
        class="p-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="currentPage === totalPages"
        @click="$emit('change-page', totalPages)"
        title="Last Page"
    >
      <ChevronsRight class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next'

defineProps({
  currentPage: Number,
  totalPages: Number,
})
defineEmits(['change-page'])
</script>
