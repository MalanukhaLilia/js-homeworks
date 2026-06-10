import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KpiCard from './components/KpiCard';
import WelcomeCard from './components/WelcomeCard';
import PendingOrders from './components/PendingOrders';
import PendingReviews from './components/PendingReviews';
import NewCustomers from './components/NewCustomers';
import { kpiData } from './data';

function App() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__container">
        <Sidebar activeItem="dashboard" />
        <main className="dashboard__main">
          <div className="dashboard__grid">
            <div className="dashboard__col dashboard__col--double">
              <div className="dashboard__row">
                <KpiCard {...kpiData[0]} />
                <KpiCard {...kpiData[1]} />
              </div>
              <WelcomeCard />
              <PendingOrders />
            </div>

            <div className="dashboard__col">
              <KpiCard {...kpiData[2]} />
              <div className="dashboard__list-card">
                <PendingReviews />
              </div>
            </div>

            <div className="dashboard__col">
              <KpiCard {...kpiData[3]} />
              <div className="dashboard__list-card">
                <NewCustomers />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
