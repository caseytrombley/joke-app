<script setup>
import { ref } from 'vue';
import { useJokeStore } from '@/stores/jokeStore.js';

const store = useJokeStore();
const emit = defineEmits(['added']);

const setupText = ref('');
const punchline = ref('');
const type = ref('');
const showSuccess = ref(false);

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

function handleSubmit() {
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
  };

  store.addCustomJoke(newJoke);

  showSuccess.value = true;

  setTimeout(() => {
    emit('added', newJoke);
    showSuccess.value = false;
    setupText.value = '';
    punchline.value = '';
    type.value = '';
  }, 1500);
}
</script>

<template>
  <div class="relative min-h-[300px]">
    <transition name="fade">
      <div
          v-show="showSuccess"
          class="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg z-10"
      >
        <svg
            class="w-16 h-16 text-green-500 animate-bounce mb-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p class="text-lg font-semibold text-green-700">Joke added!</p>
      </div>
    </transition>

    <transition name="fade">
      <form
          v-show="!showSuccess"
          @submit.prevent="handleSubmit"
          class="space-y-4 transition-opacity"
      >
        <div>
          <label class="block mb-1 font-semibold">Type</label>
          <select
              v-model="type"
              required
              class="w-full p-2 border rounded"
              data-testid="joke-type"
          >
            <option value="">-- Select Type --</option>
            <option value="general">General</option>
            <option value="knock-knock">Knock Knock</option>
            <option value="programming">Programming</option>
            <option value="dad">Dad Joke</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-semibold">Setup</label>
          <input
              v-model="setupText"
              class="w-full p-2 border rounded"
              placeholder="Enter setup"
              required
              data-testid="joke-setup"
          />
          <p
              v-if="type === 'knock-knock'"
              class="text-sm text-gray-600 mt-1"
          >
            Format example: <em>Knock knock. Who's there? Boo. Boo who?</em>
          </p>
        </div>

        <div>
          <label class="block mb-1 font-semibold">Punchline</label>
          <input
              v-model="punchline"
              class="w-full p-2 border rounded"
              placeholder="Enter punchline"
              required
              data-testid="joke-punchline"
          />
        </div>

        <button
            type="submit"
            class="inline-block mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
            data-testid="submit-joke"
        >
          Submit Joke
        </button>
      </form>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.min-h-\[300px\] {
  min-height: 300px;
}
</style>
