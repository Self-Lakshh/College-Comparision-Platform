import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CompareProvider } from './context/CompareContext';
import Navbar from './components/Navbar';
import CompareBar from './components/CompareBar';
import Home from './pages/Home';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <CompareProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compare" element={<Compare />} />
            </Routes>
            
            <CompareBar />
            
            {/* Global Toast Notifications */}
            <Toaster 
              position="top-right" 
              theme="dark" 
              richColors 
              toastOptions={{
                className: 'bg-zinc-900 border-zinc-800 text-zinc-100',
              }}
            />
          </div>
        </TooltipProvider>
      </CompareProvider>
    </Router>
  );
}

export default App;
