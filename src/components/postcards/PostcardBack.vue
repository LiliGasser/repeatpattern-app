<template>
  <div>
    <h3>Back</h3>
    <div ref="container" class="postcard-canvas"></div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useP5Svg } from '../../composables/useP5Svg'
import { motifs } from '../../motifs'
import { pointsToPixels, typographyConfig } from '../../utils/typography'
import { getMotifColors } from '../../motifs/colors'

const props = defineProps({
  countryData: Object,
  motif: String,
  drawableArea: Object,
  canvasDimensions: Object,
  showGrid: Boolean,
  palette: String,
  dpi: Number,
})

const emit = defineEmits(['sketch-ready'])

const createSketch = () => (p) => {
  p.setup = () => {
    if (!props.canvasDimensions) return
    
    p.createCanvas(
      props.canvasDimensions.width,
      props.canvasDimensions.height,
      p.SVG
    )
    p.noLoop()
  }
  
  p.draw = () => {
    p.background(255)
    
    if (!props.countryData || !props.drawableArea) {
      p.fill(150)
      p.noStroke()
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(pointsToPixels(12))
      p.text('Select a country', p.width / 2, p.height / 2)
      return
    }

    // Set the x position of the separator
    const midX = props.canvasDimensions.width * 0.575
    
    const motifObj = motifs[props.motif]
    
    if (motifObj) {
      try {
        // LEFT HALF - Content 
        const centerMotifX = props.canvasDimensions.width*0.28
        const centerMotifY = props.canvasDimensions.height*0.28
        const leftTextX = props.canvasDimensions.width*0.02
        const topTextY = props.canvasDimensions.height*0.02
        const size = Math.min(props.drawableArea.width, props.drawableArea.height) * 0.3
        
        // Draw motif
        motifObj.draw(p, centerMotifX, centerMotifY, size, props.countryData, props.palette)
        
        // Draw grid around motif if enabled
        if (props.showGrid) {
          p.stroke(200)
          p.strokeWeight(0.4)
          p.noFill()
          
          const gridSize = size
          p.rect(
            centerMotifX - gridSize / 2,
            centerMotifY - gridSize / 2,
            gridSize,
            gridSize
          )
        }

        // General settings for text
        p.noStroke()

        // Write title
        const titleText = "Sag’s weiter"
        p.fill(0)
        p.textAlign(p.LEFT, p.TOP) // TODO Bottom needed, and then p.TextAscent?
        p.textSize(pointsToPixels(18))
        p.textFont(typographyConfig.value.titleFont)  // Set title font
        console.log('title font', typographyConfig.value.titleFont)
        p.text(
          titleText,
          leftTextX,
          topTextY,
        )
        
        // Get four-part explanation from country data
        const explanation = props.countryData.motifExplanation
        if (explanation) {
          const fontSizeLegend = pointsToPixels(8)
          const lineHeightLegend = fontSizeLegend * 1.2
          
          p.textFont(typographyConfig.value.mainFont)  // Set main font
          p.noStroke()
  
          // Get colors from the selected palette
          const colors = getMotifColors(props.palette)
  
          // Position settings from original code
          const xPosLeft = props.canvasDimensions.width * 0.18
          const xPosRight = props.canvasDimensions.width * 0.38
          const legendTextYStart = topTextY + pointsToPixels(24)
          const legendTextYStart2 = centerMotifY + size * 0.3
  
          // WTP (top-left) - RIGHT ALIGNED
          p.textAlign(p.RIGHT, p.BOTTOM)
          p.fill(colors.wtp)
          
          // Split explanation into lines and render each
          const wtpLines = explanation.wtp.split('\n')
          wtpLines.forEach((line, index) => {
            p.textSize(fontSizeLegend)
            p.text(
              line,
              xPosLeft,
              legendTextYStart + index * lineHeightLegend
            )
          })
  
          // Norm (top-right) - LEFT ALIGNED
          p.textAlign(p.LEFT, p.BOTTOM)
          p.fill(colors.norm)
          
          const normLines = explanation.norm.split('\n')
          normLines.forEach((line, index) => {
            p.textSize(fontSizeLegend)
            p.text(
              line,
              xPosRight,
              legendTextYStart + index * lineHeightLegend
            )
          })
  
          // WTP Belief (bottom-right) - LEFT ALIGNED
          p.textAlign(p.LEFT, p.BOTTOM)
          p.fill(colors.wtpBelief)
          
          const wtpBeliefLines = explanation.wtpBelief.split('\n')
          wtpBeliefLines.forEach((line, index) => {
            p.textSize(fontSizeLegend)
            p.text(
              line,
              xPosRight,
              legendTextYStart2 + index * lineHeightLegend
            )
          })
  
          // Government (bottom-left) - RIGHT ALIGNED
          p.textAlign(p.RIGHT, p.BOTTOM)
          p.fill(colors.government)
          
          const govLines = explanation.government.split('\n')
          govLines.forEach((line, index) => {
            p.textSize(fontSizeLegend)
            p.text(
              line,
              xPosLeft,
              legendTextYStart2 + index * lineHeightLegend
            )
          })
        }
        // Write paragraph
        const paragraphText = "Wem sagst du das weiter?"
        p.fill(0)
        p.textAlign(p.LEFT, p.TOP) // TODO Bottom needed, and then p.TextAscent?
        p.textSize(pointsToPixels(8))
        p.text(
          paragraphText,
          leftTextX,
          props.canvasDimensions.height*0.55,
        )
        
        // SEPARATOR - Vertical text in the middle
        // TODO same separator as in v1 (is it a question of font family?)
        p.push()
        p.translate(midX, props.canvasDimensions.height / 2)
        p.rotate(-p.HALF_PI)  // Rotate -90 degrees for vertical text
        
        p.fill('#333')
        p.noStroke()
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(pointsToPixels(6))
        
        const separatorText = 'Lilian Gasser . CAS Generative Data Design . Hochschule der Künste Bern . 2025'
        p.text(separatorText, 0, 0)
        
        p.pop()

        // RIGHT HALF - 4 horizontal lines for address
        // TODO same lines as in v1
        p.push()
        p.noFill()
        p.stroke(0)
        p.strokeWeight(0.5)
        p.line(props.canvasDimensions.width * 0.54 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.50, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.50)
        p.line(props.canvasDimensions.width * 0.54 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.58, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.58)
        p.line(props.canvasDimensions.width * 0.54 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.66, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.66)
        p.line(props.canvasDimensions.width * 0.54 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.74, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.74)
        p.pop()


      } catch (err) {
        console.error('Error drawing back:', err)
      }
    }
  }
}

const { container, getSketch, redraw, recreate } = useP5Svg(createSketch())

// Emit sketch after mount
onMounted(() => {
  setTimeout(() => {
    const sketch = getSketch()
    if (sketch) {
      emit('sketch-ready', sketch)
    }
  }, 100)
})

// Watch for canvas dimension changes and recreate
watch(() => props.canvasDimensions, (newDims, oldDims) => {
  if (newDims && oldDims && 
      (newDims.width !== oldDims.width || newDims.height !== oldDims.height)) {
    recreate(createSketch())
    setTimeout(() => {
      emit('sketch-ready', getSketch())
    }, 100)
  }
}, { deep: true })

// Watch for other changes and just redraw
watch(() => [
  props.countryData, 
  props.motif, 
  props.drawableArea,
  props.canvasDimensions,
  props.showGrid,
  props.palette,
  typographyConfig.value.titleFont,
  typographyConfig.value.mainFont   
], () => {
  redraw()
}, { deep: true })
</script>

<style scoped>
h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.postcard-canvas {
  border: 1px solid #ddd;
  overflow: hidden;
  width: fit-content;
  margin: 0;
  padding: 0;
  line-height: 0;
}
</style>