import * as d3 from 'd3'
import { getMotifColors } from './colors'
import { MOTIF_POSITIONS } from './positions'

/**
 * Circles Motif
 * Four circles in a 2x2 grid
 * Positioning: Defined in positions.js
 */
export const circlesMotif = {
  name: 'Circles',
  id: 'circles',
  
  /**
   * Draw a 2x2 grid of circles with sizes based on GCCS values
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
    
    // Create d3 scaleSqrt for circle radius
    const radiusScale = d3.scaleSqrt()
      .domain([0, 100])
      .range([0, size * 0.25])
    
    // Draw each circle using shared position configuration
    MOTIF_POSITIONS.forEach(pos => {
      const radius = radiusScale(values[pos.dataKey])
      p.fill(colors[pos.colorKey])
      p.noStroke()
      p.circle(
        x + pos.xOffset * size,
        y + pos.yOffset * size,
        radius * 2
      )
    })
  }
}