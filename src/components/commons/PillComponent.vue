<template>
  <div class="pill-wrapper" :style="{ backgroundColor: activeColor }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const activeColor = computed(() => {
  var rgbColor = Math.floor(Math.random()*16777215).toString(16)
  return '#' + rgbColor
})
</script>
