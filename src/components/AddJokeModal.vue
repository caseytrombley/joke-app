<template>
  <div
      class="fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300"
      :class="visible ? 'bg-black/50' : 'bg-transparent pointer-events-none'"
      role="dialog"
      aria-modal="true"
      @click.self="$emit('close')"
      @keydown.esc="$emit('close')"
  >
    <transition name="modal-fade" @after-leave="$emit('after-leave')">
      <div
          v-show="visible"
          class="modal-panel"
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

defineEmits(['close', 'after-leave']);
</script>

<style scoped>
.modal-panel {
  background: white;
  width: 100%;
  max-width: 36rem;
  margin: 0 1rem;
  padding: 1.5rem 3rem 1.5rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: border-radius 0.4s ease, transform 0.4s ease, opacity 0.4s ease;
}

.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
  border-radius: 2rem;
}
.modal-fade-enter-to {
  opacity: 1;
  transform: scale(1);
  border-radius: 0.5rem;
}
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
  border-radius: 0.5rem;
}
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.3);
  border-radius: 9999px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s ease;
}
</style>
