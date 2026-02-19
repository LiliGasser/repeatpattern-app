import * as d3 from 'd3'
import { getMotifColors } from './colors'

/**
 * Circles Motif
 * Four circles in a 2x2 grid
 * Positioning: top-left (WTP), top-right (Norm), bottom-right (WTP Belief), bottom-left (Government)
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
    const wtp = countryData?.gccs_wtp || 0
    const norm = countryData?.gccs_norm || 0
    const wtpBelief = countryData?.gccs_wtp_belief || 0
    const government = countryData?.gccs_government || 0
    
    // Get colors from selected palette
    const colors = getMotifColors(palette)
    
    // Create d3 scaleSqrt for circle radius
    const minRadius = 0
    const maxRadius = size * 0.25
    
    const radiusScale = d3.scaleSqrt()
      .domain([0, 100])
      .range([minRadius, maxRadius])
    
    // Calculate radii for each circle
    const radiusWtp = radiusScale(wtp)
    const radiusNorm = radiusScale(norm)
    const radiusWtpBelief = radiusScale(wtpBelief)
    const radiusGovernment = radiusScale(government)
    
    // Define 2x2 grid positions (relative to center x, y)
    const offset = size * 0.25
    
    const positions = [
      // Top left: WTP
      { 
        x: x - offset, 
        y: y - offset, 
        r: radiusWtp, 
        color: colors.wtp 
      },
      // Top right: Norm
      { 
        x: x + offset, 
        y: y - offset, 
        r: radiusNorm, 
        color: colors.norm 
      },
      // Bottom right: WTP Belief
      { 
        x: x + offset, 
        y: y + offset, 
        r: radiusWtpBelief, 
        color: colors.wtpBelief 
      },
      // Bottom left: Government
      { 
        x: x - offset, 
        y: y + offset, 
        r: radiusGovernment, 
        color: colors.government 
      }
    ]
    
    // Draw each circle
    positions.forEach(pos => {
      p.fill(pos.color)
      p.noStroke()
      p.circle(pos.x, pos.y, pos.r * 2)
    })
  }
}