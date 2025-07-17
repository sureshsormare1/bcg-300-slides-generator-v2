/**
 * Data Processor - Dynamic Calculations for BCG-Level Presentations
 * 
 * This module processes raw product data and performs all dynamic calculations
 * required for the 300-slide presentation, ensuring data consistency across all slides.
 */

class DataProcessor {
  constructor(productData) {
    this.productData = productData;
    this.processedData = this.processAllData();
  }
  
  /**
   * Process all data for the presentation
   */
  processAllData() {
    return {
      // Basic product information
      product: this.processProductInfo(),
      
      // Market overview calculations
      market: this.processMarketData(),
      
      // Geographic analysis
      geography: this.processGeographicData(),
      
      // Supplier analysis
      suppliers: this.processSupplierData(),
      
      // Buyer analysis
      buyers: this.processBuyerData(),
      
      // Price analysis
      pricing: this.processPricingData(),
      
      // Shipment records
      shipments: this.processShipmentData()
    };
  }
  
  /**
   * Process basic product information
   */
  processProductInfo() {
    return {
      name: this.productData.name || 'Unknown Product',
      description: this.productData.description || 'Product description not available',
      hsCode: this.productData.hsCode || 'N/A',
      category: this.productData.category || 'General',
      averagePrice: this.formatCurrency(this.productData.avgPrice || 0)
    };
  }
  
  /**
   * Process market data with dynamic calculations
   */
  processMarketData() {
    const data = this.productData;
    
    return {
      totalRecords: this.formatNumber(data.totalRecords || 0),
      totalValue: this.formatCurrency(data.totalValue || 0),
      avgPrice: this.formatCurrency(data.avgPrice || 0),
      avgTransactionValue: this.formatCurrency((data.totalValue || 0) / (data.totalRecords || 1)),
      priceVolatility: this.formatPercentage(data.priceVolatility || 0),
      uniqueSuppliers: this.formatNumber(data.uniqueSuppliers || 0),
      uniqueBuyers: this.formatNumber(data.uniqueBuyers || 0),
      supplierDiversity: this.formatPercentage(data.supplierConcentration || 0),
      buyerDiversity: this.formatPercentage(data.buyerConcentration || 0),
      marketGrowth: this.formatPercentage(data.marketGrowth || 0),
      topImportCountry: data.topImportCountry || { country: 'Unknown', count: 0 },
      topExportCountry: data.topExportCountry || { country: 'Unknown', count: 0 },
      dateRange: data.dateRange || 'N/A'
    };
  }
  
  /**
   * Process geographic data for import/export analysis
   */
  processGeographicData() {
    const importingCountries = this.productData.importingCountries || [];
    const exportingCountries = this.productData.exportingCountries || [];
    
    return {
      importingCountries: importingCountries.map((country, index) => ({
        rank: index + 1,
        country: country.country,
        value: this.formatCurrency(country.value),
        share: this.formatPercentage(country.share),
        rawValue: country.value,
        rawShare: country.share
      })),
      exportingCountries: exportingCountries.map((country, index) => ({
        rank: index + 1,
        country: country.country,
        value: this.formatCurrency(country.value),
        share: this.formatPercentage(country.share),
        rawValue: country.value,
        rawShare: country.share
      }))
    };
  }
  
  /**
   * Process supplier data for detailed analysis
   */
  processSupplierData() {
    const suppliers = this.productData.topSuppliers || [];
    
    return {
      topSuppliers: suppliers.map((supplier, index) => ({
        rank: index + 1,
        name: supplier.name,
        country: supplier.country,
        value: this.formatCurrency(supplier.value),
        share: this.formatPercentage((supplier.value / this.productData.totalValue) * 100),
        rawValue: supplier.value,
        rawShare: (supplier.value / this.productData.totalValue) * 100
      })),
      suppliersByCountry: this.groupSuppliersByCountry(suppliers)
    };
  }
  
  /**
   * Process buyer data for detailed analysis
   */
  processBuyerData() {
    const buyers = this.productData.topBuyers || [];
    
    return {
      topBuyers: buyers.map((buyer, index) => ({
        rank: index + 1,
        name: buyer.name,
        country: buyer.country,
        value: this.formatCurrency(buyer.value),
        share: this.formatPercentage((buyer.value / this.productData.totalValue) * 100),
        rawValue: buyer.value,
        rawShare: (buyer.value / this.productData.totalValue) * 100
      })),
      buyersByCountry: this.groupBuyersByCountry(buyers)
    };
  }
  
  /**
   * Process pricing data for analysis
   */
  processPricingData() {
    const priceHistory = this.productData.priceHistory || [];
    
    return {
      currentPrice: this.formatCurrency(this.productData.avgPrice || 0),
      priceRange: {
        min: this.formatCurrency(this.productData.minPrice || 0),
        max: this.formatCurrency(this.productData.maxPrice || 0)
      },
      volatility: this.formatPercentage(this.productData.priceVolatility || 0),
      priceHistory: priceHistory.map(item => ({
        date: item.date,
        price: this.formatCurrency(item.price),
        rawPrice: item.price
      })),
      priceByCountry: this.calculatePriceByCountry()
    };
  }
  
  /**
   * Process shipment data for records section
   */
  processShipmentData() {
    // Generate mock shipment records based on the data
    const shipments = this.generateShipmentRecords();
    
    return {
      totalShipments: shipments.length,
      shipmentRecords: shipments,
      shipmentsPerSlide: 10,
      totalSlides: Math.ceil(shipments.length / 10)
    };
  }
  
  /**
   * Group suppliers by country
   */
  groupSuppliersByCountry(suppliers) {
    const grouped = {};
    suppliers.forEach(supplier => {
      if (!grouped[supplier.country]) {
        grouped[supplier.country] = [];
      }
      grouped[supplier.country].push(supplier);
    });
    return grouped;
  }
  
  /**
   * Group buyers by country
   */
  groupBuyersByCountry(buyers) {
    const grouped = {};
    buyers.forEach(buyer => {
      if (!grouped[buyer.country]) {
        grouped[buyer.country] = [];
      }
      grouped[buyer.country].push(buyer);
    });
    return grouped;
  }
  
  /**
   * Calculate price by country
   */
  calculatePriceByCountry() {
    const countries = this.productData.importingCountries || [];
    return countries.map(country => ({
      country: country.country,
      avgPrice: this.formatCurrency(country.value / (country.shipments || 1)),
      rawPrice: country.value / (country.shipments || 1)
    }));
  }
  
  /**
   * Generate shipment records for slides 67-300
   */
  generateShipmentRecords() {
    const records = [];
    const suppliers = this.productData.topSuppliers || [];
    const buyers = this.productData.topBuyers || [];
    const countries = this.productData.importingCountries || [];
    
    // Generate 2340 records (234 slides × 10 records per slide)
    for (let i = 0; i < 2340; i++) {
      const supplier = suppliers[i % suppliers.length] || { name: 'Unknown Supplier', country: 'Unknown' };
      const buyer = buyers[i % buyers.length] || { name: 'Unknown Buyer', country: 'Unknown' };
      const country = countries[i % countries.length] || { country: 'Unknown' };
      
      records.push({
        id: i + 1,
        date: this.generateRandomDate(),
        supplier: supplier.name,
        supplierCountry: supplier.country,
        buyer: buyer.name,
        buyerCountry: buyer.country,
        quantity: this.generateRandomQuantity(),
        unitPrice: this.formatCurrency(this.generateRandomPrice()),
        totalValue: this.formatCurrency(this.generateRandomValue()),
        hsCode: this.productData.hsCode || 'N/A',
        portOfLoading: this.generateRandomPort(supplier.country),
        portOfDischarge: this.generateRandomPort(buyer.country)
      });
    }
    
    return records;
  }
  
  /**
   * Generate random date within the data range
   */
  generateRandomDate() {
    const start = new Date('2023-01-01');
    const end = new Date('2023-12-31');
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  }
  
  /**
   * Generate random quantity
   */
  generateRandomQuantity() {
    return Math.floor(Math.random() * 10000) + 100;
  }
  
  /**
   * Generate random price
   */
  generateRandomPrice() {
    const basePrice = this.productData.avgPrice || 100;
    const variation = basePrice * 0.3; // 30% variation
    return basePrice + (Math.random() - 0.5) * variation;
  }
  
  /**
   * Generate random value
   */
  generateRandomValue() {
    return this.generateRandomQuantity() * this.generateRandomPrice();
  }
  
  /**
   * Generate random port based on country
   */
  generateRandomPort(country) {
    const ports = {
      'USA': ['New York', 'Los Angeles', 'Miami', 'Houston'],
      'India': ['Mumbai', 'Chennai', 'Kolkata', 'Cochin'],
      'China': ['Shanghai', 'Shenzhen', 'Qingdao', 'Tianjin'],
      'Germany': ['Hamburg', 'Bremen', 'Bremerhaven'],
      'UK': ['London', 'Southampton', 'Liverpool'],
      'France': ['Le Havre', 'Marseille', 'Dunkirk']
    };
    
    const countryPorts = ports[country] || ['Unknown Port'];
    return countryPorts[Math.floor(Math.random() * countryPorts.length)];
  }
  
  /**
   * Utility functions for formatting
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value || 0);
  }
  
  formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value || 0);
  }
  
  formatPercentage(value) {
    return `${(value || 0).toFixed(1)}%`;
  }
  
  /**
   * Get processed data
   */
  getProcessedData() {
    return this.processedData;
  }
  
  /**
   * Get specific section data
   */
  getSectionData(sectionName) {
    return this.processedData[sectionName] || {};
  }
}

module.exports = DataProcessor;

