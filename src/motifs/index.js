import { circlesMotif } from './circlesMotif'
//import { squaresMotif } from './squaresMotif'
//import { trianglesMotif } from './trianglesMotif'

// Export all motifs as an object
export const motifs = {
  circles: circlesMotif,
  //squares: squaresMotif,
  //triangles: trianglesMotif
  // Add more motifs here as you create them
}

// Export options array for the selector dropdown
export const motifOptions = Object.values(motifs).map(m => ({
  value: m.id,
  label: m.name
}))