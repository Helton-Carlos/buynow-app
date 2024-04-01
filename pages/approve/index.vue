<script setup lang="ts">
import iconSearch from '/icons/search.svg';
import { useStatusStore } from '~/stores/sectors';
import { useProductsStore } from '~/stores/products';

const { validationIndexedDBsectors } = useStatusStore();
const { validationIndexedDBProducts } = useProductsStore();

const search = ref<string>('');
const sectors = ref<string>('');

function getSearch() {
  let title = validationIndexedDBProducts()
  .map(
    (item: { title: any }) => item.title,
  );

  return title.filter((item: string) =>
    item.toLowerCase().includes(search.value.toLowerCase()),
  );
}

function pageProducts(title: string) {
  navigateTo('/products-registered/' + title);
}

const getProducts = computed<any>(() => {
  if(sectors.value) return getsectors.value;

  return getSearch().map((searchs: any) => {
    return validationIndexedDBProducts().find(
      (item: any) => item.title === searchs,
    );
  });
});

const getsectors = computed<any>(() => {
  return validationIndexedDBProducts()
    .filter( (item: any) => item.sector === sectors.value);
});

watch(sectors, getsectors.value)
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <div class="flex justify-end items-center relative">
      <img class="absolute mr-2 w-4" :src="iconSearch" alt="Search Icon" />

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
      <select class="input" v-model="sectors">
        <option disabled value="">Escolha um setor</option>
        <option
          class="capitalize"
          v-for="check in validationIndexedDBsectors()"
          :key="check"
        >
          {{ check }}
        </option>
      </select>
    </div>

    <p class="font-bold text-base pb-4">Produtos cadastrados:</p>

    <div>
      <card
        v-for="(product, index) in getProducts"
        :key="index"
        :image="product.image"
        :title="product.title"
        :sector="product.sector"
        :amount="product.amount"
        :price="product.price"
        @getProduct="pageProducts(product.title)"
      />
    </div>
  </div>
</template>
