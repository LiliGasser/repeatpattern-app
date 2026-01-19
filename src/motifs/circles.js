/**
 * Circles Motif
 * Draws concentric circles with colors based on country data
 */
export const circlesMotif = {
  name: 'Circles',
  id: 'circles',
  
  /**
   * Draw a single motif unit at position (x, y)
   * @param {p5} p - p5 instance
   * @param {number} x - x position (center)
   * @param {number} y - y position (center)
   * @param {number} size - size of the motif unit
   * @param {Object} countryData - data for the selected country
   */
  draw(p, x, y, size, countryData) {
    // Get color from country data, or use default
    // Make sure we always have a valid color string
    const mainColor = countryData?.color || '#4ECDC4'
    
    // Draw 3 concentric circles
    const numCircles = 3
    
    for (let i = numCircles; i > 0; i--) {
      const radius = (size * 0.4 * i) / numCircles
      
      // Alternate between filled and stroke circles
      if (i % 2 === 0) {
        // Filled circle - ensure fill is set BEFORE noStroke
        p.fill(mainColor)
        p.noStroke()
      } else {
        // Stroke circle - ensure stroke is set BEFORE noFill
        p.stroke(mainColor)
        p.strokeWeight(size * 0.02)
        p.noFill()
      }
      
      p.circle(x, y, radius * 2)
    }
    
    // Add center dot - explicitly set fill
    p.noStroke()
    p.fill(mainColor)
    p.circle(x, y, size * 0.05)
  },
  
  /**
   * Generate explanation text for the back of the postcard
   * @param {Object} countryData - data for the selected country
   * @returns {string} - explanation text
   */
  explain(countryData) {
    if (!countryData) {
      return 'Concentric circles represent unity and wholeness.'
    }
    
    const countryName = countryData.name || 'Unknown'
    const wtp = countryData.gccs_wtp 
      ? `Climate willingness to pay: ${(countryData.gccs_wtp * 100).toFixed(0)}%`
      : ''
    
    return `Circles Pattern for ${countryName}

Concentric circles represent unity, harmony, and the interconnected nature of communities. Each ring symbolizes a layer of society, from individuals to the whole nation.

${wtp}

The repeating pattern shows how individual units come together to form a cohesive whole, just as citizens unite to form a nation.`
  }
}