<template>
  <div class="frame-margin-control">
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="0"
      max="0.2"
      step="0.01"
    />
    <span class="value">{{ (modelValue * 100).toFixed(0) }}%</span>
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
  gap: 0.5rem;
  align-items: center;
}

input[type="range"] {
  flex: 1;
}

.value {
  min-width: 40px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>