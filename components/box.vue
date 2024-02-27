<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();

defineEmits<(e:'getRouter') => void>();
</script>

<template>
 <div class="text-gray hover:text-purple" @click="$emit('getRouter')">
    <div class="w-[105px] h-[105px] border-4 border-gray hover:border-purple">
      <div class="min-h-[105px] flex justify-center items-center">
        <img 
          class="hover:text-purple"
          :src="icon" 
          :alt="title" 
        />
      </div>
    </div>

    <div class="w-[105px] text-center font-bold text-base pt-1">
     {{ title }}  
    </div>
 </div>
</template>
