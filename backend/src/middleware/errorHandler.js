import { errorResponse } from '../utils/apiResponse.js';

/**
 * Global error handler to catch all unhandled errors and format them for the client
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Unhandled error:`, err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(val => val.message);
    return errorResponse(res, 'Validation failed', 400, details);
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, `A college with this ${field} already exists`, 409);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  // Default to 500 server error
  return errorResponse(res, err.message || 'Internal Server Error', 500);
};

export default errorHandler;
