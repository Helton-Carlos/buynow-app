<script setup lang="ts">
import iconSearch from '/icons/search.svg';
import geladeira from '/icons/geladeira.png';
import { useStatusStore } from '~/store/index';

const { $state } = useStatusStore();

const search = ref<string>('');
const total = ref<string>('2,500.22');
const sectors = ref<string>('');

const products = [
  {
    image: geladeira,
    title: 'Geladeira Frost Free Brastemp',
    sector: 'cozinha',
    amount: 1
  },
  {
    image: geladeira,
    title: 'Geladeira Frost Free Brastemp',
    sector: 'cozinha',
    amount: 1
  }
]
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <div class="flex justify-end items-center relative">
      <img 
        class="absolute mr-2 w-4" 
        :src="iconSearch" 
        alt="Search Icon" 
      />

      <input 
        class="input px-2"
        type="text" 
        name="search" 
        id="search"
        placeholder="Pesquisar"
        v-model="search"
      />
    </div>

    <div>  
      <select
        class="input"
        v-model="sectors"
      >
        <option disabled value="">Escolha um setor</option>
        <option 
          class="capitalize"
          v-for="check in $state.sectors" 
          :key="check"
        >
          {{ check }}
        </option>
      </select>
    </div>

    <p class="font-bold text-base pb-4">
      Provados:
    </p>

    <div>
      <p class="font-bold text-purple">
        $ {{ total }}
      </p>
      <card
        v-for="(product, index) in products" 
        :key="index"
        :image= "product.image"
        :title= "product.title"
        :sector="product.sector"
        :amount="product.amount"
      />
    </div>
  </div>
</template>
