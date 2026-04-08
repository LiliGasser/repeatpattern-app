<template>
  <div class="frame-margin-control">
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="0"
      max="0.2"
      step="0.01"
      class="slider-base"
    />
    <input n
      type="number" 
      :value="(modelValue * 100).toFixed(0)"
      @input="$emit('update:modelValue', Number($event.target.value) / 100)"
      min="0"
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
.frame-margin-control {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.number-input {
  width: 50px;
  text-align: center;
}
</style>