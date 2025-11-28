// src/components/FinanceDashboard.jsx (REWRITTEN)

import React, { useState } from 'react';
import StatsCards from './StatsCards';
import Overview from './Overview';
import Expenses from './Expenses';
import Budgets from './Budgets';
import Goals from './Goals'; 
import { Settings, Home, Utensils, Bus, Briefcase, Plane, GraduationCap, Gift, DollarSign, ShoppingCart } from 'lucide-react';

// --- CENTRALIZED ICON MAP ---
const ICON_MAP = {
    Home: { Icon: Home, class: 'icon-blue' },
    Utensils: { Icon: Utensils, class: 'icon-orange' },
    Bus: { Icon: Bus, class: 'icon-green' },
    Briefcase: { Icon: Briefcase, class: 'icon-purple' },
    Plane: { Icon: Plane, class: 'icon-green' },
    GraduationCap: { Icon: GraduationCap, class: 'icon-purple' },
    Gift: { Icon: Gift, class: 'icon-red' },
    DollarSign: { Icon: DollarSign, class: 'icon-orange' },
    ShoppingCart: { Icon: ShoppingCart, class: 'icon-purple' },
};
// --- END CENTRALIZED ICON MAP ---

// --- INITIAL MOCK DATA ---
const initialBudgets = [
    { category: 'Housing', limit: 1200, spent: 1050, icon: 'Home', iconClass: 'icon-blue' },
    { category: 'Food', limit: 450, spent: 350, icon: 'Utensils', iconClass: 'icon-orange' },
    { category: 'Transport', limit: 150, spent: 80, icon: 'Bus', iconClass: 'icon-green' },
];

const initialExpenses = [
    { id: 1, description: 'Dinner out', amount: 85.50, category: 'Food', date: '2025-11-27' },
    { id: 2, description: 'Bus Pass', amount: 80.00, category: 'Transport', date: '2025-11-01' },
    { id: 3, description: 'Rent Payment', amount: 1050.00, category: 'Housing', date: '2025-11-01' },
];

const initialGoals = [
    { id: 1, name: 'House Down Payment', target: 50000, current: 15000, icon: 'Home', iconClass: 'icon-blue' },
    { id: 2, name: 'Vacation Fund', target: 5000, current: 1500, icon: 'Plane', iconClass: 'icon-green' },
];
// --- END INITIAL MOCK DATA ---


export default function FinanceDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [expenses, setExpenses] = useState(initialExpenses);
    const [budgets, setBudgets] = useState(initialBudgets);
    const [goals, setGoals] = useState(initialGoals);

    // --- CALCULATIONS & DATA ---
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0); 
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0); 
    const totalSavings = goals.reduce((sum, g) => sum + g.current, 0); 
    const expenseByCategory = budgets.map(budget => ({ name: budget.category, value: budget.spent })).filter(item => item.value > 0);
    const availableCategories = budgets.map(b => b.category);

    // --- EXPENSES CRUD HANDLERS (Same as before, relying on category match) ---
    const addExpense = (newExpenseForm) => {
        if (newExpenseForm.amount && newExpenseForm.description) {
            const expenseAmount = parseFloat(newExpenseForm.amount);
            const expense = {
                id: Date.now(),
                category: newExpenseForm.category,
                amount: expenseAmount,
                date: new Date().toISOString().split('T')[0],
                description: newExpenseForm.description,
            };
            setExpenses(prevExpenses => [...prevExpenses, expense]);
            
            setBudgets(prevBudgets => prevBudgets.map(b => 
                b.category === newExpenseForm.category
                   ? { ...b, spent: b.spent + expenseAmount }
                   : b
            ));
        }
    };
    const deleteExpense = (id) => {
        const expenseToDelete = expenses.find(e => e.id === id);
        if (!expenseToDelete) return;
        setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
        setBudgets(prevBudgets => prevBudgets.map(b => 
            b.category === expenseToDelete.category
               ? { ...b, spent: Math.max(0, b.spent - expenseToDelete.amount) }
               : b
        ));
    };
    const updateExpense = (id, updates) => {
        const oldExpense = expenses.find(e => e.id === id);
        if (!oldExpense) return;
        
        const newExpense = { ...oldExpense, ...updates };
        const oldAmount = oldExpense.amount;
        const newAmount = newExpense.amount;
        const oldCategory = oldExpense.category;
        const newCategory = newExpense.category;

        setExpenses(prevExpenses => prevExpenses.map(e => e.id === id ? newExpense : e));
        
        setBudgets(prevBudgets => prevBudgets.map(b => {
            if (b.category === oldCategory) return { ...b, spent: Math.max(0, b.spent - oldAmount) };
            return b;
        }).map(b => {
            if (b.category === newCategory) return { ...b, spent: b.spent + newAmount };
            return b;
        }));
    };
    
    // --- BUDGETS CRUD HANDLERS (Updated to use a safer default icon) ---
    const addBudget = (newBudgetForm) => {
        if (newBudgetForm.category && newBudgetForm.limit) {
            const categoryExists = budgets.find(b => b.category === newBudgetForm.category);
            if (categoryExists) { alert('Budget category already exists!'); return; }
            
            // Safer default or manual selection logic for new budgets
            let iconName = 'Briefcase'; 
            let iconClass = 'icon-purple';

            const categoryLower = newBudgetForm.category.toLowerCase();
            if (categoryLower.includes('food')) { iconName = 'Utensils'; iconClass = 'icon-orange'; } 
            else if (categoryLower.includes('house') || categoryLower.includes('rent')) { iconName = 'Home'; iconClass = 'icon-blue'; } 
            else if (categoryLower.includes('transport')) { iconName = 'Bus'; iconClass = 'icon-green'; }
            else if (categoryLower.includes('travel')) { iconName = 'Plane'; iconClass = 'icon-green'; }

            setBudgets(prevBudgets => [...prevBudgets, { 
                category: newBudgetForm.category, 
                limit: parseFloat(newBudgetForm.limit), 
                spent: 0,
                icon: iconName,
                iconClass: iconClass
            }]);
        }
    };
    const updateBudget = (category, newLimit) => {
        setBudgets(prevBudgets => prevBudgets.map(b => b.category === category ? { ...b, limit: parseFloat(newLimit) } : b));
    };
    const deleteBudget = (category) => {
        setBudgets(prevBudgets => prevBudgets.filter(b => b.category !== category));
        setExpenses(prevExpenses => prevExpenses.filter(e => e.category !== category));
    };

    // --- GOALS CRUD HANDLERS (Updated to use selected icon from form) ---
    const addGoal = (newGoalForm) => {
        if (newGoalForm.name && newGoalForm.target && newGoalForm.icon) {
            const iconData = ICON_MAP[newGoalForm.icon] || ICON_MAP.DollarSign;
            setGoals(prevGoals => [...prevGoals, {
                id: Date.now(),
                name: newGoalForm.name,
                target: parseFloat(newGoalForm.target),
                current: parseFloat(newGoalForm.current || 0),
                icon: newGoalForm.icon, // Store the selected icon name string
                iconClass: iconData.class
            }]);
        }
    };
    const updateGoal = (id, updates) => {
        const newGoals = goals.map(g => {
            if (g.id === id) {
                // If the icon property is updated, get the corresponding class
                if (updates.icon && ICON_MAP[updates.icon]) {
                    updates.iconClass = ICON_MAP[updates.icon].class;
                }
                return { ...g, ...updates };
            }
            return g;
        });
        setGoals(newGoals);
    };
    const deleteGoal = (id) => {
        setGoals(prevGoals => prevGoals.filter(g => g.id !== id));
    };
    
    // --- RENDER CONTENT FUNCTION (Passes Props and Icon Map) ---
    const renderContent = () => {
        const iconProps = { ICON_MAP };
        const expenseProps = { expenses, addExpense, deleteExpense, updateExpense, availableCategories, budgets, ...iconProps };
        const budgetProps = { budgets, addBudget, deleteBudget, updateBudget, availableCategories, ...iconProps };
        const goalProps = { goals, addGoal, deleteGoal, updateGoal, ...iconProps };
        
        switch (activeTab) {
            case 'overview': return <Overview expenseByCategory={expenseByCategory} />;
            case 'expenses': return <Expenses {...expenseProps} />;
            case 'budgets': return <Budgets {...budgetProps} />;
            case 'goals': return <Goals {...goalProps} />;
            default: return <Overview expenseByCategory={expenseByCategory} />;
        }
    };

    return (
        <div className="finance-dashboard-container"> 
            
            <header className="dashboard-header">
                <div style={{ marginBottom: '32px' }}>
                    <h1 className="dashboard-title">Finance Dashboard</h1>
                    <p className="dashboard-subtitle">Track your spending, budgets, and financial goals</p>
                </div>
                <button className="settings-button"><Settings size={24} /></button>
            </header>

            <div className="stats-card-grid"> 
                <StatsCards
                    totalBudget={totalBudget}
                    totalExpenses={totalExpenses}
                    totalSavings={totalSavings}
                />
            </div>
            
            <nav className="tabs-container">
                <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`tab-button ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>Expenses</button>
                <button className={`tab-button ${activeTab === 'budgets' ? 'active' : ''}`} onClick={() => setActiveTab('budgets')}>Budgets</button>
                <button className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`} onClick={() => setActiveTab('goals')}>Goals</button>
            </nav>

            <div className="tab-content-wrapper">
                {renderContent()}
            </div>

        </div>
    );
}