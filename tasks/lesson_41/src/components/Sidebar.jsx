import React from 'react';
import { navItems } from '../data';

function Sidebar({ activeItem = 'dashboard' }) {
  const renderIcon = (icon) => {
    switch (icon) {
      case 'dashboard':
        return (
          <svg className="sidebar__icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM14 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"/>
          </svg>
        );
      case 'sales':
        return (
          <svg className="sidebar__icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 1.21-1.04 2.01-3 2.01-1.99 0-2.77-.94-2.88-2.26H6.3c.12 2.19 1.7 3.52 3.7 4.01V21h3v-2.15c2-.37 3.5-1.61 3.5-3.61 0-2.6-1.9-3.75-4.9-4.34z"/>
          </svg>
        );
      case 'catalog':
        return (
          <svg className="sidebar__icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        );
      case 'customers':
        return (
          <svg className="sidebar__icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
        );
      case 'reviews':
        return (
          <svg className="sidebar__icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {navItems.map((item) => {
            const isActive = item.id === activeItem;
            return (
              <li key={item.id} className="sidebar__item">
                <button
                  className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                  disabled
                >
                  {renderIcon(item.icon)}
                  <span className="sidebar__label">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
