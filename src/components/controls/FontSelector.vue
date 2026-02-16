<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="font-select"
  >
    <option 
      v-for="option in fontOptions" 
      :key="option.value" 
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { computed } from 'vue'
import { availableTitleFonts, availableMainFonts } from '../../utils/typography'

const props = defineProps({
  modelValue: String,
  fontType: {
    type: String,
    default: 'main',
    validator: (value) => ['title', 'main'].includes(value)
  }
})

const fontOptions = computed(() => {
  return props.fontType === 'title' ? availableTitleFonts : availableMainFonts
})

console.log('FontSelector modelValue:', props.modelValue)
console.log('FontSelector fontType:', props.fontType)

defineEmits(['update:modelValue'])
</script>

<style scoped>
.font-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}

.font-select:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.font-select:hover {
  border-color: #999;
}
</style>