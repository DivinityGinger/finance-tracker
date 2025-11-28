// src/components/StatsCards.jsx

import React from 'react';
import { Wallet, TrendingUp, Target, DollarSign } from 'lucide-react';

export default function StatsCards({ totalBudget, totalExpenses, totalSavings }) {
    const remaining = totalBudget - totalExpenses;

    return (
        <>
            <div className="stat-card"> 
                <div className="card-header">
                    <span className="card-label">Total Budget</span>
                    <Wallet className="icon-blue" size={24} /> 
                </div>
                <p className="card-value">${totalBudget.toLocaleString()}</p>
            </div>
            
            <div className="stat-card"> 
                <div className="card-header">
                    <span className="card-label">Total Spent</span>
                    <DollarSign className="icon-red" size={24} />
                </div>
                <p className="card-value">${totalExpenses.toLocaleString()}</p>
            </div>
            
            <div className="stat-card"> 
                <div className="card-header">
                    <span className="card-label">Remaining</span>
                    <TrendingUp className="icon-green" size={24} />
                </div>
                <p className="card-value">${remaining.toLocaleString()}</p>
            </div>
            
            <div className="stat-card"> 
                <div className="card-header">
                    <span className="card-label">Total Savings</span>
                    <Target className="icon-purple" size={24} />
                </div>
                <p className="card-value">${totalSavings.toLocaleString()}</p>
            </div>
        </>
    );
}