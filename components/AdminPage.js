'use client';

import { useEffect, useState } from 'react';
import { LockKeyhole, ShieldCheck, RefreshCw, Save, Trash2, RotateCcw, Plus, Database, X } from 'lucide-react';
import styles from './admin.module.css';

const TABS = ['Problem statements', 'Participants', 'Leaderboard', 'Allocations'];
const THEMES = ['Smart Agriculture', 'Smart Cities & Infrastructure', 'Smart Automation', 'Healthcare & Biomedical'];

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState(TABS[0]);
  const [data, setData] = useState({ problems: [], participants: [], leaderboard: [], allocations: [] });
  const [status, setStatus] = useState('');
  const [authError, setAuthError] = useState('');
  const [adding, setAdding] = useState(false);
  const [newProblem, setNewProblem] = useState({ statementId: '', theme: THEMES[0], problemStatement: '', hardwareSoftware: 'Hardware', support: '', slot: 1 });

  function load() {
    Promise.all([
      fetch('/api/problem-statements?page=1&pageSize=100').then((response) => response.json()),
      fetch('/api/participants?page=1&pageSize=100').then((response) => response.json()),
      fetch('/api/leaderboard').then((response) => response.json()),
      fetch('/api/allocations').then((response) => response.json())
    ]).then(([problems, participants, leaderboard, allocations]) => setData({ problems: problems.data || [], participants: participants.data || [], leaderboard: leaderboard.data || [], allocations: allocations.data || [] }));
  }

  useEffect(() => { if (unlocked) load(); }, [unlocked]);

  async function unlock(event) {
    event.preventDefault();
    if (!key) return;
    setAuthError('');
    const response = await fetch('/api/admin/verify', { headers: { 'x-admin-key': key } });
    if (!response.ok) { setAuthError('Incorrect admin key. Try again.'); return; }
    setUnlocked(true); setStatus('Console unlocked.');
  }

  async function patch(path, body) {
    const response = await fetch(path, { method: 'PATCH', headers: { 'content-type': 'application/json', 'x-admin-key': key }, body: JSON.stringify(body) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Admin action failed.');
    return result;
  }

  async function addProblem(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/problem-statements', { method: 'POST', headers: { 'content-type': 'application/json', 'x-admin-key': key }, body: JSON.stringify({ ...newProblem, slot: Number(newProblem.slot), support: newProblem.support.split(',').map((item) => item.trim()).filter(Boolean) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to add statement.');
      setAdding(false); setNewProblem({ statementId: '', theme: THEMES[0], problemStatement: '', hardwareSoftware: 'Hardware', support: '', slot: 1 }); setStatus(`${result.data.statementId} added.`); load();
    } catch (error) { setStatus(error.message); }
  }

  async function saveProblem(item) { try { await patch(`/api/problem-statements/${item.statementId}`, { slot: item.slot, theme: item.theme, hardwareSoftware: item.hardwareSoftware }); setStatus(`${item.statementId} updated.`); load(); } catch (error) { setStatus(error.message); } }
  async function removeProblem(item) { if (!window.confirm(`Delete ${item.statementId}?`)) return; try { const response = await fetch(`/api/problem-statements/${item.statementId}`, { method: 'DELETE', headers: { 'x-admin-key': key } }); if (!response.ok) throw new Error('Unable to delete statement.'); setStatus(`${item.statementId} deleted.`); load(); } catch (error) { setStatus(error.message); } }
  async function saveScore(item) { try { await patch(`/api/leaderboard/${item.teamId}`, { score: item.score, status: item.status }); setStatus(`${item.teamId} score saved.`); load(); } catch (error) { setStatus(error.message); } }
  async function resetAllocation(item) { try { await patch(`/api/allocations/${item.teamId}`, {}); setStatus(`${item.teamId} allocation reset and slot returned.`); load(); } catch (error) { setStatus(error.message); } }

  if (!unlocked) return <div className="page-shell"><div className={styles.authCard}><div className={styles.authIcon}><LockKeyhole size={23} /></div><div className="eyebrow">05 / RESTRICTED AREA</div><h1 className="page-title">Admin <span>console.</span></h1><p>Database operations are protected. Enter the server-side admin key to manage slots, scores and allocations.</p><form onSubmit={unlock}><label>ADMIN KEY<input className="field" type="password" value={key} onChange={(event) => setKey(event.target.value)} placeholder="Enter admin key" autoComplete="current-password" /></label><button className="button button-primary" type="submit"><ShieldCheck size={16} /> UNLOCK CONSOLE</button></form>{authError && <div className="error-state">{authError}</div>}<small>Preview key: <code>techseva-admin</code>. Replace `ADMIN_KEY` before deployment.</small></div></div>;

  return <div className="page-shell"><section className="page-hero"><div><div className="eyebrow"><span className="eyebrow-dot" /> 05 / RESTRICTED AREA</div><h1 className="page-title">Admin <span>console.</span></h1></div><p>Private controls for the event operator. Mutations send the same protected requests that production operations will use.</p></section><div className={styles.consoleBar}><span><ShieldCheck size={15} /> AUTHENTICATED</span><span><Database size={14} /> {data.problems.length ? 'DEMO PREVIEW DATA' : 'LOADING DATA'}</span><button className="icon-button" onClick={load} title="Refresh"><RefreshCw size={15} /></button></div><div className={styles.tabs}>{TABS.map((item) => <button className={tab === item ? styles.activeTab : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>{status && <div className={styles.statusLine}>{status}</div>}
    {tab === 'Problem statements' && <section className="table-card"><div className={styles.tableCaption}><span><b>{data.problems.length}</b> statements</span><button className="button button-quiet" onClick={() => setAdding((value) => !value)}>{adding ? <X size={14} /> : <Plus size={14} />} {adding ? 'CANCEL' : 'ADD STATEMENT'}</button></div>{adding && <form className={styles.addForm} onSubmit={addProblem}><input className={styles.inlineInput} required placeholder="ID e.g. PSA005" value={newProblem.statementId} onChange={(event) => setNewProblem({ ...newProblem, statementId: event.target.value })} /><select className={styles.inlineSelect} value={newProblem.theme} onChange={(event) => setNewProblem({ ...newProblem, theme: event.target.value })}>{THEMES.map((theme) => <option key={theme}>{theme}</option>)}</select><select className={styles.inlineSelect} value={newProblem.hardwareSoftware} onChange={(event) => setNewProblem({ ...newProblem, hardwareSoftware: event.target.value })}><option>Hardware</option><option>Software</option></select><input className={styles.slotInput} type="number" min="0" required value={newProblem.slot} onChange={(event) => setNewProblem({ ...newProblem, slot: event.target.value })} /><input className={styles.problemInput} required placeholder="Problem statement" value={newProblem.problemStatement} onChange={(event) => setNewProblem({ ...newProblem, problemStatement: event.target.value })} /><input className={styles.inlineInput} placeholder="Support, comma separated" value={newProblem.support} onChange={(event) => setNewProblem({ ...newProblem, support: event.target.value })} /><button className="button button-primary" type="submit"><Save size={14} /> SAVE</button></form>}<div className="table-wrap"><table><thead><tr><th>ID</th><th>Theme</th><th>Domain</th><th>Slot</th><th>Actions</th></tr></thead><tbody>{data.problems.map((item) => <tr key={item.statementId}><td className="mono strong">{item.statementId}</td><td><input className={styles.inlineInput} value={item.theme} onChange={(event) => setData((current) => ({ ...current, problems: current.problems.map((row) => row.statementId === item.statementId ? { ...row, theme: event.target.value } : row) }))} /></td><td><select className={styles.inlineSelect} value={item.hardwareSoftware} onChange={(event) => setData((current) => ({ ...current, problems: current.problems.map((row) => row.statementId === item.statementId ? { ...row, hardwareSoftware: event.target.value } : row) }))}><option>Hardware</option><option>Software</option></select></td><td><input className={styles.slotInput} type="number" min="0" value={item.slot} onChange={(event) => setData((current) => ({ ...current, problems: current.problems.map((row) => row.statementId === item.statementId ? { ...row, slot: event.target.value } : row) }))} /></td><td><div className={styles.actionGroup}><button className="icon-button" onClick={() => saveProblem(item)} title="Save"><Save size={14} /></button><button className="icon-button" onClick={() => removeProblem(item)} title="Delete"><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div></section>}
    {tab === 'Participants' && <section className="table-card"><div className={styles.tableCaption}><span><b>{data.participants.length}</b> participant rows</span><span>Use the seed script for bulk import and source preservation.</span></div><div className="table-wrap"><table><thead><tr><th>Team</th><th>Name</th><th>Theme</th><th>Domain</th></tr></thead><tbody>{data.participants.map((item) => <tr key={`${item.teamId}-${item.name}`}><td className="mono strong">{item.teamId}</td><td>{item.name}</td><td>{item.theme}</td><td><span className="pill">{item.domain}</span></td></tr>)}</tbody></table></div></section>}
    {tab === 'Leaderboard' && <section className="table-card"><div className={styles.tableCaption}><span><b>{data.leaderboard.length}</b> ranked teams</span><span>Scores sort dynamically on the public board.</span></div><div className="table-wrap"><table><thead><tr><th>Team</th><th>Team name</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead><tbody>{data.leaderboard.map((item) => <tr key={item.teamId}><td className="mono strong">{item.teamId}</td><td>{item.teamName}</td><td><input className={styles.slotInput} type="number" min="0" value={item.score} onChange={(event) => setData((current) => ({ ...current, leaderboard: current.leaderboard.map((row) => row.teamId === item.teamId ? { ...row, score: event.target.value } : row) }))} /></td><td>{item.status}</td><td><button className="icon-button" onClick={() => saveScore(item)} title="Save score"><Save size={14} /></button></td></tr>)}</tbody></table></div></section>}
    {tab === 'Allocations' && <section className="table-card"><div className={styles.tableCaption}><span><b>{data.allocations.length}</b> allocation records</span><span>Reset returns the slot atomically in MongoDB.</span></div><div className="table-wrap"><table><thead><tr><th>Team</th><th>Participant</th><th>Problem</th><th>Allocated</th><th>Action</th></tr></thead><tbody>{data.allocations.length ? data.allocations.map((item) => <tr key={item.teamId}><td className="mono strong">{item.teamId}</td><td>{item.participantName}</td><td className="mono">{item.problemStatementId}</td><td className="mono muted">{new Date(item.allocatedAt).toLocaleString()}</td><td><button className="icon-button" onClick={() => resetAllocation(item)} title="Reset allocation"><RotateCcw size={14} /></button></td></tr>) : <tr><td colSpan="5"><div className="empty-state">No allocations yet. Spin the wheel to create the first lock.</div></td></tr>}</tbody></table></div></section>}</div>;
}
