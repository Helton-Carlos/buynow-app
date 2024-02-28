<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue'

const router = useRouter();

onMounted(()=>{
  setTimeout(() => {
    router.push({ name: 'init'})
  }, 4000);
})
</script>

<template>
  <div class="min-h-screen flex justify-center items-center text-center">
    <div>
      <h1 class="font-bold text-3xl">
        BUY<span class="text-purple">NOW</span>
      </h1>

      <p class="text-xl">
        Organize suas comprinhas com os 
        <br/>produtinhos para sua casa.  
      </p>
    </div>
  </div>
</template>
