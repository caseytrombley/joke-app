<template>
  <div class="filters mb-4 flex flex-wrap gap-4 items-center min-h-[48px]">

    <template v-if="loading">
      <div class="w-40 h-10 bg-gray-300 rounded animate-pulse"></div>
      <div class="flex items-center gap-2">
        <div class="w-10 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div class="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </template>

    <template v-else>
      <div class="relative">
        <select
            v-model="selectedType"
            @change="$emit('update:type', selectedType)"
            class="appearance-none border border-gray-300 rounded px-4 py-2 pr-10 bg-white text-sm  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Jokes</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type[0].toUpperCase() + type.slice(1) }} Jokes
          </option>
        </select>
        <ChevronDown class="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>


      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-700">Sort by Rating</span>
        <button
            @click="toggleSort"
            :class="[
            'relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none',
            sortByRating ? 'bg-blue-600' : 'bg-gray-300'
          ]"
        >
          <span
              :class="[
              'absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200',
              sortByRating ? 'translate-x-5' : 'translate-x-0'
            ]"
          ></span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ChevronDown } from 'lucide-vue-next';


const props = defineProps({
  loading: Boolean,
  types: {
    type: Array,
    required: true,
  },
  modelValueType: {
    type: String,
    default: 'all',
  },
  modelValueSort: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:type', 'update:sort'])

const selectedType = ref(props.modelValueType)
const sortByRating = ref(props.modelValueSort)

watch(() => props.modelValueType, val => (selectedType.value = val))
watch(() => props.modelValueSort, val => (sortByRating.value = val))

function toggleSort() {
  sortByRating.value = !sortByRating.value
  emit('update:sort', sortByRating.value)
}
</script>
