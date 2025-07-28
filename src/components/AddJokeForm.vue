<script setup>
import { ref } from 'vue';
import { Plus, CheckCircle } from 'lucide-vue-next';

const emit = defineEmits(['added', 'done']);

const setupText = ref('');
const punchline = ref('');
const type = ref('general'); // default to 'general'
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

function formatOption(value) {
  return value
      .split('-')
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(' ');
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
    highlight: true,
  };

  showSuccess.value = true;

  setTimeout(() => {
    emit('added', newJoke);
    emit('done');

    // reset form after closing
    setupText.value = '';
    punchline.value = '';
    type.value = 'general';
    showSuccess.value = false;
  }, 1500);
}
</script>

<template>
  <div class="relative min-h-[380px]">
    <!-- Success Overlay -->
    <transition name="fade">
      <div
          v-if="showSuccess"
          class="absolute inset-0 z-10 bg-white rounded-lg flex flex-col items-center justify-center"
      >
        <CheckCircle class="w-16 h-16 text-green-700 mb-4 animate-bounce" />
        <p class="text-lg font-semibold text-green-800">Joke added!</p>
      </div>
    </transition>

    <!-- Joke Form -->
    <div>
      <h1 class="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
        <Plus class="w-7 h-7 text-pink-600" />
        <span>Add a Joke</span>
      </h1>
      <p class="text-gray-600 text-base mt-2 text-center">
        Got a zinger? Drop it here and share the laughs with the world.
      </p>

      <form
          @submit.prevent="handleSubmit"
          class="space-y-4 mt-6"
          :class="showSuccess ? 'opacity-0 cursor-not-allowed' : ''"
      >
        <!-- Joke Type Radios -->
        <div>
          <label class="block mb-3 font-semibold">Type</label>
          <div class="flex flex-wrap gap-3">
            <label
                v-for="option in ['general', 'knock-knock', 'programming', 'dad']"
                :key="option"
                class="cursor-pointer"
            >
              <input
                  type="radio"
                  :value="option"
                  v-model="type"
                  required
                  class="sr-only peer"
                  data-testid="joke-type"
              />
              <span
                  class="px-4 py-2 rounded-lg border border-gray-300 peer-checked:bg-teal-500 peer-checked:text-white peer-checked:border-teal-500 transition hover:shadow-sm"
              >
                {{ formatOption(option) }}
              </span>
            </label>
          </div>
        </div>

        <!-- Setup Field -->
        <div>
          <label class="block mb-1 font-semibold">Setup</label>
          <input
              v-model="setupText"
              data-testid="joke-setup"
              class="w-full p-2 border rounded"
              placeholder="Enter setup"
              required
          />
          <p
              v-if="type === 'knock-knock'"
              class="text-sm text-gray-600 mt-1"
          >
            Format example: <em>Knock knock. Who's there? Boo. Boo who?</em>
          </p>
        </div>

        <!-- Punchline Field -->
        <div>
          <label class="block mb-1 font-semibold">Punchline</label>
          <input
              v-model="punchline"
              data-testid="joke-punchline"
              class="w-full p-2 border rounded"
              placeholder="Enter punchline"
              required
          />
        </div>

        <!-- Submit Button -->
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
