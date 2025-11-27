import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ['overview', 'expenses', 'budgets', 'goals'];

  return (
    <div className="flex gap-4 mb-6 border-b border-white/20">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 px-4 capitalize transition-colors ${
            activeTab === tab
              ? 'border-b-2 border-blue-400 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
