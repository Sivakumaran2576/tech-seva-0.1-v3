import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  teamId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  domain: { type: String, required: true }
}, { timestamps: true });

ParticipantSchema.index({ teamId: 1, name: 1 }, { unique: true });

export default mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);
