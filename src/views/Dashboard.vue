<script setup>
import { ref } from 'vue'
import { useCountryData } from '../composables/useCountryData'
import { usePostcardConfig } from '../composables/usePostcardConfig'
import { exportPostcardPdf } from '../utils/pdfExport'
import ControlPanel from '../components/ControlPanel.vue'
import PostcardFront from '../components/postcards/PostcardFront.vue'
import PostcardBack from '../components/postcards/PostcardBack.vue'

// Get country data
const { 
  countries, 
  selectedCountry, 
  selectedCountryData, 
  loading, 
  error 
} = useCountryData()

// Get postcard configuration - DON'T destructure customColors yet
const config = usePostcardConfig()

const {
  selectedMotif,
  selectedSymmetry,
  layout,
  frameMarginRatio,
  motifsPerRow,
  showGrid,
  selectedPalette,
  titleFont, 
  mainFont,   
  dpi,
  frontPostcardDimensions,
  frontCanvasDimensions,
  frontDrawableArea,
  backPostcardDimensions,
  backCanvasDimensions,
  backDrawableArea,
  gridLayout
} = config

// Access customColors from config object
const customColors = config.customColors

// Refs to hold sketch instances from child components
const frontSketchRef = ref(null)
const backSketchRef = ref(null)

const exportPdf = async () => {
  if (!frontSketchRef.value || !backSketchRef.value) {
    alert('Canvases not ready for export')
    return
  }
  
  await exportPostcardPdf(
    frontSketchRef.value,
    backSketchRef.value,
    frontPostcardDimensions.value,
    backPostcardDimensions.value
  )
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Repeat Pattern Creator</h1>
    </header>
    
    <div v-if="loading" class="loading">Loading country data...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    
    <div v-else class="columns">
      <!-- LEFT – control panel -->
      <aside class="sidebar">
        <ControlPanel
          :country="selectedCountry"
          @update:country="selectedCountry = $event"
          :motif="selectedMotif"
          @update:motif="selectedMotif = $event"
          :symmetry="selectedSymmetry"
          @update:symmetry="selectedSymmetry = $event"
          :layout="layout"
          @update:layout="layout = $event"
          :frame-margin="frameMarginRatio"
          @update:frame-margin="frameMarginRatio = $event"
          :motifs-per-row="motifsPerRow"
          @update:motifs-per-row="motifsPerRow = $event"
          :show-grid="showGrid"
          @update:show-grid="showGrid = $event"
          :palette="selectedPalette"
          @update:palette="selectedPalette = $event"
          :custom-colors="customColors"
          :title-font="titleFont"
          @update:title-font="titleFont = $event"
          :main-font="mainFont"
          @update:main-font="mainFont = $event"
          :countries="countries"
        />
        <button @click="exportPdf" class="export-btn">
          Export PDF
        </button>
      </aside>
      
      <!-- RIGHT – canvases -->
      <div class="canvas-wrapper">
        <PostcardFront
          ref="frontPostcard"
          :country-data="selectedCountryData"
          :motif="selectedMotif"
          :symmetry="selectedSymmetry"
          :drawable-area="frontDrawableArea"
          :canvas-dimensions="frontCanvasDimensions"
          :grid-layout="gridLayout"
          :show-grid="showGrid"
          :palette="selectedPalette"
          :custom-colors="customColors"
          @sketch-ready="frontSketchRef = $event"
        />
        <PostcardBack
          ref="backPostcard"
          :country-data="selectedCountryData"
          :motif="selectedMotif"
          :drawable-area="backDrawableArea"
          :canvas-dimensions="backCanvasDimensions"
          :show-grid="showGrid"
          :palette="selectedPalette"
          :custom-colors="customColors"
          :dpi="dpi"
          @sketch-ready="backSketchRef = $event"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  text-align: left;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: var(--h1-font-size);
  font-weight: var(--h1-font-weight);
  color: var(--text-color);
  margin: 0;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: var(--error-color);
}

/* Two-column layout */
.columns {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

/* LEFT – control panel */
.sidebar {
  flex: 0 0 280px;               /* fixed width */
  background: var(--background-color-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.export-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--element-color);
  color: var(--text-color-secondary);
  border: none;
  border-radius: var(--border-radius-xl);
  font-size: var(--label-font-size);
  font-weight: var(--label-font-weight);
  margin-top: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  user-select: none;
}

/* TODO what is needed? box-shadow? */
.export-btn:hover {
  background-color: var(--element-color-hover); 
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);
}

.export-btn:active {
  box-shadow: 0 1px 4px rgba(0, 102, 255, 0.2);
}

.export-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.3);
}

.export-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* RIGHT – canvases */
.canvas-wrapper {
  flex: 1;                       /* take remaining width */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Responsive: stack on smaller screens */
@media (max-width: 1024px) {
  .columns {
    flex-direction: column;
  }
  
  .sidebar {
    flex: 1;
    width: 100%;
    position: static;
    max-height: none;
  }
}

/* Scrollbar styling for sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>