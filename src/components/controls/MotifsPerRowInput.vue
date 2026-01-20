<template>
  <div class="motifs-per-row-control">
    <input 
      type="number" 
      :value="modelValue" 
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
      class="number-input"
    />
    <input 
      type="range" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      min="2"
      max="20"
      step="1"
      class="slider"
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
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  text-align: center;  /* Changed from default (left) to center */
}

.number-input:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
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
</style>