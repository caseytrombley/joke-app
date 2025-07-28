<template>
  <div class="flex space-x-1">
    <button
        v-for="n in 5"
        :key="n"
        @click="handleClick(n)"
        class="focus:outline-none"
    >
      <span :class="n <= modelValue ? 'text-yellow-500' : 'text-gray-300'">★</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits(['rate']);

function handleClick(n) {
  if (props.modelValue === n) {
    emit('rate', 0); // clear rating
  } else {
    emit('rate', n);
  }
}
</script>
