import React from 'react';
import { newCustomers } from '../data';

function NewCustomers() {
  return (
    <div className="new-customers">
      <ul className="new-customers__list">
        {newCustomers.map((customer) => (
          <li key={customer.id} className="new-customers__item">
            <div
              className="new-customers__avatar"
              style={{ backgroundColor: customer.avatarColor }}
            >
              {customer.initials}
            </div>
            <span className="new-customers__name">{customer.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewCustomers;
