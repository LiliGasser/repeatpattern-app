<template>
  <section class="dashboard">
    <h1>Repeat Pattern Creator</h1>

    <div class="columns">
      <!-- LEFT – control panel -->
      <aside class="sidebar">
        <div class="control-group">
          <label for="bg-select">Background colour</label>
          <select id="bg-select" v-model="bgColor">
            <option v-for="c in colours" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <button @click="exportCanvases">Export</button>
      </aside>

      <!-- RIGHT – canvases -->
     <div class="canvas-wrapper">
        <div ref="containerA" class="canvas-container"></div>
        <div ref="containerB" class="canvas-container"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import p5 from 'p5'

/* -------------------- Reactive state -------------------- */
// define postcard size (A5 postcard: 148mm x 105mm)
// calculation: https://imageonline.co/mm-to-px.php
// laptop screen: 1920 x 1200, 14'' diagonal --> 162 ppi; 60Hz
const pcWidthMM = 148; // mm
const pcHeightMM = 105; // mm
let dpi = 60; // dots per inch     // TODO higher resolution with responsible canvas size!!!
let pcWidth = Math.floor(pcWidthMM * dpi / 25.4);
let pcHeight = Math.floor(pcHeightMM * dpi / 25.4);
console.log(pcWidth, pcHeight);
const colours = [
  'lightgray',
  '#ff9999',
  '#99ff99',
  '#9999ff',
  '#ffff99'
]

const bgColor = ref(colours[0])                       // colour shared by both canvases

/* Canvas element references */
const containerA = ref(null)
const containerB = ref(null)

/* Hold the p5 instances so we can control them later */
let sketchA = null
let sketchB = null

/* ---------- Sketch factory (instance mode) ---------- */
function makeSketch(containerEl) {
  // Returns a function that p5 treats as the sketch definition
  return (p) => {
    p.setup = () => {
      // Fixed size – you can change these numbers if you want a different resolution
      p.createCanvas(pcWidth, pcHeight).parent(containerEl)
      p.noLoop()               // we only redraw when the colour changes
    }

    p.draw = () => {
      // Background colour comes from the Vue reactive variable
      p.background(bgColor.value)

      // Simple centred dark circle (same visual you had before)
      const r = p.width * 0.35
      p.fill('#333')
      p.noStroke()
      p.circle(p.width / 2, p.height / 2, r * 2)
    }
  }
}

/* ---------- Lifecycle ---------- */
onMounted(() => {
  // Initialise the two p5 instances, each attached to its own container div
  sketchA = new p5(makeSketch(containerA.value))
  sketchB = new p5(makeSketch(containerB.value))
})

onBeforeUnmount(() => {
  // Clean up the p5 instances when the component is destroyed
  if (sketchA) sketchA.remove()
  if (sketchB) sketchB.remove()
})

/* ---------- Reactivity: redraw both sketches when colour changes ---------- */
watch(bgColor, () => {
  if (sketchA) sketchA.redraw()
  if (sketchB) sketchB.redraw()
})

/* ---------- Export logic ---------- */
function exportCanvases() {
  const triggerDownload = (canvasEl, filename) => {
    const dataUrl = canvasEl.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // `sketchA.canvas` and `sketchB.canvas` are the actual <canvas> elements p5 created
  if (sketchA && sketchA.canvas) triggerDownload(sketchA.canvas, 'canvas-a.png')
  if (sketchB && sketchB.canvas) triggerDownload(sketchB.canvas, 'canvas-b.png')
}
</script>

<style scoped>
.dashboard {
  max-width: 1060px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* Flex container for the two columns */
.columns {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

/* LEFT – control panel */
.sidebar {
  flex: 0 0 200px;               /* fixed width */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.sidebar label {
  font-weight: 600;
}
.sidebar select,
.sidebar button {
  padding: 0.4rem 0.8rem;
  font-size: 0.95rem;
  border-radius: 4px;
  border: 1px solid #bbb;
}
.sidebar button {
  cursor: pointer;
  background-color: #0066ff;
  color: #fff;
  border: none;
}
.sidebar button:hover {
  background-color: #0052cc;
}

/* RIGHT – canvases */
.canvas-wrapper {
  flex: 1;                       /* take remaining width */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.canvas {
  width: 100%;                  /* fit container width */
  max-width: 450px;
  border: 1px solid #000;
}
</style>