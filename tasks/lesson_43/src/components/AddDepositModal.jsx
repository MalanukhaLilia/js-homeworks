import React, { useState } from 'react';

function AddDepositModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    property: '',
    city: '',
    moveInDate: '',
    rent: '',
    deposit: '',
    depositNote: '',
    status: 'Awaiting bank processing',
    statusColor: 'yellow'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.property || !formData.city) return;
    onAdd({
      ...formData,
      id: Date.now(),
      rent: formData.rent.startsWith('$') ? formData.rent : `$${formData.rent}`,
      deposit: formData.deposit.startsWith('$') ? formData.deposit : `$${formData.deposit}`
    });
    onClose();
  };

  return (
    <div className="deposit-modal">
      <div className="deposit-modal__overlay" onClick={onClose}></div>
      <div className="deposit-modal__card">
        <h3 className="deposit-modal__title">Add new deposit</h3>
        <form onSubmit={handleSubmit} className="deposit-modal__form">
          <div className="deposit-modal__group">
            <label className="deposit-modal__label">Property name</label>
            <input
              type="text"
              name="property"
              value={formData.property}
              onChange={handleChange}
              className="deposit-modal__input"
              required
            />
          </div>
          <div className="deposit-modal__group">
            <label className="deposit-modal__label">City & state</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="deposit-modal__input"
              required
            />
          </div>
          <div className="deposit-modal__group">
            <label className="deposit-modal__label">Move in date</label>
            <input
              type="text"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              className="deposit-modal__input"
              placeholder="e.g. 15 April 2026"
              required
            />
          </div>
          <div className="deposit-modal__row">
            <div className="deposit-modal__group">
              <label className="deposit-modal__label">Rent amount</label>
              <input
                type="text"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="deposit-modal__input"
                placeholder="3000"
                required
              />
            </div>
            <div className="deposit-modal__group">
              <label className="deposit-modal__label">Deposit amount</label>
              <input
                type="text"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                className="deposit-modal__input"
                placeholder="6000"
                required
              />
            </div>
          </div>
          <div className="deposit-modal__group">
            <label className="deposit-modal__label">Deposit note</label>
            <input
              type="text"
              name="depositNote"
              value={formData.depositNote}
              onChange={handleChange}
              className="deposit-modal__input"
              placeholder="e.g. First & Last"
            />
          </div>
          <div className="deposit-modal__row">
            <div className="deposit-modal__group">
              <label className="deposit-modal__label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="deposit-modal__select"
              >
                <option value="Awaiting Bank Processing">Awaiting bank processing</option>
                <option value="Payment Processed">Payment processed</option>
                <option value="Expired. No Payment Received">Expired. No payment received</option>
              </select>
            </div>
            <div className="deposit-modal__group">
              <label className="deposit-modal__label">Indicator dot</label>
              <select
                name="statusColor"
                value={formData.statusColor}
                onChange={handleChange}
                className="deposit-modal__select"
              >
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="red">Red</option>
              </select>
            </div>
          </div>
          <div className="deposit-modal__actions">
            <button type="button" onClick={onClose} className="deposit-modal__btn deposit-modal__btn--cancel">
              Cancel
            </button>
            <button type="submit" className="deposit-modal__btn deposit-modal__btn--submit">
              Add Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDepositModal;
