import React, { useState } from 'react';
import { Edit2, Trash2, Save, Plus } from 'lucide-react';

export default function GoalsTab({ goals, setGoals }) {
  const [newGoal, setNewGoal] = useState({ title: '', target: '', current: 0 });
  const [editingGoal, setEditingGoal] = useState(null);

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      setGoals([...goals, { ...newGoal, id: Date.now(), current: 0 }]);
      setNewGoal({ title: '', target: '', current: 0 });
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateGoal = (id, updates) => {
    setGoals(goals.map(g => (g.id === id ? { ...g, ...updates } : g)));
    setEditingGoal(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.target}
          onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <button
          onClick={addGoal}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Your Goals</h3>
      <div className="space-y-3">
        {goals.map(goal => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          return (
            <div key={goal.id} className="bg-slate-800/50 rounded-lg p-4">
              {editingGoal === goal.id ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) => updateGoal(goal.id, { title: e.target.value })}
                    className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    value={goal.target}
                    onChange={(e) => updateGoal(goal.id, { target: parseFloat(e.target.value) })}
                    className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    value={goal.current}
                    onChange={(e) => updateGoal(goal.id, { current: parseFloat(e.target.value) })}
                    className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => setEditingGoal(null)}
                    className="bg-green-500 hover:bg-green-600 rounded px-3 py-2 flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Done
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <p className="font-semibold">{goal.title}</p>
                    <div className="bg-white/20 h-4 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">
                      ${goal.current} / ${goal.target}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingGoal(goal.id)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
