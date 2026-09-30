const participants = [
  ['TS001', 'Sushil', 'Healthcare & Biomedical', 'Hardware'],
  ['TS001', 'Nithish Kumar', 'Healthcare & Biomedical', 'Hardware'],
  ['TS001', 'Sanjay', 'Healthcare & Biomedical', 'Hardware'],
  ['TS002', 'Vishwa Dhanushkodi', 'Smart Agriculture', 'Hardware'],
  ['TS002', 'Aarthi', 'Smart Agriculture', 'Hardware'],
  ['TS002', 'Kavin', 'Smart Agriculture', 'Software'],
  ['TS003', 'Harish', 'Smart Cities & Infrastructure', 'Software'],
  ['TS003', 'Meena', 'Smart Cities & Infrastructure', 'Software'],
  ['TS004', 'Ragul', 'Smart Automation', 'Hardware'],
  ['TS004', 'Janani', 'Smart Automation', 'Hardware'],
  ['TS005', 'Dharshini', 'Healthcare & Biomedical', 'Software'],
  ['TS005', 'Akash', 'Healthcare & Biomedical', 'Software'],
  ['TS006', 'Vignesh', 'Smart Agriculture', 'Software'],
  ['TS006', 'Mithun', 'Smart Agriculture', 'Software'],
  ['TS007', 'Priya', 'Smart Cities & Infrastructure', 'Hardware'],
  ['TS007', 'Adithya', 'Smart Cities & Infrastructure', 'Hardware'],
  ['TS008', 'Swetha', 'Smart Automation', 'Software'],
  ['TS008', 'Naveen', 'Smart Automation', 'Software'],
  ['TS009', 'Mohan', 'Healthcare & Biomedical', 'Hardware'],
  ['TS009', 'Keerthana', 'Healthcare & Biomedical', 'Hardware'],
  ['TS010', 'Aswin', 'Smart Agriculture', 'Hardware'],
  ['TS010', 'Ramya', 'Smart Agriculture', 'Hardware'],
  ['TS011', 'Praveen', 'Smart Cities & Infrastructure', 'Software'],
  ['TS011', 'Deepa', 'Smart Cities & Infrastructure', 'Software'],
  ['TS012', 'Rithika', 'Smart Automation', 'Hardware'],
  ['TS012', 'Sathish', 'Smart Automation', 'Hardware']
].map(([teamId, name, theme, domain]) => ({ teamId, name, theme, domain }));

const problemStatements = [
  { statementId: 'PSA001', theme: 'Smart Agriculture', problemStatement: 'Develop an automated irrigation controller that decides when irrigation is required using soil condition and water-quality information, then operates the irrigation mechanism accordingly.', hardwareSoftware: 'Hardware', support: ['Soil Moisture', 'TDS', 'Servo'], slot: 2 },
  { statementId: 'PSA002', theme: 'Smart Agriculture', problemStatement: 'Build a low-cost crop health node that logs field temperature, humidity and light levels, then raises a local warning when the microclimate drifts.', hardwareSoftware: 'Hardware', support: ['DHT', 'LDR', 'OLED'], slot: 3 },
  { statementId: 'PSA003', theme: 'Smart Agriculture', problemStatement: 'Design a crop advisory dashboard that turns sensor readings into a simple irrigation and harvest readiness view for a small farm.', hardwareSoftware: 'Software', support: ['Dashboard', 'Charts', 'Alerts'], slot: 3 },
  { statementId: 'PSA004', theme: 'Smart Agriculture', problemStatement: 'Create a field map that helps a grower compare water usage and plant health across multiple beds using time-series data.', hardwareSoftware: 'Software', support: ['Maps', 'Analytics', 'CSV'], slot: 2 },
  { statementId: 'PSC001', theme: 'Smart Cities & Infrastructure', problemStatement: 'Prototype a smart streetlight that adapts brightness to movement and ambient light while reporting energy use.', hardwareSoftware: 'Hardware', support: ['PIR', 'LDR', 'Relay'], slot: 2 },
  { statementId: 'PSC002', theme: 'Smart Cities & Infrastructure', problemStatement: 'Build a compact parking occupancy indicator that detects a vehicle and communicates open-slot status to a local display.', hardwareSoftware: 'Hardware', support: ['Ultrasonic', 'LED', 'Buzzer'], slot: 2 },
  { statementId: 'PSC003', theme: 'Smart Cities & Infrastructure', problemStatement: 'Design a citizen-facing dashboard that helps a municipal team prioritize recurring infrastructure complaints by place and severity.', hardwareSoftware: 'Software', support: ['Map', 'Filters', 'Charts'], slot: 3 },
  { statementId: 'PSC004', theme: 'Smart Cities & Infrastructure', problemStatement: 'Create a public transport delay visualizer that turns live-style route events into a clear commuter notification flow.', hardwareSoftware: 'Software', support: ['Routes', 'Status', 'Notifications'], slot: 2 },
  { statementId: 'PSAU001', theme: 'Smart Automation', problemStatement: 'Build a tabletop sorting line that identifies an object class and routes it to the correct bin with a safe actuator cycle.', hardwareSoftware: 'Hardware', support: ['IR', 'Servo', 'Motor'], slot: 2 },
  { statementId: 'PSAU002', theme: 'Smart Automation', problemStatement: 'Design a machine health indicator that watches vibration and temperature, then gives an immediate local warning for abnormal behavior.', hardwareSoftware: 'Hardware', support: ['Vibration', 'DHT', 'RGB LED'], slot: 2 },
  { statementId: 'PSAU003', theme: 'Smart Automation', problemStatement: 'Create a workflow builder that lets a user connect triggers and actions into a visual automation recipe.', hardwareSoftware: 'Software', support: ['Nodes', 'Rules', 'Preview'], slot: 3 },
  { statementId: 'PSAU004', theme: 'Smart Automation', problemStatement: 'Develop a production cell simulator that compares throughput and downtime across alternative automation strategies.', hardwareSoftware: 'Software', support: ['Simulation', 'Metrics', 'Export'], slot: 2 },
  { statementId: 'PSH001', theme: 'Healthcare & Biomedical', problemStatement: 'Design a compact patient-safety monitoring prototype that observes a vital parameter and surrounding conditions, detects an abnormal state, and gives an immediate local alert to the user or attendant.', hardwareSoftware: 'Hardware', support: ['MAX', 'DHT', 'OLED'], slot: 2 },
  { statementId: 'PSH002', theme: 'Healthcare & Biomedical', problemStatement: 'Build a contactless medicine cabinet reminder that tracks opening events and provides a clear local prompt when a scheduled dose is missed.', hardwareSoftware: 'Hardware', support: ['RTC', 'Buzzer', 'OLED'], slot: 2 },
  { statementId: 'PSH003', theme: 'Healthcare & Biomedical', problemStatement: 'Create a patient journey board that helps a small clinic see waiting time, room status and follow-up tasks in one calm interface.', hardwareSoftware: 'Software', support: ['Kanban', 'Timers', 'Roles'], slot: 3 },
  { statementId: 'PSH004', theme: 'Healthcare & Biomedical', problemStatement: 'Design an accessibility-first symptom journal that turns daily entries into an understandable trend view for a patient and caregiver.', hardwareSoftware: 'Software', support: ['Forms', 'Trends', 'Export'], slot: 2 }
];

const leaderboard = [
  { teamId: 'TS004', teamName: 'Servo Syndicate', score: 94, updatedAt: '2026-09-28T11:30:00.000Z', theme: 'Smart Automation', domain: 'Hardware', status: 'SUBMITTED', problemStatement: 'PSAU001' },
  { teamId: 'TS002', teamName: 'Root Runners', score: 88, updatedAt: '2026-09-28T11:10:00.000Z', theme: 'Smart Agriculture', domain: 'Hardware', status: 'SUBMITTED', problemStatement: 'PSA001' },
  { teamId: 'TS007', teamName: 'Civic Current', score: 81, updatedAt: '2026-09-28T10:42:00.000Z', theme: 'Smart Cities & Infrastructure', domain: 'Hardware', status: 'REVIEW', problemStatement: 'PSC002' },
  { teamId: 'TS001', teamName: 'Pulse Point', score: 77, updatedAt: '2026-09-28T10:05:00.000Z', theme: 'Healthcare & Biomedical', domain: 'Hardware', status: 'SUBMITTED', problemStatement: 'PSH001' },
  { teamId: 'TS010', teamName: 'Green Grid', score: 72, updatedAt: '2026-09-28T09:54:00.000Z', theme: 'Smart Agriculture', domain: 'Hardware', status: 'IN PROGRESS', problemStatement: '—' },
  { teamId: 'TS003', teamName: 'Metro Mesh', score: 68, updatedAt: '2026-09-28T09:21:00.000Z', theme: 'Smart Cities & Infrastructure', domain: 'Software', status: 'IN PROGRESS', problemStatement: '—' },
  { teamId: 'TS008', teamName: 'Flow State', score: 61, updatedAt: '2026-09-28T09:10:00.000Z', theme: 'Smart Automation', domain: 'Software', status: 'IN PROGRESS', problemStatement: '—' },
  { teamId: 'TS005', teamName: 'Care Circuit', score: 55, updatedAt: '2026-09-28T08:46:00.000Z', theme: 'Healthcare & Biomedical', domain: 'Software', status: 'IN PROGRESS', problemStatement: '—' }
];

export function getDemoStore() {
  if (!globalThis.__techsevaStore) {
    globalThis.__techsevaStore = {
      participants: structuredClone(participants),
      problemStatements: structuredClone(problemStatements),
      allocations: [],
      leaderboard: structuredClone(leaderboard)
    };
  }
  return globalThis.__techsevaStore;
}

export { participants, problemStatements, leaderboard };
