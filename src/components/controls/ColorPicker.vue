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
</style>