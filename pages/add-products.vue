<script setup lang="ts">
import camera from '/icons/camera.svg';
import { useProductsStore } from '~/stores/products';
import { useStatusStore } from '~/stores/sectors';
import { useRouter } from 'vue-router';

const router = useRouter();

const { addIndexedDBProduct } =  useProductsStore();
const { validationIndexedDBsectors } = useStatusStore();

const player: Ref<HTMLCanvasElement | undefined> = ref();
const canvas: Ref<HTMLCanvasElement | undefined> = ref();

const cameraOn = ref<boolean>(true);
const openPlayer = ref<boolean>(true);

const name = ref<string>('');
const quantidade = ref<string>('');
const valor = ref<number>();
const sectors = ref<string>('');

function back() {
  router.push({ name:"init" })
}

function onSubmit() {
  const product = {
    title: name.value,
    amount: quantidade.value,
    price: valor.value, 
    sector: sectors.value,
    image: canvas.value?.toDataURL("image/png")
  };

  addIndexedDBProduct(product);
  back();
}

function openCamera() {
  openPlayer.value = true; 

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      player.value.srcObject = localMediaStream;
      player.value?.play();

      cameraOn.value = false;
    })
    .catch(err => {
      console.error( err);
    });
}

function takePhoto() {
  canvas.value?.getContext("2d")?.drawImage(player.value, 0, 0, 408, 300);

  canvas.value?.toDataURL("image/png");   

  openPlayer.value = false;
  cameraOn.value = true;
}
</script>

<template>
  <div class="mx-auto max-w-[450px]">
    <p class="font-bold text-base pb-4">
      Adicionar produtos:
    </p>

    <div @submit="onSubmit">
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
        v-model="name"
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
        v-model="quantidade"
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
        v-model="valor"
      />

      <label
       class="text-sm pb-2"
       for="link"
      >
        Setor:
      </label>

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

      <button 
        v-if="cameraOn"
        class="btn-primary"
        @click="openCamera"
      >
        <img 
          :src="camera"
          alt="câmera"
        />
          Câmera
      </button>

      <video 
        v-if="openPlayer"
        class="my-2 rounded-lg"
        ref="player"  
      />
    
      <button 
        v-if="!cameraOn"
        class="btn-primary"
        @click="takePhoto"
      >
        <img 
          :src="camera"
          alt="câmera"
        />
          Tirar foto
      </button>

      <canvas 
        ref="canvas" 
        id="canvas" 
        class="my-2 rounded-lg"
        width="400" 
        height="300" 
      />

      <hr class="my-8 text-gray"/>

      <div class="flex gap-2">
        <button class="btn-negative" @click="back">
          Cancelar
        </button>

        <button class="btn-positive" @click="onSubmit">
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>
