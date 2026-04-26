/**
 * Standard API response formatter to ensure consistency across all endpoints
 */
export const successResponse = (res, data, pagination = null, statusCode = 200) => {
  const response = {
    success: true,
    data
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (res, message, statusCode = 500, details = null) => {
  const response = {
    success: false,
    error: message
  };

  if (details) {
    response.details = details;
  }

  return res.status(statusCode).json(response);
};
