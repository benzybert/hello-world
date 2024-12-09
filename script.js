async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Using OpenWeatherMap API (you'll need to sign up for a free API key)
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = 
        Math.round(data.main.temp) + '°C';
    document.getElementById('description').textContent = 
        data.weather[0].description;
    document.getElementById('humidity').textContent = 
        data.main.humidity + '%';
    document.getElementById('wind-speed').textContent = 
        data.wind.speed + ' km/h';
    
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').src = iconUrl;
}

// Add event listener for Enter key
document.getElementById('city-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});