// src/components/Goals.jsx (REWRITTEN - Adds Icon Selection to Form)

import React, { useState } from 'react';
import { Plus, Pencil, Save, X, Trash2, DollarSign } from 'lucide-react';

export default function Goals({ goals, addGoal, updateGoal, deleteGoal, ICON_MAP }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newGoalForm, setNewGoalForm] = useState({ 
        name: '', 
        target: '', 
        current: '',
        icon: 'DollarSign' // Set default icon for new form
    });

    // Extract list of icon names for the dropdown
    const iconOptions = Object.keys(ICON_MAP);

    const handleNewGoalChange = (e) => {
        setNewGoalForm({ ...newGoalForm, [e.target.name]: e.target.value });
    };

    const handleNewGoalSubmit = () => {
        if (newGoalForm.name && newGoalForm.target && addGoal) {
            addGoal(newGoalForm);
            setNewGoalForm({ name: '', target: '', current: '', icon: 'DollarSign' });
            setIsAdding(false);
        }
    };

    const handleEditClick = (goal) => {
        setIsAdding(false);
        setEditingId(goal.id);
        setEditForm({ 
            name: goal.name, 
            target: goal.target.toString(), 
            current: goal.current.toString(),
            icon: goal.icon
        });
    };

    const handleSaveEdit = (id) => {
        const updates = {
            name: editForm.name,
            target: parseFloat(editForm.target),
            current: parseFloat(editForm.current),
            icon: editForm.icon // Pass the icon change to the parent
        };
        if (updateGoal) { updateGoal(id, updates); }
        setEditingId(null);
    };

    const handleFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };
    
    const getGoalVisuals = (goal) => {
        const iconData = ICON_MAP[goal.icon] ? ICON_MAP[goal.icon] : ICON_MAP.DollarSign;
        return { Icon: iconData.Icon, class: iconData.class }; 
    };

    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Savings Goals</h2>
                <button 
                    className="primary-action-button" 
                    onClick={() => { setIsAdding(prev => !prev); setEditingId(null); }}
                >
                    <Plus size={18} />
                    <span>{isAdding ? 'Cancel Add' : 'Add Goal'}</span>
                </button>
            </div>
          
            {/* Goal Creation Form (New Icon Select Added) */}
            {isAdding && (
                <div className="creation-form-panel goal-form">
                    <input className="edit-input" type="text" name="name" placeholder="Goal Name" value={newGoalForm.name} onChange={handleNewGoalChange} />
                    <input className="edit-input target-input" type="number" name="target" placeholder="Target ($)" value={newGoalForm.target} onChange={handleNewGoalChange} />
                    <input className="edit-input target-input" type="number" name="current" placeholder="Current Saved ($)" value={newGoalForm.current} onChange={handleNewGoalChange} />
                    
                    {/* ICON SELECTION DROPDOWN */}
                    <select className="edit-select" name="icon" value={newGoalForm.icon} onChange={handleNewGoalChange}>
                        {iconOptions.map(iconName => (
                            <option key={iconName} value={iconName}>
                                {iconName}
                            </option>
                        ))}
                    </select>
                    
                    <button className="primary-action-button" onClick={handleNewGoalSubmit}>
                        <Save size={18} /> 
                        <span>Save New Goal</span>
                    </button>
                </div>
            )}

            <div className="transaction-list-container">
                {goals.length === 0 && <p className="empty-state-text">No goals set. Add one!</p>}
                {goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    const isEditing = goal.id === editingId;
                    const { Icon, class: iconClass } = getGoalVisuals(goal);

                    return (
                        <div key={goal.id} className="budget-item transaction-item">
                            <div className="item-icon-wrapper">
                                <Icon className={iconClass} size={24} />
                            </div>
                            
                            <div className="item-details">
                                {/* Editing name */}
                                {isEditing ? (<input className="edit-input" type="text" name="name" value={editForm.name} onChange={handleFormChange} />) : (<p className="item-name">{goal.name}</p>)}
                                <div className="budget-progress-bar">
                                    <div className="budget-progress-fill safe" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="item-meta budget-meta goal-meta-group">
                                {/* Editing amount fields */}
                                {isEditing ? (
                                    <>
                                        {/* Dropdown for icon editing */}
                                        <select className="edit-select" name="icon" value={editForm.icon} onChange={handleFormChange}>
                                            {iconOptions.map(iconName => (
                                                <option key={iconName} value={iconName}>{iconName}</option>
                                            ))}
                                        </select>
                                        <input className="edit-input target-input" type="number" name="current" value={editForm.current} onChange={handleFormChange} />
                                        <input className="edit-input target-input" type="number" name="target" value={editForm.target} onChange={handleFormChange} />
                                    </>
                                ) : (
                                    <>
                                        <p className="item-amount">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                                        <p className="item-date">{progress.toFixed(0)}% Complete</p>
                                    </>
                                )}
                            </div>
                            
                            <div className="action-buttons-group">
                                {isEditing ? (
                                    <>
                                        <button className="edit-action-button save" onClick={() => handleSaveEdit(goal.id)}><Save size={18} /></button>
                                        <button className="edit-action-button cancel" onClick={() => setEditingId(null)}><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-action-button" onClick={() => handleEditClick(goal)}><Pencil size={18} /></button>
                                        <button className="edit-action-button delete" onClick={() => deleteGoal && deleteGoal(goal.id)}><Trash2 size={18} /></button>
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