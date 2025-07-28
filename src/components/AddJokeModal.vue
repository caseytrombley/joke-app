<template>
  <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      @keydown.esc="$emit('close')"
      @click.self="$emit('close')"
      role="dialog"
      aria-modal="true"
  >
    <transition name="fade">
      <div
          v-show="visible"
          class="bg-white w-full max-w-xl mx-4 rounded-lg shadow-lg p-6 relative animate-fade-in"
      >
        <button
            @click="$emit('close')"
            class="absolute top-4 right-4 z-10 text-gray-500 hover:text-black rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center"
            aria-label="Close"
        >
          <X class="w-6 h-6 pointer-events-none" />
        </button>

        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['close']);
</script>

<style lang="scss" scoped>
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
