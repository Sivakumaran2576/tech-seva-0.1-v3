'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Disc3,
  LockKeyhole,
  RotateCw,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import styles from './spin.module.css';

// Updated Embedded JSON data for Participants
const INITIAL_PARTICIPANTS = [
  { "sNo": "1", "team": "Sushil", "teamId": "TSH001", "theme": "Healthcare & Biomedical", "selectedProblems": "" },
  { "sNo": "2", "team": "Vishwa Dhanushkodi", "teamId": "TSH002", "theme": "Smart Cities & Infrastructure", "selectedProblems": "" },
  { "sNo": "3", "team": "Valli. T", "teamId": "TSH003", "theme": "Healthcare & Biomedical", "selectedProblems": "" },
  { "sNo": "4", "team": "JeyRam", "teamId": "TSH004", "theme": "Smart Automation", "selectedProblems": "" },
  { "sNo": "5", "team": "Priyadharshini", "teamId": "TSH005", "theme": "Smart Cities & Infrastructure", "selectedProblems": "" },
  { "sNo": "6", "team": "Akchara T.S", "teamId": "TSH006", "theme": "Smart Agriculture", "selectedProblems": "" },
  { "sNo": "7", "team": "Manisha Ruby.K", "teamId": "TSH007", "theme": "Smart Agriculture", "selectedProblems": "" },
  { "sNo": "8", "team": "Sahana D", "teamId": "TSH008", "theme": "Smart Cities & Infrastructure", "selectedProblems": "" },
  { "sNo": "9", "team": "Roshini K", "teamId": "TSH009", "theme": "Smart Agriculture", "selectedProblems": "" },
  { "sNo": "10", "team": "Rajesh B", "teamId": "TSH010", "theme": "Healthcare & Biomedical", "selectedProblems": "" },
  { "sNo": "11", "team": "Jeeva", "teamId": "TSH011", "theme": "Smart Cities & Infrastructure", "selectedProblems": "" },
  { "sNo": "12", "team": "Dhanush", "teamId": "TSH012", "theme": "Smart Automation", "selectedProblems": "" },
  { "sNo": "13", "team": "Abilesh", "teamId": "TSH013", "theme": "Smart Automation", "selectedProblems": "" },
  { "sNo": "14", "team": "Nithish Kumar", "teamId": "TSS001", "theme": "Smart Agriculture", "selectedProblems": "" },
  { "sNo": "15", "team": "Madhan Kumar", "teamId": "TSS002", "theme": "Smart Agriculture", "selectedProblems": "" },
  { "sNo": "16", "team": "Sowmiyanarayanan", "teamId": "TSS003", "theme": "Smart Automation", "selectedProblems": "" },
  { "sNo": "17", "team": "Akash N A", "teamId": "TSS004", "theme": "Smart Automation", "selectedProblems": "" },
  { "sNo": "18", "team": "Ilakiya Sivakumar", "teamId": "TSS005", "theme": "Smart Cities & Infrastructure", "selectedProblems": "" },
  { "sNo": "19", "team": "Gengamani", "teamId": "TSS006", "theme": "Healthcare & Biomedical", "selectedProblems": "" },
  { "sNo": "20", "team": "Mithraa", "teamId": "TSS007", "theme": "Smart Automation", "selectedProblems": "" }
];

// Updated Embedded JSON data for Problems
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
    "slot": 0
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

function themePill(theme) {
  if (theme === 'Smart Agriculture') return 'pill pill-green';
  if (theme === 'Smart Cities & Infrastructure' || theme === 'Smart Cities') return 'pill pill-blue';
  if (theme === 'Smart Automation') return 'pill pill-orange';
  return 'pill pill-pink';
}

// Helper function to format sensor support lists dynamically
function formatSensors(sensorData) {
  if (!sensorData) return [];
  if (Array.isArray(sensorData)) return sensorData;
  return String(sensorData).split(',').map((s) => s.trim()).filter(Boolean);
}

export default function SpinWheelPage() {
  const wheelRef = useRef(null);
  const resultRef = useRef(null);

  const [participants, setParticipants] = useState(() =>
    INITIAL_PARTICIPANTS.map((item, index) => ({
      id: index,
      teamId: item.teamId,
      name: item.team,
      theme: item.theme,
      domain: item.teamId.startsWith('TSH') ? 'Hardware' : 'Software',
      problemStatementId: item.selectedProblems || null,
    }))
  );

  const [problems, setProblems] = useState(() =>
    INITIAL_PROBLEMS.map((item) => ({
      ...item,
      slot: Number(item.slot),
    }))
  );

  const [selectedParticipantId, setSelectedParticipantId] = useState('');
  const [allocation, setAllocation] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [rotation, setRotation] = useState(0);

  const selected = useMemo(
    () => participants.find((item) => String(item.id) === String(selectedParticipantId)) || null,
    [participants, selectedParticipantId]
  );

  // All statements to display on the wheel (including slot 0)
  const wheelSegments = useMemo(
    () =>
      selected
        ? problems.filter((item) => {
            const isThemeMatch =
              item.theme === selected.theme ||
              (item.theme === 'Smart Cities' && selected.theme === 'Smart Cities & Infrastructure') ||
              (item.theme === 'Smart Cities & Infrastructure' && selected.theme === 'Smart Cities');

            return isThemeMatch && item.hardwareSoftware === selected.domain;
          })
        : [],
    [problems, selected]
  );

  // Only statements that have available slots (> 0) can be picked
  const eligible = useMemo(
    () => wheelSegments.filter((item) => item.slot > 0),
    [wheelSegments]
  );

  useEffect(() => {
    if (!wheelRef.current || !wheelSegments.length) return;
    const segment = 360 / wheelSegments.length;
    wheelRef.current.style.setProperty('--segment', `${segment}deg`);
  }, [wheelSegments]);

  function selectTeam(value) {
    setSelectedParticipantId(value);
    const participant = participants.find((item) => String(item.id) === String(value));
    
    if (participant && participant.problemStatementId) {
      const assignedProblem = problems.find((p) => p.statementId === participant.problemStatementId);
      setAllocation({
        problemStatementId: participant.problemStatementId,
        theme: participant.theme,
        domain: participant.domain,
        participantName: participant.name,
        teamId: participant.teamId,
        problemStatement: assignedProblem?.problemStatement,
        support: formatSensors(assignedProblem?.sensor),
      });
    } else {
      setAllocation(null);
    }

    setMessage('');
    setRotation(0);
    if (wheelRef.current) gsap.set(wheelRef.current, { rotation: 0 });
  }

  function spin() {
    if (!selected) {
      setMessage('Please select a participant first.');
      return;
    }
    if (allocation || selected.problemStatementId) {
      setMessage('This participant already has a problem statement assigned.');
      return;
    }
    if (!eligible.length) {
      setMessage('No available problem statements with remaining slots for this theme and category.');
      return;
    }

    setMessage('');
    setSpinning(true);

    const winningIndexInEligible = Math.floor(Math.random() * eligible.length);
    const selectedProblem = eligible[winningIndexInEligible];

    const visualIndex = wheelSegments.findIndex(
      (item) => item.statementId === selectedProblem.statementId
    );

    const result = {
      problemStatementId: selectedProblem.statementId,
      theme: selected.theme,
      domain: selected.domain,
      participantName: selected.name,
      teamId: selected.teamId,
      problemStatement: selectedProblem.problemStatement,
      support: formatSensors(selectedProblem.sensor),
    };

    const segment = 360 / wheelSegments.length;
    const landing = 360 - (visualIndex * segment + segment / 2);
    const current = rotation;
    const finalRotation = current + 360 * 6 + ((landing - (current % 360) + 360) % 360);

    gsap.to(wheelRef.current, {
      rotation: finalRotation,
      duration: 5,
      ease: 'power4.out',
      onComplete: () => {
        setRotation(finalRotation);
        setSpinning(false);
        setAllocation(result);

        setParticipants((prev) =>
          prev.map((item) =>
            item.id === selected.id
              ? { ...item, problemStatementId: selectedProblem.statementId }
              : item
          )
        );

        setProblems((prev) =>
          prev.map((item) =>
            item.statementId === selectedProblem.statementId
              ? { ...item, slot: Math.max(0, item.slot - 1) }
              : item
          )
        );

        if (resultRef.current) {
          gsap.fromTo(
            resultRef.current,
            { y: 18, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.6)' }
          );
        }
      },
    });
  }

  return (
    <div className={styles.page}>
      <div className="page-shell">
        <section className={styles.pageIntro}>
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> 04 / LOCK THE BUILD
            </div>
            <h1 className="page-title">
              Problem <span>allocation.</span>
            </h1>
          </div>
          <p>
            Choose a participant. The wheel will allocate a problem statement from the available pool in state.
          </p>
        </section>

        <div className={styles.stage}>
          <section className={styles.controlCard}>
            <div className={styles.cardLabel}>
              <Disc3 size={14} /> ALLOCATION CONTROL
            </div>
            <h2>
              Select participant
              <br />
              <em>/ team.</em>
            </h2>
            <p className={styles.controlHint}>
              Your theme and domain define the eligible problem pool.
            </p>
            <label className={styles.selectLabel}>
              SELECT PARTICIPANT / TEAM ID
              <select
                value={selectedParticipantId}
                onChange={(event) => selectTeam(event.target.value)}
                className={styles.teamSelect}
                disabled={spinning}
              >
                <option value="">Select a participant</option>
                {participants.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.teamId} · {person.name} ({person.theme || 'No Theme'} - {person.domain})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} />
            </label>

            {selected ? (
              <div className={styles.selectedCard}>
                <div className={styles.selectedTop}>
                  <span className="status-chip">
                    <i /> SELECTED
                  </span>
                  <span className="mono">{selected.teamId}</span>
                </div>
                <div className={styles.selectedName}>{selected.name}</div>
                <div className={styles.selectedRows}>
                  <span>
                    <small>THEME</small>
                    <b className={themePill(selected.theme)}>{selected.theme || 'N/A'}</b>
                  </span>
                  <span>
                    <small>CATEGORY</small>
                    <b
                      className={`pill ${
                        selected.domain === 'Hardware' ? 'pill-red' : 'pill-blue'
                      }`}
                    >
                      {selected.domain}
                    </b>
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.emptySelection}>
                <UsersRound size={17} /> Select a participant to load the wheel.
              </div>
            )}

            {allocation && (
              <div className={styles.lockedNotice}>
                <LockKeyhole size={15} />
                <span>
                  <b>This participant has already received a problem statement.</b>
                  <small>Spin is locked to protect the allocation.</small>
                </span>
              </div>
            )}

            {message && <div className="error-state">{message}</div>}
          </section>

          <section className={styles.wheelCard}>
            <div className={styles.wheelHeader}>
              <div>
                <div className="eyebrow">ELIGIBLE PROBLEM POOL</div>
                <strong>
                  {wheelSegments.length
                    ? `${wheelSegments.length} live segments`
                    : 'Awaiting team selection'}
                </strong>
              </div>
              <span className={styles.slotHint}>
                {wheelSegments.filter((item) => item.hardwareSoftware === 'Hardware').length} HW /{' '}
                {wheelSegments.filter((item) => item.hardwareSoftware === 'Software').length} SW
              </span>
            </div>

            <div className={styles.wheelStage}>
              {wheelSegments.length ? (
                <>
                  <div className={styles.pointer} />
                  <div
                    ref={wheelRef}
                    className={styles.wheel}
                    style={{
                      '--segment-count': wheelSegments.length,
                      '--segment-size': `${360 / wheelSegments.length}deg`,
                    }}
                  >
                    {wheelSegments.map((item, index) => (
                      <span
                        className={`${styles.wheelLabel} ${item.slot === 0 ? styles.outOfStock : ''}`}
                        style={{
                          transform: `rotate(${
                            index * (360 / wheelSegments.length)
                          }deg) translateY(-132px) rotate(-${
                            index * (360 / wheelSegments.length)
                          }deg)`,
                          opacity: item.slot === 0 ? 0.4 : 1,
                        }}
                        key={item.statementId}
                      >
                        {item.statementId} {item.slot === 0 ? '(0)' : ''}
                      </span>
                    ))}
                  </div>
                  <button
                    className={styles.spinButton}
                    onClick={spin}
                    disabled={!selected || !eligible.length || spinning || Boolean(allocation)}
                  >
                    {spinning ? (
                      <RotateCw className={styles.spinIcon} size={20} />
                    ) : (
                      <Sparkles size={18} />
                    )}
                    {spinning ? 'SPINNING' : allocation ? 'LOCKED' : 'SPIN'}
                  </button>
                </>
              ) : (
                <div className={styles.noProblems}>
                  <Disc3 size={34} />
                  <strong>
                    {selected
                      ? 'No matching problem statements for this participant.'
                      : 'Select a team to generate the wheel.'}
                  </strong>
                  <span>
                    {selected
                      ? 'Try another team or category.'
                      : 'Only matching statements become segments.'}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.wheelFooter}>
              <span>
                <i className={styles.legendA} /> LOCAL STATE ALLOCATION
              </span>
              <span>
                <i className={styles.legendB} /> ATOMIC SLOT LOCK
              </span>
              <span>
                <i className={styles.legendC} /> ONE TEAM / ONE PROBLEM
              </span>
            </div>
          </section>
        </div>

        {allocation && (
          <section ref={resultRef} className={styles.resultCard}>
            <div className={styles.confetti} aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} style={{ '--i': index }} />
              ))}
            </div>
            <div className={styles.resultBadge}>
              <Check size={16} /> PROBLEM ALLOCATED
            </div>
            <div className={styles.resultGrid}>
              <div>
                <div className={styles.resultId}>{allocation.problemStatementId}</div>
                <div className="eyebrow">PROBLEM LOCKED ✓</div>
              </div>
              <div>
                <span className="mono muted">{allocation.theme}</span>
                <h2>
                  {allocation.problemStatement ||
                    problems.find((item) => item.statementId === allocation.problemStatementId)
                      ?.problemStatement ||
                    'Allocation confirmed.'}
                </h2>
                <div className={styles.resultMeta}>
                  <span>
                    <small>DOMAIN</small>
                    <b>{allocation.domain}</b>
                  </span>
                  <span>
                    <small>SUPPORT</small>
                    <b>{(allocation.support || []).join(' · ') || 'See statement brief'}</b>
                  </span>
                  <span>
                    <small>PARTICIPANT</small>
                    <b>
                      {allocation.teamId} · {allocation.participantName}
                    </b>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.resultAction}>
              <ArrowRight size={17} />
              <span>
                Build something
                <br />
                useful.
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
