<template>
  <div class="bg-gray-800">
    <AppMasthead>
      <AppHeader />
      <AppHero2 />
    </AppMasthead>

    <main class="bg-white pb-12">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';
import { useAddJokeLink } from '@/composables/useAddJokeLink';
import AppHeader from "@/components/AppHeader.vue";
import AppMasthead from "@/components/AppMasthead.vue";
import AppHero2 from "@/components/AppHero2.vue";

const { addJokeLink } = useAddJokeLink();

</script>
