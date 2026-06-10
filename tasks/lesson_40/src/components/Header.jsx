import React, { useState } from 'react';

function Header({ blogName, onBlogNameChange, activeNavItem, onNavItemClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(blogName);

  const handleSave = () => {
    onBlogNameChange(tempName);
    setIsEditing(false);
  };

  return (
    <header className="header">
      <div 
        className="header__logo" 
        onClick={() => {
          const newName = prompt('Enter new blog name:', blogName);
          if (newName !== null && newName.trim() !== '') {
            onBlogNameChange(newName);
          }
        }}
        title="Click to rename blog"
      ></div>
      
      <div className="header__title-container">
        {isEditing ? (
          <input
            type="text"
            className="header__input"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        ) : (
          <span className="header__title" onClick={() => { setTempName(blogName); setIsEditing(true); }}>
            {blogName}
          </span>
        )}
      </div>

      <div className="header__nav">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            className={`header__nav-item ${activeNavItem === index ? 'header__nav-item--active' : ''}`}
            onClick={() => onNavItemClick(index)}
            aria-label={`Nav item ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}

export default Header;
