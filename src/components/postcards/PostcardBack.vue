<template>
  <div class="postcard-wrapper">
    <h3>Back</h3>
    <div ref="container" class="postcard-canvas"></div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useP5Svg } from '@/composables/useP5Svg'
import { motifs } from '@/motifs'

const props = defineProps({
  countryData: Object,
  motif: String,
  drawableArea: Object,
  canvasDimensions: Object
})

const { container, sketch, redraw } = useP5Svg((p) => {
  p.setup = () => {
    p.createCanvas(
      props.canvasDimensions.width,
      props.canvasDimensions.height,
      p.SVG
    )
    p.noLoop()
  }
  
  p.draw = () => {
    p.background(255)
    
    if (!props.countryData) return
    
    const motifObj = motifs[props.motif]
    
    if (motifObj) {
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
.postcard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.postcard-canvas {
  border: 1px solid #ddd;
}
</style>