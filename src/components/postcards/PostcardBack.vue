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

const props = defineProps({
  countryData: Object,
  motif: String,
  drawableArea: Object,
  canvasDimensions: Object,
  showGrid: Boolean,
  palette: String,
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
      p.textSize(16)
      p.text('Select a country', p.width / 2, p.height / 2)
      return
    }
    
    const motifObj = motifs[props.motif]
    
    if (motifObj) {
      try {
        const centerX = props.canvasDimensions.width / 5
        const centerY = props.canvasDimensions.height / 4
        const size = Math.min(props.drawableArea.width, props.drawableArea.height) * 0.3
        
        motifObj.draw(p, centerX, centerY, size, props.countryData, props.palette)

        // Draw grid around motif if enabled
        if (props.showGrid) {
          p.stroke(200)  // Light gray
          p.strokeWeight(0.4)
          p.noFill()
          
          // Draw a square around the motif
          const gridSize = size
          p.rect(
            centerX - gridSize / 2,
            centerY - gridSize / 2,
            gridSize,
            gridSize
          )
        }
        
        const explanation = motifObj.explain(props.countryData)
        
        p.fill('#333')
        p.noStroke()
        p.textAlign(p.LEFT, p.TOP)
        p.textSize(14)
        p.textWrap(p.WORD)
        
        const textX = centerX - size/2
        const textY = centerY + size * 0.8
        const textWidth = props.drawableArea.width * 0.8
        
        p.text(
          explanation,
          textX,
          textY,
          textWidth
        )
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