/**
 * Template Engine - BCG-Level Styling and HTML Generation
 * 
 * This module manages all HTML templates and ensures consistent BCG-level
 * styling across all 300 slides.
 */

const fs = require('fs-extra');
const path = require('path');

class TemplateEngine {
  constructor() {
    this.templatesPath = path.join(__dirname, '../templates');
    this.bcgColors = {
      navy: '#003366',
      blue: '#0066CC',
      orange: '#FF6B35',
      lightBlue: '#E6F0FF',
      lightGray: '#F5F5F5',
      darkGray: '#333333',
      mediumGray: '#666666',
      lightOrange: '#FFE6D9'
    };
  }
  
  /**
   * Load the main HTML template
   */
  async loadMainTemplate() {
    const templatePath = path.join(this.templatesPath, 'main-template.html');
    
    // Create template if it doesn't exist
    if (!await fs.pathExists(templatePath)) {
      await this.createMainTemplate(templatePath);
    }
    
    return await fs.readFile(templatePath, 'utf8');
  }
  
  /**
   * Create the main HTML template with BCG styling
   */
  async createMainTemplate(templatePath) {
    await fs.ensureDir(this.templatesPath);
    
    const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <style>
    ${this.getBCGStyles()}
  </style>
</head>
<body>
  <div id="presentation-container">
    {{SLIDES}}
    
    <div class="controls">
      <button id="prevBtn" class="control-btn">Previous</button>
      <span id="slideCounter">1 / {{TOTAL_SLIDES}}</span>
      <button id="nextBtn" class="control-btn">Next</button>
    </div>
  </div>
  
  <script>
    ${this.getNavigationScript()}
  </script>
</body>
</html>`;
    
    await fs.writeFile(templatePath, template);
  }
  
  /**
   * Get BCG-level CSS styles
   */
  getBCGStyles() {
    return `
    :root {
      --bcg-navy: ${this.bcgColors.navy};
      --bcg-blue: ${this.bcgColors.blue};
      --bcg-orange: ${this.bcgColors.orange};
      --bcg-light-blue: ${this.bcgColors.lightBlue};
      --bcg-light-gray: ${this.bcgColors.lightGray};
      --bcg-dark-gray: ${this.bcgColors.darkGray};
      --bcg-medium-gray: ${this.bcgColors.mediumGray};
      --bcg-light-orange: ${this.bcgColors.lightOrange};
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Arial', 'Helvetica', sans-serif;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    #presentation-container {
      width: 100%;
      max-width: 1200px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
    
    .slide {
      width: 100%;
      height: 675px;
      position: relative;
      display: none;
      flex-direction: column;
      padding: 40px;
      background-color: white;
    }
    
    .slide.active {
      display: flex;
    }
    
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 3px solid var(--bcg-navy);
      padding-bottom: 15px;
    }
    
    .slide-title {
      font-size: 32px;
      color: var(--bcg-navy);
      font-weight: bold;
      line-height: 1.2;
    }
    
    .slide-logo {
      font-size: 24px;
      font-weight: bold;
      color: var(--bcg-navy);
      background-color: var(--bcg-light-blue);
      padding: 8px 16px;
      border-radius: 4px;
    }
    
    .slide-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: auto;
    }
    
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      border-top: 1px solid #ddd;
      padding-top: 15px;
      font-size: 14px;
      color: var(--bcg-medium-gray);
    }
    
    /* Title Slide Styles */
    .title-slide {
      background: linear-gradient(135deg, var(--bcg-navy) 0%, var(--bcg-blue) 100%);
      color: white;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .title-slide .slide-title {
      font-size: 48px;
      color: white;
      margin-bottom: 20px;
    }
    
    .subtitle {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 30px;
    }
    
    .date {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    /* Executive Summary Styles */
    .executive-summary {
      background-color: var(--bcg-light-blue);
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 25px;
    }
    
    .summary-title {
      font-size: 24px;
      color: var(--bcg-navy);
      font-weight: bold;
      margin-bottom: 15px;
    }
    
    .summary-content {
      font-size: 16px;
      line-height: 1.6;
      color: var(--bcg-dark-gray);
    }
    
    .summary-content p {
      margin-bottom: 12px;
    }
    
    .summary-content strong {
      color: var(--bcg-navy);
      font-weight: bold;
    }
    
    /* KPI Cards */
    .kpi-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .kpi-card {
      background-color: white;
      border: 2px solid var(--bcg-light-blue);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .kpi-title {
      font-size: 14px;
      color: var(--bcg-medium-gray);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .kpi-value {
      font-size: 28px;
      color: var(--bcg-navy);
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .kpi-trend {
      font-size: 14px;
      font-weight: bold;
    }
    
    .trend-up {
      color: #28a745;
    }
    
    .trend-down {
      color: #dc3545;
    }
    
    /* Table Styles */
    .table-container {
      overflow-x: auto;
      margin: 20px 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    th {
      background-color: var(--bcg-navy);
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
      font-size: 14px;
    }
    
    td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: var(--bcg-dark-gray);
    }
    
    tr:nth-child(even) {
      background-color: var(--bcg-light-gray);
    }
    
    tr:hover {
      background-color: var(--bcg-light-blue);
    }
    
    /* Chart Styles */
    .chart-container {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 20px 0;
    }
    
    .chart-title {
      font-size: 18px;
      color: var(--bcg-navy);
      font-weight: bold;
      margin-bottom: 15px;
      text-align: center;
    }
    
    /* Two Column Layout */
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 20px 0;
    }
    
    /* Three Column Layout */
    .three-column {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    
    /* Product Info Styles */
    .product-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 20px 0;
    }
    
    .product-details {
      background-color: var(--bcg-light-blue);
      padding: 25px;
      border-radius: 8px;
    }
    
    .product-property {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(0, 51, 102, 0.2);
    }
    
    .property-name {
      font-weight: bold;
      color: var(--bcg-navy);
    }
    
    .property-value {
      color: var(--bcg-dark-gray);
    }
    
    .medical-uses {
      background-color: var(--bcg-light-orange);
      padding: 25px;
      border-radius: 8px;
    }
    
    .uses-title {
      font-size: 18px;
      color: var(--bcg-navy);
      font-weight: bold;
      margin-bottom: 15px;
    }
    
    .uses-list {
      list-style: none;
      padding: 0;
    }
    
    .use-item {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 107, 53, 0.3);
      color: var(--bcg-dark-gray);
    }
    
    .use-item:before {
      content: "•";
      color: var(--bcg-orange);
      font-weight: bold;
      margin-right: 10px;
    }
    
    /* Table of Contents Styles */
    .toc-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin: 20px 0;
    }
    
    .toc-section {
      margin-bottom: 30px;
    }
    
    .toc-section-title {
      font-size: 20px;
      color: var(--bcg-navy);
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--bcg-orange);
    }
    
    .toc-items {
      list-style: none;
      padding: 0;
    }
    
    .toc-item {
      padding: 6px 0;
      color: var(--bcg-dark-gray);
      font-size: 14px;
      border-bottom: 1px solid #eee;
    }
    
    .toc-item:before {
      content: "→";
      color: var(--bcg-blue);
      margin-right: 8px;
    }
    
    /* Controls */
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 20px;
      padding: 15px;
      background-color: var(--bcg-light-gray);
      border-radius: 8px;
    }
    
    .control-btn {
      background-color: var(--bcg-navy);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .control-btn:hover {
      background-color: var(--bcg-blue);
    }
    
    .control-btn:disabled {
      background-color: var(--bcg-medium-gray);
      cursor: not-allowed;
    }
    
    #slideCounter {
      font-size: 16px;
      font-weight: bold;
      color: var(--bcg-navy);
      min-width: 80px;
      text-align: center;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .slide {
        padding: 20px;
        height: auto;
        min-height: 500px;
      }
      
      .slide-title {
        font-size: 24px;
      }
      
      .two-column,
      .three-column,
      .product-info,
      .toc-container {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .kpi-container {
        grid-template-columns: 1fr;
      }
    }
    `;
  }
  
  /**
   * Get navigation JavaScript
   */
  getNavigationScript() {
    return `
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    function showSlide(n) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (n + totalSlides) % totalSlides;
      slides[currentSlide].classList.add('active');
      
      slideCounter.textContent = \`\${currentSlide + 1} / \${totalSlides}\`;
      
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
      }
    }
    
    function prevSlide() {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Initialize
    showSlide(0);
    `;
  }
  
  /**
   * Generate slide HTML with BCG styling
   */
  generateSlideHTML(slideData) {
    const { id, type, title, content } = slideData;
    
    switch (type) {
      case 'title_agenda':
        return this.generateTitleSlide(slideData);
      case 'table_of_contents':
        return this.generateTOCSlide(slideData);
      case 'executive_summary':
        return this.generateExecutiveSummarySlide(slideData);
      case 'product_overview':
        return this.generateProductOverviewSlide(slideData);
      default:
        return this.generateStandardSlide(slideData);
    }
  }
  
  /**
   * Generate title slide
   */
  generateTitleSlide(slideData) {
    return `
    <div class="slide title-slide" id="slide-${slideData.id}">
      <div class="slide-title">${slideData.title}</div>
      <div class="subtitle">${slideData.subtitle || 'Global Market Analysis & Strategic Insights'}</div>
      <div class="date">${slideData.date || 'Data Period: Jan 2023 - Dec 2023'}</div>
    </div>
    `;
  }
  
  /**
   * Generate table of contents slide
   */
  generateTOCSlide(slideData) {
    return `
    <div class="slide" id="slide-${slideData.id}">
      <div class="slide-header">
        <div class="slide-title">${slideData.title}</div>
        <div class="slide-logo">BCG</div>
      </div>
      <div class="slide-content">
        <div class="toc-container">
          ${slideData.content}
        </div>
      </div>
      <div class="slide-footer">
        <div>${slideData.productName} Trade Intelligence Report</div>
        <div>Confidential</div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generate executive summary slide
   */
  generateExecutiveSummarySlide(slideData) {
    return `
    <div class="slide" id="slide-${slideData.id}">
      <div class="slide-header">
        <div class="slide-title">${slideData.title}</div>
        <div class="slide-logo">BCG</div>
      </div>
      <div class="slide-content">
        <div class="executive-summary">
          <div class="summary-title">Key Findings</div>
          <div class="summary-content">
            ${slideData.content}
          </div>
        </div>
        ${slideData.kpiCards || ''}
      </div>
      <div class="slide-footer">
        <div>${slideData.productName} Trade Intelligence Report</div>
        <div>Confidential</div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generate product overview slide
   */
  generateProductOverviewSlide(slideData) {
    return `
    <div class="slide" id="slide-${slideData.id}">
      <div class="slide-header">
        <div class="slide-title">${slideData.title}</div>
        <div class="slide-logo">BCG</div>
      </div>
      <div class="slide-content">
        ${slideData.content}
      </div>
      <div class="slide-footer">
        <div>${slideData.productName} Trade Intelligence Report</div>
        <div>Confidential</div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generate standard slide
   */
  generateStandardSlide(slideData) {
    return `
    <div class="slide" id="slide-${slideData.id}">
      <div class="slide-header">
        <div class="slide-title">${slideData.title}</div>
        <div class="slide-logo">BCG</div>
      </div>
      <div class="slide-content">
        ${slideData.content}
      </div>
      <div class="slide-footer">
        <div>${slideData.productName} Trade Intelligence Report</div>
        <div>Confidential</div>
      </div>
    </div>
    `;
  }
  
  /**
   * Generate KPI cards HTML
   */
  generateKPICards(kpiData) {
    const cards = kpiData.map(kpi => `
      <div class="kpi-card">
        <div class="kpi-title">${kpi.title}</div>
        <div class="kpi-value">${kpi.value}</div>
        <div class="kpi-trend ${kpi.trendClass}">${kpi.trend}</div>
      </div>
    `).join('');
    
    return `<div class="kpi-container">${cards}</div>`;
  }
  
  /**
   * Generate table HTML
   */
  generateTable(tableData) {
    const headers = tableData.headers.map(header => `<th>${header}</th>`).join('');
    const rows = tableData.rows.map(row => 
      `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
    ).join('');
    
    return `
    <div class="table-container">
      <table>
        <thead>
          <tr>${headers}</tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
    `;
  }
}

module.exports = TemplateEngine;

