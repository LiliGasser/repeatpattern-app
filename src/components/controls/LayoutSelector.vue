<template>
  <div class="layout-selector">
    <label class="layout-option">
      <input 
        type="radio" 
        :value="'landscape'" 
        :checked="modelValue === 'landscape'"
        @change="$emit('update:modelValue', 'landscape')"
        class="radio-input"
      />
      <span class="radio-label">Landscape</span>
    </label>
    <label class="layout-option">
      <input 
        type="radio" 
        :value="'portrait'" 
        :checked="modelValue === 'portrait'"
        @change="$emit('update:modelValue', 'portrait')"
        class="radio-input"
      />
      <span class="radio-label">Portrait</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.layout-selector {
  display: flex;
  gap: 1rem;
}

.layout-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  user-select: none;
}

.radio-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s;
}

.radio-input:checked {
  border-color: #0066ff;
  background-color: #0066ff;
}

.radio-input:checked::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
}

.radio-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.radio-input:hover {
  border-color: #0066ff;
}

.layout-option:hover .radio-label {
  color: #0066ff;
}
</style>