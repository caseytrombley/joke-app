<template>
  <RouterLink to="/" @click.prevent="replayAnimation">
    <span ref="logo" class="logo text-pink-500 text-6xl inline-block">
      <span
          v-for="(char, index) in logoText"
          :key="index"
          class="logo-wrapper"
      >
        <span class="logo-letter londrina-shadow-regular">{{ char }}</span>
      </span>
    </span>
  </RouterLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { RouterLink } from 'vue-router';

const logo = ref(null);
const logoText = 'JOKESTER'.split('');

const animateLogo = () => {
  const wrappers = logo.value.querySelectorAll('.logo-wrapper');

  gsap.set(wrappers, {
    transformOrigin: 'center center',
    transformStyle: 'preserve-3d',
    opacity: 0,
    scale: 0.5,
    x: () => gsap.utils.random(-150, 150),
    y: () => gsap.utils.random(-150, 150),
    rotationX: () => gsap.utils.random(-360, 360),
    rotationY: () => gsap.utils.random(-360, 360),
  });

  gsap.to(wrappers, {
    opacity: 1,
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    duration: 1.2,
    ease: 'bounce.out',
    stagger: {
      each: 0.08,
      from: 'random',
    },
  });
};

const replayAnimation = (e) => {
  e?.preventDefault?.();
  animateLogo();
};

onMounted(() => {
  animateLogo();
});
</script>

<style scoped>
.logo {
  display: inline-block;
  perspective: 1000px;
}

.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  will-change: transform;
  transform-origin: center;
}

.logo-letter {
  display: inline-block;
  line-height: 1;
}
</style>
