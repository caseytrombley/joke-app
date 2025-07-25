<script setup>
import { ref, watch } from 'vue'
import { useJokeStore } from '@/stores/jokeStore.js'

const store = useJokeStore()

const setupText = ref('')
const punchline = ref('')
const type = ref('')

const isKnockKnock = ref(false)

watch(type, (val) => {
  isKnockKnock.value = val === 'knock-knock'
})

function handleSubmit() {
  const formattedSetup = isKnockKnock.value
      ? setupText.value.split('\n').map(line => line.trim()).filter(Boolean).join(' \\n ')
      : setupText.value

  store.addCustomJoke({
    type: type.value,
    setup: formattedSetup,
    punchline: punchline.value,
  })

  // Reset form
  setupText.value = ''
  punchline.value = ''
  type.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 bg-gray-100 p-6 rounded shadow">
    <div>
      <label class="block mb-1 font-semibold">Type</label>
      <select v-model="type" required class="w-full p-2 border rounded">
        <option value="">-- Select Type --</option>
        <option value="programming">Programming</option>
        <option value="general">General</option>
        <option value="knock-knock">Knock Knock</option>
      </select>
    </div>

    <div>
      <label class="block mb-1 font-semibold">Setup</label>
      <textarea
          v-if="isKnockKnock"
          v-model="setupText"
          class="w-full p-2 border rounded"
          rows="4"
          placeholder="Enter each line of the setup on a new line"
      ></textarea>
      <input
          v-else
          v-model="setupText"
          class="w-full p-2 border rounded"
          placeholder="Setup"
      />
    </div>

    <div>
      <label class="block mb-1 font-semibold">Punchline</label>
      <input
          v-model="punchline"
          class="w-full p-2 border rounded"
          placeholder="Punchline"
          required
      />
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit Joke</button>
  </form>
</template>
