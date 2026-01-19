<template>
  <div class="postcard-wrapper">
    <h3>Front</h3>
    <div ref="container" class="postcard-canvas"></div>
    <p class="info">{{ gridLayout.cols }} × {{ gridLayout.rows }} = {{ gridLayout.totalMotifs }} motifs</p>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useP5Svg } from '@/composables/useP5Svg'
import { motifs } from '@/motifs'
import { symmetries } from '@/symmetries'

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
    const symmetryObj = symmetries[props.symmetry]
    
    if (motifObj && symmetryObj) {
      symmetryObj.apply(
        p,
        props.drawableArea,
        props.gridLayout,
        motifObj.draw.bind(motifObj),
        props.countryData
      )
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
.postcard-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}
</style>