<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
    class="country-select"
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
.country-select {
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

.country-select:focus {
  outline: none;
  border-color: #0066ff;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.country-select:hover {
  border-color: #999;
}
</style>