<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 py-16 px-4">
    <div class="absolute inset-0 pointer-events-none z-0">
      <div ref="emojiContainer" class="w-full h-full"></div>
    </div>

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
import { useAnimatedEmoji } from '@/composables/useAnimatedEmoji';

const { addJokeLink } = useAddJokeLink();
const emojiContainer = ref(null);

const { emojiAnimation, startEmojiAnim, stopEmojiAnim } = useAnimatedEmoji();
startEmojiAnim(); //start animation

const maxEmojis = 10;
const emojiIntervals = new Map();
const lanes = Array(12).fill(false);

function getFreeLane() {
  const freeIndexes = lanes.map((used, i) => (!used ? i : null)).filter(i => i !== null);
  return freeIndexes.length ? freeIndexes[Math.floor(Math.random() * freeIndexes.length)] : null;
}

function fallingEffect() {
  const laneIndex = getFreeLane();
  if (laneIndex === null) return;

  lanes[laneIndex] = true;

  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojiAnimation.value;
  emoji.style.position = 'absolute';
  emoji.style.fontSize = `${Math.random() * 20 + 80}px`;
  emoji.style.opacity = '0.1';
  emoji.style.left = `calc(${(laneIndex / lanes.length) * 100}% + 1vw)`;
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
      emoji.remove();
      lanes[laneIndex] = false;
    }
  });

  const interval = setInterval(() => {
    emoji.textContent = emojiAnimation.value;
  }, 300);
  emojiIntervals.set(emoji, interval);
}

let spawnInterval;
onMounted(async () => {
  await nextTick();
  spawnInterval = setInterval(() => {
    if (emojiContainer.value?.children.length < maxEmojis) {
      fallingEffect();
    }
  }, 700);
});

onBeforeUnmount(() => {
  clearInterval(spawnInterval);
  emojiIntervals.forEach(clearInterval);
  emojiIntervals.clear();
  stopEmojiAnim(); //kill animation
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
