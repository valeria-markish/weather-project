function currentTime() {
  let currentTime = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[currentTime.getDay()];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = document.querySelector("#time");
  time.innerHTML = `${day} <br /> ${hour}:${minutes}`;
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let emoji = document.querySelector("#weather-emoji");
  if (response.data.weather[0].main === "Clear") {
    emoji.innerHTML = "☀️";
  }
  if (response.data.weather[0].main === "Clouds") {
    emoji.innerHTML = "☁️";
  }
  if (response.data.weather[0].main === "Rain") {
    emoji.innerHTML = "🌧";
  }
  if (response.data.weather[0].main === "Snow") {
    emoji.innerHTML = "❄️";
  }
  if (
    response.data.weather[0].main === "Mist" ||
    response.data.weather[0].main === "Haze" ||
    response.data.weather[0].main === "Fog"
  ) {
    emoji.innerHTML = "🌫";
  }

  let temperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let pressure = document.querySelector("#pressure");
  let wind = document.querySelector("#wind");
  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}º`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  pressure.innerHTML = `${response.data.main.pressure}hPa`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  tempMax.innerHTML = `${Math.round(response.data.main.temp_max)}º`;
  tempMin.innerHTML = `${Math.round(response.data.main.temp_min)}º`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityName = cityInput.value;

  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function celsiusTemp(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.remove("off-link");
  farenheitLink.classList.add("off-link");
}

function farenheitTemp(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  farenheitLink.classList.remove("off-link");
  celsiusLink.classList.add("off-link");
}

currentTime();

navigator.geolocation.getCurrentPosition(showLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentWeather);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
let farenheitLink = document.querySelector("#farenheit");
celsiusLink.addEventListener("click", celsiusTemp);
farenheitLink.addEventListener("click", farenheitTemp);
