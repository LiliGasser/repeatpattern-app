<template>
  <div>
    <h3>Front</h3>
    <div ref="container" class="postcard-canvas"></div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
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

const { container, sketch, redraw } = useP5Svg((p) => {
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
    // Set default background
    p.background(255)
    
    // Don't draw if we don't have the necessary data
    if (!props.countryData || !props.drawableArea || !props.gridLayout) {
      // Draw a message instead
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
  }
})

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
}
</style>