import React, { useState } from 'react';
import { Edit2, Trash2, Save, Plus } from 'lucide-react';

export default function BudgetsTab({ budgets, setBudgets }) {
  const [newBudget, setNewBudget] = useState({ category: '', limit: '' });
  const [editingBudget, setEditingBudget] = useState(null);

  const addBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([
        ...budgets,
        { id: Date.now(), category: newBudget.category, limit: parseFloat(newBudget.limit), spent: 0 },
      ]);
      setNewBudget({ category: '', limit: '' });
    }
  };

  const deleteBudget = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const updateBudget = (id, updates) => {
    setBudgets(budgets.map(b => (b.id === id ? { ...b, ...updates } : b)));
    setEditingBudget(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Add New Budget</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Category"
          value={newBudget.category}
          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="number"
          placeholder="Budget Limit"
          value={newBudget.limit}
          onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <button
          onClick={addBudget}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Existing Budgets</h3>
      <div className="space-y-3">
        {budgets.map(budget => (
          <div key={budget.id} className="bg-slate-800/50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-5 items-center gap-3">
            {editingBudget === budget.id ? (
              <>
                <input
                  type="text"
                  value={budget.category}
                  onChange={(e) => updateBudget(budget.id, { category: e.target.value })}
                  className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                />
                <input
                  type="number"
                  value={budget.limit}
                  onChange={(e) => updateBudget(budget.id, { limit: parseFloat(e.target.value) })}
                  className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                />
                <span className="text-white">${budget.spent} spent</span>
                <div></div>
                <button
                  onClick={() => setEditingBudget(null)}
                  className="bg-green-500 hover:bg-green-600 rounded px-3 py-2 flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Done
                </button>
              </>
            ) : (
              <>
                <span className="text-white font-semibold">{budget.category}</span>
                <span className="text-slate-400">${budget.limit}</span>
                <span className="text-red-400">${budget.spent}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingBudget(budget.id)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
