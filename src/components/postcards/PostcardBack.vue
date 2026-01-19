<template>
  <div>
    <h3>Back</h3>
    <div ref="container" class="postcard-canvas"></div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useP5Svg } from '../../composables/useP5Svg'
import { motifs } from '../../motifs'

const props = defineProps({
  countryData: Object,
  motif: String,
  drawableArea: Object,
  canvasDimensions: Object
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
        // Draw one large motif in the center
        const centerX = props.canvasDimensions.width / 2
        const centerY = props.canvasDimensions.height / 3
        const size = Math.min(props.drawableArea.width, props.drawableArea.height) * 0.3
        
        motifObj.draw(p, centerX, centerY, size, props.countryData)
        
        // Draw explanation text
        const explanation = motifObj.explain(props.countryData)
        
        p.fill('#333')
        p.noStroke()
        p.textAlign(p.CENTER, p.TOP)
        p.textSize(14)
        p.textWrap(p.WORD)
        
        const textY = centerY + size * 0.8
        const textWidth = props.drawableArea.width * 0.8
        
        p.text(
          explanation,
          props.canvasDimensions.width / 2,
          textY,
          textWidth
        )
      } catch (err) {
        console.error('Error drawing back:', err)
      }
    }
  }
})

watch(() => [
  props.countryData, 
  props.motif, 
  props.drawableArea,
  props.canvasDimensions
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