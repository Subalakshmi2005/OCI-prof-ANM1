const apiKey = 'YOUR_API_KEY';  // Get an API key from a weather API provider (e.g., OpenWeatherMap)

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weather-info').innerHTML = `<p>City not found!</p>`;
        } else {
            const weatherHTML = `
                <p><strong>${data.name}</strong> (${data.sys.country})</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p class="temp">${data.main.temp}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherHTML;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to retrieve weather data. Please try again later.");
    }
}
