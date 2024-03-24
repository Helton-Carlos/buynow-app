<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const { validationIndexedDBProducts } = useProductsStore();

const router = useRouter();
const route = useRoute();

const { id } = route.params;

function back() {
  router.push({ name: 'init' });
}

function onSubmit() {
  router.push({ name: 'init' });
}

function getProduct() {
  return validationIndexedDBProducts().find((item: any) => item.title === id);
}

getProduct();
</script>

<template>
  <div class="mx-auto">
    <div class="mt-4 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold capitalize px-2">
          <span class="text-purple">Produto:</span>
          {{ getProduct().title }}
        </h2>

        <p class="font-semibold capitalize px-2">
          <span class="text-purple">Setor:</span>
          {{ getProduct().sector }}
        </p>

        <p class="font-semibold capitalize px-2">
          <span class="text-purple">Unidade:</span>
          {{ getProduct().amount }}
        </p>

        <p class="font-semibold capitalize px-2">
          <span class="text-purple">Valor:</span>
          {{ getProduct().price }}
        </p>
      </div>

      <photo :image="getProduct().image" :title="getProduct().title" />
    </div>

    <div class="flex gap-2 mt-4">
      <button class="btn-negative" @click="back">Cancelar</button>

      <button class="btn-positive" @click="onSubmit">Aprovar</button>
    </div>
  </div>
</template>
