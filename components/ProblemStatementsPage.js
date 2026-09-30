'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, CircleCheck, CircleSlash2 } from 'lucide-react';
import styles from './data-pages.module.css';

const INITIAL_PROBLEMS = [
  {
    "statementId": "HSAu001",
    "theme": "Smart Automation",
    "problemStatement": "Develop an industrial machine monitoring system that detects abnormal machine rotation or movement and identifies when the machine enters an unsafe operating state.",
    "hardwareSoftware": "Hardware",
    "sensor": "Hall,MPU",
    "slot": 1
  },
  {
    "statementId": "HSAu002",
    "theme": "Smart Automation",
    "problemStatement": "Design an automated industrial safety system that detects hazardous gas conditions and abnormal machine operation and automatically moves the system to a safe state when a critical condition is detected.",
    "hardwareSoftware": "Hardware",
    "sensor": "MQ-6,MPU,Servo",
    "slot": 1
  },
  {
    "statementId": "HSAu003",
    "theme": "Smart Automation",
    "problemStatement": "Build an intelligent workstation safety system that monitors hazardous gas concentration, machine orientation and operating activity, and provides a clear local indication when a dangerous condition occurs.",
    "hardwareSoftware": "Hardware",
    "sensor": "MQ-7,Tilt,OLED",
    "slot": 1
  },
  {
    "statementId": "HSA003",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a field-event monitoring system that detects unusual activity in an agricultural area by combining acoustic observations with environmental conditions and generates an early warning for the farmer.",
    "hardwareSoftware": "Hardware",
    "sensor": "KY Mic,INMP,DHT22",
    "slot": 1
  },
  {
    "statementId": "SSC004",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop a smart waste-collection optimization system that predicts which collection zones are likely to reach capacity and generates an efficient collection priority plan.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "SSAu005",
    "theme": "Smart Automation",
    "problemStatement": "Develop a predictive-maintenance application that identifies whether an industrial machine is operating normally or approaching a failure condition from historical sensor readings.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "HSC006",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Build a public-infrastructure environmental safety node that monitors air-quality/gas conditions and temperature and provides a local warning when the environment crosses a defined safety threshold.",
    "hardwareSoftware": "Hardware",
    "sensor": "MQ-135,RTD,OLED",
    "slot": 1
  },
  {
    "statementId": "SSC007",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop an urban environmental analysis tool that identifies zones showing unusual air-quality or temperature patterns from historical sensor data.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "HSC008",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Design a smart public-access system that detects an approaching user, verifies the required access condition, and automatically operates a controlled entry mechanism.",
    "hardwareSoftware": "Hardware",
    "sensor": "IR,Binary Logic Hall,Servo",
    "slot": 1
  },
  {
    "statementId": "SSC009",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop a traffic-congestion prediction and advisory system that forecasts congestion for an upcoming time window and identifies conditions associated with severe congestion.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "HHB010",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a compact patient-safety monitoring prototype that observes a vital parameter and surrounding environmental conditions, detects an abnormal state, and provides an immediate local indication.",
    "hardwareSoftware": "Hardware",
    "sensor": "MAX,DHT11,OLED",
    "slot": 1
  },
  {
    "statementId": "SSA011",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a software tool that classifies crop growth stages from environmental and cultivation observations.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSAu012",
    "theme": "Smart Automation",
    "problemStatement": "Build a software-based machine-status classifier that identifies normal and abnormal operating states from historical equipment observations.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SHB013",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a non-diagnostic early-warning analytics tool that analyzes anonymized/synthetic vital-sign records and flags cases requiring closer attention based on patterns in the data.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "HSAu014",
    "theme": "Smart Automation",
    "problemStatement": "Create a simple object-positioning mechanism that detects the presence of an object and moves an actuator to a designated position.",
    "hardwareSoftware": "Hardware",
    "sensor": "IR,Servo",
    "slot": 0
  },
  {
    "statementId": "HHB015",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop an assistive medication-compartment prototype that detects a user's approach or interaction and automatically operates a controlled compartment while displaying its current status.",
    "hardwareSoftware": "Hardware",
    "sensor": "IR,Binary Logic Hall,Servo",
    "slot": 1
  },
  {
    "statementId": "HSA016",
    "theme": "Smart Agriculture",
    "problemStatement": "Design a smart irrigation-water quality system that evaluates the quality of available water and determines whether it is suitable for agricultural use before enabling water delivery.",
    "hardwareSoftware": "Hardware",
    "sensor": "TDS,pH,OLED",
    "slot": 1
  },
  {
    "statementId": "HSA017",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop an automated irrigation controller that determines whether a crop zone requires watering by monitoring soil moisture and environmental conditions, then activates a controlled irrigation mechanism when irrigation is required.",
    "hardwareSoftware": "Hardware",
    "sensor": "Soil Moisture,DHT11,Servo",
    "slot": 1
  },
  {
    "statementId": "SSA018",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a decision-support system that predicts whether a crop field requires irrigation using soil, weather and crop-stage observations.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "SSAu019",
    "theme": "Smart Automation",
    "problemStatement": "Create an intelligent energy-management system that analyzes equipment usage and operating patterns to recommend load reduction, shutdown or scheduling actions.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "HSC020",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop an intelligent urban flood-warning node that monitors rising water levels and provides staged indications as the water approaches an overflow or critical level.",
    "hardwareSoftware": "Hardware",
    "sensor": "Water Level,Ultrasonic,I2C LCD",
    "slot": 1
  },
  {
    "statementId": "HSC021",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Build a pedestrian-zone safety indicator that detects movement near a designated crossing area and provides a local warning when activity is detected.",
    "hardwareSoftware": "Hardware",
    "sensor": "IR,Buzzer",
    "slot": 0
  },
  {
    "statementId": "HHB022",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Design a rehabilitation-assistance prototype that detects abnormal body movement or orientation and recognizes user interaction during an exercise, providing immediate corrective feedback.",
    "hardwareSoftware": "Hardware",
    "sensor": "MPU,Touch,OLED",
    "slot": 1
  },
  {
    "statementId": "HSA023",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a basic greenhouse monitoring prototype that observes temperature and humidity and indicates when the growing environment moves outside predefined limits.",
    "hardwareSoftware": "Hardware",
    "sensor": "DHT11,OLED",
    "slot": 0
  },
  {
    "statementId": "HSC024",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop an intelligent public-waste monitoring system that estimates the fill level of a waste container and detects user interaction or disposal activity. The system should classify the container condition into normal, warning and collection-required states.",
    "hardwareSoftware": "Hardware",
    "sensor": "Ultrasonic,IR",
    "slot": 1
  },
  {
    "statementId": "SSA025",
    "theme": "Smart Agriculture",
    "problemStatement": "Build a crop-yield forecasting system that estimates expected yield from historical crop, soil, weather and cultivation information and identifies the factors influencing the prediction.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 1
  },
  {
    "statementId": "HSC026",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop a smart parking-space monitoring system that detects whether designated parking spaces are occupied, identifies available spaces, and provides a clear indication to assist drivers in finding vacant parking locations.",
    "hardwareSoftware": "Hardware",
    "sensor": ["Ultrasonic", "IR", "OLED"],
    "slot": 1
  },
  {
    "statementId": "SSA027",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a crop-health classification system that analyzes soil, weather and cultivation observations to identify whether a crop field is experiencing normal, stressed or potentially unfavorable growing conditions.",
    "hardwareSoftware": "Software",
    "sensor": [],
    "slot": 1
  },
  {
    "statementId": "SSAu028",
    "theme": "Smart Automation",
    "problemStatement": "Develop an industrial production-monitoring application that analyzes historical machine and production data to identify abnormal production patterns and provide an early warning of potential process interruptions.",
    "hardwareSoftware": "Software",
    "sensor": [],
    "slot": 1
  },
  {
    "statementId": "SSC029",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop a smart public-transport demand prediction system that analyzes historical passenger and transport data to predict demand for different time periods and identify periods requiring increased service availability.",
    "hardwareSoftware": "Software",
    "sensor": [],
    "slot": 1
  },
  {
    "statementId": "SHB030",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a patient-activity analytics system that analyzes anonymized/synthetic activity and vital-sign observations to identify unusual changes in activity patterns that may require further attention.",
    "hardwareSoftware": "Software",
    "sensor": [],
    "slot": 1
  },
  {
    "statementId": "HSA031",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a crop-environment monitoring prototype that observes field temperature and humidity and provides a local indication.",
    "hardwareSoftware": "Hardware",
    "sensor": "DHT22, OLED",
    "slot": 0
  },
  {
    "statementId": "HSA032",
    "theme": "Smart Automation",
    "problemStatement": "Create a machine-presence safety mechanism that detects equipment activity and activates a warning or actuator.",
    "hardwareSoftware": "Hardware",
    "sensor": "Hall, Servo",
    "slot": 0
  },
  {
    "statementId": "HHB033",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop an assistive wellness-monitoring prototype that observes body movement and user interaction and provides feedback.",
    "hardwareSoftware": "Hardware",
    "sensor": "MPU, Touch, OLED",
    "slot": 0
  },
  {
    "statementId": "HHB034",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Design a basic patient-environment monitoring prototype that observes temperature and provides a local indication.",
    "hardwareSoftware": "Hardware",
    "sensor": "DHT11, OLED",
    "slot": 0
  },
  {
    "statementId": "SSA035",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a crop-condition classification tool that analyzes historical soil, weather and cultivation observations to classify growth conditions.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSA036",
    "theme": "Smart Agriculture",
    "problemStatement": "Develop a farm-irrigation scheduling analytics tool that analyzes historical weather, soil and irrigation records to optimize schedules.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSAu037",
    "theme": "Smart Automation",
    "problemStatement": "Develop a machine-anomaly classification tool that identifies unusual equipment states from historical vibration/sensor data.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSAu038",
    "theme": "Smart Automation",
    "problemStatement": "Develop a production-monitoring analytics tool that analyzes historical machine and production records to identify slowdowns.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSC039",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop an urban mobility analytics tool that identifies unusual traffic or transport-demand patterns from historical records.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SSC040",
    "theme": "Smart Cities & Infrastructure",
    "problemStatement": "Develop a city environmental analytics tool that detects unusual air-quality and temperature patterns across zones.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SHB041",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop an anonymized health-data classification tool that identifies unusual vital-sign patterns requiring further inspection.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SHB042",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a rehabilitation-data analytics tool that analyzes synthetic movement and exercise records to identify progress.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SHB043",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a synthetic patient-activity analytics system that identifies unusual changes in daily activity patterns from sensor data.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  },
  {
    "statementId": "SHB044",
    "theme": "Healthcare & Biomedical",
    "problemStatement": "Develop a healthcare trend-analysis tool that analyzes anonymized historical observations to identify recurring health patterns.",
    "hardwareSoftware": "Software",
    "sensor": "",
    "slot": 0
  }
]; 

const themes = ['All', 'Smart Agriculture', 'Smart Cities & Infrastructure', 'Smart Automation', 'Healthcare & Biomedical'];
const domains = ['All', 'Hardware', 'Software'];
const availabilityOptions = ['All', 'Available', 'Unavailable'];

function themePill(theme) {
  if (theme === 'Smart Agriculture') return 'pill pill-green';
  if (theme === 'Smart Cities & Infrastructure') return 'pill pill-blue';
  if (theme === 'Smart Automation') return 'pill pill-orange';
  return 'pill pill-pink';
}

export default function ProblemStatementsPage() {
  const [problems] = useState(INITIAL_PROBLEMS);
  const [filters, setFilters] = useState({ search: '', theme: 'All', domain: 'All', availability: 'All' });
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Filter problems locally in memory
  const filteredProblems = useMemo(() => {
    return problems.filter((item) => {
      // Search Filter
      const searchMatch = !filters.search || 
        item.statementId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.problemStatement.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.support?.some((s) => s.toLowerCase().includes(filters.search.toLowerCase()));

      // Theme Filter
      const themeMatch = filters.theme === 'All' || item.theme === filters.theme;

      // Domain Filter
      const domainMatch = filters.domain === 'All' || item.hardwareSoftware === filters.domain;

      // Availability Filter
      const availabilityMatch = 
        filters.availability === 'All' ||
        (filters.availability === 'Available' && item.slot > 0) ||
        (filters.availability === 'Unavailable' && item.slot === 0);

      return searchMatch && themeMatch && domainMatch && availabilityMatch;
    });
  }, [problems, filters]);

  // Paginate local results
  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredProblems.slice(startIndex, startIndex + pageSize);
  }, [filteredProblems, page, pageSize]);

  function changeFilter(key, value) {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> 01 / THE BUILD FIELD</div>
          <h1 className="page-title">Problem <span>statements.</span></h1>
        </div>
        <p>Browse the live challenge pool. Every card carries its own domain, support kit and remaining allocation slots.</p>
      </section>

      <div className="toolbar">
        <label className={styles.searchField}>
          <Search size={15} />
          <input 
            className="field" 
            value={filters.search} 
            onChange={(event) => changeFilter('search', event.target.value)} 
            placeholder="          Search ID, challenge, support..." 
          />
        </label>
        <SlidersHorizontal size={15} className={styles.filterIcon} />
        <select className="select" value={filters.theme} onChange={(event) => changeFilter('theme', event.target.value)} aria-label="Theme filter">
          {themes.map((option) => <option key={option}>{option}</option>)}
        </select>
        <select className="select" value={filters.domain} onChange={(event) => changeFilter('domain', event.target.value)} aria-label="Domain filter">
          {domains.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>

      <div className="table-card">
        <div className={styles.tableCaption}>
          <span><b>{filteredProblems.length}</b> challenge records</span>
          <span className="status-chip"><i /> LIVE POOL</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Statement</th>
                <th>Theme</th>
                <th>Problem statement</th>
                <th>Domain</th>
                <th>Support</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.statementId}>
                  <td><span className="mono strong">{item.statementId}</span></td>
                  <td><span className={themePill(item.theme)}>{item.theme}</span></td>
                  <td><div className={styles.problemCopy}>{item.problemStatement}</div></td>
                  <td><span className={`pill ${item.hardwareSoftware === 'Hardware' ? 'pill-red' : 'pill-blue'}`}>{item.hardwareSoftware}</span></td>
                  <td>
                    <div className={styles.supportList}>
                      {item.support?.map((part) => <span key={part}>{part}</span>)}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProblems.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">No problem statements match these filters.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination">
        <span>PAGE {page} / {totalPages}</span>
        <div className="pagination-actions">
          <button 
            className="icon-button" 
            onClick={() => setPage((value) => Math.max(1, value - 1))} 
            disabled={page <= 1}
          >
            <ChevronLeft size={15} />
          </button>
          <button 
            className="icon-button" 
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))} 
            disabled={page >= totalPages}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}