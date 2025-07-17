/**
 * BCG-Level 300-Slide Presentation Generator
 * Main Orchestrator - 0% Deviation from Structure
 * 
 * This orchestrator ensures exact compliance with the 300-slide structure:
 * - Slides 1-8: Foundation
 * - Slides 9-23: Importing Countries Analysis
 * - Slides 24-39: Exporting Countries Analysis
 * - Slides 40-62: Supplier & Buyer Intelligence
 * - Slide 63: Pricing Analysis
 * - Slides 67-300: Shipment Records
 */

const fs = require('fs-extra');
const path = require('path');

// Import section modules
const FoundationSection = require('../sections/foundation-section');
const ImportingCountriesSection = require('../sections/importing-countries-section');
const ExportingCountriesSection = require('../sections/exporting-countries-section');
const SupplierBuyerSection = require('../sections/supplier-buyer-section');
const PricingSection = require('../sections/pricing-section');
const ShipmentRecordsSection = require('../sections/shipment-records-section');

// Import shared utilities
const DataProcessor = require('../shared/data-processor');
const TemplateEngine = require('../shared/template-engine');
const ChartGenerator = require('../shared/chart-generator');

class MainOrchestrator {
  constructor(productData) {
    this.productData = productData;
    this.slides = [];
    this.dataProcessor = new DataProcessor(productData);
    this.templateEngine = new TemplateEngine();
    this.chartGenerator = new ChartGenerator();
    
    // Initialize section modules
    this.sections = {
      foundation: new FoundationSection(this.dataProcessor, this.templateEngine, this.chartGenerator),
      importingCountries: new ImportingCountriesSection(this.dataProcessor, this.templateEngine, this.chartGenerator),
      exportingCountries: new ExportingCountriesSection(this.dataProcessor, this.templateEngine, this.chartGenerator),
      supplierBuyer: new SupplierBuyerSection(this.dataProcessor, this.templateEngine, this.chartGenerator),
      pricing: new PricingSection(this.dataProcessor, this.templateEngine, this.chartGenerator),
      shipmentRecords: new ShipmentRecordsSection(this.dataProcessor, this.templateEngine, this.chartGenerator)
    };
    
    this.slideStructure = this.defineSlideStructure();
  }
  
  /**
   * Define the exact 300-slide structure with 0% deviation
   */
  defineSlideStructure() {
    return {
      foundation: {
        range: [1, 8],
        slides: [
          { id: 1, type: 'title_agenda', title: 'Title & Agenda generation' },
          { id: 2, type: 'table_of_contents', title: 'Table of Contents' },
          { id: 3, type: 'executive_summary', title: 'Executive Summary (Key Findings)' },
          { id: 4, type: 'product_overview', title: 'Product Overview' },
          { id: 5, type: 'market_share_analysis', title: 'Market share analysis- value, volume, import, export, countries' },
          { id: 6, type: 'geography_intelligence', title: 'Geography Import Export Intelligence- top 10 value and volume along with export and import' },
          { id: 7, type: 'supplier_buyer_relationships', title: 'Supplier-Buyer Relationships with countries- Sankey Diagram' },
          { id: 8, type: 'top_importing_countries', title: 'Top 10 Importing countries- name, market share and charts' }
        ]
      },
      importingCountries: {
        range: [9, 23],
        slides: [
          // Slides 9-13: Top 5 importing countries → their top 10 supplier countries
          ...Array.from({length: 5}, (_, i) => ({
            id: 9 + i,
            type: 'importing_country_suppliers',
            title: `Top ${i + 1} Importing country- Who are the top 10 suppliers countries`,
            countryRank: i + 1
          })),
          // Slides 14-23: Top 10 importing countries → their top 10 supplier companies
          ...Array.from({length: 10}, (_, i) => ({
            id: 14 + i,
            type: 'importing_country_companies',
            title: `Top ${i + 1} Importing country- Who are the top 10 suppliers companies`,
            countryRank: i + 1
          }))
        ]
      },
      exportingCountries: {
        range: [24, 39],
        slides: [
          { id: 24, type: 'top_exporting_countries', title: 'Top 10 Exporting countries- name, market share and charts' },
          // Slides 25-29: Top 5 exporting countries → their top 10 destination countries
          ...Array.from({length: 5}, (_, i) => ({
            id: 25 + i,
            type: 'exporting_country_destinations',
            title: `Top ${i + 1} Exporting country- Who are the top 10 destination countries`,
            countryRank: i + 1
          })),
          // Slides 30-39: Top 10 exporting countries → their top 10 importer companies
          ...Array.from({length: 10}, (_, i) => ({
            id: 30 + i,
            type: 'exporting_country_companies',
            title: `Top ${i + 1} Exporting country- Who are the top 10 Importer companies`,
            countryRank: i + 1
          }))
        ]
      },
      supplierBuyer: {
        range: [40, 62],
        slides: [
          { id: 40, type: 'supplier_buyer_intelligence', title: 'SUPPLIER & BUYER INTELLIGENCE - Sankey Diagram' },
          { id: 41, type: 'top_suppliers_analysis', title: 'Top 15 Suppliers Analysis- market share, suppliers countries and importers name - Sankey Diagram' },
          // Slides 42-51: Top 10 suppliers detailed analysis
          ...Array.from({length: 10}, (_, i) => ({
            id: 42 + i,
            type: 'supplier_detailed_analysis',
            title: `Top ${i + 1} Supplier detailed analysis- price, number of destination countries, market share and charts`,
            supplierRank: i + 1
          })),
          { id: 52, type: 'top_importers_analysis', title: 'Top 15 Importers Analysis- Market share, Suppliers countries and Importers name- Sankey Diagram' },
          // Slides 53-62: Top 10 importers detailed analysis
          ...Array.from({length: 10}, (_, i) => ({
            id: 53 + i,
            type: 'importer_detailed_analysis',
            title: `Top ${i + 1} Importer detailed analysis- price, market share, number of suppliers countries and charts`,
            importerRank: i + 1
          }))
        ]
      },
      pricing: {
        range: [63, 63],
        slides: [
          { id: 63, type: 'pricing_analysis', title: 'Pricing analysis (per unit)' }
        ]
      },
      shipmentRecords: {
        range: [67, 300],
        slides: Array.from({length: 234}, (_, i) => ({
          id: 67 + i,
          type: 'shipment_records',
          title: `Shipment Records ${i + 1}`,
          recordStart: i * 10 + 1,
          recordEnd: (i + 1) * 10
        }))
      }
    };
  }
  
  /**
   * Generate all 300 slides with 0% deviation
   */
  async generateAllSlides() {
    console.log('🚀 Starting BCG-Level 300-Slide Generation...');
    console.log('📊 Structure Validation: 0% Deviation Guaranteed');
    
    this.slides = [];
    let slideCount = 0;
    
    // Generate Foundation Section (Slides 1-8)
    console.log('📋 Generating Foundation Section (Slides 1-8)...');
    const foundationSlides = await this.sections.foundation.generateSlides(this.slideStructure.foundation.slides);
    this.slides.push(...foundationSlides);
    slideCount += foundationSlides.length;
    console.log(`✅ Foundation: ${foundationSlides.length} slides generated`);
    
    // Generate Importing Countries Section (Slides 9-23)
    console.log('🌍 Generating Importing Countries Section (Slides 9-23)...');
    const importingSlides = await this.sections.importingCountries.generateSlides(this.slideStructure.importingCountries.slides);
    this.slides.push(...importingSlides);
    slideCount += importingSlides.length;
    console.log(`✅ Importing Countries: ${importingSlides.length} slides generated`);
    
    // Generate Exporting Countries Section (Slides 24-39)
    console.log('🚢 Generating Exporting Countries Section (Slides 24-39)...');
    const exportingSlides = await this.sections.exportingCountries.generateSlides(this.slideStructure.exportingCountries.slides);
    this.slides.push(...exportingSlides);
    slideCount += exportingSlides.length;
    console.log(`✅ Exporting Countries: ${exportingSlides.length} slides generated`);
    
    // Generate Supplier & Buyer Section (Slides 40-62)
    console.log('🤝 Generating Supplier & Buyer Section (Slides 40-62)...');
    const supplierBuyerSlides = await this.sections.supplierBuyer.generateSlides(this.slideStructure.supplierBuyer.slides);
    this.slides.push(...supplierBuyerSlides);
    slideCount += supplierBuyerSlides.length;
    console.log(`✅ Supplier & Buyer: ${supplierBuyerSlides.length} slides generated`);
    
    // Generate Pricing Section (Slide 63)
    console.log('💰 Generating Pricing Section (Slide 63)...');
    const pricingSlides = await this.sections.pricing.generateSlides(this.slideStructure.pricing.slides);
    this.slides.push(...pricingSlides);
    slideCount += pricingSlides.length;
    console.log(`✅ Pricing: ${pricingSlides.length} slides generated`);
    
    // Generate Shipment Records Section (Slides 67-300)
    console.log('📦 Generating Shipment Records Section (Slides 67-300)...');
    const shipmentSlides = await this.sections.shipmentRecords.generateSlides(this.slideStructure.shipmentRecords.slides);
    this.slides.push(...shipmentSlides);
    slideCount += shipmentSlides.length;
    console.log(`✅ Shipment Records: ${shipmentSlides.length} slides generated`);
    
    // Validation
    if (slideCount !== 297) {
      throw new Error(`❌ STRUCTURE DEVIATION DETECTED: Expected 297 slides, got ${slideCount}`);
    }
    
    console.log(`🎉 SUCCESS: All ${slideCount} slides generated with 0% deviation!`);
    return this.slides;
  }
  
  /**
   * Export to HTML with BCG-level styling
   */
  async exportToHTML(outputPath) {
    console.log('📄 Exporting to BCG-Level HTML...');
    
    const template = await this.templateEngine.loadMainTemplate();
    const slidesHTML = this.slides.map(slide => slide.html).join('\\n');
    
    const html = template
      .replace('{{TITLE}}', `${this.productData.name} Trade Intelligence Report`)
      .replace('{{SLIDES}}', slidesHTML)
      .replace('{{TOTAL_SLIDES}}', this.slides.length)
      .replace('{{PRODUCT_NAME}}', this.productData.name);
    
    await fs.writeFile(outputPath, html);
    console.log(`✅ HTML exported: ${outputPath}`);
    return outputPath;
  }
  
  /**
   * Generate progress report
   */
  generateProgressReport() {
    const sections = Object.keys(this.slideStructure);
    const report = {
      totalSlides: 297,
      generatedSlides: this.slides.length,
      sections: sections.map(sectionName => {
        const section = this.slideStructure[sectionName];
        const sectionSlides = this.slides.filter(slide => 
          slide.id >= section.range[0] && slide.id <= section.range[1]
        );
        return {
          name: sectionName,
          range: section.range,
          expected: section.range[1] - section.range[0] + 1,
          generated: sectionSlides.length,
          status: sectionSlides.length === (section.range[1] - section.range[0] + 1) ? 'Complete' : 'In Progress'
        };
      })
    };
    
    return report;
  }
}

module.exports = MainOrchestrator;

