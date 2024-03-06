<script setup lang="ts">
import iconSearch from '/icons/search.svg';
import { useStatusStore } from '~/stores/sectors';
import { useProductsStore } from '~/stores/products';

const { validationIndexedDBsectors } = useStatusStore();
const { validationIndexedDBProducts } = useProductsStore();

const search = ref<string>('');
const sectors = ref<string>('');
const total = ref<string>('3.000,22');

function getSearch() {
  let title = validationIndexedDBProducts().map((item: { title: any; }) => item.title);

  return title.filter((item: string) =>
    item.toLowerCase().includes(search.value.toLowerCase()),
  );
}

const getProducts = computed<any>(() => {
  return getSearch().map((searchs: any) => {
    return validationIndexedDBProducts().find((item: any) => item.title === searchs);
  });
});
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
          v-for="check in validationIndexedDBsectors()" 
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
        v-for="(product, index) in getProducts" 
        :key="index"
        :image= "product.image"
        :title= "product.title"
        :sector="product.sector"
        :amount="product.amount"
        :price="product.price"
      />
    </div>
  </div>
</template>
