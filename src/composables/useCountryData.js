import { ref, computed, onMounted } from 'vue'
import { loadCountryMatrix } from '../utils/loadCountryData'

export function useCountryData() {
  const countries = ref([])
  const selectedCountry = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const countryDataMap = ref(new Map()) // Store all country data

  /**
   * Get the full data object for the selected country
   */
  const selectedCountryData = computed(() => {
    if (!selectedCountry.value) {
      return null
    }
    
    return countryDataMap.value.get(selectedCountry.value) || null
  })

  /**
   * Load country data from GCCS CSV
   */
  const loadData = async () => {
    loading.value = true
    error.value = null

    try {
      // Load GCCS matrix data (keyed by country_de)
      countryDataMap.value = await loadCountryMatrix()
      
      // Build countries array from the map
      countries.value = Array.from(countryDataMap.value.entries()).map(([name_de, data]) => ({
        code: name_de.toLowerCase().replace(/\s+/g, '-'), // Create URL-friendly code
        country_de: name_de,  // German name (used as value)
        ...data
      }))

      console.log('Loaded data for', countries.value.length, 'countries')
      console.log('Countries:', countries.value)

      // Auto-select Switzerland (Schweiz) as default
      const switzerlandEntry = countries.value.find(c => c.country_de === 'Schweiz')
      if (switzerlandEntry && !selectedCountry.value) {
        selectedCountry.value = switzerlandEntry.country_de
      } else if (countries.value.length > 0 && !selectedCountry.value) {
        // Fallback to first country if Switzerland not found
        selectedCountry.value = countries.value[0].country_de
      }

      loading.value = false
    } catch (err) {
      error.value = err.message
      loading.value = false
      console.error('Error loading country data:', err)
    }
  }

  /**
   * Get a specific column value for the selected country
   */
  const getCountryValue = (columnName) => {
    if (!selectedCountryData.value) return null
    return selectedCountryData.value[columnName]
  }

  /**
   * Get all column names from the dataset
   */
  const getColumns = computed(() => {
    if (countries.value.length === 0) return []
    return Object.keys(countries.value[0])
  })

  // Load data when composable is used
  onMounted(() => {
    loadData()
  })

  return {
    // State
    countries,
    selectedCountry,
    loading,
    error,
    countryDataMap,
    
    // Computed
    selectedCountryData,
    getColumns,
    
    // Methods
    loadData,
    getCountryValue
  }
}