<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="dropdown-base dropdown-with-arrow" 
  >
    <option :value="null" disabled>Select a country...</option>
    <option 
      v-for="country in countries" 
      :key="country.country_de" 
      :value="country.country_de"
    >
      {{ country.country }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: String,
  countries: Array
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>