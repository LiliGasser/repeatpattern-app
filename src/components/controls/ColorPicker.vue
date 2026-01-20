<template>
  <div class="color-picker-control">
    <label class="color-label">{{ label }}</label>
    <div class="color-input-wrapper">
      <input 
        type="color" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="color-input"
      />
      <span class="color-value">{{ modelValue }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.color-picker-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-label {
  font-size: 0.85rem;
  color: #666;
}

.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-input {
  width: 50px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
  background: white;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}

.color-input::-moz-color-swatch {
  border: none;
  border-radius: 2px;
}

.color-input:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.color-input:hover {
  border-color: #0066ff;
}

.color-value {
  font-family: monospace;
  font-size: 0.85rem;
  color: #666;
  user-select: all;
}
</style>