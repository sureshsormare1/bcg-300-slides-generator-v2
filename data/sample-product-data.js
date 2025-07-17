/**
 * Sample Product Data for BCG-Level 300-Slide Presentation
 * 
 * This data structure matches the format expected by the DataProcessor
 * and provides realistic market intelligence data for testing.
 */

module.exports = {
  // Basic product information
  name: "Paclitaxel",
  description: "Paclitaxel is a chemotherapy medication used to treat several types of cancer including ovarian cancer, breast cancer, lung cancer, Kaposi sarcoma, cervical cancer, and pancreatic cancer. It is given by injection into a vein.",
  hsCode: "2932999090",
  category: "Pharmaceutical Active Ingredient",
  
  // Market overview data
  totalRecords: 28456,
  totalValue: 1245800000,
  avgPrice: 43750.52,
  priceVolatility: 187.3,
  uniqueSuppliers: 87,
  uniqueBuyers: 142,
  marketGrowth: 12.5,
  supplierConcentration: 0.3,
  buyerConcentration: 0.4,
  minPrice: 32580.75,
  maxPrice: 61250.30,
  dateRange: "Jan 2023 - Dec 2023",
  
  // Top import and export countries
  topImportCountry: {
    country: "United States",
    count: 5872
  },
  topExportCountry: {
    country: "India",
    count: 6543
  },
  
  // Top suppliers data
  topSuppliers: [
    { name: "Bristol-Myers Squibb", country: "USA", value: 245000000 },
    { name: "Pfizer Inc", country: "USA", value: 187000000 },
    { name: "Cipla Ltd", country: "India", value: 156000000 },
    { name: "Teva Pharmaceutical", country: "Israel", value: 132000000 },
    { name: "Sun Pharmaceutical", country: "India", value: 118000000 },
    { name: "Fresenius Kabi", country: "Germany", value: 98000000 },
    { name: "Mylan Pharmaceuticals", country: "USA", value: 87000000 },
    { name: "Dr. Reddy's Laboratories", country: "India", value: 76000000 },
    { name: "Hospira", country: "USA", value: 65000000 },
    { name: "Sanofi", country: "France", value: 54000000 },
    { name: "Novartis", country: "Switzerland", value: 48000000 },
    { name: "Roche", country: "Switzerland", value: 42000000 },
    { name: "AstraZeneca", country: "UK", value: 38000000 },
    { name: "Johnson & Johnson", country: "USA", value: 35000000 },
    { name: "Merck & Co", country: "USA", value: 32000000 }
  ],
  
  // Top buyers data
  topBuyers: [
    { name: "Memorial Sloan Kettering", country: "USA", value: 187000000 },
    { name: "Mayo Clinic", country: "USA", value: 165000000 },
    { name: "NHS England", country: "UK", value: 143000000 },
    { name: "MD Anderson Cancer Center", country: "USA", value: 132000000 },
    { name: "Charité - Universitätsmedizin Berlin", country: "Germany", value: 112000000 },
    { name: "Institut Gustave Roussy", country: "France", value: 98000000 },
    { name: "University Health Network", country: "Canada", value: 87000000 },
    { name: "Apollo Hospitals", country: "India", value: 76000000 },
    { name: "National Cancer Center Japan", country: "Japan", value: 65000000 },
    { name: "Peter MacCallum Cancer Centre", country: "Australia", value: 54000000 },
    { name: "European Medicines Agency", country: "Netherlands", value: 48000000 },
    { name: "Kaiser Permanente", country: "USA", value: 42000000 },
    { name: "Cleveland Clinic", country: "USA", value: 38000000 },
    { name: "Johns Hopkins Hospital", country: "USA", value: 35000000 },
    { name: "Massachusetts General Hospital", country: "USA", value: 32000000 }
  ],
  
  // Importing countries data
  importingCountries: [
    { country: "United States", value: 325000000, share: 26.1, shipments: 5872 },
    { country: "Germany", value: 187000000, share: 15.0, shipments: 3245 },
    { country: "United Kingdom", value: 156000000, share: 12.5, shipments: 2876 },
    { country: "France", value: 132000000, share: 10.6, shipments: 2543 },
    { country: "Japan", value: 118000000, share: 9.5, shipments: 2187 },
    { country: "Canada", value: 98000000, share: 7.9, shipments: 1876 },
    { country: "Australia", value: 87000000, share: 7.0, shipments: 1654 },
    { country: "Italy", value: 76000000, share: 6.1, shipments: 1432 },
    { country: "Spain", value: 65000000, share: 5.2, shipments: 1234 },
    { country: "Netherlands", value: 54000000, share: 4.3, shipments: 1098 }
  ],
  
  // Exporting countries data
  exportingCountries: [
    { country: "India", value: 365000000, share: 29.3, shipments: 6543 },
    { country: "United States", value: 287000000, share: 23.0, shipments: 5234 },
    { country: "Israel", value: 176000000, share: 14.1, shipments: 3187 },
    { country: "China", value: 142000000, share: 11.4, shipments: 2654 },
    { country: "Germany", value: 98000000, share: 7.9, shipments: 1876 },
    { country: "France", value: 87000000, share: 7.0, shipments: 1654 },
    { country: "Italy", value: 56000000, share: 4.5, shipments: 1098 },
    { country: "Switzerland", value: 34000000, share: 2.7, shipments: 876 },
    { country: "Belgium", value: 28000000, share: 2.2, shipments: 654 },
    { country: "Netherlands", value: 22000000, share: 1.8, shipments: 543 },
    { country: "United Kingdom", value: 18000000, share: 1.4, shipments: 432 },
    { country: "Spain", value: 15000000, share: 1.2, shipments: 321 }
  ],
  
  // Price history data
  priceHistory: [
    { date: "2023-01", price: 41250.75 },
    { date: "2023-02", price: 41875.30 },
    { date: "2023-03", price: 42350.45 },
    { date: "2023-04", price: 42780.20 },
    { date: "2023-05", price: 43125.80 },
    { date: "2023-06", price: 43580.25 },
    { date: "2023-07", price: 44120.60 },
    { date: "2023-08", price: 44350.75 },
    { date: "2023-09", price: 44180.30 },
    { date: "2023-10", price: 43950.45 },
    { date: "2023-11", price: 43820.10 },
    { date: "2023-12", price: 43750.52 }
  ],
  
  // Volume history data
  volumeHistory: [
    { date: "2023-01", volume: 2250000 },
    { date: "2023-02", volume: 2320000 },
    { date: "2023-03", volume: 2380000 },
    { date: "2023-04", volume: 2350000 },
    { date: "2023-05", volume: 2420000 },
    { date: "2023-06", volume: 2480000 },
    { date: "2023-07", volume: 2520000 },
    { date: "2023-08", volume: 2490000 },
    { date: "2023-09", volume: 2450000 },
    { date: "2023-10", volume: 2380000 },
    { date: "2023-11", volume: 2320000 },
    { date: "2023-12", volume: 2350000 }
  ]
};

