import fs from 'node:fs/promises';
import path from 'node:path';
import mongoose from 'mongoose';
import Participant from '../models/Participant.js';
import ProblemStatement from '../models/ProblemStatement.js';

const root = process.cwd();
const sourcePaths = {
  participants: [path.join(root, 'participants_list(1).json'), path.join(root, 'data/participants_list(1).json'), '/home/ubuntu/upload/participants_list(1).json'],
  problems: [path.join(root, 'problem statement(1).json'), path.join(root, 'data/problem statement(1).json'), '/home/ubuntu/upload/problem statement(1).json']
};

async function readFirst(paths) {
  for (const file of paths) {
    try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { /* try next source */ }
  }
  return null;
}

function unwrap(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.participants)) return data.participants;
  if (Array.isArray(data?.problemStatements)) return data.problemStatements;
  return [];
}

const participantsInput = await readFirst(sourcePaths.participants);
const problemsInput = await readFirst(sourcePaths.problems);
if (!participantsInput || !problemsInput) {
  console.error('Seed files not found. Add participants_list(1).json and problem statement(1).json to the project or /home/ubuntu/upload, then run npm run seed again.');
  process.exit(1);
}
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is required for seeding. Copy .env.local.example to .env.local and add the private connection string.');
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB || 'techseva' });
const participants = unwrap(participantsInput);
const problems = unwrap(problemsInput);
for (const item of participants) {
  const normalized = { teamId: item.teamId || item.team || item.teamID, name: item.name || item.participantName || item.participant, theme: item.theme, domain: item.domain || item.hardwareSoftware || item.category };
  if (!normalized.teamId || !normalized.name) continue;
  await Participant.updateOne({ teamId: normalized.teamId, name: normalized.name }, { $set: normalized }, { upsert: true });
}
for (const item of problems) {
  const normalized = { statementId: item.statementId || item.id, theme: item.theme, problemStatement: item.problemStatement || item.statement, hardwareSoftware: item.hardwareSoftware || item.domain || item.category, support: item.support || item.supportComponents || [], slot: Math.max(0, Number(item.slot || 0)) };
  if (!normalized.statementId) continue;
  await ProblemStatement.updateOne({ statementId: normalized.statementId }, { $set: normalized }, { upsert: true });
}
console.log(`Seeded ${participants.length} participant rows and ${problems.length} problem statements.`);
await mongoose.disconnect();
