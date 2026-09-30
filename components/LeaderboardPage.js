'use client';

import { useEffect, useState } from 'react';
import { Search, ArrowDownWideNarrow, Trophy, Medal, RefreshCw } from 'lucide-react';
import styles from './data-pages.module.css';

const themes = ['All', 'Smart Agriculture', 'Smart Cities & Infrastructure', 'Smart Automation', 'Healthcare & Biomedical'];
const domains = ['All', 'Hardware', 'Software'];

function themePill(theme) {
  if (theme === 'Smart Agriculture') return 'pill pill-green';
  if (theme === 'Smart Cities & Infrastructure') return 'pill pill-blue';
  if (theme === 'Smart Automation') return 'pill pill-orange';
  return 'pill pill-pink';
}

export default function LeaderboardPage() {
  const [filters, setFilters] = useState({ search: '', theme: 'All', domain: 'All', sort: 'score' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    const query = new URLSearchParams(filters);
    fetch(`/api/leaderboard?${query}`).then((response) => response.json()).then((result) => { setItems(result.data || []); setLoading(false); }).catch(() => setLoading(false));
  }
  useEffect(load, [filters]);
  function changeFilter(key, value) { setFilters((current) => ({ ...current, [key]: value })); }

  return <div className="page-shell"><section className="page-hero"><div><div className="eyebrow"><span className="eyebrow-dot" /> 03 / THE SIGNAL BOARD</div><h1 className="page-title">Live <span>leaderboard.</span></h1></div><p>Rank is calculated from the latest score. No fixed positions, no hidden ordering—just the current state of the build day.</p></section>
    <div className="toolbar"><label className={styles.searchField}><Search size={15} /><input className="field" value={filters.search} onChange={(event) => changeFilter('search', event.target.value)} placeholder="Search team or problem..." /></label><select className="select" value={filters.theme} onChange={(event) => changeFilter('theme', event.target.value)} aria-label="Theme filter">{themes.map((option) => <option key={option}>{option}</option>)}</select><select className="select" value={filters.domain} onChange={(event) => changeFilter('domain', event.target.value)} aria-label="Domain filter">{domains.map((option) => <option key={option}>{option}</option>)}</select><select className="select" value={filters.sort} onChange={(event) => changeFilter('sort', event.target.value)} aria-label="Score sort"><option value="score">Score — high to low</option><option value="team">Team ID — A to Z</option></select><button className="icon-button" title="Refresh leaderboard" onClick={load}><RefreshCw size={15} /></button></div>
    <div className={styles.podium}>{items.slice(0, 3).map((item, index) => <div className={`${styles.podiumCard} ${styles[`podium${index + 1}`]}`} key={item.teamId}><div className={styles.podiumRank}>{index === 0 ? '01' : index === 1 ? '02' : '03'}</div><Trophy size={18} /><span>{item.teamId}</span><strong>{item.teamName}</strong><b>{item.score}<small> pts</small></b></div>)}</div>
    <div className="table-card"><div className={styles.tableCaption}><span><b>{items.length}</b> ranked teams</span><span><ArrowDownWideNarrow size={14} /> SCORE DESC</span></div><div className="table-wrap"><table><thead><tr><th>Rank</th><th>Team ID</th><th>Team name</th><th>Score</th><th>Problem</th><th>Theme</th><th>Domain</th><th>Status</th></tr></thead><tbody>{loading ? Array.from({ length: 6 }).map((_, index) => <tr key={index}><td colSpan="8"><div className="loading-line" /></td></tr>) : items.map((item) => <tr key={item.teamId}><td><span className={`${styles.rank} ${item.rank <= 3 ? styles.topRank : ''}`}>{item.rank <= 3 ? <Medal size={14} /> : item.rank}</span></td><td><span className="mono strong">{item.teamId}</span></td><td><strong className={styles.teamName}>{item.teamName}</strong></td><td><span className={styles.score}>{item.score}</span></td><td><span className="mono muted">{item.problemStatement || '—'}</span></td><td><span className={themePill(item.theme)}>{item.theme}</span></td><td><span className={`pill ${item.domain === 'Hardware' ? 'pill-red' : 'pill-blue'}`}>{item.domain}</span></td><td><span className={item.status === 'SUBMITTED' ? 'status-chip' : styles.statusMuted}><i /> {item.status}</span></td></tr>)}</tbody></table></div></div>
  </div>;
}
