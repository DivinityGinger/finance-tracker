// src/components/Expenses.jsx (REWRITTEN)

import React, { useState } from 'react';
import { Utensils, ShoppingCart, Home, Bus, HeartHandshake, Plus, Pencil, Save, X } from 'lucide-react';

// Mock data (replace with props from FinanceDashboard)
const expenseData = [
    { id: 1, name: 'Dinner out', amount: 85.50, category: 'Food', date: '2025-11-27', icon: Utensils, iconClass: 'icon-orange' },
    { id: 2, name: 'Groceries', amount: 154.20, category: 'Shopping', date: '2025-11-26', icon: ShoppingCart, iconClass: 'icon-purple' },
];

const categoryIcons = {
    'Food': { icon: Utensils, class: 'icon-orange' },
    'Shopping': { icon: ShoppingCart, class: 'icon-purple' },
    'Housing': { icon: Home, class: 'icon-blue' },
    'Transport': { icon: Bus, class: 'icon-green' },
    'Charity': { icon: HeartHandshake, class: 'icon-red' },
};

// NOTE: This component needs to receive the expenses list and the update function as props
export default function Expenses({ expenses = expenseData, updateExpense, deleteExpense, availableCategories = ['Food', 'Shopping', 'Housing', 'Transport', 'Charity'] }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    
    const handleEditClick = (expense) => {
        setEditingId(expense.id);
        setEditForm({ 
            amount: expense.amount.toString(), 
            description: expense.name, 
            category: expense.category 
        });
    };

    const handleSaveEdit = (id) => {
        const updates = {
            amount: parseFloat(editForm.amount),
            name: editForm.description,
            category: editForm.category
        };
        // This function will call the updateExpense provided by FinanceDashboard.jsx
        if (updateExpense) {
            updateExpense(id, updates); 
        }
        setEditingId(null);
    };

    const handleFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleAddExpense = () => {
        console.log('Open Add Expense Modal or Form');
    };

    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Detailed Expenses</h2>
                <button className="primary-action-button" onClick={handleAddExpense}>
                    <Plus size={18} /> 
                    <span>Add Expense</span>
                </button>
            </div>
            
            <div className="transaction-list-container">
                {expenses.map((expense) => {
                    const { icon: Icon, class: iconClass } = categoryIcons[expense.category] || { icon: ShoppingCart, class: 'icon-purple' };
                    const isEditing = expense.id === editingId;

                    return (
                        <div key={expense.id} className="transaction-item">
                            
                            {/* Icon & Details Column */}
                            <div className="item-icon-wrapper">
                                <Icon className={iconClass} size={24} />
                            </div>
                            
                            <div className="item-details">
                                {isEditing ? (
                                    <>
                                        <input
                                            className="edit-input"
                                            type="text"
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleFormChange}
                                        />
                                        <select
                                            className="edit-select"
                                            name="category"
                                            value={editForm.category}
                                            onChange={handleFormChange}
                                        >
                                            {availableCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <p className="item-name">{expense.name}</p>
                                        <p className="item-category">{expense.category} | {expense.date}</p>
                                    </>
                                )}
                            </div>
                            
                            {/* Amount & Actions Column */}
                            <div className="item-meta">
                                {isEditing ? (
                                    <input
                                        className="edit-input amount-input"
                                        type="number"
                                        name="amount"
                                        value={editForm.amount}
                                        onChange={handleFormChange}
                                    />
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
                                        <button className="edit-action-button delete" onClick={() => deleteExpense && deleteExpense(expense.id)}><X size={18} /></button>
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