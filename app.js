// Elements
const inputbtn = document.getElementById("input-btn");
const searchbtn = document.getElementById("search-btn");
const previewBox = document.getElementById("preview-box");
const weatherBox = document.getElementById("weather-box");
const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

// Live typing preview
inputbtn.addEventListener("input", () => {
  const cityName = inputbtn.value.trim();
  if (cityName) {
    previewBox.textContent = `Searching for: ${cityName}`;
  } else {
    previewBox.textContent = "";
  }
});

const API_KEY = "755475ff18963eca290bf657de2d8814"; // Replace with your valid key

// Search button click
searchbtn.addEventListener("click", () => {
  const cityName = inputbtn.value.trim();

  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      // Fill the weather box
      cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
      temperatureEl.textContent = `Temperature: ${data.main.temp}°C`;
      conditionEl.textContent = `Condition: ${data.weather[0].description}`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      windEl.textContent = `Wind: ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      iconEl.alt = data.weather[0].description;

      weatherBox.classList.remove("hidden");
    })
    .catch(error => {
      alert(error.message);
      weatherBox.classList.add("hidden"); // Hide box if error
    });
});
