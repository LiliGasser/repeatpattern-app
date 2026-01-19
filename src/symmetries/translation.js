export const translationSymmetry = {
  name: 'Translation (Grid)',
  id: 'translation',
  
  /**
   * Apply symmetry transformation and draw motifs
   * @param {p5} p - p5 instance
   * @param {Object} drawableArea - { x, y, width, height }
   * @param {Object} gridLayout - { cols, rows, cellWidth, cellHeight }
   * @param {Function} drawMotif - function to draw single motif
   * @param {Object} countryData - country data
   */
  apply(p, drawableArea, gridLayout, drawMotif, countryData) {
    const { cols, rows, cellWidth, cellHeight } = gridLayout
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = drawableArea.x + i * cellWidth + cellWidth / 2
        const y = drawableArea.y + j * cellHeight + cellHeight / 2
        const size = Math.min(cellWidth, cellHeight)
        
        drawMotif(p, x, y, size, countryData)
      }
    }
  }
}