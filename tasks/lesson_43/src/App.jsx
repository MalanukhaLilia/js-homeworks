import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import Sidebar from './components/Sidebar';
import DepositTable from './components/DepositTable';
import AddDepositModal from './components/AddDepositModal';
import avatarImg from './assets/avatar.webp';

const initialActiveDeposits = [
  {
    id: 1,
    property: '771 Lost Round',
    city: 'Sacramento CA',
    moveInDate: '25 February 2020',
    rent: '$3000',
    deposit: '$9000',
    depositNote: 'First, Last & Security',
    status: 'Awaiting Bank Processing',
    statusColor: 'yellow'
  },
  {
    id: 2,
    property: '1491 Jagged Arbor',
    city: 'San Antonio TX',
    moveInDate: '12 March 2020',
    rent: '$2300',
    deposit: '$4600',
    depositNote: 'First & Last',
    status: 'Payment Processed',
    statusColor: 'green'
  }
];

const initialClosedDeposits = [
  {
    id: 3,
    property: '1694 Noble Cape',
    city: 'Las Vegas NV',
    moveInDate: '3 February 2020',
    rent: '$3300',
    deposit: '$6900',
    depositNote: 'Complete',
    status: 'Awaiting Bank Processing',
    statusColor: 'green'
  },
  {
    id: 4,
    property: '1141 Tawny Maze',
    city: 'Raleigh NC',
    moveInDate: '12 January 2020',
    rent: '$2500',
    deposit: '$7500',
    depositNote: 'First, Last & Security',
    status: 'Expired. No Payment Received',
    statusColor: 'red'
  }
];

function App() {
  const [theme, toggleTheme] = useTheme();
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'deposits');
  const [activeDeposits, setActiveDeposits] = useLocalStorage('activeDeposits', initialActiveDeposits);
  const [closedDeposits, setClosedDeposits] = useLocalStorage('closedDeposits', initialClosedDeposits);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDeposit = (newDep) => {
    if (newDep.statusColor === 'red') {
      setClosedDeposits(prev => [newDep, ...prev]);
    } else {
      setActiveDeposits(prev => [newDep, ...prev]);
    }
  };

  return (
    <div className="dashboard-app">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header__right">
            <button type="button" className="dashboard-header__mail-btn">
              <svg className="dashboard-header__mail-icon" viewBox="0 0 24 24" width="22" height="22">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </button>
            <div className="dashboard-header__profile">
              <img src={avatarImg} alt="Scott Grant" className="dashboard-header__avatar" />
            </div>
          </div>
        </header>
        <div className="dashboard-content">
          {activeTab === 'deposits' ? (
            <div className="deposits-view">
              <DepositTable
                title="Active Deposits"
                count={activeDeposits.length}
                deposits={activeDeposits}
                actionLabel="ALL ACTIVE DEPOSITS"
                onAddClick={() => setIsModalOpen(true)}
              />
              <DepositTable
                title="Closed Deposits"
                count={closedDeposits.length}
                deposits={closedDeposits}
                actionLabel="ALL CLOSED DEPOSITS"
              />
              <AddDepositModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddDeposit}
              />
            </div>
          ) : (
            <div className="placeholder-view">
              <h2 className="placeholder-view__title">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
