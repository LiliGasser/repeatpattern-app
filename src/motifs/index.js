import { circlesMotif } from './circlesMotif'
import { angleCirclesMotif } from './angleCirclesMotif'
//import { squaresMotif } from './squaresMotif'
//import { trianglesMotif } from './trianglesMotif'

// Export all motifs as an object
export const motifs = {
  circles: circlesMotif,
  'angle-circles': angleCirclesMotif,
  //squares: squaresMotif,
  //triangles: trianglesMotif
  // Add more motifs here as you create them
}

// Export options array for the selector dropdown
export const motifOptions = Object.values(motifs).map(m => ({
  value: m.id,
  label: m.name
}))