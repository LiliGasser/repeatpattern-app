export const rotation90Symmetry = {
  name: '90° Rotation',
  id: 'rotation90',
  
  apply(p, drawableArea, gridLayout, drawMotif, countryData) {
    const { cols, rows, cellWidth, cellHeight } = gridLayout
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = drawableArea.x + i * cellWidth + cellWidth / 2
        const y = drawableArea.y + j * cellHeight + cellHeight / 2
        const size = Math.min(cellWidth, cellHeight)
        
        // Rotate each motif by 90° * (i + j) % 4
        const angle = ((i + j) % 4) * p.HALF_PI
        
        p.push()
        p.translate(x, y)
        p.rotate(angle)
        drawMotif(p, 0, 0, size, countryData)
        p.pop()
      }
    }
  }
}