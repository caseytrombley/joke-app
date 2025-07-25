<template>
  <div class="flex space-x-1">
    <button
        v-for="n in 5"
        :key="n"
        @click="$emit('rate', n)"
        class="text-yellow-500"
    >
      <span :class="n <= modelValue ? 'text-yellow-500' : 'text-gray-300'">★</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Number,
});
defineEmits(['rate']);
</script>
