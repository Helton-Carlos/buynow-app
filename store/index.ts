import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia';

export const useStatusStore = defineStore('status', {
  state: () => ({
    sectors: useLocalStorage('sectors', []),
  }),

  actions: {
    async getSectors(sectors: string) {
      this.$state.sectors.push(sectors);
    },
  },
});