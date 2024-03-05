import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: useStorage('products', []),
  }),

  actions: {
    async addIndexedDBProduct(products: any) {
      try {
        const dbName = 'db-local-products';
        const dbVersion = 1;
  
        const request = indexedDB.open(dbName, dbVersion);
  
        request.onupgradeneeded = (event) => {
          const db = event.target?.result;
  
          if (!db.objectStoreNames.contains('productsDB')) {
           db.createObjectStore('productsDB', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db = event.target?.result;
  
          const transaction = db.transaction(['productsDB'], 'readwrite');
          const objectStore = transaction.objectStore('productsDB');
          
          this.products.push(products)

          objectStore.add(products);
        };
      } catch (error) {
          console.error('Erro: ' + error);
      }
    },
  },
});