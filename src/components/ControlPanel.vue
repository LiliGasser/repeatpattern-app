<template>
  <div class="control-panel">
    <div class="control-group">
      <label>Country</label>
      <CountrySelector 
        :model-value="country" 
        @update:model-value="$emit('update:country', $event)"
        :countries="countries" 
      />
    </div>
    
    <div class="control-group">
      <label>Motif</label>
      <MotifSelector 
        :model-value="motif"
        @update:model-value="$emit('update:motif', $event)"
      />
    </div>
    
    <div class="control-group">
      <label>Symmetry</label>
      <SymmetrySelector 
        :model-value="symmetry"
        @update:model-value="$emit('update:symmetry', $event)"
      />
    </div>
    
    <div class="control-group">
      <label>Layout</label>
      <LayoutSelector 
        :model-value="layout"
        @update:model-value="$emit('update:layout', $event)"
      />
    </div>
    
    <div class="control-group">
      <label>Frame Margin</label>
      <FrameMarginSlider 
        :model-value="frameMargin"
        @update:model-value="$emit('update:frameMargin', $event)"
      />
    </div>
    
    <div class="control-group">
      <label>Motifs Per Row</label>
      <MotifsPerRowInput 
        :model-value="motifsPerRow"
        @update:model-value="$emit('update:motifsPerRow', $event)"
      />
    </div>
    
    <div class="control-group">
      <ShowGridCheckbox 
        :model-value="showGrid"
        @update:model-value="$emit('update:showGrid', $event)"
      />
    </div>

    <div class="control-group">
      <label>Color Palette</label>
      <PaletteSelector 
        :model-value="palette"
        @update:model-value="$emit('update:palette', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import CountrySelector from './controls/CountrySelector.vue'
import MotifSelector from './controls/MotifSelector.vue'
import SymmetrySelector from './controls/SymmetrySelector.vue'
import LayoutSelector from './controls/LayoutSelector.vue'
import FrameMarginSlider from './controls/FrameMarginSlider.vue'
import MotifsPerRowInput from './controls/MotifsPerRowInput.vue'
import ShowGridCheckbox from './controls/ShowGridCheckbox.vue'
import PaletteSelector from './controls/PaletteSelector.vue'

defineProps({
  country: String,
  motif: String,
  symmetry: String,
  layout: String,
  frameMargin: Number,
  motifsPerRow: Number,
  showGrid: Boolean,
  palette: String,
  countries: Array
})

defineEmits([
  'update:country',
  'update:motif',
  'update:symmetry',
  'update:layout',
  'update:frameMargin',
  'update:motifsPerRow',
  'update:showGrid',
  'update:palette',
])
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>