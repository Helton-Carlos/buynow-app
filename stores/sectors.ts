import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia';

export const useStatusStore = defineStore('sectors', {
  state: () => ({
    sectors: useLocalStorage('sectors', []),
  }),

  actions: {
    async addIndexedDBSectors(sectors: string[]) {
      try {
        const dbName = 'db-local-sectors';
        const dbVersion = 1;
  
        const request = indexedDB.open(dbName, dbVersion);
  
        request.onupgradeneeded = (event) => {
          const db = event.target?.result;
  
          if (!db.objectStoreNames.contains('sectorsDB')) {
            db.createObjectStore('sectorsDB', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db = event.target?.result;
  
          const transaction = db.transaction(['sectorsDB'], 'readwrite');
          const objectStore = transaction.objectStore('sectorsDB');
          
          this.sectors.push(sectors)
          console.log(sectors);
          
          objectStore.add(sectors);
        };
      } catch (error) {
          console.error('Erro: ' + error);
      }
    },
  },
});