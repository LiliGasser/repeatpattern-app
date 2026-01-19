import { ref, onMounted, onBeforeUnmount } from 'vue'
import p5 from 'p5'
import p5SVG from 'p5.js-svg'

// Register SVG renderer globally (only needs to happen once)
if (typeof p5SVG === 'function') {
  p5SVG(p5)
}

/**
 * Composable for managing p5.js SVG canvas instances
 * 
 * @param {Function} sketchFunction - Function that defines p5 sketch (receives p5 instance)
 * @returns {Object} - { container, sketch, redraw }
 */
export function useP5Svg(sketchFunction) {
  const container = ref(null)
  let sketch = null

  /**
   * Initialize the p5 sketch
   */
  const initSketch = () => {
    if (!container.value) {
      console.warn('Container ref not available yet')
      return
    }

    if (sketch) {
      // Clean up existing sketch before creating new one
      sketch.remove()
    }

    // Create new p5 instance in instance mode
    sketch = new p5(sketchFunction, container.value)
  }

  /**
   * Redraw the canvas (useful when data changes)
   */
  const redraw = () => {
    if (sketch && typeof sketch.redraw === 'function') {
      sketch.redraw()
    }
  }

  /**
   * Get the SVG element from the sketch
   */
  const getSvgElement = () => {
    if (!sketch || !sketch._renderer) {
      console.warn('Sketch or renderer not available')
      return null
    }
    return sketch._renderer.svg
  }

  /**
   * Get the canvas element from the sketch
   */
  const getCanvasElement = () => {
    if (!sketch) {
      console.warn('Sketch not available')
      return null
    }
    return sketch.canvas
  }

  /**
   * Remove the sketch and clean up
   */
  const cleanup = () => {
    if (sketch) {
      sketch.remove()
      sketch = null
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    initSketch()
  })

  onBeforeUnmount(() => {
    cleanup()
  })

  return {
    container,      // Ref to attach to DOM element
    sketch,         // The p5 instance (can be null)
    redraw,         // Function to trigger redraw
    getSvgElement,  // Get the SVG DOM element
    getCanvasElement, // Get the canvas element
    cleanup         // Manual cleanup function
  }
}