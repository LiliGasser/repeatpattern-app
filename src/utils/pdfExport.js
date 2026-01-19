import { jsPDF } from 'jspdf'
import 'svg2pdf.js'

/**
 * Export front and back postcard canvases to a single PDF
 * @param {Object} frontSketch - p5 instance for front canvas
 * @param {Object} backSketch - p5 instance for back canvas
 * @param {Object} frontDimensions - { width: mm, height: mm } for front
 * @param {Object} backDimensions - { width: mm, height: mm } for back
 */
export async function exportPostcardPdf(frontSketch, backSketch, frontDimensions, backDimensions) {
  try {
    // Get SVG elements from both p5 instances
    const svgFront = frontSketch?._renderer?.svg
    const svgBack = backSketch?._renderer?.svg

    if (!svgFront || !svgBack) {
      console.warn('SVG elements not found')
      alert('Could not find SVG canvases to export')
      return
    }

    // Create PDF with first page matching front dimensions
    const pdf = new jsPDF({
      orientation: frontDimensions.width > frontDimensions.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [frontDimensions.width, frontDimensions.height]
    })

    // Add front SVG to page 1
    await pdf.svg(svgFront, {
      x: 0,
      y: 0,
      width: frontDimensions.width,
      height: frontDimensions.height
    })

    // Add new page for back (always landscape)
    pdf.addPage([backDimensions.width, backDimensions.height], 
                backDimensions.width > backDimensions.height ? 'landscape' : 'portrait')

    // Add back SVG to page 2
    await pdf.svg(svgBack, {
      x: 0,
      y: 0,
      width: backDimensions.width,
      height: backDimensions.height
    })

    // Download the PDF
    pdf.save('postcard.pdf')
    
  } catch (error) {
    console.error('Error exporting PDF:', error)
    alert('Failed to export PDF. See console for details.')
  }
}