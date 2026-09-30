'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, UsersRound } from 'lucide-react';
import styles from './data-pages.module.css';

const themes = ['All', 'Smart Agriculture', 'Smart Cities & Infrastructure', 'Smart Automation', 'Healthcare & Biomedical'];
const domains = ['All', 'Hardware', 'Software'];

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

function themePill(theme) {
  if (theme === 'Smart Agriculture') return 'pill pill-green';
  if (theme === 'Smart Cities & Infrastructure') return 'pill pill-blue';
  if (theme === 'Smart Automation') return 'pill pill-orange';
  return 'pill pill-pink';
}

export default function ParticipantsPage() {
  const [filters, setFilters] = useState({ search: '', teamId: 'All', theme: 'All', domain: 'All' });
  const [participants] = useState(INITIAL_PARTICIPANTS);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Derive unique team IDs for the dropdown filter dynamically
  const teams = useMemo(() => {
    return ['All', ...Array.from(new Set(participants.map((item) => item.teamId))).sort()];
  }, [participants]);

  // Client-side filtering logic replacing API fetching
  const filteredParticipants = useMemo(() => {
    return participants.filter((item) => {
      const matchesSearch = 
        item.team.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.teamId.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.theme.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesTeamId = filters.teamId === 'All' || item.teamId === filters.teamId;
      const matchesTheme = filters.theme === 'All' || item.theme === filters.theme;
      
      // Infer domain based on prefix if not explicitly present in the data object (TSH = Hardware/Software logic adaptation)
      const inferredDomain = item.teamId.startsWith('TSH') ? 'Hardware' : 'Software';
      const matchesDomain = filters.domain === 'All' || inferredDomain === filters.domain;

      return matchesSearch && matchesTeamId && matchesTheme && matchesDomain;
    });
  }, [participants, filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredParticipants.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredParticipants.slice(start, start + pageSize);
  }, [filteredParticipants, page]);

  function changeFilter(key, value) { 
    setPage(1); 
    setFilters((current) => ({ ...current, [key]: value })); 
  }

  return <div className="page-shell">
    <section className="page-hero"><div><div className="eyebrow"><span className="eyebrow-dot" /> 02 / WHO IS BUILDING</div><h1 className="page-title">Participant <span>registry.</span></h1></div><p>Every maker in the room, mapped to a team, a theme and a build domain. Search the roster without losing the signal.</p></section>
    <div className="toolbar">
      <label className={styles.searchField}><Search size={15} /><input className="field" value={filters.search} onChange={(event) => changeFilter('search', event.target.value)} placeholder="          Search name, team, theme..." /></label>
      <select className="select" value={filters.teamId} onChange={(event) => changeFilter('teamId', event.target.value)} aria-label="Team filter">{teams.map((option) => <option key={option}>{option}</option>)}</select>
      <select className="select" value={filters.theme} onChange={(event) => changeFilter('theme', event.target.value)} aria-label="Theme filter">{themes.map((option) => <option key={option}>{option}</option>)}</select>
      <select className="select" value={filters.domain} onChange={(event) => changeFilter('domain', event.target.value)} aria-label="Domain filter">{domains.map((option) => <option key={option}>{option}</option>)}</select>
    </div>
    <div className="table-card">
      <div className={styles.tableCaption}>
        <span><b>{filteredParticipants.length}</b> registered participants</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Team ID</th><th>Participant name</th><th>Theme</th><th>Domain</th></tr></thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const domain = item.teamId.startsWith('TSH') ? 'Hardware' : 'Software';
              return (
                <tr key={`${item.teamId}-${item.team}`}>
                  <td className="mono muted">{String((page - 1) * pageSize + index + 1).padStart(2, '0')}</td>
                  <td><span className="mono strong">{item.teamId}</span></td>
                  <td><div className="nameCell"><strong>{item.team}</strong></div></td>
                  <td><span className={themePill(item.theme)}>{item.theme}</span></td>
                  <td><span className={`pill ${domain === 'Hardware' ? 'pill-red' : 'pill-blue'}`}>{domain}</span></td>
                </tr>
              );
            })}
            {!paginatedData.length && <tr><td colSpan="5"><div className="empty-state">No participants match these filters.</div></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
    <div className="pagination">
      <span>PAGE {page} / {totalPages}</span>
      <div className="pagination-actions">
        <button className="icon-button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page <= 1}><ChevronLeft size={15} /></button>
        <button className="icon-button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={page >= totalPages}><ChevronRight size={15} /></button>
      </div>
    </div>
  </div>;
}