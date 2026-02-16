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
        const size = Math.min(props.drawableArea.width, props.drawableArea.height) * 0.26
        
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
          const fontSizeLegend = pointsToPixels(5) 
          const lineHeightLegend = fontSizeLegend * 1.2
          
          p.textFont(typographyConfig.value.mainFont) 
          p.noStroke()
  
          // Get colors from the selected palette
          const colors = getMotifColors(props.palette)
  
          // Position settings from original code
          const xPosLeft = props.canvasDimensions.width * 0.18
          const xPosRight = props.canvasDimensions.width * 0.38
          const legendTextYStart = topTextY + pointsToPixels(50)
          const legendTextYStart2 = centerMotifY + size * 0.3 - pointsToPixels(8) 
  
          // WTP (top-left)
          p.textAlign(p.RIGHT, p.BOTTOM)
          p.fill(colors.wtp)
          
          // Split explanation into lines and render each
          const wtpLines = explanation.wtp.split('\n')
          const fontSizePercent = pointsToPixels(9) 
          const lineHeightPercent = fontSizePercent * 1.2
          let currentY = legendTextYStart
          wtpLines.forEach((line, index) => {
            if (index === 0) {
              // First line (percentage) - use normal spacing before it
              p.textSize(fontSizePercent)
              p.text(line, xPosLeft, currentY)
            } else {
              // Regular lines
              p.textSize(fontSizeLegend)
              p.text(line, xPosLeft, currentY)
            }
            currentY += lineHeightLegend
          })
  
          // Norm (top-right) 
          p.textAlign(p.LEFT, p.BOTTOM)
          p.fill(colors.norm)
          
          const normLines = explanation.norm.split('\n')
          currentY = legendTextYStart
          normLines.forEach((line, index) => {
            if (index === 0) {
              // First line (percentage)
              p.textSize(fontSizePercent)
              p.text(line, xPosRight, currentY)
            } else {
              // Regular lines
              p.textSize(fontSizeLegend)
              p.text(line, xPosRight, currentY)
            }
            currentY += lineHeightLegend
          })
  
          // WTP Belief (bottom-right) - LEFT ALIGNED
          p.textAlign(p.LEFT, p.BOTTOM)
          p.fill(colors.wtpBelief)
          p.textSize(fontSizeLegend)
          let txtHeightLegend = p.textAscent() + p.textDescent();
          p.textSize(fontSizePercent)
          let txtHeightPercent = p.textAscent() + p.textDescent();
          let txtHeightDifference = txtHeightPercent - txtHeightLegend;
          p.textSize(fontSizeLegend)
          
          const wtpBeliefLines = explanation.wtpBelief.split('\n')
          currentY = legendTextYStart2 - txtHeightDifference
          wtpBeliefLines.forEach((line, index) => {
            if (index === 0) {
              // First line - add extra space after
              p.textSize(fontSizeLegend)
              p.text(line, xPosRight, currentY)
              currentY += lineHeightPercent

            } else if (index === 1) {
              // Second line (percentage)
              p.textSize(fontSizePercent)
              p.text(line, xPosRight, currentY)
              currentY += lineHeightLegend
            } else {
              // Regular lines 
              p.textSize(fontSizeLegend)
              p.text(line, xPosRight, currentY)
              currentY += lineHeightLegend
            }
          })
  
          // Government (bottom-left) - RIGHT ALIGNED
          p.textAlign(p.RIGHT, p.BOTTOM)
          p.fill(colors.government)
          
          const govLines = explanation.government.split('\n')
          currentY = legendTextYStart2  // Start at base position, same as WTP Belief
          govLines.forEach((line, index) => {
            if (index === 0) {
              // First line (percentage) - add extra space for larger font
              //currentY += lineHeightPercent  // Extra space for percentage
              p.textSize(fontSizePercent)
              p.text(line, xPosLeft, currentY)
              currentY += lineHeightLegend
            } else {
              // Regular lines
              p.textSize(fontSizeLegend)
              p.text(line, xPosLeft, currentY)
              currentY += lineHeightLegend
            }
          })
        }

        // Write paragraph
        const paragraphText = "Dieses Muster wiederholt sich in allen 125 Ländern aus der Studie.\nGlobal wollen 86% der Menschen mehr Klimaschutz von der Bevölkerung,\nwährend 89% mehr Klimaschutz von der Politik verlangen.\nWem sagst du das weiter?"
        p.fill(0)
        p.textAlign(p.LEFT, p.BOTTOM)
        p.textSize(pointsToPixels(5))
        p.text(
          paragraphText,
          leftTextX,
          props.canvasDimensions.height*0.53,
        )
        
        // SEPARATOR - Vertical text in the middle
        p.push()
        p.translate(midX, props.canvasDimensions.height / 2)
        p.rotate(-p.HALF_PI)  // Rotate -90 degrees for vertical text
        
        p.fill('#333')
        p.noStroke()
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(pointsToPixels(4))
        
        const separatorText = 'Lilian Gasser . CAS Generative Data Design . Hochschule der Künste Bern . 2025'
        p.text(separatorText, 0, 0)
        p.pop()

        // SOURCE Information at the bottom
        const infoText = "Weiterlesen: https://rcap.netlify.app . Datenquelle: Global Climate Change Survey https://gccs.iza.org/"
        p.fill(0)
        p.textAlign(p.LEFT, p.BOTTOM)
        p.textSize(pointsToPixels(4))
        p.text(
          infoText,
          leftTextX,
          props.canvasDimensions.height*0.97,  // TODO same height as country name on front
        )
        

        // RIGHT HALF - 4 horizontal lines for address
        p.push()
        p.noFill()
        p.stroke(0)
        p.strokeWeight(0.3)
        p.line(props.canvasDimensions.width * 0.55 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.54, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.54)
        p.line(props.canvasDimensions.width * 0.55 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.62, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.62)
        p.line(props.canvasDimensions.width * 0.55 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.70, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.70)
        p.line(props.canvasDimensions.width * 0.55 + 60 * props.dpi / 150, props.canvasDimensions.height * 0.78, props.canvasDimensions.width - 70 * props.dpi / 150, props.canvasDimensions.height * 0.78)
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