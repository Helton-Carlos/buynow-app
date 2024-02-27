<script setup lg="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function back() {
  router.push({name: 'init'})
}
</script>

<template>
  <div>   
    <div 
      v-if="!(route.name === 'index')"
      class="flex justify-center text-center"
    >
      <div>
        <h2 
          @click="back"
          class="font-bold text-xl my-4 md:text-2xl cursor-pointer"
        >
          BUY<span class="text-purple">NOW</span>
        </h2>

        <p
          v-if="(route.name === 'init')"
          class="w-[250px] my-12 md:w-[440px] text-base">
          Organize suas comprinhas com os 
          produtinhos para sua casa.
        </p>
      </div>
    </div>

    <NuxtPage />
  </div>
</template>
