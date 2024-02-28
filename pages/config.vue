<script setup lang="ts">
import iconAprovar from '/icons/aprovar.svg';
import iconReprovar from '/icons/reprovar.svg';
import { useStatusStore } from '~/store/index';

const add = ref<string>('');

const { $state, getSectors } = useStatusStore();
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <form 
      class="my-4"
      @submit.prevent="getSectors(add)"
    >

      <div class="flex justify-end items-center relative">
        <img 
          v-if="true"
          class="absolute mr-2 w-4" 
          :src="iconAprovar" 
          alt="add aprovar" 
        />

        <img 
          v-else
          class="absolute mr-2 w-4" 
          :src="iconReprovar" 
          alt="add reprovar" 
        />

        <input 
          class="input"
          type="text" 
          name="add" 
          id="add"
          placeholder="Adicione o setor"
          v-model="add"
        />
      </div>

      <button class="btn-positive font-bold">
       + Adicionar
      </button>
    </form>

    <p class="font-bold text-base pb-4">
      Setores:
    </p>

    <div 
      class="flex items-center"
      v-for="check in $state.sectors" 
      :key="check"
    >
      <p 
        class="pl-1 font-bold capitalize"
        :for="check" 
      >
       - {{ check }}
      </p>
    </div>
  </div>
</template>
