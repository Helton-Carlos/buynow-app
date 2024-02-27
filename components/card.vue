<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  sector: string;
  amount: number;
}>();

defineEmits<(e:'getProduct') => void>();
</script>

<template>
 <div class="flex items-center justify-between mt-3" @click="$emit('getProduct')">
    <img
      class="w-[125px] h-[85px] border-4 border-purple rounded-lg"
      :src="image" 
      :alt="title" 
    />

    <div class="w-[205px] text-left font-bold text-base">
     <p class="text-base">{{ title }}</p> 
    
     <div>
      <span class="text-sm">Setor: </span>
      <span class="text-sm capitalize">{{ sector }}</span>
     </div>
    </div>


    <span class="w-[105px] text-center font-bold text-xl pt-1">
      {{ amount }}x
    </span> 
 </div>
</template>
