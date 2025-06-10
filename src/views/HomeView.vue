<template>
  <div class="home">
    <SearchComponent @search="search" />
    <ResultatComponent ref="results" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SearchComponent from '@/components/SearchComponent.vue'
import ResultatComponent from '@/components/ResultatComponent.vue'

const results = ref<null | InstanceType<typeof ResultatComponent>>()

function search(author: string) {
  results.value?.searchAuthor(author)
}
</script>