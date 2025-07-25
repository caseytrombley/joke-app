<script setup>
import { ref } from 'vue';
import { useJokeStore } from '@/stores/jokeStore.js';
import {RouterLink, useRouter} from 'vue-router';

const router = useRouter();
const store = useJokeStore();

const setupText = ref('');
const punchline = ref('');
const type = ref('');

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

  store.addCustomJoke({
    type: type.value,
    setup: formattedSetup,
    punchline: capitalize(punchline.value.trim()),
  });

  router.push({ path: '/', query: { page: 1 } });

  setupText.value = '';
  punchline.value = '';
  type.value = '';
}
</script>


<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block mb-1 font-semibold">Type</label>
      <select v-model="type" required class="w-full p-2 border rounded">
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
      />
      <p v-if="type === 'knock-knock'" class="text-sm text-gray-600 mt-1">
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
      />
    </div>

    <button type="submit" class="inline-block mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
    >
      Submit Joke
    </button>
  </form>
</template>
