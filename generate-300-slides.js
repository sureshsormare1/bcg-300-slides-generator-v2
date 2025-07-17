/**
 * Main Execution Script for BCG-Level 300-Slide Presentation Generator
 * 
 * This script orchestrates the generation of all 300 slides with 0% deviation
 * from the specified structure, ensuring BCG-level quality and professional styling.
 */

const fs = require('fs-extra');
const path = require('path');

// Import core modules
const MainOrchestrator = require('./src/orchestrator/main-orchestrator');
const DataProcessor = require('./src/shared/data-processor');
const TemplateEngine = require('./src/shared/template-engine');
const ChartGenerator = require('./src/shared/chart-generator');

// Import sample data
const sampleProductData = require('./data/sample-product-data');

/**
 * Main execution function
 */
async function generatePresentation() {
  console.log('🚀 Starting BCG-Level 300-Slide Presentation Generation...');
  console.log('=' .repeat(60));
  
  try {
    // Initialize core components
    console.log('🔧 Initializing core components...');
    const dataProcessor = new DataProcessor(sampleProductData);
    const templateEngine = new TemplateEngine();
    const chartGenerator = new ChartGenerator();
    
    // Initialize main orchestrator
    const orchestrator = new MainOrchestrator(sampleProductData);
    
    // Generate the complete presentation
    console.log('🎯 Generating complete 300-slide presentation...');
    const slides = await orchestrator.generateAllSlides();
    
    // Export to HTML
    const outputPath = path.join(__dirname, 'output', `${sampleProductData.name}-300-slides.html`);
    await fs.ensureDir(path.dirname(outputPath));
    await orchestrator.exportToHTML(outputPath);
    
    // Generate progress report
    const progressReport = orchestrator.generateProgressReport();
    
    // Generate summary report
    const summaryPath = path.join(__dirname, 'output', 'generation-summary.json');
    const summary = {
      productName: sampleProductData.name,
      totalSlides: slides.length,
      generationTime: 'N/A',
      sections: progressReport.sections,
      outputFile: outputPath,
      generatedAt: new Date().toISOString()
    };
    
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
    
    // Display results
    console.log('=' .repeat(60));
    console.log('✅ PRESENTATION GENERATION COMPLETE!');
    console.log('=' .repeat(60));
    console.log(`📊 Product: ${sampleProductData.name}`);
    console.log(`📄 Total Slides: ${slides.length}`);
    console.log(`📁 Output File: ${outputPath}`);
    console.log(`📋 Summary Report: ${summaryPath}`);
    console.log('=' .repeat(60));
    
    // Display section breakdown
    console.log('📊 SECTION BREAKDOWN:');
    progressReport.sections.forEach(section => {
      console.log(`   ${section.name}: ${section.generated}/${section.expected} slides (${section.status})`);
    });
    
    console.log('=' .repeat(60));
    console.log('🎉 Ready to serve! Run: npm run serve');
    console.log('=' .repeat(60));
    
    return {
      success: true,
      outputPath,
      summaryPath,
      totalSlides: slides.length
    };
    
  } catch (error) {
    console.error('❌ Error generating presentation:', error);
    console.error(error.stack);
    return {
      success: false,
      error: error.message
    };
  }
}

// Execute if run directly
if (require.main === module) {
  generatePresentation()
    .then(result => {
      if (result.success) {
        console.log('🎯 Generation completed successfully!');
        process.exit(0);
      } else {
        console.error('💥 Generation failed:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('💥 Unexpected error:', error);
      process.exit(1);
    });
}

module.exports = generatePresentation;

