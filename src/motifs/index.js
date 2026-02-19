import { circlesMotif } from './circlesMotif'
import { angleCirclesMotif } from './angleCirclesMotif'
import { threeQuarterCirclesMotif } from './threeQuarterCirclesMotif'

// Export all motifs as an object
export const motifs = {
  circles: circlesMotif,
  'angle-circles': angleCirclesMotif,
  'three-quarter-circles': threeQuarterCirclesMotif,
}

// Export options array for the selector dropdown
export const motifOptions = Object.values(motifs).map(m => ({
  value: m.id,
  label: m.name
}))