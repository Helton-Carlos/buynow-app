<script setup lang="ts">
import { useStatusStore } from '~/stores/sectors';

const add = ref<string[]>([]);

const { $state, addIndexedDBSectors } = useStatusStore();

function addSectors() {
  addIndexedDBSectors(add.value);
  add.value = [];
}

function nextPage() {
  navigateTo('add-products');
}
</script>

<template>
  <div class="max-w-[450px] mx-auto">
    <form class="my-4" @submit.prevent="addSectors">
      <p class="font-bold text-base">Adicionar os setores da sua casa:</p>
      <div class="flex justify-end items-center relative">
        <input
          class="input"
          type="text"
          name="add"
          id="add"
          placeholder="Ex: Cozinha"
          v-model="add"
        />
      </div>

      <button class="btn-primary font-bold">+ Adicionar</button>
    </form>

    <div class="flex items-center" v-for="check in $state.sectors" :key="check">
      <p class="pl-1 font-bold capitalize" :for="check">- {{ check }}</p>
    </div>

    <button class="btn-primary font-bold" @click="nextPage">Avançar</button>
  </div>
</template>
