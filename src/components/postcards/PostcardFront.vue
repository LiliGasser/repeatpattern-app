<template>
  <div>
    <h3>Front</h3>
    <div ref="container" class="postcard-canvas"></div>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useP5Svg } from '../../composables/useP5Svg'
import { motifs } from '../../motifs'
import { symmetries } from '../../symmetries'

const props = defineProps({
  countryData: Object,
  motif: String,
  symmetry: String,
  drawableArea: Object,
  canvasDimensions: Object,
  gridLayout: Object
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
    
    if (!props.countryData || !props.drawableArea || !props.gridLayout) {
      p.fill(150)
      p.noStroke()
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(16)
      p.text('Select a country to see pattern', p.width / 2, p.height / 2)
      return
    }
    
    const motifObj = motifs[props.motif]
    const symmetryObj = symmetries[props.symmetry]
    
    if (motifObj && symmetryObj) {
      try {
        symmetryObj.apply(
          p,
          props.drawableArea,
          props.gridLayout,
          motifObj.draw.bind(motifObj),
          props.countryData
        )
      } catch (err) {
        console.error('Error drawing pattern:', err)
        p.fill(200, 0, 0)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(14)
        p.text('Error drawing pattern', p.width / 2, p.height / 2)
      }
    }
    
    // Draw country name centered in the remaining space at the bottom
    console.log(props.countryData);
    if (props.countryData && props.countryData.country_de && props.gridLayout) {
      const patternHeight = props.gridLayout.rows * props.gridLayout.cellHeight
      const patternBottom = props.drawableArea.y + patternHeight
      const remainingSpace = p.height - patternBottom
      const textY = patternBottom + (remainingSpace / 2)
      
      p.fill(0)
      p.noStroke()
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(16)
      p.text(
        props.countryData.country_de,
        p.width / 2,
        textY
      )
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
  props.symmetry, 
  props.drawableArea,
  props.gridLayout
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
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
}
</style>