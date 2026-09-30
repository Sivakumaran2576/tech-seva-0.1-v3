import mongoose from 'mongoose';

const ProblemStatementSchema = new mongoose.Schema({
  statementId: { type: String, required: true, unique: true, index: true },
  theme: { type: String, required: true, index: true },
  problemStatement: { type: String, required: true },
  hardwareSoftware: { type: String, required: true, enum: ['Hardware', 'Software'] },
  support: { type: [String], default: [] },
  slot: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

export default mongoose.models.ProblemStatement || mongoose.model('ProblemStatement', ProblemStatementSchema);
