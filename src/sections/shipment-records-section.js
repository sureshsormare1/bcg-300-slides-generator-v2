/**
 * Shipment Records Section Generator - Slides 67-300
 * 
 * This module generates the shipment records slides with 0% deviation:
 * - Slides 67-300: Detailed shipment records (10 records per slide = 234 slides)
 */

class ShipmentRecordsSection {
  constructor(dataProcessor, templateEngine, chartGenerator) {
    this.dataProcessor = dataProcessor;
    this.templateEngine = templateEngine;
    this.chartGenerator = chartGenerator;
    this.data = dataProcessor.getProcessedData();
  }
  
  /**
   * Generate all shipment records slides (67-300)
   */
  async generateSlides(slideDefinitions) {
    console.log('📦 Generating Shipment Records Section slides...');
    
    const slides = [];
    const shipmentRecords = this.data.shipments.shipmentRecords;
    
    for (const slideDef of slideDefinitions) {
      console.log(`   📄 Generating Slide ${slideDef.id}: Records ${slideDef.recordStart}-${slideDef.recordEnd}`);
      
      const slide = this.generateShipmentRecordsSlide(slideDef, shipmentRecords);
      slides.push(slide);
    }
    
    console.log(`✅ Shipment Records Section: ${slides.length} slides generated`);
    return slides;
  }
  
  /**
   * Generate individual shipment records slide
   */
  generateShipmentRecordsSlide(slideDef, allRecords) {
    const startIndex = slideDef.recordStart - 1;
    const endIndex = slideDef.recordEnd;
    const slideRecords = allRecords.slice(startIndex, endIndex);
    
    const recordsTable = this.generateShipmentRecordsTable(slideRecords);
    const recordsSummary = this.generateRecordsSummary(slideRecords, slideDef.recordStart, slideDef.recordEnd);
    
    const content = `
      ${recordsSummary}
      ${recordsTable}
    `;
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: `Shipment Records ${slideDef.recordStart}-${slideDef.recordEnd}`,
      content: content,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateStandardSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideData.title,
      html: html
    };
  }
  
  /**
   * Generate shipment records table
   */
  generateShipmentRecordsTable(records) {
    const tableData = {
      headers: [
        'Record ID',
        'Date',
        'Supplier',
        'Supplier Country',
        'Buyer',
        'Buyer Country',
        'Quantity (kg)',
        'Unit Price',
        'Total Value',
        'Port of Loading',
        'Port of Discharge'
      ],
      rows: records.map(record => [
        record.id,
        record.date,
        this.truncateText(record.supplier, 20),
        record.supplierCountry,
        this.truncateText(record.buyer, 20),
        record.buyerCountry,
        this.dataProcessor.formatNumber(record.quantity),
        record.unitPrice,
        record.totalValue,
        record.portOfLoading,
        record.portOfDischarge
      ])
    };
    
    return this.templateEngine.generateTable(tableData);
  }
  
  /**
   * Generate records summary
   */
  generateRecordsSummary(records, startRecord, endRecord) {
    const totalValue = records.reduce((sum, record) => {
      const value = parseFloat(record.totalValue.replace(/[$,]/g, ''));
      return sum + value;
    }, 0);
    
    const totalQuantity = records.reduce((sum, record) => sum + record.quantity, 0);
    const avgUnitPrice = totalValue / totalQuantity;
    
    const uniqueSuppliers = [...new Set(records.map(r => r.supplier))].length;
    const uniqueBuyers = [...new Set(records.map(r => r.buyer))].length;
    const uniqueCountries = [...new Set([
      ...records.map(r => r.supplierCountry),
      ...records.map(r => r.buyerCountry)
    ])].length;
    
    const topSupplierCountry = this.getTopCountry(records.map(r => r.supplierCountry));
    const topBuyerCountry = this.getTopCountry(records.map(r => r.buyerCountry));
    
    return `
      <div class="executive-summary">
        <div class="summary-title">Records ${startRecord}-${endRecord} Summary</div>
        <div class="summary-content">
          <p>This batch contains <strong>${records.length} shipment records</strong> with a combined value of <strong>${this.dataProcessor.formatCurrency(totalValue)}</strong> and total quantity of <strong>${this.dataProcessor.formatNumber(totalQuantity)} kg</strong>.</p>
          <p>The records involve <strong>${uniqueSuppliers} suppliers</strong> and <strong>${uniqueBuyers} buyers</strong> across <strong>${uniqueCountries} countries</strong>. Average unit price for this batch is <strong>${this.dataProcessor.formatCurrency(avgUnitPrice)}</strong>.</p>
          <p>Top supplier country: <strong>${topSupplierCountry}</strong> | Top buyer country: <strong>${topBuyerCountry}</strong></p>
        </div>
      </div>
      
      <div class="kpi-container" style="margin: 20px 0;">
        <div class="kpi-card">
          <div class="kpi-title">Total Value</div>
          <div class="kpi-value">${this.dataProcessor.formatCurrency(totalValue)}</div>
          <div class="kpi-trend">${records.length} records</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Total Quantity</div>
          <div class="kpi-value">${this.dataProcessor.formatNumber(totalQuantity)} kg</div>
          <div class="kpi-trend">Avg: ${this.dataProcessor.formatNumber(totalQuantity / records.length)} kg/record</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Avg Unit Price</div>
          <div class="kpi-value">${this.dataProcessor.formatCurrency(avgUnitPrice)}</div>
          <div class="kpi-trend">Per kilogram</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Market Coverage</div>
          <div class="kpi-value">${uniqueCountries}</div>
          <div class="kpi-trend">Countries involved</div>
        </div>
      </div>
    `;
  }
  
  /**
   * Helper methods
   */
  
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
  
  getTopCountry(countries) {
    const countryCount = {};
    countries.forEach(country => {
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    
    return Object.keys(countryCount).reduce((a, b) => 
      countryCount[a] > countryCount[b] ? a : b
    );
  }
}

module.exports = ShipmentRecordsSection;

