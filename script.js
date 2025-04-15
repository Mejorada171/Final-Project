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
  
  function selectCountry(countryName) {
    document.getElementById("cityInput").value = countryName;
    getWeather();
  }
  
  const topCities = {
    Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Cancún", "León", "Mérida", "Toluca", "Chihuahua"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
    China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Wuhan", "Hangzhou", "Xi'an", "Tianjin", "Nanjing"],
    Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Gold Coast", "Newcastle", "Hobart", "Darwin"],
    Russia: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod", "Chelyabinsk", "Samara", "Omsk", "Rostov-on-Don"]
  };
  
  function selectCountry(countryName) {
    const selector = document.getElementById("citySelector");
    selector.innerHTML = "";
    selector.classList.remove("hidden");
  
    topCities[countryName].forEach(city => {
      const btn = document.createElement("button");
      btn.textContent = city;
      btn.onclick = () => {
        document.getElementById("cityInput").value = city;
        selector.classList.add("hidden");
        getWeather();
      };
      selector.appendChild(btn);
    });
  }
  