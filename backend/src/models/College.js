import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    unique: true,
    maxlength: [150, 'Name cannot exceed 150 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    }
  },
  type: {
    type: String,
    required: [true, 'College type is required'],
    enum: ['Public', 'Private', 'Deemed', 'Autonomous']
  },
  established: {
    type: Number,
    min: [1800, 'Year seems too old'],
    max: [new Date().getFullYear(), 'Cannot be in the future'],
    default: null
  },
  fees: {
    annual: {
      type: Number,
      required: [true, 'Annual fees required'],
      min: [0, 'Fees cannot be negative']
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  rating: {
    overall: { type: Number, required: true, min: 0, max: 5 },
    academics: { type: Number, min: 0, max: 5, default: null },
    campus: { type: Number, min: 0, max: 5, default: null },
    placements: { type: Number, min: 0, max: 5, default: null },
    reviewCount: { type: Number, default: 0 }
  },
  courses: {
    type: [String],
    default: []
  },
  naacGrade: {
    type: String,
    enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', null],
    default: null
  },
  nirfRank: {
    type: Number,
    min: 1,
    default: null
  },
  website: { type: String, default: null },
  imageUrl: { type: String, default: null },
  compareCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for display location
collegeSchema.virtual('location.display').get(function() {
  return `${this.location.city}, ${this.location.state}`;
});

// Pre-save hook for auto-generating slug
collegeSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '') // strip non-alphanumeric/spaces
      .replace(/ +/g, '-')     // replace spaces with hyphens
      .replace(/^-+|-+$/g, ''); // trim hyphens from ends
  }
  next();
});

// Explicit Indexes
// serves state filter in GET /api/colleges
collegeSchema.index({ 'location.state': 1 });

// serves minFees/maxFees range filter and fees_asc/fees_desc sort
collegeSchema.index({ 'fees.annual': 1 });

// serves default sort (highest rated first)
collegeSchema.index({ 'rating.overall': -1 });

// serves nirf_asc sort option
collegeSchema.index({ nirfRank: 1 });

// serves every single query filtering by isActive for performance
collegeSchema.index({ isActive: 1 });

// text index for fuzzy name search (only one per collection)
collegeSchema.index({ name: 'text' });

const College = mongoose.model('College', collegeSchema);

export default College;
