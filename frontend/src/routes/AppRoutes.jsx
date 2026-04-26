import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './RootLayout';
import { ROUTES } from './routeConfig';

// Lazy load pages for performance
const Home = lazy(() => import('../pages/Home'));
const Compare = lazy(() => import('../pages/Compare'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COMPARE} element={<Compare />} />
        
        {/* Fallback for unmatched routes */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
