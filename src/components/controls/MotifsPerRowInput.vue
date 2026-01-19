<template>
  <div class="motifs-per-row-control">
    <input 
      type="number" 
      :value="modelValue" 
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
    />
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.motifs-per-row-control {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

input[type="number"] {
  width: 60px;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="range"] {
  flex: 1;
}
</style>