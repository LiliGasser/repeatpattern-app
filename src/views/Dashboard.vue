<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Postcard Pattern Creator</h1>
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
          :countries="countries"
        />
        <button @click="exportPdf" class="export-btn">
          📄 Export PDF
        </button>
      </aside>
      
      <!-- RIGHT – canvases -->
      <div class="canvas-wrapper">
        <PostcardFront
          :country-data="selectedCountryData"
          :motif="selectedMotif"
          :symmetry="selectedSymmetry"
          :drawable-area="drawableArea"
          :canvas-dimensions="canvasDimensions"
          :grid-layout="gridLayout"
        />
        <PostcardBack
          :country-data="selectedCountryData"
          :motif="selectedMotif"
          :drawable-area="drawableArea"
          :canvas-dimensions="canvasDimensions"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCountryData } from '../composables/useCountryData'
import { usePostcardConfig } from '../composables/usePostcardConfig'
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

// Get postcard configuration
const {
  selectedMotif,
  selectedSymmetry,
  layout,
  frameMarginRatio,
  motifsPerRow,
  postcardDimensions,
  canvasDimensions,
  drawableArea,
  gridLayout
} = usePostcardConfig()

const exportPdf = () => {
  console.log('Exporting PDF...')
  // PDF export logic to be implemented
}
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #d63031;
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
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.export-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.export-btn:hover {
  background-color: #0052cc;
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