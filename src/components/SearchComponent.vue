<template>
  <div class="search-wrapper">
    <input v-model="name" type="text" class="search-input" placeholder="Recherchez l'auteur d'un livre"/>
    <button class="search-button" @click="emitSearch">Recherche</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const name = ref('');
const emit = defineEmits(['search-author']);

const emitSearch = () => {
  if (name.value) {
    emit('search-author', name.value);
  }
};
</script>