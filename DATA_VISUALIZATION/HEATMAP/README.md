# Global Temperature Heatmap

An interactive D3.js heatmap visualization displaying monthly global land-surface temperature anomalies from 1753-2015, revealing climate patterns and temperature variations over time.

## 🌟 [Live Demo](d3-heatmap-five.vercel.app)

## ✨ Key Features

- **Interactive Temperature Cells**: Hover over any month-year cell to view exact temperature and variance data
- **Color-Coded Temperature Scale**: Sequential color mapping from blue (cool) to red (warm) temperatures
- **Comprehensive Time Range**: Displays 262+ years of historical temperature data (1753-2015)
- **Responsive Legend**: Dynamic temperature scale with precise threshold indicators

## 🛠️ Tech Stack

- **D3.js v7** - Data binding, scales, and SVG manipulation
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Poppins font and flexbox layout
- **JavaScript ES6+** - Async data fetching and interactive functionality

## 🚀 Quick Start

```bash
git clone https://github.com/jesslyntrixie/temperature-heatmap.git
cd temperature-heatmap
# Open index.html in your browser or serve with live server
```

## 💡 Implementation Overview

This heatmap leverages D3.js scaleBand for precise cell positioning and scaleSequential with interpolateRdYlBu for intuitive temperature color mapping. The visualization processes over 3,000 monthly temperature variance records, combining them with the base temperature (8.66°C) to display actual temperatures. Interactive tooltips provide detailed information while a threshold-based legend ensures accurate data interpretation across the temperature spectrum.

## 📚 Learning Outcomes

- **Advanced D3.js Patterns**: Mastered scale composition, data binding, and complex SVG layouts
- **Color Theory Application**: Implemented sequential color scales with appropriate temperature mapping
- **Data Processing Techniques**: Efficiently handled large datasets with filtering and statistical calculations
- **Interactive Visualization Design**: Created responsive hover states and informative tooltip systems

## 🏆 freeCodeCamp Certification

This project fulfills the **Heat Map** requirement for the [Data Visualization Certification](https://www.freecodecamp.org/certification/jesslyntrixie/data-visualization). Part of a comprehensive curriculum covering D3.js, JSON APIs, and advanced data visualization techniques.

## 📁 Project Structure

```
├── index.html      # Main HTML structure and D3.js integration
├── index.css       # Styling with modern CSS features
├── index.js        # Core visualization logic and interactivity
└── README.md       # Project documentation
```

---

Portfolio piece by [@jesslyntrixie](https://github.com/jesslyntrixie)