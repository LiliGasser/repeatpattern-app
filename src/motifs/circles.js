import * as d3 from 'd3'
import { getMotifColors } from './colors'

/**
 * Circles Motif - 2x2 Grid
 * Four circles representing gccs_wtp, gccs_wtp_belief, gccs_norm, gccs_government
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
   */
  draw(p, x, y, size, countryData, palette) {
    // Get GCCS values (0-1 range, where 1 = 100%)
    const wtp = countryData?.gccs_wtp || 0
    const wtpBelief = countryData?.gccs_wtp_belief || 0
    const norm = countryData?.gccs_norm || 0
    const government = countryData?.gccs_government || 0

    // Get colors from selected palette
    const colors = getMotifColors(palette)
    
    // Create d3 scaleSqrt for circle radius
    // This makes the area proportional to the value
    const minRadius = 0
    const maxRadius = size * 0.25   // A quarter of the motif size
    
    const radiusScale = d3.scaleSqrt()
      .domain([0, 100])
      .range([minRadius, maxRadius])
    
    // Calculate radii for each circle
    const radiusWtp = radiusScale(wtp)
    const radiusWtpBelief = radiusScale(wtpBelief)
    const radiusNorm = radiusScale(norm)
    const radiusGovernment = radiusScale(government)
    
    // Define 2x2 grid positions (relative to center x, y)
    const offset = size * 0.25   // A quarter of the motif size
    
    const positions = [
      { x: x - offset, y: y - offset, r: radiusWtp, color: colors.wtp },
      { x: x + offset, y: y - offset, r: radiusWtpBelief, color: colors.wtpBelief },
      { x: x - offset, y: y + offset, r: radiusNorm, color: colors.norm },
      { x: x + offset, y: y + offset, r: radiusGovernment, color: colors.government }
    ]
    
    // Draw each circle
    positions.forEach(pos => {
      p.fill(pos.color)
      p.noStroke()
      p.circle(pos.x, pos.y, pos.r * 2) 
    })
  },
  
  /**
   * Generate explanation text for the back of the postcard
   * @param {Object} countryData - data for the selected country
   * @returns {string} - explanation text
   */
  explain(countryData) {
    if (!countryData) {
      return 'Four circles represent climate change attitudes across different dimensions.'
    }
    
    const countryName = countryData.country_de || 'Unknown'
    
    // Get values and convert to percentages
    const wtp = countryData.gccs_wtp || 0
    const wtpBelief = countryData.gccs_wtp_belief || 0
    const norm = countryData.gccs_norm || 0
    const government = countryData.gccs_government || 0
    
    const wtpPct = wtp.toFixed(0)
    const wtpBeliefPct = wtpBelief.toFixed(0)
    const normPct = norm.toFixed(0)
    const governmentPct = government.toFixed(0)
    
    return `${countryName}

Top-left: Willingness to Pay - ${wtpPct}%
Top-right: WTP Belief - ${wtpBeliefPct}%
Bottom-left: Social Norm - ${normPct}%
Bottom-right: Government Action - ${governmentPct}%
`
  }
}