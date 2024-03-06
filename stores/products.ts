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
          const db : any = (event?.target as any)?.result;
  
          if (!db.objectStoreNames.contains('productsDB')) {
           db.createObjectStore('productsDB', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db : any = (event?.target as any)?.result;
  
          const transaction = db.transaction(['productsDB'], 'readwrite');
          const objectStore = transaction.objectStore('productsDB');
     
          this.products.push(products)

          objectStore.add(products);
        };
      } catch (error) {
          console.error('Erro: ' + error);
      }
    },

    getindexedDBProduct() {
      const request = indexedDB.open('db-local-products');

      request.onsuccess = (event) => {
        const db : any = (event?.target as any)?.result;

        try {
          const transaction = db.transaction(['productsDB'], 'readonly');
          const objectStore = transaction.objectStore('productsDB');
          const cursorRequest = objectStore.openCursor();

          cursorRequest.onsuccess = (event: { target: { result: any; }; }) => {
            const result = event.target.result;
          
            if (result) {
             return result.value
            }
          }
        } catch(e) {
          console.error(e)
        }
      }
    },

    getStorageProduct() {
      const userLocal = localStorage?.getItem('products');
      const product = userLocal ? JSON.parse(userLocal) : null;

      return product;
    },

    validationIndexedDBProducts() {
      return !localStorage.getItem('products') ? this.getindexedDBProduct() : this.getStorageProduct();
    },
  },
});