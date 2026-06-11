import React from 'react';
import houseThumb from '../assets/house.webp';

function DepositTable({ title, count, deposits, onActionClick, actionLabel, onAddClick }) {
  return (
    <div className="deposit-section">
      <div className="deposit-section__header">
        <div className="deposit-section__title-group">
          <h2 className="deposit-section__title">{title}</h2>
          <span className="deposit-section__badge">{count}</span>
        </div>
        {onAddClick && (
          <button
            type="button"
            className="deposit-section__add-btn"
            onClick={onAddClick}
          >
            +
          </button>
        )}
      </div>
      <div className="deposit-table-wrapper">
        <table className="deposit-table">
          <thead>
            <tr>
              <th className="deposit-table__th">PROPERTY</th>
              <th className="deposit-table__th">MOVE IN DATE</th>
              <th className="deposit-table__th">RENT</th>
              <th className="deposit-table__th">DEPOSIT</th>
              <th className="deposit-table__th">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map(dep => (
              <tr key={dep.id} className="deposit-table__tr">
                <td className="deposit-table__td">
                  <div className="deposit-table__property-cell">
                    <img src={houseThumb} alt={dep.property} className="deposit-table__thumb" />
                    <div>
                      <div className="deposit-table__prop-name">{dep.property}</div>
                      <div className="deposit-table__prop-city">{dep.city}</div>
                    </div>
                  </div>
                </td>
                <td className="deposit-table__td">{dep.moveInDate}</td>
                <td className="deposit-table__td">{dep.rent}</td>
                <td className="deposit-table__td">
                  <div>
                    <div className="deposit-table__dep-amt">{dep.deposit}</div>
                    <div className="deposit-table__dep-note">{dep.depositNote}</div>
                  </div>
                </td>
                <td className="deposit-table__td">
                  <div className="deposit-table__status-cell">
                    <span className="deposit-table__status-text">{dep.status}</span>
                    <span className={`deposit-table__status-dot deposit-table__status-dot--${dep.statusColor}`}></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="deposit-section__actions">
        <button type="button" className="deposit-section__btn">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default DepositTable;
