// src/App.jsx

import React from 'react';
import FinanceDashboard from './components/FinanceDashboard';
import { Analytics } from "@vercel/analytics/react"; // ← ADD THIS

export default function App() {
  return (
    <div className="main-app-wrapper"> 
      <FinanceDashboard />
      <Analytics />  {/* ← ADD THIS INSIDE THE RETURN */}
    </div>
  );
}
