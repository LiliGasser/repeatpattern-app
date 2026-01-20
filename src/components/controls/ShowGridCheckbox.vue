<template>
  <div class="show-grid-control">
    <label class="checkbox-option">
      <input 
        type="checkbox" 
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="checkbox-input"
      />
      <span class="checkbox-label">Show grid</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.show-grid-control {
  display: flex;
  align-items: center;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  user-select: none;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 3px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-input:checked {
  border-color: #0066ff;
  background-color: #0066ff;
}

.checkbox-input:checked::before {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.checkbox-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.checkbox-input:hover {
  border-color: #0066ff;
}

.checkbox-option:hover .checkbox-label {
  color: #0066ff;
}
</style>