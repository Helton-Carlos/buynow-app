<script setup lang="ts">
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
      <input 
        class="input"
        type="text" 
        name="add" 
        id="add"
        placeholder="Adicione o setor"
        v-model="add"
      />

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

      <hr />
    </div>
  </div>
</template>
