import React from 'react';
import welcomeImg from '../assets/man_with_phone.webp';

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <div className="welcome-card__image-container">
        <img src={welcomeImg} alt="Welcome Banner" className="welcome-card__image" />
      </div>
      <div className="welcome-card__body">
        <h2 className="welcome-card__title">Welcome to react-admin demo</h2>
        <p className="welcome-card__text">
          This is the admin of an imaginary poster shop. Feel free to explore and modify the
          data - it's local to your computer, and will reset each time you reload.
        </p>
      </div>
      <div className="welcome-card__footer">
        <button className="welcome-card__btn" disabled>
          <svg className="welcome-card__btn-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          REACT-ADMIN SITE
        </button>
        <button className="welcome-card__btn" disabled>
          <svg className="welcome-card__btn-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
          SOURCE FOR THIS DEMO
        </button>
      </div>
    </div>
  );
}

export default WelcomeCard;
