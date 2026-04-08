<template>
  <div class="segmented-control">
    <button
      v-for="option in fontOptions"
      :key="option.value"
      type="button"
      @click="$emit('update:modelValue', option.value)"
      :class="['segment', { active: modelValue === option.value }]"
    >
      {{ option.label }}
    </button>
  </div>
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

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>