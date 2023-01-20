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
currentTime();

function celsiusTemp(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = "15";
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);

function farenheitTemp(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = "59";
}
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheitTemp);

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

  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;

  let city = response.data.name;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${city}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}º`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.main.pressure}hPa`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

  let tempMin = document.querySelector("#temp-min");
  tempMin.innerHTML = `${Math.round(response.data.main.temp_min)}º`;

  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `${Math.round(response.data.main.temp_max)}º`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showLocation);

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentWeather);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityName = cityInput.value;

  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);
