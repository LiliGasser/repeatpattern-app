<template>
  <div class="layout-selector">
    <label class="layout-option">
      <input 
        type="radio" 
        :value="'landscape'" 
        :checked="modelValue === 'landscape'"
        @change="$emit('update:modelValue', 'landscape')"
      />
      <span>Landscape</span>
    </label>
    <label class="layout-option">
      <input 
        type="radio" 
        :value="'portrait'" 
        :checked="modelValue === 'portrait'"
        @change="$emit('update:modelValue', 'portrait')"
      />
      <span>Portrait</span>
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
}

.layout-option input[type="radio"] {
  cursor: pointer;
}

.layout-option:hover {
  color: #0066ff;
}
</style>