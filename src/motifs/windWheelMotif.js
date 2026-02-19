import * as d3 from 'd3'
import { getMotifColors } from './colors'
import { MOTIF_POSITIONS } from './positions'

/**
 * Wind Wheel Motif
 * Four isosceles triangles meeting at the center
 * Area scales linearly with percentage values
 * Each triangle fills at most half of its quadrant (100%)
 * Positioning: Defined in positions.js
 */
export const windWheelMotif = {
  name: 'Wind wheel',
  id: 'wind-wheel',
  
  /**
   * Draw a 2x2 grid of triangles with area based on GCCS values
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
    
    // Triangle height is constant: half the motif size
    const height = size / 2
    
    // Maximum triangle area (fills half a quadrant at 100%)
    // Half quadrant = (size/2 × size/2) / 2 = size²/8
    const maxArea = (size * size) / 8
    
    // Create linear scale for area
    const areaScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, maxArea])
    
    // Starting rotation - triangles point outward from center
    const initialRotation = 3*Math.PI / 4
    
    // Draw each triangle using shared position configuration
    MOTIF_POSITIONS.forEach((pos, i) => {
      const area = areaScale(values[pos.dataKey])
      
      // Calculate hypotenuse from area
      // Area = 1/2 × hypotenuse × height
      // hypotenuse = (2 × area) / height
      const hypotenuse = area > 0 ? (2 * area) / height : 0
      
      p.fill(colors[pos.colorKey])
      p.noStroke()
      p.push()
      
      // Translate to center and rotate
      p.translate(x, y)
      p.rotate(initialRotation + i * Math.PI / 2)
      
      // Draw isosceles triangle
      // Vertex at origin (center), base on the outside
      p.triangle(
        // Center
        0, 
        0, 
        // Base left corner
        -hypotenuse, 
        height,
        // Base right corner
        hypotenuse, 
        height,
      )
      
      p.pop()
    })
  }
}