<template>
  <div
      class="relative space-y-2 p-4 rounded-lg shadow transition hover:shadow-md"
      :class="joke.isCustom ? 'bg-pink-100 border-pink-300' : 'bg-gray-100 border-gray-300'"
  >


    <div class="card-header flex items-center justify-between mb-2">
      <div
          v-if="joke.isCustom"
          class="relative text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full"
      >
        User Added
      </div>
      <div v-if="joke.isCustom" class="flex gap-2">
        <button
            @click="$emit('delete', joke)"
            class="text-pink-600 hover:text-red-800"
            title="Delete this joke"
        >
          <Trash2 class="w-5 h-5" />
        </button>
        <button
            @click="startEdit"
            class="text-green-600 hover:text-blue-800"
            title="Edit this joke"
        >
          <Pencil class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-if="isEditing">
      <label class="block font-semibold">Setup:</label>
      <input v-model="editSetup" class="w-full p-2 border rounded" />

      <label class="block font-semibold mt-2">Punchline:</label>
      <input v-model="editPunchline" class="w-full p-2 border rounded" />

      <div class="flex justify-end gap-2 mt-2">
        <button
            @click="cancelEdit"
            class="px-3 py-1 border rounded hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
            @click="saveEdit"
            class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </div>

    <div v-else>
      <p class="font-semibold">Setup:</p>
      <p>{{ joke.setup }}</p>

      <p class="font-semibold mt-2">Punchline:</p>
      <p>{{ joke.punchline }}</p>

      <!-- ⭐ Rating -->
      <div class="mt-2">
        <StarRating :model-value="rating" @rate="onRate" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useJokeStore } from '../stores/jokeStore';
import StarRating from './StarRating.vue';
import { Trash2, Pencil } from 'lucide-vue-next'

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
