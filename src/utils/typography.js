import { ref, computed } from 'vue'

// Configuration for typography - DPI is set from config
export const typographyConfig = ref({
  fontFamily: 'Arial',
  dpi: 100  // Default, will be overridden by config
})

// Helper function to convert points to pixels
export function pointsToPixels(points) {
  return points * (typographyConfig.value.dpi / 72)
}

// Predefined text styles
export const textStyles = computed(() => ({
  heading: {
    size: pointsToPixels(18),
    family: typographyConfig.value.fontFamily,
    weight: 'bold'
  },
  body: {
    size: pointsToPixels(14),
    family: typographyConfig.value.fontFamily,
    weight: 'normal'
  },
  small: {
    size: pointsToPixels(10),
    family: typographyConfig.value.fontFamily,
    weight: 'normal'
  },
  caption: {
    size: pointsToPixels(8),
    family: typographyConfig.value.fontFamily,
    weight: 'normal'
  }
}))

// Function to update DPI (called from config)
export function setTypographyDPI(dpi) {
  typographyConfig.value.dpi = dpi
}

// Function to update font family
export function setFontFamily(fontFamily) {
  typographyConfig.value.fontFamily = fontFamily
}