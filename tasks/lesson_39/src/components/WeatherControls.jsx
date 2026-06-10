import React from 'react';

function WeatherControls({ 
  searchQuery, 
  setSearchQuery, 
  isCelsius, 
  setIsCelsius, 
  activeFilter, 
  setActiveFilter,
  onSearchSubmit
}) {
  const filterOptions = [
    { id: 'all', label: 'All Cities' },
    { id: 'sunny', label: 'Sunny & Hot' },
    { id: 'cloudy', label: 'Cloudy' },
    { id: 'rainy', label: 'Rainy & Stormy' },
    { id: 'warm', label: 'Warm (>20°C)' },
    { id: 'cool', label: 'Cool (≤20°C)' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div className="weather-controls">
      <div className="weather-controls__search-and-unit">
        <form className="weather-controls__search" onSubmit={handleSubmit}>
          <input
            type="text"
            className="weather-controls__input"
            placeholder="Search city (Kyiv, London...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button"
              className="weather-controls__clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </form>

        <div className="weather-controls__unit">
          <span className="weather-controls__unit-label">Unit:</span>
          <div 
            className={`weather-controls__unit-switch ${!isCelsius ? 'weather-controls__unit-switch--fahrenheit' : ''}`}
            onClick={() => setIsCelsius(!isCelsius)}
            aria-label={`Toggle temperature unit. Currently ${isCelsius ? 'Celsius' : 'Fahrenheit'}`}
          >
            <div className="weather-controls__unit-knob"></div>
            <div className="weather-controls__unit-options">
              <span className={`weather-controls__unit-option ${isCelsius ? 'weather-controls__unit-option--active' : ''}`}>C</span>
              <span className={`weather-controls__unit-option ${!isCelsius ? 'weather-controls__unit-option--active' : ''}`}>F</span>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-controls__filters">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={`weather-controls__filter ${activeFilter === option.id ? 'weather-controls__filter--active' : ''}`}
            onClick={() => setActiveFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherControls;
