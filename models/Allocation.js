import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true, index: true },
  participantId: { type: String, required: true },
  participantName: { type: String, required: true },
  theme: { type: String, required: true },
  domain: { type: String, required: true },
  problemStatementId: { type: String, required: true },
  problemStatement: { type: String },
  support: { type: [String], default: [] },
  allocatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'ALLOCATED' }
}, { timestamps: true });

export default mongoose.models.Allocation || mongoose.model('Allocation', AllocationSchema);
