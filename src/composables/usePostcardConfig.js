import { ref, computed } from 'vue'

export function usePostcardConfig() {
  // All configuration options
  const selectedCountry = ref(null)
  const selectedMotif = ref('circles')
  const selectedSymmetry = ref('translation')
  const layout = ref('landscape') // 'portrait' or 'landscape'
  const frameMarginRatio = ref(0.05) // 0 to 0.2
  const motifsPerRow = ref(11) // number of motifs horizontally
  
  // Postcard dimensions in mm (A5)
  const postcardDimensions = computed(() => {
    const widthMM = 148
    const heightMM = 105
    
    return layout.value === 'landscape' 
      ? { width: widthMM, height: heightMM }
      : { width: heightMM, height: widthMM }
  })
  
  // Convert to pixels
  const canvasDimensions = computed(() => {
    const dpi = 60
    const widthPx = Math.floor(postcardDimensions.value.width * dpi / 25.4)
    const heightPx = Math.floor(postcardDimensions.value.height * dpi / 25.4)
    
    return { width: widthPx, height: heightPx }
  })
  
  // Calculate drawable area after applying frame margin
  const drawableArea = computed(() => {
    const { width: widthPx, height: heightPx } = canvasDimensions.value
    const marginPx = Math.floor(Math.min(widthPx, heightPx) * frameMarginRatio.value)
    
    return {
      x: marginPx,
      y: marginPx,
      width: widthPx - 2 * marginPx,
      height: heightPx - 2 * marginPx
    }
  })
  
  // Calculate grid layout (columns and rows)
  const gridLayout = computed(() => {
    const cols = motifsPerRow.value
    const cellWidth = drawableArea.value.width / cols
    const cellHeight = cellWidth // Keep cells square
    
    // Calculate how many complete rows fit
    const rows = Math.floor(drawableArea.value.height / cellHeight)
    
    return {
      cols,
      rows,
      cellWidth,
      cellHeight,
      totalMotifs: cols * rows
    }
  })
  
  return {
    // Configuration values
    selectedCountry,
    selectedMotif,
    selectedSymmetry,
    layout,
    frameMarginRatio,
    motifsPerRow,
    
    // Computed dimensions
    postcardDimensions,
    canvasDimensions,
    drawableArea,
    gridLayout
  }
}