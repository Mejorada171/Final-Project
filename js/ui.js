export function renderWeather(data, countryDetails) {
    const resultBox = document.getElementById("weatherResult");
    const country = data.sys.country;
    const flagUrl = countryDetails.flags?.png || `https://flagcdn.com/48x36/${country.toLowerCase()}.png`;
  
    const weatherHTML = `
      <h2>${data.name}, ${country}</h2>
      <img src="${flagUrl}" alt="Flag of ${country}" width="48" height="36" />
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  
    resultBox.innerHTML = weatherHTML;
    resultBox.classList.add("fade-in");
  }
  
  export function renderError(message) {
    const resultBox = document.getElementById("weatherResult");
    resultBox.innerHTML = `<p>${message}</p>`;
    resultBox.classList.remove("fade-in");
  }
  
export function renderCityButtons(countryName, topCities, onClick) {
    const selector = document.getElementById("citySelector");
    selector.innerHTML = "";
    selector.classList.remove("hidden");
  
    topCities[countryName].forEach(city => {
      const btn = document.createElement("button");
      btn.textContent = city;
      
      btn.addEventListener("click", () => {
        document.getElementById("cityInput").value = city;
        selector.classList.add("hidden");
        onClick(); 
      });
      
      selector.appendChild(btn);
    });
  }
  