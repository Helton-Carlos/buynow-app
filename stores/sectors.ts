import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia';

export const useStatusStore = defineStore('sectors', {
  state: () => ({
    sectors: useStorage('sectors', []),
  }),

  actions: {
    getStorageSectors() {
      const userLocal = localStorage?.getItem('sectors');
      const sectors =  userLocal ? JSON.parse(userLocal) : null
  
      return sectors;
    },

    addStorageSectors(sector: string) {
      this.sectors.push(sector);   
    },

    async addIndexedDBSectors(sectors: string[]) {
      try {
        const dbName = 'db-local-sectors';
        const dbVersion = 1;
  
        const request = indexedDB.open(dbName, dbVersion);
  
        request.onupgradeneeded = (event) => {
          const db : any = (event?.target as any)?.result;
  
          if (!db.objectStoreNames.contains('sectorsDB')) {
            db.createObjectStore('sectorsDB', { keyPath: 'id', autoIncrement: true });
          }
        };

        request.onsuccess = (event) => {
          const db : any = (event?.target as any)?.result;
  
          const transaction = db.transaction(['sectorsDB'], 'readwrite');
          const objectStore = transaction.objectStore('sectorsDB');
          
          this.sectors.push(sectors)
          
          objectStore.add({sectors});
        };
      } catch (error) {
          console.error('Erro: ' + error);
      }
    },

    getindexedDBSectors() {
      const request = indexedDB.open('db-local-sectors');

      request.onsuccess = (event) => {
        const db : any = (event?.target as any)?.result;

        try {
          const transaction = db.transaction(['sectorsDB'], 'readonly');
          const objectStore = transaction.objectStore('sectorsDB');
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

    validationIndexedDBsectors() {
      return !localStorage.getItem('sectors') ? this.getindexedDBSectors() : this.getStorageSectors();
    },
  },
});