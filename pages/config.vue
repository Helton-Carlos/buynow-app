<script setup lang="ts">
import { useStatusStore } from '~/stores/sectors';

const add = ref<string>('');
const note = ref<boolean>(false);

const { addStorageSectors, $state } = useStatusStore();

function addSectors() {
  if (add.value.length) {
    addStorageSectors(add.value);

    add.value = '';
  } else {
    note.value = true;

    setTimeout(() => {
      note.value = false;
    }, 2500);
  }
}

function nextPage() {
  navigateTo('init');
}
</script>

<template>
  <div class="max-w-[450px] mx-auto">
    <form class="my-4" @submit.prevent="addSectors">
      <p class="font-bold text-base">Adicionar os setores da sua casa:</p>
      <div>
        <input
          class="input"
          type="text"
          name="add"
          id="add"
          placeholder="Ex: Cozinha"
          v-model="add"
        />

        <p v-if="note" class="bg-red-light text-red font-bold p-1 rounded-lg">
          "Digite algum setor de sua casa."
        </p>
      </div>

      <button class="btn-positive font-bold">Adicionar +</button>
    </form>

    <div class="flex items-center" v-for="check in $state.sectors" :key="check">
      <p class="pl-1 font-bold capitalize" :for="check">- {{ check }}</p>
    </div>

    <button class="btn-standard flex items-center font-bold" @click="nextPage">
      <span>
        Avançar
      </span> 

      <img 
       class="h-[15px]"  
       src="../public/icons/arrow-next.svg" 
       alt="avançar" 
      />
    </button>
  </div>
</template>
