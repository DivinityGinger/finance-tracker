// src/components/Overview.jsx

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', spent: 400, saved: 240 },
  { name: 'Feb', spent: 300, saved: 139 },
  { name: 'Mar', spent: 200, saved: 980 },
  { name: 'Apr', spent: 278, saved: 390 },
  { name: 'May', spent: 189, saved: 480 },
];

export default function Overview() {
  return (
    <div className="tab-content-area">
      <h2 className="tab-content-heading">Financial Overview</h2>
      
      <div className="overview-grid">
        
        {/* Main Chart Area */}
        <div className="chart-panel">
          <h3 className="chart-title">Spending & Savings Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" /> 
                <XAxis dataKey="name" stroke="#94a3b8" /> 
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Area type="monotone" dataKey="spent" stroke="#ef4444" fillOpacity={0.8} fill="#ef4444" name="Spent" />
                <Area type="monotone" dataKey="saved" stroke="#10b981" fillOpacity={0.8} fill="#10b981" name="Saved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Card */}
        <div className="summary-panel">
          <h3 className="chart-title">Monthly Summary</h3>
          <ul className="summary-list">
            <li><span className="summary-label">Income:</span> <span className="summary-value green">$5,000</span></li>
            <li><span className="summary-label">Net Flow:</span> <span className="summary-value red">-$150</span></li>
            <li><span className="summary-label">Investments:</span> <span className="summary-value">$800</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}