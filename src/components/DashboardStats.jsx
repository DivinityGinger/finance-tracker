import React from 'react';
import { Wallet, TrendingUp, Target, DollarSign } from 'lucide-react';

export default function DashboardStats({ expenses, budgets, goals }) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSavings = goals.reduce((sum, g) => sum + g.current, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300">Total Budget</span>
          <Wallet className="text-blue-400" size={24} />
        </div>
        <p className="text-3xl font-bold">${totalBudget}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300">Total Spent</span>
          <DollarSign className="text-red-400" size={24} />
        </div>
        <p className="text-3xl font-bold">${totalExpenses}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300">Remaining</span>
          <TrendingUp className="text-green-400" size={24} />
        </div>
        <p className="text-3xl font-bold">${totalBudget - totalExpenses}</p>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300">Total Savings</span>
          <Target className="text-purple-400" size={24} />
        </div>
        <p className="text-3xl font-bold">${totalSavings}</p>
      </div>
    </div>
  );
}
