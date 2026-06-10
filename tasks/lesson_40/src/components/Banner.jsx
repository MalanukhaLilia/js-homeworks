import React, { useState } from 'react';

function Banner({ text }) {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div 
      className={`banner ${isNightMode ? 'banner--night' : ''}`}
      onClick={() => setIsNightMode(!isNightMode)}
      title="Click to toggle banner day/night mode"
    >
      <span className="banner__text">{text}</span>
    </div>
  );
}

export default Banner;
