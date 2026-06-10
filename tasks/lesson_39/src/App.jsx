import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import WeatherControls from './components/WeatherControls';

const API_KEY = '5a5417f25c205e05f2bbfd938f406cb4';
const CACHE_KEY = 'weather_react_cache';
const CACHE_TTL = 2 * 60 * 60 * 1000;

const MAP_CITY_TO_QUERY = {
  'lisbon': 'Lisbon',
  'paris': 'Paris',
  'belgrade': 'Belgrade',
  'venice': 'Venice',
  'tel-avive': 'Tel Aviv',
  'cair': 'Cairo',
  'new-york': 'New York',
  'new-delhi': 'New Delhi',
  'san-francisco': 'San Francisco',
  'tokyo': 'Tokyo',
  'sydney': 'Sydney'
};

const INITIAL_WEATHER_DATA = [
  {
    id: 'lisbon',
    city: 'Lisbon',
    temp: 21,
    type: 'sunny',
    icon: 'assets/img/sunny.png',
    size: 'half',
    colorClass: 'lisbon',
    humidity: '64%',
    wind: '12 km/h',
    condition: 'Sunny & Warm'
  },
  {
    id: 'paris',
    city: 'Paris',
    temp: 11,
    type: 'rainy_sun',
    icon: 'assets/img/rainy_sun.png',
    size: 'normal',
    colorClass: 'paris',
    humidity: '82%',
    wind: '18 km/h',
    condition: 'Light Rain Showers'
  },
  {
    id: 'belgrade',
    city: 'Belgrade',
    temp: 15,
    type: 'partly_cloudy',
    icon: 'assets/img/partly_cloudy.png',
    size: 'normal',
    colorClass: 'belgrade',
    humidity: '70%',
    wind: '10 km/h',
    condition: 'Partly Cloudy'
  },
  {
    id: 'venice',
    city: 'Venice',
    temp: 21,
    type: 'cloudy_sun',
    icon: 'assets/img/cloudy_sun.png',
    size: 'normal',
    colorClass: 'venice',
    humidity: '75%',
    wind: '8 km/h',
    condition: 'Mostly Cloudy'
  },
  {
    id: 'tel-avive',
    city: 'Tel-Avive',
    temp: 32,
    type: 'hot',
    icon: 'assets/img/hot.png',
    size: 'normal',
    colorClass: 'tel-avive',
    humidity: '45%',
    wind: '15 km/h',
    condition: 'Very Hot & Sunny'
  },
  {
    id: 'cair',
    city: 'Cair',
    temp: 21,
    type: 'sunny',
    icon: 'assets/img/sunny.png',
    size: 'normal',
    colorClass: 'cair',
    humidity: '30%',
    wind: '20 km/h',
    condition: 'Sunny & Pleasant'
  },
  {
    id: 'new-york',
    city: 'New-York',
    temp: 17,
    type: 'weather_storm_sun',
    icon: 'assets/img/weather_storm_sun.png',
    size: 'normal',
    colorClass: 'new-york',
    humidity: '85%',
    wind: '25 km/h',
    condition: 'Scattered Thunderstorms'
  },
  {
    id: 'new-delhi',
    city: 'New-Delhi',
    temp: 17,
    type: 'rainy',
    icon: 'assets/img/rainy.png',
    size: 'normal',
    colorClass: 'new-delhi',
    humidity: '90%',
    wind: '14 km/h',
    condition: 'Heavy Rain'
  },
  {
    id: 'san-francisco',
    city: 'San-Francisco',
    temp: 15,
    type: 'cloud_sun',
    icon: 'assets/img/cloud_sun.png',
    size: 'half',
    colorClass: 'san-francisco',
    humidity: '78%',
    wind: '22 km/h',
    condition: 'Cool Fog & Sun'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    temp: 8,
    type: 'clear_night',
    icon: 'assets/img/clear_night.png',
    size: 'normal',
    colorClass: 'tokyo',
    humidity: '55%',
    wind: '9 km/h',
    condition: 'Clear Night'
  },
  {
    id: 'sydney',
    city: 'Sydney',
    temp: 25,
    type: 'night_cloudy',
    icon: 'assets/img/night_cloudy.png',
    size: 'full',
    colorClass: 'sydney',
    humidity: '60%',
    wind: '16 km/h',
    condition: 'Cloudy Night'
  }
];

function getIconForWeather(iconCode, tempCelsius) {
  if (!iconCode) return 'assets/img/sunny.png';
  const isNight = iconCode.endsWith('n');
  const code = iconCode.slice(0, 2);

  if (tempCelsius >= 32 && code === '01') {
    return 'assets/img/hot.png';
  }

  switch (code) {
    case '01':
      return isNight ? 'assets/img/clear_night.png' : 'assets/img/sunny.png';
    case '02':
      return isNight ? 'assets/img/night_cloudy.png' : 'assets/img/cloud_sun.png';
    case '03':
    case '04':
      return isNight ? 'assets/img/night_cloudy.png' : 'assets/img/cloudy_sun.png';
    case '09':
    case '10':
      return isNight ? 'assets/img/rainy.png' : 'assets/img/rainy_sun.png';
    case '11':
      return 'assets/img/weather_storm_sun.png';
    case '13':
    case '50':
    default:
      return isNight ? 'assets/img/clear_night.png' : 'assets/img/sunny.png';
  }
}

function mapIconCodeToType(iconCode) {
  if (!iconCode) return 'sunny';
  const code = iconCode.slice(0, 2);

  switch (code) {
    case '01':
      return 'sunny';
    case '02':
    case '03':
    case '04':
      return 'cloudy';
    case '09':
    case '10':
    case '11':
      return 'rainy';
    default:
      return 'sunny';
  }
}

function App() {
  const [weatherData, setWeatherData] = useState(INITIAL_WEATHER_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [dataStatus, setDataStatus] = useState('Loading...');

  useEffect(() => {
    async function fetchAllWeather() {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        const now = Date.now();

        const isCacheValid = INITIAL_WEATHER_DATA.every(city => {
          const item = cached[city.id];
          return item && (now - item.timestamp < CACHE_TTL);
        });

        if (isCacheValid) {
          const updatedData = INITIAL_WEATHER_DATA.map(city => {
            const cachedCity = cached[city.id];
            return {
              ...city,
              temp: cachedCity.temp,
              humidity: cachedCity.humidity,
              wind: cachedCity.wind,
              condition: cachedCity.condition,
              icon: cachedCity.icon,
              type: cachedCity.type,
              isNight: cachedCity.isNight
            };
          });
          setWeatherData(updatedData);
          setDataStatus('Cached');
          return;
        }

        setDataStatus('Fetching live data...');
        const promises = INITIAL_WEATHER_DATA.map(async (city) => {
          const query = MAP_CITY_TO_QUERY[city.id] || city.city;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;

          try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            const temp = Math.round(data.main.temp);
            const humidity = `${data.main.humidity}%`;
            const windSpeedKmH = Math.round(data.wind.speed * 3.6);
            const wind = `${windSpeedKmH} km/h`;
            const description = data.weather[0].description;
            const titleCaseDescription = description.charAt(0).toUpperCase() + description.slice(1);
            const iconCode = data.weather[0].icon;

            const mappedIcon = getIconForWeather(iconCode, temp);
            const weatherType = mapIconCodeToType(iconCode);
            const isNight = iconCode.endsWith('n');

            return {
              id: city.id,
              temp,
              humidity,
              wind,
              condition: titleCaseDescription,
              icon: mappedIcon,
              type: weatherType,
              isNight,
              timestamp: now
            };
          } catch (e) {
            console.error(`Error fetching for ${city.city}:`, e);

            return cached[city.id] || {
              id: city.id,
              temp: city.temp,
              humidity: city.humidity,
              wind: city.wind,
              condition: city.condition,
              icon: city.icon,
              type: city.type,
              timestamp: 0
            };
          }
        });

        const results = await Promise.all(promises);

        const newCache = { ...cached };
        results.forEach(res => {
          if (res.timestamp > 0) {
            newCache[res.id] = res;
          }
        });
        localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));

        const updatedData = INITIAL_WEATHER_DATA.map(city => {
          const fresh = results.find(r => r.id === city.id);
          if (fresh) {
            return {
              ...city,
              temp: fresh.temp,
              humidity: fresh.humidity,
              wind: fresh.wind,
              condition: fresh.condition,
              icon: fresh.icon,
              type: fresh.type,
              isNight: fresh.isNight
            };
          }
          return city;
        });

        setWeatherData(updatedData);
        setDataStatus('Live');
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setDataStatus('Cached');
      }
    }

    fetchAllWeather();
  }, []);

  const handleCardClick = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setFlippedCardId(null);
  };

  const handleSearchSubmit = async (query) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const existing = weatherData.find(item => item.city.toLowerCase() === cleanQuery || item.id === cleanQuery);
    if (existing) {
      setSearchQuery(existing.city);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) {
        alert(`City "${query}" not found!`);
        return;
      }
      const data = await res.json();

      const temp = Math.round(data.main.temp);
      const humidity = `${data.main.humidity}%`;
      const windSpeedKmH = Math.round(data.wind.speed * 3.6);
      const wind = `${windSpeedKmH} km/h`;
      const description = data.weather[0].description;
      const titleCaseDescription = description.charAt(0).toUpperCase() + description.slice(1);
      const iconCode = data.weather[0].icon;

      const mappedIcon = getIconForWeather(iconCode, temp);
      const weatherType = mapIconCodeToType(iconCode);

      const colorClasses = ['lisbon', 'paris', 'belgrade', 'venice', 'tel-avive', 'cair', 'new-york', 'new-delhi', 'san-francisco', 'tokyo', 'sydney'];
      const chosenColor = colorClasses[weatherData.length % colorClasses.length];

      const newCity = {
        id: data.name.toLowerCase().replace(/ /g, '-'),
        city: data.name,
        temp,
        type: weatherType,
        icon: mappedIcon,
        size: 'normal',
        colorClass: chosenColor,
        humidity,
        wind,
        condition: titleCaseDescription,
        isNight: iconCode.endsWith('n')
      };

      setWeatherData(prev => [newCity, ...prev]);
      setSearchQuery(data.name);
    } catch (e) {
      console.error(e);
      alert('Failed to fetch weather for that city.');
    }
  };

  const filteredData = weatherData.filter((item) => {
    const matchesSearch = item.city.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (activeFilter === 'sunny') {
      matchesFilter = item.type === 'sunny' || item.temp >= 30;
    } else if (activeFilter === 'cloudy') {
      matchesFilter = item.type === 'cloudy';
    } else if (activeFilter === 'rainy') {
      matchesFilter = item.type === 'rainy';
    } else if (activeFilter === 'warm') {
      matchesFilter = item.temp > 20;
    } else if (activeFilter === 'cool') {
      matchesFilter = item.temp <= 20;
    }

    return matchesSearch && matchesFilter;
  });

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getDynamicFooterMessage = () => {

    const rainyCities = weatherData.filter(item => 
      item.type === 'rainy' || 
      item.condition.toLowerCase().includes('rain') || 
      item.condition.toLowerCase().includes('storm') || 
      item.condition.toLowerCase().includes('drizzle')
    );

    if (rainyCities.length > 0) {
      const cityNames = rainyCities.map(c => c.city).join(', ');
      return `Have a nice day and don't forget umdrella if you are in ${cityNames} now!`;
    }

    const clearSkyCities = weatherData.filter(item => {
      const isClearSky = item.type === 'sunny' || 
                         item.condition.toLowerCase().includes('clear') || 
                         item.condition.toLowerCase().includes('sunny');
      const isNight = item.isNight ?? (item.type === 'clear_night' || item.type === 'night_cloudy' || item.type.includes('night'));
      return isClearSky && !isNight;
    });
    if (clearSkyCities.length > 0) {
      const cityNames = clearSkyCities.map(c => c.city).join(', ');
      return `Have a nice day and don't forget sunglasses if you are in ${cityNames} now!`;
    }

    return "Have a nice day and enjoy the beautiful weather wherever you are!";
  };

  return (
    <div className="weather">
      {}
      <header className="weather__header">
        <div className="weather__title-wrapper">
          <h1 className="weather__title">CSS Weather Forcast</h1>
          <img src="assets/img/weather_h1.png" alt="icon of sun" className="weather__logo" />
        </div>
        <div className="weather__info-right">
          <div className="weather__date">{todayDate}</div>
        </div>
      </header>

      {}
      <WeatherControls 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isCelsius={isCelsius}
        setIsCelsius={setIsCelsius}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onSearchSubmit={handleSearchSubmit}
      />

      {}
      <main className="weather__grid">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <WeatherCard
              key={item.id}
              city={item.city}
              temp={item.temp}
              type={item.type}
              icon={item.icon}
              size={item.size}
              colorClass={item.colorClass}
              humidity={item.humidity}
              wind={item.wind}
              condition={item.condition}
              isCelsius={isCelsius}
              isFlipped={flippedCardId === item.id}
              onClick={() => handleCardClick(item.id)}
            />
          ))
        ) : (
          <div className="weather__no-results">
            <p>No cities match your search or filter criteria.</p>
            <button className="weather__reset-btn" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {}
      <footer className="weather__footer">
        <h4 className="weather__footer-text">{getDynamicFooterMessage()}</h4>
      </footer>
    </div>
  );
}

export default App;
