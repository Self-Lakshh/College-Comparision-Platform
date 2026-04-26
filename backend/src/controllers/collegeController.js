import College from '../models/College.js';
import CompareSession from '../models/CompareSession.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';


// Fetch paginated colleges with search and filtering

export const getColleges = async (req, res, next) => {
  try {
    const {
      search,
      state,
      type,
      minFees,
      maxFees,
      minRating,
      sort = 'rating_desc',
      page = 1,
      limit = 12
    } = req.query;

    const query = { isActive: true };
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(Math.max(1, Number(limit)), 50);

    // text search using the MongoDB text index
    if (search) {
      query.$text = { $search: search };
    }

    // filtering logic
    if (state) query['location.state'] = { $regex: new RegExp(state, 'i') };
    if (type) query.type = type;
    
    if (minFees || maxFees) {
      query['fees.annual'] = {};
      if (minFees) query['fees.annual'].$gte = Number(minFees);
      if (maxFees) query['fees.annual'].$lte = Number(maxFees);
    }

    if (minRating) {
      query['rating.overall'] = { $gte: Number(minRating) };
    }

    // sorting logic
    const sortOptions = {
      rating_desc: { 'rating.overall': -1 },
      rating_asc: { 'rating.overall': 1 },
      fees_asc: { 'fees.annual': 1 },
      fees_desc: { 'fees.annual': -1 },
      nirf_asc: { nirfRank: 1 },
      name_asc: { name: 1 }
    };

    const skip = (pageNum - 1) * limitNum;

    // execute queries in parallel to reduce response time
    const [colleges, total] = await Promise.all([
      College.find(query)
        .sort(sortOptions[sort] || sortOptions.rating_desc)
        .skip(skip)
        .limit(limitNum)
        .select('-__v')
        .lean(),
      College.countDocuments(query)
    ]);

    return successResponse(res, colleges, {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get distinct list of states for the filter dropdown
 */
export const getStates = async (req, res, next) => {
  try {
    const states = await College.distinct('location.state', { isActive: true });
    return successResponse(res, states.sort());
  } catch (error) {
    next(error);
  }
};

/**
 * Get single college by ID
 */
export const getCollegeById = async (req, res, next) => {
  try {
    const college = await College.findById(req.params.id).select('-__v').lean();
    if (!college) {
      return errorResponse(res, 'College not found', 404);
    }
    return successResponse(res, college);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new college
 */
export const createCollege = async (req, res, next) => {
  try {
    const college = await College.create(req.body);
    return successResponse(res, college, null, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Log a comparison session and update analytics
 */
export const compareColleges = async (req, res, next) => {
  try {
    const { collegeIds } = req.body;

    // create the session record
    const session = await CompareSession.create({ colleges: collegeIds });

    // increment compareCount in background - don't block the response for analytics
    College.updateMany(
      { _id: { $in: collegeIds } },
      { $inc: { compareCount: 1 } }
    ).catch(err => console.error(`[${new Date().toISOString()}] Failed to increment compareCount:`, err));

    return successResponse(res, session, null, 201);
  } catch (error) {
    next(error);
  }
};
