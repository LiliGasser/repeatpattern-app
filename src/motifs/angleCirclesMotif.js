import * as d3 from 'd3'
import { getMotifColors } from './colors'
import { MOTIF_POSITIONS } from './positions'

/**
 * Angle Circles Motif
 * Four arc segments in a 2x2 grid, with arc angle based on data values
 * Positioning: Defined in positions.js
 */
export const angleCirclesMotif = {
  name: 'Angle circles',
  id: 'angle-circles',
  
  /**
   * Draw a 2x2 grid of arc segments with angles based on GCCS values
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
    
    // Create d3 scaleLinear for angle (0-100 maps to angle range)
    // Original code uses angleScale which maps to angle
    const angleScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, Math.PI]) // 0 to 180 degrees
    
    // Starting rotation 
    const initialRotation = Math.PI
    
    // Draw each arc using shared position configuration
    MOTIF_POSITIONS.forEach((pos, i) => {
      const angle = angleScale(values[pos.dataKey])
      const arcRadius = size * 0.5 // Full half-cell width/height
      
      // Calculate position for this quadrant
      const posX = x + pos.xOffset * size
      const posY = y + pos.yOffset * size
      
      p.fill(colors[pos.colorKey])
      p.noStroke()
      p.push()
      
      // Translate to position and rotate
      p.translate(posX, posY)
      p.rotate(initialRotation + i * Math.PI / 2)
      
      // The arc is centered at quarter-cell from origin in rotated space
      p.arc(
        0,
        0,
        arcRadius, 
        arcRadius, 
        -angle + 5 * Math.PI / 4, 
        angle + 5 * Math.PI / 4
      )
      
      p.pop()
    })
  }
}