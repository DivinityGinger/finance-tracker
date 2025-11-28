// src/components/Goals.jsx (REWRITTEN)

import React, { useState } from 'react';
import { Home, Plane, GraduationCap, Plus, Pencil, Save, X } from 'lucide-react';

// Mock Data (These should ultimately be replaced by props from FinanceDashboard)
const goalData = [
    { id: 1, name: 'House Down Payment', current: 15000, target: 50000, icon: Home, iconClass: 'icon-blue' },
    { id: 2, name: 'Vacation Fund', current: 1500, target: 5000, icon: Plane, iconClass: 'icon-green' },
];

// NOTE: Ensure your FinanceDashboard passes 'goals', 'updateGoal', and 'deleteGoal' as props.
export default function Goals({ goals = goalData, updateGoal, deleteGoal }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    
    // Function to set up the form when the Edit button is clicked
    const handleEditClick = (goal) => {
        setEditingId(goal.id);
        setEditForm({ 
            name: goal.name, 
            target: goal.target.toString(), 
            current: goal.current.toString() 
        });
    };

    // Function to save the changes
    const handleSaveEdit = (id) => {
        const updates = {
            name: editForm.name,
            target: parseFloat(editForm.target),
            current: parseFloat(editForm.current)
        };
        // Call the update function passed down from the parent
        if (updateGoal) {
            updateGoal(id, updates); 
        }
        setEditingId(null);
    };

    // Handler for updating input fields
    const handleFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleAddGoal = () => {
        console.log('Open Add Goal Modal or Form');
    };

    return (
        <div className="tab-content-area">
            <div className="content-header-with-button">
                <h2 className="tab-content-heading">Savings Goals</h2>
                <button className="primary-action-button" onClick={handleAddGoal}>
                    <Plus size={18} />
                    <span>Add Goal</span>
                </button>
            </div>
          
            <div className="transaction-list-container">
                {goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    const isEditing = goal.id === editingId;
                    
                    // Simple logic to choose an icon for mock data
                    const { icon: Icon, class: iconClass } = goal.name.includes('House') ? { icon: Home, class: 'icon-blue' } : 
                        goal.name.includes('Vacation') ? { icon: Plane, class: 'icon-green' } : 
                        { icon: GraduationCap, class: 'icon-purple' };

                    return (
                        <div key={goal.id} className="budget-item transaction-item">
                            
                            {/* Icon & Progress Column */}
                            <div className="item-icon-wrapper">
                                <Icon className={iconClass} size={24} />
                            </div>
                            
                            <div className="item-details">
                                {isEditing ? (
                                    <input
                                        className="edit-input"
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleFormChange}
                                    />
                                ) : (
                                    <p className="item-name">{goal.name}</p>
                                )}
                                <div className="budget-progress-bar">
                                    <div 
                                        className="budget-progress-fill safe"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Target/Current Display & Edit Fields */}
                            <div className="item-meta budget-meta goal-meta-group">
                                {isEditing ? (
                                    <>
                                        <input
                                            className="edit-input target-input"
                                            type="number"
                                            name="current"
                                            placeholder="Current $"
                                            value={editForm.current}
                                            onChange={handleFormChange}
                                        />
                                        <input
                                            className="edit-input target-input"
                                            type="number"
                                            name="target"
                                            placeholder="Target $"
                                            value={editForm.target}
                                            onChange={handleFormChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="item-amount">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</p>
                                        <p className="item-date">{progress.toFixed(0)}% Complete</p>
                                    </>
                                )}
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="action-buttons-group">
                                {isEditing ? (
                                    <>
                                        <button className="edit-action-button save" onClick={() => handleSaveEdit(goal.id)}><Save size={18} /></button>
                                        <button className="edit-action-button cancel" onClick={() => setEditingId(null)}><X size={18} /></button>
                                    </>
                                ) : (
                                    <>
                                        <button className="edit-action-button" onClick={() => handleEditClick(goal)}><Pencil size={18} /></button>
                                        <button className="edit-action-button delete" onClick={() => deleteGoal && deleteGoal(goal.id)}><X size={18} /></button>
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