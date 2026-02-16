import { ref, computed } from 'vue'

// Configuration for typography - includes two separate fonts
export const typographyConfig = ref({
  titleFont: 'The Seasons',     // Font for titles
  mainFont: 'Soleil',    // Font for main text
  dpi: 100
})

// Helper function to convert points to pixels
export function pointsToPixels(points) {
  return points * (typographyConfig.value.dpi / 72)
}

// Predefined text styles
export const textStyles = computed(() => ({
  title: {
    size: pointsToPixels(18),
    family: typographyConfig.value.titleFont,
    weight: 'bold'
  },
  heading: {
    size: pointsToPixels(16),
    family: typographyConfig.value.titleFont,
    weight: 'bold'
  },
  body: {
    size: pointsToPixels(14),
    family: typographyConfig.value.mainFont,
    weight: 'normal'
  },
  small: {
    size: pointsToPixels(10),
    family: typographyConfig.value.mainFont,
    weight: 'normal'
  },
  caption: {
    size: pointsToPixels(8),
    family: typographyConfig.value.mainFont,
    weight: 'normal'
  }
}))

// Function to update DPI (called from config)
export function setTypographyDPI(dpi) {
  typographyConfig.value.dpi = dpi
}

// Function to update title font
export function setTitleFont(fontFamily) {
  typographyConfig.value.titleFont = fontFamily
}

// Function to update main font
export function setMainFont(fontFamily) {
  typographyConfig.value.mainFont = fontFamily
}

// Available fonts for title - first 3 families
export const availableTitleFonts = [
  { value: 'the-seasons', label: 'The Seasons' },
  { value: 'gelato-luxe', label: 'Gelato Luxe' },
  { value: 'miller-display', label: 'Miller Display' },
]

// Available fonts for main text - last 4 families
export const availableMainFonts = [
  { value: 'soleil', label: 'Soleil' },
  { value: 'sofia-pro', label: 'Sofia Pro' },
  { value: 'halcom', label: 'Halcom' },
  { value: 'benton-modern-display', label: 'Benton Modern Display' },
]