import { fetchWeatherData, fetchCountryInfo } from './api.js';
import { renderWeather, renderError, renderCityButtons } from './ui.js';

const topCities = {
  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
  USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Kazan", "Samara"]
};

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "c64220d3b72c3fe7a1f1b3a06da7a2a4";
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      resultBox.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const countryCode = data.sys.country.toLowerCase(); // e.g., "us"
    const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="${flagUrl}" alt="Flag of ${data.sys.country}" />
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;

    resultBox.innerHTML = weatherHTML;
  } catch (error) {
    resultBox.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}



// Listen for click event on the "Get Weather" button
const getWeatherButton = document.getElementById("getWeatherBtn");
getWeatherButton.addEventListener("click", getWeather);

window.selectCountry = function (countryName) {
  renderCityButtons(countryName, topCities, getWeather);
};

document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
