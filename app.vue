<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function back() {
  router.push({ name: 'init' });
}
</script>

<template>
  <div class="px-2">
    <div
      v-if="!(route.name === 'index')"
      class="flex justify-center text-center"
    >
      <div>
        <h2
          @click="back"
          class="font-bold text-2xl my-4 cursor-pointer"
        >
          BUY<span class="text-purple">NOW</span>
        </h2>

        <p
          v-if="route.name === 'init'"
          class="w-[250px] my-12 md:w-[440px] text-base"
        >
          Organize suas comprinhas com os produtinhos para sua casa.
        </p>
      </div>
    </div>

    <NuxtPwaManifest />
      <NuxtLoadingIndicator />
    <NuxtPage />
  </div>
</template>
