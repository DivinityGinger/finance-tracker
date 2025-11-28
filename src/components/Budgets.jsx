// src/components/Budgets.jsx (REWRITTEN)

import React, { useState } from 'react';
import { PiggyBank, Briefcase, Car, Home, Utensils, Plus, Pencil, Save, X } from 'lucide-react';

// Mock Data
const budgetData = [
    { id: 1, category: 'Housing', spent: 1050, limit: 1200, icon: Home, iconClass: 'icon-blue' },
    { id: 2, category: 'Food', spent: 350, limit: 450, icon: Utensils, iconClass: 'icon-orange' },
];

export default function Budgets({ budgets = budgetData, updateBudget, deleteBudget }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [newLimit, setNewLimit] = useState('');

    const handleEditClick = (budget) => {
        setEditingCategory(budget.category);
        setNewLimit(budget.limit.toString());
    };

    const handleSaveEdit = (category) => {
        // This function calls the updateBudget provided by FinanceDashboard.jsx
        if (updateBudget) {
            updateBudget(category, newLimit);
        }
        setEditingCategory(null);
    };

    const handleAddBudget = () => {
        console.log('Open Add Budget Modal or Form');
    };
    
    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Budget Management</h2>
                <button className="primary-action-button" onClick={handleAddBudget}>
                    <Plus size={18} />
                    <span>Add Budget</span>
                </button>
            </div>
          
            <div className="transaction-list-container">
                {budgets.map((budget) => {
                    const progress = (budget.spent / budget.limit) * 100;
                    const progressClass = progress > 90 ? 'danger' : progress > 70 ? 'warning' : 'safe';
                    const isEditing = budget.category === editingCategory;
    
                    return (
                        <div key={budget.category} className="budget-item transaction-item">
                            <div className="item-icon-wrapper">
                                <budget.icon className={budget.iconClass} size={24} />
                            </div>
                            
                            <div className="item-details">
                                <p className="item-name">{budget.category}</p>
                                <div className="budget-progress-bar">
                                    <div 
                                        className={`budget-progress-fill ${progressClass}`}
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Limit/Amount Display & Edit Field */}
                            <div className="item-meta budget-meta">
                                {isEditing ? (
                                    <input
                                        className="edit-input amount-input"
                                        type="number"
                                        value={newLimit}
                                        onChange={(e) => setNewLimit(e.target.value)}
                                    />
                                ) : (
                                    <p className="item-amount">${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}</p>
                                )}
                                <p className="item-date">{progress.toFixed(0)}% Used</p>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="action-buttons-group">
                                {isEditing ? (
                                    <>
                                        <button className="edit-action-button save" onClick={() => handleSaveEdit(budget.category)}><Save size={18} /></button>
                                        <button className="edit-action-button cancel" onClick={() => setEditingCategory(null)}><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-action-button" onClick={() => handleEditClick(budget)}><Pencil size={18} /></button>
                                        <button className="edit-action-button delete" onClick={() => deleteBudget && deleteBudget(budget.category)}><X size={18} /></button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}