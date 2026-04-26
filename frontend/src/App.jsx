import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CompareProvider } from './context/CompareContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <CompareProvider>
        <TooltipProvider>
          <AppRoutes />
        </TooltipProvider>
      </CompareProvider>
    </Router>
  );
}

export default App;
