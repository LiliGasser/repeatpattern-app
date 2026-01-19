export const rotation180Symmetry = {
  name: '180° Rotation',
  id: 'rotation180',
  
  apply(p, drawableArea, gridLayout, drawMotif, countryData) {
    const { cols, rows, cellWidth, cellHeight } = gridLayout
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = drawableArea.x + i * cellWidth + cellWidth / 2
        const y = drawableArea.y + j * cellHeight + cellHeight / 2
        const size = Math.min(cellWidth, cellHeight)
        
        // Alternate between 0° and 180°
        const angle = ((i + j) % 2) * p.PI
        
        p.push()
        p.translate(x, y)
        p.rotate(angle)
        drawMotif(p, 0, 0, size, countryData)
        p.pop()
      }
    }
  }
}