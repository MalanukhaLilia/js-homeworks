import React from 'react';
import avatarImg from '../assets/avatar.webp';

const navItems = ['Home', 'Deposits', 'Offers', 'Payments', 'Settings'];

function Sidebar({ activeTab, setActiveTab, theme, toggleTheme }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper">
          <img src={avatarImg} alt="Scott Grant" className="sidebar__avatar" />
        </div>
        <h2 className="sidebar__username">Scott Grant</h2>
      </div>
      <nav className="sidebar__nav">
        <ul className="sidebar__nav-list">
          {navItems.map(item => (
            <li key={item} className="sidebar__nav-item">
              <button
                type="button"
                className={`sidebar__nav-link ${activeTab === item.toLowerCase() ? 'sidebar__nav-link--active' : ''}`}
                onClick={() => setActiveTab(item.toLowerCase())}
              >
                <span className={`sidebar__nav-icon sidebar__nav-icon--${item.toLowerCase()}`}></span>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar__theme-toggle">
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={theme === 'light'}
            onChange={toggleTheme}
            className="theme-switch__input"
          />
          <span className="theme-switch__slider"></span>
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;
