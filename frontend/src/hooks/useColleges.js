import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchColleges } from '../utils/api';

/**
 * Hook to manage college data fetching with filters and pagination
 */
export const useColleges = (initialFilters = {}) => {
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  
  // AbortController to handle race conditions during rapid filter changes
  const abortControllerRef = useRef(null);

  const loadColleges = useCallback(async (currentFilters, page = 1) => {
    // Abort the previous request if it's still in flight
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const data = await fetchColleges({ ...currentFilters, page }, abortControllerRef.current.signal);
      setColleges(data.data);
      setPagination(data.pagination);

      // Save search to history if it exists
      if (currentFilters.search && currentFilters.search.trim().length > 2) {
        const history = JSON.parse(localStorage.getItem('college_history') || '[]');
        const entry = { query: currentFilters.search, timestamp: new Date().toISOString() };
        const newHistory = [entry, ...history.filter(h => h.query !== entry.query)].slice(0, 5);
        localStorage.setItem('college_history', JSON.stringify(newHistory));
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColleges(filters);
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [filters, loadColleges]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const changePage = useCallback((page) => {
    loadColleges(filters, page);
  }, [filters, loadColleges]);

  return {
    colleges,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage
  };
};
