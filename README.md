# AeroPulse India — Kaggle Air Quality & CPCB NAQI Intelligence Dashboard

A comprehensive, glassmorphic environmental intelligence dashboard powered by **Kaggle's "Air Quality Data in India" (2015–2020)** dataset from the **Central Pollution Control Board (CPCB)**.

![AeroPulse India](https://img.shields.io/badge/AeroPulse-CPCB%20NAQI%20India-10b981?style=for-the-badge)
![Dataset](https://img.shields.io/badge/Kaggle-Air%20Quality%20Data%20in%20India-06b6d4?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20ES6-6366f1?style=for-the-badge)

---

## 📊 Dataset Integration: Kaggle & CPCB

This project is tailored around the official schema of the famous Kaggle dataset:
**[Air Quality Data in India (2015–2020)](https://www.kaggle.com/datasets/rohanrao/air-quality-data-in-india)**

### Supported Columns & Parameters:
- `City`: Delhi, Bengaluru, Chennai, Mumbai, Kolkata, Hyderabad, Ahmedabad, Lucknow, etc.
- `Date`: Multi-year daily and seasonal trends.
- `PM2.5` & `PM10`: Micrograms per cubic meter (µg/m³).
- `NO2`, `SO2`, `NH3`, `O3`, `Benzene`: Criteria gaseous pollutants.
- `CO`: Milligrams per cubic meter (mg/m³).
- `AQI` & `AQI_Bucket`: Official 6-tier Indian CPCB National Air Quality Index.

---

## 🇮🇳 Official Indian CPCB NAQI Scale

| AQI Band | CPCB Category | Associated Health Impacts | Color Code |
| :---: | :---: | :--- | :---: |
| **0 – 50** | **Good** | Minimal impact | `#10b981` Emerald |
| **51 – 100** | **Satisfactory** | Minor breathing discomfort to sensitive people | `#84cc16` Lime |
| **101 – 200** | **Moderate** | Breathing discomfort to the people with lungs, asthma and heart diseases | `#f59e0b` Amber |
| **201 – 300** | **Poor** | Breathing discomfort to most people on prolonged exposure | `#f97316` Orange |
| **301 – 400** | **Very Poor** | Respiratory illness on prolonged exposure | `#ef4444` Crimson |
| **401 – 500+** | **Severe** | Affects healthy people and seriously impacts those with existing diseases | `#7f1d1d` Maroon |

---

## 🌟 Key Features

1. **Client-Side Kaggle CSV Streaming Parser**:
   - Drag & drop or upload any `city_day.csv` or `station_day.csv` file directly into the browser.
   - Automatically parses headers, indexes records by city, and populates interactive time-series charts with zero server processing required.
   - Includes a 1-click **"Load Sample CPCB CSV"** button pre-populated with verified 2020 data.

2. **Hardware-Accelerated Bezier Spline Chart**:
   - Smooth Canvas-rendered curves with gradient area fills.
   - Interactive mouse scrubber crosshair with floating glassmorphic tooltip.
   - Timeframes: **24 Hours**, **30 Days**, and **1 Year (Kaggle Seasonal Trajectory)**.

3. **Multi-City Comparison Hub**:
   - Quick switching across **Delhi, Bengaluru, Chennai, Mumbai, Kolkata, Hyderabad, Ahmedabad, and Lucknow**.
   - Displays real-time NAAQS standard compliance and meteorological dispersion conditions.

4. **Predictive AI & Diurnal Smog Cycle Forecast**:
   - Analyzes peak rush-hour vehicular emissions (08:00–10:00 & 18:00–21:00).
   - Simulates winter thermal inversion spikes vs. monsoon wet deposition wash.

5. **Audio Synthesizer & CPCB Warning Thresholds**:
   - Customizable warning triggers for PM2.5, PM10, and AQI limits.
   - Synthesizes notification alerts via the Web Audio API.
   - Full CSV export button for telemetry records.

---

## 🚀 How to Run

### Direct Browser Access:
Simply open [`index.html`](file:///c:/Users/dell/Downloads/campus-shield/air-quality-dashboard/index.html) in your browser.

### Local Python Server:
Run the following in PowerShell / terminal:
```bash
python -m http.server 3000 --directory "c:\Users\dell\Downloads\campus-shield\air-quality-dashboard"
```
Then navigate to `http://localhost:3000`.

---

## 📁 Repository Structure

```
air-quality-dashboard/
├── index.html            # Semantic CPCB dashboard with SVG gauge and metric cards
├── styles.css            # Dark/light themes, glassmorphism, CPCB NAQI color palette
├── app.js                # Kaggle CSV parser, spline canvas engine, live simulation
├── sample_city_day.csv   # Bundled sample Kaggle CPCB dataset for instant demonstration
└── README.md             # Project documentation and Kaggle mapping reference
```
