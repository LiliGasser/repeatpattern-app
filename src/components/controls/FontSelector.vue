<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="dropdown-base dropdown-with-arrow" 
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
</style>