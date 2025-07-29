<script setup>
import { ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import { useAnimatedEmoji } from '@/composables/useAnimatedEmoji.js';

const { emojiAnimation, startEmojiAnim, stopEmojiAnim } = useAnimatedEmoji();
const emit = defineEmits(['added', 'done']);

const setupText = ref('');
const punchline = ref('');
const type = ref('general');
const showSuccess = ref(false);

const errors = ref({
  setup: '',
  punchline: ''
});

function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function normalizeSetup(text) {
  let trimmed = text.trim();
  trimmed = capitalize(trimmed);
  const questionWords = ['What', 'How', 'Who', 'When', 'Where', 'Why'];
  const firstWord = trimmed.split(' ')[0];
  if (questionWords.includes(firstWord) && !/[?]$/.test(trimmed)) {
    trimmed += '?';
  } else if (!/[.?!]$/.test(trimmed)) {
    trimmed += '.';
  }
  return trimmed;
}

function formatOption(value) {
  return value
      .split('-')
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(' ');
}

function validateForm() {
  let isValid = true;
  if (!setupText.value.trim()) {
    errors.value.setup = 'Setup is required.';
    isValid = false;
  } else {
    errors.value.setup = '';
  }

  if (!punchline.value.trim()) {
    errors.value.punchline = 'Punchline is required.';
    isValid = false;
  } else {
    errors.value.punchline = '';
  }

  return isValid;
}

function handleSubmit() {
  if (!validateForm()) return;

  const formattedSetup =
      type.value === 'knock-knock'
          ? (() => {
            const parts = setupText.value
                .split('\n')
                .map(line => capitalize(line.trim()))
                .filter(Boolean);
            let joined = parts.join('. ');
            if (!/[.?!]$/.test(joined)) {
              joined += '.';
            }
            return joined;
          })()
          : normalizeSetup(setupText.value);

  const newJoke = {
    type: type.value,
    setup: formattedSetup,
    punchline: capitalize(punchline.value.trim()),
    isCustom: true,
    id: crypto.randomUUID(),
    highlight: true,
  };

  showSuccess.value = true;
  startEmojiAnim();

  setTimeout(() => {
    emit('added', newJoke);
    emit('done');
    // Wait for parent to call resetForm() after modal animation
  }, 3000);
}

function resetForm() {
  setupText.value = '';
  punchline.value = '';
  type.value = 'general';
  showSuccess.value = false;
  stopEmojiAnim();
}

defineExpose({ resetForm });
</script>

<template>
  <div class="relative min-h-[380px]">
    <div
        v-if="showSuccess"
        class="absolute inset-0 z-10 bg-white rounded-full flex items-center justify-center overflow-hidden"
        style="clip-path: circle(50% at center);"
    >
      <div class="success-wrapper text-center">
        <div class="text-8xl mb-4">{{ emojiAnimation }}</div>
        <p class="text-xl font-semibold text-pink-600 animate-bounce">Joke added!</p>
      </div>
    </div>


    <div v-if="!showSuccess">
      <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
        <Plus class="w-7 h-7 text-pink-600" />
        <span>Add a Joke</span>
      </h1>
      <p class="text-gray-600 text-base mt-2 text-center">
        Got a zinger? Drop it here and share the laughs with the world.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
        <div>
          <label class="block mb-3 font-semibold">Type</label>
          <div class="flex flex-wrap gap-3">
            <div
                v-for="option in ['general', 'knock-knock', 'programming', 'dad']"
                :key="option"
                class="flex-none"
            >
              <input
                  type="radio"
                  :value="option"
                  v-model="type"
                  :id="`joke-type-${option}`"
                  class="sr-only peer"
                  data-testid="joke-type"
              />
              <label
                  :for="`joke-type-${option}`"
                  class="block px-4 py-2 rounded-lg border border-gray-300 peer-checked:bg-teal-500 peer-checked:text-white peer-checked:border-teal-500 transition hover:shadow-sm cursor-pointer text-center"
              >
                {{ formatOption(option) }}
              </label>
            </div>
          </div>
        </div>

        <div>
          <label class="block mb-1 font-semibold" for="joke-setup">Setup</label>
          <input
              v-model="setupText"
              id="joke-setup"
              data-testid="joke-setup"
              :class="[
              'w-full p-2 border rounded',
              errors.setup ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-pink-500'
            ]"
              placeholder="Enter setup"
          />
          <p v-if="errors.setup" class="text-sm text-red-600 mt-1">{{ errors.setup }}</p>
          <p v-if="type === 'knock-knock'" class="text-sm text-gray-600 mt-1">
            Format example: <em>Knock knock. Who's there? Boo. Boo who?</em>
          </p>
        </div>

        <div>
          <label class="block mb-1 font-semibold" for="joke-punchline">Punchline</label>
          <input
              v-model="punchline"
              id="joke-punchline"
              data-testid="joke-punchline"
              :class="[
              'w-full p-2 border rounded',
              errors.punchline ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-pink-500'
            ]"
              placeholder="Enter punchline"
          />
          <p v-if="errors.punchline" class="text-sm text-red-600 mt-1">{{ errors.punchline }}</p>
        </div>

        <button
            type="submit"
            data-testid="submit-joke"
            class="inline-block mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
        >
          Submit Joke
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.shrink-circle-enter-active,
.shrink-circle-leave-active {
  animation: shrink-fade-circle 0.5s ease-in-out forwards;
}

@keyframes shrink-fade-circle {
  0% {
    opacity: 1;
    transform: scale(1);
    border-radius: 0.5rem;
  }
  100% {
    opacity: 0;
    transform: scale(0.3);
    border-radius: 9999px;
  }
}

.success-wrapper {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  overflow: hidden;
}

.success-wrapper > * {
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

