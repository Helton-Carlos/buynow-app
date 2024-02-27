<script setup lg="ts">
import add from '/icons/add.svg';
import products from '/icons/products.svg';
import approve from '/icons/approve.svg';
import config from '/icons/config.svg';

import { useRouter } from 'vue-router';

const router = useRouter();

const infoBox = [
  {
    icon: add,
    title: 'Adicionar Produtos',
    path: 'add-products'
  },
  {
    icon: products,
    title: 'Produtos Cadastrados',
    path: 'products-registered'
  },
  {
    icon: approve,
    title: 'Aprovados',
    path: 'approve'
  },
  {
    icon: config,
    title: 'Configurar',
    path: 'config'
  },
]

function getRouter(name) {
  router.push({name})
}
</script>

<template>
  <div>
    <div class="w-[350px] flex justify-center mx-auto flex-wrap gap-5">
      <box 
        v-for="(box, title) in infoBox" 
        :key="title"
        :icon= "box.icon"
        :title="box.title"
        @getRouter="getRouter(box.path)"
      />
    </div>
  </div>
</template>
