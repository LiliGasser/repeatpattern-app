import { ref, watch, computed } from 'vue'
import { colorPalettes, loadPaletteToCustom } from '../motifs/colors'
import { setTypographyDPI, setTitleFont, setMainFont, typographyConfig } from '../utils/typography'

export function usePostcardConfig() {
  // DPI and typography settings
  const dpi = ref(100)
  const titleFont = ref('Arial')
  const mainFont = ref('Georgia')
  
  // Set values
  setTypographyDPI(dpi.value)
  setTitleFont(titleFont.value)
  setMainFont(mainFont.value)

  // DEBUG LOGS
  console.log('Initial titleFont:', titleFont.value)
  console.log('Initial mainFont:', mainFont.value)
  console.log('Typography config after init:', { ...typographyConfig.value })
  
  // Watch DPI changes and update typography
  watch(dpi, (newDpi) => {
    setTypographyDPI(newDpi)
  })

  // Watch font changes
  watch(titleFont, (newFont) => {
    setTitleFont(newFont)
  })
  
  watch(mainFont, (newFont) => {
    setMainFont(newFont)
  })

  // Configuration options
  const selectedCountry = ref(null)
  const selectedMotif = ref('circles')
  const selectedSymmetry = ref('translation')
  const layout = ref('landscape') // 'portrait' or 'landscape' - only for FRONT
  const frameMarginRatio = ref(0.05) // 0 to 0.2 - only for FRONT
  const motifsPerRow = ref(11) // number of motifs horizontally - only for FRONT
  const showGrid = ref(false)
  const selectedPalette = ref('icecream')
  
  // Convert reactive object to computed so Vue tracks it properly
  const customColors = computed(() => ({
    wtp: colorPalettes.custom.wtp,
    wtpBelief: colorPalettes.custom.wtpBelief,
    norm: colorPalettes.custom.norm,
    government: colorPalettes.custom.government
  }))

  // Watch palette changes to update custom colors when switching palettes
  watch(selectedPalette, (newPalette) => {
    if (newPalette !== 'custom') {
      loadPaletteToCustom(newPalette)
    }
  })
 
  // Postcard dimensions in mm (A5)
  const baseDimensions = {
    widthMM: 148,
    heightMM: 105
  }
  
  // Front postcard dimensions (affected by layout)
  const frontPostcardDimensions = computed(() => {
    return layout.value === 'landscape' 
      ? { width: baseDimensions.widthMM, height: baseDimensions.heightMM }
      : { width: baseDimensions.heightMM, height: baseDimensions.widthMM }
  })
  
  // Back postcard dimensions (always landscape)
  const backPostcardDimensions = computed(() => {
    return { width: baseDimensions.widthMM, height: baseDimensions.heightMM }
  })
  
  // Convert front to pixels
  const frontCanvasDimensions = computed(() => {
    const widthPx = Math.floor(frontPostcardDimensions.value.width * dpi.value / 25.4)
    const heightPx = Math.floor(frontPostcardDimensions.value.height * dpi.value / 25.4)
    
    return { width: widthPx, height: heightPx }
  })
  
  // Convert back to pixels
  const backCanvasDimensions = computed(() => {
    const widthPx = Math.floor(backPostcardDimensions.value.width * dpi.value / 25.4)
    const heightPx = Math.floor(backPostcardDimensions.value.height * dpi.value / 25.4)
    
    return { width: widthPx, height: heightPx }
  })
  
  // Calculate grid layout (columns and rows)
  const gridLayout = computed(() => {
    const cols = motifsPerRow.value
    
    // Calculate available width and height with frame margin applied
    const { width: widthPx, height: heightPx } = frontCanvasDimensions.value
    const marginPx = Math.floor(Math.min(widthPx, heightPx) * frameMarginRatio.value)
    const availableWidth = widthPx - 2 * marginPx
    const availableHeight = heightPx - 2 * marginPx
    
    const cellWidth = availableWidth / cols
    const cellHeight = cellWidth // Keep cells square
    
    // Calculate how many complete rows fit
    const rows = Math.floor(availableHeight / cellHeight)
    
    return {
      cols,
      rows,
      cellWidth,
      cellHeight,
      totalMotifs: cols * rows
    }
  })
  
  // Calculate drawable area for front
  const frontDrawableArea = computed(() => {
    const { width: widthPx, height: heightPx } = frontCanvasDimensions.value
    const marginPx = Math.floor(Math.min(widthPx, heightPx) * frameMarginRatio.value)
    
    // Height is exactly the number of rows * cellHeight
    const patternHeight = gridLayout.value.rows * gridLayout.value.cellHeight
    
    return {
      x: marginPx,
      y: marginPx,
      width: widthPx - 2 * marginPx,
      height: patternHeight
    }
  })
  
  // Calculate drawable area for back
  const backDrawableArea = computed(() => {
    const { width: widthPx, height: heightPx } = backCanvasDimensions.value
    
    return {
      x: 0,
      y: 0,
      width: widthPx,
      height: heightPx
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
    showGrid,
    selectedPalette,
    customColors,
    titleFont,
    mainFont,
    dpi, 
    
    // Computed dimensions - FRONT
    frontPostcardDimensions,
    frontCanvasDimensions,
    frontDrawableArea,
    
    // Computed dimensions - BACK
    backPostcardDimensions,
    backCanvasDimensions,
    backDrawableArea,
    
    // Grid layout (for front)
    gridLayout
  }
}