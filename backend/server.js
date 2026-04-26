/**
 * Deployment:
 * - Running on AWS EC2 (Ubuntu 22.04)
 * - nginx reverse proxies port 80 -> 5000
 * - pm2 start server.js --name college-api
 * - pm2 save && pm2 startup
 * - Set env vars via: sudo nano /etc/environment
 */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './src/config/db.js';
import collegeRoutes from './src/routes/colleges.js';
import errorHandler from './src/middleware/errorHandler.js';

// Initialize express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS === '*' 
    ? '*' 
    : (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*'),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' })); // Body parser with size limit for security

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/colleges', collegeRoutes);

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Error Handling (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
