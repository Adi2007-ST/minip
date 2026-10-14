/**
 * AeroPulse India — Kaggle Air Quality & CPCB NAQI Intelligence Engine
 * Features:
 * - Central Pollution Control Board (CPCB) National AQI (NAQI) Breakpoints
 * - Metropolitan India Profiles (Delhi, Bengaluru, Chennai, Mumbai, etc.)
 * - Client-Side Kaggle city_day.csv / station_day.csv Streaming Parser
 * - Hardware-accelerated Bezier Spline Canvas Visualizer
 * - Realtime Simulation Engine & Audio Synthesizer
 */

// ============================================================================
// 1. CPCB Standards & Indian City Telemetry
// ============================================================================

const INDIAN_CITIES = {
  delhi: {
    id: "DL-CPCB",
    name: "Delhi (NCR)",
    region: "Northern Gangetic Plains",
    baseAqi: 285,
    basePm25: 142.0,
    basePm10: 248.5,
    baseNo2: 58.2,
    baseSo2: 16.4,
    baseCo: 1.85,
    baseO3: 32.1,
    baseNh3: 42.6,
    baseBenzene: 4.8,
    tempC: 29.4,
    humidity: 54,
    windSpeed: 6.8,
    windDir: "NW (310°)",
    uv: 5.4,
    pressure: 1011,
    condition: "Hazy Sunshine",
    conditionSub: "Inversion layer stagnation",
    annualPeak: 428,
    monsoonLow: 52
  },
  bengaluru: {
    id: "KA-CPCB",
    name: "Bengaluru",
    region: "Southern Deccan Plateau",
    baseAqi: 68,
    basePm25: 32.4,
    basePm10: 58.2,
    baseNo2: 24.1,
    baseSo2: 7.2,
    baseCo: 0.82,
    baseO3: 38.4,
    baseNh3: 14.8,
    baseBenzene: 1.2,
    tempC: 25.1,
    humidity: 62,
    windSpeed: 11.4,
    windDir: "SW (220°)",
    uv: 6.8,
    pressure: 1014,
    condition: "Partly Cloudy",
    conditionSub: "Active canopy dispersion",
    annualPeak: 122,
    monsoonLow: 34
  },
  chennai: {
    id: "TN-CPCB",
    name: "Chennai",
    region: "Coromandel Coastal Zone",
    baseAqi: 82,
    basePm25: 42.1,
    basePm10: 74.0,
    baseNo2: 21.8,
    baseSo2: 9.8,
    baseCo: 0.76,
    baseO3: 44.2,
    baseNh3: 16.2,
    baseBenzene: 1.4,
    tempC: 31.8,
    humidity: 78,
    windSpeed: 14.2,
    windDir: "ESE (115°)",
    uv: 8.2,
    pressure: 1012,
    condition: "Humid Maritime",
    conditionSub: "Strong sea breeze scrubbing",
    annualPeak: 148,
    monsoonLow: 42
  },
  mumbai: {
    id: "MH-CPCB",
    name: "Mumbai",
    region: "Konkan Coastal Corridor",
    baseAqi: 124,
    basePm25: 64.5,
    basePm10: 112.0,
    baseNo2: 38.4,
    baseSo2: 14.2,
    baseCo: 1.15,
    baseO3: 36.8,
    baseNh3: 22.4,
    baseBenzene: 2.8,
    tempC: 30.2,
    humidity: 74,
    windSpeed: 12.8,
    windDir: "W (270°)",
    uv: 7.0,
    pressure: 1013,
    condition: "Coastal Haze",
    conditionSub: "Moderate marine mixing",
    annualPeak: 235,
    monsoonLow: 38
  },
  kolkata: {
    id: "WB-CPCB",
    name: "Kolkata",
    region: "Lower Gangetic Delta",
    baseAqi: 178,
    basePm25: 88.4,
    basePm10: 148.0,
    baseNo2: 44.5,
    baseSo2: 12.1,
    baseCo: 1.48,
    baseO3: 34.0,
    baseNh3: 31.2,
    baseBenzene: 3.6,
    tempC: 28.6,
    humidity: 72,
    windSpeed: 7.4,
    windDir: "S (180°)",
    uv: 6.2,
    pressure: 1012,
    condition: "Humid Smog",
    conditionSub: "Riverine particulate entrapment",
    annualPeak: 342,
    monsoonLow: 48
  },
  hyderabad: {
    id: "TG-CPCB",
    name: "Hyderabad",
    region: "Telangana Plateau",
    baseAqi: 96,
    basePm25: 46.2,
    basePm10: 84.5,
    baseNo2: 28.2,
    baseSo2: 8.9,
    baseCo: 0.92,
    baseO3: 42.1,
    baseNh3: 18.5,
    baseBenzene: 1.8,
    tempC: 29.0,
    humidity: 58,
    windSpeed: 9.8,
    windDir: "SE (135°)",
    uv: 7.2,
    pressure: 1013,
    condition: "Clear Sky",
    conditionSub: "Good atmospheric ventilation",
    annualPeak: 182,
    monsoonLow: 44
  },
  ahmedabad: {
    id: "GJ-CPCB",
    name: "Ahmedabad",
    region: "Sabarmati Basin & Industrial",
    baseAqi: 210,
    basePm25: 98.2,
    basePm10: 168.0,
    baseNo2: 48.1,
    baseSo2: 28.4,
    baseCo: 1.62,
    baseO3: 49.5,
    baseNh3: 34.0,
    baseBenzene: 3.8,
    tempC: 32.4,
    humidity: 46,
    windSpeed: 8.5,
    windDir: "NW (300°)",
    uv: 7.8,
    pressure: 1011,
    condition: "Industrial Dust",
    conditionSub: "Elevated SO2 & PM loading",
    annualPeak: 318,
    monsoonLow: 62
  },
  lucknow: {
    id: "UP-CPCB",
    name: "Lucknow",
    region: "Central Awadh Basin",
    baseAqi: 245,
    basePm25: 118.0,
    basePm10: 202.4,
    baseNo2: 52.4,
    baseSo2: 15.6,
    baseCo: 1.78,
    baseO3: 31.0,
    baseNh3: 38.2,
    baseBenzene: 4.1,
    tempC: 28.2,
    humidity: 59,
    windSpeed: 5.6,
    windDir: "WNW (290°)",
    uv: 5.8,
    pressure: 1012,
    condition: "Dense Haze",
    conditionSub: "Thermal calm trapping",
    annualPeak: 395,
    monsoonLow: 56
  }
};

// CPCB National Ambient Air Quality Standards (NAAQS) parameters
const POLLUTANT_CONFIG = {
  pm25: {
    name: "PM2.5",
    fullName: "Fine Particulate Matter",
    unit: "µg/m³",
    cpcbLimit: 60, // 24-hour NAAQS
    goodMax: 30,
    satisfactoryMax: 60,
    moderateMax: 90
  },
  pm10: {
    name: "PM10",
    fullName: "Respirable Suspended Particulate",
    unit: "µg/m³",
    cpcbLimit: 100, // 24-hour NAAQS
    goodMax: 50,
    satisfactoryMax: 100,
    moderateMax: 250
  },
  no2: {
    name: "NO2",
    fullName: "Nitrogen Dioxide",
    unit: "µg/m³",
    cpcbLimit: 80, // 24-hour NAAQS
    goodMax: 40,
    satisfactoryMax: 80,
    moderateMax: 180
  },
  so2: {
    name: "SO2",
    fullName: "Sulphur Dioxide",
    unit: "µg/m³",
    cpcbLimit: 80, // 24-hour NAAQS
    goodMax: 40,
    satisfactoryMax: 80,
    moderateMax: 380
  },
  co: {
    name: "CO",
    fullName: "Carbon Monoxide",
    unit: "mg/m³",
    cpcbLimit: 2.0, // 8-hour NAAQS
    goodMax: 1.0,
    satisfactoryMax: 2.0,
    moderateMax: 10.0
  },
  o3: {
    name: "O3",
    fullName: "Ground Ozone",
    unit: "µg/m³",
    cpcbLimit: 100, // 8-hour NAAQS
    goodMax: 50,
    satisfactoryMax: 100,
    moderateMax: 168
  },
  nh3: {
    name: "NH3",
    fullName: "Ammonia",
    unit: "µg/m³",
    cpcbLimit: 400, // 24-hour NAAQS
    goodMax: 200,
    satisfactoryMax: 400,
    moderateMax: 800
  },
  benzene: {
    name: "Benzene",
    fullName: "Volatile Benzene",
    unit: "µg/m³",
    cpcbLimit: 5.0, // Annual NAAQS
    goodMax: 2.0,
    satisfactoryMax: 5.0,
    moderateMax: 10.0
  }
};

// ============================================================================
// 2. Application State
// ============================================================================

const state = {
  currentCity: "delhi",
  activeMetric: "aqi",
  activePeriod: "24h",
  tempUnit: "c",
  isSimulating: true,
  simTimer: null,
  secondsUntilTick: 3,
  theme: localStorage.getItem("aeropulse-theme") || "dark",
  uploadedRecords: null, // Holds Kaggle CSV parsed rows
  thresholds: {
    pm25: 60,
    pm10: 100,
    aqi: 300
  },
  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Delhi NCR Stagnation Alert",
      time: "15m ago",
      text: "Thermal inversion detected; PM2.5 reached 142 µg/m³. GRAP Stage-II anti-dust measures active."
    },
    {
      id: 2,
      type: "normal",
      title: "Bengaluru Garden Corridor Cleared",
      time: "42m ago",
      text: "Afternoon breeze lowered PM10 to 58 µg/m³; AQI categorized as Satisfactory."
    }
  ],
  telemetry: {},
  historicalData: []
};

// ============================================================================
// 3. Audio Notification Feedback (Web Audio API Synthesizer)
// ============================================================================

function playNotificationSound(type = "gentle") {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === "warning") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    }
  } catch {
    // Autoplay policy fallback
  }
}

// ============================================================================
// 4. CPCB NAQI Classification System (6 Official Buckets)
// ============================================================================

function getCpcbAqiDetails(aqi) {
  if (aqi <= 50) {
    return {
      status: "Good",
      color: "var(--cpcb-good)",
      cssClass: "step-good",
      description: "Minimal health impact. Cleanest air quality tier.",
      outdoor: "Ideal for morning yoga, jogging, and athletic activities.",
      ventilation: "Keep windows open for fresh ambient air exchange.",
      sensitive: "Safe for everyone; no respiratory precautions needed.",
      compliance: 96
    };
  } else if (aqi <= 100) {
    return {
      status: "Satisfactory",
      color: "var(--cpcb-satisfactory)",
      cssClass: "step-satisfactory",
      description: "Minor breathing discomfort to sensitive people.",
      outdoor: "Normal outdoor activities are safe for the general public.",
      ventilation: "Standard ventilation suitable throughout the day.",
      sensitive: "Unusually sensitive people should monitor any symptoms.",
      compliance: 86
    };
  } else if (aqi <= 200) {
    return {
      status: "Moderate",
      color: "var(--cpcb-moderate)",
      cssClass: "step-moderate",
      description: "Breathing discomfort to people with asthma and heart diseases.",
      outdoor: "Limit prolonged heavy exertion during peak traffic hours.",
      ventilation: "Close windows facing highways; prefer mechanical air filters.",
      sensitive: "Asthmatic individuals should carry reliever inhalers.",
      compliance: 68
    };
  } else if (aqi <= 300) {
    return {
      status: "Poor",
      color: "var(--cpcb-poor)",
      cssClass: "step-poor",
      description: "Breathing discomfort to most people on prolonged exposure.",
      outdoor: "Avoid intense outdoor workouts, morning jogs, and outdoor sports.",
      ventilation: "Keep windows closed. Run indoor air purifiers.",
      sensitive: "Children and elderly should strictly limit outdoor exposure.",
      compliance: 42
    };
  } else if (aqi <= 400) {
    return {
      status: "Very Poor",
      color: "var(--cpcb-very-poor)",
      cssClass: "step-very-poor",
      description: "Respiratory illness to the people on prolonged exposure.",
      outdoor: "Avoid all non-essential outdoor physical exposure.",
      ventilation: "Operate air cleaners at maximum fan speed.",
      sensitive: "Wear N95/N99 respiratory masks when going outside.",
      compliance: 24
    };
  } else {
    return {
      status: "Severe",
      color: "var(--cpcb-severe)",
      cssClass: "step-severe",
      description: "Affects healthy people and seriously impacts those with existing diseases.",
      outdoor: "Emergency air alert: avoid all outdoor activities.",
      ventilation: "Seal building perimeters with recirculated filtered air.",
      sensitive: "Medical alert: stay strictly indoors in filtered environments.",
      compliance: 8
    };
  }
}

// ============================================================================
// 5. Historical Data Generator & Kaggle Interpolator
// ============================================================================

function initTelemetry() {
  const city = INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi;
  state.telemetry = {
    aqi: city.baseAqi,
    pm25: city.basePm25,
    pm10: city.basePm10,
    no2: city.baseNo2,
    so2: city.baseSo2,
    co: city.baseCo,
    o3: city.baseO3,
    nh3: city.baseNh3,
    benzene: city.baseBenzene,
    tempC: city.tempC,
    humidity: city.humidity,
    windSpeed: city.windSpeed,
    windDir: city.windDir,
    uv: city.uv,
    pressure: city.pressure
  };

  generateHistoricalData();
}

function generateHistoricalData() {
  // If user uploaded a Kaggle CSV file with records for this city, use that real data!
  if (state.uploadedRecords && state.uploadedRecords[state.currentCity]) {
    const records = state.uploadedRecords[state.currentCity];
    state.historicalData = records.slice(Math.max(0, records.length - (state.activePeriod === "24h" ? 24 : state.activePeriod === "30d" ? 30 : 60)));
    return;
  }

  const points = state.activePeriod === "24h" ? 24 : state.activePeriod === "30d" ? 30 : 52;
  const current = state.telemetry;
  const list = [];
  const now = new Date();

  for (let i = points - 1; i >= 0; i--) {
    let timeLabel = "";
    let factor = 1.0;

    if (state.activePeriod === "24h") {
      const d = new Date(now.getTime() - i * 3600 * 1000);
      timeLabel = d.getHours().toString().padStart(2, "0") + ":00";
      // Diurnal rush hours (08:00 - 10:00 & 18:00 - 21:00)
      const hour = d.getHours();
      if ((hour >= 7 && hour <= 10) || (hour >= 18 && hour <= 21)) factor = 1.28;
      else if (hour >= 2 && hour <= 5) factor = 0.78;
      else factor = 1.0;
    } else if (state.activePeriod === "30d") {
      const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
      timeLabel = `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })}`;
      factor = 1 + 0.25 * Math.sin(i / 3.5);
    } else {
      // 1 Year (Kaggle Seasonal Trajectory: Winter peak, Monsoon drop)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthIdx = (now.getMonth() - Math.floor(i / 4.3) + 12) % 12;
      timeLabel = `${months[monthIdx]} W${(i % 4) + 1}`;
      
      // Northern/Central India Seasonal curve: Nov-Jan peak, Jul-Aug dip
      if (monthIdx === 10 || monthIdx === 11 || monthIdx === 0) factor = 1.55; // Nov-Jan Smog
      else if (monthIdx >= 6 && monthIdx <= 8) factor = 0.42; // Monsoon wash
      else if (monthIdx >= 3 && monthIdx <= 4) factor = 1.15; // Summer pre-monsoon dust
      else factor = 0.95;
    }

    const noise = (Math.random() - 0.48) * 0.12;
    const effFactor = Math.max(0.25, factor + noise);

    list.push({
      time: timeLabel,
      aqi: Math.round(Math.max(18, current.aqi * effFactor)),
      pm25: +(current.pm25 * effFactor).toFixed(1),
      pm10: +(current.pm10 * effFactor).toFixed(1),
      no2: +(current.no2 * effFactor).toFixed(1),
      so2: +(current.so2 * effFactor).toFixed(1),
      co: +(current.co * effFactor).toFixed(2),
      o3: +(current.o3 * (2 - effFactor * 0.8)).toFixed(1),
      nh3: +(current.nh3 * effFactor).toFixed(1),
      benzene: +(current.benzene * effFactor).toFixed(1)
    });
  }

  // Anchor current real-time point
  const last = list[list.length - 1];
  last.aqi = Math.round(current.aqi);
  last.pm25 = +current.pm25.toFixed(1);
  last.pm10 = +current.pm10.toFixed(1);
  last.no2 = +current.no2.toFixed(1);
  last.so2 = +current.so2.toFixed(1);
  last.co = +current.co.toFixed(2);
  last.o3 = +current.o3.toFixed(1);
  last.nh3 = +current.nh3.toFixed(1);
  last.benzene = +current.benzene.toFixed(1);

  state.historicalData = list;
}

// ============================================================================
// 6. UI Render Functions
// ============================================================================

function renderOverview() {
  const current = state.telemetry;
  const cpcbInfo = getCpcbAqiDetails(current.aqi);
  const city = INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi;

  // AQI Digital Value
  const aqiEl = document.getElementById("aqi-value");
  if (aqiEl) {
    aqiEl.textContent = Math.round(current.aqi);
    aqiEl.style.color = cpcbInfo.color;
  }

  // AQI Status Badge
  const statusBadge = document.getElementById("aqi-status-badge");
  const statusText = document.getElementById("aqi-status-text");
  if (statusBadge && statusText) {
    statusBadge.style.color = cpcbInfo.color;
    statusBadge.style.borderColor = `${cpcbInfo.color}40`;
    statusBadge.style.backgroundColor = `${cpcbInfo.color}15`;
    statusText.textContent = cpcbInfo.status;
  }

  // Description
  const descEl = document.getElementById("aqi-description-text");
  if (descEl) descEl.textContent = cpcbInfo.description;

  // CPCB Gauge Arc Fill
  const gaugePath = document.getElementById("gauge-fill-path");
  if (gaugePath) {
    const maxAqi = 500;
    const fraction = Math.min(Math.max(current.aqi / maxAqi, 0.04), 1);
    const totalLength = 298.45;
    const offset = totalLength * (1 - fraction);
    gaugePath.style.strokeDashoffset = offset.toFixed(2);
  }

  // Scale strip highlights
  document.querySelectorAll(".scale-step").forEach(step => step.classList.remove("active"));
  const activeStep = document.querySelector(`.scale-step.${cpcbInfo.cssClass}`);
  if (activeStep) activeStep.classList.add("active");

  // Footer Stats
  const peakStat = document.getElementById("peak-aqi-stat");
  const minStat = document.getElementById("min-aqi-stat");
  const catStat = document.getElementById("cpcb-category-stat");
  if (peakStat) peakStat.textContent = `${city.annualPeak || 400} NAQI`;
  if (minStat) minStat.textContent = `${city.monsoonLow || 45} NAQI`;
  if (catStat) catStat.textContent = cpcbInfo.status;

  // Health Advisories
  const advOutdoor = document.getElementById("adv-outdoor");
  const advVent = document.getElementById("adv-ventilation");
  const advSens = document.getElementById("adv-sensitive");
  const healthIdx = document.getElementById("health-index-val");

  if (advOutdoor) advOutdoor.textContent = cpcbInfo.outdoor;
  if (advVent) advVent.textContent = cpcbInfo.ventilation;
  if (advSens) advSens.textContent = cpcbInfo.sensitive;
  if (healthIdx) healthIdx.textContent = `${cpcbInfo.compliance}%`;

  // Weather & Climate Widget
  const tempVal = document.getElementById("val-temp");
  const tempUnit = document.getElementById("val-temp-unit");
  if (tempVal && tempUnit) {
    if (state.tempUnit === "f") {
      tempVal.textContent = ((current.tempC * 9) / 5 + 32).toFixed(1);
      tempUnit.textContent = "°F";
    } else {
      tempVal.textContent = current.tempC.toFixed(1);
      tempUnit.textContent = "°C";
    }
  }

  const condTitle = document.getElementById("val-condition-title");
  const condSub = document.getElementById("val-condition-sub");
  if (condTitle) condTitle.textContent = city.condition;
  if (condSub) condSub.textContent = city.conditionSub;

  const humEl = document.getElementById("val-humidity");
  if (humEl) humEl.textContent = `${Math.round(current.humidity)}%`;

  const windEl = document.getElementById("val-wind");
  if (windEl) windEl.innerHTML = `${current.windSpeed.toFixed(1)} <small>km/h</small>`;

  const windDirEl = document.getElementById("val-wind-dir");
  if (windDirEl) windDirEl.textContent = current.windDir;

  const pressEl = document.getElementById("val-pressure");
  if (pressEl) pressEl.innerHTML = `${Math.round(current.pressure)} <small>hPa</small>`;

  const uvEl = document.getElementById("val-uv");
  if (uvEl) {
    const uvLevel = current.uv < 3 ? "Low" : current.uv < 6 ? "Moderate" : "High";
    uvEl.innerHTML = `${current.uv.toFixed(1)} <small>${uvLevel}</small>`;
  }
}

function renderPollutantsGrid() {
  const container = document.getElementById("pollutants-grid");
  if (!container) return;

  const current = state.telemetry;
  const keys = Object.keys(POLLUTANT_CONFIG);

  let html = "";
  keys.forEach(key => {
    const cfg = POLLUTANT_CONFIG[key];
    const val = current[key];
    const isSelected = state.activeMetric === key;

    // NAAQS ratio
    const ratio = Math.min((val / cfg.cpcbLimit) * 100, 100);
    
    // Severity badge
    let statusClass = "status-pill-safe";
    let statusLabel = "Safe";
    let barColor = "var(--cpcb-good)";

    if (val > cfg.cpcbLimit) {
      statusClass = "status-pill-high";
      statusLabel = "Exceeded";
      barColor = "var(--cpcb-very-poor)";
    } else if (val > cfg.goodMax) {
      statusClass = "status-pill-mod";
      statusLabel = "Moderate";
      barColor = "var(--cpcb-moderate)";
    }

    html += `
      <div class="pollutant-card ${isSelected ? "active-selected" : ""}" data-metric="${key}" id="card-${key}">
        <div class="pollutant-top">
          <div class="pollutant-name-tag">
            <span class="pollutant-symbol">${cfg.name}</span>
            <span class="pollutant-full-name">${cfg.fullName}</span>
          </div>
          <span class="pollutant-status-pill ${statusClass}">${statusLabel}</span>
        </div>
        
        <div class="pollutant-metric-row">
          <span class="pollutant-value">${val.toFixed(key === "co" || key === "benzene" ? 2 : 1)}</span>
          <span class="pollutant-unit">${cfg.unit}</span>
        </div>

        <div class="who-progress-wrapper">
          <div class="who-track">
            <div class="who-fill" style="width: ${ratio.toFixed(0)}%; background-color: ${barColor};"></div>
          </div>
          <div class="who-lbl">
            <span>NAAQS Standard</span>
            <span>${cfg.cpcbLimit} ${cfg.unit}</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".pollutant-card").forEach(card => {
    card.addEventListener("click", () => {
      const metric = card.getAttribute("data-metric");
      setActiveMetric(metric);
    });
  });
}

function renderStationsTable() {
  const container = document.getElementById("stations-table");
  if (!container) return;

  let html = "";
  Object.keys(INDIAN_CITIES).forEach(key => {
    const city = INDIAN_CITIES[key];
    const isCurrent = key === state.currentCity;
    const aqi = isCurrent ? Math.round(state.telemetry.aqi) : city.baseAqi;
    const info = getCpcbAqiDetails(aqi);

    html += `
      <div class="station-row-item ${isCurrent ? "current-station" : ""}" data-city="${key}">
        <div class="st-col-name">
          <span class="st-pin" style="background-color: ${info.color}"></span>
          <div>
            <div class="st-title">${city.name}</div>
            <div class="st-id">${city.id} • ${city.region}</div>
          </div>
        </div>

        <div class="st-col-metrics">
          <div class="st-metric-group">
            <span class="st-val-num" style="color: ${info.color}">${aqi} NAQI</span>
            <span class="st-val-sub">${info.status}</span>
          </div>
          <div class="st-metric-group">
            <span class="st-val-num">${city.tempC}°C</span>
            <span class="st-val-sub">${city.humidity}% RH</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".station-row-item").forEach(row => {
    row.addEventListener("click", () => {
      const cityKey = row.getAttribute("data-city");
      const dropdown = document.getElementById("city-select");
      if (dropdown) dropdown.value = cityKey;
      switchCity(cityKey);
    });
  });
}

function renderForecastTimeline() {
  const container = document.getElementById("forecast-timeline-container");
  if (!container) return;

  const now = new Date();
  const baseAqi = state.telemetry.aqi;
  let html = "";

  const offsets = [2, 4, 6, 8, 12, 18];
  offsets.forEach((hrs, idx) => {
    const targetDate = new Date(now.getTime() + hrs * 3600 * 1000);
    const hourStr = targetDate.getHours().toString().padStart(2, "0") + ":00";

    const hour = targetDate.getHours();
    let modifier = 1.0;
    if (hour >= 7 && hour <= 10) modifier = 1.25;
    else if (hour >= 18 && hour <= 21) modifier = 1.30;
    else if (hour >= 1 && hour <= 5) modifier = 0.80;

    const projectedAqi = Math.round(baseAqi * modifier + (idx % 2 === 0 ? 4 : -3));
    const info = getCpcbAqiDetails(projectedAqi);

    html += `
      <div class="forecast-slot">
        <span class="f-time">+${hrs}h (${hourStr})</span>
        <span class="f-aqi-pill" style="background-color: ${info.color}25; color: ${info.color}">
          ${projectedAqi}
        </span>
        <span class="f-label">${info.status}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderAlertsDrawer() {
  const container = document.getElementById("alerts-container");
  const badge = document.getElementById("notification-badge");
  if (!container) return;

  if (badge) {
    badge.textContent = state.alerts.length;
    badge.style.display = state.alerts.length > 0 ? "flex" : "none";
  }

  if (state.alerts.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px 10px; color:var(--text-muted); font-size:0.85rem;">No active alerts at this time. All monitoring hubs operating normally.</div>`;
    return;
  }

  let html = "";
  state.alerts.forEach(alert => {
    html += `
      <div class="alert-entry ${alert.type === "warning" ? "warning" : "normal"}">
        <div class="alert-head">
          <span class="alert-title">${alert.title}</span>
          <span class="alert-time">${alert.time}</span>
        </div>
        <p class="alert-body">${alert.text}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ============================================================================
// 7. High-Performance Canvas Spline Chart
// ============================================================================

let chartCanvas = null;
let chartCtx = null;
let hoverIndex = -1;

function initChart() {
  chartCanvas = document.getElementById("trendChartCanvas");
  if (!chartCanvas) return;
  chartCtx = chartCanvas.getContext("2d");

  window.addEventListener("resize", drawChart);
  chartCanvas.addEventListener("mousemove", handleChartMouseMove);
  chartCanvas.addEventListener("mouseleave", handleChartMouseLeave);

  drawChart();
}

function drawChart() {
  if (!chartCanvas || !chartCtx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = chartCanvas.getBoundingClientRect();
  chartCanvas.width = rect.width * dpr;
  chartCanvas.height = rect.height * dpr;

  const ctx = chartCtx;
  ctx.save();
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const data = state.historicalData;
  if (!data || data.length < 2) {
    ctx.restore();
    return;
  }

  const metric = state.activeMetric;
  const values = data.map(d => d[metric] || 0);

  const minVal = Math.floor(Math.min(...values) * 0.85);
  const maxVal = Math.ceil(Math.max(...values) * 1.15) || 10;
  const valRange = maxVal - minVal || 1;

  const padLeft = 46;
  const padRight = 20;
  const padTop = 24;
  const padBottom = 34;
  const plotW = w - padLeft - padRight;
  const plotH = h - padTop - padBottom;

  const isDark = document.documentElement.getAttribute("data-theme") !== "light";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
  const textColor = isDark ? "#64748b" : "#94a3b8";

  // Grid Lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.fillStyle = textColor;
  ctx.font = "10px 'JetBrains Mono', monospace";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  const numGridLines = 4;
  for (let i = 0; i <= numGridLines; i++) {
    const y = padTop + (plotH / numGridLines) * i;
    const val = (maxVal - (valRange / numGridLines) * i).toFixed(metric === "co" ? 1 : 0);

    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();

    ctx.fillText(val.toString(), padLeft - 8, y);
  }

  // Coordinates
  const points = values.map((val, idx) => {
    const x = padLeft + (idx / (values.length - 1)) * plotW;
    const y = padTop + plotH - ((val - minVal) / valRange) * plotH;
    return { x, y, val, time: data[idx].time };
  });

  // Gradient Area Fill
  const grad = ctx.createLinearGradient(0, padTop, 0, padTop + plotH);
  if (metric === "aqi") {
    grad.addColorStop(0, "rgba(249, 115, 22, 0.35)");
    grad.addColorStop(1, "rgba(249, 115, 22, 0.0)");
  } else if (metric === "pm25") {
    grad.addColorStop(0, "rgba(239, 68, 68, 0.35)");
    grad.addColorStop(1, "rgba(239, 68, 68, 0.0)");
  } else {
    grad.addColorStop(0, "rgba(99, 102, 241, 0.35)");
    grad.addColorStop(1, "rgba(99, 102, 241, 0.0)");
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    ctx.bezierCurveTo(mx, p0.y, mx, p1.y, p1.x, p1.y);
  }

  ctx.lineTo(points[points.length - 1].x, padTop + plotH);
  ctx.lineTo(points[0].x, padTop + plotH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Smooth Curve Stroke
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    ctx.bezierCurveTo(mx, p0.y, mx, p1.y, p1.x, p1.y);
  }

  const strokeColor = metric === "aqi" ? "#f97316" : metric === "pm25" ? "#ef4444" : "#818cf8";
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Axis Labels
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const stepInterval = Math.max(1, Math.floor(points.length / 6));

  points.forEach((p, idx) => {
    if (idx % stepInterval === 0 || idx === points.length - 1) {
      ctx.fillStyle = textColor;
      ctx.fillText(p.time, p.x, padTop + plotH + 10);

      ctx.beginPath();
      ctx.arc(p.x, padTop + plotH + 4, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gridColor;
      ctx.fill();
    }
  });

  // Crosshair
  if (hoverIndex >= 0 && hoverIndex < points.length) {
    const hp = points[hoverIndex];

    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(hp.x, padTop);
    ctx.lineTo(hp.x, padTop + plotH);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(hp.x, hp.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = strokeColor;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = isDark ? "#0f172a" : "#ffffff";
    ctx.stroke();

    updateTooltip(hp, metric);
  } else {
    hideTooltip();
  }

  ctx.restore();
  updateChartSummary(values, metric);
}

function handleChartMouseMove(e) {
  if (!chartCanvas) return;
  const rect = chartCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  const padLeft = 46;
  const padRight = 20;
  const plotW = rect.width - padLeft - padRight;
  const dataLen = state.historicalData.length;

  if (mouseX < padLeft || mouseX > rect.width - padRight) {
    hoverIndex = -1;
  } else {
    const fraction = (mouseX - padLeft) / plotW;
    hoverIndex = Math.min(Math.max(Math.round(fraction * (dataLen - 1)), 0), dataLen - 1);
  }

  drawChart();
}

function handleChartMouseLeave() {
  hoverIndex = -1;
  drawChart();
}

function updateTooltip(point, metric) {
  const tooltip = document.getElementById("chartTooltip");
  if (!tooltip) return;

  const tTime = document.getElementById("tooltipTime");
  const tVal = document.getElementById("tooltipValue");
  const tSub = document.getElementById("tooltipCategory");

  const unit = metric === "aqi" ? "NAQI" : POLLUTANT_CONFIG[metric]?.unit || "";
  tTime.textContent = point.time;
  tVal.textContent = `${point.val} ${unit}`;

  if (metric === "aqi") {
    const info = getCpcbAqiDetails(point.val);
    tSub.textContent = `CPCB: ${info.status}`;
    tSub.style.color = info.color;
  } else {
    tSub.textContent = `${metric.toUpperCase()} Concentration`;
    tSub.style.color = "var(--accent-cyan)";
  }

  tooltip.style.left = `${point.x}px`;
  tooltip.style.top = `${point.y}px`;
  tooltip.classList.remove("hidden");
}

function hideTooltip() {
  const tooltip = document.getElementById("chartTooltip");
  if (tooltip) tooltip.classList.add("hidden");
}

function updateChartSummary(values, metric) {
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  const peak = Math.max(...values).toFixed(1);
  const low = Math.min(...values).toFixed(1);

  const unit = metric === "aqi" ? "NAQI" : POLLUTANT_CONFIG[metric]?.unit || "";
  const avgEl = document.getElementById("chart-avg-val");
  const peakEl = document.getElementById("chart-peak-val");
  const lowEl = document.getElementById("chart-low-val");
  const compEl = document.getElementById("chart-who-compliance");

  if (avgEl) avgEl.textContent = `${avg} ${unit}`;
  if (peakEl) peakEl.textContent = `${peak} ${unit}`;
  if (lowEl) lowEl.textContent = `${low} ${unit}`;
  if (compEl) {
    const target = metric === "aqi" ? 100 : POLLUTANT_CONFIG[metric]?.cpcbLimit || 100;
    const compliance = Math.min(100, Math.round((values.filter(v => v <= target).length / values.length) * 100));
    compEl.textContent = `${compliance}%`;
  }
}

// ============================================================================
// 8. Kaggle CSV Streaming Parser (Client-side, Fast)
// ============================================================================

function parseKaggleCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return null;

  const header = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  
  const cityIdx = header.indexOf("City");
  const dateIdx = header.indexOf("Date");
  const aqiIdx = header.indexOf("AQI");
  const pm25Idx = header.indexOf("PM2.5");
  const pm10Idx = header.indexOf("PM10");
  const no2Idx = header.indexOf("NO2");
  const so2Idx = header.indexOf("SO2");
  const coIdx = header.indexOf("CO");
  const o3Idx = header.indexOf("O3");
  const nh3Idx = header.indexOf("NH3");
  const benzeneIdx = header.indexOf("Benzene");

  const cityMap = {};

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",").map(c => c.trim().replace(/^"|"$/g, ""));
    if (row.length < header.length) continue;

    const cityName = (row[cityIdx] || "Delhi").toLowerCase();
    const date = row[dateIdx] || `Point ${i}`;
    const aqi = parseFloat(row[aqiIdx]) || 0;
    const pm25 = parseFloat(row[pm25Idx]) || 0;
    const pm10 = parseFloat(row[pm10Idx]) || 0;
    const no2 = parseFloat(row[no2Idx]) || 0;
    const so2 = parseFloat(row[so2Idx]) || 0;
    const co = parseFloat(row[coIdx]) || 0;
    const o3 = parseFloat(row[o3Idx]) || 0;
    const nh3 = parseFloat(row[nh3Idx]) || 0;
    const benzene = parseFloat(row[benzeneIdx]) || 0;

    if (!cityMap[cityName]) cityMap[cityName] = [];

    cityMap[cityName].push({
      time: date,
      aqi: Math.round(aqi),
      pm25: +pm25.toFixed(1),
      pm10: +pm10.toFixed(1),
      no2: +no2.toFixed(1),
      so2: +so2.toFixed(1),
      co: +co.toFixed(2),
      o3: +o3.toFixed(1),
      nh3: +nh3.toFixed(1),
      benzene: +benzene.toFixed(1)
    });
  }

  return cityMap;
}

function handleCsvFileSelect(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const csvText = e.target.result;
      const cityData = parseKaggleCsv(csvText);

      if (!cityData || Object.keys(cityData).length === 0) {
        showToast("Error: Invalid CSV format. Expected Kaggle city_day.csv structure.");
        return;
      }

      state.uploadedRecords = cityData;
      
      // Update city select options with cities in CSV
      const select = document.getElementById("city-select");
      if (select) {
        select.innerHTML = "";
        Object.keys(cityData).forEach(cName => {
          const opt = document.createElement("option");
          opt.value = cName;
          opt.textContent = cName.charAt(0).toUpperCase() + cName.slice(1);
          if (cName === state.currentCity) opt.selected = true;
          select.appendChild(opt);
        });
      }

      // If current city is present in uploaded data, use it; otherwise pick first
      const firstCity = Object.keys(cityData)[0];
      if (!cityData[state.currentCity]) state.currentCity = firstCity;

      initTelemetry();
      renderOverview();
      renderPollutantsGrid();
      renderStationsTable();
      renderForecastTimeline();
      drawChart();

      const totalRows = Object.values(cityData).reduce((sum, list) => sum + list.length, 0);
      const fileStatus = document.getElementById("dataset-file-status");
      if (fileStatus) {
        fileStatus.textContent = `Loaded Kaggle File: ${file.name} (${totalRows} records)`;
        fileStatus.style.color = "var(--cpcb-good)";
      }

      showToast(`Loaded ${totalRows} records from Kaggle CSV dataset!`);
    } catch {
      showToast("Error parsing CSV dataset file.");
    }
  };
  reader.readAsText(file);
}

function loadSampleCsv() {
  fetch("sample_city_day.csv")
    .then(res => res.text())
    .then(csvText => {
      const cityData = parseKaggleCsv(csvText);
      if (cityData) {
        state.uploadedRecords = cityData;
        initTelemetry();
        renderOverview();
        renderPollutantsGrid();
        renderStationsTable();
        renderForecastTimeline();
        drawChart();

        const fileStatus = document.getElementById("dataset-file-status");
        if (fileStatus) {
          fileStatus.textContent = "Loaded Sample Kaggle CPCB Dataset (2020 CPCB Baseline)";
        }
        showToast("Sample Kaggle CPCB dataset loaded successfully!");
      }
    })
    .catch(() => {
      showToast("Could not load sample CSV file.");
    });
}

// ============================================================================
// 9. Event Listeners & Interaction
// ============================================================================

function setupEventListeners() {
  // City dropdown
  const citySelect = document.getElementById("city-select");
  if (citySelect) {
    citySelect.addEventListener("change", (e) => {
      switchCity(e.target.value);
    });
  }

  // Simulation toggle
  const simBtn = document.getElementById("sim-toggle-btn");
  if (simBtn) {
    simBtn.addEventListener("click", toggleSimulation);
  }

  // Theme toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Temperature unit toggle
  const tempButtons = document.querySelectorAll("#temp-unit-toggle .unit-btn");
  tempButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tempButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.tempUnit = btn.getAttribute("data-unit");
      renderOverview();
    });
  });

  // Timeframe selector
  const timeButtons = document.querySelectorAll("#timeframe-selector .time-btn");
  timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      timeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activePeriod = btn.getAttribute("data-period");
      generateHistoricalData();
      drawChart();
    });
  });

  // Chart Metric chips
  const metricChips = document.querySelectorAll("#chart-metrics-chips .chip");
  metricChips.forEach(chip => {
    chip.addEventListener("click", () => {
      setActiveMetric(chip.getAttribute("data-metric"));
    });
  });

  // Kaggle CSV File Input
  const fileInput = document.getElementById("csv-file-input");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleCsvFileSelect(e.target.files[0]);
      }
    });
  }

  // Load sample CSV button
  const loadSampleBtn = document.getElementById("load-sample-csv-btn");
  if (loadSampleBtn) {
    loadSampleBtn.addEventListener("click", loadSampleCsv);
  }

  // Alerts Drawer
  const alertsTrigger = document.getElementById("alerts-trigger-btn");
  const alertsDrawer = document.getElementById("alerts-drawer");
  const closeDrawer = document.getElementById("close-drawer-btn");
  const clearAlertsBtn = document.getElementById("clear-alerts-btn");

  if (alertsTrigger && alertsDrawer) {
    alertsTrigger.addEventListener("click", () => {
      alertsDrawer.classList.toggle("hidden");
    });
  }

  if (closeDrawer && alertsDrawer) {
    closeDrawer.addEventListener("click", () => {
      alertsDrawer.classList.add("hidden");
    });
  }

  if (clearAlertsBtn) {
    clearAlertsBtn.addEventListener("click", () => {
      state.alerts = [];
      renderAlertsDrawer();
      showToast("All notifications marked as read.");
    });
  }

  // Thresholds Modal
  const configThresholdsBtn = document.getElementById("config-thresholds-btn");
  const thresholdModal = document.getElementById("threshold-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  const thresholdsForm = document.getElementById("thresholds-form");

  if (configThresholdsBtn && thresholdModal) {
    configThresholdsBtn.addEventListener("click", () => {
      thresholdModal.classList.remove("hidden");
    });
  }

  if (closeModalBtn && thresholdModal) {
    closeModalBtn.addEventListener("click", () => {
      thresholdModal.classList.add("hidden");
    });
  }

  if (modalCancelBtn) {
    modalCancelBtn.addEventListener("click", () => {
      document.getElementById("thresh-pm25").value = 60;
      document.getElementById("thresh-pm10").value = 100;
      document.getElementById("thresh-aqi").value = 300;
      showToast("NAQI warning limits reset to defaults.");
    });
  }

  if (thresholdsForm) {
    thresholdsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      state.thresholds.pm25 = +document.getElementById("thresh-pm25").value;
      state.thresholds.pm10 = +document.getElementById("thresh-pm10").value;
      state.thresholds.aqi = +document.getElementById("thresh-aqi").value;
      thresholdModal.classList.add("hidden");
      showToast("Custom NAAQS warning limits saved!");
    });
  }

  // CSV Exporter
  const exportBtn = document.getElementById("export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportCsvData);
  }
}

function switchCity(cityKey) {
  state.currentCity = cityKey.toLowerCase();
  initTelemetry();
  renderOverview();
  renderPollutantsGrid();
  renderStationsTable();
  renderForecastTimeline();
  drawChart();
  showToast(`Switched active city to ${cityKey.toUpperCase()}`);
}

function setActiveMetric(metricKey) {
  state.activeMetric = metricKey;

  document.querySelectorAll("#chart-metrics-chips .chip").forEach(c => {
    c.classList.toggle("active", c.getAttribute("data-metric") === metricKey);
  });

  document.querySelectorAll(".pollutant-card").forEach(card => {
    card.classList.toggle("active-selected", card.getAttribute("data-metric") === metricKey);
  });

  drawChart();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("aeropulse-theme", next);

  const sunIcon = document.getElementById("theme-sun");
  const moonIcon = document.getElementById("theme-moon");
  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle("hidden", next === "light");
    moonIcon.classList.toggle("hidden", next === "dark");
  }

  drawChart();
}

function toggleSimulation() {
  state.isSimulating = !state.isSimulating;

  const playIcon = document.getElementById("sim-icon-play");
  const pauseIcon = document.getElementById("sim-icon-pause");
  const statusText = document.getElementById("stream-status-text");
  const beacon = document.querySelector(".pulsing-beacon");

  if (state.isSimulating) {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    statusText.textContent = "KAGGLE CPCB FEED";
    statusText.style.color = "var(--cpcb-good)";
    if (beacon) beacon.style.backgroundColor = "var(--cpcb-good)";
    showToast("Live telemetry streaming resumed.");
  } else {
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    statusText.textContent = "FEED PAUSED";
    statusText.style.color = "var(--text-muted)";
    if (beacon) beacon.style.backgroundColor = "var(--text-muted)";
    showToast("Telemetry stream paused.");
  }
}

// ============================================================================
// 10. Simulation Loop
// ============================================================================

function startSimulationLoop() {
  setInterval(() => {
    if (!state.isSimulating) return;

    state.secondsUntilTick--;
    const timerEl = document.getElementById("next-tick-timer");
    if (timerEl) {
      timerEl.textContent = `Refreshing in ${state.secondsUntilTick}s`;
    }

    if (state.secondsUntilTick <= 0) {
      state.secondsUntilTick = 3;
      tickSimulation();
    }
  }, 1000);
}

function tickSimulation() {
  const t = state.telemetry;
  const base = INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi;

  const deltaAqi = (Math.random() - 0.49) * 3.5 + (base.baseAqi - t.aqi) * 0.08;
  const deltaPm25 = (Math.random() - 0.49) * 1.8 + (base.basePm25 - t.pm25) * 0.08;
  const deltaPm10 = (Math.random() - 0.49) * 2.5 + (base.basePm10 - t.pm10) * 0.08;
  const deltaNo2 = (Math.random() - 0.49) * 0.8 + (base.baseNo2 - t.no2) * 0.08;
  const deltaSo2 = (Math.random() - 0.49) * 0.4 + (base.baseSo2 - t.so2) * 0.08;
  const deltaCo = (Math.random() - 0.49) * 0.04 + (base.baseCo - t.co) * 0.08;
  const deltaO3 = (Math.random() - 0.49) * 0.7 + (base.baseO3 - t.o3) * 0.08;

  t.aqi = Math.max(15, Math.min(480, t.aqi + deltaAqi));
  t.pm25 = Math.max(5, t.pm25 + deltaPm25);
  t.pm10 = Math.max(10, t.pm10 + deltaPm10);
  t.no2 = Math.max(5, t.no2 + deltaNo2);
  t.so2 = Math.max(2, t.so2 + deltaSo2);
  t.co = Math.max(0.1, t.co + deltaCo);
  t.o3 = Math.max(5, t.o3 + deltaO3);

  t.tempC += (Math.random() - 0.5) * 0.06;
  t.humidity = Math.max(25, Math.min(95, t.humidity + (Math.random() - 0.5) * 0.2));

  // Sync last historical point
  const lastIndex = state.historicalData.length - 1;
  if (lastIndex >= 0) {
    state.historicalData[lastIndex].aqi = Math.round(t.aqi);
    state.historicalData[lastIndex].pm25 = +t.pm25.toFixed(1);
    state.historicalData[lastIndex].pm10 = +t.pm10.toFixed(1);
    state.historicalData[lastIndex].no2 = +t.no2.toFixed(1);
    state.historicalData[lastIndex].so2 = +t.so2.toFixed(1);
    state.historicalData[lastIndex].co = +t.co.toFixed(2);
    state.historicalData[lastIndex].o3 = +t.o3.toFixed(1);
  }

  // Update Sync Time
  const syncTimeEl = document.getElementById("last-sync-time");
  if (syncTimeEl) {
    const now = new Date();
    syncTimeEl.textContent = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  }

  checkThresholds();
  renderOverview();
  renderPollutantsGrid();
  drawChart();
}

function checkThresholds() {
  const t = state.telemetry;
  const city = INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi;

  if (t.pm25 > state.thresholds.pm25) {
    addAlert({
      type: "warning",
      title: `High PM2.5 at ${city.name}`,
      text: `PM2.5 recorded at ${t.pm25.toFixed(1)} µg/m³ (exceeding standard ${state.thresholds.pm25} µg/m³).`
    });
  }

  if (t.aqi > state.thresholds.aqi) {
    addAlert({
      type: "warning",
      title: `Severe AQI Spike at ${city.name}`,
      text: `NAQI score reached ${Math.round(t.aqi)} (CPCB Very Poor / Severe Category).`
    });
  }
}

function addAlert(alertData) {
  if (state.alerts.length > 0 && state.alerts[0].title === alertData.title) return;

  const newAlert = {
    id: Date.now(),
    type: alertData.type || "warning",
    title: alertData.title,
    time: "Just now",
    text: alertData.text
  };

  state.alerts.unshift(newAlert);
  if (state.alerts.length > 10) state.alerts.pop();

  renderAlertsDrawer();
  playNotificationSound("warning");
  showToast(`⚠️ CPCB Alert: ${alertData.title}`);
}

// ============================================================================
// 11. Data Export (CSV)
// ============================================================================

function exportCsvData() {
  const city = INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi;
  let csv = "Date,City,AQI,PM2.5,PM10,NO2,SO2,CO,O3,NH3,Benzene\n";

  state.historicalData.forEach(row => {
    csv += `"${row.time}","${city.name}",${row.aqi},${row.pm25},${row.pm10},${row.no2},${row.so2},${row.co},${row.o3},${row.nh3 || 0},${row.benzene || 0}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `AeroPulse_${city.id}_CPCB_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Exported CPCB format CSV for ${city.name}`);
}

// ============================================================================
// 12. Kaggle EDA Distribution & ML Predictor Logic
// ============================================================================

const CITY_DISTRIBUTIONS = {
  "Delhi (NCR)": { good: 4, sat: 14, mod: 32, poor: 26, vpoor: 18, severe: 6 },
  "Bengaluru": { good: 38, sat: 48, mod: 12, poor: 2, vpoor: 0, severe: 0 },
  "Chennai": { good: 28, sat: 54, mod: 16, poor: 2, vpoor: 0, severe: 0 },
  "Mumbai": { good: 16, sat: 42, mod: 34, poor: 8, vpoor: 0, severe: 0 },
  "Kolkata": { good: 8, sat: 26, mod: 38, poor: 20, vpoor: 8, severe: 0 },
  "Hyderabad": { good: 24, sat: 48, mod: 22, poor: 6, vpoor: 0, severe: 0 }
};

function renderCityDistribution() {
  const container = document.getElementById("city-distribution-container");
  if (!container) return;

  let html = "";
  Object.keys(CITY_DISTRIBUTIONS).forEach(cName => {
    const d = CITY_DISTRIBUTIONS[cName];
    html += `
      <div class="city-bar-row">
        <div class="city-bar-header">
          <span>${cName}</span>
          <span>${d.good + d.sat}% Clean / ${d.poor + d.vpoor + d.severe}% Poor+</span>
        </div>
        <div class="stacked-track">
          <div class="stack-segment seg-good" style="width: ${d.good}%" title="Good: ${d.good}%"></div>
          <div class="stack-segment seg-sat" style="width: ${d.sat}%" title="Satisfactory: ${d.sat}%"></div>
          <div class="stack-segment seg-mod" style="width: ${d.mod}%" title="Moderate: ${d.mod}%"></div>
          <div class="stack-segment seg-poor" style="width: ${d.poor}%" title="Poor: ${d.poor}%"></div>
          <div class="stack-segment seg-vpoor" style="width: ${d.vpoor}%" title="Very Poor: ${d.vpoor}%"></div>
          <div class="stack-segment seg-severe" style="width: ${d.severe}%" title="Severe: ${d.severe}%"></div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function setupMlPredictor() {
  const windSlider = document.getElementById("ml-wind-slider");
  const tempSlider = document.getElementById("ml-temp-slider");
  const windDisp = document.getElementById("ml-wind-disp");
  const tempDisp = document.getElementById("ml-temp-disp");
  const resultPill = document.getElementById("ml-predicted-aqi");

  if (!windSlider || !tempSlider || !resultPill) return;

  function updatePrediction() {
    const wind = parseFloat(windSlider.value);
    const temp = parseFloat(tempSlider.value);

    windDisp.textContent = `${wind} km/h`;
    tempDisp.textContent = `${temp}°C`;

    // Multi-variate empirical regression model based on Kaggle CPCB correlation
    // Lower wind = stagnant dispersion (higher AQI)
    // Higher temp = faster chemical kinetics / convection
    const baseCityAqi = (INDIAN_CITIES[state.currentCity] || INDIAN_CITIES.delhi).baseAqi;
    const dispersionCoeff = Math.max(0.4, 18 / (wind + 4));
    const thermalCoeff = 1 + (temp - 25) * 0.015;

    const predicted = Math.round(Math.max(25, Math.min(460, baseCityAqi * dispersionCoeff * thermalCoeff)));
    const info = getCpcbAqiDetails(predicted);

    resultPill.textContent = `Expected: ${predicted} NAQI (${info.status})`;
    resultPill.style.color = info.color;
    resultPill.style.backgroundColor = `${info.color}15`;
  }

  windSlider.addEventListener("input", updatePrediction);
  tempSlider.addEventListener("input", updatePrediction);
  updatePrediction();
}

// ============================================================================
// 13. Toast Engine
// ============================================================================

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

// ============================================================================
// 14. Application Bootstrap
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", state.theme);
  const sunIcon = document.getElementById("theme-sun");
  const moonIcon = document.getElementById("theme-moon");
  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle("hidden", state.theme === "light");
    moonIcon.classList.toggle("hidden", state.theme === "dark");
  }

  initTelemetry();
  renderOverview();
  renderPollutantsGrid();
  renderStationsTable();
  renderForecastTimeline();
  renderAlertsDrawer();
  renderCityDistribution();

  initChart();
  setupEventListeners();
  setupMlPredictor();
  startSimulationLoop();

  showToast("AeroPulse India Online • CPCB National Ambient Air Monitoring");
});

