// src/components/Expenses.jsx (REWRITTEN - Uses ICON_MAP)

import React, { useState } from 'react';
import { Plus, Pencil, Save, X, Trash2, ShoppingCart } from 'lucide-react';

export default function Expenses({ 
    expenses, 
    addExpense, 
    deleteExpense, 
    updateExpense,
    availableCategories,
    budgets, // Used to find the icon details
    ICON_MAP
}) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newExpenseForm, setNewExpenseForm] = useState({ 
        category: availableCategories.length > 0 ? availableCategories[0] : '', 
        amount: '', 
        description: '' 
    });

    const handleNewExpenseChange = (e) => {
        setNewExpenseForm({ ...newExpenseForm, [e.target.name]: e.target.value });
    };

    const handleNewExpenseSubmit = () => {
        if (newExpenseForm.amount && newExpenseForm.description && addExpense) {
            addExpense(newExpenseForm);
            setNewExpenseForm({ category: availableCategories.length > 0 ? availableCategories[0] : '', amount: '', description: '' });
            setIsAdding(false);
        }
    };

    const handleEditClick = (expense) => {
        setIsAdding(false);
        setEditingId(expense.id);
        setEditForm({ amount: expense.amount.toString(), description: expense.description, category: expense.category });
    };

    const handleSaveEdit = (id) => {
        const updates = { amount: parseFloat(editForm.amount), description: editForm.description, category: editForm.category };
        if (updateExpense) { updateExpense(id, updates); }
        setEditingId(null);
    };

    const handleFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    // New logic: Get icon and class from the corresponding budget object via the map
    const getExpenseVisuals = (category) => {
        const budget = budgets.find(b => b.category === category);
        const iconData = budget && ICON_MAP[budget.icon] ? ICON_MAP[budget.icon] : ICON_MAP.ShoppingCart;
        return { Icon: iconData.Icon, class: iconData.class }; 
    };

    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Detailed Expenses</h2>
                <button 
                    className="primary-action-button" 
                    onClick={() => { setIsAdding(prev => !prev); setEditingId(null); }}
                >
                    <Plus size={18} /> 
                    <span>{isAdding ? 'Cancel Add' : 'Add Expense'}</span>
                </button>
            </div>
            
            {/* Expense Creation Form */}
            {isAdding && (
                <div className="creation-form-panel">
                    <input className="edit-input" type="text" name="description" placeholder="Description (e.g., Coffee, Rent)" value={newExpenseForm.description} onChange={handleNewExpenseChange} />
                    <input className="edit-input amount-input" type="number" name="amount" placeholder="Amount" value={newExpenseForm.amount} onChange={handleNewExpenseChange} />
                    <select className="edit-select" name="category" value={newExpenseForm.category} onChange={handleNewExpenseChange}>
                        {availableCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                    <button className="primary-action-button" onClick={handleNewExpenseSubmit}>
                        <Save size={18} /> 
                        <span>Save New Expense</span>
                    </button>
                </div>
            )}

            <div className="transaction-list-container">
                {expenses.length === 0 && <p className="empty-state-text">No expenses logged yet. Add one!</p>}
                {expenses.map((expense) => {
                    const { Icon, class: iconClass } = getExpenseVisuals(expense.category);
                    const isEditing = expense.id === editingId;

                    return (
                        <div key={expense.id} className="transaction-item">
                            <div className="item-icon-wrapper">
                                <Icon className={iconClass} size={24} />
                            </div>
                            
                            <div className="item-details">
                                {/* ... (details and editing logic) ... */}
                                {isEditing ? (
                                    <>
                                        <input className="edit-input" type="text" name="description" value={editForm.description} onChange={handleFormChange} />
                                        <select className="edit-select" name="category" value={editForm.category} onChange={handleFormChange}>
                                            {availableCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <p className="item-name">{expense.description}</p>
                                        <p className="item-category">{expense.category} | {expense.date}</p>
                                    </>
                                )}
                            </div>
                            
                            <div className="item-meta">
                                {isEditing ? (
                                    <input className="edit-input amount-input" type="number" name="amount" value={editForm.amount} onChange={handleFormChange} />
                                ) : (
                                    <p className="item-amount red">-${expense.amount.toFixed(2)}</p>
                                )}
                            </div>

                            <div className="action-buttons-group">
                                {isEditing ? (
                                    <>
                                        <button className="edit-action-button save" onClick={() => handleSaveEdit(expense.id)}><Save size={18} /></button>
                                        <button className="edit-action-button cancel" onClick={() => setEditingId(null)}><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-action-button" onClick={() => handleEditClick(expense)}><Pencil size={18} /></button>
                                        <button className="edit-action-button delete" onClick={() => deleteExpense && deleteExpense(expense.id)}><Trash2 size={18} /></button>
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