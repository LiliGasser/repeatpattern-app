<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="country-select"
  >
    <option :value="null" disabled>Select a country...</option>
    <option 
      v-for="country in countries" 
      :key="country.name" 
      :value="country.name"
    >
      {{ country.name }}
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
.country-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
}

.country-select:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}
</style>