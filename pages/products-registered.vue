<script setup lang="ts">
import geladeira from '/icons/geladeira.png';
import { useStatusStore } from '~/store/index';


import { useRouter } from 'vue-router';

const { $state } = useStatusStore();

const router = useRouter();
const search = ref<string>('');
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
    <input 
      class="input"
      type="text" 
      name="search" 
      id="search"
      placeholder="Pesquisar"
      v-model="search"
    />

    {{ $state }}

    <div>  
      <select
        class="input"
        v-model="sectors"
      >
        <option 
          v-for="check in $state.sectors" 
          :key="check"
        >
          {{ check }}
        </option>
      </select>
    </div>
  

    <p class="font-bold text-base pb-4">
      Produtos cadastrados:
    </p>

    <div>
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
