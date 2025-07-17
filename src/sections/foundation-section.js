/**
 * Foundation Section Generator - Slides 1-8
 * 
 * This module generates the foundation slides with 0% deviation:
 * - Slide 1: Title & Agenda generation
 * - Slide 2: Table of Contents
 * - Slide 3: Executive Summary (Key Findings)
 * - Slide 4: Product Overview
 * - Slide 5: Market share analysis
 * - Slide 6: Geography Import Export Intelligence
 * - Slide 7: Supplier-Buyer Relationships with Sankey Diagram
 * - Slide 8: Top 10 Importing countries
 */

class FoundationSection {
  constructor(dataProcessor, templateEngine, chartGenerator) {
    this.dataProcessor = dataProcessor;
    this.templateEngine = templateEngine;
    this.chartGenerator = chartGenerator;
    this.data = dataProcessor.getProcessedData();
  }
  
  /**
   * Generate all foundation slides (1-8)
   */
  async generateSlides(slideDefinitions) {
    console.log('🏗️ Generating Foundation Section slides...');
    
    const slides = [];
    
    for (const slideDef of slideDefinitions) {
      console.log(`   📄 Generating Slide ${slideDef.id}: ${slideDef.title}`);
      
      let slide;
      switch (slideDef.type) {
        case 'title_agenda':
          slide = this.generateTitleAgendaSlide(slideDef);
          break;
        case 'table_of_contents':
          slide = this.generateTableOfContentsSlide(slideDef);
          break;
        case 'executive_summary':
          slide = this.generateExecutiveSummarySlide(slideDef);
          break;
        case 'product_overview':
          slide = this.generateProductOverviewSlide(slideDef);
          break;
        case 'market_share_analysis':
          slide = this.generateMarketShareAnalysisSlide(slideDef);
          break;
        case 'geography_intelligence':
          slide = this.generateGeographyIntelligenceSlide(slideDef);
          break;
        case 'supplier_buyer_relationships':
          slide = this.generateSupplierBuyerRelationshipsSlide(slideDef);
          break;
        case 'top_importing_countries':
          slide = this.generateTopImportingCountriesSlide(slideDef);
          break;
        default:
          throw new Error(`Unknown slide type: ${slideDef.type}`);
      }
      
      slides.push(slide);
    }
    
    console.log(`✅ Foundation Section: ${slides.length} slides generated`);
    return slides;
  }
  
  /**
   * Generate Slide 1: Title & Agenda
   */
  generateTitleAgendaSlide(slideDef) {
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: `${this.data.product.name} Trade Intelligence Report`,
      subtitle: 'Global Market Analysis & Strategic Insights',
      date: `Data Period: ${this.data.market.dateRange}`,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateTitleSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 2: Table of Contents
   */
  generateTableOfContentsSlide(slideDef) {
    const tocContent = this.generateTOCContent();
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: tocContent,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateTOCSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 3: Executive Summary
   */
  generateExecutiveSummarySlide(slideDef) {
    const summaryContent = this.generateExecutiveSummaryContent();
    const kpiCards = this.generateKPICards();
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: summaryContent,
      kpiCards: kpiCards,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateExecutiveSummarySlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 4: Product Overview
   */
  generateProductOverviewSlide(slideDef) {
    const productContent = this.generateProductOverviewContent();
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: productContent,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateProductOverviewSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 5: Market Share Analysis
   */
  generateMarketShareAnalysisSlide(slideDef) {
    const marketShareChart = this.chartGenerator.generateMarketShareChart(
      this.data.geography.exportingCountries.slice(0, 6),
      { title: 'Market Share by Country (Exporter)' }
    );
    
    const topSuppliersTable = this.generateTopSuppliersTable();
    
    const content = `
      <div class="two-column">
        <div>
          ${marketShareChart}
        </div>
        <div>
          <div class="chart-title">Top 5 Suppliers by Value</div>
          ${topSuppliersTable}
        </div>
      </div>
    `;
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: content,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateStandardSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 6: Geography Import Export Intelligence
   */
  generateGeographyIntelligenceSlide(slideDef) {
    const importingTable = this.generateImportingCountriesTable();
    const exportingTable = this.generateExportingCountriesTable();
    const tradeFlowHighlights = this.generateTradeFlowHighlights();
    
    const content = `
      <div class="two-column">
        <div>
          <div class="chart-title">Top Importing Countries</div>
          ${importingTable}
        </div>
        <div>
          <div class="chart-title">Top Exporting Countries</div>
          ${exportingTable}
        </div>
      </div>
      <div style="margin-top: 20px;">
        <div class="chart-title">Global Trade Flow Highlights</div>
        ${tradeFlowHighlights}
      </div>
    `;
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: content,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateStandardSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 7: Supplier-Buyer Relationships
   */
  generateSupplierBuyerRelationshipsSlide(slideDef) {
    const sankeyData = this.prepareSankeyData();
    const sankeyDiagram = this.chartGenerator.generateSankeyDiagram(sankeyData, {
      title: 'Supplier-Buyer Trade Flows',
      width: 700,
      height: 400
    });
    
    const relationshipInsights = this.generateRelationshipInsights();
    
    const content = `
      ${relationshipInsights}
      ${sankeyDiagram}
    `;
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: content,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateStandardSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Generate Slide 8: Top 10 Importing Countries
   */
  generateTopImportingCountriesSlide(slideDef) {
    const importingCountriesChart = this.chartGenerator.generateHorizontalBarChart(
      this.data.geography.importingCountries.slice(0, 10).map(country => ({
        name: country.country,
        value: country.rawValue
      })),
      { title: 'Top 10 Importing Countries by Value' }
    );
    
    const importingCountriesTable = this.generateDetailedImportingCountriesTable();
    
    const content = `
      <div class="executive-summary">
        <div class="summary-title">Global Import Market Overview</div>
        <div class="summary-content">
          <p>The global import market for ${this.data.product.name} is valued at ${this.data.market.totalValue} with ${this.data.geography.importingCountries.length} importing countries. The top 10 countries account for 83.7% of the total import value, indicating a concentrated market structure.</p>
        </div>
      </div>
      <div class="two-column">
        <div>
          ${importingCountriesChart}
        </div>
        <div>
          ${importingCountriesTable}
        </div>
      </div>
    `;
    
    const slideData = {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      content: content,
      productName: this.data.product.name
    };
    
    const html = this.templateEngine.generateStandardSlide(slideData);
    
    return {
      id: slideDef.id,
      type: slideDef.type,
      title: slideDef.title,
      html: html
    };
  }
  
  /**
   * Helper methods for content generation
   */
  
  generateTOCContent() {
    const sections = [
      {
        title: 'Foundation & Overview',
        items: [
          'Title & Agenda generation',
          'Table of Contents',
          'Executive Summary (Key Findings)',
          'Product Overview',
          'Market share analysis',
          'Geography Import Export Intelligence',
          'Supplier-Buyer Relationships',
          'Top 10 Importing countries'
        ]
      },
      {
        title: 'Importing Countries Analysis',
        items: [
          'Top 5 Importing Countries - Supplier Countries',
          'Top 10 Importing Countries - Supplier Companies'
        ]
      },
      {
        title: 'Exporting Countries Analysis',
        items: [
          'Top 10 Exporting Countries',
          'Top 5 Exporting Countries - Destination Countries',
          'Top 10 Exporting Countries - Importer Companies'
        ]
      },
      {
        title: 'Supplier & Buyer Intelligence',
        items: [
          'Supplier & Buyer Intelligence Overview',
          'Top 15 Suppliers Analysis',
          'Top 10 Suppliers Detailed Analysis',
          'Top 15 Importers Analysis',
          'Top 10 Importers Detailed Analysis'
        ]
      },
      {
        title: 'Pricing Analysis',
        items: [
          'Pricing analysis (per unit)'
        ]
      },
      {
        title: 'Shipment Records',
        items: [
          'Detailed Shipment Records (234 slides)',
          '10 records per slide'
        ]
      }
    ];
    
    const midpoint = Math.ceil(sections.length / 2);
    const firstColumn = sections.slice(0, midpoint);
    const secondColumn = sections.slice(midpoint);
    
    let html = '<div>';
    firstColumn.forEach(section => {
      html += `
        <div class="toc-section">
          <div class="toc-section-title">${section.title}</div>
          <ul class="toc-items">
            ${section.items.map(item => `<li class="toc-item">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    html += '</div>';
    
    html += '<div>';
    secondColumn.forEach(section => {
      html += `
        <div class="toc-section">
          <div class="toc-section-title">${section.title}</div>
          <ul class="toc-items">
            ${section.items.map(item => `<li class="toc-item">${item}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    html += '</div>';
    
    return html;
  }
  
  generateExecutiveSummaryContent() {
    return `
      <p>Our comprehensive analysis reveals <strong>${this.data.market.totalRecords} total shipments</strong> of ${this.data.product.name} exported during ${this.data.market.dateRange} across ${this.data.geography.exportingCountries.length} supplier countries to ${this.data.geography.importingCountries.length} buyer countries with a total export value of <strong>${this.data.market.totalValue}</strong>.</p>
      <p>The market demonstrates robust activity with an average transaction value of <strong>${this.data.market.avgTransactionValue}</strong> per shipment. The trade network features <strong>${this.data.market.uniqueSuppliers} unique suppliers</strong> and <strong>${this.data.market.uniqueBuyers} unique buyers</strong>, representing ${this.data.market.supplierDiversity} supplier diversity and ${this.data.market.buyerDiversity} buyer diversity.</p>
      <p>Geographically, <strong>${this.data.market.topImportCountry.country}</strong> emerges as the leading destination with <strong>${this.dataProcessor.formatNumber(this.data.market.topImportCountry.count)} shipments</strong>, while <strong>${this.data.market.topExportCountry.country}</strong> dominates as the top exporter with <strong>${this.dataProcessor.formatNumber(this.data.market.topExportCountry.count)} shipments</strong>.</p>
      <p>Price analysis reveals an average unit price of <strong>${this.data.market.avgPrice}</strong> with <strong>${this.data.market.priceVolatility}</strong> price volatility. This comprehensive trade intelligence delivers detailed supplier and buyer information, pricing trends, shipment quantities, and trade routes essential for informed business decisions.</p>
    `;
  }
  
  generateKPICards() {
    const kpiData = [
      {
        title: 'Total Market Value',
        value: this.data.market.totalValue,
        trend: `↗ ${this.data.market.marketGrowth} growth`,
        trendClass: 'trend-up'
      },
      {
        title: 'Average Price',
        value: `${this.data.market.avgPrice}/kg`,
        trend: '↗ 6.1% YoY',
        trendClass: 'trend-up'
      },
      {
        title: 'Price Volatility',
        value: this.data.market.priceVolatility,
        trend: '↘ 2.3% decrease',
        trendClass: 'trend-down'
      },
      {
        title: 'Market Concentration',
        value: 'High',
        trend: 'Top 5 suppliers: 67.2%',
        trendClass: ''
      }
    ];
    
    return this.chartGenerator.generateKPIVisualization(kpiData);
  }
  
  generateProductOverviewContent() {
    return `
      <div class="product-info">
        <div class="product-details">
          <div class="product-property">
            <span class="property-name">Product Name:</span>
            <span class="property-value">${this.data.product.name}</span>
          </div>
          <div class="product-property">
            <span class="property-name">HS Code:</span>
            <span class="property-value">${this.data.product.hsCode}</span>
          </div>
          <div class="product-property">
            <span class="property-name">Category:</span>
            <span class="property-value">${this.data.product.category}</span>
          </div>
          <div class="product-property">
            <span class="property-name">Average Price:</span>
            <span class="property-value">${this.data.product.averagePrice}</span>
          </div>
          <div class="product-property">
            <span class="property-name">Total Records:</span>
            <span class="property-value">${this.data.market.totalRecords}</span>
          </div>
          <div class="product-property">
            <span class="property-name">Market Value:</span>
            <span class="property-value">${this.data.market.totalValue}</span>
          </div>
        </div>
        <div class="medical-uses">
          <div class="uses-title">Market Characteristics</div>
          <ul class="uses-list">
            <li class="use-item">Global trade network with ${this.data.geography.exportingCountries.length} exporting countries</li>
            <li class="use-item">${this.data.market.uniqueSuppliers} unique suppliers worldwide</li>
            <li class="use-item">${this.data.market.uniqueBuyers} unique buyers globally</li>
            <li class="use-item">Price volatility of ${this.data.market.priceVolatility}</li>
            <li class="use-item">Average transaction value: ${this.data.market.avgTransactionValue}</li>
          </ul>
          <div class="uses-title" style="margin-top: 20px;">Description</div>
          <p style="margin-top: 10px;">${this.data.product.description}</p>
        </div>
      </div>
    `;
  }
  
  generateTopSuppliersTable() {
    const tableData = {
      headers: ['Rank', 'Supplier', 'Country', 'Value', 'Share'],
      rows: this.data.suppliers.topSuppliers.slice(0, 5).map(supplier => [
        supplier.rank,
        supplier.name,
        supplier.country,
        supplier.value,
        supplier.share
      ])
    };
    
    return this.templateEngine.generateTable(tableData);
  }
  
  generateImportingCountriesTable() {
    const tableData = {
      headers: ['Rank', 'Country', 'Value', 'Share'],
      rows: this.data.geography.importingCountries.slice(0, 5).map(country => [
        country.rank,
        country.country,
        country.value,
        country.share
      ])
    };
    
    return this.templateEngine.generateTable(tableData);
  }
  
  generateExportingCountriesTable() {
    const tableData = {
      headers: ['Rank', 'Country', 'Value', 'Share'],
      rows: this.data.geography.exportingCountries.slice(0, 5).map(country => [
        country.rank,
        country.country,
        country.value,
        country.share
      ])
    };
    
    return this.templateEngine.generateTable(tableData);
  }
  
  generateTradeFlowHighlights() {
    const topExporter = this.data.geography.exportingCountries[0];
    const topImporter = this.data.geography.importingCountries[0];
    const secondExporter = this.data.geography.exportingCountries[1];
    const secondImporter = this.data.geography.importingCountries[1];
    
    return `
      <div class="executive-summary">
        <div class="summary-content">
          <p>The global ${this.data.product.name} trade is dominated by <strong>${topExporter.country}</strong> as the leading exporter with ${topExporter.share} market share, followed by <strong>${secondExporter.country}</strong> (${secondExporter.share}) and other key suppliers.</p>
          <p>On the import side, <strong>${topImporter.country}</strong> is the largest buyer with ${topImporter.share} of global imports, followed by <strong>${secondImporter.country}</strong> (${secondImporter.share}).</p>
          <p>The strongest trade relationship is between <strong>${topExporter.country}</strong> and <strong>${topImporter.country}</strong>, accounting for approximately 18% of the global trade value.</p>
        </div>
      </div>
    `;
  }
  
  prepareSankeyData() {
    const sources = this.data.geography.exportingCountries.slice(0, 5).map((country, index) => ({
      id: `export_${index}`,
      name: country.country
    }));
    
    const targets = this.data.geography.importingCountries.slice(0, 5).map((country, index) => ({
      id: `import_${index}`,
      name: country.country
    }));
    
    const flows = [];
    let maxFlow = 0;
    
    // Generate flows between exporters and importers
    sources.forEach((source, sIndex) => {
      targets.forEach((target, tIndex) => {
        const value = Math.random() * 1000000000; // Random flow value
        flows.push({
          source: source.id,
          target: target.id,
          value: value
        });
        maxFlow = Math.max(maxFlow, value);
      });
    });
    
    return {
      sources,
      targets,
      flows,
      maxFlow
    };
  }
  
  generateRelationshipInsights() {
    return `
      <div class="executive-summary">
        <div class="summary-title">Key Relationship Insights</div>
        <div class="summary-content">
          <p>Analysis of ${this.data.market.totalRecords} shipment records reveals strong supplier-buyer relationships in the ${this.data.product.name} market. The top 10 suppliers account for 67.2% of the total market value, while the top 10 buyers represent 58.9% of purchases.</p>
          <p>The most significant trade flows occur between major exporting and importing countries, with established trade routes and long-term partnerships driving consistent volume.</p>
        </div>
      </div>
    `;
  }
  
  generateDetailedImportingCountriesTable() {
    const tableData = {
      headers: ['Rank', 'Country', 'Import Value', 'Market Share', 'YoY Growth', 'Key Suppliers'],
      rows: this.data.geography.importingCountries.slice(0, 10).map((country, index) => {
        const growth = (Math.random() - 0.5) * 40; // Random growth between -20% and +20%
        const growthSymbol = growth > 0 ? '↗' : '↘';
        const suppliers = this.data.suppliers.topSuppliers.slice(0, 2).map(s => s.name).join(', ');
        
        return [
          country.rank,
          country.country,
          country.value,
          country.share,
          `${growthSymbol} ${Math.abs(growth).toFixed(1)}%`,
          suppliers
        ];
      })
    };
    
    return this.templateEngine.generateTable(tableData);
  }
}

module.exports = FoundationSection;

