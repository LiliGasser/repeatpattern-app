// Define color palettes
export const colorPalettes = {
    // Main palette: Icecream
    icecream: {
    name: 'Ice cream',
    wtp: '#ffc33e',
    norm: '#646563',
    wtpBelief: '#f17e84',
    government: '#5c7d99',
    },
    // Secondary palette: Retro
    retro: {
    name: 'Retro',
    wtp: '#f37124',
    norm: '#566c67',
    wtpBelief: '#96b27e',
    government: '#67897f',
    },
};

// Create options array for selector
export const paletteOptions = Object.keys(colorPalettes).map(key => ({
  value: key,
  label: colorPalettes[key].name
}))

// Helper function to get colors by palette name
export function getMotifColors(paletteName = 'icecream') {
  return colorPalettes[paletteName] || colorPalettes.icecream
}