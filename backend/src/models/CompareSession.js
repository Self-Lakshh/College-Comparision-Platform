import mongoose from 'mongoose';

/**
 * This collection is analytics-only. 
 * Tracks which colleges were compared together in a single session.
 * No user-facing queries run against it. No indexes beyond default _id.
 */
const compareSessionSchema = new mongoose.Schema({
  colleges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  }],
  userId: {
    type: String,
    default: null
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

const CompareSession = mongoose.model('CompareSession', compareSessionSchema);

export default CompareSession;
