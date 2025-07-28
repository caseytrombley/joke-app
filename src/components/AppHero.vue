<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 py-16 px-4">
    <!-- Emoji Container -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div ref="emojiContainer" class="w-full h-full"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto text-center space-y-4">
      <div class="text-6xl">🎪</div>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-800">
        Welcome to <span class="text-pink-600">Jokester</span> — your daily dose of
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">laughs</span>
      </h1>

      <p class="text-lg md:text-xl text-gray-700">
        Browse random programming, general, and knock-knock jokes. Add your own punchlines,
        rate jokes, and share the giggles!
      </p>

      <RouterLink
          :to="addJokeLink"
          class="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
      >
        Submit Your Own Joke
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAddJokeLink } from '@/composables/useAddJokeLink';
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

const { addJokeLink } = useAddJokeLink();
const emojiContainer = ref(null);

const emojiFrames = ['😄', '😊', '😆', '😂', '🤣', '😅'];
const maxEmojis = 10;
const emojiIntervals = new Map();

let spawnInterval;

// Use 12 lanes (like a grid); track which lanes are "occupied"
const lanes = Array(12).fill(false); // false = free

function getFreeLane() {
  const freeIndexes = lanes
      .map((used, i) => (!used ? i : null))
      .filter(i => i !== null);
  if (freeIndexes.length === 0) return null;
  return freeIndexes[Math.floor(Math.random() * freeIndexes.length)];
}

function createEmoji() {
  const laneIndex = getFreeLane();
  if (laneIndex === null) return; // no space

  lanes[laneIndex] = true;

  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojiFrames[0];
  emoji.style.position = 'absolute';
  emoji.style.fontSize = `${Math.random() * 20 + 80}px`;
  emoji.style.opacity = '0.1';

  // evenly space based on lane
  const left = (laneIndex / lanes.length) * 100;
  emoji.style.left = `calc(${left}% + 1vw)`;
  emoji.style.top = '-10%';
  emoji.style.userSelect = 'none';
  emoji.style.pointerEvents = 'none';

  emojiContainer.value.appendChild(emoji);

  const duration = Math.random() * 6 + 14;
  gsap.to(emoji, {
    y: '110vh',
    duration,
    ease: 'none',
    onComplete: () => {
      clearInterval(emojiIntervals.get(emoji));
      emojiIntervals.delete(emoji);
      emoji.remove();
      lanes[laneIndex] = false; // free up the lane
    },
  });

  let frame = 0;
  const interval = setInterval(() => {
    frame = (frame + 1) % emojiFrames.length;
    emoji.textContent = emojiFrames[frame];
  }, 300);

  emojiIntervals.set(emoji, interval);
}

onMounted(async () => {
  await nextTick();

  spawnInterval = setInterval(() => {
    if (emojiContainer.value?.children.length < maxEmojis) {
      createEmoji();
    }
  }, 700);
});

onBeforeUnmount(() => {
  clearInterval(spawnInterval);
  emojiIntervals.forEach(clearInterval);
  emojiIntervals.clear();
});
</script>


<style scoped>
.emoji {
  position: absolute;
  transition: transform 0.3s;
  will-change: transform;
  opacity: 0.3;
  user-select: none;
}
</style>
