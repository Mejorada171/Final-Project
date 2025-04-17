// api.js
const OPEN_WEATHER_API_KEY = "c64220d3b72c3fe7a1f1b3a06da7a2a4";

export async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

export async function fetchCountryInfo(countryCode) {
  const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Country info not found");
  return res.json();
}
