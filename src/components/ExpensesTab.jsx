import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ExpenseItem from './ExpenseItem';

export default function ExpensesTab({ expenses, setExpenses, budgets, setBudgets }) {
  const [newExpense, setNewExpense] = useState({ category: 'Food', amount: '', description: '' });
  const [editingExpense, setEditingExpense] = useState(null);

  const addExpense = () => {
    if (newExpense.amount && newExpense.description) {
      const expense = {
        id: Date.now(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: new Date().toISOString().split('T')[0],
        description: newExpense.description,
      };
      setExpenses([...expenses, expense]);
      setBudgets(budgets.map(b =>
        b.category === newExpense.category
          ? { ...b, spent: b.spent + parseFloat(newExpense.amount) }
          : b
      ));
      setNewExpense({ category: 'Food', amount: '', description: '' });
    }
  };

  const deleteExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    setExpenses(expenses.filter(e => e.id !== id));
    setBudgets(budgets.map(b =>
      b.category === expense.category
        ? { ...b, spent: Math.max(0, b.spent - expense.amount) }
        : b
    ));
  };

  const updateExpense = (id, updates) => {
    const oldExpense = expenses.find(e => e.id === id);
    const newExp = { ...oldExpense, ...updates };
    setExpenses(expenses.map(e => e.id === id ? newExp : e));
    setBudgets(budgets.map(b => {
      if (b.category === oldExpense.category && oldExpense.category !== newExp.category) {
        return { ...b, spent: Math.max(0, b.spent - oldExpense.amount) };
      }
      if (b.category === newExp.category) {
        const adjustment = oldExpense.category === newExp.category
          ? newExp.amount - oldExpense.amount
          : newExp.amount;
        return { ...b, spent: b.spent + adjustment };
      }
      return b;
    }));
    setEditingExpense(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        >
          {budgets.map(b => (
            <option key={b.category} value={b.category}>{b.category}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white"
        />
        <button
          onClick={addExpense}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.slice().reverse().map(expense => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            budgets={budgets}
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
            updateExpense={updateExpense}
            deleteExpense={deleteExpense}
          />
        ))}
      </div>
    </div>
  );
}
