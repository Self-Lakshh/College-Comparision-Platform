const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * All API calls for the platform
 * Centralized here to ensure consistent error handling and URL construction
 */

export const fetchColleges = async (filters = {}, signal) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/api/colleges?${params.toString()}`, { signal });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch colleges');
  }

  return data;
};

export const fetchStates = async () => {
  const response = await fetch(`${API_URL}/api/colleges/states`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch states');
  }

  return data.data;
};

export const fetchCollegeById = async (id) => {
  const response = await fetch(`${API_URL}/api/colleges/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'College not found');
  }

  return data.data;
};

export const logCompareSession = async (collegeIds) => {
  const response = await fetch(`${API_URL}/api/colleges/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collegeIds })
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to log comparison');
  }

  return data.data;
};
