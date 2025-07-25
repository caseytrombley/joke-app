<!-- components/Pagination.vue -->
<template>
  <div class="flex justify-center items-center mt-6 space-x-2">
    <button
        class="px-3 py-1 border rounded"
        :disabled="currentPage === 1"
        @click="$emit('change-page', currentPage - 1)"
    >
      Prev
    </button>

    <span>Page {{ currentPage }} of {{ totalPages }}</span>

    <button
        class="px-3 py-1 border rounded"
        :disabled="currentPage === totalPages"
        @click="$emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
defineEmits(['change-page']);
</script>
