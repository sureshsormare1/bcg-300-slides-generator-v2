/**
 * Chart Generator - BCG-Level Data Visualizations
 * 
 * This module generates professional charts and visualizations including
 * Sankey diagrams, bar charts, pie charts, and other BCG-level graphics.
 */

class ChartGenerator {
  constructor() {
    this.bcgColors = [
      '#003366', // BCG Navy
      '#0066CC', // BCG Blue
      '#FF6B35', // BCG Orange
      '#4D9DE0', // Light Blue
      '#E15241', // Red
      '#7E909A', // Gray
      '#28a745', // Green
      '#ffc107', // Yellow
      '#6f42c1', // Purple
      '#fd7e14'  // Orange variant
    ];
  }
  
  /**
   * Generate market share bar chart
   */
  generateMarketShareChart(data, options = {}) {
    const { title = 'Market Share Analysis', width = 400, height = 300 } = options;
    
    const maxValue = Math.max(...data.map(item => item.share));
    const barHeight = 30;
    const barSpacing = 10;
    const chartHeight = data.length * (barHeight + barSpacing);
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="display: flex; height: ${chartHeight}px; align-items: flex-end; margin: 20px 0;">
    `;
    
    data.forEach((item, index) => {
      const barWidth = (item.share / maxValue) * width;
      const color = this.bcgColors[index % this.bcgColors.length];
      
      html += `
        <div style="
          width: ${barWidth}px;
          height: ${barHeight}px;
          background-color: ${color};
          margin-right: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: ${barSpacing}px;
        ">
          ${item.share}%
        </div>
      `;
    });
    
    html += `
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        ${this.generateChartLegend(data)}
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate pie chart
   */
  generatePieChart(data, options = {}) {
    const { title = 'Distribution Analysis', size = 200 } = options;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="display: flex; justify-content: center; align-items: center; margin: 20px 0;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    `;
    
    let currentAngle = 0;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    
    data.forEach((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const color = this.bcgColors[index % this.bcgColors.length];
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      html += `
        <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
              fill="${color}" stroke="white" stroke-width="2"/>
      `;
      
      currentAngle += angle;
    });
    
    html += `
        </svg>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        ${this.generateChartLegend(data)}
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate Sankey diagram
   */
  generateSankeyDiagram(data, options = {}) {
    const { title = 'Trade Flow Analysis', width = 600, height = 400 } = options;
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="position: relative; width: ${width}px; height: ${height}px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    `;
    
    // Generate source nodes (left side)
    const sourceHeight = height / data.sources.length;
    data.sources.forEach((source, index) => {
      const y = index * sourceHeight + sourceHeight / 2;
      html += `
        <div style="
          position: absolute;
          left: 20px;
          top: ${y - 15}px;
          width: 120px;
          height: 30px;
          background-color: ${this.bcgColors[index % this.bcgColors.length]};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          border-radius: 4px;
        ">
          ${source.name}
        </div>
      `;
    });
    
    // Generate target nodes (right side)
    const targetHeight = height / data.targets.length;
    data.targets.forEach((target, index) => {
      const y = index * targetHeight + targetHeight / 2;
      html += `
        <div style="
          position: absolute;
          right: 20px;
          top: ${y - 15}px;
          width: 120px;
          height: 30px;
          background-color: ${this.bcgColors[(index + data.sources.length) % this.bcgColors.length]};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          border-radius: 4px;
        ">
          ${target.name}
        </div>
      `;
    });
    
    // Generate flows (simplified representation)
    data.flows.forEach((flow, index) => {
      const sourceIndex = data.sources.findIndex(s => s.id === flow.source);
      const targetIndex = data.targets.findIndex(t => t.id === flow.target);
      
      if (sourceIndex !== -1 && targetIndex !== -1) {
        const sourceY = sourceIndex * sourceHeight + sourceHeight / 2;
        const targetY = targetIndex * targetHeight + targetHeight / 2;
        const flowWidth = Math.max(2, (flow.value / data.maxFlow) * 20);
        
        html += `
          <div style="
            position: absolute;
            left: 140px;
            top: ${Math.min(sourceY, targetY)}px;
            width: ${width - 280}px;
            height: ${Math.abs(targetY - sourceY) + flowWidth}px;
            background: linear-gradient(90deg, 
              ${this.bcgColors[sourceIndex % this.bcgColors.length]}33 0%, 
              ${this.bcgColors[(targetIndex + data.sources.length) % this.bcgColors.length]}33 100%);
            border-radius: 4px;
            opacity: 0.7;
          "></div>
        `;
      }
    });
    
    html += `
      </div>
      <div style="text-align: center; margin-top: 10px; font-size: 12px; color: #666;">
        Flow thickness represents trade volume
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate horizontal bar chart
   */
  generateHorizontalBarChart(data, options = {}) {
    const { title = 'Analysis', width = 400, height = 300 } = options;
    
    const maxValue = Math.max(...data.map(item => item.value));
    const barHeight = 25;
    const barSpacing = 5;
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="margin: 20px 0;">
    `;
    
    data.forEach((item, index) => {
      const barWidth = (item.value / maxValue) * width;
      const color = this.bcgColors[index % this.bcgColors.length];
      
      html += `
        <div style="display: flex; align-items: center; margin-bottom: ${barSpacing}px;">
          <div style="width: 100px; font-size: 12px; text-align: right; margin-right: 10px;">
            ${item.name}
          </div>
          <div style="
            width: ${barWidth}px;
            height: ${barHeight}px;
            background-color: ${color};
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 8px;
            color: white;
            font-size: 11px;
            font-weight: bold;
          ">
            ${item.value}
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate line chart for trends
   */
  generateLineChart(data, options = {}) {
    const { title = 'Trend Analysis', width = 500, height = 300 } = options;
    
    const minValue = Math.min(...data.map(item => item.value));
    const maxValue = Math.max(...data.map(item => item.value));
    const valueRange = maxValue - minValue;
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="margin: 20px 0;">
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          <!-- Grid lines -->
          <defs>
            <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <!-- Data line -->
          <polyline
            fill="none"
            stroke="${this.bcgColors[1]}"
            stroke-width="3"
            points="
    `;
    
    data.forEach((item, index) => {
      const x = (index / (data.length - 1)) * (width - 40) + 20;
      const y = height - 20 - ((item.value - minValue) / valueRange) * (height - 40);
      html += `${x},${y} `;
    });
    
    html += `"
          />
          
          <!-- Data points -->
    `;
    
    data.forEach((item, index) => {
      const x = (index / (data.length - 1)) * (width - 40) + 20;
      const y = height - 20 - ((item.value - minValue) / valueRange) * (height - 40);
      
      html += `
        <circle cx="${x}" cy="${y}" r="4" fill="${this.bcgColors[0]}" stroke="white" stroke-width="2"/>
      `;
    });
    
    html += `
        </svg>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-top: 10px;">
    `;
    
    data.forEach((item, index) => {
      if (index % Math.ceil(data.length / 6) === 0) {
        html += `<span>${item.label}</span>`;
      }
    });
    
    html += `
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate chart legend
   */
  generateChartLegend(data) {
    let html = '<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">';
    
    data.forEach((item, index) => {
      const color = this.bcgColors[index % this.bcgColors.length];
      html += `
        <div style="display: flex; align-items: center; font-size: 12px;">
          <div style="
            width: 12px;
            height: 12px;
            background-color: ${color};
            margin-right: 5px;
            border-radius: 2px;
          "></div>
          <span>${item.name || item.country} (${item.share || item.percentage}%)</span>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Generate KPI visualization
   */
  generateKPIVisualization(kpiData) {
    let html = '<div class="kpi-container">';
    
    kpiData.forEach(kpi => {
      const trendClass = kpi.trend.includes('↗') ? 'trend-up' : 
                        kpi.trend.includes('↘') ? 'trend-down' : '';
      
      html += `
        <div class="kpi-card">
          <div class="kpi-title">${kpi.title}</div>
          <div class="kpi-value">${kpi.value}</div>
          <div class="kpi-trend ${trendClass}">${kpi.trend}</div>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Generate geographic distribution map (simplified)
   */
  generateGeographicMap(data, options = {}) {
    const { title = 'Geographic Distribution' } = options;
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
    `;
    
    data.forEach((country, index) => {
      const color = this.bcgColors[index % this.bcgColors.length];
      const intensity = country.value / Math.max(...data.map(c => c.value));
      
      html += `
        <div style="
          background-color: ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')};
          border: 2px solid ${color};
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          color: ${intensity > 0.5 ? 'white' : '#333'};
        ">
          <div style="font-weight: bold; margin-bottom: 5px;">${country.country}</div>
          <div style="font-size: 18px; font-weight: bold;">${country.formattedValue}</div>
          <div style="font-size: 12px;">${country.share}% of total</div>
        </div>
      `;
    });
    
    html += `
      </div>
    </div>
    `;
    
    return html;
  }
  
  /**
   * Generate comparison chart
   */
  generateComparisonChart(data, options = {}) {
    const { title = 'Comparison Analysis', categories = [] } = options;
    
    let html = `
    <div class="chart-container">
      <div class="chart-title">${title}</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              ${categories.map(cat => `<th>${cat}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
    `;
    
    data.forEach((item, index) => {
      html += `
        <tr>
          <td style="font-weight: bold; color: ${this.bcgColors[0]};">${index + 1}</td>
          <td style="font-weight: bold;">${item.name}</td>
          ${categories.map(cat => `<td>${item[cat] || 'N/A'}</td>`).join('')}
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
      </div>
    </div>
    `;
    
    return html;
  }
}

module.exports = ChartGenerator;

