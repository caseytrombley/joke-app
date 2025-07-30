<template>
  <div
      class="joke-card relative space-y-2 rounded-lg transition"
      :class="joke.isCustom ? 'bg-pink-100' : 'bg-gray-100'"
  >

    <div v-if="joke.isCustom" class="absolute top-0 left-0 text-xs bg-pink-400 text-white px-2 py-0.5 rounded-tl-lg rounded-br-lg">
      User Submitted
    </div>
    <div v-if="joke.isCustom" class="card-header flex items-center justify-end mb-2">


      <div class="flex gap-2">
        <button
            @click="$emit('delete', joke)"
            class="text-pink-600 hover:text-pink-800"
            title="Delete this joke"
        >
          <Trash2 class="w-5 h-5" />
        </button>
        <button
            @click="startEdit"
            class="text-green-600 hover:text-green-800"
            title="Edit this joke"
        >
          <Pencil class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-if="isEditing">
      <label class="block font-semibold">Setup:</label>
      <input v-model="editSetup" class="w-full p-2 border rounded bg-white" />

      <label class="block font-semibold mt-2">Punchline:</label>
      <input v-model="editPunchline" class="w-full p-2 border rounded bg-white" />

      <div class="flex justify-end gap-2 mt-4">
        <button
            @click="cancelEdit"
            class="px-3 py-1 border rounded bg-white hover:bg-gray-200 transition"
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
      <p class="joke-setup pb-3 text-lg font-semibold text-gray-800">{{ joke.setup }}</p>

      <button
          @click="showPunchline = !showPunchline"
          class="bg-teal-500 text-sm w-full px-4 py-2 text-white flex items-center justify-between transition"
          :class="[
          'rounded-md',
          showPunchline ? 'rounded-b-none' : '',
        ]"
      >
        Punchline
        <ChevronDown
            :class="['transition-transform duration-300', showPunchline ? 'rotate-180' : '']"
            class="w-5 h-5"
        />
      </button>

      <transition name="fade-slide">
        <div
            v-if="showPunchline"
            class="bg-teal-400 px-6 py-6 text-lg text-white rounded-b-md"
        >
          <span class="punchline">{{ joke.punchline }}</span>
        </div>
      </transition>

      <div class="mt-3">
        <StarRating :model-value="rating" @rate="onRate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useJokeStore } from '../stores/jokeStore';
import StarRating from './StarRating.vue';
import { Trash2, Pencil, ChevronDown } from 'lucide-vue-next';

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

const showPunchline = ref(false);
</script>

<style lang="scss" scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.joke-card {
  padding: 2rem 2.5rem;
  box-shadow: 4px 4px 0 var(--color-gray-200);

  &:hover {
    box-shadow: 6px 6px 0 var(--color-gray-300);
    transform: translateY(-2px);
  }
}

.card-header {
  position: relative;
  top: -.5rem;
}

.punchline {
  position: relative;
  padding: 0 1.5rem;
  font-weight: 600;

  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    font-family: "Times New Roman", Times, serif;
    color: rgba(255,255,255,0.3);
    font-size: 3.5rem;
    line-height: 1;
    pointer-events: none;
  }

  &::before {
    content: '“';
    top: -1.25rem;
    left: -.75rem;
  }

  &::after {
    content: '”';
    bottom: -1.25rem;
    right: -.75rem;
  }
}

//.joke-setup {
//  &::before,
//  &::after {
//    position: absolute;
//    display: inline-block;
//    font-family: "Times New Roman", Times, serif;
//    margin-top: -30px;
//    color: var(--color-gray-300);
//    font-size: 3rem;
//
//  }
//  &::before {
//    content: '“';
//    margin-left: -30px;
//  }
//  &::after {
//    content: '”';
//    margin-left: 10px;
//  }
//}
</style>
