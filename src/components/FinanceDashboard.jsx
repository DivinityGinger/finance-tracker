// src/components/FinanceDashboard.jsx

import React, { useState } from 'react';
import StatsCards from './StatsCards';
import Overview from './Overview';
import Expenses from './Expenses';
import Budgets from './Budgets';
import Goals from './Goals'; 
import { Settings } from 'lucide-react'; // Example utility icon

export default function FinanceDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Data for StatsCards
    const mockData = {
        totalBudget: 1700,
        totalExpenses: 650,
        totalSavings: 4700,
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview />;
            case 'expenses':
                return <Expenses />;
            case 'budgets':
                return <Budgets />;
            case 'goals':
                return <Goals />;
            default:
                return <Overview />;
        }
    };

    return (
        // Container for centering content and max width
        <div className="finance-dashboard-container"> 
            
            {/* Header Section */}
            <header className="dashboard-header">
                <div style={{ marginBottom: '32px' }}>
                    <h1 className="dashboard-title">
                        Finance Dashboard
                    </h1>
                    <p className="dashboard-subtitle">Track your spending, budgets, and financial goals</p>
                </div>
                {/* Example of a settings button */}
                <button className="settings-button"><Settings size={24} /></button>
            </header>

            {/* Stats Cards Grid Section */}
            <div className="stats-card-grid"> 
                <StatsCards
                    totalBudget={mockData.totalBudget}
                    totalExpenses={mockData.totalExpenses}
                    totalSavings={mockData.totalSavings}
                />
            </div>
            
            {/* Tab Navigation */}
            <nav className="tabs-container">
                <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-button ${activeTab === 'expenses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expenses')}
                >
                    Expenses
                </button>
                <button 
                    className={`tab-button ${activeTab === 'budgets' ? 'active' : ''}`}
                    onClick={() => setActiveTab('budgets')}
                >
                    Budgets
                </button>
                <button 
                    className={`tab-button ${activeTab === 'goals' ? 'active' : ''}`}
                    onClick={() => setActiveTab('goals')}
                >
                    Goals
                </button>
            </nav>

            {/* Tab Content Wrapper */}
            <div className="tab-content-wrapper">
                {renderContent()}
            </div>

        </div>
    );
}