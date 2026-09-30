'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, IndianRupee, MapPin, UsersRound, Sprout, Building2, Bot, HeartPulse, CircuitBoard, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import styles from './home.module.css';

const THEMES = [
  { name: 'Smart Agriculture', code: '01', icon: Sprout, accent: '#58a66d', tint: '#eef8f0', blurb: 'Sense better. Grow smarter.' },
  { name: 'Smart Cities & Infrastructure', code: '02', icon: Building2, accent: '#327bd3', tint: '#eef5ff', blurb: 'Design systems people can trust.' },
  { name: 'Smart Automation', code: '03', icon: Bot, accent: '#e98734', tint: '#fff5e9', blurb: 'Make the next move intelligent.' },
  { name: 'Healthcare & Biomedical', code: '04', icon: HeartPulse, accent: '#d55379', tint: '#fff0f4', blurb: 'Build for care, access and dignity.' }
];

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

const INITIAL_PROBLEMS = [
  { "statementId": "HSAu001", "theme": "Smart Automation", "problemStatement": "Develop an industrial machine monitoring system that detects abnormal machine rotation or movement and identifies when the machine enters an unsafe operating state.", "hardwareSoftware": "Hardware", "sensor": "Hall,MPU", "slot": 1 },
  { "statementId": "HSAu002", "theme": "Smart Automation", "problemStatement": "Design an automated industrial safety system that detects hazardous gas conditions and abnormal machine operation and automatically moves the system to a safe state when a critical condition is detected.", "hardwareSoftware": "Hardware", "sensor": "MQ-6,MPU,Servo", "slot": 1 },
  { "statementId": "HSAu003", "theme": "Smart Automation", "problemStatement": "Build an intelligent workstation safety system that monitors hazardous gas concentration, machine orientation and operating activity, and provides a clear local indication when a dangerous condition occurs.", "hardwareSoftware": "Hardware", "sensor": "MQ-7,Tilt,OLED", "slot": 1 },
  { "statementId": "HSA003", "theme": "Smart Agriculture", "problemStatement": "Develop a field-event monitoring system that detects unusual activity in an agricultural area by combining acoustic observations with environmental conditions and generates an early warning for the farmer.", "hardwareSoftware": "Hardware", "sensor": "KY Mic,INMP,DHT22", "slot": 1 },
  { "statementId": "SSC004", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop a smart waste-collection optimization system that predicts which collection zones are likely to reach capacity and generates an efficient collection priority plan.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "SSAu005", "theme": "Smart Automation", "problemStatement": "Develop a predictive-maintenance application that identifies whether an industrial machine is operating normally or approaching a failure condition from historical sensor readings.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "HSC006", "theme": "Smart Cities & Infrastructure", "problemStatement": "Build a public-infrastructure environmental safety node that monitors air-quality/gas conditions and temperature and provides a local warning when the environment crosses a defined safety threshold.", "hardwareSoftware": "Hardware", "sensor": "MQ-135,RTD,OLED", "slot": 1 },
  { "statementId": "SSC007", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop an urban environmental analysis tool that identifies zones showing unusual air-quality or temperature patterns from historical sensor data.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "HSC008", "theme": "Smart Cities & Infrastructure", "problemStatement": "Design a smart public-access system that detects an approaching user, verifies the required access condition, and automatically operates a controlled entry mechanism.", "hardwareSoftware": "Hardware", "sensor": "IR,Binary Logic Hall,Servo", "slot": 1 },
  { "statementId": "SSC009", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop a traffic-congestion prediction and advisory system that forecasts congestion for an upcoming time window and identifies conditions associated with severe congestion.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "HHB010", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a compact patient-safety monitoring prototype that observes a vital parameter and surrounding environmental conditions, detects an abnormal state, and provides an immediate local indication.", "hardwareSoftware": "Hardware", "sensor": "MAX,DHT11,OLED", "slot": 1 },
  { "statementId": "SSA011", "theme": "Smart Agriculture", "problemStatement": "Develop a software tool that classifies crop growth stages from environmental and cultivation observations.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSAu012", "theme": "Smart Automation", "problemStatement": "Build a software-based machine-status classifier that identifies normal and abnormal operating states from historical equipment observations.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SHB013", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a non-diagnostic early-warning analytics tool that analyzes anonymized/synthetic vital-sign records and flags cases requiring closer attention based on patterns in the data.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "HSAu014", "theme": "Smart Automation", "problemStatement": "Create a simple object-positioning mechanism that detects the presence of an object and moves an actuator to a designated position.", "hardwareSoftware": "Hardware", "sensor": "IR,Servo", "slot": 0 },
  { "statementId": "HHB015", "theme": "Healthcare & Biomedical", "problemStatement": "Develop an assistive medication-compartment prototype that detects a user's approach or interaction and automatically operates a controlled compartment while displaying its current status.", "hardwareSoftware": "Hardware", "sensor": "IR,Binary Logic Hall,Servo", "slot": 1 },
  { "statementId": "HSA016", "theme": "Smart Agriculture", "problemStatement": "Design a smart irrigation-water quality system that evaluates the quality of available water and determines whether it is suitable for agricultural use before enabling water delivery.", "hardwareSoftware": "Hardware", "sensor": "TDS,pH,OLED", "slot": 1 },
  { "statementId": "HSA017", "theme": "Smart Agriculture", "problemStatement": "Develop an automated irrigation controller that determines whether a crop zone requires watering by monitoring soil moisture and environmental conditions, then activates a controlled irrigation mechanism when irrigation is required.", "hardwareSoftware": "Hardware", "sensor": "Soil Moisture,DHT11,Servo", "slot": 1 },
  { "statementId": "SSA018", "theme": "Smart Agriculture", "problemStatement": "Develop a decision-support system that predicts whether a crop field requires irrigation using soil, weather and crop-stage observations.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "SSAu019", "theme": "Smart Automation", "problemStatement": "Create an intelligent energy-management system that analyzes equipment usage and operating patterns to recommend load reduction, shutdown or scheduling actions.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "HSC020", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop an intelligent urban flood-warning node that monitors rising water levels and provides staged indications as the water approaches an overflow or critical level.", "hardwareSoftware": "Hardware", "sensor": "Water Level,Ultrasonic,I2C LCD", "slot": 1 },
  { "statementId": "HSC021", "theme": "Smart Cities & Infrastructure", "problemStatement": "Build a pedestrian-zone safety indicator that detects movement near a designated crossing area and provides a local warning when activity is detected.", "hardwareSoftware": "Hardware", "sensor": "IR,Buzzer", "slot": 0 },
  { "statementId": "HHB022", "theme": "Healthcare & Biomedical", "problemStatement": "Design a rehabilitation-assistance prototype that detects abnormal body movement or orientation and recognizes user interaction during an exercise, providing immediate corrective feedback.", "hardwareSoftware": "Hardware", "sensor": "MPU,Touch,OLED", "slot": 1 },
  { "statementId": "HSA023", "theme": "Smart Agriculture", "problemStatement": "Develop a basic greenhouse monitoring prototype that observes temperature and humidity and indicates when the growing environment moves outside predefined limits.", "hardwareSoftware": "Hardware", "sensor": "DHT11,OLED", "slot": 0 },
  { "statementId": "HSC024", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop an intelligent public-waste monitoring system that estimates the fill level of a waste container and detects user interaction or disposal activity. The system should classify the container condition into normal, warning and collection-required states.", "hardwareSoftware": "Hardware", "sensor": "Ultrasonic,IR", "slot": 1 },
  { "statementId": "SSA025", "theme": "Smart Agriculture", "problemStatement": "Build a crop-yield forecasting system that estimates expected yield from historical crop, soil, weather and cultivation information and identifies the factors influencing the prediction.", "hardwareSoftware": "Software", "sensor": "", "slot": 1 },
  { "statementId": "HSC026", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop a smart parking-space monitoring system that detects whether designated parking spaces are occupied, identifies available spaces, and provides a clear indication to assist drivers in finding vacant parking locations.", "hardwareSoftware": "Hardware", "sensor": ["Ultrasonic", "IR", "OLED"], "slot": 1 },
  { "statementId": "SSA027", "theme": "Smart Agriculture", "problemStatement": "Develop a crop-health classification system that analyzes soil, weather and cultivation observations to identify whether a crop field is experiencing normal, stressed or potentially unfavorable growing conditions.", "hardwareSoftware": "Software", "sensor": [], "slot": 1 },
  { "statementId": "SSAu028", "theme": "Smart Automation", "problemStatement": "Develop an industrial production-monitoring application that analyzes historical machine and production data to identify abnormal production patterns and provide an early warning of potential process interruptions.", "hardwareSoftware": "Software", "sensor": [], "slot": 1 },
  { "statementId": "SSC029", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop a smart public-transport demand prediction system that analyzes historical passenger and transport data to predict demand for different time periods and identify periods requiring increased service availability.", "hardwareSoftware": "Software", "sensor": [], "slot": 1 },
  { "statementId": "SHB030", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a patient-activity analytics system that analyzes anonymized/synthetic activity and vital-sign observations to identify unusual changes in activity patterns that may require further attention.", "hardwareSoftware": "Software", "sensor": [], "slot": 1 },
  { "statementId": "HSA031", "theme": "Smart Agriculture", "problemStatement": "Develop a crop-environment monitoring prototype that observes field temperature and humidity and provides a local indication.", "hardwareSoftware": "Hardware", "sensor": "DHT22, OLED", "slot": 0 },
  { "statementId": "HSA032", "theme": "Smart Automation", "problemStatement": "Create a machine-presence safety mechanism that detects equipment activity and activates a warning or actuator.", "hardwareSoftware": "Hardware", "sensor": "Hall, Servo", "slot": 0 },
  { "statementId": "HHB033", "theme": "Healthcare & Biomedical", "problemStatement": "Develop an assistive wellness-monitoring prototype that observes body movement and user interaction and provides feedback.", "hardwareSoftware": "Hardware", "sensor": "MPU, Touch, OLED", "slot": 0 },
  { "statementId": "HHB034", "theme": "Healthcare & Biomedical", "problemStatement": "Design a basic patient-environment monitoring prototype that observes temperature and provides a local indication.", "hardwareSoftware": "Hardware", "sensor": "DHT11, OLED", "slot": 0 },
  { "statementId": "SSA035", "theme": "Smart Agriculture", "problemStatement": "Develop a crop-condition classification tool that analyzes historical soil, weather and cultivation observations to classify growth conditions.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSA036", "theme": "Smart Agriculture", "problemStatement": "Develop a farm-irrigation scheduling analytics tool that analyzes historical weather, soil and irrigation records to optimize schedules.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSAu037", "theme": "Smart Automation", "problemStatement": "Develop a machine-anomaly classification tool that identifies unusual equipment states from historical vibration/sensor data.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSAu038", "theme": "Smart Automation", "problemStatement": "Develop a production-monitoring analytics tool that analyzes historical machine and production records to identify slowdowns.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSC039", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop an urban mobility analytics tool that identifies unusual traffic or transport-demand patterns from historical records.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SSC040", "theme": "Smart Cities & Infrastructure", "problemStatement": "Develop a city environmental analytics tool that detects unusual air-quality and temperature patterns across zones.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SHB041", "theme": "Healthcare & Biomedical", "problemStatement": "Develop an anonymized health-data classification tool that identifies unusual vital-sign patterns requiring further inspection.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SHB042", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a rehabilitation-data analytics tool that analyzes synthetic movement and exercise records to identify progress.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SHB043", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a synthetic patient-activity analytics system that identifies unusual changes in daily activity patterns from sensor data.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 },
  { "statementId": "SHB044", "theme": "Healthcare & Biomedical", "problemStatement": "Develop a healthcare trend-analysis tool that analyzes anonymized historical observations to identify recurring health patterns.", "hardwareSoftware": "Software", "sensor": "", "slot": 0 }
];

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value || 0);
}

export default function HomePage() {
  const root = useRef(null);
  const [participants] = useState(INITIAL_PARTICIPANTS);
  const [problems] = useState(INITIAL_PROBLEMS);

  const stats = useMemo(() => [
    { value: "64", label: 'Participants', note: 'registered rows' },
    { value: new Set(participants.map((item) => item.teamId)).size, label: 'Teams', note: 'building together' },
    { value: problems.length, label: 'Problem statements', note: 'ready to unlock' },
    { value: THEMES.length, label: 'Themes', note: 'four directions' }
  ], [participants, problems]);

  const themeData = useMemo(() => THEMES.map((theme) => {
    const people = participants.filter((item) => item.theme === theme.name);
    const statements = problems.filter((item) => item.theme === theme.name);
    return { 
      ...theme, 
      participants: people.length, 
      available: statements.filter((item) => item.slot > 0).length, 
      hardware: statements.filter((item) => item.hardwareSoftware === 'Hardware').length, 
      software: statements.filter((item) => item.hardwareSoftware === 'Software').length 
    };
  }), [participants, problems]);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 24, opacity: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' });
      gsap.from('.hero-orbit', { scale: 0.7, opacity: 0, duration: 1.2, ease: 'power3.out' });
      gsap.from('.stat-reveal', { y: 20, opacity: 0, duration: 0.55, stagger: 0.08, delay: 0.45, ease: 'power2.out' });
      gsap.from('.theme-reveal', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.55, ease: 'power2.out' });
      document.querySelectorAll('[data-count]').forEach((node) => {
        const target = Number(node.dataset.count || 0);
        const counter = { value: 0 };
        gsap.to(counter, { value: target, duration: 1.4, delay: 0.45, ease: 'power2.out', onUpdate: () => { node.textContent = Math.round(counter.value); } });
      });
    }, root);
    return () => ctx.revert();
  }, [participants.length, problems.length]);

  return (
    <div ref={root} className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className="eyebrow hero-reveal"><span className="eyebrow-dot" /> SRM MCET / ECE DEPARTMENT / 2026</div>
          <div className={`${styles.kicker} hero-reveal`}><CircuitBoard size={15} /> HARDWARE HACKATHON</div>
          <h1 className="hero-reveal">T E C H <span>SEVA</span> <sup>1.0</sup></h1>
          <p className={`${styles.tagline} hero-reveal`}>Innovate Today <i>—</i> Serve Tomorrow.</p>
          <p className={`${styles.intro} hero-reveal`}>A focused build day for practical ideas, civic technology and hardware that moves beyond the prototype.</p>
          <div className={`${styles.heroActions} hero-reveal`}>
            <Link className="button button-primary" href="/spin-wheel">START PROBLEM ALLOCATION <ArrowRight size={17} /></Link>
            <Link className="text-link" href="/problem-statements">Browse problem statements <ArrowUpRight size={15} /></Link>
          </div>
          <div className={`${styles.heroMeta} hero-reveal`}>
            <div><span>DATE</span><strong>01 OCT 2026</strong></div>
            <div><span>VENUE</span><strong>VLSI LAB</strong></div>
            <div><span>START</span><strong>08:30 AM</strong></div>
          </div>
        </div>
        <div className={`${styles.heroVisual} hero-orbit`} aria-label="Hackathon event identity">
          <div className={`${styles.orbit} ${styles.orbitOuter}`} />
          <div className={`${styles.orbit} ${styles.orbitMiddle}`} />
          <div className={styles.visualPanel}>
            <div className={styles.visualTop}><span>TS / SIGNAL 001</span><span className="status-chip"><i /> ACTIVE</span></div>
            <div className={styles.visualMark}><Zap size={24} fill="currentColor" /><span>BUILD<br /><b>FOR</b><br />GOOD</span></div>
            <div className={styles.visualBottom}><span>01.10.26</span><span>VLSI_LAB</span></div>
          </div>
          <div className={styles.floatingTagTwo}><span>TEAM SIZE</span><b>2—4</b><UsersRound size={14} /></div>
        </div>
      </section>

      <section className={styles.statsGrid} aria-label="Live event statistics">
        {stats.map((stat, index) => <div className={`${styles.statCard} stat-reveal`} key={stat.label}>
          <div className={styles.statIndex}>0{index + 1}</div>
          <div className={styles.statValue}><span data-count={stat.value}>0</span></div>
          <div className={styles.statLabel}>{stat.label}</div>
          <div className={styles.statNote}>{stat.note}</div>
        </div>)}
      </section>

      <section className={styles.sectionBlock}>
        <div className="section-heading"><div><div className="eyebrow">01 / THE BUILD FIELD</div><h2>Choose your <em>direction.</em></h2></div><p>Four practical arenas. One day to turn a clear problem into something tangible.</p></div>
        <div className={styles.themeGrid}>
          {themeData.map(({ name, code, icon: Icon, accent, tint, blurb, participants: count, available, hardware, software }) => <article className={`${styles.themeCard} theme-reveal`} style={{ '--accent': accent, '--tint': tint }} key={name}>
            <div className={styles.themeHead}><span className={styles.themeCode}>{code}</span><Icon size={27} strokeWidth={1.6} /></div>
            <h3>{name}</h3><p>{blurb}</p>
            <div className={styles.themeMetrics}><span><b>{formatNumber(count)}</b> people</span><span><b>{available}</b> available</span></div>
            <div className={styles.themeFoot}><span>HW {hardware}</span><span>SW {software}</span><ArrowUpRight size={16} /></div>
          </article>)}
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.detailsIntro}><div className="eyebrow">02 / EVENT BRIEF</div><h2>The brief is simple.<br /><em>Make it useful.</em></h2><p>Bring a sharp problem, a reliable prototype and a team that wants to leave the room with more than a slide deck.</p></div>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}><CalendarDays size={19} /><span>DATE</span><strong>01 October 2026</strong><small>Thursday</small></div>
          <div className={styles.detailItem}><MapPin size={19} /><span>VENUE</span><strong>VLSI Lab</strong><small>SRM Madurai College</small></div>
          <div className={styles.detailItem}><Clock3 size={19} /><span>TIME</span><strong>8:30 AM</strong><small>Build day begins</small></div>
          <div className={styles.detailItem}><UsersRound size={19} /><span>TEAM SIZE</span><strong>2—4 members</strong><small>One shared build</small></div>
          <div className={styles.detailItem}><IndianRupee size={19} /><span>REGISTRATION</span><strong>₹300 per head</strong><small>Open to makers</small></div>
        </div>
      </section>

      <footer className={styles.footer}><span>TECH SEVA 1.0</span><span>DEPARTMENT OF ECE · SRM MCE&T</span><span>INNOVATE TODAY — SERVE TOMORROW</span></footer>
    </div>
  );
}