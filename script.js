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
  
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
  
      resultBox.innerHTML = weatherHTML;
    } catch (error) {
      resultBox.innerHTML = `<p>Error fetching weather data.</p>`;
    }
  }
  