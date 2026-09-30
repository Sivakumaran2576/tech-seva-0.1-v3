import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true, index: true },
  teamName: { type: String, required: true },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
  theme: { type: String },
  domain: { type: String },
  status: { type: String, default: 'IN PROGRESS' },
  problemStatement: { type: String, default: '—' }
}, { timestamps: true });

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
