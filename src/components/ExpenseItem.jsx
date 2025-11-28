import React from 'react';
import { Edit2, Trash2, Save } from 'lucide-react';

export default function ExpenseItem({ expense, budgets, editingExpense, setEditingExpense, updateExpense, deleteExpense }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      {editingExpense === expense.id ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={expense.category}
            onChange={(e) => updateExpense(expense.id, { category: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          >
            {budgets.map(b => (
              <option key={b.category} value={b.category}>{b.category}</option>
            ))}
          </select>
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => updateExpense(expense.id, { amount: parseFloat(e.target.value) })}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            value={expense.description}
            onChange={(e) => updateExpense(expense.id, { description: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
          <input
            type="date"
            value={expense.date}
            onChange={(e) => updateExpense(expense.id, { date: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white"
          />
          <button
            onClick={() => setEditingExpense(null)}
            className="bg-green-500 hover:bg-green-600 rounded px-3 py-2 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Done
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{expense.description}</p>
            <p className="text-sm text-slate-400">{expense.category} • {expense.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">${expense.amount}</span>
            <button
              onClick={() => setEditingExpense(expense.id)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
