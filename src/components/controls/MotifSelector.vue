<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="motif-select"
  >
    <option 
      v-for="option in motifOptions" 
      :key="option.value" 
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { motifOptions } from '@/motifs'

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.motif-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
}

.motif-select:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}
</style>