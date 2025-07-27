<template>
  <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      @keydown.esc="$emit('close')"
  >
    <transition name="fade">
      <div
          class="bg-white w-full max-w-xl mx-4 rounded-lg shadow-lg p-6 relative animate-fade-in"
          v-show="visible"
      >
        <!-- Close button -->
        <button
            @click="$emit('close')"
            class="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            aria-label="Close"
        >
          &times;
        </button>

        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['close']);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
