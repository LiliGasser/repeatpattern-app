/**
 * Standard 2x2 grid positions for all motifs
 * This defines which data value goes in which corner
 */
export const MOTIF_POSITIONS = [
  // Top left: WTP
  { 
    xOffset: -0.25, 
    yOffset: -0.25, 
    dataKey: 'wtp', 
    colorKey: 'wtp' 
  },
  // Top right: Norm
  { 
    xOffset: 0.25, 
    yOffset: -0.25, 
    dataKey: 'norm', 
    colorKey: 'norm' 
  },
  // Bottom right: WTP Belief
  { 
    xOffset: 0.25, 
    yOffset: 0.25, 
    dataKey: 'wtpBelief', 
    colorKey: 'wtpBelief' 
  },
  // Bottom left: Government
  { 
    xOffset: -0.25, 
    yOffset: 0.25, 
    dataKey: 'government', 
    colorKey: 'government' 
  }
]
