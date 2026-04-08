<template>
  <div class="segmented-control">
    <button
      type="button"
      @click="$emit('update:modelValue', 'landscape')"
      :class="['segment', { active: modelValue === 'landscape' }]"
    >
      Landscape
    </button>
    <button
      type="button"
      @click="$emit('update:modelValue', 'portrait')"
      :class="['segment', { active: modelValue === 'portrait' }]"
    >
      Portrait
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>