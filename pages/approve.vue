<script setup lang="ts">
import geladeira from '/icons/geladeira.png';

const search = ref<string>('');
const selected = ref<string>('');
const total = ref<string>('2,500.22');


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

    <select
     class="input"
     v-model="selected"
    >
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

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
