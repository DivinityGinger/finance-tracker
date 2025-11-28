// src/components/Budgets.jsx (REWRITTEN - Uses ICON_MAP)

import React, { useState } from 'react';
import { Plus, Pencil, Save, X, Trash2, Briefcase } from 'lucide-react';

export default function Budgets({ budgets, addBudget, updateBudget, deleteBudget, ICON_MAP }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [newLimit, setNewLimit] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newBudgetForm, setNewBudgetForm] = useState({ category: '', limit: '' });

    const handleNewBudgetChange = (e) => {
        setNewBudgetForm({ ...newBudgetForm, [e.target.name]: e.target.value });
    };

    const handleNewBudgetSubmit = () => {
        if (newBudgetForm.category && newBudgetForm.limit && addBudget) {
            addBudget(newBudgetForm);
            setNewBudgetForm({ category: '', limit: '' });
            setIsAdding(false);
        }
    };
    
    const handleEditClick = (budget) => {
        setIsAdding(false);
        setEditingCategory(budget.category);
        setNewLimit(budget.limit.toString());
    };

    const handleSaveEdit = (category) => {
        if (updateBudget) { updateBudget(category, newLimit); }
        setEditingCategory(null);
    };

    const getBudgetVisuals = (budget) => {
        const iconData = ICON_MAP[budget.icon] ? ICON_MAP[budget.icon] : ICON_MAP.Briefcase;
        return { Icon: iconData.Icon, class: iconData.class };
    };

    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Budget Management</h2>
                <button 
                    className="primary-action-button" 
                    onClick={() => { setIsAdding(prev => !prev); setEditingCategory(null); }}
                >
                    <Plus size={18} />
                    <span>{isAdding ? 'Cancel Add' : 'Add Budget'}</span>
                </button>
            </div>

            {/* Budget Creation Form */}
            {isAdding && (
                <div className="creation-form-panel">
                    <input className="edit-input" type="text" name="category" placeholder="New Category (e.g., Travel)" value={newBudgetForm.category} onChange={handleNewBudgetChange} />
                    <input className="edit-input amount-input" type="number" name="limit" placeholder="Limit ($)" value={newBudgetForm.limit} onChange={handleNewBudgetChange} />
                    <button className="primary-action-button" onClick={handleNewBudgetSubmit}>
                        <Save size={18} /> 
                        <span>Save New Budget</span>
                    </button>
                </div>
            )}
          
            <div className="transaction-list-container">
                {budgets.length === 0 && <p className="empty-state-text">No budgets set. Add one!</p>}
                {budgets.map((budget) => {
                    const progress = (budget.spent / budget.limit) * 100;
                    const progressClass = progress > 90 ? 'danger' : progress > 70 ? 'warning' : 'safe';
                    const isEditing = budget.category === editingCategory;
                    
                    const { Icon, class: iconClass } = getBudgetVisuals(budget);
    
                    return (
                        <div key={budget.category} className="budget-item transaction-item">
                            <div className="item-icon-wrapper">
                                <Icon className={iconClass} size={24} />
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
                            
                            <div className="item-meta budget-meta">
                                {isEditing ? (
                                    <input className="edit-input amount-input" type="number" value={newLimit} onChange={(e) => setNewLimit(e.target.value)} />
                                ) : (
                                    <p className="item-amount">${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}</p>
                                )}
                                <p className="item-date">{progress.toFixed(0)}% Used</p>
                            </div>
                            
                            <div className="action-buttons-group">
                                {isEditing ? (
                                    <>
                                        <button className="edit-action-button save" onClick={() => handleSaveEdit(budget.category)}><Save size={18} /></button>
                                        <button className="edit-action-button cancel" onClick={() => setEditingCategory(null)}><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-action-button" onClick={() => handleEditClick(budget)}><Pencil size={18} /></button>
                                        <button className="edit-action-button delete" onClick={() => deleteBudget && deleteBudget(budget.category)}><Trash2 size={18} /></button>
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