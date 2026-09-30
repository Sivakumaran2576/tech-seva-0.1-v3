'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, Clock3, Hourglass, Play, TimerReset } from 'lucide-react';
import styles from './timer.module.css';

const START = new Date('2026-10-01T10:30:00+05:30').getTime();
const END = new Date('2026-10-01T15:30:00+05:30').getTime();

function pad(value) {
  return String(value).padStart(2, '0');
}

function parts(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

export default function TimerPage() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const phase = !now || now < START ? 'upcoming' : now < END ? 'live' : 'ended';
  const remaining = phase === 'upcoming' ? parts(START - (now || START)) : phase === 'live' ? parts(END - now) : parts(0);
  const progress = phase === 'upcoming' ? 0 : phase === 'ended' ? 100 : Math.min(100, Math.max(0, ((now - START) / (END - START)) * 100));
  const status = { upcoming: 'STARTS SOON', live: 'EVENT LIVE', ended: 'EVENT COMPLETE' }[phase];
  const label = { upcoming: 'Time until the hackathon begins', live: 'Time remaining in the build window', ended: 'The build window has closed' }[phase];
  const dateLabel = useMemo(() => new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(START)), []);

  return <div className={styles.page}><div className="page-shell">
    <section className={styles.intro}><div><div className="eyebrow"><span className="eyebrow-dot" /> 06 / EVENT CLOCK</div><h1 className="page-title">Build <span>window.</span></h1></div><p>One focused sprint. The timer follows Indian Standard Time and moves from the opening bell to the final submission.</p></section>
    <section className={styles.heroCard}>
      <div className={styles.heroTop}><div className={styles.eventLabel}><CalendarClock size={16} /> TECH SEVA 1.0 · LIVE COUNTDOWN</div><span className={`${styles.status} ${styles[phase]}`}><i /> {status}</span></div>
      <div className={styles.clockLayout}><div className={styles.clockCopy}><span className="mono muted">{dateLabel.toUpperCase()} · IST</span><h2>{phase === 'upcoming' ? 'The clock is waiting.' : phase === 'live' ? 'Keep building.' : 'What a sprint.'}</h2><p>{label}. Your scheduled window runs from <b>10:30 AM</b> to <b>3:30 PM</b>.</p><div className={styles.schedule}><div><small>START</small><b>10:30 AM</b></div><div className={styles.scheduleLine}><span /></div><div><small>END</small><b>03:30 PM</b></div></div></div><div className={styles.timer} aria-live="polite"><div className={styles.timerIcon}>{phase === 'live' ? <Play size={19} fill="currentColor" /> : phase === 'ended' ? <CheckCircle2 size={20} /> : <Hourglass size={20} />}</div><div className={styles.timerUnits}>{remaining.days > 0 && <div><strong>{pad(remaining.days)}</strong><span>DAYS</span></div>}<div><strong>{pad(remaining.hours)}</strong><span>HOURS</span></div><div><strong>{pad(remaining.minutes)}</strong><span>MINUTES</span></div><div><strong>{pad(remaining.seconds)}</strong><span>SECONDS</span></div></div></div></div>
      <div className={styles.progressLabel}><span>EVENT PROGRESS</span><b>{Math.round(progress)}%</b></div><div className={styles.progress}><span style={{ width: `${progress}%` }} /></div>
    </section>
    <section className={styles.infoGrid}><div className={styles.infoCard}><Clock3 size={18} /><div><small>STARTS</small><strong>01 OCT 2026 · 10:30 AM</strong><span>Indian Standard Time</span></div></div><div className={styles.infoCard}><TimerReset size={18} /><div><small>DURATION</small><strong>05 HOURS</strong><span>Continuous build window</span></div></div><div className={styles.infoCard}><CalendarClock size={18} /><div><small>ENDS</small><strong>01 OCT 2026 · 03:30 PM</strong><span>Final submission cutoff</span></div></div></section>
  </div></div>;
}
