<template>
  <label class="checkbox-wrapper">
    <input 
      type="checkbox" 
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-base"
    />
    <span class="checkbox-label">Show grid</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>