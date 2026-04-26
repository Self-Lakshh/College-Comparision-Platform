import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import College from '../models/College.js';

// Load .env from backend root
dotenv.config({ path: './.env' });

async function runDiagnostics() {
  console.log('--- MongoDB Atlas Diagnostics ---\n');

  try {
    // Step 1: Attempt connection
    console.log('Step 1: Attempt connection...');
    await connectDB();
    // Host is logged inside connectDB()

    // Step 2: Count documents
    console.log('\nStep 2: Count documents...');
    const count = await College.countDocuments({});
    if (count > 0) {
      console.log(`✓ Found ${count} colleges in database`);
    } else {
      console.log('⚠ Found 0 colleges — run: npm run seed');
    }

    if (count > 0) {
      // Step 3: Top rated college
      console.log('\nStep 3: Top rated college...');
      const topRated = await College.findOne({ isActive: true }).sort({ 'rating.overall': -1 }).lean();
      console.log(`✓ Top rated: ${topRated.name} (${topRated.rating.overall}★)`);

      // Step 4: Cheapest college
      console.log('\nStep 4: Cheapest college...');
      const cheapest = await College.findOne({ isActive: true }).sort({ 'fees.annual': 1 }).lean();
      console.log(`✓ Most affordable: ${cheapest.name} (₹${cheapest.fees.annual.toLocaleString()}/yr)`);

      // Step 5: Text index check
      console.log('\nStep 5: Text index check...');
      const indexes = await College.collection.indexInformation();
      if (indexes.name_text) {
        console.log('✓ Text index (name_text) present — search will work');
      } else {
        console.log('✗ Text index MISSING — re-run: npm run seed');
      }

      // Step 6: Sample search test
      console.log('\nStep 6: Sample search test...');
      const searchResults = await College.find({ $text: { $search: 'IIT' } }).lean();
      if (searchResults.length > 0) {
        console.log(`✓ Search returned ${searchResults.length} results for "IIT": ${searchResults.map(c => c.name).join(', ')}`);
      } else {
        console.log('✗ Search returned 0 results — text index may not have built yet');
      }

      // Step 7: State filter test
      console.log('\nStep 7: State filter test...');
      const stateResults = await College.find({ 'location.state': 'Maharashtra', isActive: true }).lean();
      if (stateResults.length > 0) {
        console.log(`✓ State filter works — found ${stateResults.length} college(s) in Maharashtra`);
      } else {
        console.log('✗ State filter failed to find colleges in Maharashtra');
      }
    }

    console.log('\n--- Diagnostics Complete: Every line should be ✓ ---');

  } catch (error) {
    console.error(`\n✗ Diagnostic Failed: ${error.message}`);
    console.log('\nSuggestions:');
    console.log('→ Check: Is MONGO_URI set in .env?');
    console.log('→ Check: Is your IP whitelisted in Atlas Network Access?');
    console.log('→ Check: Are username/password correct?');
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runDiagnostics();
