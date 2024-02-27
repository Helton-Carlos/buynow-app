<script setup lg="ts">
import geladeira from '/icons/geladeira.png';
//import audio from '/images/audio.svg';

import { useRouter } from 'vue-router';

const router = useRouter();

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
