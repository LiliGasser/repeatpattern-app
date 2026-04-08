<template>
  <div class="control-panel">
    <!-- COUNTRY - Always visible -->
    <div class="control-group">
      <label class="control-label">Country</label>
      <CountrySelector 
        :model-value="country" 
        @update:model-value="$emit('update:country', $event)"
        :countries="countries" 
      />
    </div>

    <!-- PATTERN -->
    <div class="accordion-section">
      <button 
        @click="openSections.pattern = !openSections.pattern" 
        class="accordion-header"
        :class="{ active: openSections.pattern }"
      >
        <span class="accordion-icon">{{ openSections.pattern ? '▼' : '▶' }}</span>
        <span class="accordion-title">Pattern</span>
      </button>
      <div v-if="openSections.pattern" class="accordion-content">
        <div class="control-group">
          <label class="control-label">Motif</label>
          <MotifSelector 
            :model-value="motif"
            @update:model-value="$emit('update:motif', $event)"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">Symmetry</label>
          <SymmetrySelector 
            :model-value="symmetry"
            @update:model-value="$emit('update:symmetry', $event)"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">Motifs per row</label>
          <MotifsPerRowInput 
            :model-value="motifsPerRow"
            @update:model-value="$emit('update:motifsPerRow', $event)"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">Frame margin (%)</label>
          <FrameMarginSlider 
            :model-value="frameMargin"
            @update:model-value="$emit('update:frameMargin', $event)"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">Layout</label>
          <LayoutSelector 
            :model-value="layout"
            @update:model-value="$emit('update:layout', $event)"
          />
        </div>
        
        <div class="control-group">
          <ShowGridCheckbox 
            :model-value="showGrid"
            @update:model-value="$emit('update:showGrid', $event)"
          />
        </div>
      </div>
    </div>

    <!-- COLOR -->
    <div class="accordion-section">
      <button 
        @click="openSections.color = !openSections.color" 
        class="accordion-header"
        :class="{ active: openSections.color }"
      >
        <span class="accordion-icon">{{ openSections.color ? '▼' : '▶' }}</span>
        <span class="accordion-title">Color</span>
      </button>
      <div v-if="openSections.color" class="accordion-content">
        <div class="control-group">
          <label class="control-label">Palette</label>
          <PaletteSelector 
            :model-value="palette"
            @update:model-value="$emit('update:palette', $event)"
          />
        </div>

        <div class="control-group">
          <label class="control-label">Custom</label>
          <div class="colors-group">
            <div class="color-grid">
              <ColorPicker 
                label="WTP"
                :model-value="customColors.wtp"
                @update:model-value="handleColorChange('wtp', $event)"
              />
              <ColorPicker 
                label="Norm"
                :model-value="customColors.norm"
                @update:model-value="handleColorChange('norm', $event)"
              />
              <ColorPicker 
                label="Government"
                :model-value="customColors.government"
                @update:model-value="handleColorChange('government', $event)"
              />
              <ColorPicker 
                label="WTP Belief"
                :model-value="customColors.wtpBelief"
                @update:model-value="handleColorChange('wtpBelief', $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FONT -->
    <div class="accordion-section">
      <button 
        @click="openSections.font = !openSections.font" 
        class="accordion-header"
        :class="{ active: openSections.font }"
      >
        <span class="accordion-icon">{{ openSections.font ? '▼' : '▶' }}</span>
        <span class="accordion-title">Font</span>
      </button>
      <div v-if="openSections.font" class="accordion-content">
        <div class="control-group">
          <label class="control-label">Title</label>
          <FontSelector 
            :model-value="titleFont"
            @update:model-value="$emit('update:titleFont', $event)"
            font-type="title"
          />
        </div>
        
        <div class="control-group">
          <label class="control-label">Main</label>
          <FontSelector 
            :model-value="mainFont"
            @update:model-value="$emit('update:mainFont', $event)"
            font-type="main"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CountrySelector from './controls/CountrySelector.vue'
import MotifSelector from './controls/MotifSelector.vue'
import SymmetrySelector from './controls/SymmetrySelector.vue'
import LayoutSelector from './controls/LayoutSelector.vue'
import FrameMarginSlider from './controls/FrameMarginSlider.vue'
import MotifsPerRowInput from './controls/MotifsPerRowInput.vue'
import ShowGridCheckbox from './controls/ShowGridCheckbox.vue'
import PaletteSelector from './controls/PaletteSelector.vue'
import ColorPicker from './controls/ColorPicker.vue'
import FontSelector from './controls/FontSelector.vue'
import { updateCustomColor } from '../motifs/colors'

const props = defineProps({
  country: String,
  motif: String,
  symmetry: String,
  layout: String,
  frameMargin: Number,
  motifsPerRow: Number,
  showGrid: Boolean,
  palette: String,
  customColors: Object,
  titleFont: String,
  mainFont: String,  
  countries: Array
})

// Track which accordion sections are open
const openSections = ref({
  pattern: false,   // Start with all closed
  color: false,
  font: false
})

const emit = defineEmits([
  'update:country',
  'update:motif',
  'update:symmetry',
  'update:layout',
  'update:frameMargin',
  'update:motifsPerRow',
  'update:showGrid',
  'update:palette',
  'update:titleFont',
  'update:mainFont'   
])

function handleColorChange(key, value) {
  console.log('Color change:', key, value)
  // Update the global custom color
  updateCustomColor(key, value)
  // Switch to custom palette - this will trigger the computed customColors to update
  emit('update:palette', 'custom')
}
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  font-size: var(--label-font-size);
}

.accordion-section {
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  background-color: var(--background-color-secondary);
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: var(--background-color);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.accordion-header:hover {
  background-color: #e8e8e8;
}

.accordion-header.active {
  background-color: #e0e0e0;
}

.accordion-icon {
  font-size: 0.75rem;
  color: #666;
  width: 12px;
  transition: transform 0.2s;
}

.accordion-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-color);
}

.accordion-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--background-color);
  border-top: 1px solid #e0e0e0;
}

.colors-group {
  padding: 0.75rem;
  background-color: var(--background-color-secondary);
  border-radius: var(--border-radius-sm);
  border: 1px solid #e0e0e0;
}

.color-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
</style>