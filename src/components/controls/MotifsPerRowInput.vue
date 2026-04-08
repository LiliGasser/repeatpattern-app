<template>
  <div class="motifs-per-row-control">
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
      class="slider-base"
    />
    <input 
      type="number" 
      :value="modelValue" 
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
      class="input-base number-input"
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
  gap: 0.75rem;
  align-items: center;
}

.number-input {
  width: 50px;
  text-align: center;
}
</style>