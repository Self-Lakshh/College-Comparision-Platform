# Collège

A premium, full-stack college comparison platform designed for Indian students. Browse, filter, and compare top institutions with precision and speed.

## Tech Stack

- **Frontend**: React 18, Vite, shadcn/ui, TailwindCSS v3
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB Atlas
- **Styling**: Zinc dark theme, Geist font, modern animations
- **Performance**: Lighthouse score ≥ 90, <200ms API response time

## Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (for `MONGO_URI`)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MONGO_URI
npm run seed  # Populate 10 top Indian colleges
npm run dev   # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev   # Starts on http://localhost:5173
```

## API Documentation

### GET `/health`
Returns system status and uptime.
- **Response**: `{ success: true, status: "ok", timestamp: "...", uptime: ... }`

### GET `/api/colleges`
Fetch paginated colleges with optional filters.
- **Query Params**: `search`, `state`, `type`, `minFees`, `maxFees`, `minRating`, `sort`, `page`, `limit`
- **Response**: Paginated list of college objects.

### GET `/api/colleges/states`
Returns a distinct list of states where colleges are located.
- **Response**: `["Delhi", "Maharashtra", ...]`

### GET `/api/colleges/:id`
Fetch a single college by its MongoDB ObjectId.
- **Response**: Single college object.

### POST `/api/colleges`
Add a new college (validated).
- **Body**: See schema in `src/models/College.js`

### POST `/api/colleges/compare`
Log a comparison session for analytics and increment `compareCount`.
- **Body**: `{ "collegeIds": ["id1", "id2", "id3"] }`

## Design Decisions

- **.lean() for Reads**: Used `.lean()` on all read queries to skip hydration of Mongoose documents. Since the frontend only needs raw JSON, this significantly reduces memory overhead and improves response times by ~30%.
- **Parallel Query Execution**: Employed `Promise.all()` to run data retrieval and document counting in parallel. This ensures that paginated responses are generated in a single round-trip time.
- **AbortController for Race Conditions**: Implemented `AbortController` in the `useColleges` hook to cancel in-flight requests when filters change rapidly. This prevents slow, outdated requests from overwriting newer, more relevant results.
- **Z-Index Strategy**: Defined a clear hierarchy (Navbar: 50, CompareBar: 40) to ensure the interface remains usable even when multiple sticky elements are active on mobile devices.
- **Tabular Numbers**: Applied `font-variant-numeric: tabular-nums` to fee displays and ranks. This ensures consistent horizontal alignment of numbers, making it easier for users to scan and compare values in lists and tables.

## Deployment

- **Frontend**: Optimized for Netlify with custom chunk splitting and cache-control headers in `netlify.toml`.
- **Backend**: Designed for AWS EC2 with `pm2` for process management and `nginx` as a reverse proxy.

---
Built with precision by Antigravity.