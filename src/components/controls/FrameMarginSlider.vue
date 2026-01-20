<template>
  <div class="frame-margin-control">
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="0"
      max="0.2"
      step="0.01"
      class="slider"
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
  gap: 0.75rem;
  align-items: center;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0066ff;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0066ff;
  cursor: pointer;
  border: none;
}

.slider:focus {
  outline: none;
}

.slider:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2);
}

.slider:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2);
}

.value {
  min-width: 45px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;
  color: #666;
}
</style>