<template>
  <div class="segmented-control">
    <button
      v-for="option in paletteSelectorOptions"
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
import { paletteSelectorOptions } from '../../motifs/colors'

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>