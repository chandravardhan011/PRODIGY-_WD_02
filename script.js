const apiKey = 'b7fb9be078326bf005615a60a31d3063';
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const weatherContainer = document.getElementById('weatherContainer');
const locationElement = document.getElementById('location');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feelsLike');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const pressureElement = document.getElementById('pressure');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function displayWeather(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    descriptionElement.textContent = `${data.weather[0].description}`;
    temperatureElement.textContent = `${data.main.temp}°C`;
    feelsLikeElement.textContent = `${data.main.feels_like}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} m/s`;
    pressureElement.textContent = `${data.main.pressure} hPa`;
    sunriseElement.textContent = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunsetElement.textContent = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    weatherContainer.style.display = 'block';
}
