import * as d3 from 'd3'
import { getMotifColors } from './colors'
import { MOTIF_POSITIONS } from './positions'

/**
 * Three Quarter Circles Motif
 * Four 3/4 circles (270° arcs) in a 2x2 grid
 * Area scales linearly with percentage values (like a pie chart at 75%)
 * Positioning: Defined in positions.js
 */
export const threeQuarterCirclesMotif = {
  name: 'Three quarter circles',
  id: 'three-quarter-circles',
  
  /**
   * Draw a 2x2 grid of 3/4 circles with area based on GCCS values
   * @param {p5} p - p5 instance
   * @param {number} x - x position (center of the 2x2 grid)
   * @param {number} y - y position (center of the 2x2 grid)
   * @param {number} size - size of the motif unit (total space available)
   * @param {Object} countryData - data for the selected country
   * @param {string} palette - color palette name
   */
  draw(p, x, y, size, countryData, palette) {
    // Get GCCS values (0-100 range)
    const values = {
      wtp: countryData?.gccs_wtp || 0,
      norm: countryData?.gccs_norm || 0,
      wtpBelief: countryData?.gccs_wtp_belief || 0,
      government: countryData?.gccs_government || 0
    }
    
    // Get colors from selected palette
    const colors = getMotifColors(palette)
    
    // Create d3 scaleSqrt for circle radius (area scales linearly)
    const radiusScale = d3.scaleSqrt()
      .domain([0, 100])
      .range([0, size * 0.25])

    // Starting rotation 
    const initialRotation = -Math.PI/2
    
    // Draw each 3/4 circle using shared position configuration
    MOTIF_POSITIONS.forEach((pos, i) => {
      const radius = radiusScale(values[pos.dataKey])
      
      // Calculate position for this quadrant
      const posX = x + pos.xOffset * size
      const posY = y + pos.yOffset * size
      
      p.fill(colors[pos.colorKey])
      p.noStroke()
      p.push()
      
      // Translate to position and rotate
      p.translate(posX, posY)
      p.rotate(initialRotation + i * Math.PI)
      
      // Draw 3/4 circle (270 degrees)
      // Start at -PI/2 (12 o'clock) and go to PI (9 o'clock)
      p.arc(
        0,
        0,
        radius * 2,
        radius * 2,
        -Math.PI / 2,
        Math.PI,
      )

      p.pop()
    })
  }
}