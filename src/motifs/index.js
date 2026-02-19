import { circlesMotif } from './circlesMotif'
import { angleCirclesMotif } from './angleCirclesMotif'

// Export all motifs as an object
export const motifs = {
  circles: circlesMotif,
  'angle-circles': angleCirclesMotif,
}

// Export options array for the selector dropdown
export const motifOptions = Object.values(motifs).map(m => ({
  value: m.id,
  label: m.name
}))