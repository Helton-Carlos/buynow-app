<script setup lang="ts">
import iconAprovar from '/icons/aprovar.svg';
import iconReprovar from '/icons/reprovar.svg';
import { useStatusStore } from '~/stores/sectors';
import { useNetwork, useGeolocation  } from '@vueuse/core';

const { isOnline, effectiveType} = useNetwork();
const { coords, locatedAt, error, resume, pause } = useGeolocation()

const add = ref<string[]>([]);

const { $state, addIndexedDBSectors } = useStatusStore();

const status = computed(() => isOnline.value ? 'bg-green' : 'bg-red')

const statusOnline = computed(() => {
  return isOnline.value ? effectiveType.value : 'Offline';
});

function addSectors() {
  addIndexedDBSectors(add.value);
  add.value = []
}
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <div 
      class="py-2 px-2 rounded-md text-black"
      :class="status"
    >
      <span class="font-bold">Status: </span>
      <span class="font-bold">{{ statusOnline }}</span>
    </div>

    <div class="bg-gray-light px-2 my-2">
      <pre lang="json">{{
        JSON.stringify(
          {
            coords: {
              accuracy: coords.accuracy,
              latitude: coords.latitude,
              longitude: coords.longitude,
              altitude: coords.altitude,
              altitudeAccuracy: coords.altitudeAccuracy,
              heading: coords.heading,
              speed: coords.speed,
            },
            locatedAt,
            error: error ? error.message : error,
          },
          null,
          2,
        )
      }}
      </pre>

      <button 
        class="btn-primary font-bold" 
        @click="resume"
      >
        Buscar localização
      </button>
    </div>
    
    <form 
      class="my-4"
      @submit.prevent="addSectors"
    >
      <p class="font-bold text-base">
        Adicionar Setores:
      </p>
      <div class="flex justify-end items-center relative">
        <img 
          v-if="true"
          class="absolute mr-2 w-4" 
          :src="iconAprovar" 
          alt="add aprovar" 
        />

        <img 
          v-else
          class="absolute mr-2 w-4" 
          :src="iconReprovar" 
          alt="add reprovar" 
        />

        <input 
          class="input"
          type="text" 
          name="add" 
          id="add"
          placeholder="Adicione o setor"
          v-model="add"
        />
      </div>

      <button class="btn-primary font-bold">
       + Adicionar
      </button>
    </form>

    <div 
      class="flex items-center"
      v-for="check in $state.sectors" 
      :key="check"
    >
      <p 
        class="pl-1 font-bold capitalize"
        :for="check" 
      >
       - {{ check }}
      </p>
    </div>
  </div>
</template>
