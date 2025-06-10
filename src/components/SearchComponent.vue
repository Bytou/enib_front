<template>
  <div class="search-wrapper">
    <input
      v-model="name"
      type="text"
      class="search-input"
      placeholder="Recherchez l'auteur d'un livre"
    />
    <button class="search-button"  @click="onSearch">Recherche</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const name = ref('')

// Emit the search event
const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

function onSearch() {
  emit('search', name.value)
}
</script>
