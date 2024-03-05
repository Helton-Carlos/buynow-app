<script setup lang="ts">
import camera from '/icons/camera.svg';
import { useProductsStore } from '~/stores/products';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addIndexedDBProduct } =  useProductsStore();

const player: Ref<HTMLCanvasElement | undefined> = ref();
const canvas: Ref<HTMLCanvasElement | undefined> = ref();

const cameraOn = ref<boolean>(true);
const openPlayer = ref<boolean>(true);

const name = ref<string>('');
const quantidade = ref<string>('');
const valor = ref<number>();
const link = ref<string>('');

function back() {
  router.push({ name:"init" })
}

function onSubmit() {
  const product = {
    name: name.value,
    quantidade: quantidade.value,
    valor: valor.value,
    link: link.value, 
    canvas: canvas.value?.toDataURL("image/png")
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
  canvas.value?.getContext("2d")?.drawImage(player.value, 0, 0, 340, 250);

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
        Link:
      </label>

      <input 
        class="input"
        type="text" 
        name="link" 
        id="link"
        placeholder="ex: www.buynow.com.br"
        v-model="link"
      />

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
          Bater
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
