<template>
  <section class="dashboard">
    <h1>Repeat Pattern Creator</h1>

    <div class="columns">
      <!-- LEFT – control panel -->
      <aside class="sidebar">
        <div class="control-group">
          <label for="bg-select">Background colour:</label>
          <select id="bg-select" v-model="bgColor">
            <option v-for="c in colours" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <button @click="exportCanvases">Export</button>
      </aside>

      <!-- RIGHT – canvases -->
      <div class="canvas-wrapper">
        <canvas
          ref="canvasA"
          :width="canvasSize"
          :height="canvasSize"
          class="canvas"
        ></canvas>

        <canvas
          ref="canvasB"
          :width="canvasSize"
          :height="canvasSize"
          class="canvas"
        ></canvas>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

/* -------------------- Reactive state -------------------- */
const canvasSize = 300                                 // square size (px)
const colours = [
  'lightgray',
  '#ff9999',
  '#99ff99',
  '#9999ff',
  '#ffff99'
]

const bgColor = ref(colours[0])                       // colour shared by both canvases

/* Canvas element references */
const canvasA = ref(null)
const canvasB = ref(null)

/* -------------------- Drawing helper -------------------- */
function drawCanvas(targetCanvas, colour) {
  if (!targetCanvas) return
  const ctx = targetCanvas.getContext('2d')

  // Background
  ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
  ctx.fillStyle = colour
  ctx.fillRect(0, 0, targetCanvas.width, targetCanvas.height)

  // Simple shape – a centred dark circle
  const radius = targetCanvas.width * 0.35
  ctx.beginPath()
  ctx.arc(targetCanvas.width / 2, targetCanvas.height / 2, radius, 0, Math.PI * 2)
  ctx.fillStyle = '#333'
  ctx.fill()
}

/* Redraw both canvases whenever the colour changes */
watch(bgColor, () => {
  drawCanvas(canvasA.value, bgColor.value)
  drawCanvas(canvasB.value, bgColor.value)
})

/* Initial draw on mount */
onMounted(() => {
  drawCanvas(canvasA.value, bgColor.value)
  drawCanvas(canvasB.value, bgColor.value)
})

/* -------------------- Export logic -------------------- */
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

  if (canvasA.value) triggerDownload(canvasA.value, 'canvas-a.png')
  if (canvasB.value) triggerDownload(canvasB.value, 'canvas-b.png')
}
</script>

<style scoped>
.dashboard {
  max-width: 760px;
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
  flex: 0 0 250px;               /* fixed width */
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
  max-width: 300px;             /* keep original pixel dimensions */
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>