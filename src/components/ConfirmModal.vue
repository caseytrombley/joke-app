<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="visible">
    <div class="bg-white p-6 rounded shadow w-80">
      <p class="mb-4">Are you sure you want to delete this joke?</p>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('cancel')" class="px-3 py-1 border rounded">Cancel</button>
        <button @click="$emit('confirm')" class="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
});
defineEmits(['cancel', 'confirm']);
</script>
