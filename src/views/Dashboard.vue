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

// Collapsible description toggle
const showDescription = ref(false)

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
      <p class="subtitle">Design your country's climate action pattern</p>

      <div class="description-wrapper">
        <button @click="showDescription = !showDescription" class="toggle-description">
          {{ showDescription ? '▼' : '▶' }} What do the patterns mean?
        </button>
        <div v-if="showDescription" class="description">
          <p>
            The <a href="https://gccs.iza.org" target="_blank" rel="noopener noreferrer">Global Climate Change Survey</a> asked 130,000 people across 125 countries about their climate beliefs and actions. The four percentage values derived for each country shape a data-based pattern.
          </p>
          <ul>
            <li><strong>WTP:</strong> Share willing to contribute 1% of income to fight global warming (WTP: willingness to participate)</li>
            <li><strong>WTP Belief:</strong> Perceived average share of others willing to contribute 1% of income</li>
            <li><strong>Norm:</strong> Share saying that other in their country should try to fight global warming</li>
            <li><strong>Government:</strong> Share saying that national governments should do more</li>
          </ul>
          <p>
            <a href="https://rcap.netlify.app" target="_blank" rel="noopener norefferer">Learn how the patterns are created</a> 
          </p>
        </div>
      </div>
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
        <button @click="exportPdf" class="btn-base btn-primary btn-full-width">
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
  margin-bottom: 1.5rem;
}

.dashboard-header h1 {
  font-size: var(--h1-font-size);
  font-weight: var(--h1-font-weight);
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.dashboard-header .subtitle {
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  font-weight: var(--text-font-weight);
}

.toggle-description {
  background: none;
  border: none;
  color: var(--element-color);
  font-size: 1rem;
  font-weight: var(--text-font-weight);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}
 
.toggle-description:hover {
  color: var(--element-color-hover);
}
 
.toggle-description:focus {
  outline: none;
  text-decoration: underline;
}

.dashboard-header .description {
  font-size: 1rem;
  color: var(--text-color);
  max-width: 700px;
  line-height: 1.5;
}
 
.dashboard-header .description p {
  margin: 0.25rem 0 0.75rem 0;
}
 
.dashboard-header .description ul {
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: disc;
}
 
.dashboard-header .description li {
  margin-bottom: 0.3rem;
}
 
.dashboard-header .description a {
  color: var(--element-color);
  text-decoration: none;
  border-bottom: 1px solid var(--element-color);
}
 
.dashboard-header .description a:hover {
  color: var(--element-color-hover);
  border-bottom-color: var(--element-color-hover);
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
  flex: 0 0 380px;               /* fixed width */
  background: var(--background-color-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--box-shadow);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
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