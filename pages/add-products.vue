<script setup lang="ts">
import camera from '/icons/camera.svg';

import { useRouter } from 'vue-router';

const router = useRouter();

function back() {
  router.push({ name:"init" })
}

function test() {
  alert('hey')
}
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <p class="font-bold text-base pb-4">
      Adicionar produtos:
    </p>

    <div @submit="test">
      <label
       class="text-sm pb-2"
       for="nome"
      >
        Nome do produto:
      </label>
      
      <input 
        class="input"
        type="text" 
        name="nome" 
        id="nome"
        placeholder="ex: Geladeira"
      />

      <label
       class="text-sm pb-2"
       for="quantidade"
      >
        Quantidade:
      </label>

      <input 
        class="input"
        type="number" 
        name="quantidade" 
        id="quantidade"
        placeholder="ex: 2"
      />

      <label
       class="text-sm pb-2"
       for="valor"
      >
        Valor:
      </label>

      <input 
        class="input"
        type="number" 
        name="valor" 
        id="valor"
        placeholder="ex: 2.599,30"
      />


      <label
       class="text-sm pb-2"
       for="link"
      >
        Link:
      </label>

      <input 
        class="input"
        type="text" 
        name="link" 
        id="link"
        placeholder="ex: www.buynow.com.br"
      />

      <button 
        class="btn-primary"
      >
        <img 
          :src="camera"
          alt="câmera"
        />
          Câmera
      </button>

      <hr class="my-8 text-gray"/>

      <div class="flex gap-2">
        <button class="btn-negative" @click="back">
          Cancelar
        </button>

        <button class="btn-positive" @click="test">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>
