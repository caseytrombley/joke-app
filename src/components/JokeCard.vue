<template>
  <div class="card border p-4 rounded shadow relative space-y-2">
    <div v-if="isEditing">
      <label class="block font-semibold">Setup:</label>
      <input v-model="editSetup" class="w-full p-2 border rounded" />

      <label class="block font-semibold mt-2">Punchline:</label>
      <input v-model="editPunchline" class="w-full p-2 border rounded" />

      <div class="flex justify-end space-x-2 mt-2">
        <button @click="cancelEdit" class="px-3 py-1 border rounded">Cancel</button>
        <button @click="saveEdit" class="px-3 py-1 bg-green-600 text-white rounded">Save</button>
      </div>
    </div>

    <div v-else>
      <p class="font-semibold">Setup:</p>
      <p>{{ joke.setup }}</p>

      <p class="font-semibold mt-2">Punchline:</p>
      <p>{{ joke.punchline }}</p>

      <!-- ⭐ Rating -->
      <StarRating :model-value="rating" @rate="onRate" />
    </div>

    <!-- 🗑️ Delete & ✏️ Edit Buttons -->
    <div v-if="joke.isCustom" class="absolute top-2 right-2 flex space-x-2">
      <button
          @click="$emit('delete', joke)"
          class="text-red-600 hover:text-red-800"
          title="Delete this joke"
      >
        🗑️
      </button>
      <button
          @click="startEdit"
          class="text-blue-600 hover:text-blue-800"
          title="Edit this joke"
      >
        ✏️
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useJokeStore } from '../stores/jokeStore';
import StarRating from './StarRating.vue';

const { joke } = defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const store = useJokeStore();

const rating = computed(() => store.ratings[joke.id] || 0);
function onRate(value) {
  store.rateJoke(joke.id, value);
}

// --- Inline Editing ---
const isEditing = ref(false);
const editSetup = ref(joke.setup);
const editPunchline = ref(joke.punchline);

function startEdit() {
  isEditing.value = true;
}

function cancelEdit() {
  editSetup.value = joke.setup;
  editPunchline.value = joke.punchline;
  isEditing.value = false;
}

function saveEdit() {
  store.editCustomJoke(joke.id, editSetup.value.trim(), editPunchline.value.trim());
  isEditing.value = false;
}
</script>

<style scoped>
.card {
  position: relative;
}
</style>
