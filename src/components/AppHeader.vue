<template>
  <header class="bg-transparent text-white px-6 py-4">
    <div class="max-w-6xl mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0">
      <AppLogo />

      <nav
          class="w-full md:w-auto flex justify-center md:justify-end gap-6 text-md font-medium bg-teal-600 rounded-lg px-4 py-2"
      >
        <RouterLink
            to="/"
            class="hover:underline transition-opacity opacity-90 hover:opacity-100"
        >
          Home
        </RouterLink>
        <RouterLink
            :to="addJokeLink"
            class="hover:underline transition-opacity opacity-90 hover:opacity-100"
        >
          Add Joke
        </RouterLink>
      </nav>
    </div>
  </header>
</template>


<script setup>

import {RouterLink} from "vue-router";
import AppLogo from "@/components/AppLogo.vue";
</script>

<style lang="scss" scoped>

</style>