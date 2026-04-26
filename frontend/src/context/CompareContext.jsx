import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

const CompareContext = createContext();

const MAX_COMPARE = 3;

export const CompareProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);

  const addCollege = useCallback((college) => {
    setSelected((prev) => {
      if (prev.some((c) => c._id === college._id)) {
        return prev;
      }
      if (prev.length >= MAX_COMPARE) {
        toast.warning(`You can compare up to ${MAX_COMPARE} colleges`);
        return prev;
      }
      return [...prev, college];
    });
  }, []);

  const removeCollege = useCallback((id) => {
    setSelected((prev) => prev.filter((c) => c._id !== id));
  }, []);

  const isSelected = useCallback((id) => {
    return selected.some((c) => c._id === id);
  }, [selected]);

  const clearAll = useCallback(() => {
    setSelected([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        selected,
        addCollege,
        removeCollege,
        isSelected,
        clearAll,
        MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
