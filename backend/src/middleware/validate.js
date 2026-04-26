import { errorResponse } from '../utils/apiResponse.js';

/**
 * Validates the college creation body before it hits the database
 * This provides a fast fail-early mechanism before Mongoose schema validation
 */
export const validateCollege = (req, res, next) => {
  const { name, location, type, fees, rating } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('name: must be a string with at least 2 characters');
  }
  
  if (!location?.city || !location?.state) {
    errors.push('location: must include city and state');
  }
  
  const validTypes = ['Public', 'Private', 'Deemed', 'Autonomous'];
  if (!type || !validTypes.includes(type)) {
    errors.push(`type: must be one of ${validTypes.join(', ')}`);
  }

  if (fees?.annual === undefined || typeof fees.annual !== 'number' || fees.annual < 0) {
    errors.push('fees.annual: must be a non-negative number');
  }

  if (rating?.overall === undefined || typeof rating.overall !== 'number' || rating.overall < 0 || rating.overall > 5) {
    errors.push('rating.overall: must be between 0 and 5');
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Validation failed', 400, errors);
  }

  next();
};

/**
 * Validates the comparison payload
 */
export const validateCompare = (req, res, next) => {
  const { collegeIds } = req.body;
  
  if (!Array.isArray(collegeIds) || collegeIds.length < 2 || collegeIds.length > 3) {
    return errorResponse(res, 'Provide at least 2 college IDs to compare', 400);
  }

  next();
};
