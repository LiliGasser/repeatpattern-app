<template>
  <div class="segmented-control">
    <button
      v-for="option in paletteOptions"
      :key="option.value"
      type="button"
      @click="$emit('update:modelValue', option.value)"
      :class="['segment', { active: modelValue === option.value }]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
import { paletteOptions } from '../../motifs/colors'

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>