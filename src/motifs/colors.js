import { reactive } from 'vue'

// Custom palette as a separate reactive object for direct imports
const customPalette = reactive({
  name: 'Custom',
  wtp: '#ffc33e',
  wtpBelief: '#646563',
  norm: '#f17e84',
  government: '#5c7d99',
})

// Define color palettes
export const colorPalettes = {
    // Main palette: Icecream
    icecream: {
    name: 'Ice cream',
    wtp: '#ffc33e',
    wtpBelief: '#646563',
    norm: '#f17e84',
    government: '#5c7d99',
    },
    // Secondary palette: Retro
    retro: {
    name: 'Retro',
    wtp: '#f37124',
    wtpBelief: '#566c67',
    norm: '#96b27e',
    government: '#67897f',
    },
    // Reference to custom palette
    custom: customPalette
};

// Export custom palette separately
export { customPalette }

// Create options array for selector
export const paletteOptions = Object.keys(colorPalettes).map(key => ({
  value: key,
  label: colorPalettes[key].name
}))

// Helper function to get colors by palette name
export function getMotifColors(paletteName = 'icecream') {
  return colorPalettes[paletteName] || colorPalettes.icecream
}

// Helper function to update custom palette colors
export function updateCustomColor(key, value) {
  colorPalettes.custom[key] = value
}

// Helper function to load a palette into custom
export function loadPaletteToCustom(paletteName) {
  const palette = colorPalettes[paletteName]
  if (palette) {
    colorPalettes.custom.wtp = palette.wtp
    colorPalettes.custom.wtpBelief = palette.wtpBelief
    colorPalettes.custom.norm = palette.norm
    colorPalettes.custom.government = palette.government
  }
}