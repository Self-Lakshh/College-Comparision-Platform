import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import College from '../models/College.js';

// Load .env relative to this file
dotenv.config({ path: './.env' });

const colleges = [
  {
    name: 'IIT Bombay',
    slug: 'iit-bombay',
    location: { city: 'Mumbai', state: 'Maharashtra' },
    type: 'Public', established: 1958,
    fees: { annual: 250000 },
    rating: { overall: 4.8, academics: 4.9, campus: 4.7, placements: 4.9, reviewCount: 3200 },
    courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD', 'M.Sc'],
    naacGrade: 'A++', nirfRank: 3,
    website: 'https://www.iitb.ac.in',
  },
  {
    name: 'IIT Delhi',
    slug: 'iit-delhi',
    location: { city: 'New Delhi', state: 'Delhi' },
    type: 'Public', established: 1961,
    fees: { annual: 230000 },
    rating: { overall: 4.8, academics: 4.9, campus: 4.6, placements: 4.9, reviewCount: 2900 },
    courses: ['B.Tech', 'M.Tech', 'PhD', 'M.Sc'],
    naacGrade: 'A++', nirfRank: 2,
    website: 'https://home.iitd.ac.in',
  },
  {
    name: 'IIM Ahmedabad',
    slug: 'iim-ahmedabad',
    location: { city: 'Ahmedabad', state: 'Gujarat' },
    type: 'Public', established: 1961,
    fees: { annual: 2300000 },
    rating: { overall: 4.9, academics: 4.9, campus: 4.8, placements: 5.0, reviewCount: 1800 },
    courses: ['MBA', 'PGDM', 'PhD', 'Executive MBA'],
    naacGrade: 'A++', nirfRank: 1,
    website: 'https://www.iima.ac.in',
  },
  {
    name: 'BITS Pilani',
    slug: 'bits-pilani',
    location: { city: 'Pilani', state: 'Rajasthan' },
    type: 'Deemed', established: 1964,
    fees: { annual: 550000 },
    rating: { overall: 4.5, academics: 4.6, campus: 4.4, placements: 4.5, reviewCount: 2100 },
    courses: ['B.E.', 'M.E.', 'M.Sc', 'MBA', 'PhD'],
    naacGrade: 'A', nirfRank: 28,
    website: 'https://www.bits-pilani.ac.in',
  },
  {
    name: 'VIT Vellore',
    slug: 'vit-vellore',
    location: { city: 'Vellore', state: 'Tamil Nadu' },
    type: 'Private', established: 1984,
    fees: { annual: 198000 },
    rating: { overall: 4.1, academics: 4.0, campus: 4.5, placements: 4.0, reviewCount: 4500 },
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MCA', 'PhD'],
    naacGrade: 'A++', nirfRank: 11,
    website: 'https://vit.ac.in',
  },
  {
    name: 'Manipal Institute of Technology',
    slug: 'manipal-institute-of-technology',
    location: { city: 'Manipal', state: 'Karnataka' },
    type: 'Private', established: 1957,
    fees: { annual: 320000 },
    rating: { overall: 4.2, academics: 4.1, campus: 4.6, placements: 4.1, reviewCount: 3100 },
    courses: ['B.Tech', 'M.Tech', 'MBA', 'BCA'],
    naacGrade: 'A+', nirfRank: 48,
    website: 'https://manipal.edu/mit.html',
  },
  {
    name: 'Delhi University',
    slug: 'delhi-university',
    location: { city: 'New Delhi', state: 'Delhi' },
    type: 'Public', established: 1922,
    fees: { annual: 28000 },
    rating: { overall: 4.0, academics: 4.1, campus: 3.9, placements: 3.8, reviewCount: 5200 },
    courses: ['B.A.', 'B.Sc', 'B.Com', 'M.A.', 'M.Sc', 'MBA', 'PhD'],
    naacGrade: 'A++', nirfRank: 16,
    website: 'https://www.du.ac.in',
  },
  {
    name: 'Jadavpur University',
    slug: 'jadavpur-university',
    location: { city: 'Kolkata', state: 'West Bengal' },
    type: 'Public', established: 1955,
    fees: { annual: 18000 },
    rating: { overall: 4.3, academics: 4.4, campus: 4.0, placements: 4.1, reviewCount: 1900 },
    courses: ['B.E.', 'M.E.', 'B.Sc', 'M.Sc', 'PhD'],
    naacGrade: 'A++', nirfRank: 12,
    website: 'https://jadavpuruniversity.in',
  },
  {
    name: 'Christ University',
    slug: 'christ-university',
    location: { city: 'Bengaluru', state: 'Karnataka' },
    type: 'Private', established: 1969,
    fees: { annual: 150000 },
    rating: { overall: 4.0, academics: 4.0, campus: 4.3, placements: 3.9, reviewCount: 2700 },
    courses: ['B.Tech', 'MBA', 'BBA', 'B.Com', 'M.Sc', 'PhD'],
    naacGrade: 'A+', nirfRank: null,
    website: 'https://christuniversity.in',
  },
  {
    name: 'Amity University Noida',
    slug: 'amity-university-noida',
    location: { city: 'Noida', state: 'Uttar Pradesh' },
    type: 'Private', established: 2005,
    fees: { annual: 180000 },
    rating: { overall: 3.8, academics: 3.7, campus: 4.2, placements: 3.7, reviewCount: 3800 },
    courses: ['B.Tech', 'MBA', 'BBA', 'B.Com', 'MCA', 'LLB'],
    naacGrade: 'A+', nirfRank: 79,
    website: 'https://www.amity.edu',
  },
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    const deleted = await College.deleteMany({});
    console.log(`✓ Deleted ${deleted.deletedCount} existing colleges.`);

    const inserted = await College.insertMany(colleges);
    console.log(`✓ Successfully inserted ${inserted.length} colleges.`);

    // Verification queries
    console.log('\n--- Data Verification ---');
    const verify = await College.find({})
      .select('name slug location.state fees.annual rating.overall nirfRank')
      .sort({ 'rating.overall': -1 })
      .lean();

    console.table(verify.map(c => ({
      name: c.name,
      slug: c.slug,
      state: c.location.state,
      fees: c.fees.annual,
      rating: c.rating.overall,
      nirf: c.nirfRank || 'N/A'
    })));

    // Index verification
    console.log('\n--- Index Verification ---');
    const indexes = await College.collection.indexInformation();
    console.log('Active indexes:', Object.keys(indexes).join(', '));

  } catch (error) {
    console.error('✗ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB.');
    process.exit(0);
  }
};

seedDB();
