import React from 'react';

function KpiCard({ title, value, type }) {
  const getIcon = () => {
    switch (type) {
      case 'revenue':
        return <span className="kpi-card__symbol">$</span>;
      case 'orders':
        return (
          <svg viewBox="0 0 24 24" width="32" height="32" className="kpi-card__svg">
            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        );
      case 'reviews':
        return (
          <svg viewBox="0 0 24 24" width="32" height="32" className="kpi-card__svg">
            <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        );
      case 'customers':
        return (
          <svg viewBox="0 0 24 24" width="32" height="32" className="kpi-card__svg">
            <path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="kpi-card">
      <div className={`kpi-card__icon-box kpi-card__icon-box--${type}`}>
        {getIcon()}
      </div>
      <div className="kpi-card__content">
        <span className="kpi-card__title">{title}</span>
        <span className="kpi-card__value">{value}</span>
      </div>
    </div>
  );
}

export default KpiCard;
