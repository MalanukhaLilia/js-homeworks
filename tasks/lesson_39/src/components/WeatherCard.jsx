import React from 'react';

function WeatherCard({ city, temp, type, icon, size, colorClass, humidity, wind, condition, isCelsius, isFlipped, onClick }) {
  const displayTemp = isCelsius ? `${temp}°C` : `${Math.round((temp * 9) / 5 + 32)}°F`;

  return (
    <div 
      className={`weather-card ${size === 'half' ? 'weather-card--half' : size === 'full' ? 'weather-card--full' : ''} ${isFlipped ? 'weather-card--flipped' : ''}`}
      onClick={onClick}
      aria-label={`Weather details for ${city}`}
    >
      <div className={`weather-card__inner weather-card__inner--${colorClass}`}>
        <div className="weather-card__front">
          <h2 className="weather-card__city">{city}</h2>
          <div className="weather-card__info">
            <span className="weather-card__temp">{displayTemp}</span>
            <img src={icon} alt={type} className="weather-card__icon" />
          </div>
        </div>

        <div className="weather-card__back">
          <h2 className="weather-card__city">{city} Details</h2>
          <div className="weather-card__condition">{condition}</div>
          <div className="weather-card__detail">
            <span className="weather-card__detail-label">Temp:</span>
            <span className="weather-card__detail-value">{displayTemp}</span>
          </div>
          <div className="weather-card__detail">
            <span className="weather-card__detail-label">Humidity:</span>
            <span className="weather-card__detail-value">{humidity}</span>
          </div>
          <div className="weather-card__detail">
            <span className="weather-card__detail-label">Wind:</span>
            <span className="weather-card__detail-value">{wind}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
