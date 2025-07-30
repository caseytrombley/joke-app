<template>
  <RouterLink to="/" @click.prevent="replayAnimation">
    <div ref="logo" class="logo text-pink-600 text-6xl inline-block">
      <span
          v-for="(char, index) in logoText"
          :key="index"
          class="logo-letter londrina-shadow-regular"
      >
        {{ char }}
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { RouterLink } from 'vue-router';

const logo = ref(null);
const logoText = 'Jokester'.split('');

const animateLogo = () => {
  const wrappers = logo.value.querySelectorAll('.logo-letter');

  gsap.set(wrappers, {
    //transformOrigin: 'center center',
    //transformStyle: 'preserve-3d',
    opacity: 0,
    scale: () => gsap.utils.random(0.5, 5),
    //x: () => gsap.utils.random(-150, 150),
    y: () => gsap.utils.random(-150, 150),
    //rotation: () => gsap.utils.random(-360, 360),
    // rotationX: () => gsap.utils.random(-360, 360),
    // rotationY: () => gsap.utils.random(-360, 360),
  });

  gsap.to(wrappers, {
    opacity: 1,
    x: 0,
    y: 0,
    rotation: 0,
    // rotationX: 0,
    // rotationY: 0,
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

<style lang="scss" scoped>
.logo {
  display: inline-block;
  position: relative;
  //perspective: 1000px;
}

.logo-letter {
  display: inline-block;
  position: relative;
  //line-height: 1;
  //width: 100%;
  //height: 100%;
  transform-box: border-box;
  transform-style: preserve-3d;
  transform-origin: 25% 25%;
}
</style>
