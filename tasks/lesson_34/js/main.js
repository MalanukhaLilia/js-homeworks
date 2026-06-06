$(document).ready(function() {
    const apiKey = '5a5417f25c205e05f2bbfd938f406cb4';
    let cacheTimer = null;

    const lastCity = localStorage.getItem('last_searched_city');
    if (lastCity) {
        getWeather(lastCity);
    }

    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        const city = $('#city-input').val().trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        const keyCity = city.toLowerCase().trim();
        const cache = JSON.parse(localStorage.getItem('weather_cache') || '{}');
        const now = Date.now();

        if (cache[keyCity] && (now - cache[keyCity].timestamp < 2 * 60 * 60 * 1000)) {
            renderWeather(cache[keyCity].current, cache[keyCity].forecast, true, cache[keyCity].timestamp);
            localStorage.setItem('last_searched_city', keyCity);
            return;
        }

        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        $('#weather-info').hide();
        $('#message-container').hide();

        try {
            const currentData = await $.getJSON(currentUrl);
            const forecastData = await $.getJSON(forecastUrl);

            const cacheData = JSON.parse(localStorage.getItem('weather_cache') || '{}');
            cacheData[keyCity] = {
                current: currentData,
                forecast: forecastData,
                timestamp: Date.now()
            };
            localStorage.setItem('weather_cache', JSON.stringify(cacheData));
            localStorage.setItem('last_searched_city', keyCity);

            renderWeather(currentData, forecastData, false, Date.now());
        } catch (error) {
            $('#weather-info').hide();
            let errMsg = 'Failed to load weather data. Please try again.';
            if (error.responseJSON && error.responseJSON.message) {
                errMsg = error.responseJSON.message;
            }
            showError(errMsg);
        }
    }

    function renderWeather(current, forecast, isCached, timestamp) {
        if (cacheTimer) {
            clearInterval(cacheTimer);
        }

        updateCacheStatus(isCached, timestamp);
        if (isCached) {
            cacheTimer = setInterval(() => {
                updateCacheStatus(true, timestamp);
            }, 30000);
        }

        $('#current-city').text(`${current.name}, ${current.sys.country}`);
        $('#current-temp').text(`${Math.round(current.main.temp)}°C`);
        $('#current-desc').text(current.weather[0].description);
        $('#current-icon').attr('src', `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);
        
        $('#feels-like').text(`${Math.round(current.main.feels_like)}°C`);
        $('#humidity').text(`${current.main.humidity}%`);
        $('#wind-speed').text(`${current.wind.speed} m/s`);
        $('#pressure').text(`${current.main.pressure} hPa`);

        const $hourly = $('#hourly-timeline');
        $hourly.empty();
        const hourlyItems = forecast.list.slice(0, 8);
        hourlyItems.forEach(item => {
            const dt = new Date(item.dt * 1000);
            const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            const tempVal = Math.round(item.main.temp);
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

            $hourly.append(`
                <div class="weather__hourly-item">
                    <span class="weather__hourly-time">${timeStr}</span>
                    <img src="${iconUrl}" alt="" class="weather__hourly-icon">
                    <span class="weather__hourly-temp">${tempVal}°C</span>
                </div>
            `);
        });

        const $grid = $('#forecast-grid');
        $grid.empty();

        const uniqueDays = [];
        const dailyForecast = forecast.list.filter(item => {
            const day = new Date(item.dt * 1000).toDateString();
            if (!uniqueDays.includes(day)) {
                uniqueDays.push(day);
                return true;
            }
            return false;
        }).slice(0, 5);

        dailyForecast.forEach(item => {
            const dt = new Date(item.dt * 1000);
            const isToday = dt.toDateString() === new Date().toDateString();
            const dayLabel = isToday ? 'Today' : dt.toLocaleDateString('en-US', { weekday: 'long' });
            const tempVal = Math.round(item.main.temp);
            const desc = item.weather[0].description;
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

            $grid.append(`
                <div class="weather__forecast-card">
                    <span class="weather__forecast-day">${dayLabel}</span>
                    <span class="weather__forecast-desc">${desc}</span>
                    <div class="weather__forecast-meta">
                        <img src="${iconUrl}" alt="" class="weather__forecast-icon">
                        <span class="weather__forecast-temp">${tempVal}°C</span>
                    </div>
                </div>
            `);
        });

        $('#weather-info').css('display', 'flex');
        $('#current-section').css('display', 'flex');
        $('#hourly-section').show();
        $('#forecast-section').show();
        $('#cached-banner').show();
        $('#message-container').hide();
    }

    function updateCacheStatus(isCached, timestamp) {
        if (!isCached) {
            $('#cache-time-text').text('Fresh data retrieved from OpenWeather API');
            return;
        }

        const ageMs = Date.now() - timestamp;
        const ageMin = Math.floor(ageMs / 60000);
        
        let timeLabel = '';
        if (ageMin < 1) {
            timeLabel = 'just now';
        } else if (ageMin === 1) {
            timeLabel = '1 minute ago';
        } else if (ageMin < 60) {
            timeLabel = `${ageMin} minutes ago`;
        } else {
            const hours = Math.floor(ageMin / 60);
            const mins = ageMin % 60;
            timeLabel = `${hours}h ${mins}m ago`;
        }

        $('#cache-time-text').text(`Loaded from cache (last updated: ${timeLabel})`);
    }

    function showError(msg) {
        $('#error-message').text(msg);
        $('#message-container').css('display', 'flex');
    }
});
