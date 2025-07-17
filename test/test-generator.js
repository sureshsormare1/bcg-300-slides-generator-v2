/**
 * Basic Test Suite for BCG-Level 297-Slide Presentation Generator
 * 
 * This test suite validates the core functionality and ensures
 * the system generates exactly 297 slides with proper structure.
 */

const fs = require('fs-extra');
const path = require('path');

// Import core modules
const MainOrchestrator = require('../src/orchestrator/main-orchestrator');
const sampleProductData = require('../data/sample-product-data');

/**
 * Test configuration
 */
const TEST_CONFIG = {
  expectedSlideCount: 297,
  expectedSections: 6,
  outputPath: path.join(__dirname, '../output/test-presentation.html')
};

/**
 * Test utilities
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }
  
  test(name, testFn) {
    this.tests.push({ name, testFn });
  }
  
  async run() {
    console.log('🧪 Starting BCG Slides Generator Test Suite...');
    console.log('=' .repeat(60));
    
    for (const { name, testFn } of this.tests) {
      try {
        console.log(`🔍 Running: ${name}`);
        await testFn();
        console.log(`✅ PASSED: ${name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ FAILED: ${name}`);
        console.log(`   Error: ${error.message}`);
        this.failed++;
      }
    }
    
    console.log('=' .repeat(60));
    console.log(`📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
    
    if (this.failed === 0) {
      console.log('🎉 All tests passed!');
      process.exit(0);
    } else {
      console.log('💥 Some tests failed!');
      process.exit(1);
    }
  }
}

/**
 * Test suite
 */
const runner = new TestRunner();

// Test 1: Data validation
runner.test('Sample data structure validation', async () => {
  if (!sampleProductData.name) {
    throw new Error('Product name is missing');
  }
  
  if (!sampleProductData.totalRecords || sampleProductData.totalRecords <= 0) {
    throw new Error('Total records must be positive');
  }
  
  if (!Array.isArray(sampleProductData.topSuppliers) || sampleProductData.topSuppliers.length < 10) {
    throw new Error('Must have at least 10 top suppliers');
  }
  
  if (!Array.isArray(sampleProductData.importingCountries) || sampleProductData.importingCountries.length < 10) {
    throw new Error('Must have at least 10 importing countries');
  }
  
  if (!Array.isArray(sampleProductData.exportingCountries) || sampleProductData.exportingCountries.length < 10) {
    throw new Error('Must have at least 10 exporting countries');
  }
});

// Test 2: Orchestrator initialization
runner.test('Main orchestrator initialization', async () => {
  const orchestrator = new MainOrchestrator(sampleProductData);
  
  if (!orchestrator.slideStructure) {
    throw new Error('Slide structure not initialized');
  }
  
  if (!orchestrator.sections) {
    throw new Error('Section generators not initialized');
  }
  
  const sectionNames = Object.keys(orchestrator.sections);
  if (sectionNames.length !== TEST_CONFIG.expectedSections) {
    throw new Error(`Expected ${TEST_CONFIG.expectedSections} sections, got ${sectionNames.length}`);
  }
});

// Test 3: Slide structure validation
runner.test('Slide structure compliance', async () => {
  const orchestrator = new MainOrchestrator(sampleProductData);
  const structure = orchestrator.slideStructure;
  
  // Count total slides across all sections
  let totalSlides = 0;
  Object.values(structure).forEach(section => {
    totalSlides += section.slides.length;
  });
  
  if (totalSlides !== TEST_CONFIG.expectedSlideCount) {
    throw new Error(`Expected ${TEST_CONFIG.expectedSlideCount} slides, got ${totalSlides}`);
  }
  
  // Validate section ranges
  const expectedRanges = {
    foundation: [1, 8],
    importingCountries: [9, 23],
    exportingCountries: [24, 39],
    supplierBuyer: [40, 62],
    pricing: [63, 63],
    shipmentRecords: [67, 300]
  };
  
  Object.entries(expectedRanges).forEach(([sectionName, expectedRange]) => {
    const section = structure[sectionName];
    if (!section) {
      throw new Error(`Section ${sectionName} not found`);
    }
    
    const [expectedStart, expectedEnd] = expectedRange;
    const [actualStart, actualEnd] = section.range;
    
    if (actualStart !== expectedStart || actualEnd !== expectedEnd) {
      throw new Error(`Section ${sectionName} range mismatch: expected [${expectedStart}, ${expectedEnd}], got [${actualStart}, ${actualEnd}]`);
    }
  });
});

// Test 4: Slide generation
runner.test('Complete slide generation', async () => {
  const orchestrator = new MainOrchestrator(sampleProductData);
  
  console.log('   Generating all slides...');
  const slides = await orchestrator.generateAllSlides();
  
  if (slides.length !== TEST_CONFIG.expectedSlideCount) {
    throw new Error(`Expected ${TEST_CONFIG.expectedSlideCount} slides, generated ${slides.length}`);
  }
  
  // Validate slide properties
  slides.forEach((slide, index) => {
    if (!slide.html) {
      throw new Error(`Slide ${index + 1} missing HTML content`);
    }
    
    if (!slide.id) {
      throw new Error(`Slide ${index + 1} missing ID`);
    }
  });
});

// Test 5: HTML export
runner.test('HTML export functionality', async () => {
  const orchestrator = new MainOrchestrator(sampleProductData);
  
  await orchestrator.generateAllSlides();
  await orchestrator.exportToHTML(TEST_CONFIG.outputPath);
  
  if (!await fs.pathExists(TEST_CONFIG.outputPath)) {
    throw new Error('HTML file was not created');
  }
  
  const htmlContent = await fs.readFile(TEST_CONFIG.outputPath, 'utf8');
  
  if (!htmlContent.includes('Paclitaxel Trade Intelligence Report')) {
    throw new Error('HTML content missing title');
  }
  
  if (!htmlContent.includes('297')) {
    throw new Error('HTML content missing slide count');
  }
  
  // Clean up test file
  await fs.remove(TEST_CONFIG.outputPath);
});

// Test 6: Progress report
runner.test('Progress report generation', async () => {
  const orchestrator = new MainOrchestrator(sampleProductData);
  
  await orchestrator.generateAllSlides();
  const report = orchestrator.generateProgressReport();
  
  if (report.totalSlides !== TEST_CONFIG.expectedSlideCount) {
    throw new Error(`Progress report shows wrong total: ${report.totalSlides}`);
  }
  
  if (report.generatedSlides !== TEST_CONFIG.expectedSlideCount) {
    throw new Error(`Progress report shows wrong generated count: ${report.generatedSlides}`);
  }
  
  if (report.sections.length !== TEST_CONFIG.expectedSections) {
    throw new Error(`Progress report shows wrong section count: ${report.sections.length}`);
  }
  
  // Validate all sections are complete
  report.sections.forEach(section => {
    if (section.status !== 'Complete') {
      throw new Error(`Section ${section.name} is not complete: ${section.status}`);
    }
  });
});

// Run all tests
if (require.main === module) {
  runner.run().catch(error => {
    console.error('Test runner error:', error);
    process.exit(1);
  });
}

module.exports = { TestRunner, TEST_CONFIG };

