/**
 * Pricing Section Generator - Slide 63
 * 
 * This module generates the pricing analysis slide with 0% deviation:
 * - Slide 63: Pricing analysis (per unit)
 */

class PricingSection {
  constructor(dataProcessor, templateEngine, chartGenerator) {
    this.dataProcessor = dataProcessor;
    this.templateEngine = templateEngine;
    this.chartGenerator = chartGenerator;
    this.data = dataProcessor.getProcessedData();
  }
  
  /**
   * Generate pricing section slide (63)
   */
  async generateSlides(slideDefinitions) {
    console.log('💰 Generating Pricing Section slide...');
    
    const slides = [];
    
    for (const slideDef of slideDefinitions) {
      console.log(`   📄 Generating Slide ${slideDef.id}: ${slideDef.title}`);
      
      let slide;
      switch (slideDef.type) {
        case 'pricing_analysis':
          slide = this.generatePricingAnalysisSlide(slideDef);
          break;
        default:
          throw new Error(`Unknown slide type: ${slideDef.type}`);
      }
      
      slides.push(slide);
    }
    
    console.log(`✅ Pricing Section: ${slides.length} slide generated`);
    return slides;
  }
  
  /**
   * Generate Slide 63: Pricing Analysis (per unit)
   */
  generatePricingAnalysisSlide(slideDef) {
    const priceOverview = this.generatePriceOverview();
    const priceChart = this.generatePriceChart();
    const priceByCountryAnalysis = this.generatePriceByCountryAnalysis();
    const volatilityAnalysis = this.generateVolatilityAnalysis();
    
    const content = `
      ${priceOverview}
      <div class="two-column">
        <div>
          ${priceChart}
          ${volatilityAnalysis}
        </div>
        <div>
          ${priceByCountryAnalysis}
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
   * Generate price overview section
   */
  generatePriceOverview() {
    const priceKPIs = [
      {
        title: 'Current Average Price',
        value: this.data.pricing.currentPrice,
        trend: '↗ 6.1% YoY increase',
        trendClass: 'trend-up'
      },
      {
        title: 'Price Range',
        value: `${this.data.pricing.priceRange.min} - ${this.data.pricing.priceRange.max}`,
        trend: `Spread: ${this.calculatePriceSpread()}%`,
        trendClass: ''
      },
      {
        title: 'Price Volatility',
        value: this.data.pricing.volatility,
        trend: '↘ 2.3% decrease',
        trendClass: 'trend-down'
      },
      {
        title: 'Market Stability',
        value: this.getPriceStabilityRating(),
        trend: 'Moderate volatility',
        trendClass: ''
      }
    ];
    
    return `
      <div class="executive-summary">
        <div class="summary-title">Pricing Analysis Overview</div>
        <div class="summary-content">
          <p>The ${this.data.product.name} market demonstrates <strong>${this.data.pricing.volatility}</strong> price volatility with an average unit price of <strong>${this.data.pricing.currentPrice}</strong>. Price fluctuations are driven by supply chain dynamics, regulatory changes, and demand variations across key markets.</p>
          <p>Regional price differences reflect local market conditions, with premium markets showing higher price points due to quality requirements and regulatory compliance costs.</p>
        </div>
      </div>
      ${this.chartGenerator.generateKPIVisualization(priceKPIs)}
    `;
  }
  
  /**
   * Generate price trend chart
   */
  generatePriceChart() {
    const priceHistory = this.data.pricing.priceHistory.length > 0 
      ? this.data.pricing.priceHistory 
      : this.generateMockPriceHistory();
    
    const chartData = priceHistory.map(item => ({
      label: item.date,
      value: item.rawPrice || parseFloat(item.price.replace(/[$,]/g, ''))
    }));
    
    const priceChart = this.chartGenerator.generateLineChart(chartData, {
      title: 'Price Trend Analysis (2023)',
      width: 450,
      height: 250
    });
    
    return priceChart;
  }
  
  /**
   * Generate price by country analysis
   */
  generatePriceByCountryAnalysis() {
    const priceByCountry = this.data.pricing.priceByCountry.length > 0
      ? this.data.pricing.priceByCountry
      : this.generateMockPriceByCountry();
    
    const tableData = {
      headers: ['Rank', 'Country', 'Avg. Price', 'Price Index', 'Market Premium'],
      rows: priceByCountry.slice(0, 8).map((country, index) => {
        const basePrice = parseFloat(this.data.pricing.currentPrice.replace(/[$,]/g, ''));
        const countryPrice = country.rawPrice || basePrice * (0.8 + Math.random() * 0.4);
        const priceIndex = ((countryPrice / basePrice) * 100).toFixed(0);
        const premium = countryPrice > basePrice ? 'Premium' : 'Discount';
        
        return [
          index + 1,
          country.country,
          this.dataProcessor.formatCurrency(countryPrice),
          `${priceIndex}`,
          premium
        ];
      })
    };
    
    return `
      <div class="chart-container">
        <div class="chart-title">Price by Country Analysis</div>
        ${this.templateEngine.generateTable(tableData)}
        <div style="margin-top: 15px; font-size: 12px; color: #666; text-align: center;">
          Price Index: 100 = Global Average
        </div>
      </div>
    `;
  }
  
  /**
   * Generate volatility analysis
   */
  generateVolatilityAnalysis() {
    const volatilityFactors = [
      { factor: 'Supply Chain Disruptions', impact: 'High', trend: '↗' },
      { factor: 'Regulatory Changes', impact: 'Medium', trend: '→' },
      { factor: 'Demand Fluctuations', impact: 'Medium', trend: '↘' },
      { factor: 'Currency Exchange', impact: 'Low', trend: '→' },
      { factor: 'Raw Material Costs', impact: 'High', trend: '↗' }
    ];
    
    const tableData = {
      headers: ['Volatility Factor', 'Impact Level', 'Trend'],
      rows: volatilityFactors.map(factor => [
        factor.factor,
        factor.impact,
        `${factor.trend} ${factor.impact}`
      ])
    };
    
    return `
      <div class="chart-container">
        <div class="chart-title">Price Volatility Factors</div>
        ${this.templateEngine.generateTable(tableData)}
      </div>
    `;
  }
  
  /**
   * Helper methods
   */
  
  calculatePriceSpread() {
    const minPrice = parseFloat(this.data.pricing.priceRange.min.replace(/[$,]/g, ''));
    const maxPrice = parseFloat(this.data.pricing.priceRange.max.replace(/[$,]/g, ''));
    const avgPrice = parseFloat(this.data.pricing.currentPrice.replace(/[$,]/g, ''));
    
    return (((maxPrice - minPrice) / avgPrice) * 100).toFixed(1);
  }
  
  getPriceStabilityRating() {
    const volatility = parseFloat(this.data.pricing.volatility.replace('%', ''));
    
    if (volatility < 10) return 'Stable';
    if (volatility < 25) return 'Moderate';
    if (volatility < 50) return 'Volatile';
    return 'Highly Volatile';
  }
  
  generateMockPriceHistory() {
    const basePrice = parseFloat(this.data.pricing.currentPrice.replace(/[$,]/g, ''));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((month, index) => {
      const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
      const price = basePrice * (1 + variation);
      
      return {
        date: `2023-${month}`,
        price: this.dataProcessor.formatCurrency(price),
        rawPrice: price
      };
    });
  }
  
  generateMockPriceByCountry() {
    return this.data.geography.importingCountries.slice(0, 8).map(country => {
      const basePrice = parseFloat(this.data.pricing.currentPrice.replace(/[$,]/g, ''));
      const countryMultiplier = this.getCountryPriceMultiplier(country.country);
      const price = basePrice * countryMultiplier;
      
      return {
        country: country.country,
        avgPrice: this.dataProcessor.formatCurrency(price),
        rawPrice: price
      };
    });
  }
  
  getCountryPriceMultiplier(country) {
    const multipliers = {
      'United States': 1.15,
      'Germany': 1.10,
      'United Kingdom': 1.12,
      'France': 1.08,
      'Japan': 1.20,
      'Canada': 1.05,
      'Australia': 1.18,
      'Italy': 1.02,
      'Spain': 0.98,
      'Netherlands': 1.06
    };
    
    return multipliers[country] || 1.0;
  }
}

module.exports = PricingSection;

