import React from 'react';
import { pendingOrders } from '../data';

function PendingOrders() {
  return (
    <div className="pending-orders">
      <h3 className="pending-orders__title">Pending Orders</h3>
      <ul className="pending-orders__list">
        {pendingOrders.map((order) => (
          <li key={order.id} className="pending-orders__item">
            <div
              className="pending-orders__avatar"
              style={{ backgroundColor: order.avatarColor }}
            >
              {order.initials}
            </div>
            <div className="pending-orders__info">
              <span className="pending-orders__date">{order.date}</span>
              <span className="pending-orders__detail">
                by {order.customer}, {order.items}
              </span>
            </div>
            <span className="pending-orders__price">{order.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingOrders;
