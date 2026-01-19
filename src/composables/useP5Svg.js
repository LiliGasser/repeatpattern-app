import { ref, onMounted, onBeforeUnmount } from 'vue'
import p5 from 'p5'
import p5SVG from 'p5.js-svg'

// Register SVG renderer globally (only needs to happen once)
if (typeof p5SVG === 'function') {
  p5SVG(p5)
}

export function useP5Svg(sketchFunction) {
  const container = ref(null)
  let sketch = null
  let currentSketchFunction = sketchFunction

  const initSketch = () => {
    if (!container.value) {
      console.warn('Container ref not available yet')
      return
    }

    // Clean up existing sketch first
    if (sketch) {
      sketch.remove()
      sketch = null
    }
    
    // Clear the container completely
    while (container.value.firstChild) {
      container.value.removeChild(container.value.firstChild)
    }

    // Create new sketch
    sketch = new p5(currentSketchFunction, container.value)
  }

  const redraw = () => {
    if (sketch && typeof sketch.redraw === 'function') {
      sketch.redraw()
    }
  }
  
  const recreate = (newSketchFunction) => {
    if (newSketchFunction) {
      currentSketchFunction = newSketchFunction
    }
    initSketch()
  }

  const getSvgElement = () => {
    if (!sketch || !sketch._renderer) {
      console.warn('Sketch or renderer not available')
      return null
    }
    return sketch._renderer.svg
  }

  const getCanvasElement = () => {
    if (!sketch) {
      console.warn('Sketch not available')
      return null
    }
    return sketch.canvas
  }

  const cleanup = () => {
    if (sketch) {
      sketch.remove()
      sketch = null
    }
    // Also clear container
    if (container.value) {
      while (container.value.firstChild) {
        container.value.removeChild(container.value.firstChild)
      }
    }
  }

  onMounted(() => {
    initSketch()
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    container,
    sketch,
    redraw,
    recreate,
    getSvgElement,
    getCanvasElement,
    cleanup
  }
}