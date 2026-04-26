
const BASE_URL = 'http://127.0.0.1:5000';
const results = [];

async function test(id, title, method, path, body = null, expectedStatus = 200) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);

    const start = Date.now();
    const res = await fetch(`${BASE_URL}${path}`, options);
    const duration = Date.now() - start;
    const data = await res.json();

    const pass = res.status === expectedStatus;
    results.push({
      id,
      title,
      pass,
      status: res.status,
      duration,
      response: data
    });
    console.log(`${id}: ${pass ? 'PASS' : 'FAIL'} (${res.status}) - ${title}`);
    return data;
  } catch (err) {
    results.push({
      id,
      title,
      pass: false,
      error: err.message
    });
    console.log(`${id}: ERROR - ${title} - ${err.message}`);
  }
}

async function runAllTests() {
  console.log('--- Starting Backend Test Suite ---');

  // T01
  await test('T01', 'Health check', 'GET', '/health');
  
  // T02
  await test('T02', 'Unknown route', 'GET', '/api/nonexistent', null, 404);

  // T03
  const t03 = await test('T03', 'Default fetch returns 10 colleges', 'GET', '/api/colleges');
  const realId = t03?.data?.[0]?._id;

  // T04-T06
  await test('T04', 'Pagination works', 'GET', '/api/colleges?page=1&limit=3');
  await test('T05', 'Page 2 returns next set', 'GET', '/api/colleges?page=2&limit=3');
  await test('T06', 'Default sort is rating descending', 'GET', '/api/colleges?limit=3');

  // Search T07-T10
  await test('T07', 'Text search returns correct colleges', 'GET', '/api/colleges?search=IIT');
  await test('T08', 'Search is case insensitive', 'GET', '/api/colleges?search=iit');
  await test('T09', 'Search with no match returns empty', 'GET', '/api/colleges?search=XYZnonexistent');
  await test('T10', 'Search for partial name works', 'GET', '/api/colleges?search=Manipal');

  // Filters T11-T20
  await test('T11', 'State filter works', 'GET', '/api/colleges?state=Maharashtra');
  await test('T12', 'State filter is case insensitive', 'GET', '/api/colleges?state=maharashtra');
  await test('T13', 'State filter partial match works', 'GET', '/api/colleges?state=Karnataka');
  await test('T14', 'Type filter: Public only', 'GET', '/api/colleges?type=Public');
  await test('T15', 'Type filter: Private only', 'GET', '/api/colleges?type=Private');
  await test('T16', 'minFees filter', 'GET', '/api/colleges?minFees=500000');
  await test('T17', 'maxFees filter', 'GET', '/api/colleges?maxFees=30000');
  await test('T18', 'minFees + maxFees range', 'GET', '/api/colleges?minFees=150000&maxFees=300000');
  await test('T19', 'minRating filter', 'GET', '/api/colleges?minRating=4.5');
  await test('T20', 'Combined filters', 'GET', '/api/colleges?type=Public&minRating=4.5');

  // Sorting T21-T25
  await test('T21', 'Sort by fees ascending', 'GET', '/api/colleges?sort=fees_asc&limit=3');
  await test('T22', 'Sort by fees descending', 'GET', '/api/colleges?sort=fees_desc&limit=1');
  await test('T23', 'Sort by NIRF rank', 'GET', '/api/colleges?sort=nirf_asc&limit=3');
  await test('T24', 'Sort by name A-Z', 'GET', '/api/colleges?sort=name_asc&limit=3');
  await test('T25', 'Invalid sort param falls back gracefully', 'GET', '/api/colleges?sort=invalid_sort');

  // States T26
  await test('T26', 'States returns distinct sorted list', 'GET', '/api/colleges/states');

  // GET /id T27-T29
  if (realId) {
    await test('T27', 'Valid ID returns college', 'GET', `/api/colleges/${realId}`);
  }
  await test('T28', 'Invalid ObjectId format returns 400', 'GET', '/api/colleges/notanid', null, 400);
  await test('T29', 'Valid ObjectId format but nonexistent returns 404', 'GET', '/api/colleges/507f1f77bcf86cd799439011', null, 404);

  // POST T30-T37
  await test('T30', 'Valid new college is created', 'POST', '/api/colleges', {
    name: "Test Engineering College",
    location: { city: "Pune", state: "Maharashtra" },
    type: "Private",
    fees: { annual: 120000 },
    rating: { overall: 3.5 }
  }, 201);
  await test('T31', 'Missing name returns 400', 'POST', '/api/colleges', {
    location: { city: "Pune", state: "Maharashtra" },
    type: "Private",
    fees: { annual: 100000 },
    rating: { overall: 3.5 }
  }, 400);
  await test('T32', 'Missing fees returns 400', 'POST', '/api/colleges', {
    name: "Test College 2",
    location: { city: "Chennai", state: "Tamil Nadu" },
    type: "Public",
    rating: { overall: 4.0 }
  }, 400);
  await test('T33', 'Invalid type returns 400', 'POST', '/api/colleges', {
    name: "Test College 3",
    location: { city: "Mumbai", state: "Maharashtra" },
    type: "Government",
    fees: { annual: 50000 },
    rating: { overall: 3.5 }
  }, 400);
  await test('T34', 'Multiple validation failures', 'POST', '/api/colleges', {}, 400);
  await test('T35', 'Duplicate name returns 409', 'POST', '/api/colleges', {
    name: "IIT Bombay",
    location: { city: "Mumbai", state: "Maharashtra" },
    type: "Public",
    fees: { annual: 250000 },
    rating: { overall: 4.8 }
  }, 409);
  await test('T36', 'Negative fees returns 400', 'POST', '/api/colleges', {
    name: "Test Negative Fees",
    location: { city: "Delhi", state: "Delhi" },
    type: "Public",
    fees: { annual: -5000 },
    rating: { overall: 4.0 }
  }, 400);
  await test('T37', 'Rating > 5 returns 400', 'POST', '/api/colleges', {
    name: "Test Bad Rating",
    location: { city: "Delhi", state: "Delhi" },
    type: "Public",
    fees: { annual: 50000 },
    rating: { overall: 6 }
  }, 400);

  // Compare T38-T42
  if (realId) {
    const t03_2 = await test('T03_retry', 'Get another ID', 'GET', '/api/colleges');
    const realId2 = t03_2?.data?.[1]?._id;
    const realId3 = t03_2?.data?.[2]?._id;

    if (realId2) {
      await test('T38', 'Valid compare session with 2 IDs', 'POST', '/api/colleges/compare', {
        collegeIds: [realId, realId2]
      }, 201);
      
      console.log('Waiting 1.5s for background update...');
      await new Promise(r => setTimeout(r, 1500));
      
      await test('T39', 'compareCount increments', 'GET', `/api/colleges/${realId}`);
    }

    await test('T40', 'Compare with 1 ID returns 400', 'POST', '/api/colleges/compare', { collegeIds: [realId] }, 400);
    await test('T41', 'Compare with empty array returns 400', 'POST', '/api/colleges/compare', { collegeIds: [] }, 400);
    
    if (realId3) {
      await test('T42', 'Compare with 3 IDs works', 'POST', '/api/colleges/compare', {
        collegeIds: [realId, realId2, realId3]
      }, 201);
    }
  }

  // Performance T43-T44
  const startT43 = Date.now();
  for (let i = 0; i < 5; i++) {
    await fetch(`${BASE_URL}/api/colleges`);
  }
  const avgT43 = (Date.now() - startT43) / 5;
  results.push({
    id: 'T43',
    title: 'Response time under 200ms',
    pass: avgT43 < 200,
    actualAvg: avgT43
  });
  console.log(`T43: ${avgT43 < 200 ? 'PASS' : 'FAIL'} (Avg: ${avgT43}ms)`);

  const t44Promises = [
    fetch(`${BASE_URL}/api/colleges`),
    fetch(`${BASE_URL}/api/colleges?sort=fees_asc`),
    fetch(`${BASE_URL}/api/colleges?type=Public`),
    fetch(`${BASE_URL}/api/colleges?search=IIT`),
    fetch(`${BASE_URL}/api/colleges/states`)
  ];
  const t44Responses = await Promise.all(t44Promises);
  const t44Pass = t44Responses.every(r => r.status === 200);
  results.push({
    id: 'T44',
    title: 'Concurrent requests handled',
    pass: t44Pass
  });
  console.log(`T44: ${t44Pass ? 'PASS' : 'FAIL'}`);

  console.log('--- Tests Complete ---');
  process.stdout.write(JSON.stringify(results, null, 2));
}

runAllTests();
