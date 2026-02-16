import { ref, computed } from 'vue'

// Configuration for typography - includes two separate fonts
export const typographyConfig = ref({
  titleFont: 'Arial',     // Font for titles
  mainFont: 'Georgia',    // Font for main text
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

// Available fonts list
export const availableFonts = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Palatino', label: 'Palatino' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Impact', label: 'Impact' }
]